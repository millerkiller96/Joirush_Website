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
};

const COMPACT_COOKIE_CODE: Record<string, string> = {
  "chocolate-chip-cookie": "cc",
  "pink-sugar-cookie": "ps",
  "double-chocolate-cookie": "dc",
  "white-macadamia-cookie": "wm",
  "peaches-and-cream-cookie": "pc",
  "red-velvet-cheesecake-cookie": "rv",
  "key-lime-pie-cookie": "kl",
  "lemon-poppy-seed-cookie": "lp",
  "dubai-chocolate-cookie": "db",
  "birthday-cake-cookie": "bc",
  "strawberry-shortcake-cookie": "ss",
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

/**
 * Build a 1-cookie order (standard price).
 */
export function buildSingleCookieOrder(product: Product): BuiltCheckoutOrder {
  const clientReferenceId = `1x_${product.slug}`;
  const lineItem: CheckoutLineItem = {
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
    tierLabel: "Standard price",
  };
  const directUrl = appendClientRef(product.stripeUrl, clientReferenceId);
  return {
    mode: "single",
    totalCookies: 1,
    originalTotalUsd: product.price,
    finalTotalUsd: product.price,
    totalSavingsUsd: 0,
    discountSummaryLabel: "1 cookie",
    clientReferenceId,
    lineItems: [lineItem],
    directStripeUrl: directUrl,
    fallbackStripeUrl: directUrl,
  };
}

/**
 * Build a 2-cookie BOGO 10% off order (1st cookie full price, 2nd cookie 10% off).
 */
export function buildPairCookieOrder(firstProduct: Product, secondProduct: Product): BuiltCheckoutOrder {
  const secondDiscountedUsd = getSecondCookiePrice(secondProduct);
  const secondSavingsUsd = secondProduct.price - secondDiscountedUsd;
  const originalTotalUsd = firstProduct.price + secondProduct.price;
  const finalTotalUsd = firstProduct.price + secondDiscountedUsd;
  const clientReferenceId = `pair_${firstProduct.slug}__${secondProduct.slug}`;

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
      tierLabel: "1st cookie",
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
      lineSavingsUsd: secondSavingsUsd,
      discountPercent: 10,
      tierLabel: "2nd cookie (10% off)",
    },
  ];

  const isSameCookie = firstProduct.slug === secondProduct.slug;
  const mappedPairUrl = isSameCookie
    ? firstProduct.stripeUpsellUrl
    : firstProduct.stripePairUrls?.[secondProduct.slug] ?? firstProduct.stripeUpsellUrl;

  const directStripeUrl = appendClientRef(mappedPairUrl, clientReferenceId);

  return {
    mode: "pair_bogo10",
    totalCookies: 2,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd: secondSavingsUsd,
    discountSummaryLabel: "Buy 1, get 1 10% off",
    clientReferenceId,
    couponCode: "JOIRUSH10",
    lineItems,
    directStripeUrl,
    fallbackStripeUrl: directStripeUrl,
  };
}

/**
 * Build a 3-cookie "Want a third?" order:
 * - 1st cookie: full price
 * - 2nd cookie: 10% off
 * - 3rd cookie: 15% off
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
  const clientReferenceId = `trio_${firstProduct.slug}__${secondProduct.slug}__${thirdProduct.slug}`;
  const couponCode = "JOIRUSH15";

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
      tierLabel: "1st cookie",
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

  const isSamePair = firstProduct.slug === secondProduct.slug;
  const basePairUrl = isSamePair
    ? firstProduct.stripeUpsellUrl
    : firstProduct.stripePairUrls?.[secondProduct.slug] ?? firstProduct.stripeUpsellUrl;

  const directStripeUrl = buildStripePaymentLinkUrl(basePairUrl, {
    clientReferenceId,
    promoCode: couponCode,
    utmCampaign: "trio_15off_3cookies",
    utmContent: `${firstProduct.slug}_${secondProduct.slug}_${thirdProduct.slug}_${finalTotalUsd}usd`,
  });

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
    fallbackStripeUrl: directStripeUrl,
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

  const singleFlavorBulkUrl =
    lineItems.length === 1 ? entries[0].product.stripeBulkTierUrls?.[tierKey] : undefined;

  const baseCheckoutUrl =
    singleFlavorBulkUrl ??
    (entries.length >= 2
      ? entries[0].product.stripePairUrls?.[entries[1].product.slug] ??
        dominantProduct.stripeUpsellUrl
      : dominantProduct.stripeUpsellUrl);

  const compactSummary = lineItems
    .map((item) => `${item.quantity}x_${item.slug.replace(/-cookie$/, "")}`)
    .join("__");

  const directStripeUrl = buildStripePaymentLinkUrl(baseCheckoutUrl, {
    clientReferenceId,
    promoCode: couponCode,
    utmCampaign: `bulk_${discountPercent}off_${totalCookies}cookies`,
    utmContent: `${compactSummary}_${finalTotalUsd}usd`,
  });

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
    fallbackStripeUrl: directStripeUrl,
  };
}

/**
 * Return the unified Stripe Checkout URL for any order combination.
 */
