import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";

export const metadata: Metadata = {
  title: {
    absolute: "Kitchen Wall Art | Cookie Decor, Kitschy Kitchen & Baking Decor | JOIRUSH",
  },
  description:
    "Brighten your kitchen, coffee bar, or breakfast nook with handmade 3D cookie decor and kitchen art by JOIRUSH. Giant 14 to 16 inch cookie wall sculptures for kitschy kitchen, maximalist kitchen, and baking decor. Free U.S. shipping.",
  keywords: [
    "kitchen wall art",
    "cookie decor",
    "kitchen art",
    "kitschy kitchen",
    "maximalist kitchen",
    "baking decor",
    "fun kitchen wall decor",
    "coffee bar wall art",
    "cookie kitchen decor",
    "bakery wall art",
    "kitschy kitchen decor",
    "dessert wall art for kitchen",
    "breakfast nook wall art",
    "3d kitchen wall art",
    "unique kitchen wall decor",
  ],
  alternates: {
    canonical: "/kitchen-wall-art/",
  },
  openGraph: {
    title: "Kitchen Wall Art | 3D Cookie Decor & Kitschy Kitchen Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D cookie wall sculptures for kitchens, coffee bars, baking decor, and breakfast nooks. Lightweight, ready to hang, free U.S. shipping.",
    url: "https://joirush.com/kitchen-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/peanut-butter.jpg",
        width: 1200,
        height: 900,
        alt: "Giant peanut butter cookie 3D kitchen wall art and cookie decor by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Wall Art | 3D Cookie Decor & Baking Decor | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D cookie wall sculptures for kitchens, coffee bars, and dining nooks. Free U.S. shipping.",
    images: ["/images/products/peanut-butter.jpg"],
  },
};

const kitchenFavoritesSlugs = [
  "jumbo-chocolate-chip-cookie",
  "giant-peanut-butter-cookie",
  "giant-double-chocolate-cookie",
  "jumbo-white-chocolate-chip-cookie",
  "mini-jumbo-chocolate-chip-cookie",
  "cookie-ice-cream-sandwich",
  "jumbo-mm-cookie",
  "rainbow-candy-cookie",
  "jumbo-pastel-mm-cookie",
  "hot-pink-mm-cookie",
  "jumbo-christmas-cookie",
];

const faqs = [
  {
    question: "Is JOIRUSH cookie decor safe to hang in a kitchen or above a coffee bar?",
    answer:
      "Yes. Every JOIRUSH sculpture is sealed with durable artist grade acrylic paint on a solid wood backing. Hang your kitchen art on any standard wall away from direct open stove flames or heavy steam, just like any framed artwork, and dust lightly with a dry microfiber cloth.",
  },
  {
    question: "What size cookie wall art works best for small kitchens or coffee bars?",
    answer:
      "For compact wall spaces, narrow pillars, or cozy espresso corners, our Mini Jumbo Chocolate Chip Cookie or 14 inch Rainbow Candy Cookie fits effortlessly. For wider walls above dining tables or maximalist kitchen layouts, a single 16 inch cookie or a pair of 2 to 3 sculptures creates an instant focal point.",
  },
  {
    question: "How do I hang 3D kitchen art in a rental apartment?",
    answer:
      "Each sculpture weighs only 2 to 4 lbs and comes with built in hanging hardware on the back, so a single standard picture hook or nail holds it securely without heavy wall anchors.",
  },
  {
    question: "Does cookie wall art make a good baking decor gift?",
    answer:
      "Yes. Home bakers who already own every mixer, pan, and apron love receiving handmade cookie decor and baking decor for their kitchen walls. Every piece ships free in the U.S.",
  },
];

