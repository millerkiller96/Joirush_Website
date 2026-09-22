"use client";

import { useEffect, useRef, useCallback } from "react";
import { Image } from "@/components/Image";
import { formatPrice } from "@/data/products";

export type UpsellModalProduct = {
  name: string;
  shortName: string;
  image: string;
  price: number;
  etsyUrl: string;
  stripeUrl: string;
  stripeUpsellUrl: string;
  upsellPairPrice: number;
};

type BuyNowUpsellModalProps = {
  product: UpsellModalProduct;
  isOpen: boolean;
  onClose: () => void;
};

export function BuyNowUpsellModal({ product, isOpen, onClose }: BuyNowUpsellModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  const unitPrice = product.price;
  const pairPrice = product.upsellPairPrice;
  const savings = unitPrice * 2 - pairPrice;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      firstFocusableRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
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
        className="relative mx-0 max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-cream-paper p-5 pb-8 shadow-lift sm:mx-4 sm:rounded-3xl sm:p-6 md:p-8"
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

        <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-cream-deep sm:h-20 sm:w-20 sm:rounded-2xl">
            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-pink sm:text-sm">
              🍪 Double the sweetness
            </p>
            <h2 id="upsell-modal-title" className="mt-1 font-display text-xl text-chocolate sm:text-2xl">
              Want a matching twin?
            </h2>
          </div>
        </div>

        <p className="text-sm text-chocolate-mid sm:text-base">
          Add a second <span className="font-semibold text-chocolate">{product.shortName}</span> and
          save <span className="font-bold text-success-dark">{formatPrice(savings)}</span> — that&apos;s{" "}
          <span className="font-bold text-success-dark">10% off</span> the second one!
        </p>

        <div className="mt-4 space-y-2 rounded-xl bg-cream-deep/80 p-3 sm:mt-6 sm:space-y-3 sm:rounded-2xl sm:p-4">
          <div className="flex items-center justify-between text-chocolate-mid">
            <span>Just 1</span>
            <span className="font-semibold text-chocolate">{formatPrice(unitPrice)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-chocolate/10 pt-3">
            <span className="font-semibold text-chocolate">2 for</span>
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
            ref={firstFocusableRef}
            href={product.stripeUpsellUrl}
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
