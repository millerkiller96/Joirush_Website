import type { Metadata } from "next";
import { CustomForm } from "@/components/CustomForm";
import { EtsyReviewsHub } from "@/components/EtsyReviewsHub";
import { StudioVideoCarousel } from "@/components/StudioVideoCarousel";
import { site } from "@/data/site";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Custom Cookie Art | Commission Sugar Cookie Wall Sculptures by Cookie Artist",
  description:
    "Commission custom cookie art from cookie artist Erynn — sugar cookie wall sculptures in your favorite colors, custom flavors, or any cookie canvas design you dream up. Handmade art cookies in Orlando, Florida with free U.S. shipping.",
  keywords: [
    "custom cookie art",
    "commission cookie artist",
    "custom sugar cookie art",
    "personalized art cookies",
    "custom cookie canvas",
    "custom faux food wall art",
    "custom cookie wall art",
    "handmade cookie wall art Orlando",
  ],
  alternates: {
    canonical: `${siteUrl}/custom`,
  },
  openGraph: {
    title: "Custom Cookie Art | Commission Sugar Cookie Wall Sculptures | JOIRUSH",
    description:
      "Commission custom cookie art from cookie artist Erynn — sugar cookie wall sculptures in any design. Handmade in Orlando.",
    type: "website",
    url: `${siteUrl}/custom`,
    images: [
      {
        url: `${siteUrl}/images/products/hot-pink-mm.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom cookie art - hot pink M&M sugar cookie wall sculpture by JOIRUSH",
      },
    ],
  },
};

export default function CustomPage() {
  return (
    <>
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
            Custom Cookie Art Commissions
          </p>
          <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
            Commission Custom Sugar Cookie Art
          </h1>
          <p className="mt-5 text-lg text-chocolate-mid">
            Hot pink candy cookie art. Your kitchen&apos;s exact shade of sage. A peanut butter monster 
            with rainbow sprinkles. <strong>Tell the cookie artist your wildest craving</strong> — she&apos;ll 
            sculpt it into a sugar cookie wall sculpture that stops people mid-sentence.
          </p>
          <ul className="mt-8 space-y-3 text-chocolate-mid">
            <li>✓ Any color palette — match your cookie canvas to your vibe exactly</li>
            <li>✓ Any flavor combo — the weirder the better for custom art cookies</li>
            <li>✓ Ships in 14 days — free U.S. shipping</li>
            <li>✓ Cookie artist usually replies within a few hours</li>
            <li>✓ Handmade cookie art in Orlando with spray foam + acrylic paint</li>
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
      <StudioVideoCarousel />
      <EtsyReviewsHub />
    </>
  );
}
