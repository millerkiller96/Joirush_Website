import {
  formatPrice,
  getBulkDiscountPercent,
  getDisplayName,
  getDiscountedUnitPrice,
  getProduct,
  getSecondCookiePrice,
  getThirdCookiePrice,
  JOIRUSH_FREE_SHIPPING_RATE_ID,
  JOIRUSH_STRIPE_ACCOUNT_ID,
  products,
  type Product,
} from "@/data/products";
import { GOOGLE_SCRIPT_URL, postToGoogleScript, submitWeb3Form, type SubmitResult } from "@/lib/forms";

export const JOIRUSH_CHECKOUT_SERVICE_URL = "https://joirush-checkout.onrender.com";

export type CheckoutOrderMode = "single" | "pair_bogo10" | "trio_third15" | "bulk_tier";

export type CheckoutLineItem = {
  slug: string;
  shortName: string;
  name: string;
  image: string;
  stripeProductId: string;
  stripePriceId?: string;
  quantity: number;
  originalUnitUsd: number;
  discountedUnitUsd: number;
  unitAmountCents: number;
  lineTotalUsd: number;
  lineSavingsUsd: number;
  discountPercent: number;
  tierLabel: string;
};

export type BuiltCheckoutOrder = {
  mode: CheckoutOrderMode;
  totalCookies: number;
  originalTotalUsd: number;
  finalTotalUsd: number;
  totalSavingsUsd: number;
  discountSummaryLabel: string;
  clientReferenceId: string;
  couponCode?: string;
  lineItems: CheckoutLineItem[];
  directStripeUrl: string;
  fallbackStripeUrl: string;
  needsDynamicMultiFlavorLink?: boolean;
};

const COMPACT_COOKIE_CODE: Record<string, string> = {
  "jumbo-chocolate-chip-cookie": "cc",
  "jumbo-white-chocolate-chip-cookie": "wc",
  "rainbow-candy-cookie": "rc",
  "mini-jumbo-chocolate-chip-cookie": "mc",
  "jumbo-pastel-mm-cookie": "pm",
  "jumbo-christmas-cookie": "xm",
  "giant-peanut-butter-cookie": "pb",
  "giant-double-chocolate-cookie": "dc",
  "cookie-ice-cream-sandwich": "ic",
  "jumbo-mm-cookie": "mm",
  "hot-pink-mm-cookie": "hp",
};

function sanitizeClientRef(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 200);
}

export function buildBulkClientReferenceId(
  discountPercent: number,
  lineItems: CheckoutLineItem[]
): string {
  const prefix = `bulk${discountPercent}_`;
  const fullMix = lineItems.map((item) => `${item.quantity}x_${item.slug}`).join("__");
  if ((prefix + fullMix).length <= 200) {
    return sanitizeClientRef(prefix + fullMix);
  }

  const trimmedMix = lineItems
    .map((item) => `${item.quantity}x_${item.slug.replace(/-cookie$/, "")}`)
    .join("__");
  if ((prefix + trimmedMix).length <= 200) {
    return sanitizeClientRef(prefix + trimmedMix);
  }

  const shortMix = lineItems
    .map((item) => `${item.quantity}x_${COMPACT_COOKIE_CODE[item.slug] ?? item.slug.slice(0, 4)}`)
    .join("__");
  return sanitizeClientRef(prefix + shortMix);
}

export function appendClientRef(url: string, clientReferenceId: string): string {
  const safeRef = sanitizeClientRef(clientReferenceId);
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}client_reference_id=${encodeURIComponent(safeRef)}`;
}

export const withStripeClientRef = appendClientRef;

export function buildStripePaymentLinkUrl(
  baseUrl: string,
  params: {
    clientReferenceId: string;
    promoCode?: string;
    utmCampaign?: string;
    utmContent?: string;
  }
): string {
  const safeRef = sanitizeClientRef(params.clientReferenceId);
  const query: string[] = [`client_reference_id=${encodeURIComponent(safeRef)}`];
  if (params.promoCode) {
    query.push(`prefilled_promo_code=${encodeURIComponent(params.promoCode)}`);
  }
  if (params.utmCampaign) {
    query.push(`utm_source=joirush_web`);
    query.push(`utm_medium=bundle_checkout`);
    query.push(`utm_campaign=${encodeURIComponent(params.utmCampaign)}`);
  }
  if (params.utmContent) {
    query.push(`utm_content=${encodeURIComponent(params.utmContent.slice(0, 200))}`);
  }
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}${query.join("&")}`;
}

