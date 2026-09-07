import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { products } from "@/data/products";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Shop Jumbo Cookie Wall Art | Full Catalogue of Oversized Cookie Sculptures",
  description:
    "Browse all handmade jumbo cookie wall art — classic chocolate chip, M&M, peanut butter, and more oversized fake cookie sculptures. Starting at $90 with free U.S. shipping. Buy on Etsy.",
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
            url: product.etsyUrl,
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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
          Shop jumbo cookie wall art
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Cookie wall art catalogue
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-chocolate-mid">
          Every oversized cookie sculpture is hand-sculpted in Florida from wood, clay, and acrylic
          paint — lightweight enough to hang, realistic enough to make people hungry. Tap a piece
          to see details, then buy on Etsy with free U.S. shipping.
        </p>
        <p className="mt-2 text-sm text-chocolate-soft">
          {products.length} handmade pieces · Starting at $90 · Ships from Daytona Beach, FL
        </p>
        <div className="mt-10">
          <CatalogueGrid />
        </div>
      </div>
    </>
  );
}
