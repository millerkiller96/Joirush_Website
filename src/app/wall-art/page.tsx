import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jumbo Cookie Wall Art | Oversized Faux Food Sculptures & Kitchen Decor",
  description:
    "Handmade jumbo cookie wall art and oversized faux food sculptures for kitchens and homes. Lightweight fake cookie sculptures in chocolate chip, M&M, and custom flavors. $90-$225, ships free.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "giant cookie wall art",
    "fake cookie wall sculpture",
    "faux food wall art",
    "chocolate chip cookie wall art",
    "M&M cookie wall art",
    "kitschy kitchen wall art",
    "faux cookie sculpture",
    "kitchen wall decor",
  ],
  openGraph: {
    title: "Jumbo Cookie Wall Art | Handmade Faux Food Sculptures",
    description:
      "Oversized cookie sculptures handmade in Orlando, FL. Lightweight, hangable wall decor for kitchens, homes, and content studios. $90-$225.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/mm-set.jpg"),
        width: 1200,
        height: 630,
        alt: "Jumbo M&M cookie wall art set by JOIRUSH",
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl("/wall-art/"),
  },
};

function CollectionJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jumbo Cookie Wall Art Collection",
    description:
      "Handmade oversized cookie wall sculptures for kitchens, homes, and content studios.",
    url: getAbsoluteUrl("/wall-art/"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.tagline,
          image: getImageUrl(product.image),
          url: getAbsoluteUrl(`/product/${product.slug}/`),
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
    breadcrumb: {
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
          item: getAbsoluteUrl("/wall-art/"),
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WallArtPage() {
  const classicCookies = products.filter((p) => p.category === "classic");
  const candyCookies = products.filter((p) => p.category === "candy");
  const cookieSets = products.filter((p) => p.category === "set");

  return (
    <>
      <CollectionJsonLd />
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              Handmade Faux Food Wall Art
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Jumbo Cookie Wall Art & Oversized Dessert Sculptures
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Hyper-realistic <strong>oversized cookie wall decor</strong> that looks good enough to eat and 
              lasts forever on the wall. These handmade <strong>fake cookie wall sculptures</strong> feature 
              classic chocolate chip, candyland M&Ms, peanut butter, holiday cookies, and ice cream sandwiches — 
              all lightweight, hangable, and one of a kind.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Unlike heavy fiberglass commercial props, each piece is hand-sculpted in Orlando, Florida using 
              spray foam and acrylic paint. Perfect for kitchens, dining rooms, 
              dessert-themed spaces, and content studios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue/"
                className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
              >
                Shop All Cookies
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Commission a Custom Flavor
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-chocolate-soft">
              <span className="font-medium text-chocolate">{site.stats.rating} stars</span>
              <span>·</span>
              <span>{site.stats.reviews} reviews</span>
              <span>·</span>
              <span>{site.stats.sales}+ sold</span>
            </div>
          </div>
          <Image
            src="/images/products/mm-set.jpg"
            alt="Jumbo M&M cookie wall art set - oversized faux food sculpture"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Why choose handmade"
              title="Lightweight Faux Cookie Sculptures"
              copy="Each piece is built as a lightweight sculpture with a built-in hanger. The craggy dough, glossy chips, and candy pieces are hand-finished so the texture reads from across the room."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Realistic Sculptural Texture",
                  copy: "Thick, bakery-case surfaces — bubbles, crags, and that just-baked edge. Looks real enough to make guests do a double-take.",
                },
                {
                  title: "Ready to Hang Instantly",
                  copy: "Built-in wall hangers. No contractor needed. Ships from Florida with free U.S. shipping.",
                },
                {
                  title: "Made for Your Space",
                  copy: "Perfect for kitschy kitchens, playrooms, dessert bars, home offices, and content studios.",
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
            eyebrow="The collection" 
            title="Every Cookie on the Wall"
            copy="From classic chocolate chip to candy-studded M&Ms to statement ice cream sandwiches — find your perfect piece of giant cookie wall art."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Handmade in Orlando"
              title="Artist-Made, Not Factory Produced"
              copy="Each faux cookie sculpture is individually crafted by Erynn in Orlando, Florida. No two pieces are identical — that's what makes them art."
            />
            <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6 text-chocolate-mid">
                <p>
                  Unlike mass-produced commercial food props that cost $350+ and weigh 10+ pounds, 
                  these <strong>handmade cookie sculptures</strong> are lightweight (2-4 lbs), affordable ($90-$225), 
                  and made with artist attention to detail.
                </p>
                <p>
                  The process takes days, not hours: sculpting the spray foam texture, building up paint layers, 
                  positioning individual chips, and finishing with protective sealant. The result is 
                  <strong>faux food wall art</strong> that looks — and feels — like real baked goods.
                </p>
                <p>
                  Whether you're looking for a statement piece for your 
                  <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="text-pink hover:underline"> dopamine decor kitchen</Link>, 
                  or a <Link href="/blog/foodie-gift-guide-jumbo-cookie-sculptures/" className="text-pink hover:underline">unique foodie gift</Link>, 
                  these sculptures deliver.
                </p>
                <Link
                  href="/about/"
                  className="mt-4 inline-flex text-pink hover:underline"
                >
                  Meet the artist →
                </Link>
              </div>
              <Image
                src="/images/brand/about-1.jpg"
                alt="Erynn, artist behind JOIRUSH handmade cookie wall art"
                width={600}
                height={800}
                className="rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Custom options"
            title="Can't Find Your Perfect Cookie?"
            copy="Commission a custom piece in your ideal colors, size, or flavor. Perfect for matching your kitchen aesthetic or creating something uniquely yours."
          />
          <div className="mt-10 rounded-[2rem] bg-pink/10 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-3xl text-chocolate">Custom Cookie Wall Art</h3>
                <ul className="mt-6 space-y-3 text-chocolate-mid">
                  <li>· Specific color palettes to match your space or brand</li>
                  <li>· Custom sizes for particular wall dimensions</li>
                  <li>· Unique flavor designs and candy combinations</li>
                  <li>· Multi-piece commissions for gallery walls</li>
                </ul>
                <Link
                  href="/custom/"
                  className="mt-8 inline-flex rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
                >
                  Start a Custom Request
                </Link>
              </div>
              <Image
                src="/images/products/hot-pink-mm.jpg"
                alt="Custom hot pink M&M cookie wall art"
                width={500}
                height={667}
                className="rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
