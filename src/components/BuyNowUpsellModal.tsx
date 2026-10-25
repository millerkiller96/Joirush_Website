"use client";

import { useEffect, useId, useRef, useCallback, useState } from "react";
import { Image } from "@/components/Image";
import {
  formatPrice,
  getProduct,
  getSecondCookiePrice,
  getThirdCookiePrice,
  products,
  type Product,
} from "@/data/products";
import { getProductGallery } from "@/data/product-galleries";
import {
  appendClientRef,
  buildPairCookieOrder,
  buildTrioCookieOrder,
  getDirectStripeCheckoutUrl,
  logCheckoutOrder,
  prefetchMultiFlavorStripeUrl,
} from "@/lib/checkout";
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
  upsellPairPrice: number;
};

export type UpsellModalStep = "second_cookie" | "third_cookie";

type BuyNowUpsellModalProps = {
  product: UpsellModalProduct;
  isOpen: boolean;
  onClose: () => void;
  /** Optional initial step (defaults to "second_cookie"; pass "third_cookie" when 2 cookies were already chosen). */
  initialStep?: UpsellModalStep;
  /** Optional pre-selected second cookie slug when opening directly at "third_cookie". */
  initialSecondSlug?: string;
};

type CookieChoiceOption = {
  product: Product;
  thumb: string;
  secondPrice: number;
  secondSavings: number;
  thirdPrice: number;
  thirdSavings: number;
};

const cookieChoiceOptions: CookieChoiceOption[] = products.map((item) => {
  const hero = getProductGallery(item.slug, item.image)[0];
  const secondPrice = getSecondCookiePrice(item);
  const secondSavings = item.price - secondPrice;
  const thirdPrice = getThirdCookiePrice(item);
  const thirdSavings = item.price - thirdPrice;
  return {
    product: item,
    thumb: asset(hero.thumb),
    secondPrice,
    secondSavings,
    thirdPrice,
    thirdSavings,
  };
});

let thumbsPreloaded = false;
function preloadCookieThumbs() {
  if (thumbsPreloaded || typeof window === "undefined") return;
  thumbsPreloaded = true;
  for (const option of cookieChoiceOptions) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = option.thumb;
  }
}

function resolveFirstProduct(product: UpsellModalProduct): Product {
  if (product.slug) {
    const bySlug = getProduct(product.slug);
    if (bySlug) return bySlug;
  }
  const found = products.find(
    (p) =>
      p.shortName === product.shortName ||
      p.name === product.name ||
      p.stripeUrl === product.stripeUrl
  );
  return found ?? products[0];
}

type CookiePickerProps = {
  idPrefix: string;
  label: string;
  selectedSlug: string;
  onSelect: (slug: string) => void;
  priceFor: (option: CookieChoiceOption) => number;
  pricePrefix: string;
  matchSlug?: string;
  onOpenChange?: (open: boolean) => void;
  dataAttrs?: Record<string, string>;
  triggerAttrs?: Record<string, string>;
  listAttrs?: Record<string, string>;
  zClass?: string;
};

