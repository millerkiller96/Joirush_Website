import approvedData from "./approved-reviews.json";
import { reviews as curatedEtsyReviews } from "./site";
import { getShopReviews } from "./products";

/**
 * One shared pool of customer reviews used by the homepage review section and
 * the catalogue review highlight.
 *
 * Sources:
 *  1. Curated Etsy reviews about cookie art (src/data/site.ts `reviews`).
 *  2. Etsy reviews pulled by scripts/sync-etsy.mjs, kept only when they clearly
 *     talk about a cookie (synced reviews carry no listing info).
 *  3. Website reviews approved by the owner (src/data/approved-reviews.json).
 *     Approved 5 star entries join the pool automatically on the next build.
 *  4. At runtime, reviews approved in the Google Sheet are fetched by
 *     src/lib/sheetReviews.ts and merged in with mergeReviews().
 */
export type PoolReview = {
  id: string;
  quote: string;
  name: string;
  piece?: string;
  rating: number;
  source: "etsy" | "website";
};

type ApprovedReview = {
  id?: string;
  name: string;
  rating: number;
  quote: string;
  piece?: string;
  source?: string;
};

const COOKIE_WORDS = /cookie|m&m|chocolate chip|sculpture|wall art/i;

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getAllReviews(): PoolReview[] {
  const pool: PoolReview[] = [];
  const seen = new Set<string>();
  const add = (review: PoolReview) => {
    const key = normalize(review.quote);
    if (!key || seen.has(key)) return;
    seen.add(key);
    pool.push(review);
  };

  curatedEtsyReviews.forEach((review, index) =>
    add({ id: `etsy-curated-${index}`, quote: review.quote, name: review.name, piece: review.piece, rating: 5, source: "etsy" }),
  );

  getShopReviews().forEach((review, index) => {
    if (!review.review || !COOKIE_WORDS.test(review.review)) return;
    add({ id: `etsy-sync-${index}`, quote: review.review.trim(), name: "Etsy buyer", rating: review.rating, source: "etsy" });
  });

  ((approvedData.reviews ?? []) as ApprovedReview[]).forEach((review, index) =>
    add({
      id: review.id ?? `website-${index}`,
      quote: review.quote,
      name: review.name,
      piece: review.piece,
      rating: review.rating,
      source: "website",
    }),
  );

  return pool;
}

/** Only 5 star reviews: what the homepage and catalogue highlight show. */
export function getFiveStarReviews(): PoolReview[] {
  return getAllReviews().filter((review) => review.rating >= 5);
}

/** Adds extra reviews (for example approved ones from the Google Sheet) to a pool, skipping repeats. */
export function mergeReviews(base: PoolReview[], extra: PoolReview[]): PoolReview[] {
  const seen = new Set(base.map((review) => normalize(review.quote)));
  const ids = new Set(base.map((review) => review.id));
  const merged = [...base];
  for (const review of extra) {
    const key = normalize(review.quote);
    if (!key || seen.has(key) || ids.has(review.id)) continue;
    seen.add(key);
    ids.add(review.id);
    merged.push(review);
  }
  return merged;
}
