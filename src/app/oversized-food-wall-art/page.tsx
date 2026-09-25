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
  title: "Oversized Food Wall Art | 3D Food Wall Art for Kitchens & Dining Rooms — JOIRUSH",
  description:
    "Shop oversized food wall art — handmade 3D food wall art for kitchens, dining rooms, and playrooms. Large food wall art for kitchen spaces that looks real but lasts forever. Cookie sculptures from $90, free U.S. shipping from Daytona Beach, FL.",
  keywords: [
    "oversized food wall art",
    "3d food wall art",
    "large food wall art for kitchen",
    "food wall art",
    "kitchen wall art",
    "3d wall art",
    "faux food wall art",
    "cookie wall art",
    "dining room wall art",
  ],
  openGraph: {
    title: "Oversized Food Wall Art | 3D Food Wall Art for Kitchens — JOIRUSH",
    description:
      "Handmade oversized food wall art and 3D food wall art for kitchens by cookie artist Erynn. Large food wall art for kitchen spaces that looks real but lasts forever.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/ice-cream.jpg"),
        width: 1200,
        height: 630,
        alt: "Oversized food wall art — 3D cookie ice cream sandwich sculpture for kitchens by JOIRUSH",
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl("/oversized-food-wall-art/"),
  },
};

const foodWallArtFaqs = [
  {
    question: "What is oversized food wall art?",
    answer:
      "Oversized food wall art refers to large-scale 3D sculptures that look like food but are designed as permanent wall decor. Unlike prints or canvas art, these are dimensional pieces that create visual impact and spark conversations in kitchens, dining rooms, and playrooms.",
  },
  {
    question: "What makes 3D food wall art different from food prints?",
    answer:
      "3D food wall art has actual depth and texture — you can see it from the side, and guests will want to touch it. Flat food prints or canvas art sit flush against the wall. These handmade sculptures have real dimensionality with realistic details like craggy cookie edges and glossy chocolate chips.",
  },
  {
    question: "Is oversized food wall art heavy to hang?",
    answer:
      "No. Despite their size, JOIRUSH food wall art pieces are lightweight because they're made from spray foam — most pieces are under 3 lbs. They hang easily on a single nail or picture hook.",
  },
  {
    question: "Where should I hang large food wall art for kitchen spaces?",
    answer:
      "Popular spots include above the dining table, on the kitchen accent wall, in a breakfast nook, or as part of a gallery wall. These pieces also work great in playrooms. Avoid direct sunlight to preserve the acrylic finish.",
  },
  {
    question: "Are these food sculptures edible?",
    answer:
      "No. JOIRUSH oversized food wall art is made from spray foam and acrylic paint — it's purely decorative. The pieces are designed to look real but are crafted for permanent display, not eating.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Every oversized food wall art piece is handmade to order and ships within 14 days from Daytona Beach, FL. U.S. shipping is always free.",
  },
];

