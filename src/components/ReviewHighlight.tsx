"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { getFiveStarReviews, mergeReviews, type PoolReview } from "@/data/reviews";
import { fetchApprovedReviews } from "@/lib/sheetReviews";
import { ReviewStars } from "@/components/ReviewStars";
import { ReviewPhoto } from "@/components/ReviewPhoto";

const pool = getFiveStarReviews();
const LAST_KEY = "joirush_last_highlight_review";

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

/** Pick a random review from a pool, avoiding the one shown last time. */
function pickFrom(choices: PoolReview[], avoid: string | null): PoolReview {
  const options = choices.length > 1 ? choices.filter((review) => review.id !== avoid) : choices;
  return options[Math.floor(Math.random() * options.length)];
}

export function ReviewHighlight() {
  const [review, setReview] = useState<PoolReview | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pool.length === 0) return;
    let active = true;
    const previous = readLast();
    // Show a built in review right away so the card never waits on the network.
    const first = pickFrom(pool, previous);
    remember(first);
    setReview(first);
    setVisible(true);

    // Then fold in 5 star reviews approved in the Google Sheet. Re-roll across the full pool;
    // only swap (with a fade) when the new pick is a sheet review, so the card rarely changes.
    fetchApprovedReviews().then((list) => {
      const fresh = list.filter((item) => item.rating === 5);
      if (!active || fresh.length === 0) return;
      const full = mergeReviews(pool, fresh);
      const next = pickFrom(full, previous);
      if (next.source !== "website" || pool.some((item) => item.id === next.id)) return;
      setVisible(false);
      window.setTimeout(() => {
        if (!active) return;
        remember(next);
        setReview(next);
        setVisible(true);
      }, 450);
    });
    return () => {
      active = false;
    };
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
          data-review-source={shown.source}
          className={`relative rounded-[2rem] bg-white p-8 shadow-card transition-opacity duration-500 md:p-10 ${review && visible ? "opacity-100" : "opacity-0"}`}
        >
          <span aria-hidden="true" className="absolute -top-6 left-8 font-display text-8xl leading-none text-pink/30">
            &ldquo;
          </span>
          <ReviewStars rating={shown.rating} className="h-5 w-5" />
          <blockquote className="mt-4 whitespace-pre-line font-display text-2xl leading-snug text-chocolate md:text-3xl">
            {shown.quote}
          </blockquote>
          {shown.photo && <ReviewPhoto src={shown.photo} name={shown.name} className="mt-6 h-48 w-full max-w-sm" />}
          <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span>
              <span className="font-semibold text-chocolate">{shown.name}</span>
              {shown.piece && <span className="text-chocolate-soft"> · {shown.piece}</span>}
              <span className="mt-1 block text-xs uppercase tracking-widest text-chocolate-soft">
                {shown.source === "website" ? "Review on joirush.com" : "Review on Etsy"}
              </span>
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
