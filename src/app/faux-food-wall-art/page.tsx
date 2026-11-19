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
    absolute: "Fake Food Decor | Handmade Faux Food Wall Art | JOIRUSH",
  },
  description:
    "Fake food decor that looks fresh baked. Handmade faux food decor: jumbo cookies from $70 and a 20 by 20 inch ice cream sandwich. Free U.S. shipping.",
  keywords: [
    "fake food decor",
    "faux food decor",
    "faux food wall art",
    "fake desserts for display",
    "fake desserts for decoration",
    "fake food",
    "faux food",
    "fake cookies",
    "fake cookie",
    "fake ice cream",
    "realistic fake food",
    "food sculpture",
    "pop art sculpture",
    "giant fake cookie wall art",
    "faux dessert wall art",
  ],
  alternates: {
    canonical: "/faux-food-wall-art/",
  },
  openGraph: {
    title: "Fake Food Decor | Realistic Faux Food Decor for Your Walls | JOIRUSH",
    description:
      "Handmade fake food decor: jumbo fake cookies and a fake ice cream sandwich sculpted from foam and acrylic in Daytona Beach, FL. Free U.S. shipping.",
    url: "https://joirush.com/faux-food-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/ice-cream.jpg",
        width: 1200,
        height: 900,
        alt: "Realistic fake ice cream cookie sandwich faux food wall art sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fake Food Decor | Faux Food Wall Art Sculptures | JOIRUSH",
    description:
      "Handmade faux food decor: realistic fake cookies and fake ice cream wall sculptures crafted in Daytona Beach, FL. Free U.S. shipping.",
    images: ["/images/products/ice-cream.jpg"],
  },
};

const fauxFoodOrderSlugs = [
  "cookie-ice-cream-sandwich",
  "jumbo-chocolate-chip-cookie",
  "giant-peanut-butter-cookie",
  "giant-double-chocolate-cookie",
  "jumbo-white-chocolate-chip-cookie",
  "rainbow-candy-cookie",
  "jumbo-mm-cookie",
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "mini-jumbo-chocolate-chip-cookie",
  "jumbo-christmas-cookie",
];

const faqs = [
  {
    question: "How does Erynn make JOIRUSH faux food wall art look like real baked cookies?",
    answer:
      "Artist Erynn hand sculpts each piece of fake food in her Daytona Beach, FL studio using expanding spray foam over a sturdy wood base. Once cured, she layers custom mixed warm golden, cocoa, and candy acrylic paints to create realistic fake food texture that never melts, crumbs, or fades.",
  },
  {
    question: "Will fake cookies or fake ice cream wall art attract bugs or spoil?",
    answer:
      "Never. Our faux food decor contains zero real food ingredients. Every fake cookie and fake ice cream sculpture is 100% non perishable foam, wood, and sealed artist acrylic paint made to last for years on your wall.",
  },
  {
    question: "How heavy is a giant fake cookie sculpture compared to resin food props?",
    answer:
      "Cast resin or plaster food props can weigh 10 to 20 lbs and require heavy wall anchors. Because JOIRUSH food sculpture art is sculpted from lightweight foam, single cookies weigh just 2 to 4 lbs and hang from one standard nail or picture hook.",
  },
  {
    question: "Can I bundle multiple fake food sculptures for a dessert gallery wall?",
    answer:
      "Yes. Buy 4 or more cookies in any mix of flavors and get 10% off each cookie, with free U.S. shipping.",
  },
];

