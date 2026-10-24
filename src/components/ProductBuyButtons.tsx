"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  BuyNowUpsellModal,
  type UpsellModalProduct,
  type UpsellModalStep,
} from "./BuyNowUpsellModal";
import {
  formatPrice,
  getBulkDiscountPercent,
  getDiscountedUnitPrice,
  getProduct,
  products,
} from "@/data/products";
import { getProductGallery } from "@/data/product-galleries";
import {
  buildBulkCookieOrder,
  JOIRUSH_CHECKOUT_SERVICE_URL,
  openStripeCheckoutOrder,
  prefetchMultiFlavorStripeUrl,
} from "@/lib/checkout";
import { asset } from "@/lib/paths";

type ProductBuyButtonsProps = {
  product: UpsellModalProduct;
};

const MAX_BULK_COOKIES = 20;

const cookieCatalogItems = products.map((item) => {
  const hero = getProductGallery(item.slug, item.image)[0];
  return {
    product: item,
    thumb: asset(hero.thumb),
  };
});

export function ProductBuyButtons({ product }: ProductBuyButtonsProps) {
  const currentSlug =
    product.slug ||
    products.find((p) => p.shortName === product.shortName)?.slug ||
    products[0].slug;

  const [quantities, setQuantities] = useState<Record<string, number>>(() => ({
    [currentSlug]: 1,
  }));
  const [mixOpen, setMixOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState<UpsellModalStep>("second_cookie");
  const [modalInitialSecondSlug, setModalInitialSecondSlug] = useState<string>(currentSlug);

  const totalCookies = useMemo(
    () =>
      Object.values(quantities).reduce(
        (sum, qty) => sum + Math.max(0, Math.floor(qty || 0)),
        0
      ),
    [quantities]
  );

  const selectedEntries = useMemo(
    () =>
      cookieCatalogItems
        .map((entry) => ({
          ...entry,
          quantity: Math.max(0, Math.floor(quantities[entry.product.slug] ?? 0)),
        }))
        .filter((entry) => entry.quantity > 0),
    [quantities]
  );

  // Dynamically resolve the customer's active primary cookie from their selection
  const activePrimaryProduct = useMemo(() => {
    if (selectedEntries.length === 1) {
      return selectedEntries[0].product;
    }
    if (selectedEntries.length > 1) {
      const currentEntry = selectedEntries.find((e) => e.product.slug === currentSlug);
      const highestEntry = selectedEntries.reduce(
        (best, cur) => (cur.quantity > best.quantity ? cur : best),
        selectedEntries[0]
      );
      if (currentEntry && currentEntry.quantity >= highestEntry.quantity) {
        return currentEntry.product;
      }
      return highestEntry.product;
    }
    return getProduct(currentSlug) ?? products[0];
  }, [selectedEntries, currentSlug]);

  const activePrimarySlug = activePrimaryProduct.slug;

  const bulkOrder = useMemo(
    () => buildBulkCookieOrder(quantities, activePrimarySlug),
    [quantities, activePrimarySlug]
  );

  const activeBulkDiscount = getBulkDiscountPercent(totalCookies);

  // Warm up multi-flavor checkout endpoint when Mix & Match drawer opens
  useEffect(() => {
    if (!mixOpen) return;
    fetch(`${JOIRUSH_CHECKOUT_SERVICE_URL}/health`).catch(() => {});
  }, [mixOpen]);

  // Pre-create and cache the exact multi-item Stripe Payment Link whenever the user mixes multiple flavors
  useEffect(() => {
    if (!bulkOrder.needsDynamicMultiFlavorLink) return;
    const timer = window.setTimeout(() => {
      void prefetchMultiFlavorStripeUrl(bulkOrder);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [bulkOrder]);

  function setTotalQuantity(nextTotal: number) {
    const clamped = Math.max(1, Math.min(MAX_BULK_COOKIES, nextTotal));
    const delta = clamped - totalCookies;
    if (delta === 0) return;

    setQuantities((prev) => {
      const next = { ...prev };
      if (delta > 0) {
        next[activePrimarySlug] = Math.max(0, next[activePrimarySlug] ?? 0) + delta;
        return next;
      }
      // Reduce from activePrimarySlug first, then from other cookies if needed
      let toRemove = -delta;
      const currentQty = next[activePrimarySlug] ?? 0;
      const removeCurrent = Math.min(currentQty, toRemove);
      next[activePrimarySlug] = currentQty - removeCurrent;
      toRemove -= removeCurrent;

      if (toRemove > 0) {
        for (const item of products) {
          if (toRemove <= 0) break;
          const q = next[item.slug] ?? 0;
          if (q > 0) {
            const r = Math.min(q, toRemove);
            next[item.slug] = q - r;
            toRemove -= r;
          }
        }
      }

      // Ensure at least 1 cookie remains
      const remaining = Object.values(next).reduce((s, v) => s + (v || 0), 0);
      if (remaining < 1) {
        next[activePrimarySlug] = 1;
      }
      return next;
    });
  }

  function updateFlavorQuantity(slug: string, nextQty: number) {
    setQuantities((prev) => {
      const currentFlavorQty = Math.max(0, prev[slug] ?? 0);
      const otherTotal = Object.entries(prev).reduce(
        (sum, [k, v]) => (k === slug ? sum : sum + Math.max(0, v || 0)),
        0
      );
      const maxForFlavor = Math.max(0, MAX_BULK_COOKIES - otherTotal);
      const clampedFlavorQty = Math.max(0, Math.min(maxForFlavor, nextQty));

      // Keep at least 1 cookie in the selector overall
      if (otherTotal + clampedFlavorQty < 1) {
        if (currentFlavorQty === 1 && otherTotal === 0) {
          return { [slug]: 1 };
        }
        return { ...prev, [slug]: 1 };
      }
      return {
        ...prev,
        [slug]: clampedFlavorQty,
      };
    });
  }

  function selectOnlyFlavor(slug: string) {
    setQuantities({ [slug]: Math.max(1, totalCookies) });
  }

  function handlePrimaryBuyClick() {
    if (totalCookies <= 1) {
      setModalInitialStep("second_cookie");
      setModalInitialSecondSlug(activePrimarySlug);
      setIsModalOpen(true);
      return;
    }

    if (totalCookies === 2) {
      // Determine 1st and 2nd cookie slugs from the current selection and offer a third cookie.
      let secondSlug = activePrimarySlug;
      if (selectedEntries.length === 1) {
        secondSlug = selectedEntries[0].product.slug;
      } else if (selectedEntries.length >= 2) {
        const other = selectedEntries.find((e) => e.product.slug !== activePrimarySlug);
        secondSlug = other ? other.product.slug : selectedEntries[1].product.slug;
      }
      setModalInitialStep("third_cookie");
      setModalInitialSecondSlug(secondSlug);
      setIsModalOpen(true);
      return;
    }

    // 3 to 20 cookies order (including 20 cookies of any single or mixed combination):
    // Go straight to the single unified Stripe Checkout page with zero intermediate modal!
    openStripeCheckoutOrder(bulkOrder);
  }

  const currentHero = getProductGallery(activePrimarySlug, activePrimaryProduct.image)[0];
  const currentThumb = asset(currentHero.thumb);

  const primaryProductForModal: UpsellModalProduct = useMemo(() => {
    const p = activePrimaryProduct;
    return {
      slug: p.slug,
      name: p.name,
      shortName: p.shortName,
      image: p.image,
      price: p.price,
      etsyUrl: p.etsyUrl,
      stripeUrl: p.stripeUrl,
      stripeUpsellUrl: p.stripeUpsellUrl,
      upsellPairPrice: p.upsellPairPrice,
    };
  }, [activePrimaryProduct]);

  const selectedSummaryText = useMemo(
    () =>
      selectedEntries
        .map((entry) => `${entry.quantity}× ${entry.product.shortName}`)
        .join(" + "),
    [selectedEntries]
  );

  return (
    <>
      <div className="mt-6 rounded-2xl border border-chocolate/12 bg-cream-paper p-4 shadow-sm sm:p-5">
        {/* Pricing Groups Bullet Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-pink">
            🍪 Buy 4, Save 10%
          </p>
          <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success-dark">
            Mix &amp; match any cookie flavors
          </span>
        </div>

        <ul
          data-bulk-tier-bullets=""
          className="mt-2.5 grid grid-cols-1 gap-1.5 text-xs text-chocolate-mid"
        >
          <li className="flex items-center gap-1.5">
            <span className="font-bold text-success">•</span>
            <span>
              <strong>Buy 4 or more cookies</strong> and get 10% off each cookie
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="font-bold text-success">•</span>
            <span>1 to 3 cookies are full price. Mix and match any flavors.</span>
          </li>
        </ul>

        {/* Quick Quantity Preset Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5" role="group" aria-label="Quick quantity presets">
          {[
            { qty: 1, label: "1 Cookie" },
            { qty: 2, label: "2 Cookies" },
            { qty: 3, label: "3 Cookies" },
            { qty: 4, label: "4 or more (10% off each)" },
          ].map((preset) => {
            const isActive = preset.qty === 4 ? totalCookies >= 4 : totalCookies === preset.qty;
            return (
              <button
                key={preset.qty}
                type="button"
                onClick={() => setTotalQuantity(preset.qty)}
                data-tier-preset={preset.qty}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-chocolate text-cream shadow-sm"
                    : "bg-cream-deep text-chocolate-mid hover:bg-chocolate/10 hover:text-chocolate"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Quantity Stepper Row */}
        <div
          data-quantity-selector=""
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-chocolate/10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
              Quantity (1 to 20 cookies)
            </p>
            <p className="mt-0.5 text-sm font-semibold text-chocolate">
              {totalCookies === 1 && `1 cookie · ${activePrimaryProduct.shortName} (${formatPrice(activePrimaryProduct.price)})`}
              {totalCookies >= 2 && totalCookies < 4 && `${totalCookies} cookies at full price`}
              {totalCookies >= 4 && `${totalCookies} cookies · 10% off each cookie`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTotalQuantity(totalCookies - 1)}
              disabled={totalCookies <= 1}
              data-qty-minus=""
              aria-label="Decrease cookie quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-chocolate/20 bg-cream text-lg font-bold text-chocolate transition hover:bg-cream-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              &#8722;
            </button>
            <span
              data-qty-value=""
              aria-live="polite"
              className="min-w-[2.25rem] text-center font-display text-xl text-chocolate"
            >
              {totalCookies}
            </span>
            <button
              type="button"
              onClick={() => setTotalQuantity(totalCookies + 1)}
              disabled={totalCookies >= MAX_BULK_COOKIES}
              data-qty-plus=""
              aria-label="Increase cookie quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-chocolate/20 bg-cream text-lg font-bold text-chocolate transition hover:bg-cream-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        {/* Buy 4 discount nudge */}
        {totalCookies >= 2 && totalCookies < 4 && (
          <p className="mt-2 text-xs font-medium text-success-dark">
            💡 Add {4 - totalCookies} more {4 - totalCookies === 1 ? "cookie" : "cookies"} to get{" "}
            <strong>10% off each cookie</strong>.
          </p>
        )}
        {totalCookies >= 4 && (
          <p className="mt-2 text-xs font-medium text-success-dark">
            🎉 <strong>10% off each cookie</strong> unlocked!
          </p>
        )}

        {/* Single Big Eye-Catching Animated "Mix & Match Flavors" Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setMixOpen((prev) => !prev)}
            data-mix-flavors-toggle=""
            aria-expanded={mixOpen}
            className="animate-knock-around group flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-white/40 bg-pink px-4 py-4 text-left text-white shadow-lg transition hover:scale-[1.02] hover:bg-pink-dark focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2 sm:px-5 sm:py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex shrink-0 items-center -space-x-2">
                {selectedEntries.slice(0, 3).map((entry) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={entry.product.slug}
                    src={entry.thumb || currentThumb}
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <div className="min-w-0">
                <span className="block text-base font-extrabold uppercase tracking-wide text-white sm:text-lg">
                  {mixOpen ? "Done Mixing Flavors" : "🍪 Mix & Match Cookie Flavors"}
                </span>
                <span className="mt-0.5 block truncate text-xs font-semibold text-white/95 sm:text-sm">
                  {mixOpen
                    ? `In cart (${totalCookies}): ${selectedSummaryText}`
                    : `In cart (${totalCookies}): ${selectedSummaryText} · Tap to mix all 11 cookies`}
                </span>
              </div>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/25 text-white">
              <svg
                className={`h-5 w-5 transition-transform ${mixOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {mixOpen && (
            <div
              data-mix-flavors-panel=""
              className="mt-3 rounded-2xl border-2 border-pink/30 bg-white p-3.5 shadow-md"
            >
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-chocolate-soft">
                <span className="font-bold text-chocolate">
                  Pick quantities for any cookie flavor ({totalCookies} of {MAX_BULK_COOKIES} selected)
                </span>
                {(selectedEntries.length > 1 || activePrimarySlug !== currentSlug) && (
                  <button
                    type="button"
                    onClick={() => setQuantities({ [currentSlug]: totalCookies })}
                    className="font-bold text-pink hover:underline"
                  >
                    Reset to {product.shortName}
                  </button>
                )}
              </div>

              <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
                {cookieCatalogItems.map(({ product: item, thumb }) => {
                  const qty = Math.max(0, Math.floor(quantities[item.slug] ?? 0));
                  const perUnitUsd =
                    activeBulkDiscount > 0
                      ? getDiscountedUnitPrice(item.price, activeBulkDiscount)
                      : item.price;

                  return (
                    <div
                      key={item.slug}
                      data-flavor-row={item.slug}
                      className={`flex items-center justify-between gap-2 rounded-xl p-2 transition ${
                        qty > 0
                          ? "bg-success/10 ring-1 ring-success/40"
                          : "bg-cream/50 hover:bg-cream"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb}
                          alt={item.shortName}
                          width={44}
                          height={44}
                          decoding="async"
                          className="h-11 w-11 shrink-0 rounded-xl bg-cream object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-chocolate">
                            {item.shortName}
                          </p>
                          <p className="text-xs text-chocolate-soft">
                            {item.size} ·{" "}
                            <span className="font-semibold text-success-dark">
                              {formatPrice(perUnitUsd)} each
                            </span>
                            {activeBulkDiscount > 0 && (
                              <span className="ml-1 line-through">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        {(qty !== totalCookies || selectedEntries.length > 1) && (
                          <button
                            type="button"
                            onClick={() => selectOnlyFlavor(item.slug)}
                            data-flavor-only={item.slug}
                            className="rounded-full bg-cream-deep px-2.5 py-1 text-[11px] font-bold text-chocolate-mid transition hover:bg-chocolate hover:text-cream"
                            title={`Switch selection to only ${item.shortName}`}
                          >
                            Only
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => updateFlavorQuantity(item.slug, qty - 1)}
                          disabled={qty <= 0 || (qty === 1 && totalCookies === 1)}
                          data-flavor-minus={item.slug}
                          aria-label={`Remove one ${item.shortName}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-chocolate/20 bg-white text-sm font-bold text-chocolate transition hover:bg-cream disabled:opacity-30"
                        >
                          &#8722;
                        </button>
                        <span
                          data-flavor-qty={item.slug}
                          className="min-w-[1.75rem] text-center text-sm font-bold text-chocolate"
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateFlavorQuantity(item.slug, qty + 1)}
                          disabled={totalCookies >= MAX_BULK_COOKIES}
                          data-flavor-plus={item.slug}
                          aria-label={`Add one ${item.shortName}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-chocolate/20 bg-white text-sm font-bold text-chocolate transition hover:bg-cream disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Live Order Summary Bar when >= 2 cookies */}
        {totalCookies >= 2 && (
          <div className="mt-3.5 flex items-center justify-between rounded-xl bg-success/10 px-3.5 py-2.5 text-sm">
            <div>
              <span className="font-semibold text-chocolate">
                {totalCookies} cookies total
              </span>
              <span className="ml-1.5 text-xs text-success-dark">
                ({bulkOrder.discountSummaryLabel})
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-success-dark">
                {formatPrice(bulkOrder.finalTotalUsd)}
              </span>
              {bulkOrder.totalSavingsUsd > 0 && (
                <>
                  <span className="ml-1.5 text-xs text-chocolate-soft line-through">
                    {formatPrice(bulkOrder.originalTotalUsd)}
                  </span>
                  <span className="ml-1.5 text-xs font-semibold text-success-dark">
                    Save {formatPrice(bulkOrder.totalSavingsUsd)}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          data-buy-cta="primary"
          onClick={handlePrimaryBuyClick}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalCookies <= 1
            ? `Buy Now · ${formatPrice(activePrimaryProduct.price)}`
            : totalCookies < 4
              ? `Buy ${totalCookies} Cookies · ${formatPrice(bulkOrder.finalTotalUsd)}`
              : `Buy ${totalCookies} Cookies (10% off each) · ${formatPrice(bulkOrder.finalTotalUsd)}`}
        </button>
        <a
          data-buy-cta="etsy"
          href={activePrimaryProduct.etsyUrl}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-etsy px-6 py-3 text-sm font-medium text-white transition hover:bg-etsy-dark"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.559 2c-.556.004-1.36.025-2.033.138C5.32 2.322 4.13 2.884 3.507 3.507c-.623.623-1.185 1.813-1.369 3.019-.113.673-.134 1.477-.138 2.033v6.882c.004.556.025 1.36.138 2.033.184 1.206.746 2.396 1.369 3.019.623.623 1.813 1.185 3.019 1.369.673.113 1.477.134 2.033.138h6.882c.556-.004 1.36-.025 2.033-.138 1.206-.184 2.396-.746 3.019-1.369.623-.623 1.185-1.813 1.369-3.019.113-.673.134-1.477.138-2.033V8.559c-.004-.556-.025-1.36-.138-2.033-.184-1.206-.746-2.396-1.369-3.019-.623-.623-1.813-1.185-3.019-1.369C16.8 2.025 15.997 2.004 15.441 2H8.559zm.385 4.516h5.812c.283.004.686.012.847.223.15.196.136.517.132.809l-.026 1.645a.61.61 0 01-.617.592c-.32-.006-.645-.01-.967-.011l-.06-.001c-.387-.001-.775.002-1.163.009l.004-.254c.003-.234.006-.467-.029-.669-.05-.285-.216-.47-.526-.58a2.377 2.377 0 00-.557-.11c-.282-.029-.503.045-.66.228-.166.193-.248.469-.261.788l-.025.597c.67.007 1.339.024 2.009.05.387.015.573.168.586.478.005.13-.002.26-.009.39l-.015.266-.016.278c-.012.228-.108.334-.304.378a8.677 8.677 0 01-.367.065c-.636.1-1.271.18-1.907.242l-.033.872c-.009.237-.003.499.004.762l.004.134c.012.346.024.693.004 1.038-.038.65-.22 1.243-.535 1.793a2.49 2.49 0 01-.344.448c-.157.16-.379.248-.573.087-.178-.147-.172-.366-.109-.575.08-.263.157-.527.23-.792l.113-.413c.178-.676.345-1.353.468-2.04l.055-.324-.42.029c-.303.02-.607.038-.91.044-.317.007-.483-.121-.513-.395a5.59 5.59 0 01-.022-.51c.004-.189.073-.326.25-.412.158-.077.33-.094.502-.11l.214-.02c.284-.026.568-.056.852-.088l.037-.858c-.45.014-.9.026-1.35.028-.375.002-.556-.147-.573-.475-.01-.194-.002-.39.006-.585l.01-.227c.015-.302.155-.44.495-.471.345-.032.69-.058 1.035-.08l.34-.02.074-1.51c.031-.629.251-.893.886-.926z" />
          </svg>
          Buy on Etsy
        </a>
        <Link
          href="/custom/"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-chocolate/10 px-6 py-3 text-sm font-medium text-chocolate-soft transition hover:border-chocolate/20 hover:text-chocolate-mid"
        >
          Dream up a custom version
        </Link>
      </div>
      <BuyNowUpsellModal
        product={primaryProductForModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStep={modalInitialStep}
        initialSecondSlug={modalInitialSecondSlug}
      />
    </>
  );
}
