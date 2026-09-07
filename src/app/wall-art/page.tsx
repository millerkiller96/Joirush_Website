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
              All the craving. Zero calories.
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Wall Art That Makes People Hungry
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Thick, craggy dough. Glossy chocolate chips catching the light. That golden-brown edge 
              begging for a bite. These <strong>oversized cookie sculptures</strong> look so real, 
              guests reach out before their brain catches up.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Classic chocolate chip. Candyland M&Ms. Peanut butter comfort. Ice cream sandwiches. 
              Each piece hand-sculpted in Orlando using spray foam and acrylic — <strong>lightweight, 
              hangable, and permanently satisfying</strong>.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
              <li>✓ Ships in {site.shippingTime}</li>
              <li>✓ Free U.S. shipping</li>
              <li>✓ 2-4 lbs — hangs on a nail</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue/"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Shop All Cookies
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Dream Up a Custom Flavor
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-chocolate-soft">
              <span className="font-medium text-chocolate">{site.stats.rating} stars</span>
              <span>·</span>
              <span>{site.stats.reviews} happy collectors</span>
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
              eyebrow="Why collectors obsess"
              title="Not a Prop. A Piece of Art."
              copy="Thick, craggy texture that reads from across the room. Glossy chips. Built-in hangers. The kind of wall art that starts conversations and ends up on Instagram."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "That Just-Baked Look",
                  copy: "Bubbles. Crags. Golden edges. The sculptural details that make people do a double-take — then reach out to touch it.",
                },
                {
                  title: "Made For You in 14 Days",
                  copy: "Each cookie is sculpted by hand for your order. Real artistry takes time. The anticipation is part of the fun.",
                },
                {
                  title: "Hang It Tonight",
                  copy: "Built-in wall hanger. 2-4 lbs. No handyman, no hassle. Ships free in the U.S.",
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
            eyebrow="The full collection" 
            title="Find Your Flavor"
            copy="Golden classic. Candy-studded rainbow. Peanut butter comfort. The ice cream sandwich that stops the room. Which one's calling your name?"
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
              eyebrow="Handmade in 14 days"
              title="Why These Hit Different"
              copy="No factory. No fiberglass blob. Each cookie is hand-sculpted by Erynn in Orlando — one at a time, made for your wall."
            />
            <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6 text-chocolate-mid">
                <p>
                  Factory props cost $350+ and weigh 10+ pounds. These? <strong>$90-$225, 2-4 lbs</strong>, 
                  and you can actually hang them on a single nail. Plus they look better because 
                  an actual artist made them.
                </p>
                <p>
                  The process takes days: sculpting spray foam texture layer by layer, building up 
                  acrylic paint, positioning each chip by hand, sealing for durability. The result is 
                  cookie wall art that makes people <strong>reach out to touch it</strong>.
                </p>
                <p>
                  Perfect for a{" "}
                  <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="text-pink hover:underline">dopamine decor kitchen</Link>,{" "}
                  a <Link href="/blog/foodie-gift-guide-jumbo-cookie-sculptures/" className="text-pink hover:underline">foodie gift</Link>{" "}
                  they'll never forget, or that blank wall that needs something joyful.
                </p>
                <Link
                  href="/about/"
                  className="mt-4 inline-flex text-pink hover:underline"
                >
                  Meet Erynn →
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
            eyebrow="Dream it up"
            title="Want Something No One Else Has?"
            copy="Hot pink. Your kitchen's exact teal. Rainbow sprinkles on peanut butter. Tell me your flavor fantasy — I'll make it real."
          />
          <div className="mt-10 rounded-[2rem] bg-pink/10 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-3xl text-chocolate">Your Cookie, Your Rules</h3>
                <ul className="mt-6 space-y-3 text-chocolate-mid">
                  <li>✓ Match your exact kitchen palette</li>
                  <li>✓ Custom sizes for specific walls</li>
                  <li>✓ Wild flavor combos nobody's seen</li>
                  <li>✓ Multi-piece gallery walls that tell a story</li>
                </ul>
                <Link
                  href="/custom/"
                  className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Start Your Custom Cookie
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
