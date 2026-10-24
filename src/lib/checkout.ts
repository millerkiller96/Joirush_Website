import {
  formatPrice,
  getBulkDiscountPercent,
  getDisplayName,
  getDiscountedUnitPrice,
  getProduct,
  JOIRUSH_FREE_SHIPPING_RATE_ID,
  JOIRUSH_STRIPE_ACCOUNT_ID,
  products,
  type Product,
} from "@/data/products";
import { GOOGLE_SCRIPT_URL, postToGoogleScript, submitWeb3Form, type SubmitResult } from "@/lib/forms";

export const JOIRUSH_CHECKOUT_SERVICE_URL = "https://joirush-checkout.onrender.com";

export type CheckoutOrderMode = "single" | "multi_full_price" | "buy4_10off";

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
 * Pricing rule: 1 to 3 cookies are full price. 4 or more cookies (any mix of flavors)
 * are 10% off each. The checkout server enforces the same rule on generated links.
 */
export const BUY4_DISCOUNT_MIN_COOKIES = 4;
export const BUY4_DISCOUNT_PERCENT = 10;

type CookieEntry = { product: Product; quantity: number };

function buildCookieOrder(entries: CookieEntry[], dominantProduct: Product): BuiltCheckoutOrder {
  const totalCookies = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const discountPercent = getBulkDiscountPercent(totalCookies);
  const isDiscounted = discountPercent > 0;

  const lineItems: CheckoutLineItem[] = entries.map(({ product, quantity }) => {
    const discountedUnitUsd = getDiscountedUnitPrice(product.price, discountPercent);
    const unitAmountCents = Math.round(discountedUnitUsd * 100);
    const lineTotalUsd = (unitAmountCents * quantity) / 100;
    return {
      slug: product.slug,
      shortName: product.shortName,
      name: getDisplayName(product),
      image: product.image,
      stripeProductId: product.stripeProductId,
      stripePriceId: isDiscounted
        ? product.stripeTierPriceIds?.buy4TenOff ?? product.stripeBuy4PriceId
        : product.stripeTierPriceIds?.unit ?? product.stripeUnitPriceId,
      quantity,
      originalUnitUsd: product.price,
      discountedUnitUsd,
      unitAmountCents,
      lineTotalUsd,
      lineSavingsUsd: Math.round((product.price * quantity - lineTotalUsd) * 100) / 100,
      discountPercent,
      tierLabel: isDiscounted ? "10% off (4 or more cookies)" : "Full price",
    };
  });

  const originalTotalUsd = lineItems.reduce((sum, item) => sum + item.originalUnitUsd * item.quantity, 0);
  const finalTotalUsd = Math.round(lineItems.reduce((sum, item) => sum + item.lineTotalUsd, 0) * 100) / 100;
  const totalSavingsUsd = Math.round((originalTotalUsd - finalTotalUsd) * 100) / 100;

  const mode: CheckoutOrderMode = totalCookies <= 1 ? "single" : isDiscounted ? "buy4_10off" : "multi_full_price";
  const prefix = totalCookies <= 1 ? "" : isDiscounted ? "buy4off10_" : "full_";
  const mix = lineItems.map((item) => `${item.quantity}x_${item.slug}`).join("__");
  const clientReferenceId =
    (prefix + mix).length <= 200 ? sanitizeClientRef(prefix + mix) : buildBulkClientReferenceId(discountPercent, lineItems);

  const qtyKey = String(Math.min(20, Math.max(1, totalCookies)));
  const singleFlavorUrl =
    lineItems.length === 1
      ? entries[0].product.stripeQuantityUrls?.[qtyKey] ?? (totalCookies === 1 ? entries[0].product.stripeUrl : undefined)
      : undefined;
  const fallbackBaseUrl =
    singleFlavorUrl ?? dominantProduct.stripeQuantityUrls?.[qtyKey] ?? dominantProduct.stripeUrl;

  const fallbackStripeUrl =
    totalCookies <= 1
      ? appendClientRef(fallbackBaseUrl, clientReferenceId)
      : buildStripePaymentLinkUrl(fallbackBaseUrl, {
          clientReferenceId,
          utmCampaign: isDiscounted ? `buy4_10off_${totalCookies}cookies` : `full_price_${totalCookies}cookies`,
          utmContent: `${lineItems.map((i) => `${i.quantity}x_${i.slug.replace(/-cookie$/, "")}`).join("__")}_${finalTotalUsd}usd`,
        });

  const needsDynamicMultiFlavorLink = !singleFlavorUrl;
  const directStripeUrl = needsDynamicMultiFlavorLink
    ? buildDynamicMultiItemCheckoutUrl(lineItems, clientReferenceId, fallbackStripeUrl)
    : fallbackStripeUrl;

  return {
    mode,
    totalCookies,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: isDiscounted
      ? "4 or more cookies (10% off each)"
      : totalCookies <= 1
        ? "Single cookie"
        : `${totalCookies} cookies (full price)`,
    clientReferenceId,
    lineItems,
    directStripeUrl,
    fallbackStripeUrl,
    needsDynamicMultiFlavorLink,
  };
}

function mergeEntries(list: Product[]): CookieEntry[] {
  const out: CookieEntry[] = [];
  for (const product of list) {
    const existing = out.find((e) => e.product.slug === product.slug);
    if (existing) existing.quantity += 1;
    else out.push({ product, quantity: 1 });
  }
  return out;
}

/** Build a 1 cookie order (full price). */
export function buildSingleCookieOrder(product: Product): BuiltCheckoutOrder {
  return buildCookieOrder([{ product, quantity: 1 }], product);
}

/** Build a 2 cookie order (full price, since the discount starts at 4 cookies). */
export function buildPairCookieOrder(firstProduct: Product, secondProduct: Product): BuiltCheckoutOrder {
  return buildCookieOrder(mergeEntries([firstProduct, secondProduct]), firstProduct);
}

/** Build a 3 cookie order (full price, since the discount starts at 4 cookies). */
export function buildTrioCookieOrder(
  firstProduct: Product,
  secondProduct: Product,
  thirdProduct: Product
): BuiltCheckoutOrder {
  return buildCookieOrder(mergeEntries([firstProduct, secondProduct, thirdProduct]), firstProduct);
}

/**
 * Build an order for any mix of 1 to 20 cookies. 4 or more cookies get 10% off each.
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

  const entries = [...rawEntries].sort((a, b) => {
    if (primarySlug) {
      if (a.product.slug === primarySlug) return -1;
      if (b.product.slug === primarySlug) return 1;
    }
    return b.quantity - a.quantity;
  });

  const dominantProduct =
    entries.reduce((best, cur) => (cur.quantity > best.quantity ? cur : best), entries[0])?.product ??
    (primarySlug ? getProduct(primarySlug) : undefined) ??
    products[0];

  if (entries.length === 0) {
    return buildSingleCookieOrder(dominantProduct);
  }
  return buildCookieOrder(entries, dominantProduct);
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
