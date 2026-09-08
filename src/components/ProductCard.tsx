import { Image } from "@/components/Image";
import Link from "next/link";
import { formatPrice, type Product, calculateSavings } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { percent } = calculateSavings(product.price, product.compareAtPrice);

  return (
    <article className="group" itemScope itemType="https://schema.org/Product">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-cream-deep shadow-card">
          <Image
            src={product.image}
            alt={`Cookie art - ${product.shortName} sugar cookie wall sculpture by cookie artist Erynn`}
            width={800}
            height={1066}
            className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-success px-2.5 py-1 text-sm font-bold text-white">
            {percent}% off
          </span>
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
          <div className="text-right">
            <p className="rounded-full bg-success/10 px-3 py-1 text-sm font-bold text-success-dark">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-sm text-chocolate-soft line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
