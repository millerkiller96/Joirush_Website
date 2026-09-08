"use client";

import { useRef } from "react";
import Link from "next/link";
import { Image } from "@/components/Image";
import { ProductBuyButtons } from "@/components/ProductBuyButtons";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ProductCard } from "@/components/ProductCard";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import {
  formatPrice,
  calculateSavings,
  type Product,
} from "@/data/products";
import { site, reviews } from "@/data/site";

type ProductPageClientProps = {
  product: Product;
  related: Product[];
};

function getRelevantReviews() {
  return reviews.filter(
    (r) =>
      r.piece.toLowerCase().includes("cookie") ||
      r.piece.toLowerCase().includes("wall")
  );
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="mt-16 border-t border-chocolate/10 pt-12">
      <h2 className="font-display text-3xl text-chocolate">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-chocolate/10 bg-cream/50"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-chocolate">
              {faq.question}
              <span className="ml-4 text-pink transition-transform group-open:rotate-180">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-4 pb-4 text-chocolate-mid">{faq.answer}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ProductPageClient({ product, related }: ProductPageClientProps) {
  const mainBuyRef = useRef<HTMLDivElement>(null);
  const { savings, percent } = calculateSavings(product.price, product.compareAtPrice);
  const relevantReviews = getRelevantReviews().slice(0, 2);

  const upsellProduct = {
    name: product.name,
    shortName: product.shortName,
    image: product.image,
    price: product.price,
    etsyUrl: product.etsyUrl,
    stripeUrl: product.stripeUrl,
    stripeUpsellUrl: product.stripeUpsellUrl,
    upsellPairPrice: product.upsellPairPrice,
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-12 pb-28 md:px-8 md:py-16 md:pb-32">
        <nav aria-label="Breadcrumb" className="text-sm text-chocolate-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/wall-art/" className="hover:text-pink">
                Cookie Wall Art
              </Link>
            </li>
            <li>/</li>
            <li className="text-chocolate">{product.shortName}</li>
          </ol>
        </nav>

        <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1600}
            priority
            className="rounded-[2.2rem] object-cover shadow-card"
          />

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
              Looks good enough to eat
            </p>

            <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-chocolate">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-chocolate-soft line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              </div>
              <p className="mt-1 inline-block rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success-dark">
                Save {formatPrice(savings)} ({percent}% off)
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-chocolate-mid">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ships in {site.shippingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Free U.S. shipping
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-caramel" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ships from {site.shipsFrom}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                {product.materials}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-chocolate-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {product.size}
              </span>
            </div>

            <div className="mt-6 rounded-2xl bg-cream-deep/60 p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-caramel"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 font-semibold text-chocolate">{site.stats.rating}</span>
                </div>
                <span className="text-sm text-chocolate-soft">
                  {site.stats.reviews} reviews · {site.stats.sales}+ sold · {site.stats.years} years on Etsy
                </span>
              </div>

              {relevantReviews.length > 0 && (
                <div className="mt-4 space-y-3">
                  {relevantReviews.map((review, idx) => (
                    <blockquote key={idx} className="border-l-2 border-caramel/30 pl-3 text-sm italic text-chocolate-mid">
                      "{review.quote.length > 120 ? review.quote.slice(0, 120) + "..." : review.quote}"
                      <footer className="mt-1 text-sm font-medium not-italic text-chocolate-soft">
                        — {review.name}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </div>

            <div ref={mainBuyRef}>
              <ProductBuyButtons product={upsellProduct} />
            </div>

            <div className="mt-8">
              <p className="text-lg leading-relaxed text-chocolate-mid">{product.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-chocolate">Details</h3>
              <ul className="mt-3 space-y-2 text-chocolate-mid">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <svg className="mt-1 h-4 w-4 flex-shrink-0 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <StudioVideoCarousel />

      <div className="mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-32">
        <EtsyReviewsHub />

        <section className="mt-16">
          <h2 className="font-display text-3xl text-chocolate">Can&apos;t stop at just one?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>

        <FAQAccordion faqs={product.faqs} />
      </div>

      <StickyBuyBar product={upsellProduct} mainBuyButtonRef={mainBuyRef} />
    </>
  );
}
