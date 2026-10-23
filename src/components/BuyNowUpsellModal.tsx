"use client";

import { useEffect, useId, useRef, useCallback, useState } from "react";
import { Image } from "@/components/Image";
import { formatPrice, products, type Product } from "@/data/products";
import { getProductGallery } from "@/data/product-galleries";
import { asset } from "@/lib/paths";

export type UpsellModalProduct = {
  slug?: string;
  name: string;
  shortName: string;
  image: string;
  price: number;
  etsyUrl: string;
  stripeUrl: string;
  stripeUpsellUrl: string;
  stripePairUrls?: Record<string, string>;
  upsellPairPrice: number;
};

type BuyNowUpsellModalProps = {
  product: UpsellModalProduct;
  isOpen: boolean;
  onClose: () => void;
};

type SecondCookieOption = {
  product: Product;
  thumb: string;
  discountedPrice: number;
  savings: number;
};

const secondCookieOptions: SecondCookieOption[] = products.map((item) => {
  const hero = getProductGallery(item.slug, item.image)[0];
  const discountedPrice = item.upsellPairPrice - item.price;
  const savings = item.price - discountedPrice;
  return {
    product: item,
    thumb: asset(hero.thumb),
    discountedPrice,
    savings,
  };
});

let thumbsPreloaded = false;
function preloadSecondCookieThumbs() {
  if (thumbsPreloaded || typeof window === "undefined") return;
  thumbsPreloaded = true;
  for (const option of secondCookieOptions) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = option.thumb;
  }
}

function resolveFirstProductSlug(product: UpsellModalProduct): string {
  if (product.slug) return product.slug;
  const found = products.find(
    (p) => p.shortName === product.shortName || p.name === product.name || p.stripeUrl === product.stripeUrl
  );
  return found?.slug ?? products[0].slug;
}

