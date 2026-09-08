"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { instagramReels, instagramHandle, instagramUrl } from "@/data/instagram-reels";

function InstagramEmbed({ reelId, isVisible }: { reelId: string; isVisible: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed`;

  if (!isVisible && !loaded) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-chocolate/5">
        <div className="h-8 w-8 animate-pulse rounded-full bg-pink/30" />
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      className="h-full w-full rounded-2xl border-0"
      allowFullScreen
      loading="lazy"
      title={`Instagram Reel ${reelId}`}
      onLoad={() => setLoaded(true)}
    />
  );
}

export function InstagramCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set([0, 1, 2, 3]));

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const itemWidth = 280 + 16;
    const startIndex = Math.floor(scrollLeft / itemWidth);
    const visibleCount = Math.ceil(clientWidth / itemWidth) + 2;
    const newVisible = new Set<number>();
    for (let i = Math.max(0, startIndex - 1); i < Math.min(instagramReels.length, startIndex + visibleCount); i++) {
      newVisible.add(i);
    }
    setVisibleIndices(newVisible);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
            Fresh from the studio
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-chocolate md:text-4xl">
            See the Magic in Motion
          </h2>
          <p className="mt-3 text-chocolate-mid">
            Sculpting, painting, and the satisfying details — follow along on Instagram!
          </p>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink via-pink-hot to-pink px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Follow {instagramHandle}
        </a>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-card transition hover:bg-cream hover:shadow-lift md:block"
            aria-label="Scroll carousel left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-chocolate"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-card transition hover:bg-cream hover:shadow-lift md:block"
            aria-label="Scroll carousel right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-chocolate"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:px-0"
          role="region"
          aria-label="Instagram Reels carousel"
        >
          {instagramReels.map((reel, index) => (
            <div
              key={reel.id}
              className="w-[280px] flex-shrink-0 snap-start"
              style={{ aspectRatio: "9/16" }}
            >
              <InstagramEmbed reelId={reel.id} isVisible={visibleIndices.has(index)} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 md:hidden" role="tablist" aria-label="Carousel navigation">
          {instagramReels.map((reel, index) => (
            <span
              key={reel.id}
              className={`h-1.5 rounded-full transition-all ${
                visibleIndices.has(index) ? "w-4 bg-pink" : "w-1.5 bg-chocolate/20"
              }`}
              role="tab"
              aria-selected={visibleIndices.has(index)}
              aria-label={`Reel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
