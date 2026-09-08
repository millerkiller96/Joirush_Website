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
    default: `Cookie Art & Sugar Cookie Wall Sculptures | Handmade by Cookie Artist | ${site.name}`,
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
    "Shop handmade cookie art and sugar cookie wall sculptures by cookie artist Erynn. Jumbo faux food wall art, oversized cookie decor, and giant cookie canvas pieces. Free U.S. shipping from Orlando, Florida.",
  keywords: [
    "cookie art",
    "sugar cookie art",
    "cookie artist",
    "art cookies",
    "cookie canvas",
    "jumbo cookie wall art",
    "oversized cookie wall decor",
    "faux food wall art",
    "giant cookie sculpture",
    "handmade cookie wall art Orlando",
    "fake cookie wall sculpture",
    "dessert wall decor",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `Cookie Art & Sugar Cookie Wall Sculptures | Handmade by Cookie Artist | ${site.name}`,
    description:
      "Shop handmade cookie art and sugar cookie wall sculptures by cookie artist Erynn. Jumbo faux food wall art for kitchens and homes. Free U.S. shipping.",
    type: "website",
    url: siteUrl,
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: getImageUrl("/images/products/choc-chip.jpg"),
        width: 1200,
        height: 630,
        alt: "Cookie art - handmade sugar cookie wall sculpture by cookie artist Erynn at JOIRUSH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Cookie Art & Sugar Cookie Wall Sculptures | ${site.name}`,
    description:
      "Handmade cookie art and sugar cookie wall sculptures by cookie artist Erynn. Giant faux food wall decor that ships free in the U.S.",
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
      "Cookie art studio creating handmade sugar cookie wall sculptures and faux food wall art. Cookie artist Erynn crafts giant cookie canvas pieces and oversized dessert decor in Orlando, Florida.",
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
    founder: {
      "@type": "Person",
      name: site.artist,
      jobTitle: "Cookie Artist",
      description: "Handmade cookie art sculptor creating sugar cookie wall sculptures and faux food wall art",
      knowsAbout: ["cookie art", "sugar cookie art", "faux food sculpture", "wall art"],
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
