import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/ProductPageClient";
import {
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
} from "@/data/products";
import { site } from "@/data/site";
import { siteUrl, getAbsoluteUrl, getImageUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };

  const productUrl = getAbsoluteUrl(`/product/${product.slug}/`);
  const imageUrl = getImageUrl(product.image);

  return {
    title: `${product.name} | Cookie Art by Cookie Artist Erynn`,
    description: `${product.tagline} ${product.size}. Handmade sugar cookie wall sculpture by cookie artist Erynn. Art cookie with built-in wall hanger. ${formatPrice(product.price)} with free U.S. shipping from Orlando.`,
    keywords: [
      "cookie art",
      "sugar cookie art",
      "cookie artist",
      "art cookies",
      "cookie canvas",
      product.name.toLowerCase(),
      "faux food wall art",
      "handmade cookie wall art Orlando",
      product.category === "candy" ? "candy cookie art" : "chocolate chip cookie art",
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Cookie Art by ${site.name}`,
      description: `${product.tagline} Handmade ${product.size} sugar cookie wall sculpture by cookie artist Erynn. ${formatPrice(product.price)} with free U.S. shipping.`,
      type: "website",
      url: productUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Cookie art - ${product.shortName} sugar cookie wall sculpture by cookie artist Erynn`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Cookie Art by ${site.name}`,
      description: `${product.tagline} ${formatPrice(product.price)} with free U.S. shipping.`,
      images: [imageUrl],
    },
  };
}

function ProductJsonLd({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: getImageUrl(product.image),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    category: "Cookie Art",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Art Type", value: "Sugar Cookie Wall Sculpture" },
      { "@type": "PropertyValue", name: "Artist", value: "Erynn" },
      { "@type": "PropertyValue", name: "Style", value: "Faux Food Wall Art" },
    ],
    offers: {
      "@type": "Offer",
      url: product.stripeUrl || product.etsyUrl,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: site.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.stats.rating,
      reviewCount: site.stats.reviews,
    },
    material: product.materials,
    size: product.size,
    manufacturer: {
      "@type": "Organization",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cookie Wall Art",
        item: getAbsoluteUrl("/wall-art/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.shortName,
        item: getAbsoluteUrl(`/product/${product.slug}/`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductPageClient product={product} related={related} />
    </>
  );
}
