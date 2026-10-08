import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProduct, type Product } from "@/data/products";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

const pageUrl = getAbsoluteUrl("/kitchen-wall-art/");
const title = "Kitchen Wall Art: Handmade 3D Cookie Art for Your Kitchen";
const description =
  "Kitchen wall art that looks good enough to eat: handmade jumbo cookie sculptures, plus where to hang them and how to choose a size. From $90, free U.S. shipping.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "kitchen wall art",
    "kitchen wall decor",
    "3d kitchen wall art",
    "fun kitchen wall art",
    "jumbo cookie wall art",
    "food wall art for kitchen",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
    url: pageUrl,
    images: [
      {
        url: getImageUrl("/images/products/choc-chip.jpg"),
        width: 1200,
        height: 630,
        alt: "Kitchen wall art: handmade jumbo chocolate chip cookie sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [getImageUrl("/images/products/choc-chip.jpg")],
  },
};

const groups: { title: string; copy: string; slugs: string[] }[] = [
  {
    title: "Warm and classic",
    copy: "Golden dough and chocolate tones that sit happily next to wood cabinets, butcher block, and farmhouse kitchens.",
    slugs: [
      "jumbo-chocolate-chip-cookie",
      "jumbo-white-chocolate-chip-cookie",
      "giant-peanut-butter-cookie",
      "giant-double-chocolate-cookie",
      "mini-jumbo-chocolate-chip-cookie",
    ],
  },
  {
    title: "Bright and playful",
    copy: "Candy colors that pop against white, cream, or pastel kitchens. Easy color for a dopamine decor kitchen.",
    slugs: ["rainbow-candy-cookie", "hot-pink-mm-cookie", "jumbo-mm-cookie", "jumbo-pastel-mm-cookie"],
  },
  {
    title: "Statement pieces and pairs",
    copy: "For a big wall over a dining table or banquette, or a breakfast nook that deserves a showstopper.",
    slugs: ["cookie-ice-cream-sandwich", "jumbo-mm-cookie-set", "oversized-mini-cookie-pair"],
  },
];

function pick(slugs: string[]): Product[] {
  return slugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));
}

const allKitchenProducts = groups.flatMap((group) => pick(group.slugs));

const faqs = [
  {
    question: "What kind of wall art is best for a kitchen?",
    answer:
      "Pick art that suits the room's mood and can handle a busy space. Food themed art is a natural fit. Hang it on a wall away from the stove and sink, such as a breakfast nook, coffee bar, or the end of a cabinet run.",
  },
  {
    question: "Where should I hang art in my kitchen?",
    answer:
      "Good spots include above a dining table or banquette, beside a window, over a coffee or snack station, or on an open wall you see from the doorway. Avoid the area right above the stove and the splash zone around the sink.",
  },
  {
    question: "How big should kitchen wall art be?",
    answer:
      "On a narrow wall between cabinets or windows, a single 14 inch cookie looks right. On a wider wall or above a table, try a 16 inch piece, a pair, or the ice cream sandwich statement piece.",
  },
  {
    question: "Are JOIRUSH cookies real food?",
    answer:
      "No. They are decorative only, sculpted from spray foam and painted with acrylics. They look like real cookies but are not edible.",
  },
  {
    question: "How do they hang?",
    answer:
      "Each cookie has a built in hanger, and most weigh 2 to 4 lbs, so they hang on a single nail or picture hook.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Every piece is handmade to order and ships within 14 days from Daytona Beach, FL. U.S. shipping is free.",
  },
];

function KitchenWallArtJsonLd() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allKitchenProducts.length,
      itemListElement: allKitchenProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getAbsoluteUrl(`/product/${product.slug}/`),
        name: product.name,
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Kitchen Wall Art", item: pageUrl },
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

