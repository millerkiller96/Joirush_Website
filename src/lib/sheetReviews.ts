import { GOOGLE_SCRIPT_URL } from "@/lib/forms";
import type { PoolReview } from "@/data/reviews";
import { safeReviewPhotoUrl } from "@/lib/reviewPhoto";

/**
 * Approved website reviews from the Google Sheet (via the Apps Script
 * `?action=approved` feed). Client side only. Any failure, bad data, or a
 * response slower than FETCH_TIMEOUT_MS resolves to [] so the page keeps
 * showing its built in reviews.
 */
const FETCH_TIMEOUT_MS = 4000;
const SESSION_KEY = "joirush_sheet_reviews_v2";
const SESSION_TTL_MS = 5 * 60 * 1000;

let pending: Promise<PoolReview[]> | null = null;

export const sheetReviewsEnabled = Boolean(GOOGLE_SCRIPT_URL);

type FeedReview = {
  id?: unknown;
  name?: unknown;
  rating?: unknown;
  text?: unknown;
  product?: unknown;
  date?: unknown;
  /** Only present once the updated sheet script is deployed. Approved reviews only. */
  photo?: unknown;
};

function toPoolReview(raw: FeedReview): PoolReview | null {
  if (!raw || typeof raw !== "object") return null;
  const rating = Number(raw.rating);
  const text = typeof raw.text === "string" ? raw.text.trim().slice(0, 1200) : "";
  if (!text || !Number.isInteger(rating) || rating < 1 || rating > 5) return null;
  const name = typeof raw.name === "string" && raw.name.trim() ? raw.name.trim().slice(0, 60) : "JOIRUSH customer";
  const product = typeof raw.product === "string" && raw.product.trim() ? raw.product.trim().slice(0, 80) : undefined;
  const id = typeof raw.id === "string" || typeof raw.id === "number" ? String(raw.id) : text.slice(0, 24);
  const photo = safeReviewPhotoUrl(raw.photo);
  return { id: `sheet-${id}`, quote: text, name, piece: product, rating, source: "website", ...(photo ? { photo } : {}) };
}

function readSession(): PoolReview[] | null {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || "null");
    if (cached && Date.now() - cached.t < SESSION_TTL_MS && Array.isArray(cached.reviews)) return cached.reviews;
  } catch {}
  return null;
}

/** Approved reviews (all ratings). Fetched once per page; cached in sessionStorage for 5 minutes. */
export function fetchApprovedReviews(): Promise<PoolReview[]> {
  if (!GOOGLE_SCRIPT_URL || typeof window === "undefined") return Promise.resolve([]);
  if (pending) return pending;

  const cached = readSession();
  if (cached) return (pending = Promise.resolve(cached));

  pending = (async () => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const separator = GOOGLE_SCRIPT_URL.includes("?") ? "&" : "?";
      const response = await fetch(`${GOOGLE_SCRIPT_URL}${separator}action=approved`, { signal: controller.signal });
      if (!response.ok) return [];
      const data = await response.json();
      const list = Array.isArray(data?.reviews)
        ? (data.reviews as FeedReview[]).map(toPoolReview).filter((review): review is PoolReview => review !== null)
        : [];
      try {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ t: Date.now(), reviews: list }));
      } catch {}
      return list;
    } catch {
      return [];
    } finally {
      window.clearTimeout(timer);
    }
  })();
  return pending;
}
