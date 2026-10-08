"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ReviewPhotoProps = {
  src: string;
  name: string;
  className?: string;
};

/** Small customer photo on a review card. Click to see it larger. */
export function ReviewPhoto({ src, name, className = "h-24 w-24" }: ReviewPhotoProps) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (broken) return null;
  const alt = `Photo from ${name} of their JOIRUSH cookie`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block overflow-hidden rounded-2xl bg-cream-deep shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-pink ${className}`}
        aria-label={`View larger photo from ${name}`}
        data-review-photo=""
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </button>
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-chocolate/90 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close photo"
              autoFocus
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-chocolate"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-lift"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
