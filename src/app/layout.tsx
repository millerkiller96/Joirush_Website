import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import { siteUrl, getImageUrl } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Jumbo Cookie Wall Art & Faux Food Sculptures`,
    template: `%s · ${site.name}`,
  },
  description:
    "Handmade jumbo cookie wall art and oversized faux food sculptures by Erynn in Orlando, Florida. Lightweight, hangable dessert decor for kitchens, bakeries, and cafés. Ships free in the US.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "giant cookie wall art",
    "fake cookie wall sculpture",
    "faux food wall art",
    "chocolate chip cookie wall art",
    "bakery wall decor",
    "kitschy kitchen wall art",
    "handmade cookie sculpture",
    "Orlando Florida wall art",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: `${site.name} — Jumbo Cookie Wall Art & Faux Dessert Sculptures`,
    description:
      "Handmade oversized cookie sculptures and faux food wall art. Lightweight, hangable dessert decor for kitchens, bakeries, and cafés.",
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: getImageUrl("/images/products/choc-chip.jpg"),
        width: 1200,
        height: 630,
        alt: "Jumbo chocolate chip cookie wall art by JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Jumbo Cookie Wall Art`,
    description: "Handmade oversized cookie sculptures and faux food wall art by Erynn in Orlando, Florida.",
    images: [getImageUrl("/images/products/choc-chip.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
