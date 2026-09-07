import type { Metadata } from "next";
import { CustomForm } from "@/components/CustomForm";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Custom Cookie Wall Art | Commission Handmade Oversized Cookie Sculptures",
  description:
    "Commission custom jumbo cookie wall art — oversized fake cookie sculptures in your bakery's colors, custom flavors, or any design you dream up. Handmade in Florida with free U.S. shipping.",
  keywords: [
    "custom cookie wall art",
    "commission cookie sculpture",
    "custom dessert decor",
    "custom bakery wall art",
    "personalized cookie art",
    "custom fake cookie",
  ],
  alternates: {
    canonical: `${siteUrl}/custom`,
  },
  openGraph: {
    title: "Custom Cookie Wall Art | Commission Handmade Cookie Sculptures | JOIRUSH",
    description:
      "Commission custom jumbo cookie wall art — oversized fake cookie sculptures in any design. Handmade in Florida.",
    type: "website",
    url: `${siteUrl}/custom`,
    images: [
      {
        url: `${siteUrl}/images/products/hot-pink-mm.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom hot pink M&M cookie wall art by JOIRUSH",
      },
    ],
  },
};

export default function CustomPage() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
          Custom cookie wall art
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Commission a custom piece
        </h1>
        <p className="mt-5 text-lg text-chocolate-mid">
          Got a flavor or aesthetic in mind? Erynn will cook up something unforgettable — a jumbo
          cookie wall art piece in your bakery&apos;s colors, a custom dessert sculpture, or
          something nobody&apos;s seen yet.
        </p>
        <ul className="mt-8 space-y-3 text-chocolate-mid">
          <li>Custom jumbo cookie wall art in any color or flavor</li>
          <li>Oversized fake cookie sculptures for bakeries, cafés, and studios</li>
          <li>Typically replies within a few hours</li>
          <li>Handmade in Florida, free U.S. shipping</li>
          <li>Because each piece is made to order, returns are not accepted</li>
        </ul>
        <p className="mt-8 text-sm text-chocolate-soft">
          Prefer to skip the form? Message the shop on{" "}
          <a href={site.etsy} className="text-pink underline" target="_blank" rel="noreferrer">
            Etsy
          </a>{" "}
          or Instagram {site.instagramHandle}.
        </p>
      </div>
      <CustomForm />
    </div>
  );
}
