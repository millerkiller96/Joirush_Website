import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ReviewHighlight } from "@/components/ReviewHighlight";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { getDisplayName, products } from "@/data/products";
import Buy4Banner from "@/components/Buy4Banner";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Cookies: Handmade Jumbo Cookie Wall Art",
  description:
    "Browse all handmade jumbo cookie wall art by cookie artist Erynn: 14 to 16 inch 3D sugar cookie sculptures, $70 to $175 with free U.S. shipping.",
  keywords: [
    "cookies wall art",
    "oversized cookie wall decor",
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "cookie canvas",
    "faux food wall art",
    "handmade cookie wall art",
    "giant cookie sculpture",
  ],
  alternates: {
    canonical: `${siteUrl}/catalogue/`,
  },
  openGraph: {
    title: "Cookies | Handmade Jumbo Cookie Wall Art | JOIRUSH",
    description:
      "Shop all handmade jumbo cookie wall art by cookie artist Erynn. Lightweight 3D sugar cookie sculptures with free U.S. shipping.",
    type: "website",
    url: `${siteUrl}/catalogue/`,
    images: [
      {
        url: `${siteUrl}/images/products/choc-chip.jpg`,
        width: 1200,
        height: 630,
        alt: "Cookies: handmade sugar cookie wall sculptures by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies | Handmade Jumbo Cookie Wall Art | JOIRUSH",
    description:
      "Shop all handmade jumbo cookie wall art by cookie artist Erynn. Lightweight 3D sugar cookie sculptures with free U.S. shipping.",
    images: [`${siteUrl}/images/products/choc-chip.jpg`],
  },
};

function CatalogueSchema() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cookies: Handmade Jumbo Cookie Wall Art",
    description:
      "All handmade oversized cookie wall decor: sugar cookie wall sculptures and art cookies by cookie artist Erynn.",
    url: `${siteUrl}/catalogue/`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: getDisplayName(product),
          description: product.tagline,
          image: `${siteUrl}${product.image}`,
          url: `${siteUrl}/product/${product.slug}/`,
          category: "Cookie Art",
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/product/${product.slug}/`,
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0",
                currency: "USD",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "US",
              },
            },
          },
        },
      })),
    },
  };

  const breadcrumbSchema = {
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
        name: "Cookies",
        item: `${siteUrl}/catalogue/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function CataloguePage() {
  return (
    <>
      <CatalogueSchema />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-chocolate-soft">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-chocolate">
              Cookies
            </li>
          </ol>
        </nav>

        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
          Cookies
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-chocolate md:text-6xl">
          Cookies: Pick Your Flavor
        </h1>
        <Buy4Banner className="mt-5" />
        <p className="mt-4 max-w-2xl text-chocolate-mid">
          Browse every piece of <strong>handmade cookie wall art</strong> in our shop.
          Every sugar cookie wall sculpture is sculpted by hand from spray foam and acrylic paint by cookie artist Erynn in Daytona Beach, FL, and ships in 14 days with free U.S. shipping.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-chocolate-soft">
          Exploring by room or palette? Check out our{" "}
          <Link href="/kitchen-wall-art/" className="text-pink hover:underline">kitchen wall art</Link>,{" "}
          <Link href="/colorful-wall-art/" className="text-pink hover:underline">colorful wall art</Link>, and{" "}
          <Link href="/oversized-food-wall-art/" className="text-pink hover:underline">oversized food wall art</Link> guides.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
          <li>✓ Ships in 14 days</li>
          <li>✓ Free U.S. shipping</li>
          <li>✓ Handmade by cookie artist Erynn</li>
          <li>✓ Attached hanger</li>
          <li>✓ Buy directly or via Etsy</li>
        </ul>

        <ReviewHighlight />

        <div id="catalogue-grid" data-buy-target="" className="mt-10 scroll-mt-24 outline-none">
          <CatalogueGrid />
        </div>
      </div>

      <StudioVideoCarousel />

      <EtsyReviewsHub />
    </>
  );
}
