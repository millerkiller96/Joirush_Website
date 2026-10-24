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
    absolute: "Pink Wall Art | Pink Room Decor, Pink Kitchen & Coquette Wall Art | JOIRUSH",
  },
  description:
    "Shop handmade pink wall art and 3D pink cookie wall art by JOIRUSH. Sweet 14 to 16 inch sculptures for pink room decor, pink kitchen decor, coquette room decor, danish pastel, and y2k room decor. Free U.S. shipping.",
  keywords: [
    "pink wall art",
    "pink room decor",
    "pink kitchen decor",
    "coquette room decor",
    "danish pastel",
    "y2k room decor",
    "girly room decor",
    "pink cookie wall art",
    "hot pink wall art",
    "pastel pink wall decor",
    "pink apartment decor",
    "pink dorm room decor",
    "sweet bedroom wall art",
  ],
  alternates: {
    canonical: "/pink-wall-art/",
  },
  openGraph: {
    title: "Pink Wall Art | Pink Room Decor, Coquette & Pink Kitchen Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D cookie wall sculptures for pink room decor, pink kitchen decor, coquette room decor, danish pastel, and y2k room decor. Free U.S. shipping.",
    url: "https://joirush.com/pink-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/hot-pink-mm.jpg",
        width: 1200,
        height: 900,
        alt: "Hot pink M&M cookie 3D pink wall art sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pink Wall Art | Pink Room Decor & Pink Cookie Wall Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D pink cookie wall art for bedrooms, kitchens, dorms, and coquette or pastel spaces. Free U.S. shipping.",
    images: ["/images/products/hot-pink-mm.jpg"],
  },
};

const pinkOrderSlugs = [
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "cookie-ice-cream-sandwich",
  "rainbow-candy-cookie",
  "jumbo-white-chocolate-chip-cookie",
  "jumbo-mm-cookie",
  "jumbo-chocolate-chip-cookie",
  "mini-jumbo-chocolate-chip-cookie",
  "giant-double-chocolate-cookie",
  "giant-peanut-butter-cookie",
  "jumbo-christmas-cookie",
];

const faqs = [
  {
    question: "Which JOIRUSH sculptures are most popular for pink wall art and pink room decor?",
    answer:
      "Our top picks for pink wall art are the 16 inch Hot Pink M&M Cookie with vibrant pink dough, the dreamy 16 inch Jumbo Pastel M&M Cookie, the Cookie Ice Cream Sandwich, the 14 inch Rainbow Candy Cookie, and the creamy White Chocolate Chip Cookie.",
  },
  {
    question: "How does 3D cookie art fit into coquette room decor, danish pastel, or y2k room decor?",
    answer:
      "Coquette room decor and danish pastel interiors love soft, sweet motifs like bows, hearts, desserts, and pastel colors, while y2k room decor celebrates bold hot pink and glossy pop art shapes. A 3D cookie wall sculpture bridges all three styles with handmade texture.",
  },
  {
    question: "Is pink cookie wall art easy to hang in a dorm, bedroom, or apartment?",
    answer:
      "Yes. Every JOIRUSH cookie sculpture weighs only 2 to 4 lbs and includes a built in hanger on the back, so it hangs easily from one standard nail or wall hook.",
  },
  {
    question: "Does JOIRUSH also make pink Y2K accessories to match?",
    answer:
      "Yes. In addition to our 3D wall sculptures, you can explore our handmade Y2K jewelry collection featuring nostalgic beads, charms, and sweet statement pieces.",
  },
];

