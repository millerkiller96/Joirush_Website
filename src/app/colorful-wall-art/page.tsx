import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading as Heading } from "@/components/SectionHeading";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import Buy4Banner from "@/components/Buy4Banner";

export const metadata: Metadata = {
  title: {
    absolute: "Colorful Wall Art | Dopamine Decor, Funky, Quirky & Textured 3D Art | JOIRUSH",
  },
  description:
    "Shop colorful 3D wall art and textured wall art by JOIRUSH. Handmade oversized cookie wall sculptures for dopamine decor, pink wall art, funky wall art, quirky wall art, and candy decor rooms. Free U.S. shipping.",
  keywords: [
    "colorful wall art",
    "dopamine decor",
    "pink wall art",
    "funky wall art",
    "quirky wall art",
    "textured wall art",
    "candy decor",
    "dopamine decor wall art",
    "maximalist wall art",
    "colorful 3d wall art",
    "whimsical wall art",
    "eclectic wall art",
    "kitsch wall decor",
    "rainbow cookie wall art",
    "bright pop art sculpture",
  ],
  alternates: {
    canonical: "/colorful-wall-art/",
  },
  openGraph: {
    title: "Colorful 3D Wall Art | Dopamine Decor, Pink, Funky & Textured Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch colorful cookie wall sculptures for dopamine decor, pink wall art, funky wall art, and candy decor spaces. Free U.S. shipping.",
    url: "https://joirush.com/colorful-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/rainbow.jpg",
        width: 1200,
        height: 900,
        alt: "Rainbow candy cookie colorful 3D textured wall art by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colorful 3D Wall Art | Dopamine Decor & Funky Wall Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch colorful cookie wall sculptures for dopamine decor and maximalist spaces. Free U.S. shipping.",
    images: ["/images/products/rainbow.jpg"],
  },
};

const colorfulOrderSlugs = [
  "rainbow-candy-cookie",
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "jumbo-mm-cookie",
  "cookie-ice-cream-sandwich",
  "jumbo-christmas-cookie",
  "jumbo-white-chocolate-chip-cookie",
  "jumbo-chocolate-chip-cookie",
  "giant-peanut-butter-cookie",
  "giant-double-chocolate-cookie",
  "mini-jumbo-chocolate-chip-cookie",
];

const faqs = [
  {
    question: "What is dopamine decor wall art?",
    answer:
      "Dopamine decor is all about surrounding yourself with bright colors, tactile textures, and joyful objects that spark an instant smile. Our 3D cookie wall sculptures combine candy colors like hot pink, rainbow, and pastel with realistic baked crumb texture to create happy, textured wall art.",
  },
  {
    question: "How do I add colorful wall art to a neutral apartment without painting?",
    answer:
      "A single 14 to 16 inch colorful 3D cookie sculpture acts as an instant focal point on white, cream, or beige rental walls. Hang one Rainbow Candy Cookie or Hot Pink M&M Cookie on a single picture hook and echo 1 or 2 of its candy colors with a throw pillow or mug.",
  },
  {
    question: "Which JOIRUSH sculptures are best for pink wall art, funky wall art, or candy decor?",
    answer:
      "Collectors building bold gallery walls love pairing the Hot Pink M&M Cookie, Rainbow Candy Cookie, Pastel M&M Cookie, and Cookie Ice Cream Sandwich. Buy 4 or more cookies in any mix and get 10% off each cookie.",
  },
];

export default function ColorfulWallArtPage() {
  const orderedProducts = colorfulOrderSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/colorful-wall-art/",
        name: "Colorful Wall Art | Dopamine Decor, Pink, Funky & Textured 3D Cookie Sculptures",
        description:
          "Handmade colorful 3D cookie wall sculptures and textured wall art for dopamine decor, pink wall art, funky wall art, and candy decor spaces, crafted in Queens, NY by JOIRUSH.",
        url: "https://joirush.com/colorful-wall-art/",
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
            name: "Colorful Wall Art",
            item: "https://joirush.com/colorful-wall-art/",
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
            <li className="font-semibold text-espresso">Colorful Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Dopamine Decor • Funky &amp; Quirky Wall Art • Textured 3D Art
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Colorful 3D Wall Art for Dopamine Decor &amp; Funky Rooms
              </h1>
              <Buy4Banner className="mt-5" />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Ready to wake up a quiet room? JOIRUSH <strong>colorful wall art</strong> brings bold candy colors, playful pop art nostalgia, and real 3D sculptural depth to your walls. Each 14 to 16 inch cookie is sculpted and painted by hand in Queens, NY by artist Erynn.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Whether you are curating a joyful <strong>dopamine decor</strong> apartment, searching for dreamy <strong>pink wall art</strong>, mixing <strong>funky wall art</strong> and <strong>quirky wall art</strong> into a gallery wall, or adding sweet <strong>candy decor</strong> and <strong>textured wall art</strong> to a bedroom or studio, our lightweight sculptures hang in seconds from a single standard hook.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#colorful-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Colorful Sculptures
                </a>
                <Link
                  href="/dopamine-decor-wall-art/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Explore Dopamine Decor
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/rainbow.jpg"
                  alt="Rainbow candy cookie colorful 3D textured wall art by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="colorful-collection" className="scroll-mt-20">
          <Heading
            eyebrow="Bright & Bold"
            title="Shop Colorful 3D Cookie Wall Sculptures"
            copy="From rainbow candy and hot pink to dreamy pastels and classic chocolate chip. Free U.S. shipping on every order."
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
              Dopamine Decor &amp; Candy Decor Statements
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Brighten white rental walls without picking up a paintbrush. The <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link> and <Link href="/product/jumbo-mm-cookie/" className="font-medium text-caramel underline">Jumbo M&amp;M Cookie</Link> pack five vibrant candy shades into one joyful piece of <strong>candy decor</strong> and <strong>dopamine decor</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              Pink Wall Art &amp; Soft Pastel Dreams
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Love coquette, Danish pastel, or Y2K aesthetics? Our <Link href="/product/hot-pink-mm-cookie/" className="font-medium text-caramel underline">Hot Pink M&amp;M Cookie</Link>, <Link href="/product/jumbo-pastel-mm-cookie/" className="font-medium text-caramel underline">Jumbo Pastel M&amp;M Cookie</Link>, and <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> bring sweet <strong>pink wall art</strong> energy to bedrooms, dorms, and creative studios.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              Funky, Quirky &amp; Textured Gallery Walls
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Flat posters all sit at the same depth. Adding a round 3D cookie sculpture gives your room real <strong>textured wall art</strong> and <strong>funky wall art</strong> personality. Buy 4 or more cookies and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Colorful Wall Art &amp; Dopamine Decor FAQs
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
            Explore More Colorful Decor Guides &amp; Collections
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Wall Art &amp; Room Decor
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
            <Link href="/blog/funky-quirky-wall-art-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Funky &amp; Quirky Wall Art Ideas
            </Link>
            <Link href="/blog/ice-cream-and-candy-wall-art-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Ice Cream &amp; Candy Wall Art Ideas
            </Link>
            <Link href="/blog/dopamine-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Ideas
            </Link>
            <Link href="/blog/maximalist-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Maximalist Decor Ideas
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
