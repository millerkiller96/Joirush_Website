import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, getRelatedProducts, products } from "@/data/products";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = "https://joirush.com";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };

  const productUrl = `${siteUrl}/product/${product.slug}`;
  const imageUrl = `${siteUrl}${product.image}`;

  return {
    title: `${product.name} | Handmade Cookie Wall Art`,
    description: `${product.tagline} ${product.size}. Handmade oversized cookie sculpture with built-in wall hanger. ${formatPrice(product.price)} with free U.S. shipping from Florida.`,
    keywords: [
      product.name.toLowerCase(),
      "jumbo cookie wall art",
      "oversized cookie decor",
      "fake cookie sculpture",
      "handmade wall art",
      "dessert decor",
      product.category === "candy" ? "candy cookie art" : "chocolate chip cookie art",
    ],
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: `${product.tagline} Handmade ${product.size} cookie sculpture. ${formatPrice(product.price)} with free U.S. shipping.`,
      type: "website",
      url: productUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${site.name}`,
      description: `${product.tagline} ${formatPrice(product.price)} with free U.S. shipping.`,
      images: [imageUrl],
    },
  };
}

function ProductSchema({ product }: { product: ReturnType<typeof getProduct> }) {
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    offers: {
      "@type": "Offer",
      url: product.etsyUrl,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: site.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "USD",
        },
      },
    },
    material: product.materials,
    size: product.size,
    category: "Wall Art",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ product }: { product: ReturnType<typeof getProduct> }) {
  if (!product) return null;

  const schema = {
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
        item: `${siteUrl}/wall-art`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Catalogue",
        item: `${siteUrl}/catalogue`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `${siteUrl}/product/${product.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema product={product} />
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-chocolate-soft">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/wall-art" className="hover:text-pink">
                Cookie Wall Art
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/catalogue" className="hover:text-pink">
                Catalogue
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-chocolate">
              {product.shortName}
            </li>
          </ol>
        </nav>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1600}
            priority
            className="rounded-[2.2rem] object-cover shadow-card"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              Handmade jumbo cookie wall art
            </p>
            <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>
            <p className="mt-2 text-sm text-chocolate-soft">
              {product.size} · Free U.S. shipping · Ships from Daytona Beach, FL
            </p>
            <p className="mt-6 text-lg leading-relaxed text-chocolate-mid">{product.description}</p>
            <ul className="mt-6 space-y-2 text-chocolate-mid">
              {product.details.map((detail) => (
                <li key={detail}>· {detail}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-chocolate-soft">Materials: {product.materials}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={product.etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
              >
                Buy on Etsy — {formatPrice(product.price)}
              </a>
              <Link
                href="/custom"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Want it custom?
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl text-chocolate">More jumbo cookie wall art</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
