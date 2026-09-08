import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl } from "@/lib/seo";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Meet Cookie Artist Erynn | Handmade Sugar Cookie Art & Faux Food Wall Sculptures",
  description:
    "Meet Erynn, the Orlando cookie artist behind JOIRUSH. Creating handmade cookie art, sugar cookie wall sculptures, and faux food wall art since 2021. Each art cookie is hand-sculpted in her Florida studio.",
  keywords: [
    "cookie artist",
    "cookie art",
    "sugar cookie art",
    "handmade cookie wall art Orlando",
    "faux food wall art",
    "art cookies",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "Meet Cookie Artist Erynn | Handmade Sugar Cookie Art",
    description:
      "Meet Erynn, the Orlando cookie artist creating handmade sugar cookie wall sculptures and faux food wall art.",
    type: "website",
    url: `${siteUrl}/about`,
    images: [
      {
        url: `${siteUrl}/images/brand/about-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Cookie artist Erynn - creator of handmade sugar cookie art at JOIRUSH",
      },
    ],
  },
};

function CookieArtistSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.artist,
    jobTitle: "Cookie Artist",
    description: "Orlando-based cookie artist creating handmade sugar cookie wall sculptures, cookie art, and faux food wall decor. Each art cookie is hand-sculpted using spray foam and acrylic paint.",
    url: getAbsoluteUrl("/about/"),
    image: getImageUrl("/images/brand/about-1.jpg"),
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    knowsAbout: [
      "cookie art",
      "sugar cookie art",
      "faux food wall art",
      "cookie canvas",
      "art cookies",
      "giant cookie sculpture",
      "oversized cookie wall decor",
      "handmade cookie wall art",
    ],
    workLocation: {
      "@type": "Place",
      name: "JOIRUSH Studio",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    sameAs: [site.instagram, site.etsy],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <CookieArtistSchema />
      <div>
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">Meet the Cookie Artist</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-chocolate md:text-6xl">
            Cookie Artist Erynn: Sugar Cookie Art That Stops People Mid-Sentence
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chocolate-mid">
            {site.artist} is the cookie artist behind every sugar cookie wall sculpture, every art cookie, every custom
            piece that makes people do a double-take. Working out of her Orlando studio, she creates
            handmade cookie art that sparks joy, starts conversations, and looks good enough to eat. Each cookie canvas ships
            in 14 days — because real artistry takes time.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-8">
          <Image
            src="/images/brand/about-1.jpg"
            alt="Cookie artist Erynn - creator of handmade sugar cookie art and faux food wall sculptures at JOIRUSH"
            width={800}
            height={1100}
            className="h-[28rem] w-full rounded-[2rem] object-cover md:col-span-2"
          />
          <div className="grid gap-4">
            <Image
              src="/images/brand/avatar.jpg"
              alt="Cookie artist portrait - Erynn of JOIRUSH"
              width={400}
              height={400}
              className="h-44 w-full rounded-[2rem] object-cover"
            />
            <Image
              src="/images/brand/about-5.jpg"
              alt="Cookie art studio - where sugar cookie wall sculptures are handmade"
              width={600}
              height={800}
              className="h-64 w-full rounded-[2rem] object-cover"
            />
          </div>
        </section>

      <StudioVideoCarousel />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl text-chocolate">How the Cookie Art Journey Started</h2>
            <p className="mt-5 text-chocolate-mid">
              JoiRush started as a place for cookie art that feels like a sugar high — jumbo realistic
              sugar cookie wall sculptures, faux food wall art, Y2K accessories, and custom art cookies that don’t exist anywhere else.
              Whether you&apos;re decorating a kitchen with cookie canvas pieces, sprucing up a studio, or hunting for a
              statement gift, the work is made to turn heads and spark smiles.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Custom cookie art commissions are always open. Follow {site.instagramHandle} for sneak peeks,
              behind-the-scenes from the cookie artist's studio, and exclusive drops.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["On Etsy since", "2021"],
              ["Shop rating", `${site.stats.rating} / 5`],
              ["Reviews", String(site.stats.reviews)],
              ["Sales", String(site.stats.sales)],
              ["Admirers", String(site.stats.admirers)],
              ["Based in", site.location],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.6rem] bg-cream p-5">
                <dt className="text-sm uppercase tracking-widest text-chocolate-soft">{label}</dt>
                <dd className="mt-2 font-display text-3xl text-chocolate">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="font-display text-4xl text-chocolate">From the Cookie Artist's Studio Wall</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["/images/brand/about-2.jpg", "/images/brand/about-3.jpg", "/images/brand/about-4.jpg"].map(
            (src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={700}
                height={900}
                className="h-80 w-full rounded-[1.8rem] object-cover"
              />
            ),
          )}
        </div>
      </section>

      <EtsyReviewsHub />

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <Link
          href="/catalogue"
          className="inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream"
        >
          Find Your Perfect Cookie Art
        </Link>
      </section>
      </div>
    </>
  );
}
