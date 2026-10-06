"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { getFiveStarReviews } from "@/data/reviews";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewStars, StarIcon } from "@/components/ReviewStars";

const reviews = getFiveStarReviews();

export function HomeReviews() {
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Deep link: /#leave-a-review opens the form.
  useEffect(() => {
    if (window.location.hash === "#leave-a-review") setFormOpen(true);
  }, []);

  useEffect(() => {
    if (formOpen) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [formOpen]);

  return (
    <section id="reviews" aria-labelledby="home-reviews-title" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="text-center">
          <a
            href={site.etsyReviews}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-etsy/10 px-4 py-2 text-sm transition hover:bg-etsy/15"
          >
            <span className="flex items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="h-4 w-4 text-caramel" />
              ))}
            </span>
            <span className="font-semibold text-chocolate">{site.stats.rating}</span>
            <span className="text-chocolate-mid">from {site.stats.reviews} reviews on Etsy</span>
          </a>
          <h2 id="home-reviews-title" className="mt-6 font-display text-4xl text-chocolate md:text-5xl">
            Reviews From Real Cookie Collectors
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-chocolate-mid">
            Five star words from people who hung a JOIRUSH cookie on their wall.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <figure className="flex h-full flex-col rounded-[1.8rem] bg-cream p-6 shadow-card">
                <ReviewStars rating={review.rating} />
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-chocolate">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-chocolate">{review.name}</span>
                  {review.piece && <span className="text-chocolate-soft"> · {review.piece}</span>}
                  <span className="mt-1 block text-xs uppercase tracking-widest text-chocolate-soft">
                    {review.source === "website" ? "Review on joirush.com" : "Review on Etsy"}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setFormOpen((open) => !open)}
            aria-expanded={formOpen}
            aria-controls="leave-a-review"
            className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white transition hover:bg-pink-hot"
          >
            {formOpen ? "Hide review form" : "Leave a review"}
          </button>
          <a
            href={site.etsyReviews}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-chocolate/15 bg-white px-6 py-3 text-sm font-medium text-chocolate transition hover:bg-cream"
          >
            See all reviews on Etsy
          </a>
        </div>

        <div id="leave-a-review" ref={formRef} className="mx-auto mt-10 max-w-2xl scroll-mt-24" hidden={!formOpen}>
          {formOpen && <ReviewForm onDone={() => setFormOpen(false)} />}
        </div>
      </div>
    </section>
  );
}
