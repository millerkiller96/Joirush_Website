import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Jumbo Cookie Wall Art | Oversized Fake Cookie Sculptures for Sale",
  description:
    "Shop handmade jumbo cookie wall art — oversized fake cookie sculptures for kitchens, cafés, bakeries, and content studios. Realistic dessert wall decor with free U.S. shipping. Buy on Etsy.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "fake cookie wall sculpture",
    "giant cookie art",
    "dessert wall decor",
    "bakery wall art",
    "kitchen wall decor",
    "faux cookie art",
    "realistic food sculpture",
    "handmade wall art",
  ],
  alternates: {
    canonical: `${siteUrl}/wall-art`,
  },
  openGraph: {
    title: "Jumbo Cookie Wall Art | Oversized Fake Cookie Sculptures | JOIRUSH",
    description:
      "Handmade oversized fake cookie sculptures for walls — realistic dessert decor for kitchens, cafés, and studios. Free U.S. shipping.",
    type: "website",
    url: `${siteUrl}/wall-art`,
    images: [
      {
        url: `${siteUrl}/images/products/mm-set.jpg`,
        width: 1200,
        height: 630,
        alt: "Jumbo M&M cookie wall art set by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumbo Cookie Wall Art | JOIRUSH",
    description: "Handmade oversized fake cookie sculptures for walls. Free U.S. shipping.",
    images: [`${siteUrl}/images/products/mm-set.jpg`],
  },
};

function WallArtSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jumbo Cookie Wall Art Collection",
    description:
      "Handmade oversized fake cookie sculptures for walls — realistic dessert decor for kitchens, cafés, bakeries, and content studios.",
    url: `${siteUrl}/wall-art`,
    mainEntity: {
      "@type": "ItemList",
      name: "Jumbo Cookie Wall Art",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: `${siteUrl}${product.image}`,
          url: `${siteUrl}/product/${product.slug}`,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: product.etsyUrl,
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
        name: "Jumbo Cookie Wall Art",
        item: `${siteUrl}/wall-art`,
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

export default function WallArtPage() {
  return (
    <>
      <WallArtSchema />
      <BreadcrumbSchema />
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              Handmade oversized cookie sculptures
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Jumbo cookie wall art
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Oversized fake cookie sculptures that look good enough to eat and last forever on the
              wall. Realistic chocolate chip, candyland M&Ms, peanut butter, holiday cookies, and
              ice cream sandwiches — all handmade, all one of a kind. Free U.S. shipping from
              Florida.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.etsy}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
              >
                Buy on Etsy
              </a>
              <Link
                href="/catalogue"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium hover:bg-white"
              >
                Browse all cookies
              </Link>
            </div>
            <p className="mt-6 text-sm text-chocolate-soft">
              Starting at $90 · Free U.S. shipping · Ships from Daytona Beach, FL
            </p>
          </div>
          <Image
            src="/images/products/mm-set.jpg"
            alt="Jumbo M&M cookie wall art set — handmade oversized fake cookie sculpture"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Handmade oversized cookie sculptures"
              title="Wood, clay, paint — then the sugar rush"
              copy="Each jumbo cookie is built as a lightweight sculpture with a built-in hanger. The craggy dough, glossy chips, and candy pieces are hand-finished so the realistic texture reads from across the room."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Realistic sculpted texture",
                  copy: "Thick, bakery-case surfaces — bubbles, crags, and that just-baked edge that looks good enough to eat.",
                },
                {
                  title: "Ready to hang",
                  copy: "Built-in wall hangers included. Ships free in the U.S. from Daytona Beach, Florida.",
                },
                {
                  title: "Made for your space",
                  copy: "Kitchens, cafés, bakeries, playrooms, dessert bars, content studios, and anywhere that needs dessert decor.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.8rem] bg-cream p-6">
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-chocolate-mid">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Shop jumbo cookie wall art"
            title="Every oversized cookie sculpture"
          />
          <p className="mt-4 max-w-2xl text-chocolate-mid">
            {products.length} handmade pieces available. Tap any cookie to see details, size, and
            price — then buy on Etsy with free U.S. shipping.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