export default function KitchenWallArtPage() {
  const orderedProducts = kitchenFavoritesSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/kitchen-wall-art/",
        name: "Kitchen Wall Art | 3D Cookie Decor, Kitschy Kitchen & Baking Decor",
        description:
          "Handmade 3D cookie wall art, cookie decor, and baking decor for kitchens, coffee bars, and dining nooks, crafted in Queens, NY by JOIRUSH.",
        url: "https://joirush.com/kitchen-wall-art/",
        isPartOf: {
          "@type": "WebSite",
          name: "JOIRUSH",
          url: "https://joirush.com",
        },
        publisher: {
          "@type": "Organization",
          name: "JOIRUSH",
          url: "https://joirush.com",
          logo: {
            "@type": "ImageObject",
            url: "https://joirush.com/images/brand/logo.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://joirush.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kitchen Wall Art",
            item: "https://joirush.com/kitchen-wall-art/",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-cream py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-cocoa/60">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-caramel transition">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-espresso">Kitchen Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Kitchen Art • Cookie Decor • Baking Decor
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Fun Kitchen Wall Art &amp; 3D Cookie Decor
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Your kitchen is where everyone gathers, so its walls deserve more than generic grocery store signs. JOIRUSH <strong>kitchen wall art</strong> brings the warmth of fresh baked cookies straight to your wall with handmade 14 to 16 inch 3D <strong>cookie decor</strong> sculpted and painted by hand in Queens, NY.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                From warm golden brown chocolate chip and crosshatch peanut butter to bright candy coated statement pieces, our lightweight <strong>kitchen art</strong> brings joyful personality to coffee bars, breakfast nooks, cozy <strong>baking decor</strong> corners, retro <strong>kitschy kitchen</strong> walls, and bold <strong>maximalist kitchen</strong> spaces.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#kitchen-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Kitchen Wall Art
                </a>
                <Link
                  href="/blog/kitchen-wall-decor-ideas-coffee-bar-small-kitchens/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Read Kitchen Styling Guide
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/peanut-butter.jpg"
                  alt="Giant peanut butter cookie 3D kitchen wall art and cookie decor by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="kitchen-collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="Kitchen Favorites"
            title="Shop 3D Cookie Decor for Kitchens & Coffee Bars"
            copy="Hand sculpted in Queens, NY. Lightweight (2 to 4 lbs), ready to hang on a single hook, with free U.S. shipping."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orderedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-10 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              1. Above the Coffee Bar &amp; Baking Decor Station
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Pair your espresso machine, stand mixer, and mug rack with warm, bakery inspired <strong>baking decor</strong>. The <Link href="/product/jumbo-chocolate-chip-cookie/" className="font-medium text-caramel underline">Jumbo Chocolate Chip Cookie</Link>, <Link href="/product/giant-double-chocolate-cookie/" className="font-medium text-caramel underline">Giant Double Chocolate Cookie</Link>, and <Link href="/product/giant-peanut-butter-cookie/" className="font-medium text-caramel underline">Giant Peanut Butter Cookie</Link> echo rich roast and cocoa tones.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              2. Kitschy Kitchen &amp; Retro Dinette Nooks
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Love vintage diner charm or a playful <strong>kitschy kitchen</strong>? Hang the <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> or <Link href="/product/jumbo-mm-cookie/" className="font-medium text-caramel underline">Jumbo M&amp;M Cookie</Link> above your breakfast table or bar cart for instant nostalgia.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              3. Maximalist Kitchen Dessert Gallery Walls
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Building a bold <strong>maximalist kitchen</strong> wall? Combine 2 or 3 <strong>cookie decor</strong> sculptures in a vertical stack or triangle arrangement. Buy 4 or more cookies and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Kitchen Wall Art &amp; Cookie Decor FAQs
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-caramel/15 bg-warm-white p-6 shadow-soft"
              >
                <h3 className="font-display text-lg font-semibold text-espresso">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-caramel/15 bg-warm-white p-6">
          <h2 className="font-display text-lg font-semibold text-espresso">
            More Kitchen Decor Inspiration &amp; Collections
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/oversized-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Oversized Food Wall Art
            </Link>
            <Link href="/faux-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Faux Food &amp; Fake Cookie Art
            </Link>
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Kitchen &amp; Room Wall Art
            </Link>
            <Link href="/colorful-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Colorful 3D Wall Art
            </Link>
            <Link href="/blog/maximalist-kitchen-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Maximalist Kitchen Ideas
            </Link>
            <Link href="/blog/gifts-for-bakers-who-have-everything-cookie-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Gifts for Bakers Guide
            </Link>
            <Link href="/blog/kitchen-wall-decor-ideas-coffee-bar-small-kitchens/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Coffee Bar &amp; Small Kitchen Ideas
            </Link>
            <Link href="/blog/retro-kitschy-kitchen-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Retro Kitschy Kitchen Decor
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <EtsyReviewsHub />
      </div>
    </div>
  );
}
