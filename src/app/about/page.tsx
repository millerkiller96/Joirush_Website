import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { reviews, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Erynn, mixed media artist and owner of JOIRUSH in Orlando, Florida. Handmade cookies, chokers, sneakers, and wall art.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">{site.studioLine}</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-chocolate md:text-6xl">
          A mixed media artist obsessed with sweet, nostalgic, over-the-top fun.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-chocolate-mid">
          Welcome to Joi Rush by EBABYxo. {site.artist} is the owner and creative designer behind
          every cookie, choker, and custom piece. Handmade everything with love — from an Orlando
          studio, shipping out of Florida.
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
            <h2 className="font-display text-4xl text-chocolate">The shop story</h2>
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
                <dt className="text-xs uppercase tracking-widest text-chocolate-soft">{label}</dt>
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

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <h2 className="font-display text-4xl text-chocolate">What collectors say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote key={review.name + review.piece} className="rounded-[1.8rem] bg-white p-6 shadow-card">
              <p className="text-chocolate-mid">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium">
                {review.name} · {review.piece}
              </p>
            </blockquote>
          ))}
        </div>
        <Link
          href="/catalogue"
          className="mt-10 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream"
        >
          Shop the catalogue
        </Link>
      </section>
    </div>
  );
}
