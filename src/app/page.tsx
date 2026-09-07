import { Image } from "@/components/Image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedProducts } from "@/data/products";
import { reviews, site } from "@/data/site";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
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
              {site.studioLine}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-chocolate md:text-7xl">
              Where art meets <span className="italic text-pink">sugar rush</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-chocolate-mid">
              Jumbo realistic cookies, candyland sculptures, and Y2K statement pieces — handcrafted
              to bring joy, color, and a whole lot of personality to your space. Think dessert
              dreams, retro vibes, and zero calories.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue"
                className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
              >
                Browse the catalogue
              </Link>
              <Link
                href="/custom"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium text-chocolate hover:bg-white"
              >
                Request a custom piece
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-xs uppercase tracking-widest text-chocolate-soft">Rating</dt>
                <dd className="mt-1 font-display text-3xl">{site.stats.rating}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-chocolate-soft">Sales</dt>
                <dd className="mt-1 font-display text-3xl">{site.stats.sales}</dd>
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
              alt="Jumbo chocolate chip cookie wall art"
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
              href: "/wall-art",
              title: "Cookie wall art",
              copy: "Jumbo sculptures for kitchens, cafés, and content studios.",
              image: "/images/products/rainbow.jpg",
            },
            {
              href: "/jewelry",
              title: "Y2K jewelry",
              copy: "Charm chokers, Tamagotchi energy, one-of-one accessories.",
              image: "/images/brand/about-1.jpg",
            },
            {
              href: "/custom",
              title: "Custom orders",
              copy: "Got a flavor or aesthetic in mind? Let’s cook something up.",
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
            eyebrow="The drop"
            title="Featured sweets"
            copy="Statement cookies from the current Etsy shop — handmade, hangable, and dangerously realistic."
          />
          <Link href="/catalogue" className="text-sm font-medium text-pink hover:underline">
            See the full catalogue
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <Image
            src="/images/brand/about-1.jpg"
            alt="Erynn, owner and creative designer of JOIRUSH"
            width={900}
            height={1200}
            className="rounded-[2.2rem] object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="The artist"
              title="Handmade everything with love"
              copy="Erynn is a mixed media artist obsessed with all things sweet, nostalgic, and over-the-top fun. From jumbo cookies and cakes to Y2K-inspired accessories, every piece is made to turn heads and spark smiles."
            />
            <p className="mt-5 text-chocolate-mid">
              Custom chokers, sneakers, and wall art. If you can dream the flavor, she can sculpt it.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream hover:bg-pink"
            >
              Meet Erynn
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="5.0 from 31 reviews"
          title="Collectors keep coming back"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <blockquote key={review.name + review.piece} className="rounded-[1.8rem] bg-white p-6 shadow-card">
              <p className="text-chocolate-mid">&ldquo;{review.quote}&rdquo;</p>
              <p className="mt-5 text-sm">
                <span className="block font-medium text-chocolate">{review.name}</span>
                <span className="text-chocolate-soft">{review.piece}</span>
              </p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="overflow-hidden rounded-[2.4rem] bg-pink px-8 py-14 text-white md:px-14">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">Custom orders? Absolutely.</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">
            Got a flavor or aesthetic in mind?
          </h2>
          <p className="mt-4 max-w-xl text-white/85">
            Let’s cook up something unforgettable — cookies, chokers, sneakers, or a one-of-one you
            haven’t seen yet.
          </p>
          <Link
            href="/custom"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-chocolate"
          >
            Start a custom request
          </Link>
        </div>
      </section>
    </div>
  );
}
