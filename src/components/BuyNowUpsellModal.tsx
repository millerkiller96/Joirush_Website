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
      className="fixed inset-0 z-50 flex items-center justify-center bg-chocolate/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-modal-title"
    >
      <div
        ref={modalRef}
        className="relative mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-cream-paper p-6 shadow-lift md:p-8"
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

        <div className="mb-6 flex items-center gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
            <Image
              src={product.image}
              alt={product.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-pink">
              🍪 Double the sweetness
            </p>
            <h2 id="upsell-modal-title" className="mt-1 font-display text-2xl text-chocolate">
              Want a matching twin?
            </h2>
          </div>
        </div>

        <p className="text-chocolate-mid">
          Add a second <span className="font-semibold text-chocolate">{product.shortName}</span> and
          save <span className="font-bold text-success-dark">{formatPrice(savings)}</span> — that&apos;s{" "}
          <span className="font-bold text-success-dark">10% off</span> the second one!
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-cream-deep/80 p-4">
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

        <div className="mt-6 space-y-3">
          <a
            ref={firstFocusableRef}
            href={product.stripeUpsellUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
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
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-6 py-3 text-center font-medium text-chocolate-soft transition hover:border-chocolate/25 hover:text-chocolate focus:outline-none focus:ring-2 focus:ring-chocolate/30 focus:ring-offset-2"
          >
            No thanks · just one @ {formatPrice(unitPrice)}
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-chocolate-soft">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
