import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { products } from "@/data/products";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Oversized Cookie Wall Decor | Full Catalogue of Handmade Cookie Art — JOIRUSH",
  description:
    "Browse all oversized cookie wall decor by cookie artist Erynn. Handmade sugar cookie wall sculptures in classic chocolate chip, M&M, and custom flavors. Oversized cookie wall decor from $90 with free U.S. shipping from Daytona Beach, FL.",
  keywords: [
    "oversized cookie wall decor",
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "jumbo cookie wall art",
    "faux food wall art",
    "handmade cookie wall art",
    "buy cookie art",
  ],
  alternates: {
    canonical: `${siteUrl}/catalogue`,
  },
  openGraph: {
    title: "Oversized Cookie Wall Decor | Full Catalogue — JOIRUSH",
    description:
      "Browse all oversized cookie wall decor by cookie artist Erynn. Handmade sugar cookie wall sculptures starting at $90 with free U.S. shipping.",
    type: "website",
    url: `${siteUrl}/catalogue`,
    images: [
      {
        url: `${siteUrl}/images/products/choc-chip.jpg`,
        width: 1200,
        height: 630,
        alt: "Oversized cookie wall decor catalogue — handmade sugar cookie wall sculptures by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oversized Cookie Wall Decor | Full Catalogue — JOIRUSH",
    description: "Handmade oversized cookie wall decor by cookie artist Erynn. Starting at $90, free U.S. shipping.",
    images: [`${siteUrl}/images/products/choc-chip.jpg`],
  },
};

function CatalogueSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Oversized Cookie Wall Decor — Full Catalogue",
    description:
      "Full catalogue of handmade oversized cookie wall decor — sugar cookie wall sculptures and art cookies by cookie artist Erynn.",
    url: `${siteUrl}/catalogue`,
    mainEntity: {
      "@type": "ItemList",
      name: "Cookie Art Collection",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.tagline,
          image: `${siteUrl}${product.image}`,
          url: `${siteUrl}/product/${product.slug}`,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: product.stripeUrl,
          },
          brand: {
            "@type": "Brand",
            name: site.name,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cookie Wall Art",
        item: `${siteUrl}/wall-art`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Catalogue",
        item: `${siteUrl}/catalogue`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function CataloguePage() {
  return (
    <>
      <CatalogueSchema />
      <BreadcrumbSchema />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-chocolate-soft">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/wall-art" className="hover:text-pink">
                Cookie Art
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-chocolate">
              Catalogue
            </li>
          </ol>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
          Oversized Cookie Wall Decor by Cookie Artist Erynn
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Oversized Cookie Wall Decor — Pick Your Flavor
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-chocolate-mid">
          Golden chocolate chip <strong>oversized cookie wall decor</strong>. Candy-loaded M&M sugar cookie sculptures. Peanut butter comfort. Ice cream sandwiches 
          that stop conversations. Every art cookie is handmade — scroll until one makes your heart skip.
        </p>
        <p className="mt-3 text-chocolate-mid">
          Looking for <Link href="/wall-art/" className="text-pink hover:underline">giant cookie wall art</Link>? Check our main collection. 
          Want something unique? Explore our <Link href="/oversized-food-wall-art/" className="text-pink hover:underline">oversized food wall art</Link> for kitchens and dining rooms.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-soft">
          <li>✓ {products.length} handmade oversized cookie wall decor pieces</li>
          <li>✓ Starting at $90</li>
          <li>✓ Ships in 14 days</li>
          <li>✓ Free U.S. shipping</li>
        </ul>

        <StudioVideoCarousel />

        <div className="mt-10">
          <CatalogueGrid />
        </div>
        <EtsyReviewsHub />
      </div>
    </>
  );
}
