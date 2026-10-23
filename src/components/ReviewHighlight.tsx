"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { getFiveStarReviews, mergeReviews, type PoolReview } from "@/data/reviews";
import { fetchApprovedReviews } from "@/lib/sheetReviews";
import { ReviewStars } from "@/components/ReviewStars";
import { ReviewPhoto } from "@/components/ReviewPhoto";

const initialPool = getFiveStarReviews();
const LAST_KEY = "joirush_last_highlight_review";
const ROTATE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 220;

function readLast(): string | null {
  try {
    return window.localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

function remember(review: PoolReview) {
  try {
    window.localStorage.setItem(LAST_KEY, review.id);
  } catch {}
}

export function ReviewHighlight() {
  const [reviews, setReviews] = useState<PoolReview[]>(initialPool);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const goToIndex = useCallback(
    (nextIdx: number, list: PoolReview[] = reviews) => {
      if (list.length === 0) return;
      const wrapped = ((nextIdx % list.length) + list.length) % list.length;
      setVisible(false);
      window.setTimeout(() => {
        setIndex(wrapped);
        remember(list[wrapped]);
        setVisible(true);
      }, FADE_DURATION_MS);
    },
    [reviews]
  );

  useEffect(() => {
    if (initialPool.length === 0) return;
    let active = true;
    const previous = readLast();
    const candidates = initialPool
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => initialPool.length <= 1 || item.id !== previous);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)] ?? {
      item: initialPool[0],
      idx: 0,
    };
    setIndex(chosen.idx);
    remember(chosen.item);
    setVisible(true);

    fetchApprovedReviews().then((list) => {
      const fresh = list.filter((item) => item.rating === 5);
      if (!active || fresh.length === 0) return;
      const full = mergeReviews(initialPool, fresh);
      setReviews(full);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = window.setInterval(() => {
      goToIndex(index + 1, reviews);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, reviews, index, goToIndex]);

  if (reviews.length === 0) return null;
  const safeIndex = index < reviews.length ? index : 0;
  const shown = reviews[safeIndex] ?? reviews[0];

  return (
    <section
      aria-labelledby="review-highlight-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="mt-8 overflow-hidden rounded-[2rem] border border-chocolate/10 bg-cream-deep px-5 py-6 shadow-sm md:px-8 md:py-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="lg:max-w-xs">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-chocolate shadow-sm">
            <ReviewStars rating={5} className="h-4 w-4" />
            <span>
              {site.stats.rating} stars · {site.stats.reviews} reviews
            </span>
          </div>
          <h2
            id="review-highlight-title"
            className="mt-3 font-display text-2xl leading-tight text-chocolate md:text-3xl"
          >
            Loved by Real Cookie Collectors
          </h2>
          <p className="mt-1.5 text-sm text-chocolate-mid">
            Verified five star reviews from collectors who hung a JOIRUSH cookie on their wall.
          </p>
        </div>

        <figure
          data-review-id={shown.id}
          data-review-source={shown.source}
          aria-live="polite"
          className={`relative flex-1 rounded-[1.6rem] bg-white p-5 shadow-card transition-opacity duration-200 md:p-6 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ReviewStars rating={shown.rating} className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-chocolate-soft">
                {shown.source === "website" ? "Verified on joirush.com" : "Verified Etsy Collector"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToIndex(safeIndex - 1)}
                aria-label="Previous 5 star review"
                className=" inline-flex h-7 w-7 items-center justify-center rounded-full border border-chocolate/15 text-chocolate-mid transition hover:bg-cream hover:text-chocolate"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goToIndex(safeIndex + 1)}
                aria-label="Next 5 star review"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-chocolate/15 text-chocolate-mid transition hover:bg-cream hover:text-chocolate"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <blockquote className="mt-3 whitespace-pre-line font-display text-xl leading-snug text-chocolate md:text-2xl">
            &ldquo;{shown.quote}&rdquo;
          </blockquote>

          {shown.photo && (
            <ReviewPhoto src={shown.photo} name={shown.name} className="mt-4 h-40 w-full max-w-xs" />
          )}

          <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <span className="font-semibold text-chocolate">{shown.name}</span>
              {shown.piece && <span className="text-chocolate-soft"> · {shown.piece}</span>}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a 5 star review">
                {reviews.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === safeIndex}
                    aria-label={`Show review by ${item.name}`}
                    onClick={() => goToIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === safeIndex ? "w-5 bg-pink" : "w-2 bg-chocolate/20 hover:bg-chocolate/40"
                    }`}
                  />
                ))}
              </div>
              <Link href="/#reviews" className="text-xs font-semibold text-pink hover:underline">
                Read all reviews
              </Link>
            </div>
          </figcaption>
        </figure>
      </div>
      <noscript>
        <style>{`[data-review-id]{opacity:1 !important}`}</style>
      </noscript>
    </section>
  );
}