export default function KitchenWallArtPage() {
  return (
    <>
      <KitchenWallArtJsonLd />
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
                <li className="text-chocolate">Kitchen Wall Art</li>
              </ol>
            </nav>
            <h1 className="mt-4 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Kitchen Wall Art That Looks Good Enough to Eat
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              A lot of <strong>kitchen wall art</strong> is a print of a lemon or a coffee cup. These are
              jumbo cookies you can see from across the room: craggy edges, glossy chips, and that
              just baked glow.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Each one is sculpted by hand from spray foam and acrylic paint by cookie artist{" "}
              {site.artist} in Daytona Beach, FL. They are decorative only, most weigh 2 to 4 lbs, and
              each has a built in hanger.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
              <li>✓ Handmade to order</li>
              <li>✓ Ships in {site.shippingTime}</li>
              <li>✓ Free U.S. shipping</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#kitchen-collection"
                data-buy-cta="shop"
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Shop Kitchen Wall Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Match My Kitchen Colors
              </Link>
            </div>
          </div>
          <Image
            src="/images/products/choc-chip.jpg"
            alt="Kitchen wall art: handmade jumbo chocolate chip cookie sculpture by JOIRUSH"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <section
          id="kitchen-collection"
          data-buy-target=""
          className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 outline-none md:px-8"
        >
          <SectionHeading
            eyebrow="Shop by kitchen style"
            title="Pick a Cookie for Your Kitchen"
            copy="Start with the look of your kitchen. Warm wood and neutrals love the classics; white and pastel kitchens come alive with candy color."
          />
          {groups.map((group) => (
            <div key={group.title} className="mt-12">
              <h3 className="font-display text-3xl text-chocolate">{group.title}</h3>
              <p className="mt-2 max-w-2xl text-chocolate-mid">{group.copy}</p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pick(group.slugs).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          ))}
          <p className="mt-10 text-chocolate-mid">
            Hanging up holiday decor? The{" "}
            <Link href="/product/jumbo-christmas-cookie/" className="text-pink hover:underline">
              Christmas cookie
            </Link>{" "}
            is a festive swap for November through New Year&apos;s.
          </p>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Placement guide"
              title="Where to Hang Kitchen Wall Art"
              copy="Kitchens are busy rooms. These spots show off art and keep it out of the way of heat, steam, and splashes."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Breakfast nook",
                  copy: "The easiest spot of all. It works like a mini dining room, so one cookie at seated eye level feels cozy.",
                },
                {
                  title: "Coffee or snack bar",
                  copy: "A cookie over the coffee station is a little joke everyone gets. Hang it high enough to clear the machine.",
                },
                {
                  title: "End of the cabinets",
                  copy: "The wall at the end of a cabinet run is often seen from the doorway. Great for a statement piece.",
                },
                {
                  title: "Above the table",
                  copy: "A pair or the ice cream sandwich centered over a table or banquette anchors the whole room.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] bg-white p-5">
                  <h3 className="font-display text-xl text-chocolate">{item.title}</h3>
                  <p className="mt-2 text-sm text-chocolate-mid">{item.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-chocolate-mid">
              <strong>Skip:</strong> right above the stove, the splash zone around the sink, and
              anywhere a cabinet door could bump it. Steer clear of strong direct sun too, to keep
              the acrylic colors bright.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Sizing"
                title="What Size Works on Your Wall?"
                copy="A quick rule: the art should feel generous for the wall it sits on, not lost on it."
              />
              <ul className="mt-6 space-y-3 text-chocolate-mid">
                <li>
                  <strong>Narrow wall or between windows:</strong> one 14 inch cookie, like the{" "}
                  <Link href="/product/rainbow-candy-cookie/" className="text-pink hover:underline">
                    rainbow candy cookie
                  </Link>
                  .
                </li>
                <li>
                  <strong>Open wall or nook:</strong> a 16 inch classic, like the{" "}
                  <Link href="/product/jumbo-chocolate-chip-cookie/" className="text-pink hover:underline">
                    chocolate chip
                  </Link>
                  .
                </li>
                <li>
                  <strong>Over a table or banquette:</strong> a pair, like the{" "}
                  <Link href="/product/jumbo-mm-cookie-set/" className="text-pink hover:underline">
                    M&amp;M cookie set
                  </Link>
                  , or the{" "}
                  <Link href="/product/cookie-ice-cream-sandwich/" className="text-pink hover:underline">
                    ice cream sandwich
                  </Link>
                  .
                </li>
              </ul>
              <p className="mt-6 text-chocolate-mid">
                Need step by step help? Read{" "}
                <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/" className="text-pink hover:underline">
                  how to hang jumbo cookie wall art
                </Link>
                .
              </p>
            </div>
            <div>
              <SectionHeading
                eyebrow="Style ideas"
                title="Make It Part of the Room"
                copy="A cookie is fun on its own, and even better when the room plays along."
              />
              <ul className="mt-6 space-y-3 text-chocolate-mid">
                <li>
                  Repeat one color from the cookie in a tea towel, a bowl, or bar stools.
                </li>
                <li>
                  Pair it with cookbooks and ceramics on open shelves for a bakery case feel.
                </li>
                <li>
                  Build a{" "}
                  <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/" className="text-pink hover:underline">
                    dessert gallery wall
                  </Link>{" "}
                  with two or three pieces.
                </li>
                <li>
                  Lean into the fun with more{" "}
                  <Link href="/blog/dopamine-decor-ideas/" className="text-pink hover:underline">
                    dopamine decor ideas
                  </Link>{" "}
                  or a retro{" "}
                  <Link href="/blog/whimsical-kitsch-decor-ideas/" className="text-pink hover:underline">
                    kitsch kitchen
                  </Link>
                  .
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading eyebrow="Common questions" title="Kitchen Wall Art FAQ" />
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
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Custom kitchen art</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              Want a cookie in your kitchen&apos;s colors?
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Send your cabinet color, your backsplash, or a photo of the wall. {site.artist} will
              sculpt a piece made for your kitchen. Ships in 14 days with free U.S. shipping.
            </p>
            <Link
              href="/custom/"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Request a Custom Piece
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
