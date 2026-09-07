import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bakery Wall Decor & Café Dessert Art | Lightweight Cookie Sculptures",
  description:
    "Handmade jumbo cookie wall art for bakeries, cafés, and dessert shops. Lightweight artist pieces vs. heavy commercial props. Custom options available. Ships free in the US.",
  keywords: [
    "bakery wall decor",
    "cafe dessert wall art",
    "bakery decoration ideas",
    "cafe wall art food",
    "dessert shop decor",
    "lightweight food props",
    "custom bakery wall art",
    "faux cookie commercial",
  ],
  openGraph: {
    title: "Bakery Wall Decor & Café Dessert Art | Lightweight Cookie Sculptures",
    description:
      "Handmade jumbo cookie wall art for bakeries and cafés. Lightweight, affordable, and custom options available.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/mm-set.jpg"),
        width: 1200,
        height: 630,
        alt: "Jumbo cookie wall art perfect for bakeries and cafés",
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl("/for/bakeries-cafes/"),
  },
};

function PageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bakery Wall Decor & Café Dessert Art",
    description:
      "Handmade jumbo cookie wall art for bakeries, cafés, and dessert shops. Lightweight artist pieces as an alternative to heavy commercial props.",
    url: getAbsoluteUrl("/for/bakeries-cafes/"),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
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
          name: "Bakeries & Cafés",
          item: getAbsoluteUrl("/for/bakeries-cafes/"),
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How heavy is handmade cookie wall art vs commercial food props?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Handmade cookie sculptures from JOIRUSH weigh 2-5 pounds, while commercial fiberglass food props often weigh 10+ pounds. The lightweight construction makes installation easier and safer for café and bakery walls.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get custom cookie wall art in my bakery's brand colors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Custom pieces can be created in specific colors to match your bakery or café branding. Contact us through the custom order form to discuss your vision and get a quote.",
        },
      },
      {
        "@type": "Question",
        name: "How much does bakery wall decor cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JOIRUSH cookie wall art ranges from $90-$225 for individual pieces and sets. This is significantly less than commercial fiberglass props which can cost $350+. All pieces include free US shipping.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

const comparisonData = [
  {
    feature: "Weight",
    joirush: "2-5 lbs",
    commercial: "10+ lbs",
  },
  {
    feature: "Price",
    joirush: "$90–$225",
    commercial: "$350+",
  },
  {
    feature: "Installation",
    joirush: "Standard picture hook",
    commercial: "Heavy-duty anchors",
  },
  {
    feature: "Lead time",
    joirush: "1-2 weeks",
    commercial: "4-8 weeks",
  },
  {
    feature: "Customization",
    joirush: "Colors, sizes, flavors",
    commercial: "Limited options",
  },
  {
    feature: "Made in",
    joirush: "Orlando, Florida",
    commercial: "Overseas factories",
  },
];

const recommendedProducts = products.filter(
  (p) =>
    p.slug === "jumbo-mm-cookie-set" ||
    p.slug === "jumbo-chocolate-chip-cookie" ||
    p.slug === "rainbow-candy-cookie" ||
    p.slug === "cookie-ice-cream-sandwich"
);

export default function BakeriesCafesPage() {
  return (
    <>
      <PageJsonLd />
      <div>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              For Bakeries & Cafés
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
              Bakery Wall Decor That Actually Makes Sense
            </h1>
            <p className="mt-5 text-lg text-chocolate-mid">
              You need dessert decor that looks incredible, won't break the budget, and doesn't require
              a contractor to install. Commercial food props are heavy, expensive, and designed for
              theme parks — not your bakery wall. Handmade cookie sculptures offer the same visual
              impact at a fraction of the weight and cost.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/wall-art/"
                className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
              >
                Browse Cookie Wall Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium text-chocolate hover:bg-white"
              >
                Request Custom Piece
              </Link>
            </div>
          </div>
          <Image
            src="/images/products/mm-set.jpg"
            alt="Jumbo M&M cookie wall art set perfect for bakery decor"
            width={1000}
            height={1333}
            className="rounded-[2.2rem] object-cover shadow-card"
            priority
          />
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="The smart choice"
              title="Artist Pieces vs. Commercial Props"
              copy="Compare handmade cookie sculptures to traditional fiberglass food props — and see why bakeries and cafés are making the switch."
            />

            <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-chocolate/10">
              <table className="w-full">
                <thead className="bg-cream-deep">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-chocolate">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-pink">
                      JOIRUSH Handmade
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-chocolate-soft">
                      Commercial Props
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-chocolate/10">
                  {comparisonData.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-cream/30"}>
                      <td className="px-6 py-4 text-sm font-medium text-chocolate">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-chocolate-mid">{row.joirush}</td>
                      <td className="px-6 py-4 text-sm text-chocolate-soft">{row.commercial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Perfect for your space"
            title="Why Bakeries & Cafés Choose Handmade"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Lightweight = Easy Install",
                description:
                  "At 2-5 lbs, these cookies hang on standard picture hooks. No contractor, no special hardware, no structural concerns. Install in minutes.",
              },
              {
                title: "Budget-Friendly Impact",
                description:
                  "Make a statement without the commercial prop price tag. A jumbo cookie set costs less than a single fiberglass piece — with free US shipping included.",
              },
              {
                title: "Custom Brand Matching",
                description:
                  "Want cookies in your bakery's brand colors? A cookie that matches your signature dessert? Custom pieces bring your vision to life.",
              },
              {
                title: "Photo-Ready Decor",
                description:
                  "Customers love photographing unique decor. Cookie wall art creates Instagram-worthy moments that become free marketing for your business.",
              },
              {
                title: "Conversation Starters",
                description:
                  '"Is that a real cookie?" — a question that leads to smiles, engagement, and memorable customer experiences.',
              },
              {
                title: "Handmade in the USA",
                description:
                  "Every piece is sculpted by hand in Orlando, Florida. Support a small artist instead of overseas factories.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.8rem] bg-cream p-6">
                <h3 className="font-display text-xl text-chocolate">{item.title}</h3>
                <p className="mt-3 text-chocolate-mid">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Popular picks"
              title="Best Sellers for Commercial Spaces"
              copy="These pieces are customer favorites for bakeries, cafés, dessert shops, and content studios."
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-card md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="Custom orders"
                  title="Your Bakery, Your Cookies"
                  copy="Need a cookie in your brand colors? A design that matches your menu? Custom pieces are available for businesses looking for that perfect fit."
                />
                <ul className="mt-6 space-y-3 text-chocolate-mid">
                  <li>· Custom color palettes to match your branding</li>
                  <li>· Specific sizes for your wall space</li>
                  <li>· Flavor-inspired designs (sprinkle cookies, seasonal themes)</li>
                  <li>· Multi-piece orders for larger spaces</li>
                  <li>· Typically ships within 2-3 weeks</li>
                </ul>
                <Link
                  href="/custom/"
                  className="mt-8 inline-flex rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
                >
                  Start a Custom Request
                </Link>
              </div>
              <Image
                src="/images/products/hot-pink-mm.jpg"
                alt="Custom hot pink M&M cookie wall art for brand matching"
                width={600}
                height={800}
                className="rounded-[1.8rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Common questions"
              title="FAQs for Bakeries & Cafés"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "How heavy is handmade cookie wall art vs commercial food props?",
                  answer:
                    "Handmade cookie sculptures weigh 2-5 pounds, while commercial fiberglass props often weigh 10+ pounds. The lightweight construction makes installation easier and safer — no special anchors or contractor needed.",
                },
                {
                  question: "Can I get custom cookie wall art in my bakery's brand colors?",
                  answer:
                    "Absolutely! Custom pieces can be created in specific colors to match your branding. Visit the custom orders page to share your vision and get a quote.",
                },
                {
                  question: "How much does bakery wall decor cost?",
                  answer:
                    "Single cookies range from $90-$115. Sets are $175-$225. Statement pieces like the ice cream sandwich are $220. All include free US shipping — significantly less than commercial props at $350+.",
                },
                {
                  question: "How durable are these pieces in a commercial setting?",
                  answer:
                    "Made from wood, clay, and acrylic paint, these sculptures are built to last. They're sealed for durability and designed for permanent display. Avoid direct contact with grease or extreme heat.",
                },
                {
                  question: "Do you offer bulk or multi-location discounts?",
                  answer:
                    "For orders of multiple pieces or multi-location businesses, reach out through the custom form to discuss pricing. We're happy to work with you on larger projects.",
                },
                {
                  question: "What's the lead time for custom orders?",
                  answer:
                    "Custom pieces typically take 2-3 weeks from order to ship. For urgent needs or specific deadlines, mention your timeline in the custom request form.",
                },
              ].map((faq) => (
                <div key={faq.question} className="rounded-[1.5rem] bg-cream p-6">
                  <h3 className="font-display text-lg text-chocolate">{faq.question}</h3>
                  <p className="mt-3 text-chocolate-mid">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="overflow-hidden rounded-[2.4rem] bg-pink px-8 py-14 text-white md:px-14">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Ready to upgrade your walls?</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">
              Your bakery deserves decor that sparks joy
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Browse the collection to find your perfect piece, or start a custom request for
              something uniquely yours. Every cookie ships free and is ready to hang.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/wall-art/"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate hover:bg-cream"
              >
                Shop Cookie Wall Art
              </Link>
              <Link
                href="/custom/"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Request Custom Piece
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