export function buildDynamicMultiItemCheckoutUrl(
  lineItems: CheckoutLineItem[],
  clientReferenceId: string,
  fallbackUrl: string
): string {
  const validItems = lineItems.filter((item) => item.stripePriceId && item.quantity > 0);
  if (validItems.length === 0) return fallbackUrl;
  const itemsParam = validItems
    .map((item) => `${item.stripePriceId}:${item.quantity}`)
    .join(",");
  const safeRef = sanitizeClientRef(clientReferenceId);
  const qs = new URLSearchParams({
    items: itemsParam,
    ref: safeRef,
    fallback: fallbackUrl,
  });
  return `${JOIRUSH_CHECKOUT_SERVICE_URL}/checkout?${qs.toString()}`;
}

// Client-side cache of resolved multi-flavor buy.stripe.com links
const resolvedMultiFlavorUrlCache = new Map<string, string>();

export function getMultiFlavorCartSignature(order: BuiltCheckoutOrder): string {
  return order.lineItems
    .filter((i) => i.stripePriceId && i.quantity > 0)
    .map((i) => `${i.stripePriceId}:${i.quantity}`)
    .join(",");
}

export function getCachedMultiFlavorStripeUrl(order: BuiltCheckoutOrder): string | undefined {
  const sig = getMultiFlavorCartSignature(order);
  if (!sig) return undefined;
  const base = resolvedMultiFlavorUrlCache.get(sig);
  return base ? appendClientRef(base, order.clientReferenceId) : undefined;
}

/**
 * Warm up the multi-flavor checkout service and pre-create a multi-line-item
 * buy.stripe.com Payment Link when a customer mixes multiple flavors in their cart.
 */
