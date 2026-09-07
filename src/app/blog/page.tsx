import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts } from "@/data/blog/posts";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog | Jumbo Cookie Wall Art Tips, Ideas & Inspiration",
  description:
    "Explore tips for hanging faux food wall art, dopamine decor inspiration, foodie gift guides, and stories behind handmade cookie sculptures. Your guide to kitschy kitchen style.",
  keywords: [
    "jumbo cookie wall art blog",
    "faux food wall art tips",
    "dopamine decor ideas",
    "kitschy kitchen inspiration",
    "bakery wall decor guide",
  ],
  openGraph: {
    title: "Blog | Jumbo Cookie Wall Art Tips & Inspiration",
    description:
      "Tips for hanging faux food wall art, dopamine decor inspiration, and stories behind handmade cookie sculptures.",
    type: "website",
    images: [
      {
        url: getImageUrl("/images/products/mm-set.jpg"),
        width: 1200,
        height: 630,
        alt: "JOIRUSH blog - Jumbo cookie wall art inspiration",
      },
    ],
  },
  alternates: {
    canonical: getAbsoluteUrl("/blog/"),
  },
};

function BlogJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    description: "Tips, inspiration, and stories about handmade jumbo cookie wall art and faux food sculptures.",
    url: getAbsoluteUrl("/blog/"),
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: getImageUrl("/images/brand/avatar.jpg"),
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: getImageUrl(post.image),
      url: getAbsoluteUrl(`/blog/${post.slug}/`),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const categoryLabels: Record<string, string> = {
  "how-to": "How-To Guide",
  inspiration: "Inspiration",
  "gift-guide": "Gift Guide",
  "product-story": "Product Story",
};

export default function BlogPage() {
  return (
    <>
      <BlogJsonLd />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">
            The JOIRUSH Blog
          </p>
          <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
            Cookie Wall Art Tips & Inspiration
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-chocolate-mid">
            From how to hang your jumbo cookies to creating the perfect dopamine decor kitchen,
            explore ideas and stories from the studio.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className={`group ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <Link href={`/blog/${post.slug}/`} className="block">
                <div
                  className={`overflow-hidden rounded-[2rem] bg-cream-deep shadow-card ${
                    index === 0 ? "md:flex md:items-stretch" : ""
                  }`}
                >
                  <div className={index === 0 ? "md:w-1/2" : ""}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      width={800}
                      height={600}
                      className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                        index === 0 ? "h-64 md:h-full" : "h-56"
                      }`}
                    />
                  </div>
                  <div className={`p-6 ${index === 0 ? "md:w-1/2 md:p-10" : ""}`}>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-pink/10 px-3 py-1 font-medium text-pink">
                        {categoryLabels[post.category]}
                      </span>
                      <span className="text-chocolate-soft">{post.readingTime}</span>
                    </div>
                    <h2
                      className={`mt-4 font-display leading-tight text-chocolate group-hover:text-pink ${
                        index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className="mt-3 text-chocolate-mid line-clamp-3">{post.excerpt}</p>
                    <p className="mt-4 text-sm text-chocolate-soft">
                      By {post.author} · {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-20 rounded-[2rem] bg-pink/10 p-8 text-center md:p-12">
          <h2 className="font-display text-3xl text-chocolate">Looking for Something Specific?</h2>
          <p className="mx-auto mt-4 max-w-xl text-chocolate-mid">
            Browse our full collection of handmade jumbo cookie sculptures, or request a custom piece
            in your favorite flavor.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/wall-art/"
              className="rounded-full bg-pink px-6 py-3 text-sm font-medium text-white hover:bg-pink-hot"
            >
              Shop Cookie Wall Art
            </Link>
            <Link
              href="/custom/"
              className="rounded-full border border-chocolate/15 bg-white px-6 py-3 text-sm font-medium text-chocolate"
            >
              Request Custom Piece
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
