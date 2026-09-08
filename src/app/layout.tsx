import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import { siteUrl, getImageUrl } from "@/lib/seo";
import { asset } from "@/lib/paths";
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
    default: `Jumbo Cookie Wall Art | Handmade Oversized Cookie Sculptures | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "32x32" },
      { url: asset("/icon.png"), type: "image/png", sizes: "32x32" },
      { url: asset("/icon-48.png"), type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: asset("/apple-touch-icon.png"), type: "image/png", sizes: "180x180" },
    ],
  },
  description:
    "Shop handmade jumbo cookie wall art and oversized fake cookie sculptures by JOIRUSH. Realistic dessert decor for kitchens, homes, and creative spaces. Free U.S. shipping from Florida.",
  keywords: [
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "fake cookie wall sculpture",
    "giant cookie art",
    "dessert wall decor",
    "handmade cookie sculptures",
    "dessert wall art",
    "kitchen wall decor",
    "faux cookie art",
    "realistic food art",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `Jumbo Cookie Wall Art | Handmade Oversized Cookie Sculptures | ${site.name}`,
    description:
      "Shop handmade jumbo cookie wall art — realistic oversized cookie sculptures for kitchens, homes, and creative spaces. Free U.S. shipping.",
    type: "website",
    url: siteUrl,
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
    title: `Jumbo Cookie Wall Art | ${site.name}`,
    description:
      "Handmade oversized cookie sculptures for walls — realistic dessert decor that ships free in the U.S.",
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
};

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: "Joi Rush by EBABYxo",
    url: siteUrl,
    logo: getImageUrl("/images/brand/avatar.jpg"),
    description:
      "Handmade jumbo cookie wall art and oversized dessert sculptures by artist Erynn in Orlando, Florida.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    sameAs: [site.instagram, site.etsy],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: site.etsy,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.rating,
      reviewCount: site.stats.reviews,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <head>
        <OrganizationSchema />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
