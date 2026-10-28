import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";
import { StarIcon } from "@/components/ReviewStars";
import { ReviewsGrid } from "@/components/ReviewsPageClient";
import {
  etsyCookieReviews,
  getEtsyCookieReviewAverage,
  getSortedEtsyCookieReviews,
} from "@/data/etsy-cookie-reviews";

export const metadata: Metadata = {
  title: "JOIRUSH Reviews: Jumbo Cookie Wall Art",
  description:
    "Read real JOIRUSH reviews from Etsy buyers of our handmade jumbo cookie wall art. Customer photos first, plus the average star rating.",
  alternates: { canonical: `${siteUrl}/reviews/` },
  openGraph: {
    title: "JOIRUSH Reviews: Jumbo Cookie Wall Art | JOIRUSH",
    description:
      "Read real JOIRUSH reviews from Etsy buyers of our handmade jumbo cookie wall art. Customer photos first, plus the average star rating.",
    url: `${siteUrl}/reviews/`,
    type: "website",
  },
};

// No Review or AggregateRating structured data on purpose: these reviews are
// republished from Etsy about our own products, which Google treats as
// self serving / third party reviews that are not eligible for review snippets.

export default function ReviewsPage() {
  const reviews = getSortedEtsyCookieReviews(etsyCookieReviews);
  const average = getEtsyCookieReviewAverage(reviews);
  const averageLabel = average.toFixed(1);
  const count = reviews.length;
  const photoCount = reviews.filter((r) => r.photos.length > 0).length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <section
        className="rounded-[2rem] border-2 border-pink/30 bg-pink-blush/60 px-5 py-10 text-center sm:px-10"
        data-reviews-summary
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">Cookie Reviews</p>
        <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">JOIRUSH reviews: what collectors say</h1>
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="font-display text-7xl font-bold leading-none text-chocolate sm:text-8xl">{averageLabel}</p>
          <div className="flex items-center gap-1" role="img" aria-label={`${averageLabel} out of 5 stars`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon
                key={i}
                className={`h-8 w-8 sm:h-10 sm:w-10 ${i < Math.round(average) ? "text-caramel" : "text-chocolate/20"}`}
                filled={i < Math.round(average)}
              />
            ))}
          </div>
          <p className="text-lg font-semibold text-chocolate">
            {averageLabel} out of 5 from {count} Etsy reviews
          </p>
          <p className="text-sm text-chocolate-soft">
            {photoCount} with customer photos, shown first
          </p>
        </div>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/catalogue/"
            data-reviews-cta=""
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-7 py-4 text-lg font-bold text-white shadow-lift transition hover:bg-success-dark sm:w-auto"
          >
            🍪 Get your own Jumbo Cookie Now
          </Link>
          <a
            href={site.etsyReviews}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-chocolate/15 bg-white px-6 py-3.5 font-semibold text-chocolate transition hover:border-pink hover:text-pink sm:w-auto"
          >
            See all JOIRUSH reviews on Etsy
          </a>
        </div>
      </section>

      <section className="mt-12" aria-label="Etsy cookie reviews">
        <ReviewsGrid reviews={reviews} />
      </section>

      <section className="mt-14 rounded-[2rem] bg-cream-deep/60 px-5 py-10 text-center sm:px-10">
        <h2 className="font-display text-3xl text-chocolate">Ready for a cookie of your own?</h2>
        <p className="mx-auto mt-3 max-w-xl text-chocolate-mid">
          Every jumbo cookie is handmade to order by cookie artist Erynn and ships free in the U.S.
        </p>
        <Link
          href="/catalogue/"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-success px-7 py-4 text-lg font-bold text-white shadow-lift transition hover:bg-success-dark sm:w-auto"
        >
          🍪 Get your own Jumbo Cookie Now
        </Link>
      </section>
    </div>
  );
}
