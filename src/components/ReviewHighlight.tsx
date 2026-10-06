"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { getFiveStarReviews, type PoolReview } from "@/data/reviews";
import { ReviewStars } from "@/components/ReviewStars";

const pool = getFiveStarReviews();
const LAST_KEY = "joirush_last_highlight_review";

/** Pick a random 5 star review on each page load, avoiding a repeat of the last one shown. */
function pickReview(): PoolReview {
  if (pool.length <= 1) return pool[0];
  let last: string | null = null;
  try {
    last = window.localStorage.getItem(LAST_KEY);
  } catch {}
  const choices = pool.filter((review) => review.id !== last);
  const choice = choices[Math.floor(Math.random() * choices.length)];
  try {
    window.localStorage.setItem(LAST_KEY, choice.id);
  } catch {}
  return choice;
}

export function ReviewHighlight() {
  const [review, setReview] = useState<PoolReview | null>(null);

  useEffect(() => {
    setReview(pickReview());
  }, []);

  if (pool.length === 0) return null;
  // Server render shows the first review so the section is never empty without JS.
  const shown = review ?? pool[0];

  return (
    <section aria-labelledby="review-highlight-title" className="mt-12 overflow-hidden rounded-[2.4rem] bg-cream-deep">
      <div className="grid items-center gap-8 px-6 py-12 md:grid-cols-[1fr_2fr] md:px-12 md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">Collector spotlight</p>
          <h2 id="review-highlight-title" className="mt-3 font-display text-4xl leading-tight text-chocolate md:text-5xl">
            Straight From a Happy Wall
          </h2>
          <p className="mt-4 text-chocolate-mid">
            {site.stats.rating} stars from {site.stats.reviews} reviews. A new five star review shows up here every visit.
          </p>
        </div>
        <figure
          data-review-id={shown.id}
          className={`relative rounded-[2rem] bg-white p-8 shadow-card transition-opacity duration-500 md:p-10 ${review ? "opacity-100" : "opacity-0"}`}
        >
          <span aria-hidden="true" className="absolute -top-6 left-8 font-display text-8xl leading-none text-pink/30">
            &ldquo;
          </span>
          <ReviewStars rating={shown.rating} className="h-5 w-5" />
          <blockquote className="mt-4 font-display text-2xl leading-snug text-chocolate md:text-3xl">
            {shown.quote}
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span>
              <span className="font-semibold text-chocolate">{shown.name}</span>
              {shown.piece && <span className="text-chocolate-soft"> · {shown.piece}</span>}
            </span>
            <Link href="/#reviews" className="font-medium text-pink hover:underline">
              Read more reviews
            </Link>
          </figcaption>
        </figure>
      </div>
      <noscript>
        <style>{`[data-review-id]{opacity:1 !important}`}</style>
      </noscript>
    </section>
  );
}
