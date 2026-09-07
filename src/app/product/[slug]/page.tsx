import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, getRelatedProducts, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.shortName,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <p className="text-sm text-chocolate-soft">
        <Link href="/catalogue" className="hover:text-pink">
          Catalogue
        </Link>{" "}
        / {product.shortName}
      </p>
      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
        <Image
          src={product.image}
          alt={product.name}
          width={1200}
          height={1600}
          priority
          className="rounded-[2.2rem] object-cover shadow-card"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
            Handmade wall art
          </p>
          <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-chocolate-soft">
            {product.size} · Free U.S. shipping · Ships from Florida
          </p>
          <p className="mt-6 text-lg leading-relaxed text-chocolate-mid">{product.description}</p>
          <ul className="mt-6 space-y-2 text-chocolate-mid">
            {product.details.map((detail) => (
              <li key={detail}>· {detail}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-chocolate-soft">Materials: {product.materials}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
            >
              Buy on Etsy
            </a>
            <Link
              href="/custom"
              className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
            >
              Want it custom?
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl text-chocolate">More from the bakery wall</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
