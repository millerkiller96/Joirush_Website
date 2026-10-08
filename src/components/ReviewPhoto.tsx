"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Customer photo on an approved review: a small thumbnail that opens a larger
 * view on click. Renders nothing when there is no photo or it fails to load,
 * so reviews without photos look exactly as before.
 */
export function ReviewPhoto({
  src,
  name,
  piece,
  size = "md",
  className = "",
}: {
  src?: string;
  name: string;
  piece?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setFailed(false), [src]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") {
        event.preventDefault();
        if (event.key === "Escape") setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  if (!src || failed) return null;
  const alt = `Photo from ${name}${piece ? ` of their ${piece}` : ""}`;
  const thumb = size === "lg" ? "h-40 w-40 md:h-48 md:w-48" : "h-28 w-28";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block overflow-hidden rounded-2xl shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-pink ${thumb} ${className}`}
        aria-label={`View larger: ${alt}`}
        data-review-photo=""
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded-full bg-white/90 p-1 text-chocolate shadow-card" aria-hidden="true">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-chocolate/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={alt} className="relative max-h-full max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto max-w-full rounded-[1.5rem] object-contain shadow-lift"
            />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-chocolate shadow-card transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              aria-label="Close photo"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
