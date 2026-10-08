"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";

/**
 * One shared "Leave your review" popup for the whole site.
 *
 * Any button with data-open-review-modal (see LeaveReviewButton) opens it,
 * and it listens for the "joirush:open-review" event so other components can
 * too. The popup renders the same ReviewForm the homepage uses, so a photo
 * and the sheet write work identically everywhere.
 */
export function ReviewModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  useEffect(() => {
    const openFrom = (source: EventTarget | null) => {
      lastFocused.current = (source as HTMLElement) ?? (document.activeElement as HTMLElement | null);
      setOpen(true);
    };
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-open-review-modal]");
      if (!trigger) return;
      event.preventDefault();
      openFrom(trigger);
    };
    const onEvent = () => openFrom(document.activeElement);
    // Deep link: any page URL ending in #leave-a-review opens the popup.
    const onHash = () => {
      if (window.location.hash === "#leave-a-review") openFrom(document.activeElement);
    };
    onHash();
    document.addEventListener("click", onClick);
    window.addEventListener("joirush:open-review", onEvent);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("joirush:open-review", onEvent);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("[data-review-form-title]")?.focus();
    }, 50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-chocolate/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Leave your review"
        data-review-modal=""
        tabIndex={-1}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-cream p-4 shadow-lift outline-none sm:rounded-[2rem] sm:p-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-chocolate-soft shadow-card transition hover:bg-white hover:text-chocolate focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          aria-label="Close review popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ReviewForm onDone={close} autoFocusTitle />
      </div>
    </div>
  );
}

/** Opens the shared review popup. Place it next to any "What Collectors Say" heading. */
export function LeaveReviewButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      data-open-review-modal=""
      className={`rounded-full bg-pink px-6 py-3 text-sm font-medium text-white transition hover:bg-pink-hot ${className}`}
    >
      Leave your review
    </button>
  );
}