function buildPairStripeUrl(
  firstProduct: UpsellModalProduct,
  firstSlug: string,
  secondProduct: Product
): string {
  const baseUrl =
    firstProduct.stripePairUrls?.[secondProduct.slug] ?? firstProduct.stripeUpsellUrl;
  const refId = `${firstSlug}__${secondProduct.slug}`;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}client_reference_id=${encodeURIComponent(refId)}`;
}

export function BuyNowUpsellModal({ product, isOpen, onClose }: BuyNowUpsellModalProps) {
  const uid = useId();
  const labelId = `${uid}-second-cookie-label`;
  const listId = `${uid}-second-cookie-list`;
  const optionId = (index: number) => `${uid}-second-cookie-opt-${index}`;

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const firstSlug = resolveFirstProductSlug(product);
  const [secondSlug, setSecondSlug] = useState<string>(firstSlug);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Reset second cookie selection to match the current product whenever the modal opens for a product.
  useEffect(() => {
    if (isOpen) {
      const defaultSlug = resolveFirstProductSlug(product);
      setSecondSlug(defaultSlug);
      setActiveIndex(-1);
      setDropdownOpen(false);
      preloadSecondCookieThumbs();
    }
  }, [isOpen, product]);

  const selectedIndex = Math.max(
    0,
    secondCookieOptions.findIndex((o) => o.product.slug === secondSlug)
  );
  const selectedOption = secondCookieOptions[selectedIndex] ?? secondCookieOptions[0];
  const secondCookie = selectedOption.product;
  const isSameCookie = secondCookie.slug === firstSlug;

  const unitPrice = product.price;
  const secondDiscountedPrice = selectedOption.discountedPrice;
  const savings = selectedOption.savings;
  const pairPrice = unitPrice + secondDiscountedPrice;
  const pairCheckoutUrl = buildPairStripeUrl(product, firstSlug, secondCookie);

  const firstHero = getProductGallery(firstSlug, product.image)[0];
  const firstThumb = asset(firstHero.thumb);

  function scrollOptionIntoView(index: number) {
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!list || !option) return;
    const listRect = list.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();
    if (optionRect.top < listRect.top) {
      list.scrollTop -= listRect.top - optionRect.top;
    } else if (optionRect.bottom > listRect.bottom) {
      list.scrollTop += optionRect.bottom - listRect.bottom;
    }
  }

  function openDropdown(initialKeyboardIndex?: number) {
    preloadSecondCookieThumbs();
    if (typeof initialKeyboardIndex === "number") {
      setActiveIndex(initialKeyboardIndex);
    } else {
      setActiveIndex(-1);
    }
    setDropdownOpen(true);
  }

  function closeDropdown(refocus = true) {
    setDropdownOpen(false);
    setActiveIndex(-1);
    if (refocus) comboRef.current?.focus({ preventScroll: true });
  }

  function chooseOption(index: number) {
    const opt = secondCookieOptions[index];
    if (opt) {
      setSecondSlug(opt.product.slug);
    }
    closeDropdown();
  }

  // Close dropdown on outside pointerdown inside the modal
  useEffect(() => {
    if (!dropdownOpen) return;
    function handlePointer(event: PointerEvent) {
      if (
        pickerWrapperRef.current &&
        !pickerWrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [dropdownOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dropdownOpen) {
          e.preventDefault();
          setDropdownOpen(false);
          setActiveIndex(-1);
          comboRef.current?.focus({ preventScroll: true });
          return;
        }
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus({ preventScroll: true });
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus({ preventScroll: true });
        }
      }
    },
    [onClose, dropdownOpen]
  );

  // Lock body scroll and focus top close button only when modal opens (never when dropdownOpen toggles)
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Attach keyboard listener separately so toggling dropdownOpen never re-triggers modal focus/scroll
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  function handleComboKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = secondCookieOptions.length - 1;
    if (!dropdownOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") openDropdown(0);
        else if (event.key === "End") openDropdown(last);
        else openDropdown(selectedIndex);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const next = activeIndex < 0 ? Math.min(last, selectedIndex + 1) : Math.min(last, activeIndex + 1);
        setActiveIndex(next);
        requestAnimationFrame(() => scrollOptionIntoView(next));
        return;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prev = activeIndex < 0 ? Math.max(0, selectedIndex - 1) : Math.max(0, activeIndex - 1);
        setActiveIndex(prev);
        requestAnimationFrame(() => scrollOptionIntoView(prev));
        return;
      }
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        requestAnimationFrame(() => scrollOptionIntoView(0));
        return;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        requestAnimationFrame(() => scrollOptionIntoView(last));
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        chooseOption(activeIndex >= 0 ? activeIndex : selectedIndex);
        return;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        closeDropdown();
        return;
      case "Tab":
        setDropdownOpen(false);
        setActiveIndex(-1);
        return;
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-chocolate/60 backdrop-blur-sm sm:items-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-modal-title"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        ref={modalRef}
        className="relative mx-0 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-paper p-5 pb-8 shadow-lift sm:mx-4 sm:rounded-3xl sm:p-6 md:p-8"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-chocolate-soft transition hover:bg-cream-deep hover:text-chocolate"
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
          <div className="relative flex flex-shrink-0 items-center">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-cream-deep ring-2 ring-cream-paper sm:h-16 sm:w-16 sm:rounded-2xl">
              <Image
                src={product.image}
                alt={product.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="-ml-3 h-14 w-14 overflow-hidden rounded-xl bg-cream-deep ring-2 ring-cream-paper sm:h-16 sm:w-16 sm:rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedOption.thumb}
                alt={secondCookie.shortName}
                width={128}
                height={128}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-pink sm:text-sm">
              🍪 Double the sweetness
            </p>
            <h2 id="upsell-modal-title" className="mt-0.5 font-display text-xl text-chocolate sm:text-2xl">
              {isSameCookie ? "Want a matching twin?" : "Build your cookie pair"}
            </h2>
          </div>
        </div>

        <p className="text-sm text-chocolate-mid sm:text-base">
          Add a second cookie to your <span className="font-semibold text-chocolate">{product.shortName}</span> and
          save <span className="font-bold text-success-dark">{formatPrice(savings)}</span>. You get{" "}
          <span className="font-bold text-success-dark">10% off</span> whichever second cookie you pick!
        </p>

        {/* Second Cookie Dropdown Selector with Thumbnail Photos */}
        <div ref={pickerWrapperRef} className="relative mt-4" data-second-cookie-picker="">
          <label
            id={labelId}
            className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft"
          >
            Choose your second cookie (10% off)
          </label>
          <div
            ref={comboRef}
            role="combobox"
            tabIndex={0}
            aria-labelledby={labelId}
            aria-haspopup="listbox"
            aria-controls={listId}
            aria-expanded={dropdownOpen}
            aria-activedescendant={dropdownOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
            onClick={() => (dropdownOpen ? closeDropdown() : openDropdown())}
            onKeyDown={handleComboKeyDown}
            onPointerEnter={preloadSecondCookieThumbs}
            onFocus={preloadSecondCookieThumbs}
            data-second-cookie-trigger=""
            className={`mt-1.5 flex min-h-[3.75rem] w-full cursor-pointer select-none items-center gap-3 rounded-2xl border bg-white px-3 py-2 outline-none ring-pink transition focus:ring-2 ${
              dropdownOpen ? "border-pink ring-2" : "border-chocolate/15 hover:border-chocolate/30"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedOption.thumb}
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              decoding="async"
              className="h-12 w-12 shrink-0 rounded-xl bg-cream object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-semibold text-chocolate">
                  {secondCookie.shortName}
                </span>
                {isSameCookie && (
                  <span className="shrink-0 rounded-full bg-pink/15 px-2 py-0.5 text-[11px] font-semibold text-pink">
                    Same cookie
                  </span>
                )}
              </div>
              <p className="text-xs text-chocolate-soft">
                {secondCookie.size} ·{" "}
                <span className="font-semibold text-success-dark">
                  +{formatPrice(secondDiscountedPrice)}
                </span>{" "}
                <span className="line-through">{formatPrice(secondCookie.price)}</span>
              </p>
            </div>
            <svg
              className={`h-5 w-5 shrink-0 text-chocolate-soft transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            hidden={!dropdownOpen}
            onMouseDown={(event) => event.preventDefault()}
            data-second-cookie-list=""
            className=" absolute left-0 right-0 top-full z-20 mt-1.5 max-h-60 overflow-y-auto overscroll-contain rounded-2xl border border-chocolate/15 bg-white p-1.5 shadow-lift"
          >
            {secondCookieOptions.map((option, index) => {
              const isSelected = index === selectedIndex;
              const isActive = index === activeIndex;
              const isMatching = option.product.slug === firstSlug;
              return (
                <li
                  key={option.product.slug}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  data-index={index}
                  data-cookie-slug={option.product.slug}
                  onClick={() => chooseOption(index)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition ${
                    isActive
                      ? "bg-cream ring-1 ring-pink/40"
                      : isSelected
                        ? "bg-pink/5 hover:bg-cream"
                        : "hover:bg-cream"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={option.thumb}
                    alt={option.product.shortName}
                    width={48}
                    height={48}
                    decoding="async"
                    className="h-12 w-12 shrink-0 rounded-xl bg-cream object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-semibold text-chocolate">
                        {option.product.shortName}
                      </span>
                      {isMatching && (
                        <span className="shrink-0 rounded-full bg-pink/15 px-2 py-0.5 text-[10px] font-semibold text-pink">
                          Matching
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-chocolate-soft">
                      {option.product.size} ·{" "}
                      <span className="font-semibold text-success-dark">
                        +{formatPrice(option.discountedPrice)}
                      </span>{" "}
                      <span className="line-through">{formatPrice(option.product.price)}</span>
                    </p>
                  </div>
                  {isSelected && (
                    <svg
                      className="h-5 w-5 shrink-0 text-pink"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-4 space-y-2 rounded-xl bg-cream-deep/80 p-3 sm:mt-5 sm:space-y-2.5 sm:rounded-2xl sm:p-4">
          <div className="flex items-center justify-between text-sm text-chocolate-mid">
            <span className="flex items-center gap-2 truncate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firstThumb}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 rounded-md object-cover"
              />
              <span className="truncate">1. {product.shortName}</span>
            </span>
            <span className="font-semibold text-chocolate">{formatPrice(unitPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-chocolate-mid">
            <span className="flex items-center gap-2 truncate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedOption.thumb}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 rounded-md object-cover"
              />
              <span className="truncate">2. {secondCookie.shortName} (10% off)</span>
            </span>
            <span className="font-semibold text-success-dark">+{formatPrice(secondDiscountedPrice)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-chocolate/10 pt-2.5">
            <span className="font-semibold text-chocolate">2 cookies total</span>
            <div className="text-right">
              <span className="text-lg font-bold text-success-dark">{formatPrice(pairPrice)}</span>
              <span className="ml-2 text-sm text-success">(save {formatPrice(savings)})</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-chocolate-mid sm:mt-5 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Ships in 14 days</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Free U.S. shipping</span>
          </span>
        </div>

        <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
          <a
            href={pairCheckoutUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 sm:px-6 sm:py-4 sm:text-lg"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add the second · {formatPrice(pairPrice)}
          </a>
          <a
            href={product.stripeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 sm:px-6 sm:text-base"
          >
            No thanks · just one @ {formatPrice(unitPrice)}
          </a>
        </div>

        <p className="mt-3 text-center text-xs text-chocolate-soft sm:mt-4">
          Secure checkout powered by Stripe · Handmade to order
        </p>
      </div>
    </div>
  );
}
