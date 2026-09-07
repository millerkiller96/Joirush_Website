import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, getRelatedProducts, products } from "@/data/products";
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

  const title = `${product.name} | Handmade Faux Cookie Sculpture`;
  const description = `${product.tagline} ${product.description.slice(0, 120)}... Handmade in Orlando, FL. $${product.price} with free US shipping.`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      "jumbo cookie wall art",
      "faux cookie sculpture",
      "fake food wall art",
      "handmade wall decor",
      "bakery wall decor",
      product.category === "candy" ? "M&M cookie wall art" : "chocolate chip cookie wall art",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: getImageUrl(product.image),
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: getAbsoluteUrl(`/product/${slug}/`),
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

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="mt-10 border-t border-chocolate/10 pt-8">
      <h2 className="font-display text-2xl text-chocolate">Frequently Asked Questions</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-chocolate/10 bg-cream/50"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-chocolate">
              {faq.question}
              <span className="ml-4 text-pink transition-transform group-open:rotate-180">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-4 pb-4 text-chocolate-mid">{faq.answer}</div>
          </details>
        ))}
      </div>
    </div>
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
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-chocolate-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/wall-art/" className="hover:text-pink">
                Cookie Wall Art
              </Link>
            </li>
            <li>/</li>
            <li className="text-chocolate">{product.shortName}</li>
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
              Handmade Faux Cookie Wall Art
            </p>
            <h1 className="mt-3 font-display text-4xl text-chocolate md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium text-emerald-600">{formatPrice(product.price)}</p>
            <p className="mt-2 text-sm text-chocolate-soft">
              {product.size} · Free U.S. shipping · Ships from Florida
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
                className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Buy on Etsy — {formatPrice(product.price)}
              </a>
              <Link
                href="/custom/"
                className="rounded-full border border-chocolate/15 px-6 py-3 text-sm font-medium"
              >
                Want it custom?
              </Link>
            </div>

            <div className="mt-6 rounded-xl bg-cream-deep p-4">
              <p className="text-sm text-chocolate-mid">
                <span className="font-medium text-chocolate">{site.stats.rating} stars</span> from{" "}
                {site.stats.reviews} verified reviews on Etsy · {site.stats.sales}+ happy collectors
              </p>
            </div>
          </div>
        </div>

        <FAQAccordion faqs={product.faqs} />

        <section className="mt-20">
          <h2 className="font-display text-3xl text-chocolate">More from the bakery wall</h2>
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