export async function prefetchMultiFlavorStripeUrl(
  order: BuiltCheckoutOrder
): Promise<string | undefined> {
  if (!order.needsDynamicMultiFlavorLink) {
    return order.directStripeUrl;
  }
  const existing = getCachedMultiFlavorStripeUrl(order);
  if (existing) return existing;

  const sig = getMultiFlavorCartSignature(order);
  if (!sig || typeof window === "undefined") return undefined;

  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(`${JOIRUSH_CHECKOUT_SERVICE_URL}/api/payment-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: order.lineItems.map((i) => ({
          price: i.stripePriceId,
          quantity: i.quantity,
        })),
        clientReferenceId: order.clientReferenceId,
      }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!resp.ok) return undefined;
    const data = (await resp.json()) as { ok?: boolean; url?: string };
    if (data?.ok && data.url && data.url.startsWith("https://buy.stripe.com/")) {
      const cleanBase = data.url.split("?")[0];
      resolvedMultiFlavorUrlCache.set(sig, cleanBase);
      return appendClientRef(cleanBase, order.clientReferenceId);
    }
  } catch {
    // Fallback handled gracefully by getDirectStripeCheckoutUrl
  }
  return undefined;
}

/**
 * Build a 1-cookie order (full unit price).
 */
export function buildSingleCookieOrder(product: Product): BuiltCheckoutOrder {
  const clientReferenceId = sanitizeClientRef(`1x_${product.slug}`);
  const lineItems: CheckoutLineItem[] = [
    {
      slug: product.slug,
      shortName: product.shortName,
      name: getDisplayName(product),
      image: product.image,
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripeTierPriceIds?.unit ?? product.stripeUnitPriceId,
      quantity: 1,
      originalUnitUsd: product.price,
      discountedUnitUsd: product.price,
      unitAmountCents: product.price * 100,
      lineTotalUsd: product.price,
      lineSavingsUsd: 0,
      discountPercent: 0,
      tierLabel: "Full price",
    },
  ];
  const baseSingleUrl = product.stripeQuantityUrls?.["1"] ?? product.stripeUrl;
  const directUrl = appendClientRef(baseSingleUrl, clientReferenceId);
  return {
    mode: "single",
    totalCookies: 1,
    originalTotalUsd: product.price,
    finalTotalUsd: product.price,
    totalSavingsUsd: 0,
    discountSummaryLabel: "Single cookie",
    clientReferenceId,
    lineItems,
    directStripeUrl: directUrl,
    fallbackStripeUrl: directUrl,
  };
}

/**
 * Build a 2-cookie order (Buy 1, get 2nd cookie 10% off).
 * All 11x11 cookie combinations have dedicated pre-created Stripe Payment Links
 * in firstProduct.stripePairUrls[secondProduct.slug].
 */
export function buildPairCookieOrder(
  firstProduct: Product,
  secondProduct: Product
): BuiltCheckoutOrder {
  const secondDiscountedUsd = getSecondCookiePrice(secondProduct);
  const originalTotalUsd = firstProduct.price + secondProduct.price;
  const finalTotalUsd = firstProduct.price + secondDiscountedUsd;
  const totalSavingsUsd = originalTotalUsd - finalTotalUsd;
  const isSameFlavor = firstProduct.slug === secondProduct.slug;
  const couponCode = "JOIRUSH10";

  const clientReferenceId = sanitizeClientRef(
    `pair10_1x_${firstProduct.slug}__1x_${secondProduct.slug}`
  );

  const lineItems: CheckoutLineItem[] = [
    {
      slug: firstProduct.slug,
      shortName: firstProduct.shortName,
      name: getDisplayName(firstProduct),
      image: firstProduct.image,
      stripeProductId: firstProduct.stripeProductId,
      stripePriceId: firstProduct.stripeTierPriceIds?.unit ?? firstProduct.stripeUnitPriceId,
      quantity: 1,
      originalUnitUsd: firstProduct.price,
      discountedUnitUsd: firstProduct.price,
      unitAmountCents: firstProduct.price * 100,
      lineTotalUsd: firstProduct.price,
      lineSavingsUsd: 0,
      discountPercent: 0,
      tierLabel: "1st cookie (full price)",
    },
    {
      slug: secondProduct.slug,
      shortName: secondProduct.shortName,
      name: getDisplayName(secondProduct),
      image: secondProduct.image,
      stripeProductId: secondProduct.stripeProductId,
      stripePriceId:
        secondProduct.stripeTierPriceIds?.second10Off ?? secondProduct.stripeSecond10OffPriceId,
      quantity: 1,
      originalUnitUsd: secondProduct.price,
      discountedUnitUsd: secondDiscountedUsd,
      unitAmountCents: secondDiscountedUsd * 100,
      lineTotalUsd: secondDiscountedUsd,
      lineSavingsUsd: secondProduct.price - secondDiscountedUsd,
      discountPercent: 10,
      tierLabel: "2nd cookie (10% off)",
    },
  ];

  const basePairUrl =
    firstProduct.stripePairUrls?.[secondProduct.slug] ??
    (isSameFlavor ? firstProduct.stripeUpsellUrl : firstProduct.stripeUpsellUrl);

  const directStripeUrl = buildStripePaymentLinkUrl(basePairUrl, {
    clientReferenceId,
    utmCampaign: "pair_10off_2cookies",
    utmContent: `1x_${firstProduct.slug}_1x_${secondProduct.slug}_${finalTotalUsd}usd`,
  });

  return {
    mode: "pair_bogo10",
    totalCookies: 2,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: "Buy 1, get 1 10% off",
    clientReferenceId,
    couponCode,
    lineItems,
    directStripeUrl,
    fallbackStripeUrl: directStripeUrl,
  };
}

/**
 * Build a 3-cookie order ("Want a third?" step: 1st full, 2nd 10% off, 3rd 15% off).
 */
export function buildTrioCookieOrder(
  firstProduct: Product,
  secondProduct: Product,
  thirdProduct: Product
): BuiltCheckoutOrder {
  const secondDiscountedUsd = getSecondCookiePrice(secondProduct);
  const thirdDiscountedUsd = getThirdCookiePrice(thirdProduct);
  const originalTotalUsd = firstProduct.price + secondProduct.price + thirdProduct.price;
  const finalTotalUsd = firstProduct.price + secondDiscountedUsd + thirdDiscountedUsd;
  const totalSavingsUsd = originalTotalUsd - finalTotalUsd;
  const couponCode = "JOIRUSH15";

  const clientReferenceId = sanitizeClientRef(
    `trio15_1x_${firstProduct.slug}__1x_${secondProduct.slug}__1x_${thirdProduct.slug}`
  );

  const lineItems: CheckoutLineItem[] = [
    {
      slug: firstProduct.slug,
      shortName: firstProduct.shortName,
      name: getDisplayName(firstProduct),
      image: firstProduct.image,
      stripeProductId: firstProduct.stripeProductId,
      stripePriceId: firstProduct.stripeTierPriceIds?.unit ?? firstProduct.stripeUnitPriceId,
      quantity: 1,
      originalUnitUsd: firstProduct.price,
      discountedUnitUsd: firstProduct.price,
      unitAmountCents: firstProduct.price * 100,
      lineTotalUsd: firstProduct.price,
      lineSavingsUsd: 0,
      discountPercent: 0,
      tierLabel: "1st cookie (full price)",
    },
    {
      slug: secondProduct.slug,
      shortName: secondProduct.shortName,
      name: getDisplayName(secondProduct),
      image: secondProduct.image,
      stripeProductId: secondProduct.stripeProductId,
      stripePriceId:
        secondProduct.stripeTierPriceIds?.second10Off ?? secondProduct.stripeSecond10OffPriceId,
      quantity: 1,
      originalUnitUsd: secondProduct.price,
      discountedUnitUsd: secondDiscountedUsd,
      unitAmountCents: secondDiscountedUsd * 100,
      lineTotalUsd: secondDiscountedUsd,
      lineSavingsUsd: secondProduct.price - secondDiscountedUsd,
      discountPercent: 10,
      tierLabel: "2nd cookie (10% off)",
    },
    {
      slug: thirdProduct.slug,
      shortName: thirdProduct.shortName,
      name: getDisplayName(thirdProduct),
      image: thirdProduct.image,
      stripeProductId: thirdProduct.stripeProductId,
      stripePriceId: thirdProduct.stripeTierPriceIds?.third15Off,
      quantity: 1,
      originalUnitUsd: thirdProduct.price,
      discountedUnitUsd: thirdDiscountedUsd,
      unitAmountCents: thirdDiscountedUsd * 100,
      lineTotalUsd: thirdDiscountedUsd,
      lineSavingsUsd: thirdProduct.price - thirdDiscountedUsd,
      discountPercent: 15,
      tierLabel: "3rd cookie (15% off)",
    },
  ];

  // Check if two of the three cookies share a flavor so we can use a pre-created Trio Payment Link
  let staticTrioUrl: string | undefined;
  if (firstProduct.slug === secondProduct.slug) {
    staticTrioUrl =
      firstProduct.stripeTrioUrls?.[thirdProduct.slug] ?? firstProduct.stripeTrioUrl;
  } else if (firstProduct.slug === thirdProduct.slug) {
    staticTrioUrl = firstProduct.stripeTrioUrls?.[secondProduct.slug];
  } else if (secondProduct.slug === thirdProduct.slug) {
    staticTrioUrl = secondProduct.stripeTrioUrls?.[firstProduct.slug];
  }

  const fallbackBaseUrl =
    staticTrioUrl ??
    firstProduct.stripeTrioUrls?.[thirdProduct.slug] ??
    firstProduct.stripeTrioUrl ??
    firstProduct.stripeQuantityUrls?.["3"] ??
    firstProduct.stripeUpsellUrl;

  const fallbackStripeUrl = buildStripePaymentLinkUrl(fallbackBaseUrl, {
    clientReferenceId,
    utmCampaign: "trio_15off_3cookies",
    utmContent: `${firstProduct.slug}_${secondProduct.slug}_${thirdProduct.slug}_${finalTotalUsd}usd`,
  });

  const needsDynamicMultiFlavorLink = !staticTrioUrl;
  const directStripeUrl = needsDynamicMultiFlavorLink
    ? buildDynamicMultiItemCheckoutUrl(lineItems, clientReferenceId, fallbackStripeUrl)
    : fallbackStripeUrl;

  return {
    mode: "trio_third15",
    totalCookies: 3,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: "2nd cookie 10% off + 3rd cookie 15% off",
    clientReferenceId,
    couponCode,
    lineItems,
    directStripeUrl,
    fallbackStripeUrl,
    needsDynamicMultiFlavorLink,
  };
}

/**
 * Build a bulk multi-cookie order (for 3 to 20 cookies across any mix of flavors):
 * - 3 to 4 cookies: 20% off each
 * - 5 to 9 cookies: 25% off each
 * - 10 to 20 cookies: 30% off each
 * (Also handles 1 or 2 cookies if passed.)
 */
export function buildBulkCookieOrder(
  quantitiesBySlug: Record<string, number>,
  primarySlug?: string
): BuiltCheckoutOrder {
  const rawEntries = products
    .map((product) => ({
      product,
      quantity: Math.max(0, Math.floor(quantitiesBySlug[product.slug] ?? 0)),
    }))
    .filter((entry) => entry.quantity > 0);

  // Place primarySlug first only if it has quantity > 0; otherwise sort by quantity desc
  const entries = [...rawEntries].sort((a, b) => {
    if (primarySlug) {
      if (a.product.slug === primarySlug) return -1;
      if (b.product.slug === primarySlug) return 1;
    }
    return b.quantity - a.quantity;
  });

  const dominantProduct =
    entries.reduce(
      (best, cur) => (cur.quantity > best.quantity ? cur : best),
      entries[0]
    )?.product ??
    (primarySlug ? getProduct(primarySlug) : undefined) ??
    products[0];

  const totalCookies = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  if (totalCookies <= 1) {
    return buildSingleCookieOrder(entries[0]?.product ?? dominantProduct);
  }

  if (totalCookies === 2) {
    if (entries.length === 1) {
      return buildPairCookieOrder(entries[0].product, entries[0].product);
    }
    return buildPairCookieOrder(entries[0].product, entries[1].product);
  }

  const discountPercent = getBulkDiscountPercent(totalCookies);
  const tierKey =
    discountPercent === 30
      ? "bulk30Off"
      : discountPercent === 25
        ? "bulk25Off"
        : "bulk20Off";

  const couponCode =
    discountPercent === 30
      ? "JOIRUSH30"
      : discountPercent === 25
        ? "JOIRUSH25"
        : "JOIRUSH20";

  const tierRangeLabel =
    discountPercent === 30
      ? "10 to 20 cookies (30% off each)"
      : discountPercent === 25
        ? "5 to 10 cookies (25% off each)"
        : "3 to 5 cookies (20% off each)";

  const lineItems: CheckoutLineItem[] = entries.map(({ product, quantity }) => {
    const discountedUnitUsd = getDiscountedUnitPrice(product.price, discountPercent);
    const originalLineUsd = product.price * quantity;
    const lineTotalUsd = discountedUnitUsd * quantity;
    return {
      slug: product.slug,
      shortName: product.shortName,
      name: getDisplayName(product),
      image: product.image,
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripeTierPriceIds?.[tierKey],
      quantity,
      originalUnitUsd: product.price,
      discountedUnitUsd,
      unitAmountCents: discountedUnitUsd * 100,
      lineTotalUsd,
      lineSavingsUsd: originalLineUsd - lineTotalUsd,
      discountPercent,
      tierLabel: `${discountPercent}% off bulk tier`,
    };
  });

  const originalTotalUsd = lineItems.reduce(
    (sum, item) => sum + item.originalUnitUsd * item.quantity,
    0
  );
  const finalTotalUsd = lineItems.reduce((sum, item) => sum + item.lineTotalUsd, 0);
  const totalSavingsUsd = originalTotalUsd - finalTotalUsd;

  const clientReferenceId = buildBulkClientReferenceId(discountPercent, lineItems);

  const clampedQtyKey = String(Math.min(20, Math.max(3, totalCookies)));
  const singleFlavorExactQtyUrl =
    lineItems.length === 1
      ? entries[0].product.stripeQuantityUrls?.[clampedQtyKey] ??
        entries[0].product.stripeBulkTierUrls?.[tierKey]
      : undefined;

  const fallbackBaseUrl =
    singleFlavorExactQtyUrl ??
    dominantProduct.stripeQuantityUrls?.[clampedQtyKey] ??
    dominantProduct.stripeBulkTierUrls?.[tierKey] ??
    dominantProduct.stripeUpsellUrl;

  const compactSummary = lineItems
    .map((item) => `${item.quantity}x_${item.slug.replace(/-cookie$/, "")}`)
    .join("__");

  const fallbackStripeUrl = buildStripePaymentLinkUrl(fallbackBaseUrl, {
    clientReferenceId,
    utmCampaign: `bulk_${discountPercent}off_${totalCookies}cookies`,
    utmContent: `${compactSummary}_${finalTotalUsd}usd`,
  });

  const needsDynamicMultiFlavorLink = lineItems.length > 1;
  const directStripeUrl = needsDynamicMultiFlavorLink
    ? buildDynamicMultiItemCheckoutUrl(lineItems, clientReferenceId, fallbackStripeUrl)
    : fallbackStripeUrl;

  return {
    mode: "bulk_tier",
    totalCookies,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: tierRangeLabel,
    clientReferenceId,
    couponCode,
    lineItems,
    directStripeUrl,
    fallbackStripeUrl,
    needsDynamicMultiFlavorLink,
  };
}

/**
 * Return the unified Stripe Checkout URL for any order combination.
 * If a multi-flavor Payment Link has already been resolved and cached, returns that
 * direct buy.stripe.com URL; otherwise returns directStripeUrl.
 */
export function getDirectStripeCheckoutUrl(order: BuiltCheckoutOrder): string {
  if (order.needsDynamicMultiFlavorLink) {
    const cached = getCachedMultiFlavorStripeUrl(order);
    if (cached) return cached;
  }
  return order.directStripeUrl || order.fallbackStripeUrl;
}

/**
 * Record the exact multi-cookie combination in the background before opening Stripe Checkout.
 */
export function logCheckoutOrder(order: BuiltCheckoutOrder): void {
  const itemizedLines = order.lineItems
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.quantity}x ${item.shortName} (${item.name}) [${item.stripeProductId}${item.stripePriceId ? ` / ${item.stripePriceId}` : ""}] @ ${formatPrice(item.discountedUnitUsd)} each (${item.tierLabel}) = ${formatPrice(item.lineTotalUsd)}`
    )
    .join("\n");

  postToGoogleScript({
    type: "checkout_click",
    stripeAccountId: JOIRUSH_STRIPE_ACCOUNT_ID,
    shippingRateId: JOIRUSH_FREE_SHIPPING_RATE_ID,
    mode: order.mode,
    totalCookies: order.totalCookies,
    originalTotalUsd: order.originalTotalUsd,
    finalTotalUsd: order.finalTotalUsd,
    totalSavingsUsd: order.totalSavingsUsd,
    discountSummaryLabel: order.discountSummaryLabel,
    clientReferenceId: order.clientReferenceId,
    couponCode: order.couponCode ?? "",
    items: itemizedLines,
    directStripeUrl: getDirectStripeCheckoutUrl(order),
  });
}

