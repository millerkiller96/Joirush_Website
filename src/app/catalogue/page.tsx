import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { products } from "@/data/products";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Shop Cookie Art | Sugar Cookie Wall Sculptures & Art Cookies Catalogue",
  description:
    "Browse all handmade cookie art by cookie artist Erynn. Sugar cookie wall sculptures, art cookies, and faux food wall art in classic chocolate chip, M&M, and custom flavors. Giant cookie canvas pieces from $90, free U.S. shipping.",
  keywords: [
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "cookie canvas",
    "jumbo cookie wall art",
    "oversized cookie sculptures",
    "faux food wall art",
    "handmade cookie wall art Orlando",
    "buy cookie art",
  ],
  alternates: {
    canonical: `${siteUrl}/catalogue`,
  },
  openGraph: {
    title: "Shop Cookie Art | Sugar Cookie Wall Sculptures Catalogue",
    description:
      "Browse handmade cookie art and sugar cookie wall sculptures by cookie artist Erynn. Art cookies starting at $90 with free U.S. shipping.",
    type: "website",
    url: `${siteUrl}/catalogue`,
    images: [
      {
        url: `${siteUrl}/images/products/choc-chip.jpg`,
        width: 1200,
        height: 630,
        alt: "Cookie art catalogue - handmade sugar cookie wall sculptures by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Cookie Art | Sugar Cookie Wall Sculptures",
    description: "Handmade cookie art and sugar cookie wall sculptures. Starting at $90, free U.S. shipping.",
    images: [`${siteUrl}/images/products/choc-chip.jpg`],
  },
};

function CatalogueSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cookie Art Catalogue - Sugar Cookie Wall Sculptures",
    description:
      "Full catalogue of handmade cookie art — sugar cookie wall sculptures and art cookies by cookie artist Erynn.",
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
          Cookie Art by Cookie Artist Erynn
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Sugar Cookie Art — Pick Your Flavor
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-chocolate-mid">
          Golden chocolate chip cookie art. Candy-loaded M&M sugar cookie sculptures. Peanut butter comfort. Ice cream sandwiches 
          that stop conversations. Every art cookie is a handmade cookie canvas — scroll until one makes your heart skip.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-soft">
          <li>✓ {products.length} handmade cookie art pieces</li>
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