export default function PinkWallArtPage() {
  const orderedProducts = pinkOrderSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/pink-wall-art/",
        name: "Pink Wall Art | Pink Room Decor, Pink Kitchen & Coquette Wall Art",
        description:
          "Handmade 3D pink wall art and pink cookie wall sculptures for pink room decor, pink kitchen decor, coquette room decor, danish pastel, and y2k room decor by JOIRUSH.",
        url: "https://joirush.com/pink-wall-art/",
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
            name: "Pink Wall Art",
            item: "https://joirush.com/pink-wall-art/",
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
            <li className="font-semibold text-espresso">Pink Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Pink Wall Art • Coquette &amp; Danish Pastel • Y2K Room Decor
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Pink Wall Art &amp; Sweet 3D Cookie Room Decor
              </h1>
              <Buy4Banner className="mt-5" />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                From bold hot pink statements to soft blush and candy pastels, JOIRUSH <strong>pink wall art</strong> brings sweet 3D charm to your favorite spaces. Every 14 to 16 inch sculpture is crafted and painted by hand in Queens, NY by artist Erynn.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Whether you are styling <strong>pink room decor</strong> for a bedroom or dorm, adding <strong>pink kitchen decor</strong> above an espresso bar, or curating <strong>coquette room decor</strong>, <strong>danish pastel</strong>, <strong>y2k room decor</strong>, and <strong>girly room decor</strong>, our lightweight <strong>pink cookie wall art</strong> hangs in minutes on a single hook.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pink-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Pink Wall Art
                </a>
                <Link
                  href="/jewelry/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Shop Y2K Jewelry
                </Link>
                <Link
                  href="/catalogue/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  View Full Catalogue
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/hot-pink-mm.jpg"
                  alt="Hot pink M&M cookie 3D pink wall art sculpture by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="pink-collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="Sweet & Sculptural"
            title="Shop Pink & Pastel 3D Cookie Wall Art"
            copy="Hand sculpted in Queens, NY. Lightweight (2 to 4 lbs), ready to hang, with free U.S. shipping on every order."
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
              1. Y2K Room Decor &amp; Hot Pink Statements
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Channel nostalgic 2000s pop energy with our 16 inch <Link href="/product/hot-pink-mm-cookie/" className="font-medium text-caramel underline">Hot Pink M&amp;M Cookie</Link>. Its vibrant pink sculpted dough and glossy candy shells make it the ultimate centerpiece for <strong>y2k room decor</strong> and <strong>girly room decor</strong>, especially paired with our handmade <Link href="/jewelry/" className="font-medium text-caramel underline">Y2K Jewelry</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              2. Coquette Room Decor &amp; Danish Pastel Walls
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              For softer palettes with blush, cream, lilac, and mint, hang the <Link href="/product/jumbo-pastel-mm-cookie/" className="font-medium text-caramel underline">Jumbo Pastel M&amp;M Cookie</Link> or <Link href="/product/jumbo-white-chocolate-chip-cookie/" className="font-medium text-caramel underline">White Chocolate Chip Cookie</Link> above your vanity, bookshelf, or bed for dreamy <strong>coquette room decor</strong> and <strong>danish pastel</strong> charm.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              3. Pink Kitchen Decor &amp; Sweet Gallery Bundles
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Style a sweet pink coffee bar with the <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> and <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link>. Buy 4 or more cookies from the <Link href="/catalogue/" className="font-medium text-caramel underline">catalogue</Link> and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Pink Wall Art &amp; Room Decor FAQs
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
            Related Pink, Dopamine &amp; Sweet Decor Guides
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Wall Art
            </Link>
            <Link href="/colorful-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Colorful 3D Wall Art
            </Link>
            <Link href="/faux-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Faux Food &amp; Fake Cookie Art
            </Link>
            <Link href="/kitchen-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen Wall Art
            </Link>
            <Link href="/jewelry/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Y2K Jewelry Collection
            </Link>
            <Link href="/catalogue/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Shop Full Cookie Catalogue
            </Link>
            <Link href="/blog/pink-kitchen-coquette-room-decor-cookie-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Kitchen &amp; Coquette Room Guide
            </Link>
            <Link href="/blog/ice-cream-and-candy-wall-art-decor-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Ice Cream &amp; Candy Wall Art Ideas
            </Link>
            <Link href="/blog/funky-quirky-wall-art-ideas/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Funky &amp; Quirky Wall Art Ideas
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
