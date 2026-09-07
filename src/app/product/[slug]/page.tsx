import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
  calculateSavings,
} from "@/data/products";
import { site, reviews } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.shortName,
    description: product.description,
  };
}

function getRelevantReviews() {
  return reviews.filter(
    (r) =>
      r.piece.toLowerCase().includes("cookie") ||
      r.piece.toLowerCase().includes("wall")
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  const { savings, percent } = calculateSavings(product.price, product.compareAtPrice);
  const relevantReviews = getRelevantReviews().slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://joirush.com${product.image}`,
    brand: {
      "@type": "Brand",
      name: "JOIRUSH",
    },
    offers: {
      "@type": "Offer",
      url: `https://joirush.com/product/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "JOIRUSH",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "USD",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.rating,
      reviewCount: site.stats.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-sm text-chocolate-soft">
          <Link href="/catalogue" className="hover:text-pink">
            Catalogue
          </Link>{" "}
          / {product.shortName}
        </p>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1600}
            priority
            className="rounded-[2.2rem] object-cover shadow-card"
          />

          <div>
            {/* Category Label */}
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              Handmade wall art
            </p>

            {/* Product Name */}
            <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">
              {product.name}
            </h1>

            {/* Price Block */}
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

            {/* Trust Row */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-chocolate-mid">
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

            {/* Social Proof */}
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

              {/* Review Quotes */}
              {relevantReviews.length > 0 && (
                <div className="mt-4 space-y-3">
                  {relevantReviews.map((review, idx) => (
                    <blockquote key={idx} className="border-l-2 border-caramel/30 pl-3 text-sm italic text-chocolate-mid">
                      "{review.quote.length > 120 ? review.quote.slice(0, 120) + "..." : review.quote}"
                      <footer className="mt-1 text-xs font-medium not-italic text-chocolate-soft">
                        — {review.name}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 space-y-3">
              {product.stripeUrl ? (
                <a
                  href={product.stripeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buy Now — {formatPrice(product.price)}
                </a>
              ) : (
                <a
                  href={product.etsyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-success px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buy Now — {formatPrice(product.price)}
                </a>
              )}
              <a
                href={product.etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-chocolate/15 px-6 py-3 text-sm font-medium text-chocolate-mid transition hover:border-chocolate/30 hover:text-chocolate"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.559 2c-.556.004-1.36.025-2.033.138C5.32 2.322 4.13 2.884 3.507 3.507c-.623.623-1.185 1.813-1.369 3.019-.113.673-.134 1.477-.138 2.033v6.882c.004.556.025 1.36.138 2.033.184 1.206.746 2.396 1.369 3.019.623.623 1.813 1.185 3.019 1.369.673.113 1.477.134 2.033.138h6.882c.556-.004 1.36-.025 2.033-.138 1.206-.184 2.396-.746 3.019-1.369.623-.623 1.185-1.813 1.369-3.019.113-.673.134-1.477.138-2.033V8.559c-.004-.556-.025-1.36-.138-2.033-.184-1.206-.746-2.396-1.369-3.019-.623-.623-1.813-1.185-3.019-1.369C16.8 2.025 15.997 2.004 15.441 2H8.559zm.385 4.516h5.812c.283.004.686.012.847.223.15.196.136.517.132.809l-.026 1.645a.61.61 0 01-.617.592c-.32-.006-.645-.01-.967-.011l-.06-.001c-.387-.001-.775.002-1.163.009l.004-.254c.003-.234.006-.467-.029-.669-.05-.285-.216-.47-.526-.58a2.377 2.377 0 00-.557-.11c-.282-.029-.503.045-.66.228-.166.193-.248.469-.261.788l-.025.597c.67.007 1.339.024 2.009.05.387.015.573.168.586.478.005.13-.002.26-.009.39l-.015.266-.016.278c-.012.228-.108.334-.304.378a8.677 8.677 0 01-.367.065c-.636.1-1.271.18-1.907.242l-.033.872c-.009.237-.003.499.004.762l.004.134c.012.346.024.693.004 1.038-.038.65-.22 1.243-.535 1.793a2.49 2.49 0 01-.344.448c-.157.16-.379.248-.573.087-.178-.147-.172-.366-.109-.575.08-.263.157-.527.23-.792l.113-.413c.178-.676.345-1.353.468-2.04l.055-.324-.42.029c-.303.02-.607.038-.91.044-.317.007-.483-.121-.513-.395a5.59 5.59 0 01-.022-.51c.004-.189.073-.326.25-.412.158-.077.33-.094.502-.11l.214-.02c.284-.026.568-.056.852-.088l.037-.858c-.45.014-.9.026-1.35.028-.375.002-.556-.147-.573-.475-.01-.194-.002-.39.006-.585l.01-.227c.015-.302.155-.44.495-.471.345-.032.69-.058 1.035-.08l.34-.02.074-1.51c.031-.629.251-.893.886-.926z" />
                </svg>
                Buy on Etsy
              </a>
              <Link
                href="/custom"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-chocolate/10 px-6 py-3 text-sm font-medium text-chocolate-soft transition hover:border-chocolate/20 hover:text-chocolate-mid"
              >
                Want it custom?
              </Link>
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="text-lg leading-relaxed text-chocolate-mid">{product.description}</p>
            </div>

            {/* Details */}
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

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="font-display text-3xl text-chocolate">More from the bakery wall</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
