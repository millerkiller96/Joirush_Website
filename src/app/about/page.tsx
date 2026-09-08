import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "About JOIRUSH | Handmade Jumbo Cookie Wall Art by Erynn",
  description:
    "Meet Erynn, the artist behind JOIRUSH handmade jumbo cookie wall art. Creating oversized fake cookie sculptures in Orlando, Florida since 2021. Shop realistic dessert wall decor.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About JOIRUSH | Handmade Jumbo Cookie Wall Art by Erynn",
    description:
      "Meet Erynn, the artist creating handmade jumbo cookie wall art in Orlando, Florida.",
    type: "website",
    url: `${siteUrl}/about`,
    images: [
      {
        url: `${siteUrl}/images/brand/about-1.jpg`,
        width: 1200,
        height: 630,
        alt: "Erynn, artist and owner of JOIRUSH",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">{site.studioLine}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-chocolate md:text-6xl">
          Sweet, nostalgic, over-the-top. That&apos;s the whole vibe.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-chocolate-mid">
          {site.artist} is the hands behind every cookie sculpture, every Y2K choker, every custom
          piece that makes people do a double-take. Working out of her Orlando studio, she creates
          art that sparks joy, starts conversations, and looks good enough to eat. Each piece ships
          in 14 days — because real artistry takes time.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 md:grid-cols-3 md:px-8">
        <Image
          src="/images/brand/about-1.jpg"
          alt="Erynn wearing handmade JOIRUSH jewelry"
          width={800}
          height={1100}
          className="h-[28rem] w-full rounded-[2rem] object-cover md:col-span-2"
        />
        <div className="grid gap-4">
          <Image
            src="/images/brand/avatar.jpg"
            alt="JOIRUSH artist portrait"
            width={400}
            height={400}
            className="h-44 w-full rounded-[2rem] object-cover"
          />
          <Image
            src="/images/brand/about-5.jpg"
            alt="JOIRUSH studio and process"
            width={600}
            height={800}
            className="h-64 w-full rounded-[2rem] object-cover"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl text-chocolate">How it all started</h2>
            <p className="mt-5 text-chocolate-mid">
              JoiRush started as a place for art that feels like a sugar high — jumbo realistic
              cookies and cakes, Y2K accessories, and custom work that doesn’t exist anywhere else.
              Whether you&apos;re decorating a kitchen, sprucing up a studio, or hunting for a
              statement gift, the work is made to turn heads and spark smiles.
            </p>
            <p className="mt-4 text-chocolate-mid">
              Custom orders are always open. Follow {site.instagramHandle} and{" "}
              {site.instagramAltHandle} for sneak peeks, behind-the-scenes, and exclusive drops.
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
        <h2 className="font-display text-4xl text-chocolate">From the studio wall</h2>
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
          Find your perfect cookie
        </Link>
      </section>
    </div>
  );
}
