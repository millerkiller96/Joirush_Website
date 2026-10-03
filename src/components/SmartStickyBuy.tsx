"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Smart sticky "Buy Now" button.
 *
 * Shows a fixed Buy Now button ONLY when no real buy/shop CTA is on screen.
 *
 * How visibility is decided:
 * - Every real CTA on the site is marked with `data-buy-cta="<kind>"`
 *   (product Buy Now = "primary", Etsy buy = "etsy", shop links = "shop",
 *   product cards = "product-card"). Elements the bar must never cover
 *   (e.g. form submit buttons) are marked `data-sticky-buy-avoid`.
 * - An IntersectionObserver watches all of them. A MutationObserver picks up
 *   CTAs added after load (client-rendered grids, route changes, modals).
 * - The bar is hidden when any tracked element is meaningfully visible, when
 *   the site footer is in view, while a modal dialog is open, while a form
 *   field is focused, and for a short settle period after each page load.
 * - Pages opt out with `data-sticky-buy="off"` (404, jewelry) or by path.
 *
 * What it does when clicked:
 * - Product pages: clicks the page's own primary Buy Now button, so the exact
 *   same pair-upsell modal → Stripe flow runs (no duplicated Stripe URLs).
 * - Pages with a `data-buy-target` product grid: scrolls to it.
 * - Everything else: links to /catalogue/.
 */

const CTA_SELECTOR = "[data-buy-cta], [data-sticky-buy-avoid]";
const PRIMARY_SELECTOR = '[data-buy-cta="primary"]';
const TARGET_SELECTOR = "[data-buy-target]";
const DIALOG_SELECTOR = '[role="dialog"][aria-modal="true"]';
const DISABLE_SELECTOR = '[data-sticky-buy="off"]';
const FOOTER_SELECTOR = "[data-site-footer]";
const HIDDEN_PATH_PREFIXES = ["/b/", "/jewelry"];
const FIELD_SELECTOR = "input, textarea, select, [contenteditable='true']";
/** Keep the bar hidden briefly after load so it never flashes over an above-the-fold CTA. */
const SETTLE_MS = 700;
/** Sticky site header height — CTAs tucked under it don't count as visible. */
const TOP_INSET_PX = 80;
const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

type Mode = "product" | "scroll" | "link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isMeaningfullyVisible(entry: IntersectionObserverEntry) {
  if (!entry.isIntersecting) return false;
  const height = entry.boundingClientRect.height;
  const shown = entry.intersectionRect.height;
  // Buttons/links: a clear sliver (20px or half) on screen means the viewer can see it.
  if (height <= 120) return shown >= Math.min(20, height * 0.5);
  // Tall product cards: half the card, or a decent 160px chunk of it.
  return entry.intersectionRatio >= 0.5 || shown >= 160;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function track(mode: Mode, pathname: string) {
  try {
    window.gtag?.("event", "sticky_buy_now_click", { sticky_mode: mode, page_path: pathname });
  } catch {
    // analytics must never break the button
  }
}

