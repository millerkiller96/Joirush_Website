/**
 * Etsy cookie reviews shown on /reviews/.
 *
 * To add a review: append an entry below. Copy the review text exactly as
 * written on Etsy. Use "Etsy buyer" when Etsy shows that instead of a name.
 * Dates are ISO (YYYY-MM-DD). Reviews with photos automatically sort to the
 * top of the page (newest first), followed by text reviews (newest first).
 *
 * Photos: put optimized WebP files in public/images/reviews/ as
 * name.webp (1600px), name-md.webp (960px) and name-thumb.webp (480px).
 */

export type EtsyReviewPhoto = {
  src: string;
  md: string;
  thumb: string;
  width: number;
  height: number;
};

export type EtsyCookieReview = {
  id: string;
  name: string;
  stars: number;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Review text copied verbatim from Etsy. */
  text: string;
  /** Item title as listed on Etsy, with dashes replaced by plain wording. */
  item: string;
  /** Product page slug on joirush.com. */
  productSlug: string;
  photos: EtsyReviewPhoto[];
};

export const etsyCookieReviews: EtsyCookieReview[] = [
  {
    id: "etsy-buyer-2026-07-08",
    name: "Etsy buyer",
    stars: 5,
    date: "2026-07-08",
    text: "I would definitely recommend this site. Very talented .",
    item: "Jumbo Chocolate Chip Cookie Wall Art: Dessert Decor",
    productSlug: "jumbo-chocolate-chip-cookie",
    photos: [],
  },
  {
    id: "jay-2026-02-19",
    name: "Jay",
    stars: 5,
    date: "2026-02-19",
    text: "Love it, shipped quick, amazing quality, looks great!! A+++ seller, highly recommended, thank you..",
    item: "Jumbo M&M Cookie Wall Art: Candyland Dessert Decor",
    productSlug: "jumbo-mm-cookie",
    photos: [],
  },
  {
    id: "etsy-buyer-2026-02-05",
    name: "Etsy buyer",
    stars: 5,
    date: "2026-02-05",
    text: "Item got lost in the mail, but she replaced it without no questions!",
    item: "Jumbo Chocolate Chip Cookie Wall Art: Dessert Decor",
    productSlug: "jumbo-chocolate-chip-cookie",
    photos: [],
  },
  {
    id: "ra-2025-12-11-chocolate-chip",
    name: "RA",
    stars: 5,
    date: "2025-12-11",
    text: "Perfect, exactly what I ordered",
    item: "Jumbo Chocolate Chip Cookie Wall Art: Dessert Decor",
    productSlug: "jumbo-chocolate-chip-cookie",
    photos: [],
  },
  {
    id: "ra-2025-12-11-double-chocolate",
    name: "RA",
    stars: 5,
    date: "2025-12-11",
    text: "Perfect, exactly what I ordered",
    item: "Giant Faux Double Chocolate Chip Cookie: Fun Wall Decor",
    productSlug: "giant-double-chocolate-cookie",
    photos: [],
  },
  {
    id: "beau-2025-07-16",
    name: "Beau",
    stars: 5,
    date: "2025-07-16",
    text: "A wonderful gift for my niece! I wanted something for her new play room that she could enjoy, and this cookie was perfect. It's well crafted, and you can tell it was made by hand. Such a unique idea that I'd recommend again.",
    item: "Jumbo Chocolate Chip Cookie, Giant Cookie, Cookie wall art, Dessert Themed Art, Giant Cookie Wall Art",
    productSlug: "jumbo-chocolate-chip-cookie",
    photos: [],
  },
  {
    id: "tiffany-2025-01-03",
    name: "Tiffany",
    stars: 5,
    date: "2025-01-03",
    text: "These cookies are so adorable and the seller went the extra mile and attached hooks on each so I can hang them! Super cute!!",
    item: "Jumbo Chocolate Chip Cookie, Giant Cookie, Cookie wall art, Dessert Themed Art, Giant Cookie Wall Art",
    productSlug: "jumbo-chocolate-chip-cookie",
    photos: [
      {
        src: "/images/reviews/tiffany-1.webp",
        md: "/images/reviews/tiffany-1-md.webp",
        thumb: "/images/reviews/tiffany-1-thumb.webp",
        width: 1200,
        height: 1600,
      },
    ],
  },
];

/** Photo reviews first (newest first), then text reviews (newest first). */
export function getSortedEtsyCookieReviews(list: EtsyCookieReview[] = etsyCookieReviews) {
  return [...list].sort((a, b) => {
    const pa = a.photos.length > 0 ? 1 : 0;
    const pb = b.photos.length > 0 ? 1 : 0;
    if (pa !== pb) return pb - pa;
    return b.date.localeCompare(a.date);
  });
}

export function getEtsyCookieReviewAverage(list: EtsyCookieReview[] = etsyCookieReviews) {
  if (list.length === 0) return 0;
  return list.reduce((sum, r) => sum + r.stars, 0) / list.length;
}

export function formatReviewDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
