import type { Metadata } from "next";
import { CustomForm } from "@/components/CustomForm";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Custom Cookie Wall Art | Commission Handmade Oversized Cookie Sculptures",
  description:
    "Commission custom jumbo cookie wall art — oversized fake cookie sculptures in your favorite colors, custom flavors, or any design you dream up. Handmade in Florida with free U.S. shipping.",
  keywords: [
    "custom cookie wall art",
    "commission cookie sculpture",
    "custom dessert decor",
    "custom kitchen wall art",
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
          Make it yours
        </p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Have a Flavor Fantasy?
        </h1>
        <p className="mt-5 text-lg text-chocolate-mid">
          Hot pink candy cookie. Your kitchen&apos;s exact shade of sage. A peanut butter monster 
          with rainbow sprinkles. <strong>Tell me your wildest craving</strong> — I&apos;ll 
          sculpt it into wall art that stops people mid-sentence.
        </p>
        <ul className="mt-8 space-y-3 text-chocolate-mid">
          <li>✓ Any color palette — match your vibe exactly</li>
          <li>✓ Any flavor combo — the weirder the better</li>
          <li>✓ Ships in 14 days — free U.S. shipping</li>
          <li>✓ Usually reply within a few hours</li>
          <li>✓ Handmade in Orlando with spray foam + acrylic paint</li>
        </ul>
        <p className="mt-6 text-sm text-chocolate-soft">
          Because each piece is sculpted just for you, returns are not accepted — but that&apos;s 
          also what makes it special.
        </p>
        <p className="mt-4 text-sm text-chocolate-soft">
          Prefer to skip the form? DM on{" "}
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
