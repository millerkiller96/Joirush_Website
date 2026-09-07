import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedProducts } from "@/data/products";
import { reviews, site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "JOIRUSH — Jumbo Cookie Wall Art & Handmade Faux Food Sculptures",
  description:
    "Handmade jumbo cookie wall art, oversized faux food sculptures, and Y2K statement jewelry by Erynn in Orlando, Florida. Lightweight, hangable dessert decor starting at $90. Free US shipping.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "giant cookie wall art",
    "fake cookie wall sculpture",
    "faux food wall art",
    "chocolate chip cookie wall art",
    "handmade wall art Orlando Florida",
    "bakery wall decor",
    "kitschy kitchen wall art",
  ],
  openGraph: {
    title: "JOIRUSH — Jumbo Cookie Wall Art & Faux Dessert Sculptures",
    description:
      "Handmade oversized cookie sculptures and faux food wall art. Lightweight, hangable dessert decor for kitchens, bakeries, and cafés.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/choc-chip.jpg"),
        width: 1200,
        height: 630,
        alt: "Jumbo chocolate chip cookie wall art by JOIRUSH",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

function HomeJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: getImageUrl("/images/brand/avatar.jpg"),
    description:
      "Handmade jumbo cookie wall art and faux food sculptures by Erynn in Orlando, Florida.",
    founder: {
      "@type": "Person",
      name: site.artist,
      jobTitle: site.artistRole,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs: [site.instagram, site.etsy],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.rating,
      reviewCount: site.stats.reviews,
      bestRating: "5",
      worstRating: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: "Handmade jumbo cookie wall art and faux food sculptures.",
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <HomeJsonLd />
      <div>
        <div className="border-b border-chocolate/10 bg-chocolate text-center text-[13px] text-cream">
          <p className="px-4 py-2.5">
            Handmade in {site.location} · Free U.S. shipping · {site.stats.rating} stars from{" "}
            {site.stats.reviews} collectors
          </p>
        </div>

        <section className="relative overflow-hidden grain">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink">
                Handmade Faux Food Wall Art
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] text-chocolate md:text-7xl">
                Jumbo Cookie Wall Art & Dessert Sculptures
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-chocolate-mid">
                Hyper-realistic <strong>oversized cookie wall decor</strong> and faux food sculptures, 
                handcrafted in Orlando, Florida. Lightweight, hangable, and built to spark joy in kitchens, 
                <Link href="/for/bakeries-cafes/" className="text-pink hover:underline"> bakeries</Link>, 
                and beyond. Think <strong>giant cookie wall art</strong>, zero calories.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/wall-art/"
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Shop Cookie Wall Art
                </Link>
                <Link
                  href="/custom/"
                  className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium text-chocolate hover:bg-white"
                >
                  Request Custom Piece
                </Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chocolate-soft">Rating</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.rating}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chocolate-soft">Sales</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.sales}+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-chocolate-soft">Years</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.years}</dd>
                </div>
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-24 w-24 rounded-full bg-mint/70 md:block" />
              <div className="absolute -right-4 bottom-10 hidden h-16 w-16 rounded-full bg-pink/70 md:block" />
              <Image
                src="/images/products/choc-chip.jpg"
                alt="Jumbo chocolate chip cookie wall art - handmade faux food sculpture by JOIRUSH"
                width={900}
                height={1200}
                priority
                className="relative rounded-[2.4rem] object-cover shadow-lift"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/wall-art/",
                title: "Jumbo Cookie Wall Art",
                copy: "Oversized faux cookie sculptures for kitchens, bakeries, cafés, and content studios.",
                image: "/images/products/rainbow.jpg",
              },
              {
                href: "/for/bakeries-cafes/",
                title: "Bakeries & Cafés",
                copy: "Lightweight dessert decor for commercial spaces. Better than heavy fiberglass props.",
                image: "/images/products/mm-set.jpg",
              },
              {
                href: "/custom/",
                title: "Custom Orders",
                copy: "Got a flavor or aesthetic in mind? Commission a one-of-a-kind piece.",
                image: "/images/products/hot-pink-mm.jpg",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative overflow-hidden rounded-[2rem] bg-chocolate"
              >
                <Image
                  src={card.image}
                  alt=""
                  width={800}
                  height={600}
                  className="h-72 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <h2 className="font-display text-3xl">{card.title}</h2>
                  <p className="mt-2 text-sm text-cream/80">{card.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured faux food art"
              title="Bestselling Cookie Sculptures"
              copy="Statement pieces from the collection — handmade oversized cookie wall decor that's lightweight, hangable, and dangerously realistic."
            />
            <Link href="/wall-art/" className="text-sm font-medium text-pink hover:underline">
              See all cookie wall art
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <SectionHeading
              eyebrow="Why handmade"
              title="Lightweight Faux Cookie Sculptures"
              copy="Unlike heavy commercial food props, these artist-made pieces are built for real walls — lightweight, affordable, and ready to hang."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {[
                {
                  stat: "2-4 lbs",
                  label: "Lightweight",
                  copy: "Easy to hang with standard picture hooks",
                },
                {
                  stat: "$90–$225",
                  label: "Affordable",
                  copy: "Vs. $350+ for commercial fiberglass props",
                },
                {
                  stat: "Free",
                  label: "US Shipping",
                  copy: "Every piece ships free within the US",
                },
                {
                  stat: "Orlando, FL",
                  label: "Handmade",
                  copy: "Each piece sculpted by hand in Florida",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] bg-white p-5 text-center">
                  <p className="font-display text-2xl text-pink">{item.stat}</p>
                  <p className="mt-1 font-medium text-chocolate">{item.label}</p>
                  <p className="mt-2 text-sm text-chocolate-mid">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
            <Image
              src="/images/brand/about-1.jpg"
              alt="Erynn, owner and creative designer of JOIRUSH - maker of handmade cookie wall art"
              width={900}
              height={1200}
              className="rounded-[2.2rem] object-cover"
            />
            <div>
              <SectionHeading
                eyebrow="The artist"
                title="Handmade Everything With Love"
                copy="Erynn is a mixed media artist in Orlando, Florida obsessed with all things sweet, nostalgic, and over-the-top fun. From jumbo cookie wall art to Y2K-inspired accessories, every piece is made to turn heads."
              />
              <p className="mt-5 text-chocolate-mid">
                Custom <strong>faux cookie sculptures</strong>, wall art in your brand colors, or a one-of-one 
                design — if you can dream the flavor, she can sculpt it.
              </p>
              <Link
                href="/about/"
                className="mt-8 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream hover:bg-pink"
              >
                Meet Erynn
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <SectionHeading
            eyebrow={`${site.stats.rating} from ${site.stats.reviews} reviews`}
            title="Collectors Keep Coming Back"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <blockquote
                key={review.name + review.piece}
                className="rounded-[1.8rem] bg-white p-6 shadow-card"
              >
                <p className="text-chocolate-mid">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-5 text-sm">
                  <span className="block font-medium text-chocolate">{review.name}</span>
                  <span className="text-chocolate-soft">{review.piece}</span>
                </p>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="rounded-[2rem] bg-cream p-8 md:p-12">
            <h2 className="font-display text-3xl text-chocolate">
              Ideas & Inspiration
            </h2>
            <p className="mt-3 max-w-2xl text-chocolate-mid">
              From how to hang your jumbo cookies to creating the perfect dopamine decor kitchen, 
              explore tips and stories from the studio.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href="/blog/how-to-hang-jumbo-cookie-wall-art/"
                className="group rounded-xl bg-white p-5 shadow-card hover:shadow-lift"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-pink">How-To Guide</p>
                <h3 className="mt-2 font-display text-xl text-chocolate group-hover:text-pink">
                  How to Hang Jumbo Cookie Wall Art
                </h3>
              </Link>
              <Link
                href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/"
                className="group rounded-xl bg-white p-5 shadow-card hover:shadow-lift"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-pink">Inspiration</p>
                <h3 className="mt-2 font-display text-xl text-chocolate group-hover:text-pink">
                  Dopamine Decor: Creating a Dessert Gallery Wall
                </h3>
              </Link>
            </div>
            <Link href="/blog/" className="mt-6 inline-flex text-pink hover:underline">
              Read more on the blog →
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="overflow-hidden rounded-[2.4rem] bg-emerald-600 px-8 py-14 text-white md:px-14">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Custom cookie wall art</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              Got a flavor or aesthetic in mind?
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Commission a custom piece in your brand colors, favorite flavors, or unique design. 
              Every sculpture is handmade in Orlando, FL and ships free.
            </p>
            <Link
              href="/custom/"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Start a Custom Request
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