export function SmartStickyBuy() {
  const pathname = usePathname() || "/";
  const isProduct = pathname.startsWith("/product/");
  const pathDisabled = HIDDEN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const [settled, setSettled] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  const [domDisabled, setDomDisabled] = useState(false);
  const [hasTarget, setHasTarget] = useState(false);
  const [hasPrimary, setHasPrimary] = useState(false);

  useEffect(() => {
    setSettled(false);
    setCtaVisible(false);
    setFooterVisible(false);
    if (pathDisabled || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<Element>();
    const observed = new Set<Element>();
    let footerEl: Element | null = null;

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (isMeaningfullyVisible(entry)) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setCtaVisible(visible.size > 0);
      },
      { rootMargin: `-${TOP_INSET_PX}px 0px 0px 0px`, threshold: THRESHOLDS }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        const last = entries[entries.length - 1];
        if (last) setFooterVisible(last.isIntersecting);
      },
      { threshold: 0 }
    );

    const scan = () => {
      // Drop CTAs that left the DOM (route change, filter change, modal closed).
      for (const el of observed) {
        if (!el.isConnected) {
          ctaObserver.unobserve(el);
          observed.delete(el);
          visible.delete(el);
        }
      }
      document.querySelectorAll(CTA_SELECTOR).forEach((el) => {
        if (observed.has(el)) return;
        // On a product page the sticky button buys THIS product, so related-product
        // cards shouldn't suppress it. Elsewhere product cards are the shopping CTA.
        if (isProduct && el.getAttribute("data-buy-cta") === "product-card") return;
        observed.add(el);
        ctaObserver.observe(el);
      });
      setCtaVisible(visible.size > 0);

      const footer = document.querySelector(FOOTER_SELECTOR);
      if (footer !== footerEl) {
        if (footerEl) footerObserver.unobserve(footerEl);
        footerEl = footer;
        if (footer) footerObserver.observe(footer);
      }

      setDialogOpen(Boolean(document.querySelector(DIALOG_SELECTOR)));
      setDomDisabled(Boolean(document.querySelector(DISABLE_SELECTOR)));
      setHasTarget(Boolean(document.querySelector(TARGET_SELECTOR)));
      setHasPrimary(Boolean(document.querySelector(PRIMARY_SELECTOR)));
    };

    let frame = 0;
    const scheduleScan = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    };

    scan();
    const mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const settleTimer = window.setTimeout(() => setSettled(true), SETTLE_MS);

    return () => {
      window.clearTimeout(settleTimer);
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      ctaObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [pathname, pathDisabled, isProduct]);

  // Hide while someone is typing in a form (mobile keyboards + fixed bars = covered fields).
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Element | null;
      setFieldFocused(Boolean(target?.matches?.(FIELD_SELECTOR)));
    };
    const onFocusOut = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        setFieldFocused(Boolean(active?.matches?.(FIELD_SELECTOR)));
      }, 0);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (pathDisabled) return null;

  const mode: Mode = isProduct && hasPrimary ? "product" : hasTarget ? "scroll" : "link";
  const show =
    settled && !domDisabled && !ctaVisible && !footerVisible && !dialogOpen && !fieldFocused;

  const handleProductClick = () => {
    track("product", pathname);
    const primary = document.querySelector<HTMLElement>(PRIMARY_SELECTOR);
    // Re-use the page's own Buy Now so the pair-upsell modal + Stripe links stay identical.
    primary?.click();
  };

  const handleScrollClick = () => {
    track("scroll", pathname);
    const target = document.querySelector<HTMLElement>(TARGET_SELECTOR);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block: "start" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  const ariaLabel =
    mode === "product"
      ? "Buy Now — open checkout options for this piece"
      : mode === "scroll"
        ? "Buy Now — jump to the cookie art you can buy on this page"
        : "Buy Now — shop the full cookie art catalogue";

  // `sticky-buy-attention` (globals.css) adds the desktop-only (>=768px, same as `md:`)
  // pulsing glow + periodic wiggle; it is a no-op on the mobile full-width bar.
  const buttonClass =
    "sticky-buy-attention group flex w-full items-center justify-center gap-2 rounded-full bg-success px-6 py-3.5 text-lg font-bold text-white shadow-lg ring-1 ring-white/20 transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:w-auto md:px-8 md:py-4 md:shadow-lift";

  const content = (
    <>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>Buy Now</span>
    </>
  );

  return (
    <div
      data-smart-sticky-buy=""
      data-state={show ? "visible" : "hidden"}
      data-mode={mode}
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transform-gpu transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none md:bottom-6 md:left-auto md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div
        className="border-t border-chocolate/10 bg-cream-paper/95 px-4 pt-3 shadow-[0_-12px_30px_-18px_rgba(42,24,16,0.35)] backdrop-blur-lg sticky-buy-safe-area md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
      >
        {mode === "product" ? (
          <button type="button" onClick={handleProductClick} aria-label={ariaLabel} className={buttonClass}>
            {content}
          </button>
        ) : mode === "scroll" ? (
          <button type="button" onClick={handleScrollClick} aria-label={ariaLabel} className={buttonClass}>
            {content}
          </button>
        ) : (
          <Link href="/catalogue/" onClick={() => track("link", pathname)} aria-label={ariaLabel} className={buttonClass}>
            {content}
          </Link>
        )}
      </div>
    </div>
  );
}
