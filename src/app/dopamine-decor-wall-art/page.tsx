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
    absolute: "Dopamine Decor Wall Art | Happy 3D Cookie Decor & Dopamine Art | JOIRUSH",
  },
  description:
    "Shop handmade dopamine decor wall art and happy 3D cookie decor by JOIRUSH. Bright 14 to 16 inch colorful 3D wall art sculptures crafted in Queens, NY for joyful bedrooms, kitchens, apartments, and studios. Free U.S. shipping.",
  keywords: [
    "dopamine decor",
    "dopamine wall art",
    "dopamine art",
    "dopamine home decor",
    "happy wall art",
    "colorful 3d wall art",
    "cookie decor",
    "dopamine decor wall art",
    "joyful wall art",
    "bright 3d wall art",
    "rainbow cookie wall art",
    "hot pink cookie wall art",
    "fun apartment wall art",
  ],
  alternates: {
    canonical: "/dopamine-decor-wall-art/",
  },
  openGraph: {
    title: "Dopamine Decor Wall Art | Happy 3D Cookie Decor & Dopamine Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch colorful 3D cookie wall sculptures for dopamine decor bedrooms, kitchens, apartments, and studios. Free U.S. shipping.",
    url: "https://joirush.com/dopamine-decor-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/rainbow.jpg",
        width: 1200,
        height: 900,
        alt: "Rainbow candy cookie dopamine decor 3D wall art sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dopamine Decor Wall Art | Happy 3D Cookie Decor | JOIRUSH",
    description:
      "Handmade 14 to 16 inch colorful 3D cookie wall sculptures for joyful dopamine home decor. Free U.S. shipping.",
    images: ["/images/products/rainbow.jpg"],
  },
};

const dopamineOrderSlugs = [
  "rainbow-candy-cookie",
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "cookie-ice-cream-sandwich",
  "jumbo-mm-cookie",
  "jumbo-christmas-cookie",
  "jumbo-white-chocolate-chip-cookie",
  "jumbo-chocolate-chip-cookie",
  "giant-peanut-butter-cookie",
  "giant-double-chocolate-cookie",
  "mini-jumbo-chocolate-chip-cookie",
];

const faqs = [
  {
    question: "What makes JOIRUSH cookie sculptures great dopamine decor?",
    answer:
      "Dopamine decor is all about filling your home with colors, textures, and nostalgic shapes that spark instant happiness. Each JOIRUSH sculpture combines warm golden baked texture with bright candy colors like rainbow, hot pink, and pastel in a 14 to 16 inch 3D piece of happy wall art.",
  },
  {
    question: "How can I style dopamine wall art in a renter apartment without painting?",
    answer:
      "Hang a single colorful 3D wall art sculpture on a white or cream wall using one standard picture hook or nail. Then repeat two candy colors from the cookie in small room accents like throw pillows, coffee mugs, or desk accessories for a cohesive dopamine home decor look.",
  },
  {
    question: "Which cookies are the brightest choices for dopamine art gallery walls?",
    answer:
      "Our collectors love combining the Rainbow Candy Cookie, Hot Pink M&M Cookie, Pastel M&M Cookie, and Cookie Ice Cream Sandwich. Buy 4 or more cookies in any mix and get 10% off each cookie.",
  },
  {
    question: "Are the sculptures heavy to hang on bedroom or studio drywall?",
    answer:
      "Not at all. Every cookie sculpture is crafted from lightweight spray foam on a solid wood base and weighs only 2 to 4 lbs, with built in hanging hardware ready for a single nail or hook.",
  },
];

export default function DopamineDecorWallArtPage() {
  const orderedProducts = dopamineOrderSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/dopamine-decor-wall-art/",
        name: "Dopamine Decor Wall Art | Happy 3D Cookie Decor & Dopamine Art",
        description:
          "Handmade dopamine decor wall art, happy wall art, and colorful 3D cookie decor sculpted in Queens, NY by JOIRUSH.",
        url: "https://joirush.com/dopamine-decor-wall-art/",
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
            name: "Dopamine Decor Wall Art",
            item: "https://joirush.com/dopamine-decor-wall-art/",
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
            <li className="font-semibold text-espresso">Dopamine Decor Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Dopamine Decor • Happy Wall Art • Handmade in Queens, NY
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Dopamine Decor Wall Art &amp; Joyful 3D Cookie Sculptures
              </h1>
              <Buy4Banner className="mt-5" />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Your home should make you smile the second you walk through the door. JOIRUSH <strong>dopamine decor</strong> brings bold candy colors, sweet childhood nostalgia, and tactile 3D texture to your walls with 14 to 16 inch handmade <strong>cookie decor</strong> sculpted by artist Erynn in Queens, NY.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Whether you are looking for statement <strong>dopamine wall art</strong> above your bed, playful <strong>dopamine art</strong> for a home office or creative studio, or vibrant <strong>colorful 3d wall art</strong> and <strong>dopamine home decor</strong> for your kitchen or apartment, every piece hangs effortlessly from a single standard hook with free U.S. shipping.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#dopamine-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Dopamine Wall Art
                </a>
                <Link
                  href="/blog/dopamine-decor-ideas/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Read Dopamine Styling Guide
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/rainbow.jpg"
                  alt="Rainbow candy cookie dopamine decor 3D wall art sculpture by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="dopamine-collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="Joy Sparking Sculptures"
            title="Shop Dopamine Decor & Happy 3D Wall Art"
            copy="Hand sculpted and painted in Queens, NY. Buy 4 or more cookies and get 10% off each, with free U.S. shipping."
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
              1. Happy Wall Art for Bedrooms &amp; Apartments
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              You do not need to paint rental walls to enjoy <strong>dopamine home decor</strong>. Hang the 14 inch <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link> or 16 inch <Link href="/product/hot-pink-mm-cookie/" className="font-medium text-caramel underline">Hot Pink M&amp;M Cookie</Link> above a nightstand or dresser for instant <strong>happy wall art</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              2. Joyful Kitchen &amp; Coffee Bar Cookie Decor
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Turn your morning coffee corner into the happiest spot in the house. Pair the <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> with the <Link href="/product/jumbo-pastel-mm-cookie/" className="font-medium text-caramel underline">Pastel M&amp;M Cookie</Link> or <Link href="/product/jumbo-mm-cookie/" className="font-medium text-caramel underline">Jumbo M&amp;M Cookie</Link> for sweet, sculptural <strong>cookie decor</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              3. Bundle &amp; Save on Colorful 3D Gallery Walls
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Round 3D sculptures break up boxy picture frames and add real depth to a gallery wall. Buy 4 or more pieces of <strong>dopamine art</strong> in any mix and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Dopamine Decor Wall Art FAQs
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
            Explore Related Collections &amp; Styling Guides
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/colorful-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Colorful 3D Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Wall Art &amp; Coquette Decor
            </Link>
            <Link href="/faux-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Faux Food &amp; Fake Cookie Art
            </Link>
            <Link href="/oversized-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Oversized Food Wall Art
            </Link>
            <Link href="/kitchen-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen Wall Art
            </Link>
            <Link href="/blog/dopamine-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Ideas
            </Link>
            <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen Dopamine Gallery Wall
            </Link>
            <Link href="/blog/funky-quirky-wall-art-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Funky &amp; Quirky Wall Art Ideas
            </Link>
            <Link href="/blog/ice-cream-and-candy-wall-art-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Ice Cream &amp; Candy Wall Art
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
