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
  resolveStripeCheckoutUrl,
  submitMultiCookieOrderRequest,
  type BuiltCheckoutOrder,
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
  stripePairUrls?: Record<string, string>;
  upsellPairPrice: number;
};

export type UpsellModalStep = "second_cookie" | "third_cookie" | "checkout_confirm";

type BuyNowUpsellModalProps = {
  product: UpsellModalProduct;
  isOpen: boolean;
  onClose: () => void;
  /** Optional initial step (defaults to "second_cookie"; pass "third_cookie" when 2 cookies were already chosen). */
  initialStep?: UpsellModalStep;
  /** Optional pre-selected second cookie slug when opening directly at "third_cookie". */
  initialSecondSlug?: string;
  /** Optional pre-built bulk order when opening directly to confirm a multi-cookie bulk checkout. */
  prebuiltOrder?: BuiltCheckoutOrder | null;
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

export function BuyNowUpsellModal({
  product,
  isOpen,
  onClose,
  initialStep = "second_cookie",
  initialSecondSlug,
  prebuiltOrder = null,
}: BuyNowUpsellModalProps) {
  const uid = useId();
  const labelId = `${uid}-cookie-label`;
  const listId = `${uid}-cookie-list`;
  const optionId = (index: number) => `${uid}-cookie-opt-${index}`;

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const initialResolvedFirst = resolveFirstProduct(product);
  const [firstSlug, setFirstSlug] = useState<string>(initialResolvedFirst.slug);
  const [step, setStep] = useState<UpsellModalStep>(initialStep);
  const [secondSlug, setSecondSlug] = useState<string>(
    initialSecondSlug || initialResolvedFirst.slug
  );
  const [thirdSlug, setThirdSlug] = useState<string>(initialResolvedFirst.slug);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [pendingOrder, setPendingOrder] = useState<BuiltCheckoutOrder | null>(prebuiltOrder);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  // Reset state whenever the modal opens for a product.
  useEffect(() => {
    if (isOpen) {
      const resolvedFirst = resolveFirstProduct(product);
      setFirstSlug(resolvedFirst.slug);
      setSecondSlug(initialSecondSlug || resolvedFirst.slug);
      setThirdSlug(resolvedFirst.slug);
      setStep(prebuiltOrder ? "checkout_confirm" : initialStep);
      setPendingOrder(prebuiltOrder);
      setActiveIndex(-1);
      setDropdownOpen(false);
      setIsRedirecting(false);
      setRequestStatus("idle");
      preloadCookieThumbs();
    }
  }, [isOpen, product, initialStep, initialSecondSlug, prebuiltOrder]);

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
  const pairSavings = secondOption.secondSavings;
  const pairPrice = unitPrice + secondDiscountedPrice;

  const thirdDiscountedPrice = thirdOption.thirdPrice;
  const thirdSavings = thirdOption.thirdSavings;
  const trioPrice = pairPrice + thirdDiscountedPrice;
  const trioSavings = pairSavings + thirdSavings;

  const pairOrder = buildPairCookieOrder(firstProduct, secondCookie);
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
    preloadCookieThumbs();
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
    const opt = cookieChoiceOptions[index];
    if (opt) {
      if (isSecondStep) {
        setSecondSlug(opt.product.slug);
        if (thirdSlug === firstSlug) {
          setThirdSlug(opt.product.slug);
        }
      } else {
        setThirdSlug(opt.product.slug);
      }
    }
    closeDropdown();
  }

  async function handleProceedWithOrder(order: BuiltCheckoutOrder) {
    if (order.directStripeUrl) {
      window.open(order.directStripeUrl, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    setIsRedirecting(true);
    const res = await resolveStripeCheckoutUrl(order);
    setIsRedirecting(false);

    if (res.ok) {
      window.open(res.url, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }

    // Show the confirmation view so the exact chosen cookies and per-cookie Stripe links are preserved
    setPendingOrder(order);
    setStep("checkout_confirm");
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }

  function handleAdvanceToThirdCookie() {
    setDropdownOpen(false);
    setActiveIndex(-1);
    setStep("third_cookie");
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }

  async function handleOrderInvoiceSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pendingOrder || !customerEmail.trim()) return;
    setRequestStatus("submitting");
    const res = await submitMultiCookieOrderRequest({
      order: pendingOrder,
      customerName: customerName.trim() || "JOIRUSH Collector",
      customerEmail: customerEmail.trim(),
      notes: customerNotes.trim(),
    });
    if (res.ok) {
      setRequestStatus("sent");
    } else {
      setRequestStatus("error");
    }
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

  function handleComboKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = cookieChoiceOptions.length - 1;
    if (!dropdownOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") openDropdown(0);
        else if (event.key === "End") openDropdown(last);
        else openDropdown(currentPickerIndex);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const next =
          activeIndex < 0
            ? Math.min(last, currentPickerIndex + 1)
            : Math.min(last, activeIndex + 1);
        setActiveIndex(next);
        requestAnimationFrame(() => scrollOptionIntoView(next));
        return;
      }
      case "ArrowUp": {
        event.preventDefault();
        const prev =
          activeIndex < 0
            ? Math.max(0, currentPickerIndex - 1)
            : Math.max(0, activeIndex - 1);
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
        chooseOption(activeIndex >= 0 ? activeIndex : currentPickerIndex);
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

        {step === "checkout_confirm" && pendingOrder ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pink sm:text-sm">
              🍪 Multi cookie bundle summary
            </p>
            <h2 id="upsell-modal-title" className="mt-1 font-display text-2xl text-chocolate">
              Your {pendingOrder.totalCookies} Cookie Selection
            </h2>
            <p className="mt-1.5 text-sm text-chocolate-mid">
              {pendingOrder.discountSummaryLabel} · Free U.S. shipping included
            </p>

            <div className="mt-4 space-y-2 rounded-2xl bg-cream-deep/80 p-4">
              {pendingOrder.lineItems.map((item, idx) => (
                <div
                  key={`${item.slug}-${idx}`}
                  className="flex items-center justify-between gap-2 text-sm text-chocolate-mid"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="font-semibold text-chocolate">
                      {item.quantity}× {item.shortName}
                    </span>
                    {item.discountPercent > 0 && (
                      <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success-dark">
                        {item.discountPercent}% off
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-semibold text-chocolate">
                    {formatPrice(item.lineTotalUsd)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-chocolate/10 pt-2.5">
                <span className="font-semibold text-chocolate">
                  Total ({pendingOrder.totalCookies} cookies)
                </span>
                <div className="text-right">
                  <span className="text-lg font-bold text-success-dark">
                    {formatPrice(pendingOrder.finalTotalUsd)}
                  </span>
                  {pendingOrder.totalSavingsUsd > 0 && (
                    <span className="ml-2 text-xs font-semibold text-success">
                      (save {formatPrice(pendingOrder.totalSavingsUsd)})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Stripe Checkout Links for Every Chosen Cookie */}
            <div className="mt-3 rounded-2xl border border-chocolate/12 bg-white p-3.5">
              <p className="text-xs font-bold uppercase tracking-wider text-chocolate-soft">
                Instant Stripe Checkout by Chosen Cookie
              </p>
              <div className="mt-2 space-y-1.5">
                {Array.from(new Set(pendingOrder.lineItems.map((i) => i.slug))).map((slug) => {
                  const cookieProd = getProduct(slug);
                  if (!cookieProd) return null;
                  const pairTotal = cookieProd.price + getSecondCookiePrice(cookieProd);
                  return (
                    <div
                      key={slug}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-cream/60 px-2.5 py-2 text-xs"
                    >
                      <span className="font-semibold text-chocolate">{cookieProd.shortName}</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={appendClientRef(cookieProd.stripeUrl, pendingOrder.clientReferenceId)}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-chocolate/20 bg-white px-2.5 py-1 font-semibold text-chocolate transition hover:border-chocolate/40"
                        >
                          1× ({formatPrice(cookieProd.price)})
                        </a>
                        <a
                          href={appendClientRef(
                            cookieProd.stripeUpsellUrl,
                            pendingOrder.clientReferenceId
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-success px-2.5 py-1 font-bold text-white transition hover:bg-success-dark"
                        >
                          2× 10% off ({formatPrice(pairTotal)})
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {requestStatus === "sent" ? (
              <div className="mt-4 rounded-2xl border border-success/30 bg-success/10 p-4 text-center">
                <p className="font-display text-lg text-chocolate">
                  Your multi cookie order is locked in!
                </p>
                <p className="mt-1 text-sm text-chocolate-mid">
                  We received your exact cookie selection ({pendingOrder.totalCookies} cookies for{" "}
                  {formatPrice(pendingOrder.finalTotalUsd)}) and are sending your personalized Stripe
                  checkout link to <strong>{customerEmail}</strong> right away.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-chocolate px-6 py-2.5 text-sm font-semibold text-cream hover:bg-pink"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderInvoiceSubmit} className="mt-4 space-y-3">
                <p className="text-xs text-chocolate-mid">
                  Enter your email to receive an instant Stripe checkout link with your exact mixed
                  cookie flavors and {pendingOrder.discountSummaryLabel.toLowerCase()} applied:
                </p>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3.5 py-2.5 text-sm text-chocolate outline-none focus:border-pink focus:ring-2 focus:ring-pink/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
                    Your Email (for instant Stripe checkout link)
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3.5 py-2.5 text-sm text-chocolate outline-none focus:border-pink focus:ring-2 focus:ring-pink/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
                    Order Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Any special requests for Erynn"
                    className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3.5 py-2.5 text-sm text-chocolate outline-none focus:border-pink focus:ring-2 focus:ring-pink/30"
                  />
                </div>
                {requestStatus === "error" && (
                  <p className="text-xs font-semibold text-pink">
                    Something went wrong. Please try again or use the direct Stripe link below.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={requestStatus === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-success-dark disabled:opacity-60"
                >
                  {requestStatus === "submitting"
                    ? "Sending your exact cookie list..."
                    : `Send My Exact ${pendingOrder.totalCookies} Cookie Checkout Link · ${formatPrice(pendingOrder.finalTotalUsd)}`}
                </button>
                <a
                  href={pendingOrder.fallbackStripeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-2.5 text-center text-xs font-semibold text-chocolate-mid transition hover:border-chocolate/30 hover:text-chocolate"
                >
                  Or open fast Stripe checkout now (selection saved in order ref) →
                </a>
              </form>
            )}
          </div>
        ) : (
          <>
            {/* Step progress indicator */}
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
              <span
                className={`rounded-full px-2.5 py-0.5 ${
                  isSecondStep
                    ? "bg-pink text-white"
                    : "bg-success/15 text-success-dark"
                }`}
              >
                {isSecondStep ? "Step 1: 2nd Cookie (10% off)" : "✓ 2nd Cookie Added (10% off)"}
              </span>
              <span className="text-chocolate-soft">→</span>
              <span
                className={`rounded-full px-2.5 py-0.5 ${
                  !isSecondStep
                    ? "bg-pink text-white"
                    : "bg-cream-deep text-chocolate-soft"
                }`}
              >
                Step 2: 3rd Cookie (15% off)
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
                  {isSecondStep ? "🍪 Double the sweetness" : "🍪 Triple the sweetness · 15% off"}
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
                <span className="font-semibold text-chocolate">{firstProduct.shortName}</span> and save{" "}
                <span className="font-bold text-success-dark">{formatPrice(pairSavings)}</span>. You get{" "}
                <span className="font-bold text-success-dark">10% off</span> whichever second cookie you pick!
              </p>
            ) : (
              <p className="text-sm text-chocolate-mid sm:text-base">
                Complete your trio! Add a third cookie for{" "}
                <span className="font-bold text-success-dark">15% off</span> (save{" "}
                <span className="font-bold text-success-dark">{formatPrice(thirdSavings)}</span> on your third
                piece, or <span className="font-bold text-success-dark">{formatPrice(trioSavings)}</span> total).
              </p>
            )}

            {/* 1st Cookie Selector so customers can switch Cookie #1 directly if desired */}
            <div className="mt-3">
              <label
                htmlFor={`${uid}-first-cookie-select`}
                className="block text-[11px] font-semibold uppercase tracking-wider text-chocolate-soft"
              >
                1st Cookie (Full Price)
              </label>
              <select
                id={`${uid}-first-cookie-select`}
                data-first-cookie-select=""
                value={firstSlug}
                onChange={(e) => handleFirstCookieChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-chocolate/15 bg-white px-3 py-2 text-xs font-semibold text-chocolate outline-none focus:border-pink focus:ring-2 focus:ring-pink/30"
              >
                {products.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.shortName} ({item.size}) · {formatPrice(item.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Cookie Dropdown Selector with Thumbnail Photos */}
            <div
              ref={pickerWrapperRef}
              className="relative mt-3"
              data-second-cookie-picker={isSecondStep ? "" : undefined}
              data-third-cookie-picker={!isSecondStep ? "" : undefined}
            >
              <label
                id={labelId}
                className="block text-xs font-semibold uppercase tracking-wider text-chocolate-soft"
              >
                {isSecondStep
                  ? "Choose your second cookie (10% off)"
                  : "Choose your third cookie (15% off)"}
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
                onPointerEnter={preloadCookieThumbs}
                onFocus={preloadCookieThumbs}
                data-second-cookie-trigger=""
                className={`mt-1.5 flex min-h-[3.75rem] w-full cursor-pointer select-none items-center gap-3 rounded-2xl border bg-white px-3 py-2 outline-none ring-pink transition focus:ring-2 ${
                  dropdownOpen ? "border-pink ring-2" : "border-chocolate/15 hover:border-chocolate/30"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentOption.thumb}
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
                      {currentCookie.shortName}
                    </span>
                    <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success-dark">
                      {isSecondStep ? "10% off" : "15% off"}
                    </span>
                  </div>
                  <p className="text-xs text-chocolate-soft">
                    {currentCookie.size} ·{" "}
                    <span className="font-semibold text-success-dark">
                      +{formatPrice(isSecondStep ? currentOption.secondPrice : currentOption.thirdPrice)}
                    </span>{" "}
                    <span className="line-through">{formatPrice(currentCookie.price)}</span>
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
                className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-60 overflow-y-auto overscroll-contain rounded-2xl border border-chocolate/15 bg-white p-1.5 shadow-lift"
              >
                {cookieChoiceOptions.map((option, index) => {
                  const isSelected = index === currentPickerIndex;
                  const isActive = index === activeIndex;
                  const isMatching = option.product.slug === firstSlug;
                  const optionDiscountedPrice = isSecondStep
                    ? option.secondPrice
                    : option.thirdPrice;
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
                            +{formatPrice(optionDiscountedPrice)}
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
                  <span className="truncate">2. {secondCookie.shortName} (10% off)</span>
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
                    <span className="truncate">3. {thirdCookie.shortName} (15% off)</span>
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
                  <span className="ml-2 text-sm text-success">
                    (save {formatPrice(isSecondStep ? pairSavings : trioSavings)})
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
                  Add the second · {formatPrice(pairPrice)}
                </button>
                <a
                  href={singleFirstCheckoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 sm:px-6 sm:text-base"
                >
                  No thanks · just one {firstProduct.shortName} @ {formatPrice(unitPrice)}
                </a>
              </div>
            ) : (
              <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
                <button
                  type="button"
                  disabled={isRedirecting}
                  onClick={() =>
                    handleProceedWithOrder(
                      buildTrioCookieOrder(firstProduct, secondCookie, thirdCookie)
                    )
                  }
                  data-upsell-add-third=""
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 disabled:opacity-60 sm:px-6 sm:py-4 sm:text-lg"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {isRedirecting
                    ? "Opening Stripe Checkout..."
                    : `Add the third (15% off) · ${formatPrice(trioPrice)}`}
                </button>
                {pairOrder.directStripeUrl ? (
                  <a
                    href={pairOrder.directStripeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => onClose()}
                    data-upsell-keep-two=""
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 sm:px-6 sm:text-base"
                  >
                    No thanks · just two cookies @ {formatPrice(pairPrice)}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={isRedirecting}
                    onClick={() => handleProceedWithOrder(pairOrder)}
                    data-upsell-keep-two=""
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-5 py-3 text-center text-sm font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2 disabled:opacity-60 sm:px-6 sm:text-base"
                  >
                    No thanks · just two cookies @ {formatPrice(pairPrice)}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveIndex(-1);
                    setStep("second_cookie");
                  }}
                  className="block w-full pt-1 text-center text-xs font-medium text-chocolate-soft hover:text-pink"
                >
                  ← Change second cookie ({secondCookie.shortName})
                </button>
              </div>
            )}
          </>
        )}

        <p className="mt-3 text-center text-xs text-chocolate-soft sm:mt-4">
          Secure checkout powered by Stripe · Handmade to order
        </p>
      </div>
    </div>
  );
}
