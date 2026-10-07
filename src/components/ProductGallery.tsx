"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { asset } from "@/lib/paths";
import type { GalleryImage } from "@/data/product-galleries";

type ProductGalleryProps = {
  images: GalleryImage[];
  /** Product name used in alt text, e.g. "Jumbo M&M Cookie Wall Art". */
  name: string;
};

const MAIN_SIZES = "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function srcSet(image: GalleryImage) {
  if (image.md === image.src) return undefined;
  return `${asset(image.md)} 960w, ${asset(image.src)} ${image.width}w`;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Horizontal scroll snap track. Native swipe on touch, programmatic scroll for
 * arrows, thumbnails, dots and keyboard. Reports the slide in view via onIndex.
 */
function useSnapTrack(count: number, onIndex: (index: number) => void) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(count - 1, index));
      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto",
      });
    },
    [count]
  );

  const onScroll = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      onIndex(Math.round(track.scrollLeft / track.clientWidth));
    });
  }, [onIndex]);

  useEffect(
    () => () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    },
    []
  );

  return { trackRef, scrollToIndex, onScroll };
}

function Lightbox({
  images,
  name,
  startIndex,
  onClose,
}: {
  images: GalleryImage[];
  name: string;
  startIndex: number;
  onClose: (index: number) => void;
}) {
  const total = images.length;
  const [index, setIndex] = useState(startIndex);
  const indexRef = useRef(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleIndex = useCallback((i: number) => {
    indexRef.current = i;
    setIndex(i);
  }, []);
  const { trackRef, scrollToIndex, onScroll } = useSnapTrack(total, handleIndex);

  useEffect(() => {
    scrollToIndex(startIndex, false);
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose(indexRef.current);
      else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(indexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(indexRef.current - 1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photos`}
      className="fixed inset-0 z-[100] flex flex-col bg-chocolate/95"
      data-gallery-lightbox
    >
      <div className="flex items-center justify-between px-4 py-3 text-cream md:px-8">
        <p className="text-sm font-semibold tracking-wide" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onClose(indexRef.current)}
          aria-label="Close photo viewer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-hide flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {images.map((image, i) => (
            <div key={image.src} className="flex h-full w-full flex-shrink-0 snap-center items-center justify-center p-2 md:p-6">
              <img
                src={asset(image.src)}
                alt={`${name}, handmade spray foam cookie wall sculpture, photo ${i + 1} of ${total}`}
                width={image.width}
                height={image.height}
                loading={Math.abs(i - startIndex) <= 1 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain"
              />
            </div>
          ))}
        </div>
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(index - 1)}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-chocolate shadow-card transition hover:bg-cream disabled:opacity-30 md:flex"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(index + 1)}
              disabled={index === total - 1}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-chocolate shadow-card transition hover:bg-cream disabled:opacity-30 md:flex"
            >
              <Chevron direction="right" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { trackRef, scrollToIndex, onScroll } = useSnapTrack(total, setIndex);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Keep the active thumbnail in view when the strip overflows.
  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.querySelector<HTMLElement>(`[data-thumb-index="${index}"]`);
    if (!strip || !active) return;
    const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2;
    strip.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(total - 1);
    }
  };

  const closeLightbox = (lastIndex: number) => {
    setLightboxIndex(null);
    scrollToIndex(lastIndex, false);
  };

  return (
    <div className="min-w-0 md:sticky md:top-24" data-product-gallery>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} photos`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="group relative overflow-hidden rounded-[2.2rem] bg-cream-deep shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
      >
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-hide flex aspect-[3/4] snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              className="relative h-full w-full flex-shrink-0 snap-center"
            >
              <button
                type="button"
                tabIndex={i === index ? 0 : -1}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Enlarge ${name} photo ${i + 1} of ${total}`}
                className="block h-full w-full cursor-zoom-in"
              >
                <img
                  src={asset(image.md)}
                  srcSet={srcSet(image)}
                  sizes={MAIN_SIZES}
                  alt={`${name}, handmade spray foam cookie wall sculpture, photo ${i + 1} of ${total}`}
                  width={image.width}
                  height={image.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding={i === 0 ? "sync" : "async"}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </button>
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <span
              className="pointer-events-none absolute right-4 top-4 rounded-full bg-chocolate/70 px-3 py-1 text-sm font-semibold text-cream backdrop-blur-sm"
              aria-live="polite"
            >
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => scrollToIndex(index - 1)}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-chocolate shadow-card transition hover:scale-105 hover:bg-cream disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(index + 1)}
              disabled={index === total - 1}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-chocolate shadow-card transition hover:scale-105 hover:bg-cream disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <Chevron direction="right" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <>
          {/* Dots on mobile */}
          <div className="mt-3 flex justify-center gap-1 md:hidden">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Show photo ${i + 1} of ${total}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-pink" : "w-2 bg-chocolate/25"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Thumbnails on desktop */}
          <div
            ref={thumbsRef}
            className="scrollbar-hide mt-4 hidden gap-3 overflow-x-auto p-1 md:flex"
          >
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                data-thumb-index={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Show photo ${i + 1} of ${total}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative w-[4.5rem] flex-shrink-0 overflow-hidden rounded-xl transition ${
                  i === index
                    ? "ring-2 ring-pink ring-offset-2 ring-offset-cream"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={asset(image.thumb)}
                  alt=""
                  width={180}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={images} name={name} startIndex={lightboxIndex} onClose={closeLightbox} />
      )}
    </div>
  );
}