/** Photo based cookie picker used for every cookie slot in the upsell popup. */
function CookiePicker({
  idPrefix,
  label,
  selectedSlug,
  onSelect,
  priceFor,
  pricePrefix,
  matchSlug,
  onOpenChange,
  dataAttrs,
  triggerAttrs,
  listAttrs,
  zClass = "z-20",
}: CookiePickerProps) {
  const labelId = `${idPrefix}-label`;
  const listId = `${idPrefix}-list`;
  const optionId = (index: number) => `${idPrefix}-opt-${index}`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpenState] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const selectedIndex = Math.max(
    0,
    cookieChoiceOptions.findIndex((o) => o.product.slug === selectedSlug)
  );
  const current = cookieChoiceOptions[selectedIndex] ?? cookieChoiceOptions[0];

  function setOpen(next: boolean) {
    setOpenState(next);
    onOpenChange?.(next);
  }

  function scrollOptionIntoView(index: number) {
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!list || !option) return;
    const listRect = list.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();
    if (optionRect.top < listRect.top) list.scrollTop -= listRect.top - optionRect.top;
    else if (optionRect.bottom > listRect.bottom) list.scrollTop += optionRect.bottom - listRect.bottom;
  }

  function openDropdown(initialKeyboardIndex?: number) {
    preloadCookieThumbs();
    setActiveIndex(typeof initialKeyboardIndex === "number" ? initialKeyboardIndex : -1);
    setOpen(true);
  }

  function closeDropdown(refocus = true) {
    setOpen(false);
    setActiveIndex(-1);
    if (refocus) comboRef.current?.focus({ preventScroll: true });
  }

  function chooseOption(index: number) {
    const opt = cookieChoiceOptions[index];
    if (opt) onSelect(opt.product.slug);
    closeDropdown();
  }

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = cookieChoiceOptions.length - 1;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") openDropdown(0);
        else if (event.key === "End") openDropdown(last);
        else openDropdown(selectedIndex);
      }
      return;
    }
    const move = (i: number) => {
      setActiveIndex(i);
      requestAnimationFrame(() => scrollOptionIntoView(i));
    };
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        move(activeIndex < 0 ? Math.min(last, selectedIndex + 1) : Math.min(last, activeIndex + 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        move(activeIndex < 0 ? Math.max(0, selectedIndex - 1) : Math.max(0, activeIndex - 1));
        return;
      case "Home":
        event.preventDefault();
        move(0);
        return;
      case "End":
        event.preventDefault();
        move(last);
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
        setOpen(false);
        setActiveIndex(-1);
        return;
    }
  }

  return (
    <div ref={wrapperRef} className="relative mt-3" {...dataAttrs}>
      <label id={labelId} className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
        {label}
      </label>
      <div
        ref={comboRef}
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={open}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
        onPointerEnter={preloadCookieThumbs}
        onFocus={preloadCookieThumbs}
        {...triggerAttrs}
        className={`mt-1.5 flex min-h-[3.75rem] w-full cursor-pointer select-none items-center gap-3 rounded-2xl border bg-white px-3 py-2 outline-none ring-pink transition focus:ring-2 ${
          open ? "border-pink ring-2" : "border-chocolate/15 hover:border-chocolate/30"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.thumb}
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          decoding="async"
          className="h-12 w-12 shrink-0 rounded-xl bg-cream object-cover"
        />
        <div className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-chocolate">{current.product.shortName}</span>
          <p className="text-xs text-chocolate-soft">
            {current.product.size} ·{" "}
            <span className="font-semibold text-success-dark">
              {pricePrefix}
              {formatPrice(priceFor(current))}
            </span>
          </p>
        </div>
        <svg
          className={`h-5 w-5 shrink-0 text-chocolate-soft transition-transform ${open ? "rotate-180" : ""}`}
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
        hidden={!open}
        onMouseDown={(event) => event.preventDefault()}
        {...listAttrs}
        className={`absolute left-0 right-0 top-full ${zClass} mt-1.5 max-h-60 overflow-y-auto overscroll-contain rounded-2xl border border-chocolate/15 bg-white p-1.5 shadow-lift`}
      >
        {cookieChoiceOptions.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isActive = index === activeIndex;
          const isMatching = matchSlug !== undefined && option.product.slug === matchSlug;
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
                isActive ? "bg-cream ring-1 ring-pink/40" : isSelected ? "bg-pink/5 hover:bg-cream" : "hover:bg-cream"
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
                  <span className="truncate text-sm font-semibold text-chocolate">{option.product.shortName}</span>
                  {isMatching && (
                    <span className="shrink-0 rounded-full bg-pink/15 px-2 py-0.5 text-[10px] font-semibold text-pink">
                      Matching
                    </span>
                  )}
                </div>
                <p className="text-xs text-chocolate-soft">
                  {option.product.size} ·{" "}
                  <span className="font-semibold text-success-dark">
                    {pricePrefix}
                    {formatPrice(priceFor(option))}
                  </span>
                </p>
              </div>
              {isSelected && (
                <svg className="h-5 w-5 shrink-0 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function BuyNowUpsellModal({
  product,
  isOpen,
  onClose,
  initialStep = "second_cookie",
  initialSecondSlug,
}: BuyNowUpsellModalProps) {
  const uid = useId();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const initialResolvedFirst = resolveFirstProduct(product);
  const [firstSlug, setFirstSlug] = useState<string>(initialResolvedFirst.slug);
  const [step, setStep] = useState<UpsellModalStep>(initialStep);
  const [secondSlug, setSecondSlug] = useState<string>(
    initialSecondSlug || initialResolvedFirst.slug
  );
  const [thirdSlug, setThirdSlug] = useState<string>(initialResolvedFirst.slug);
  const [firstPickerOpen, setFirstPickerOpen] = useState(false);
  const [nextPickerOpen, setNextPickerOpen] = useState(false);
  const dropdownOpen = firstPickerOpen || nextPickerOpen;

  // Reset state whenever the modal opens for a product.
  useEffect(() => {
    if (isOpen) {
      const resolvedFirst = resolveFirstProduct(product);
      setFirstSlug(resolvedFirst.slug);
      setSecondSlug(initialSecondSlug || resolvedFirst.slug);
      setThirdSlug(resolvedFirst.slug);
      setStep(initialStep);
      setFirstPickerOpen(false);
      setNextPickerOpen(false);
      preloadCookieThumbs();
    }
  }, [isOpen, product, initialStep, initialSecondSlug]);

  const firstProduct = getProduct(firstSlug) ?? initialResolvedFirst;

  const secondIndex = Math.max(
    0,
    cookieChoiceOptions.findIndex((o) => o.product.slug === secondSlug)
  );
  const secondOption = cookieChoiceOptions[secondIndex] ?? cookieChoiceOptions[0];
  const secondCookie = secondOption.product;

  const thirdIndex = Math.max(
    0,
    cookieChoiceOptions.findIndex((o) => o.product.slug === thirdSlug)
  );
  const thirdOption = cookieChoiceOptions[thirdIndex] ?? cookieChoiceOptions[0];
  const thirdCookie = thirdOption.product;

  const isSecondStep = step === "second_cookie";
  const currentPickerIndex = isSecondStep ? secondIndex : thirdIndex;
  const currentOption = isSecondStep ? secondOption : thirdOption;
  const currentCookie = currentOption.product;
  const isSameAsFirst = currentCookie.slug === firstSlug;

  const unitPrice = firstProduct.price;
  const secondDiscountedPrice = secondOption.secondPrice;
  const pairPrice = unitPrice + secondDiscountedPrice;

  const thirdDiscountedPrice = thirdOption.thirdPrice;
  const trioPrice = pairPrice + thirdDiscountedPrice;

  const pairOrder = buildPairCookieOrder(firstProduct, secondCookie);
  const trioOrder = buildTrioCookieOrder(firstProduct, secondCookie, thirdCookie);
  const [resolvedTrioUrl, setResolvedTrioUrl] = useState<string | null>(null);

  useEffect(() => {
    setResolvedTrioUrl(null);
    if (!isOpen || step !== "third_cookie" || !trioOrder.needsDynamicMultiFlavorLink) return;
    let cancelled = false;
    void prefetchMultiFlavorStripeUrl(trioOrder).then((url) => {
      if (!cancelled && url) setResolvedTrioUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, step, firstSlug, secondSlug, thirdSlug]);
  const singleFirstCheckoutUrl = appendClientRef(firstProduct.stripeUrl, `1x_${firstProduct.slug}`);

  const firstHero = getProductGallery(firstSlug, firstProduct.image)[0];
  const firstThumb = asset(firstHero.thumb);

  function handleFirstCookieChange(nextSlug: string) {
    const prevFirst = firstSlug;
    setFirstSlug(nextSlug);
    if (secondSlug === prevFirst) {
      setSecondSlug(nextSlug);
    }
    if (thirdSlug === prevFirst) {
      setThirdSlug(nextSlug);
    }
  }

  function chooseNextCookie(slug: string) {
    if (isSecondStep) {
      setSecondSlug(slug);
      if (thirdSlug === firstSlug) setThirdSlug(slug);
    } else {
      setThirdSlug(slug);
    }
  }

  function handleAdvanceToThirdCookie() {
    setNextPickerOpen(false);
    setStep("third_cookie");
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dropdownOpen) {
          // An open picker closes itself on Escape.
          return;
        }
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

        {/* Step progress indicator */}
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`rounded-full px-2.5 py-0.5 ${
              isSecondStep
                ? "bg-pink text-white"
                : "bg-success/15 text-success-dark"
            }`}
          >
            {isSecondStep ? "Step 1: 2nd Cookie" : "✓ 2nd Cookie Added"}
          </span>
          <span className="text-chocolate-soft">→</span>
          <span
            className={`rounded-full px-2.5 py-0.5 ${
              !isSecondStep
                ? "bg-pink text-white"
                : "bg-cream-deep text-chocolate-soft"
            }`}
          >
            Step 2: 3rd Cookie
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
          <div className="relative flex flex-shrink-0 items-center">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-cream-deep ring-2 ring-cream-paper sm:h-16 sm:w-16 sm:rounded-2xl">
              <Image
                src={firstProduct.image}
                alt={firstProduct.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="-ml-3 h-14 w-14 overflow-hidden rounded-xl bg-cream-deep ring-2 ring-cream-paper sm:h-16 sm:w-16 sm:rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={secondOption.thumb}
                alt={secondCookie.shortName}
                width={128}
                height={128}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            {!isSecondStep && (
              <div className="-ml-3 h-14 w-14 overflow-hidden rounded-xl bg-cream-deep ring-2 ring-pink sm:h-16 sm:w-16 sm:rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thirdOption.thumb}
                  alt={thirdCookie.shortName}
                  width={128}
                  height={128}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-pink sm:text-sm">
              {isSecondStep ? "🍪 Double the sweetness" : "🍪 Triple the sweetness"}
            </p>
            <h2 id="upsell-modal-title" className="mt-0.5 font-display text-xl text-chocolate sm:text-2xl">
              {isSecondStep
                ? isSameAsFirst
                  ? "Want a matching twin?"
                  : "Build your cookie pair"
                : "Want a third?"}
            </h2>
          </div>
        </div>

        {isSecondStep ? (
          <p className="text-sm text-chocolate-mid sm:text-base">
            Add a second cookie to your{" "}
            <span className="font-semibold text-chocolate">{firstProduct.shortName}</span> and hang a
            matching pair or mix two flavors. Buy 4 or more cookies and get{" "}
            <span className="font-bold text-success-dark">10% off each cookie</span>.
          </p>
        ) : (
          <p className="text-sm text-chocolate-mid sm:text-base">
            Complete your trio with a third cookie. Want more? Buy 4 or more cookies and get{" "}
            <span className="font-bold text-success-dark">10% off each cookie</span> by choosing your
            quantities on the product page.
          </p>
        )}

        {/* 1st Cookie picker (same photo picker as the 2nd cookie) */}
        <CookiePicker
          idPrefix={`${uid}-first`}
          label="1st Cookie"
          selectedSlug={firstSlug}
          onSelect={handleFirstCookieChange}
          priceFor={(o) => o.product.price}
          pricePrefix=""
          onOpenChange={setFirstPickerOpen}
          dataAttrs={{ "data-first-cookie-picker": "" }}
          triggerAttrs={{ "data-first-cookie-trigger": "" }}
          listAttrs={{ "data-first-cookie-list": "" }}
          zClass="z-30"
        />

        {/* 2nd or 3rd Cookie picker */}
        <CookiePicker
          key={step}
          idPrefix={`${uid}-${isSecondStep ? "second" : "third"}`}
          label={isSecondStep ? "Choose your second cookie" : "Choose your third cookie"}
          selectedSlug={isSecondStep ? secondSlug : thirdSlug}
          onSelect={chooseNextCookie}
          priceFor={(o) => (isSecondStep ? o.secondPrice : o.thirdPrice)}
          pricePrefix="+"
          matchSlug={firstSlug}
          onOpenChange={setNextPickerOpen}
          dataAttrs={isSecondStep ? { "data-second-cookie-picker": "" } : { "data-third-cookie-picker": "" }}
          triggerAttrs={{ "data-second-cookie-trigger": "" }}
          listAttrs={{ "data-second-cookie-list": "" }}
          zClass="z-20"
        />

        {/* Quick action when customer selects a different 2nd cookie flavor */}
        {isSecondStep && !isSameAsFirst && (
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-pink/20 bg-pink/5 px-3 py-2 text-xs">
            <span className="text-chocolate-mid">
              Want <strong>{secondCookie.shortName}</strong> as your main cookie?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFirstSlug(secondCookie.slug);
                  setThirdSlug(secondCookie.slug);
                }}
                className="rounded-full bg-pink/15 px-2.5 py-1 font-semibold text-pink transition hover:bg-pink/25"
              >
                Make both {secondCookie.shortName}
              </button>
              <a
                href={appendClientRef(secondCookie.stripeUrl, `1x_${secondCookie.slug}`)}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClose()}
                className="font-semibold text-chocolate underline hover:text-pink"
              >
                Just 1 @ {formatPrice(secondCookie.price)}
              </a>
            </div>
          </div>
        )}

        {/* Itemized Order Breakdown */}
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
              <span className="truncate">1. {firstProduct.shortName}</span>
            </span>
            <span className="font-semibold text-chocolate">{formatPrice(unitPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-chocolate-mid">
            <span className="flex items-center gap-2 truncate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={secondOption.thumb}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 rounded-md object-cover"
              />
              <span className="truncate">2. {secondCookie.shortName}</span>
            </span>
            <span className="font-semibold text-success-dark">
              +{formatPrice(secondDiscountedPrice)}
            </span>
          </div>
          {!isSecondStep && (
            <div className="flex items-center justify-between text-sm text-chocolate-mid">
              <span className="flex items-center gap-2 truncate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thirdOption.thumb}
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 rounded-md object-cover"
                />
                <span className="truncate">3. {thirdCookie.shortName}</span>
              </span>
              <span className="font-semibold text-success-dark">
                +{formatPrice(thirdDiscountedPrice)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-chocolate/10 pt-2.5">
            <span className="font-semibold text-chocolate">
              {isSecondStep ? "2 cookies total" : "3 cookies total"}
            </span>
            <div className="text-right">
              <span className="text-lg font-bold text-success-dark">
                {formatPrice(isSecondStep ? pairPrice : trioPrice)}
              </span>
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

        {isSecondStep ? (
          <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
            <button
              type="button"
              onClick={handleAdvanceToThirdCookie}
              data-upsell-add-second=""
              className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 sm:px-6 sm:py-4 sm:text-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add the second for {formatPrice(pairPrice)}
            </button>
            <a
              href={singleFirstCheckoutUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => onClose()}
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 sm:px-6 sm:text-base"
            >
              No thanks, just one {firstProduct.shortName} @ {formatPrice(unitPrice)}
            </a>
          </div>
        ) : (
          <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
            <a
              href={resolvedTrioUrl || getDirectStripeCheckoutUrl(trioOrder)}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                logCheckoutOrder(trioOrder);
                onClose();
              }}
              data-upsell-add-third=""
              className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 sm:px-6 sm:py-4 sm:text-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add the third for {formatPrice(trioPrice)}
            </a>
            <a
              href={pairOrder.directStripeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                logCheckoutOrder(pairOrder);
                onClose();
              }}
              data-upsell-keep-two=""
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 sm:px-6 sm:text-base"
            >
              No thanks, just two cookies @ {formatPrice(pairPrice)}
            </a>
            <button
              type="button"
              onClick={() => {
                setNextPickerOpen(false);
                setStep("second_cookie");
              }}
              className="block w-full pt-1 text-center text-xs font-medium text-chocolate-soft hover:text-pink"
            >
              ← Change second cookie ({secondCookie.shortName})
            </button>
          </div>
        )}

        <p className="mt-3 text-center text-xs text-chocolate-soft sm:mt-4">
          Secure checkout powered by Stripe · Handmade to order
        </p>
      </div>
    </div>
  );
}
