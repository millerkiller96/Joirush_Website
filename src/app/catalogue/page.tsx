import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { products } from "@/data/products";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Shop Jumbo Cookie Wall Art | Full Catalogue of Oversized Cookie Sculptures",
  description:
    "Browse all handmade jumbo cookie wall art — classic chocolate chip, M&M, peanut butter, and more oversized fake cookie sculptures. Starting at $90 with free U.S. shipping.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie sculptures",
    "fake cookie wall decor",
    "handmade dessert art",
    "cookie wall art catalogue",
    "buy cookie wall art",
  ],
  alternates: {
    canonical: `${siteUrl}/catalogue`,
  },
  openGraph: {
    title: "Shop Jumbo Cookie Wall Art | JOIRUSH Catalogue",
    description:
      "Browse all handmade jumbo cookie wall art — oversized fake cookie sculptures starting at $90 with free U.S. shipping.",
    type: "website",
    url: `${siteUrl}/catalogue`,
    images: [
      {
        url: `${siteUrl}/images/products/choc-chip.jpg`,
        width: 1200,
        height: 630,
        alt: "Jumbo chocolate chip cookie wall art by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Jumbo Cookie Wall Art | JOIRUSH",
    description: "All handmade oversized cookie sculptures. Starting at $90, free U.S. shipping.",
    images: [`${siteUrl}/images/products/choc-chip.jpg`],
  },
};

function CatalogueSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jumbo Cookie Wall Art Catalogue",
    description:
      "Full catalogue of handmade jumbo cookie wall art — oversized fake cookie sculptures for walls.",
    url: `${siteUrl}/catalogue`,
    mainEntity: {
      "@type": "ItemList",
      name: "Jumbo Cookie Wall Art Collection",
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
                Cookie Wall Art
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-chocolate">
              Catalogue
            </li>
          </ol>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
          Every flavor. Every craving.
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Pick Your Poison
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-chocolate-mid">
          Golden chocolate chip. Candy-loaded M&Ms. Peanut butter comfort. Ice cream sandwiches 
          that stop conversations. Scroll until one makes your heart skip — then tap to bring it home.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-soft">
          <li>✓ {products.length} handmade pieces</li>
          <li>✓ Starting at $90</li>
          <li>✓ Ships in 14 days</li>
          <li>✓ Free U.S. shipping</li>
        </ul>
        <div className="mt-10">
          <CatalogueGrid />
        </div>
        <EtsyReviewsHub />
      </div>
    </>
  );
}
