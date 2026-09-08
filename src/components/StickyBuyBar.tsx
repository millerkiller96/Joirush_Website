"use client";

import { useEffect, useState, useRef } from "react";
import { BuyNowButton } from "@/components/BuyNowButton";
import { type UpsellModalProduct } from "@/components/BuyNowUpsellModal";
import { formatPrice } from "@/data/products";

type StickyBuyBarProps = {
  product: UpsellModalProduct;
  mainBuyButtonRef?: React.RefObject<HTMLDivElement | null>;
};

export function StickyBuyBar({ product, mainBuyButtonRef }: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!mainBuyButtonRef?.current) {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px",
      }
    );

    observerRef.current.observe(mainBuyButtonRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [mainBuyButtonRef]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transform transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Quick purchase"
    >
      <div className="border-t border-chocolate/10 bg-cream/95 px-4 py-3 backdrop-blur-lg sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="truncate font-medium text-chocolate">
              {product.shortName}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-chocolate">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <BuyNowButton
              product={product}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-success px-6 py-3 font-bold text-white shadow-lg transition hover:bg-success-dark hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 sm:flex-none"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="sm:hidden">Buy Now — {formatPrice(product.price)}</span>
              <span className="hidden sm:inline">Buy Now</span>
            </BuyNowButton>

            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-chocolate/10 bg-white px-4 py-3 text-sm font-medium text-chocolate-soft transition hover:border-chocolate/20 hover:text-chocolate-mid sm:flex sm:items-center sm:gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.559 2c-.556.004-1.36.025-2.033.138C5.32 2.322 4.13 2.884 3.507 3.507c-.623.623-1.185 1.813-1.369 3.019-.113.673-.134 1.477-.138 2.033v6.882c.004.556.025 1.36.138 2.033.184 1.206.746 2.396 1.369 3.019.623.623 1.813 1.185 3.019 1.369.673.113 1.477.134 2.033.138h6.882c.556-.004 1.36-.025 2.033-.138 1.206-.184 2.396-.746 3.019-1.369.623-.623 1.185-1.813 1.369-3.019.113-.673.134-1.477.138-2.033V8.559c-.004-.556-.025-1.36-.138-2.033-.184-1.206-.746-2.396-1.369-3.019-.623-.623-1.813-1.185-3.019-1.369C16.8 2.025 15.997 2.004 15.441 2H8.559zm.385 4.516h5.812c.283.004.686.012.847.223.15.196.136.517.132.809l-.026 1.645a.61.61 0 01-.617.592c-.32-.006-.645-.01-.967-.011l-.06-.001c-.387-.001-.775.002-1.163.009l.004-.254c.003-.234.006-.467-.029-.669-.05-.285-.216-.47-.526-.58a2.377 2.377 0 00-.557-.11c-.282-.029-.503.045-.66.228-.166.193-.248.469-.261.788l-.025.597c.67.007 1.339.024 2.009.05.387.015.573.168.586.478.005.13-.002.26-.009.39l-.015.266-.016.278c-.012.228-.108.334-.304.378a8.677 8.677 0 01-.367.065c-.636.1-1.271.18-1.907.242l-.033.872c-.009.237-.003.499.004.762l.004.134c.012.346.024.693.004 1.038-.038.65-.22 1.243-.535 1.793a2.49 2.49 0 01-.344.448c-.157.16-.379.248-.573.087-.178-.147-.172-.366-.109-.575.08-.263.157-.527.23-.792l.113-.413c.178-.676.345-1.353.468-2.04l.055-.324-.42.029c-.303.02-.607.038-.91.044-.317.007-.483-.121-.513-.395a5.59 5.59 0 01-.022-.51c.004-.189.073-.326.25-.412.158-.077.33-.094.502-.11l.214-.02c.284-.026.568-.056.852-.088l.037-.858c-.45.014-.9.026-1.35.028-.375.002-.556-.147-.573-.475-.01-.194-.002-.39.006-.585l.01-.227c.015-.302.155-.44.495-.471.345-.032.69-.058 1.035-.08l.34-.02.074-1.51c.031-.629.251-.893.886-.926z" />
              </svg>
              Etsy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
