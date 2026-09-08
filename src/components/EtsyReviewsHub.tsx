"use client";

import { useState } from "react";
import { reviews as siteReviews, site } from "@/data/site";
import { getShopReviews, type EtsySyncReview } from "@/data/products";

type DisplayReview = {
  quote: string;
  name: string;
  piece?: string;
  rating: number;
};

function StarIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function EtsyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.559 2c-.556.004-1.36.025-2.033.138C5.32 2.322 4.13 2.884 3.507 3.507c-.623.623-1.185 1.813-1.369 3.019-.113.673-.134 1.477-.138 2.033v6.882c.004.556.025 1.36.138 2.033.184 1.206.746 2.396 1.369 3.019.623.623 1.813 1.185 3.019 1.369.673.113 1.477.134 2.033.138h6.882c.556-.004 1.36-.025 2.033-.138 1.206-.184 2.396-.746 3.019-1.369.623-.623 1.185-1.813 1.369-3.019.113-.673.134-1.477.138-2.033V8.559c-.004-.556-.025-1.36-.138-2.033-.184-1.206-.746-2.396-1.369-3.019-.623-.623-1.813-1.185-3.019-1.369C16.8 2.025 15.997 2.004 15.441 2H8.559zm.385 4.516h5.812c.283.004.686.012.847.223.15.196.136.517.132.809l-.026 1.645a.61.61 0 01-.617.592c-.32-.006-.645-.01-.967-.011l-.06-.001c-.387-.001-.775.002-1.163.009l.004-.254c.003-.234.006-.467-.029-.669-.05-.285-.216-.47-.526-.58a2.377 2.377 0 00-.557-.11c-.282-.029-.503.045-.66.228-.166.193-.248.469-.261.788l-.025.597c.67.007 1.339.024 2.009.05.387.015.573.168.586.478.005.13-.002.26-.009.39l-.015.266-.016.278c-.012.228-.108.334-.304.378a8.677 8.677 0 01-.367.065c-.636.1-1.271.18-1.907.242l-.033.872c-.009.237-.003.499.004.762l.004.134c.012.346.024.693.004 1.038-.038.65-.22 1.243-.535 1.793a2.49 2.49 0 01-.344.448c-.157.16-.379.248-.573.087-.178-.147-.172-.366-.109-.575.08-.263.157-.527.23-.792l.113-.413c.178-.676.345-1.353.468-2.04l.055-.324-.42.029c-.303.02-.607.038-.91.044-.317.007-.483-.121-.513-.395a5.59 5.59 0 01-.022-.51c.004-.189.073-.326.25-.412.158-.077.33-.094.502-.11l.214-.02c.284-.026.568-.056.852-.088l.037-.858c-.45.014-.9.026-1.35.028-.375.002-.556-.147-.573-.475-.01-.194-.002-.39.006-.585l.01-.227c.015-.302.155-.44.495-.471.345-.032.69-.058 1.035-.08l.34-.02.074-1.51c.031-.629.251-.893.886-.926z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: DisplayReview }) {
  return (
    <blockquote className="rounded-[1.8rem] bg-white p-6 shadow-card">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${i < review.rating ? "text-caramel" : "text-chocolate/20"}`}
            filled={i < review.rating}
          />
        ))}
      </div>
      <p className="mt-3 text-chocolate-mid">&ldquo;{review.quote}&rdquo;</p>
      <p className="mt-4 text-sm">
        <span className="font-medium text-chocolate">{review.name}</span>
        {review.piece && <span className="text-chocolate-soft"> · {review.piece}</span>}
      </p>
    </blockquote>
  );
}

export function EtsyReviewsHub() {
  const [expanded, setExpanded] = useState(false);

  const syncedReviews = getShopReviews();

  const allReviews: DisplayReview[] = [];

  siteReviews.forEach((r) => {
    allReviews.push({
      quote: r.quote,
      name: r.name,
      piece: r.piece,
      rating: 5,
    });
  });

  syncedReviews.forEach((r: EtsySyncReview) => {
    if (r.review && r.review.trim()) {
      allReviews.push({
        quote: r.review,
        name: "Etsy buyer",
        rating: r.rating,
      });
    }
  });

  const displayedReviews = expanded ? allReviews : allReviews.slice(0, 6);
  const hasMore = allReviews.length > 6;
  const totalReviewCount = site.stats.reviews;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-etsy/10 px-4 py-2">
          <EtsyIcon className="h-5 w-5 text-etsy" />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 text-caramel" filled />
            ))}
          </div>
          <span className="font-semibold text-chocolate">{site.stats.rating}</span>
          <span className="text-chocolate-soft">·</span>
          <span className="text-chocolate-mid">{totalReviewCount} reviews on Etsy</span>
        </div>
        <h2 className="mt-6 font-display text-4xl text-chocolate md:text-5xl">
          What Collectors Say
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-chocolate-mid">
          Real reviews from happy homes. {site.stats.years} years of handmade goodness and counting.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayedReviews.map((review, idx) => (
          <ReviewCard key={`${review.name}-${idx}`} review={review} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded-full border border-chocolate/15 bg-white px-6 py-3 text-sm font-medium text-chocolate transition hover:bg-cream"
          >
            {expanded ? "Show fewer reviews" : `See more reviews (${allReviews.length - 6} more)`}
          </button>
        )}
        <a
          href={site.etsy}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-etsy px-6 py-3 text-sm font-medium text-white transition hover:bg-etsy-dark"
        >
          <EtsyIcon className="h-4 w-4" />
          View all reviews on Etsy
        </a>
      </div>
    </section>
  );
}
