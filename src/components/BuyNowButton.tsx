"use client";

import { useState } from "react";
import { BuyNowUpsellModal, type UpsellModalProduct } from "./BuyNowUpsellModal";
import { formatPrice } from "@/data/products";

type BuyNowButtonProps = {
  product: UpsellModalProduct;
  className?: string;
  children?: React.ReactNode;
  showPrice?: boolean;
};

export function BuyNowButton({ product, className, children, showPrice = true }: BuyNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultContent = (
    <>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      Buy Now{showPrice ? ` — ${formatPrice(product.price)}` : ""}
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={
          className ||
          "flex w-full items-center justify-center gap-2 rounded-full bg-success px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl"
        }
      >
        {children || defaultContent}
      </button>
      <BuyNowUpsellModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
