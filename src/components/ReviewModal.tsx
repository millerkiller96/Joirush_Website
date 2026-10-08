"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReviewForm } from "@/components/ReviewForm";
import { trackEvent } from "@/lib/forms";

type ReviewModalProps = {
  open: boolean;
  onClose: () => void;
  defaultProduct?: string;
};

/** Popup with the same review form the homepage uses (one shared ReviewForm component). */
export function ReviewModal({ open, onClose, defaultProduct }: ReviewModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // The cookie picker handles Escape itself to close just its list.
        if (event.defaultPrevented) return;
        onClose();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not(.hidden), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-chocolate/60 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Leave your review"
        data-review-modal=""
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-white shadow-lift sm:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-chocolate transition hover:bg-cream-deep"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ReviewForm onDone={onClose} defaultProduct={defaultProduct} autoFocus />
      </div>
    </div>,
    document.body,
  );
}

type LeaveReviewButtonProps = {
  /** Product name to preselect in the form (product pages). */
  defaultProduct?: string;
  className?: string;
};

export const leaveReviewButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-sm font-medium text-white shadow-card transition hover:bg-pink-hot";

/** "Leave your review" button that opens the review popup. */
export function LeaveReviewButton({ defaultProduct, className = leaveReviewButtonClass }: LeaveReviewButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("review_modal_open", { product: defaultProduct ?? "" });
        }}
        aria-haspopup="dialog"
        className={className}
        data-leave-review=""
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Leave your review
      </button>
      <ReviewModal open={open} onClose={() => setOpen(false)} defaultProduct={defaultProduct} />
    </>
  );
}
