import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getDisplayName, getProduct, type Product } from "@/data/products";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

const pageUrl = getAbsoluteUrl("/colorful-wall-art/");
const title = "Colorful Wall Art: Bright Handmade Cookie Sculptures";
const description =
  "Colorful wall art you can almost taste: candy bright, hot pink, and pastel jumbo cookie sculptures, plus easy ways to build colorful home decor around one piece.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "colorful wall art",
    "colorful home decor",
    "bright wall art",
    "candy colored wall decor",
    "dopamine art",
    "jumbo cookie wall art",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
    url: pageUrl,
    images: [
      {
        url: getImageUrl("/images/products/rainbow.jpg"),
        width: 1200,
        height: 630,
        alt: "Colorful wall art: rainbow candy jumbo cookie sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [getImageUrl("/images/products/rainbow.jpg")],
  },
};

const colorfulSlugs = [
  "rainbow-candy-cookie",
  "hot-pink-mm-cookie",
  "jumbo-pastel-mm-cookie",
  "jumbo-mm-cookie",
  "jumbo-mm-cookie-set",
  "giant-peanut-butter-cookie",
  "jumbo-christmas-cookie",
];

const colorfulProducts = colorfulSlugs
  .map((slug) => getProduct(slug))
  .filter((p): p is Product => Boolean(p));

const palettes = [
  {
    name: "Candy brights",
    copy: "Every color at once, on warm golden dough. Looks best on white, cream, or a soft neutral wall.",
    href: "/product/rainbow-candy-cookie/",
    pieces: "Rainbow candy cookie, classic M&M cookie, M&M cookie set",
  },
  {
    name: "Hot pink",
    copy: "One loud color with chocolate and candy accents. Perfect for bold rooms and maximalist walls.",
    href: "/product/hot-pink-mm-cookie/",
    pieces: "Hot pink M&M cookie",
  },
  {
    name: "Soft pastels",
    copy: "Lavender, baby blue, blush, and mint. Colorful but gentle, great for nurseries and sunny kitchens.",
    href: "/product/jumbo-pastel-mm-cookie/",
    pieces: "Pastel M&M cookie",
  },
  {
    name: "Holiday color",
    copy: "Festive candy colors for the season, ready to swap in when the decorations come out.",
    href: "/product/jumbo-christmas-cookie/",
    pieces: "Christmas cookie",
  },
];

const faqs = [
  {
    question: "How do I decorate around colorful wall art?",
    answer:
      "Pick two or three colors from the art and repeat each one a few times around the room, in pillows, a vase, a rug, or dishes. A calm wall color behind the piece lets the colors stand out.",
  },
  {
    question: "What wall color works best behind bright art?",
    answer:
      "White, cream, and soft warm neutrals make candy colors pop. A deeper color like navy or forest green can work too, as long as the art has enough contrast to stand out.",
  },
  {
    question: "Can I mix colorful wall art with neutral decor?",
    answer:
      "Yes, and it is one of the easiest ways to start. One colorful piece in a mostly neutral room becomes the focal point and adds personality without a full makeover.",
  },
  {
    question: "What are these colorful cookies made of?",
    answer:
      "Each piece is sculpted by hand from spray foam and painted with acrylics by cookie artist Erynn. They are decorative only, not edible, and each has a built in hanger.",
  },
];

function ColorfulWallArtJsonLd() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: colorfulProducts.length,
      itemListElement: colorfulProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getAbsoluteUrl(`/product/${product.slug}/`),
        name: getDisplayName(product),
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Colorful Wall Art", item: pageUrl },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export default function ColorfulWallArtPage() {
  return (
    <>
      <ColorfulWallArtJsonLd />
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-chocolate-soft">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-pink">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-chocolate">Colorful Wall Art</li>
              </ol>
            </nav>
            <h1 className="mt-4 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Colorful Wall Art You Can Almost Taste
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              Candy pops of red, yellow, and blue. Hot pink dough. Soft pastel chips. This is{" "}
              <strong>colorful wall art</strong> with real texture: jumbo cookies sculpted by hand,
              so the color catches the light from every angle.
            </p>
            <p className="mt-4 text-chocolate-mid">
              One bright piece is also the easiest way to start with colorful home decor. Hang it,
              then borrow its colors for the rest of the room.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
              <li>✓ Handmade in {site.shipsFrom}</li>
              <li>✓ Ships in {site.shippingTime}</li>
              <li>✓ Free U.S. shipping</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#colorful-collection"
                data-buy-cta="shop"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Shop Colorful Wall Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Request Custom Colors
              </Link>
            </div>
          </div>
          <Image
            src="/images/products/rainbow.jpg"
            alt="Colorful wall art: rainbow candy jumbo cookie sculpture by JOIRUSH"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <section
          id="colorful-collection"
          data-buy-target=""
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 outline-none md:px-8"
        >
          <SectionHeading
            eyebrow="The colorful collection"
            title="Bright Cookies for Bold Walls"
            copy="Every piece here is about color first. Pick the palette that fits your room, or the one that makes you smile."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {colorfulProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Choose a palette"
              title="Which Colors Suit Your Room?"
              copy="Start with the feeling you want. Bright and energetic, bold and confident, or soft and sweet."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {palettes.map((palette) => (
                <Link
                  key={palette.name}
                  href={palette.href}
                  className="group rounded-[1.5rem] bg-white p-5 transition hover:shadow-lift"
                >
                  <h3 className="font-display text-xl text-chocolate group-hover:text-pink">{palette.name}</h3>
                  <p className="mt-2 text-sm text-chocolate-mid">{palette.copy}</p>
                  <p className="mt-3 text-sm font-medium text-pink">{palette.pieces}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Colorful home decor"
            title="Build a Colorful Room Around One Piece"
            copy="You do not need to repaint the house. A single bright piece of art can set the palette for everything else."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Borrow three colors",
                copy: "Pick three colors from the art and repeat each one at least three times: a cushion, a mug, a vase, a book spine.",
              },
              {
                title: "Give it a calm backdrop",
                copy: "White, cream, or a soft warm neutral behind the art lets the candy colors do the talking.",
              },
              {
                title: "Mix in texture",
                copy: "Glossy ceramics, a woven basket, or a velvet pillow keep a colorful room feeling rich, not flat.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.8rem] bg-cream p-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-chocolate-mid">{item.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-chocolate-mid">
            Want more ideas? Read our{" "}
            <Link href="/blog/dopamine-decor-ideas/" className="text-pink hover:underline">
              dopamine decor ideas
            </Link>{" "}
            for a room by room guide, learn{" "}
            <Link href="/blog/add-color-to-neutral-home-without-painting/" className="text-pink hover:underline">
              how to add color to a neutral home without painting
            </Link>
            , or see how bright pieces fit into{" "}
            <Link href="/blog/maximalist-decor-ideas/" className="text-pink hover:underline">
              maximalist decor
            </Link>
            . Decorating the kitchen? Browse{" "}
            <Link href="/kitchen-wall-art/" className="text-pink hover:underline">
              kitchen wall art
            </Link>{" "}
            by style.
          </p>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading eyebrow="Common questions" title="Colorful Wall Art FAQ" />
            <dl className="mt-10 grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
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
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Custom colors</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              Have a color in mind?
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Teal dough, purple chips, your favorite team colors. Tell {site.artist} the palette
              and she will sculpt a one of one cookie for your wall. Ships in 14 days with free U.S.
              shipping.
            </p>
            <Link
              href="/custom/"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Start a Custom Piece
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
