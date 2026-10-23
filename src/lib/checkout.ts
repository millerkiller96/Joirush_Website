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
  lineItems: CheckoutLineItem[];
  directStripeUrl: string | null;
  fallbackStripeUrl: string;
};

function appendClientRef(url: string, clientReferenceId: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}client_reference_id=${encodeURIComponent(clientReferenceId.slice(0, 200))}`;
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
    stripePriceId: product.stripeUnitPriceId,
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
      stripePriceId: firstProduct.stripeUnitPriceId,
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
      stripePriceId: secondProduct.stripeSecond10OffPriceId,
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
    : firstProduct.stripePairUrls?.[secondProduct.slug] ?? null;

  const directStripeUrl = mappedPairUrl ? appendClientRef(mappedPairUrl, clientReferenceId) : null;
  const fallbackStripeUrl = appendClientRef(
    mappedPairUrl ?? firstProduct.stripeUpsellUrl,
    clientReferenceId
  );

  return {
    mode: "pair_bogo10",
    totalCookies: 2,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd: secondSavingsUsd,
    discountSummaryLabel: "Buy 1, get 1 10% off",
    clientReferenceId,
    lineItems,
    directStripeUrl,
    fallbackStripeUrl,
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

  const lineItems: CheckoutLineItem[] = [
    {
      slug: firstProduct.slug,
      shortName: firstProduct.shortName,
      name: getDisplayName(firstProduct),
      image: firstProduct.image,
      stripeProductId: firstProduct.stripeProductId,
      stripePriceId: firstProduct.stripeUnitPriceId,
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
      stripePriceId: secondProduct.stripeSecond10OffPriceId,
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

  return {
    mode: "trio_third15",
    totalCookies: 3,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: "2nd cookie 10% off + 3rd cookie 15% off",
    clientReferenceId,
    lineItems,
    directStripeUrl: null,
    fallbackStripeUrl: appendClientRef(firstProduct.stripeUpsellUrl, clientReferenceId),
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
  const entries = products
    .map((product) => ({
      product,
      quantity: Math.max(0, Math.floor(quantitiesBySlug[product.slug] ?? 0)),
    }))
    .filter((entry) => entry.quantity > 0);

  const fallbackProduct =
    (primarySlug ? getProduct(primarySlug) : undefined) ?? entries[0]?.product ?? products[0];

  const totalCookies = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  if (totalCookies <= 1) {
    return buildSingleCookieOrder(entries[0]?.product ?? fallbackProduct);
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

  const compactMix = lineItems.map((item) => `${item.quantity}x_${item.slug}`).join("__");
  const clientReferenceId = `bulk${discountPercent}_${compactMix}`.slice(0, 200);

  // If only 1 cookie flavor is in the bulk order and a static bulk tier URL exists for that flavor,
  // check if the quantity matches the link's default or use dynamic checkout.
  const singleFlavorBulkUrl =
    lineItems.length === 1 ? entries[0].product.stripeBulkTierUrls?.[tierKey] : undefined;

  return {
    mode: "bulk_tier",
    totalCookies,
    originalTotalUsd,
    finalTotalUsd,
    totalSavingsUsd,
    discountSummaryLabel: tierRangeLabel,
    clientReferenceId,
    lineItems,
    directStripeUrl: singleFlavorBulkUrl
      ? appendClientRef(singleFlavorBulkUrl, clientReferenceId)
      : null,
    fallbackStripeUrl: appendClientRef(
      singleFlavorBulkUrl ?? fallbackProduct.stripeUpsellUrl,
      clientReferenceId
    ),
  };
}

export type CheckoutRedirectResult =
  | { ok: true; url: string }
  | { ok: false; reason: "endpoint_unavailable"; order: BuiltCheckoutOrder };

/**
 * Request a dynamic Stripe Checkout Session for multi-cookie / mixed-flavor / bulk orders,
 * or return the direct Stripe Payment Link when a static link already matches the exact items.
 */
export async function resolveStripeCheckoutUrl(
  order: BuiltCheckoutOrder
): Promise<CheckoutRedirectResult> {
  if (order.directStripeUrl) {
    return { ok: true, url: order.directStripeUrl };
  }

  if (typeof window !== "undefined" && GOOGLE_SCRIPT_URL) {
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 6500);
      const payload = {
        type: "checkout",
        stripeAccountId: JOIRUSH_STRIPE_ACCOUNT_ID,
        shippingRateId: JOIRUSH_FREE_SHIPPING_RATE_ID,
        mode: order.mode,
        totalCookies: order.totalCookies,
        originalTotalUsd: order.originalTotalUsd,
        finalTotalUsd: order.finalTotalUsd,
        totalSavingsUsd: order.totalSavingsUsd,
        discountSummaryLabel: order.discountSummaryLabel,
        clientReferenceId: order.clientReferenceId,
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
        | { ok?: boolean; url?: string; error?: string }
        | null;

      if (data?.ok && typeof data.url === "string" && data.url.startsWith("https://")) {
        return { ok: true, url: data.url };
      }
    } catch {
      // Fall through to fallback handling
    }
  }

  return { ok: false, reason: "endpoint_unavailable", order };
}

/**
 * Submits a multi-cookie / bulk order invoice request when live Checkout Session creation
 * is awaiting Stripe key setup, so no customer order or cookie selection is ever lost.
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
        `${idx + 1}. ${item.quantity}x ${item.shortName} (${item.name}) [${item.stripeProductId}] @ ${formatPrice(item.discountedUnitUsd)} each (${item.tierLabel}) = ${formatPrice(item.lineTotalUsd)}`
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
    shipping_address: shippingAddress || "Will provide on Stripe invoice",
    notes: notes || "None",
    page: typeof window !== "undefined" ? window.location.href : undefined,
  });
}
