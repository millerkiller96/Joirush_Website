import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Y2K Jewelry",
  description:
    "Handmade Y2K charm chokers and statement jewelry by JoiRush — Tamagotchi energy, gamer-girl custom pieces, and one-of-one accessories.",
};

const commissions = [
  {
    title: "Tamagotchi charm chokers",
    copy: "Layered Y2K necklaces with virtual-pet energy — collectors have loved the pink and purple versions.",
  },
  {
    title: "Gamer girl customs",
    copy: "Cosplay-ready, kawaii, and one-of-one. Retro games, keys, and hardware charms on faux leather.",
  },
  {
    title: "Statement layers",
    copy: "Maximal silver, vintage keys, and charm stacks made to look like nobody else in the room.",
  },
];

export default function JewelryPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <Image
          src="/images/brand/about-1.jpg"
          alt="Handmade JOIRUSH charm jewelry"
          width={900}
          height={1200}
          className="rounded-[2.2rem] object-cover shadow-card"
          priority
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">Accessories</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
            Y2K jewelry, made to be a main character
          </h1>
          <p className="mt-5 text-lg text-chocolate-mid">
            JoiRush isn&apos;t only cookies. Erynn also builds custom chokers and statement jewelry —
            Tamagotchi charms, gamer-girl pieces, vintage keys, and layered Y2K stacks. The current
            Etsy shelf is cookie-heavy. Jewelry lives here as custom work, made for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/custom"
              className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white"
            >
              Commission jewelry
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
            >
              See {site.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      <StudioVideoCarousel />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="What people order"
            title="Charm chokers with a sugar-rush attitude"
            copy="Past collectors asked for Tamagotchi chokers, yellow faux-leather gamer pieces, and one-of-one stacks. Erynn still makes them — just tell her the palette."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {commissions.map((item) => (
              <div key={item.title} className="rounded-[1.8rem] bg-cream p-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-chocolate-mid">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <SectionHeading
            eyebrow="The reviews"
            title="“Extraordinary designer.”"
            copy="Buyers talk about construction, gifts, and how quickly Erynn answers. Jewelry pieces have been called gorgeous, well made, and truly unique."
          />
          <Link href="/custom" className="mt-8 inline-flex text-sm font-medium text-pink hover:underline">
            Start with a custom brief
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="/images/brand/about-2.jpg"
            alt=""
            width={600}
            height={800}
            className="h-64 w-full rounded-[1.6rem] object-cover"
          />
          <Image
            src="/images/brand/about-3.jpg"
            alt=""
            width={600}
            height={800}
            className="h-64 w-full rounded-[1.6rem] object-cover"
          />
        </div>
      </section>
    </div>
  );
}
