import { Image } from "@/components/Image";
import Link from "next/link";
import { formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group" itemScope itemType="https://schema.org/Product">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="overflow-hidden rounded-[1.6rem] bg-cream-deep shadow-card">
          <Image
            src={product.image}
            alt={`${product.name} — handmade oversized cookie wall art sculpture`}
            width={800}
            height={1066}
            className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3
              className="font-display text-xl leading-tight text-chocolate"
              itemProp="name"
            >
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-chocolate-soft">{product.size}</p>
          </div>
          <p
            className="rounded-full bg-pink-blush px-3 py-1 text-sm font-medium text-chocolate"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <span itemProp="price" content={String(product.price)}>
              {formatPrice(product.price)}
            </span>
            <meta itemProp="priceCurrency" content="USD" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
          </p>
        </div>
      </Link>
    </article>
  );
}