export default function FauxFoodWallArtPage() {
  const orderedProducts = fauxFoodOrderSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/faux-food-wall-art/",
        name: "Fake Food Decor and Faux Food Wall Art by JOIRUSH",
        description:
          "Handmade fake food decor and faux food decor: realistic fake cookies and fake ice cream sculptures for your walls, crafted in Daytona Beach, FL by JOIRUSH.",
        url: "https://joirush.com/faux-food-wall-art/",
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
            name: "Fake Food Decor",
            item: "https://joirush.com/faux-food-wall-art/",
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
            <li className="font-semibold text-espresso">Fake Food Decor</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Faux Food Decor • Realistic Fake Cookies &amp; Fake Ice Cream
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Fake Food Decor: Faux Food Wall Art That Looks Fresh Baked
              </h1>
              <Buy4Banner className="mt-5" />
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Great <strong>fake food decor</strong> makes everyone do a happy double take. In her Daytona Beach, FL studio, artist Erynn hand sculpts oversized <strong>fake cookies</strong> and <strong>fake ice cream</strong> from lightweight spray foam and layers of warm acrylic paint so every piece of <strong>faux food decor</strong> looks fresh from the oven. It never melts, crumbs, or spoils, and it is not edible.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Unlike tiny plastic kitchen magnets or heavy resin props, each JOIRUSH piece of <strong>faux food wall art</strong> is a 14 to 16 inch cookie or a 20 by 20 inch ice cream sandwich, built for home walls. Hang our <strong>realistic fake food</strong> in your kitchen, bedroom, apartment, or home studio in seconds on a single nail or hook.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#faux-food-collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop Faux Food Sculptures
                </a>
                <Link
                  href="/blog/fake-food-and-fake-cookies-for-wall-decor/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Read Fake Food Guide
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/ice-cream.jpg"
                  alt="Realistic fake ice cream cookie sandwich faux food wall art by JOIRUSH"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="faux-food-collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="Handmade Fake Food Art"
            title="Shop Realistic Fake Cookies & Fake Ice Cream Wall Art"
            copy="Every piece of fake food decor is hand sculpted and painted in Daytona Beach, FL. Free shipping on all U.S. orders."
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
              1. Realistic Fake Cookies That Never Go Stale
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Every <strong>fake cookie</strong> is sculpted by hand to capture golden baked edges, crinkly dough folds, and rich chocolate chunks. Fan favorites include our 16 inch <Link href="/product/jumbo-chocolate-chip-cookie/" className="font-medium text-caramel underline">Jumbo Chocolate Chip Cookie</Link>, crosshatch <Link href="/product/giant-peanut-butter-cookie/" className="font-medium text-caramel underline">Giant Peanut Butter Cookie</Link>, and <Link href="/product/giant-double-chocolate-cookie/" className="font-medium text-caramel underline">Giant Double Chocolate Cookie</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              2. Fake Ice Cream &amp; Candy Pop Art Sculptures
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Craving <strong>fake ice cream</strong> that never melts? Our <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> pairs two chocolate chip cookies around a thick, swirled scoop of faux vanilla ice cream. Pair it with the <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link> for bold <strong>pop art sculpture</strong> flair.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-espresso">
              3. Lightweight Spray Foam Craftsmanship
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/85">
              Unlike fragile clay DIY projects or heavy theater props, our <strong>faux food</strong> sculptures weigh just 2 to 4 lbs with built in hanging hardware. Buy 4 or more pieces of <strong>fake food decor</strong> and get 10% off each cookie.
            </p>
          </div>
        </section>

        <section id="fake-desserts-for-display" className="mt-16 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Fake Desserts for Display and Decoration
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-cocoa/85">
            Want <strong>fake desserts for display</strong> on a shelf, a bar cart, or a kitchen wall? Our <Link href="/product/cookie-ice-cream-sandwich/" className="font-medium text-caramel underline">Cookie Ice Cream Sandwich</Link> is a 20 by 20 inch scoop of faux vanilla between two chocolate chip cookies. The <Link href="/product/rainbow-candy-cookie/" className="font-medium text-caramel underline">Rainbow Candy Cookie</Link> adds bright candy color in a 14 inch size.
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/85">
            These <strong>fake desserts for decoration</strong> are made of spray foam and acrylic on a wood base, so they stay perfect for years. They are art, not food, so please do not eat them. See more sweet picks on our <Link href="/dessert-wall-art/" className="font-medium text-caramel underline">dessert wall art</Link> page.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Faux Food &amp; Fake Cookie Wall Art FAQs
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
            More Faux Food Guides &amp; Wall Art Collections
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/oversized-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Food Sculpture Wall Art
            </Link>
            <Link href="/dessert-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dessert &amp; Candy Wall Art
            </Link>
            <Link href="/kitchen-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen Wall Art &amp; Cookie Decor
            </Link>
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Wall Art &amp; Room Decor
            </Link>
            <Link href="/colorful-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Colorful 3D Wall Art
            </Link>
            <Link href="/blog/fake-food-and-fake-cookies-for-wall-decor/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Fake Food &amp; Fake Cookies Guide
            </Link>
            <Link href="/blog/faux-cookie-wall-decor-ready-made-vs-diy/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Ready Made vs. DIY Faux Cookies
            </Link>
            <Link href="/blog/giant-cookie-prop-vs-cookie-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Giant Cookie Prop vs. Wall Art
            </Link>
            <Link href="/blog/spray-foam-cookie-wall-art-how-theyre-made/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              How Spray Foam Cookies Are Made
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
