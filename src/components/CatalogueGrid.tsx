"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categoryLabels, products, type ProductCategory } from "@/data/products";

const filters: Array<ProductCategory | "all"> = [
  "all",
  "classic",
  "candy",
  "set",
  "seasonal",
  "statement",
];

export function CatalogueGrid() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const visible = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === value
                ? "bg-chocolate text-cream"
                : "bg-white text-chocolate-mid hover:bg-pink-blush"
            }`}
          >
            {categoryLabels[value]}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-chocolate-soft">{visible.length} handmade pieces</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