/**
 * Synchronously open the single unified Stripe Checkout page for any order combination.
 */
export function openStripeCheckoutOrder(order: BuiltCheckoutOrder): string {
  const url = getDirectStripeCheckoutUrl(order);
  logCheckoutOrder(order);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
}

export type CheckoutRedirectResult = { ok: true; url: string };

/**
 * Resolve a Stripe Checkout URL for multi-cookie / mixed-flavor / bulk orders.
 * Always resolves to a single unified Stripe Checkout URL without showing a fallback form.
 */
export async function resolveStripeCheckoutUrl(
  order: BuiltCheckoutOrder
): Promise<CheckoutRedirectResult> {
  if (order.needsDynamicMultiFlavorLink) {
    const resolved = await prefetchMultiFlavorStripeUrl(order);
    if (resolved) {
      return { ok: true, url: resolved };
    }
  }
  const fallbackUrl = getDirectStripeCheckoutUrl(order);

  if (typeof window !== "undefined" && GOOGLE_SCRIPT_URL) {
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2000);
      const payload = {
        type: "checkout",
        action: "create_checkout",
        stripeAccountId: JOIRUSH_STRIPE_ACCOUNT_ID,
        shippingRateId: JOIRUSH_FREE_SHIPPING_RATE_ID,
        mode: order.mode,
        totalCookies: order.totalCookies,
        originalTotalUsd: order.originalTotalUsd,
        finalTotalUsd: order.finalTotalUsd,
        totalSavingsUsd: order.totalSavingsUsd,
        discountSummaryLabel: order.discountSummaryLabel,
        clientReferenceId: order.clientReferenceId,
        couponCode: order.couponCode ?? "",
        lineItems: order.lineItems,
        fallbackStripeUrl: order.fallbackStripeUrl,
        successUrl: `${window.location.origin}/catalogue/?checkout=success&ref=${encodeURIComponent(order.clientReferenceId)}`,
        cancelUrl: window.location.href,
      };

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      if (res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { url?: string; checkoutUrl?: string }
          | null;
        const dynamicUrl = data?.checkoutUrl || data?.url;
        if (dynamicUrl && /^https:\/\/(checkout|buy)\.stripe\.com\//.test(dynamicUrl)) {
          return { ok: true, url: dynamicUrl };
        }
      }
    } catch {
      // Fall back to direct Stripe Payment Link
    }
  }

  return { ok: true, url: fallbackUrl };
}

