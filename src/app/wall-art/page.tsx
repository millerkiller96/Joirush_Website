import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giant Cookie Wall Art | Cookie Wall Decor & Faux Cookies for Display — JOIRUSH",
  description:
    "Shop giant cookie wall art — handmade sugar cookie wall sculptures and faux cookies for display by cookie artist Erynn. Not cheap plastic fake cookie decor: real handmade giant cookie wall decor in chocolate chip, M&M, and custom designs. $90-$225, free U.S. shipping.",
  keywords: [
    "giant cookie wall art",
    "giant cookie wall decor",
    "faux cookies for display",
    "fake cookie decor",
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "faux food wall art",
    "handmade cookie wall art",
    "chocolate chip cookie wall art",
  ],
  openGraph: {
    title: "Giant Cookie Wall Art | Cookie Wall Decor & Faux Cookies for Display",
    description:
      "Handmade giant cookie wall art by cookie artist Erynn. Not cheap plastic fake cookie decor — real handmade giant cookie wall decor and faux cookies for display, from $90-$225.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/mm-set.jpg"),
        width: 1200,
        height: 630,
        alt: "Giant cookie wall art collection — handmade sugar cookie wall sculptures and faux cookies for display by JOIRUSH",
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
    name: "Giant Cookie Wall Art - Cookie Wall Decor & Faux Cookies for Display",
    description:
      "Handmade giant cookie wall art and giant cookie wall decor by cookie artist Erynn. Faux cookies for display — not cheap plastic fake cookie decor. Real art cookies and faux food wall art for kitchens, homes, and content studios.",
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
              Giant Cookie Wall Art by Cookie Artist Erynn
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Giant Cookie Wall Art That Makes People Hungry
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Thick, craggy dough. Glossy chocolate chips catching the light. That golden-brown edge 
              begging for a bite. These <strong>giant cookie wall decor</strong> pieces look so real, 
              guests reach out before their brain catches up. Each is <strong>faux cookies for display</strong> — not edible, but forever satisfying.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Not cheap plastic <strong>fake cookie decor</strong> — these are handmade by a real artist. 
              Classic chocolate chip. Candyland M&Ms. Peanut butter comfort. Ice cream sandwiches. 
              Each <strong>giant cookie wall art</strong> piece is hand-sculpted in Orlando using spray foam and acrylic — 
              lightweight cookie sculptures that hang easily and last forever.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
              <li>✓ Ships in {site.shippingTime}</li>
              <li>✓ Free U.S. shipping</li>
              <li>✓ Lightweight — most pieces hang on a nail</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue/"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Shop All Cookie Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Commission Custom Cookie Art
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
            alt="Giant cookie wall art collection — handmade faux cookies for display featuring M&M candy cookie design by cookie artist Erynn"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <StudioVideoCarousel />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Why collectors choose real giant cookie wall art"
              title="Not Cheap Plastic Fake Cookie Decor"
              copy="These aren't mass-produced props. Thick, craggy texture that reads from across the room. Glossy chips. Built-in hangers. Handmade giant cookie wall decor that starts conversations."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Realistic Giant Cookie Wall Decor",
                  copy: "Bubbles. Crags. Golden edges. The sculptural details of giant cookie wall art that make people do a double-take — then reach out to touch it.",
                },
                {
                  title: "Handmade by Cookie Artist Erynn",
                  copy: "Each piece is sculpted by hand — real artistry, not factory plastic. 14 days from order to your wall.",
                },
                {
                  title: "Lightweight Faux Cookies for Display",
                  copy: "Built-in wall hanger. Lightweight, and most pieces hang on a single nail. Free U.S. shipping.",
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
            eyebrow="The full giant cookie wall art collection" 
            title="Find Your Flavor"
            copy="Golden classic giant cookie wall decor. Candy-studded rainbow. Peanut butter comfort. The ice cream sandwich that stops the room. Which faux cookie for display is calling your name?"
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
              eyebrow="Handmade giant cookie wall art in 14 days"
              title="Why This Giant Cookie Wall Decor Hits Different"
              copy="No factory. No cheap plastic fake cookie decor. Each piece is hand-sculpted by cookie artist Erynn in Orlando — real faux cookies for display, one at a time, made for your wall."
            />
            <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-6 text-chocolate-mid">
                <p>
                  Factory <strong>fake cookie decor</strong> costs $350+. This <strong>giant cookie wall art</strong>? <strong>$90-$225</strong>, lightweight, 
                  and most pieces hang on a single nail. Plus it looks better because 
                  a real cookie artist made it.
                </p>
                <p>
                  The process takes days: sculpting spray foam texture layer by layer, building up 
                  acrylic paint, positioning each chip by hand, sealing for durability. The result is 
                  <strong> giant cookie wall decor</strong> that makes people <strong>reach out to touch it</strong>.
                </p>
                <p>
                  Wondering whether to DIY or buy ready-made? Read our{" "}
                  <Link href="/blog/faux-cookie-wall-decor-ready-made-vs-diy/" className="text-pink hover:underline">faux cookie wall decor guide</Link>.{" "}
                  Perfect for a{" "}
                  <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="text-pink hover:underline">dopamine decor kitchen</Link>,{" "}
                  a <Link href="/blog/foodie-gift-guide-jumbo-cookie-sculptures/" className="text-pink hover:underline">foodie gift</Link>{" "}
                  they'll never forget, or that blank wall that needs something joyful. Also check out our{" "}
                  <Link href="/oversized-food-wall-art/" className="text-pink hover:underline">oversized food wall art</Link> collection.
                </p>
                <Link
                  href="/about/"
                  className="mt-4 inline-flex text-pink hover:underline"
                >
                  Meet the Cookie Artist →
                </Link>
              </div>
              <Image
                src="/images/brand/about-1.jpg"
                alt="Cookie artist Erynn — creator of handmade giant cookie wall art, faux cookies for display, and giant cookie wall decor at JOIRUSH"
                width={600}
                height={800}
                className="rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Custom giant cookie wall art commissions"
            title="Want Giant Cookie Wall Decor No One Else Has?"
            copy="Hot pink. Your kitchen's exact teal. Rainbow sprinkles on peanut butter. Tell the cookie artist your flavor fantasy — she'll make your custom faux cookie for display."
          />
          <div className="mt-10 rounded-[2rem] bg-pink/10 p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-3xl text-chocolate">Your Cookie Canvas, Your Rules</h3>
                <ul className="mt-6 space-y-3 text-chocolate-mid">
                  <li>✓ Match your exact kitchen palette</li>
                  <li>✓ Custom sizes for specific walls</li>
                  <li>✓ Wild flavor combos nobody's seen</li>
                  <li>✓ Multi-piece sugar cookie art gallery walls</li>
                </ul>
                <Link
                  href="/custom/"
                  className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Commission Custom Cookie Art
                </Link>
              </div>
              <Image
                src="/images/products/hot-pink-mm.jpg"
                alt="Custom giant cookie wall art — hot pink M&M faux cookie for display by cookie artist Erynn"
                width={500}
                height={667}
                className="rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </section>

        <EtsyReviewsHub />
      </div>
    </>
  );
}
