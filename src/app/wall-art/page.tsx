import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Cookie Wall Art",
  description:
    "Handmade jumbo cookie sculptures for kitchens, cafés, bakeries, and content studios. Wood, clay, and acrylic paint with built-in hangers.",
};

export default function WallArtPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">Dessert sculptures</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-chocolate md:text-6xl">
            Jumbo cookie wall art
          </h1>
          <p className="mt-5 text-lg text-chocolate-mid">
            Oversized, hyper-real dessert sculptures that look good enough to eat and last forever
            on the wall. Classic chocolate chip, candyland M&Ms, peanut butter, holiday cookies, and
            ice cream sandwiches — all handmade, all one of a kind.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white"
            >
              Shop cookies
            </Link>
            <Link
              href="/custom"
              className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
            >
              Commission a flavor
            </Link>
          </div>
        </div>
        <Image
          src="/images/products/mm-set.jpg"
          alt="Jumbo M&M cookie wall art set"
          width={1000}
          height={1333}
          className="rounded-[2.2rem] object-cover shadow-card"
          priority
        />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="How they’re made"
            title="Wood, clay, paint — then the sugar rush"
            copy="Each cookie is built as a lightweight sculpture with a built-in hanger. The craggy dough, glossy chips, and candy pieces are hand-finished so the texture reads from across the room."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Sculpted texture",
                copy: "Thick, bakery-case surfaces — bubbles, crags, and that just-baked edge.",
              },
              {
                title: "Ready to hang",
                copy: "Built-in wall hangers. Ships from Florida with free U.S. shipping.",
              },
              {
                title: "Made for rooms",
                copy: "Kitchens, cafés, bakeries, playrooms, dessert bars, and content studios.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.8rem] bg-cream p-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-chocolate-mid">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <SectionHeading eyebrow="The collection" title="Every cookie on the wall" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
