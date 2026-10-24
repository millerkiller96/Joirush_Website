import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";

export const metadata: Metadata = {
  title: {
    absolute: "Oversized Food Wall Art | 3D Food Sculpture & Faux Food Wall Sculptures | JOIRUSH",
  },
  description:
    "Shop handmade oversized food wall art and 3D wall sculptures by JOIRUSH. Realistic faux food and fake food pop art sculpture cookies sculpted by hand in Queens, NY. Lightweight sculptural wall art with free U.S. shipping.",
  keywords: [
    "oversized food wall art",
    "sculptural wall art",
    "wall sculptures",
    "faux food",
    "fake food",
    "food art",
    "food sculpture",
    "pop art sculpture",
    "3d food wall art",
    "giant cookie wall art",
    "faux food wall decor",
    "cookie wall sculpture",
    "pop art food sculpture",
    "dessert wall art",
    "giant food prop wall decor",
    "handmade food art",
  ],
  alternates: {
    canonical: "/oversized-food-wall-art/",
  },
  openGraph: {
    title: "Oversized Food Wall Art | 3D Food Sculpture & Sculptural Wall Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D cookie wall sculptures and faux food art. Realistic fake food pop art sculpture made by hand in Queens, NY with free U.S. shipping.",
    url: "https://joirush.com/oversized-food-wall-art/",
    type: "website",
    images: [
      {
        url: "/images/products/choc-chip.jpg",
        width: 1200,
        height: 900,
        alt: "Oversized chocolate chip cookie 3D food wall art sculpture by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oversized Food Wall Art | 3D Food Sculpture & Faux Food Art | JOIRUSH",
    description:
      "Handmade 14 to 16 inch 3D cookie wall sculptures and sculptural wall art. Lightweight, ready to hang, free U.S. shipping.",
    images: ["/images/products/choc-chip.jpg"],
  },
};

const faqs = [
  {
    question: "What is oversized food wall art?",
    answer:
      "Oversized food wall art is three dimensional sculptural wall art shaped like larger than life treats and desserts. At JOIRUSH, every food sculpture is a handmade 14 to 16 inch cookie or ice cream sandwich crafted in Queens, NY by artist Erynn. It blends realistic faux food texture with joyful pop art sculpture energy for kitchens, dining rooms, bedrooms, apartments, and home studios.",
  },
  {
    question: "What are JOIRUSH fake food wall sculptures made of?",
    answer:
      "Each food sculpture is built on a solid plywood base with hand sculpted spray foam and custom mixed acrylic paint. This faux food process keeps our wall sculptures durable, lightweight at 2 to 4 lbs, and ready to hang right out of the box.",
  },
  {
    question: "How do I hang a giant 3D cookie sculpture on my wall?",
    answer:
      "Every JOIRUSH cookie wall sculpture comes with built in hanging hardware on the back. Because each piece of sculptural wall art weighs only 2 to 4 lbs, a single standard wall hook, nail, or picture hanger holds it securely on drywall or plaster.",
  },
  {
    question: "Are each of the faux food sculptures unique?",
    answer:
      "Yes. Every piece of fake food art is sculpted and painted individually by hand in our Queens, NY studio, so no two cookies have the exact same crumb texture, chocolate chip placement, or candy color pattern.",
  },
];

export default function OversizedFoodWallArtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://joirush.com/oversized-food-wall-art/",
        name: "Oversized Food Wall Art | 3D Cookie Wall Sculptures & Faux Food Art",
        description:
          "Handmade oversized food wall art, sculptural wall art, and 3D cookie wall sculptures crafted in Queens, NY by JOIRUSH.",
        url: "https://joirush.com/oversized-food-wall-art/",
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
            name: "Oversized Food Wall Art",
            item: "https://joirush.com/oversized-food-wall-art/",
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
            <li className="font-semibold text-espresso">Oversized Food Wall Art</li>
          </ol>
        </nav>

        <header className="mb-12 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">
                Handmade in Queens, NY • Free U.S. Shipping
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-espresso">
                Oversized Food Wall Art &amp; 3D Cookie Wall Sculptures
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-cocoa/85">
                Flat prints blend into the background. <strong>Oversized food wall art</strong> turns a plain wall into the happiest spot in your home. Each JOIRUSH piece is a 14 to 16 inch handmade <strong>food sculpture</strong> sculpted from lightweight foam and hand painted in Queens, NY by artist Erynn to look warm, golden, and fresh from the oven.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-cocoa/80">
                Whether you love realistic <strong>faux food</strong>, playful <strong>fake food</strong> display pieces, or bold <strong>pop art sculpture</strong> for your kitchen, apartment, bedroom, or home studio, our 3D <strong>wall sculptures</strong> hang in seconds from a single standard hook or nail.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#collection"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-caramel"
                >
                  Shop All 11 Sculptures
                </a>
                <Link
                  href="/faux-food-wall-art/"
                  className="inline-flex items-center justify-center rounded-full border border-espresso/20 bg-cream px-6 py-3 text-sm font-semibold text-espresso transition hover:border-caramel hover:text-caramel"
                >
                  Explore Faux Food Art
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-caramel/15 bg-sand shadow-soft">
                <Image
                  src="/images/products/choc-chip.jpg"
                  alt="Oversized chocolate chip cookie 3D food sculpture hanging on wall"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </header>

        <section id="collection" className="scroll-mt-20">
          <SectionHeading
            eyebrow="The Collection"
            title="Shop Oversized 3D Cookie Wall Sculptures"
            copy="Every piece of sculptural wall art is sculpted and painted by hand in Queens, NY. Free shipping on every U.S. order."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 rounded-3xl border border-caramel/20 bg-warm-white p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
              Why Home Collectors Love Sculptural Food Art
            </h2>
            <ul className="mt-5 space-y-4 text-sm sm:text-base text-cocoa/85">
              <li>
                <strong className="text-espresso">Hand sculpted 3D texture:</strong> Unlike flat canvas prints or posters, our <strong>sculptural wall art</strong> projects 2 to 3 inches off the wall with realistic golden dough folds, glossy chocolate chips, and candy shell shine.
              </li>
              <li>
                <strong className="text-espresso">Lightweight and renter friendly:</strong> Built on a sturdy wood backing with sculpted spray foam, each piece of <strong>faux food</strong> art weighs just 2 to 4 lbs and hangs from one nail or picture hook.
              </li>
              <li>
                <strong className="text-espresso">True pop art sculpture energy:</strong> Inspired by classic giant food art and sweet nostalgia, a jumbo cookie <strong>food sculpture</strong> brings warmth and humor to apartments, dorms, kitchens, and collector walls.
              </li>
              <li>
                <strong className="text-espresso">Bundle and save on gallery walls:</strong> Buy 4 or more cookies in any mix of styles and get 10% off each cookie.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
              Where to Style Faux Food &amp; Fake Food Wall Art
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-cocoa/85">
              Our collectors hang JOIRUSH <strong>food art</strong> and 3D <strong>wall sculptures</strong> in rooms that deserve a daily smile:
            </p>
            <ul className="mt-4 space-y-3 text-sm sm:text-base text-cocoa/85">
              <li>
                • <Link href="/kitchen-wall-art/" className="font-semibold text-caramel underline hover:text-espresso">Kitchens &amp; Coffee Bars</Link>: Hang a <Link href="/product/jumbo-chocolate-chip-cookie/" className="underline hover:text-caramel">Jumbo Chocolate Chip Cookie</Link> or <Link href="/product/giant-peanut-butter-cookie/" className="underline hover:text-caramel">Giant Peanut Butter Cookie</Link> above your espresso setup or breakfast nook.
              </li>
              <li>
                • <Link href="/dopamine-decor-wall-art/" className="font-semibold text-caramel underline hover:text-espresso">Dopamine Decor Bedrooms &amp; Studios</Link>: Anchor a joyful gallery wall with the <Link href="/product/cookie-ice-cream-sandwich/" className="underline hover:text-caramel">Cookie Ice Cream Sandwich</Link> or <Link href="/product/rainbow-candy-cookie/" className="underline hover:text-caramel">Rainbow Candy Cookie</Link>.
              </li>
              <li>
                • <Link href="/pink-wall-art/" className="font-semibold text-caramel underline hover:text-espresso">Pink Rooms &amp; Coquette Spaces</Link>: Style the <Link href="/product/hot-pink-mm-cookie/" className="underline hover:text-caramel">Hot Pink M&amp;M Cookie</Link> or <Link href="/product/jumbo-pastel-mm-cookie/" className="underline hover:text-caramel">Pastel M&amp;M Cookie</Link> above a vanity, desk, or reading corner.
              </li>
              <li>
                • <Link href="/blog/foodie-gift-guide-jumbo-cookie-sculptures/" className="font-semibold text-caramel underline hover:text-espresso">Unforgettable Gifts for Bakers &amp; Foodies</Link>: Surprise the home baker or sweet tooth in your life with realistic <strong>fake food</strong> wall art that never goes stale.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-caramel/20 bg-sand/50 p-8 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Handmade 3D Cookie Wall Sculptures vs. Flat Wall Prints
          </h2>
          <p className="mt-2 text-sm sm:text-base text-cocoa/80">
            See why home collectors choose three dimensional <strong>sculptural wall art</strong> over standard posters and framed prints:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-caramel/25 text-espresso">
                  <th className="py-3 pr-4 font-semibold">Feature</th>
                  <th className="py-3 px-4 font-semibold">JOIRUSH 3D Food Sculpture</th>
                  <th className="py-3 pl-4 font-semibold">Standard Framed Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-caramel/15 text-cocoa/85">
                <tr>
                  <td className="py-3 pr-4 font-medium text-espresso">Depth &amp; Texture</td>
                  <td className="py-3 px-4">14 to 16 inches wide, 2 to 3 inches of 3D depth</td>
                  <td className="py-3 pl-4">Flat paper or canvas behind glass</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-espresso">Craftsmanship</td>
                  <td className="py-3 px-4">Hand sculpted spray foam on wood base with acrylic paint</td>
                  <td className="py-3 pl-4">Machine printed in bulk</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-espresso">Uniqueness</td>
                  <td className="py-3 px-4">One of a kind crumb and chip placement on every piece</td>
                  <td className="py-3 pl-4">Identical copies</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-espresso">Installation</td>
                  <td className="py-3 px-4">2 to 4 lbs with built in hanger, hangs on one hook</td>
                  <td className="py-3 pl-4">Requires framing and leveling hardware</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-espresso">
            Frequently Asked Questions About Oversized Food Wall Art
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
            Related Wall Art Collections &amp; Guides
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <Link href="/faux-food-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Faux Food &amp; Fake Cookie Wall Art
            </Link>
            <Link href="/dopamine-decor-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Dopamine Decor Wall Art
            </Link>
            <Link href="/pink-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Pink Wall Art &amp; Room Decor
            </Link>
            <Link href="/kitchen-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Kitchen &amp; Coffee Bar Wall Art
            </Link>
            <Link href="/colorful-wall-art/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Colorful 3D Wall Art
            </Link>
            <Link href="/blog/fake-food-and-fake-cookies-for-wall-decor/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              Fake Food &amp; Fake Cookies Guide
            </Link>
            <Link href="/blog/3d-wall-art-vs-flat-prints/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              3D Wall Art vs. Flat Prints
            </Link>
            <Link href="/blog/spray-foam-cookie-wall-art-how-theyre-made/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              How Spray Foam Cookie Art Is Made
            </Link>
            <Link href="/blog/jumbo-cookie-wall-art-size-guide/" className="rounded-full bg-sand px-4 py-1.5 font-medium text-espresso hover:bg-caramel hover:text-cream transition">
              14 Inch vs. 16 Inch Size Guide
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