function FoodWallArtJsonLd() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Oversized Food Wall Art — 3D Food Wall Art for Kitchens",
    description:
      "Handmade oversized food wall art and 3D food wall art for kitchens, dining rooms, and playrooms by cookie artist Erynn. Large food wall art that looks real but lasts forever.",
    url: getAbsoluteUrl("/oversized-food-wall-art/"),
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
          name: "Oversized Food Wall Art",
          item: getAbsoluteUrl("/oversized-food-wall-art/"),
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: foodWallArtFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function OversizedFoodWallArtPage() {
  const featuredForKitchens = products.filter(
    (p) => p.featured || p.category === "statement" || p.category === "classic"
  );

  return (
    <>
      <FoodWallArtJsonLd />
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
              3D Food Wall Art by Cookie Artist Erynn
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Oversized Food Wall Art for Kitchens & Dining Rooms
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Looking for <strong>large food wall art for kitchen</strong> spaces that actually makes an impact? 
              Forget flat prints — this is <strong>3D food wall art</strong> that guests will want to touch. 
              Handmade cookie sculptures with realistic depth, texture, and that just-baked look.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Each piece of <strong>oversized food wall art</strong> is hand-sculpted from spray foam and 
              acrylic paint by cookie artist Erynn in Daytona Beach. Lightweight, ready to hang, 
              and designed to spark conversations — whether it's above your dining table, in the breakfast nook, 
              or anchoring a playroom gallery wall.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
              <li>✓ Ships in {site.shippingTime}</li>
              <li>✓ Free U.S. shipping</li>
              <li>✓ Lightweight — most pieces hang on a nail</li>
              <li>✓ Handmade in Daytona Beach, FL</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue/"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Shop All Food Wall Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Commission Custom Piece
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
            src="/images/products/ice-cream.jpg"
            alt="Oversized food wall art — 3D cookie ice cream sandwich sculpture for kitchens and dining rooms by JOIRUSH"
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
              eyebrow="Why 3D food wall art hits different"
              title="Not a Print. Real Sculptural Art."
              copy="Flat canvas food prints are everywhere. This is 3D food wall art — dimensional, textured, and detailed enough to fool your guests. Large food wall art for kitchen spaces that actually makes a statement."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Real 3D Depth & Texture",
                  copy: "Thick, sculptural depth with craggy edges, glossy chips, and that golden-brown finish. Oversized food wall art you can see from every angle.",
                },
                {
                  title: "Handmade by an Artist",
                  copy: "Each 3D food sculpture is hand-sculpted by cookie artist Erynn — not mass-produced. Real artistry, 14 days from order to your wall.",
                },
                {
                  title: "Lightweight & Easy to Hang",
                  copy: "Despite the large size, these pieces are lightweight. Built-in hanger — most pieces hang on a single nail.",
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
            eyebrow="Large food wall art for kitchen & dining"
            title="3D Food Wall Art Collection"
            copy="Cookie sculptures that work as oversized food wall art — perfect for kitchens, dining rooms, breakfast nooks, and playrooms. Pick your flavor."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredForKitchens.slice(0, 6).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/catalogue/"
              className="inline-flex rounded-full bg-chocolate px-8 py-4 text-sm font-medium text-cream hover:bg-pink"
            >
              See All Oversized Food Wall Art →
            </Link>
          </div>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Where to hang 3D food wall art"
              title="Large Food Wall Art for Every Space"
              copy="Oversized food wall art isn't just for kitchens. Here's where collectors hang their favorite pieces."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Kitchen Accent Wall",
                  copy: "The classic spot for large food wall art for kitchen spaces. Above the coffee bar, next to the fridge, or flanking open shelving.",
                },
                {
                  title: "Dining Room Statement",
                  copy: "Oversized food wall art above the dining table creates instant conversation. Go bold with an ice cream sandwich or pair multiple pieces.",
                },
                {
                  title: "Breakfast Nook",
                  copy: "Cozy nooks deserve 3D food wall art that sparks joy. A single cookie sculpture is the perfect scale.",
                },
                {
                  title: "Playroom Gallery",
                  copy: "Kids love food art. Create a whimsical gallery wall with candy-colored cookie sculptures — dopamine decor they'll never outgrow.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] bg-white p-5">
                  <h3 className="font-display text-xl text-chocolate">{item.title}</h3>
                  <p className="mt-2 text-sm text-chocolate-mid">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src="/images/brand/about-1.jpg"
              alt="Cookie artist Erynn creating handmade 3D food wall art and oversized food sculptures for kitchens at JOIRUSH"
              width={600}
              height={800}
              className="rounded-[2rem] object-cover"
            />
            <div>
              <SectionHeading
                eyebrow="Handmade oversized food wall art"
                title="Why Not Just Buy a Food Print?"
                copy="You could hang a $40 canvas print of a cookie. Or you could hang 3D food wall art that makes people do a double-take — then reach out to touch it."
              />
              <div className="mt-6 space-y-4 text-chocolate-mid">
                <p>
                  Flat prints are forgettable. <strong>Oversized food wall art</strong> with real texture, 
                  dimension, and that "is that real?" effect? That's the conversation starter your kitchen deserves.
                </p>
                <p>
                  Each piece is hand-sculpted from spray foam, then painted with layers of acrylic to capture 
                  realistic golden-brown tones, glossy chips, and those craggy cookie edges. The result is{" "}
                  <strong>large food wall art for kitchen</strong> spaces that looks good enough to eat — forever.
                </p>
                <p>
                  Explore the full collection:{" "}
                  <Link href="/wall-art/" className="text-pink hover:underline">
                    giant cookie wall art
                  </Link>
                  ,{" "}
                  <Link href="/catalogue/" className="text-pink hover:underline">
                    oversized cookie wall decor
                  </Link>
                  , and{" "}
                  <Link href="/blog/faux-cookie-wall-decor-ready-made-vs-diy/" className="text-pink hover:underline">
                    faux cookie wall decor
                  </Link>
                  . Or jump straight to browsing{" "}
                  <Link href="/" className="text-pink hover:underline">
                    jumbo cookie wall art
                  </Link>
                  .
                </p>
              </div>
              <Link
                href="/about/"
                className="mt-6 inline-flex text-pink hover:underline"
              >
                Meet Cookie Artist Erynn →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Common questions"
              title="Oversized Food Wall Art FAQ"
              copy="Everything you need to know about 3D food wall art for kitchens, dining rooms, and beyond."
            />
            <dl className="mt-10 grid gap-4 md:grid-cols-2">
              {foodWallArtFaqs.map((faq) => (
                <div key={faq.question} className="rounded-[1.5rem] bg-cream p-5">
                  <dt className="font-display text-lg text-chocolate">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-chocolate-mid">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <EtsyReviewsHub />

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="overflow-hidden rounded-[2.4rem] bg-emerald-600 px-8 py-14 text-white md:px-14">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Custom 3D food wall art</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              Want oversized food wall art that's uniquely yours?
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Custom colors. Custom sizes. Cookie flavors no one else has. Tell cookie artist Erynn your vision,
              and she'll sculpt 3D food wall art made just for your kitchen, dining room, or playroom. 
              Handmade in Daytona Beach, ships in 14 days, free U.S. shipping.
            </p>
            <Link
              href="/custom/"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Start Your Custom Food Wall Art
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
