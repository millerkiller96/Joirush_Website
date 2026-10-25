"use client";

import { useState } from "react";
import Link from "next/link";
import { asset } from "@/lib/paths";
import { Lightbox } from "@/components/ProductGallery";
import { ReviewStars } from "@/components/ReviewStars";
import { getProduct } from "@/data/products";
import { formatReviewDate, type EtsyCookieReview } from "@/data/etsy-cookie-reviews";

function ReviewCard({ review }: { review: EtsyCookieReview }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const product = getProduct(review.productSlug);
  const hasPhotos = review.photos.length > 0;
  const images = review.photos.map((p) => ({ ...p }));

  return (
    <article
      data-review-card={hasPhotos ? "photo" : "text"}
      className={`min-w-0 overflow-hidden rounded-3xl border border-chocolate/10 bg-white shadow-card ${
        hasPhotos ? "md:col-span-2 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" : ""
      }`}
    >
      {hasPhotos && (
        <div className="grid gap-1 bg-cream-deep">
          {review.photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden"
              aria-label={`Open photo from ${review.name}'s review`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(photo.md)}
                srcSet={`${asset(photo.md)} 720w, ${asset(photo.src)} 1200w`}
                sizes="(min-width: 768px) 560px, 100vw"
                alt={`Customer photo of ${review.item} from ${review.name}`}
                width={photo.width}
                height={photo.height}
                loading="eager"
                className="aspect-[4/5] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-chocolate/80 px-3 py-1 text-xs font-semibold text-cream">
                📷 Customer photo
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="flex min-w-0 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ReviewStars rating={review.stars} className="h-5 w-5" />
          <time dateTime={review.date} className="text-sm text-chocolate-soft">
            {formatReviewDate(review.date)}
          </time>
        </div>
        <blockquote
          className={`mt-4 break-words font-display text-chocolate ${hasPhotos ? "text-2xl leading-snug sm:text-3xl" : "text-xl leading-snug"}`}
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>
        <p className="mt-4 font-semibold text-chocolate">{review.name}</p>
        <p className="mt-1 break-words text-sm text-chocolate-soft">
          Purchased:{" "}
          {product ? (
            <Link href={`/product/${product.slug}/`} className="font-medium text-pink hover:underline">
              {review.item}
            </Link>
          ) : (
            review.item
          )}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-success-dark">Verified Etsy review</p>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          name={`${review.name}'s review photo`}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </article>
  );
}

export function ReviewsGrid({ reviews }: { reviews: EtsyCookieReview[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2" data-reviews-grid>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