/**
 * Submit a multi-cookie / bulk invoice or checkout record via Web3Forms + Google Sheet
 * and return the unified Stripe Checkout URL.
 */
export async function submitMultiCookieOrderNotification(params: {
  order: BuiltCheckoutOrder;
  customerEmail?: string;
  customerName?: string;
  customerNotes?: string;
}): Promise<SubmitResult & { stripeUrl: string }> {
  const { order, customerEmail, customerName, customerNotes } = params;

  const itemizedLines = order.lineItems
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.quantity}x ${item.shortName} (${item.name}) [${item.stripeProductId}${item.stripePriceId ? ` / ${item.stripePriceId}` : ""}] @ ${formatPrice(item.discountedUnitUsd)} each (${item.tierLabel}) = ${formatPrice(item.lineTotalUsd)}`
    )
    .join("\n");

  postToGoogleScript({
    type: "bulk_order",
    stripeAccountId: JOIRUSH_STRIPE_ACCOUNT_ID,
    shippingRateId: JOIRUSH_FREE_SHIPPING_RATE_ID,
    mode: order.mode,
    totalCookies: order.totalCookies,
    originalTotalUsd: order.originalTotalUsd,
    finalTotalUsd: order.finalTotalUsd,
    totalSavingsUsd: order.totalSavingsUsd,
    discountSummaryLabel: order.discountSummaryLabel,
    clientReferenceId: order.clientReferenceId,
    couponCode: order.couponCode ?? "",
    email: customerEmail ?? "",
    name: customerName ?? "",
    notes: customerNotes ?? "",
    items: itemizedLines,
    directStripeUrl: getDirectStripeCheckoutUrl(order),
  });

  const web3Result = await submitWeb3Form("customOrder", {
    subject: `JOIRUSH Multi Cookie Order (${order.totalCookies} cookies, ${formatPrice(order.finalTotalUsd)})`,
    from_name: customerName || "JOIRUSH Collector",
    email: customerEmail || undefined,
    name: customerName || undefined,
    order_type: order.discountSummaryLabel,
    total_cookies: order.totalCookies,
    original_total: formatPrice(order.originalTotalUsd),
    discounted_total: formatPrice(order.finalTotalUsd),
    total_savings: formatPrice(order.totalSavingsUsd),
    coupon_code: order.couponCode || "None",
    stripe_reference_id: order.clientReferenceId,
    cookie_selection: itemizedLines,
    customer_notes: customerNotes || undefined,
  });

  return {
    ...web3Result,
    stripeUrl: getDirectStripeCheckoutUrl(order),
  };
}