export function getDirectStripeCheckoutUrl(order: BuiltCheckoutOrder): string {
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
    directStripeUrl: order.directStripeUrl,
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
        successUrl: `${window.location.origin}/catalogue/?checkout=success`,
        cancelUrl: window.location.href,
        lineItems: order.lineItems.map((item) => ({
          slug: item.slug,
          name: item.name,
          shortName: item.shortName,
          stripeProductId: item.stripeProductId,
          stripePriceId: item.stripePriceId ?? "",
          quantity: item.quantity,
          unitAmountCents: item.unitAmountCents,
          discountedUnitUsd: item.discountedUnitUsd,
          originalUnitUsd: item.originalUnitUsd,
          discountPercent: item.discountPercent,
          tierLabel: item.tierLabel,
        })),
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; url?: string; checkoutUrl?: string; error?: string }
        | null;

      const resolvedUrl = data?.url ?? data?.checkoutUrl;
      if (data?.ok && typeof resolvedUrl === "string" && resolvedUrl.startsWith("https://")) {
        return { ok: true, url: resolvedUrl };
      }
    } catch {
      // Fall back to direct unified Stripe Payment Link URL
    }
  }

  return { ok: true, url: fallbackUrl };
}

/**
 * Legacy helper kept for compatibility.
 */
export async function submitMultiCookieOrderRequest(params: {
  order: BuiltCheckoutOrder;
  customerName: string;
  customerEmail: string;
  shippingAddress?: string;
  notes?: string;
}): Promise<SubmitResult> {
  const { order, customerName, customerEmail, shippingAddress, notes } = params;
  const itemizedLines = order.lineItems
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.quantity}x ${item.shortName} (${item.name}) [${item.stripeProductId}${item.stripePriceId ? ` / ${item.stripePriceId}` : ""}] @ ${formatPrice(item.discountedUnitUsd)} each (${item.tierLabel}) = ${formatPrice(item.lineTotalUsd)}`
    )
    .join("\n");

  postToGoogleScript({
    type: "bulk_order",
    name: customerName,
    email: customerEmail,
    totalCookies: order.totalCookies,
    finalTotalUsd: order.finalTotalUsd,
    totalSavingsUsd: order.totalSavingsUsd,
    discountSummaryLabel: order.discountSummaryLabel,
    clientReferenceId: order.clientReferenceId,
    items: itemizedLines,
    shippingAddress: shippingAddress ?? "",
    notes: notes ?? "",
  });

  return submitWeb3Form("customOrder", {
    subject: `JOIRUSH Multi Cookie Order (${order.totalCookies} cookies · ${formatPrice(order.finalTotalUsd)})`,
    from_name: "JOIRUSH Bulk & Bundle Checkout",
    name: customerName,
    email: customerEmail,
    total_cookies: order.totalCookies,
    pricing_tier: order.discountSummaryLabel,
    subtotal_before_discount: formatPrice(order.originalTotalUsd),
    total_savings: formatPrice(order.totalSavingsUsd),
    final_total: `${formatPrice(order.finalTotalUsd)} (Free U.S. shipping included)`,
    selected_cookies: itemizedLines,
    client_reference_id: order.clientReferenceId,
    shipping_address: shippingAddress || "Will provide on Stripe invoice",
    notes: notes || "None",
    page: typeof window !== "undefined" ? window.location.href : undefined,
  });
}
