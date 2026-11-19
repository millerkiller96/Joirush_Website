import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import Buy4Banner from "@/components/Buy4Banner";

export const metadata: Metadata = {
  title: {
    absolute: "Dessert Wall Art | Candy Wall Decor Sculptures | JOIRUSH",
  },
  description:
    "Handmade dessert wall art and candy wall decor: a 20 by 20 inch ice cream sandwich and jumbo candy cookies from $70. Free U.S. shipping.",
  keywords: [
    "dessert wall art",
    "dessert wall decor",
    "candy wall art",
    "candy wall decor",
    "donut wall art",
    "fake desserts for display",
    "fake desserts for decoration",
    "ice cream wall art",
    "sweet treat wall decor",
  ],
  alternates: {
    canonical: "/dessert-wall-art/",
  },
  openGraph: {
    title: "Dessert Wall Art | Candy Wall Decor & Fake Desserts for Display | JOIRUSH",
    description:
      "Handmade dessert wall decor: a 3D ice cream sandwich and bright candy cookies sculpted in Daytona Beach, FL. Free U.S. shipping.",
    url: "https://joirush.com/dessert-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/ice-cream.jpg",
        width: 1200,
        height: 900,
        alt: "Cookie ice cream sandwich dessert wall art sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dessert Wall Art | Candy Wall Decor Sculptures | JOIRUSH",
    description:
      "Handmade dessert wall art: a 3D ice cream sandwich and bright candy cookies. Ready to hang, free U.S. shipping.",
    images: ["/images/products/ice-cream.jpg"],
  },
};

const dessertOrderSlugs = [
  "cookie-ice-cream-sandwich",
  "rainbow-candy-cookie",
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "jumbo-christmas-cookie",
  "jumbo-mm-cookie",
  "jumbo-chocolate-chip-cookie",
  "jumbo-white-chocolate-chip-cookie",
];

const faqs = [
  {
    question: "What is dessert wall art?",
    answer:
      "Dessert wall art is art shaped like sweet treats. Our pieces are 3D, so they pop off the wall. Each one is hand sculpted from spray foam on a wood base and painted with acrylic by artist Erynn in Daytona Beach, FL.",
  },
  {
    question: "Are these fake desserts edible?",
    answer:
      "No. These are fake desserts for display and decoration only. They are foam, wood, and paint, so they never melt, spoil, or attract bugs. Please do not eat them.",
  },
  {
    question: "How big is each piece of dessert wall decor?",
    answer:
      "Most cookies are 16 inches. The Rainbow Candy Cookie is 14 inches. The Cookie Ice Cream Sandwich is our biggest piece at about 20 by 20 inches.",
  },
  {
    question: "Do you make donut wall art?",
    answer:
      "Not as a shop item right now. If you want a donut or another sweet treat, ask about a custom piece. Erynn can dream up a one of a kind dessert sculpture for your wall.",
  },
  {
    question: "How much does candy wall art cost?",
    answer:
      "14 inch cookies are $70, 16 inch cookies are $80, and the ice cream sandwich is $175. Buy 4 or more cookies and get 10% off each cookie. Shipping is free in the U.S., and pieces ship within 14 days.",
  },
];

export default function DessertWallArtPage() {
  const orderedProducts = dessertOrderSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/dessert-wall-art/",
        name: "Dessert Wall Art and Candy Wall Decor by JOIRUSH",
        description:
          "Handmade dessert wall art, candy wall decor, and fake desserts for display: a 3D cookie ice cream sandwich and bright candy cookie sculptures crafted in Daytona Beach, FL by JOIRUSH.",
        url: "https://joirush.com/dessert-wall-art/",
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
            name: "Dessert Wall Art",
            item: "https://joirush.com/dessert-wall-art/",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Dessert and Candy Wall Art",
        numberOfItems: orderedProducts.length,
        itemListElement: orderedProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.shortName,
          url: `https://joirush.com/product/${product.slug}/`,
        })),
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
            <li className="font-semibold text-espresso">Dessert Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Dessert Wall Decor • Candy Wall Art • Handmade in Daytona Beach, FL
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Dessert Wall Art &amp; Candy Wall Decor
              </h1>
              <Buy4Banner className="mt-5" />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Sweet treats make people smile. Our <strong>dessert wall art</strong> puts that smile on your wall. Artist Erynn hand sculpts each piece from spray foam on a wood base, then paints it with acrylic so it looks fresh and tasty.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Pick a 20 by 20 inch ice cream sandwich or a jumbo cookie packed with bright candy. This <strong>dessert wall decor</strong> is light, hangs on one hook, and ships free in the U.S. It is art, not food, so it never melts or goes stale.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#dessert-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Dessert Wall Art
                </a>
                <Link
                  href="/blog/ice-cream-and-candy-wall-art-decor-ideas/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Read Candy Wall Art Ideas
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/ice-cream.jpg"
                  alt="Cookie ice cream sandwich dessert wall art by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="dessert-collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="Sweet Treats for Your Wall"
            title="Shop Dessert Wall Decor & Candy Wall Art"
            copy="Every piece is sculpted and painted by hand in Daytona Beach, FL. Free shipping on all U.S. orders."
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
              1. Ice Cream Dessert Wall Art
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Our <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> is the star of any sweet wall. Two chocolate chip cookies hug a thick swirl of faux vanilla. It is about 20 by 20 inches and $175.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              2. Bright Candy Wall Art
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Love <strong>candy wall art</strong>? Try the 14 inch <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link>, the <Link href="/product/hot-pink-mm-cookie/" className="font-medium text-caramel underline">Hot Pink M&amp;M Cookie</Link>, or the soft <Link href="/product/jumbo-pastel-mm-cookie/" className="font-medium text-caramel underline">Pastel M&amp;M Cookie</Link>. For the holidays, the <Link href="/product/jumbo-christmas-cookie/" className="font-medium text-caramel underline">Jumbo Christmas Cookie</Link> is fun <strong>candy wall decor</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              3. Fake Desserts for Display
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Want <strong>fake desserts for display</strong> on a shelf or bar cart? Each piece is sturdy foam on a wood base, so it looks great for years. Buy 4 or more cookies and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-caramel/20 bg-sand/50 p-8 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Looking for Donut Wall Art?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/85">
            We love <strong>donut wall art</strong> too. A donut is not in the shop yet, but Erynn makes one of a kind pieces. <Link href="/custom/" className="font-medium text-caramel underline">Dream up a custom version</Link> in your favorite flavor and colors.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Dessert &amp; Candy Wall Art FAQs
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
            More Sweet Wall Art Collections &amp; Guides
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/faux-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Fake Food Decor
            </Link>
            <Link href="/oversized-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Food Sculpture Wall Art
            </Link>
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Wall Art
            </Link>
            <Link href="/kitchen-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen Wall Art
            </Link>
            <Link href="/blog/ice-cream-and-candy-wall-art-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Ice Cream &amp; Candy Wall Art Ideas
            </Link>
            <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dessert Gallery Wall Ideas
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
