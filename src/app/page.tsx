import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { getFeaturedProducts } from "@/data/products";
import { reviews, site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "JOIRUSH — Cookie Art & Sugar Cookie Wall Sculptures by Cookie Artist Erynn",
  description:
    "Shop handmade cookie art by cookie artist Erynn. Sugar cookie wall sculptures, jumbo cookie canvas pieces, and faux food wall art. Decorative art cookies that look real but last forever. Starting at $90, free US shipping from Orlando.",
  keywords: [
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "cookie canvas",
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "faux food wall art",
    "giant cookie sculpture",
    "handmade cookie wall art Orlando",
    "chocolate chip cookie wall art",
    "kitschy kitchen wall art",
  ],
  openGraph: {
    title: "JOIRUSH — Cookie Art & Sugar Cookie Wall Sculptures by Cookie Artist Erynn",
    description:
      "Handmade cookie art and sugar cookie wall sculptures by Orlando cookie artist. Art cookies that look real but last forever — faux food wall art for kitchens and homes.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/choc-chip.jpg"),
        width: 1200,
        height: 630,
        alt: "Cookie art - handmade sugar cookie wall sculpture by cookie artist Erynn",
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
      "Cookie art studio creating handmade sugar cookie wall sculptures and faux food wall art by cookie artist Erynn in Orlando, Florida.",
    founder: {
      "@type": "Person",
      name: site.artist,
      jobTitle: "Cookie Artist",
      description: "Cookie artist creating handmade sugar cookie art and faux food wall sculptures",
      knowsAbout: ["cookie art", "sugar cookie art", "faux food sculpture", "art cookies"],
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
    description: "Cookie art and sugar cookie wall sculptures by cookie artist Erynn. Handmade faux food wall art and art cookies.",
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };

  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.artist,
    jobTitle: "Cookie Artist",
    description: "Orlando-based cookie artist creating handmade sugar cookie wall sculptures, cookie art, and faux food wall decor",
    url: getAbsoluteUrl("/about/"),
    worksFor: {
      "@type": "Organization",
      name: site.name,
    },
    knowsAbout: [
      "cookie art",
      "sugar cookie art",
      "faux food wall art",
      "cookie canvas",
      "art cookies",
      "giant cookie sculpture",
    ],
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }}
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
            Handmade in {site.location} · Ships in {site.shippingTime} · Free U.S. shipping · {site.stats.rating} stars from{" "}
            {site.stats.reviews} collectors
          </p>
        </div>

        <section className="relative overflow-hidden grain">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-pink">
                Cookie Art by Cookie Artist Erynn
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] text-chocolate md:text-7xl">
                Sugar Cookie Wall Art That Stops People Mid-Sentence
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-chocolate-mid">
                Golden-brown crumble. Glossy melty chips. Thick, craggy edges begging for a bite. 
                These <strong>handmade cookie art sculptures</strong> look so real, guests will reach out 
                before their brain catches up. Each <strong>sugar cookie wall sculpture</strong> is crafted 
                by cookie artist Erynn — decorative art cookies that are wall-ready, lightweight, and permanently satisfying.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-chocolate-mid">
                <li>✓ Handmade to order</li>
                <li>✓ Ships in {site.shippingTime}</li>
                <li>✓ Free U.S. shipping</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/wall-art/"
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Shop Cookie Art
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
                  <dt className="text-sm uppercase tracking-widest text-chocolate-soft">Rating</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.rating}</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-widest text-chocolate-soft">Happy Homes</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.sales}+</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-widest text-chocolate-soft">Years</dt>
                  <dd className="mt-1 font-display text-3xl">{site.stats.years}</dd>
                </div>
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-24 w-24 rounded-full bg-mint/70 md:block" />
              <div className="absolute -right-4 bottom-10 hidden h-16 w-16 rounded-full bg-pink/70 md:block" />
              <Image
                src="/images/products/choc-chip.jpg"
                alt="Cookie art - handmade sugar cookie wall sculpture by cookie artist Erynn - jumbo chocolate chip faux food wall art"
                width={900}
                height={1200}
                priority
                className="relative rounded-[2.4rem] object-cover shadow-lift"
              />
            </div>
          </div>
        </section>

        <StudioVideoCarousel />

        <section className="mx-auto max-w-7xl px-5 py-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/wall-art/",
                title: "Cookie Art Collection",
                copy: "Sugar cookie wall sculptures — the conversation starter your kitchen didn't know it needed.",
                image: "/images/products/rainbow.jpg",
              },
              {
                href: "/catalogue/",
                title: "All Art Cookies",
                copy: "Every flavor, every size. Find the cookie canvas that makes your heart skip.",
                image: "/images/products/mm-set.jpg",
              },
              {
                href: "/custom/",
                title: "Custom Cookie Art",
                copy: "Your colors. Your vibe. A one-of-one piece made just for you by the cookie artist.",
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
              eyebrow="Bestselling cookie art"
              title="The Ones Collectors Can't Stop Buying"
              copy="Golden chips. Candy pops. That just-baked texture you can practically smell. These sugar cookie wall sculptures are the art cookies that sell out first."
            />
            <Link href="/wall-art/" className="text-sm font-medium text-pink hover:underline">
              See the full cookie art collection →
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
              eyebrow="Real cookie art, not mass-produced props"
              title="Handmade Sugar Cookie Wall Sculptures"
              copy="Forget those $350+ fiberglass blobs. These are real cookie artist sculptures — faux food wall art light enough to hang anywhere, detailed enough to fool everyone."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {[
                {
                  stat: "2-4 lbs",
                  label: "Featherweight",
                  copy: "Hangs on a single nail. No contractor needed.",
                },
                {
                  stat: "$90–$225",
                  label: "Real Art Pricing",
                  copy: "Not $350+ for factory fiberglass.",
                },
                {
                  stat: "14 Days",
                  label: "Made For You",
                  copy: "Sculpted by hand, shipped with love.",
                },
                {
                  stat: "Free",
                  label: "U.S. Shipping",
                  copy: "No hidden fees. Just dopamine.",
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
              alt="Erynn - cookie artist and owner of JOIRUSH - creating handmade sugar cookie art and faux food wall sculptures in Orlando"
              width={900}
              height={1200}
              className="rounded-[2.2rem] object-cover"
            />
            <div>
              <SectionHeading
                eyebrow="Meet the cookie artist"
                title="Every Sugar Cookie Sculpture Has Her Fingerprints On It"
                copy="Cookie artist Erynn sculpts each piece by hand in her Orlando studio — obsessed with nostalgic sweetness, maximalist color, and cookie art that makes you feel something."
              />
              <p className="mt-5 text-chocolate-mid">
                Dream up a custom flavor. Match your kitchen palette. Go completely wild. 
                If you can imagine it, she can sculpt it into cookie canvas art that looks good enough to eat.
              </p>
              <Link
                href="/about/"
                className="mt-8 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream hover:bg-pink"
              >
                Meet the Cookie Artist
              </Link>
            </div>
          </div>
        </section>

        <EtsyReviewsHub />

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="rounded-[2rem] bg-cream p-8 md:p-12">
            <h2 className="font-display text-3xl text-chocolate">
              Cookie Art Tips & Inspiration
            </h2>
            <p className="mt-3 max-w-2xl text-chocolate-mid">
              How to hang your sugar cookie wall sculpture. How to build a dessert gallery wall with art cookies that sparks joy. 
              Tips from the cookie artist's studio to make your space unforgettable.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link
                href="/blog/how-to-hang-jumbo-cookie-wall-art/"
                className="group rounded-xl bg-white p-5 shadow-card hover:shadow-lift"
              >
                <p className="text-sm font-medium uppercase tracking-wider text-pink">5-Minute Guide</p>
                <h3 className="mt-2 font-display text-xl text-chocolate group-hover:text-pink">
                  How to Hang Your Cookie Art Sculpture
                </h3>
              </Link>
              <Link
                href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/"
                className="group rounded-xl bg-white p-5 shadow-card hover:shadow-lift"
              >
                <p className="text-sm font-medium uppercase tracking-wider text-pink">Gallery Inspo</p>
                <h3 className="mt-2 font-display text-xl text-chocolate group-hover:text-pink">
                  Build a Sugar Cookie Art Gallery Wall
                </h3>
              </Link>
            </div>
            <Link href="/blog/" className="mt-6 inline-flex text-pink hover:underline">
              More ideas on the blog →
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
          <div className="overflow-hidden rounded-[2.4rem] bg-emerald-600 px-8 py-14 text-white md:px-14">
            <p className="text-sm uppercase tracking-[0.22em] text-white/70">Custom cookie art</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
              Have a flavor fantasy? The cookie artist will make it real.
            </h2>
            <p className="mt-4 max-w-xl text-white/85">
              Hot pink. Pastel rainbow. Your kitchen's exact shade of teal. Tell me the vibe, 
              and I'll sculpt a one-of-one sugar cookie wall sculpture that's yours forever. Handmade cookie art 
              from Orlando, ships in 14 days, free U.S. shipping.
            </p>
            <Link
              href="/custom/"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Start Your Custom Cookie Art
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
