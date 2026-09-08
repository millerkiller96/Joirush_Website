import type { Metadata } from "next";
import { Image } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/data/blog/posts";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl, siteUrl } from "@/lib/seo";

import { HowToHangContent, HowToHangSchema } from "./content/how-to-hang-jumbo-cookie-wall-art";
import { DopamineDecorContent, DopamineDecorSchema } from "./content/kitchen-dopamine-decor-dessert-gallery-wall";
import { FoodieGiftGuideContent, FoodieGiftGuideSchema } from "./content/foodie-gift-guide-jumbo-cookie-sculptures";
import { ChocolateChipStoryContent, ChocolateChipStorySchema } from "./content/chocolate-chip-cookie-wall-art-joirush-classic";
import { WhatIsCookieArtContent, WhatIsCookieArtSchema } from "./content/what-is-cookie-art-sugar-cookie-wall-sculptures-explained";

type Props = { params: Promise<{ slug: string }> };

const contentMap: Record<string, { Content: () => React.ReactNode; Schema: () => React.ReactNode }> = {
  "what-is-cookie-art-sugar-cookie-wall-sculptures-explained": { Content: WhatIsCookieArtContent, Schema: WhatIsCookieArtSchema },
  "how-to-hang-jumbo-cookie-wall-art": { Content: HowToHangContent, Schema: HowToHangSchema },
  "kitchen-dopamine-decor-dessert-gallery-wall": { Content: DopamineDecorContent, Schema: DopamineDecorSchema },
  "foodie-gift-guide-jumbo-cookie-sculptures": { Content: FoodieGiftGuideContent, Schema: FoodieGiftGuideSchema },
  "chocolate-chip-cookie-wall-art-joirush-classic": { Content: ChocolateChipStoryContent, Schema: ChocolateChipStorySchema },
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: getImageUrl(post.image),
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [getImageUrl(post.image)],
    },
    alternates: {
      canonical: getAbsoluteUrl(`/blog/${slug}/`),
    },
  };
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getBlogPost>> }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: getImageUrl(post.image),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: getAbsoluteUrl("/about/"),
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: getImageUrl("/images/brand/avatar.jpg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/blog/${post.slug}/`),
    },
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
        name: "Blog",
        item: getAbsoluteUrl("/blog/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: getAbsoluteUrl(`/blog/${post.slug}/`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

const categoryLabels: Record<string, string> = {
  "how-to": "How-To Guide",
  inspiration: "Inspiration",
  "gift-guide": "Gift Guide",
  "product-story": "Product Story",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { Content, Schema } = contentMap[slug] || { Content: () => null, Schema: () => null };
  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      <ArticleJsonLd post={post} />
      <Schema />
      <article className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-chocolate-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog/" className="hover:text-pink">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-chocolate truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-pink/10 px-3 py-1 font-medium text-pink">
              {categoryLabels[post.category]}
            </span>
            <span className="text-chocolate-soft">{post.readingTime}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight text-chocolate md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-chocolate-mid">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/brand/avatar.jpg"
              alt={post.author}
              width={48}
              height={48}
              className="rounded-full border-2 border-pink"
            />
            <div>
              <p className="font-medium text-chocolate">{post.author}</p>
              <p className="text-sm text-chocolate-soft">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        <Image
          src={post.image}
          alt={post.imageAlt}
          width={1200}
          height={675}
          priority
          className="mt-10 rounded-[2rem] object-cover shadow-card"
        />

        <div className="prose prose-lg mt-12 max-w-none prose-headings:font-display prose-headings:text-chocolate prose-p:text-chocolate-mid prose-a:text-pink prose-a:no-underline hover:prose-a:underline prose-strong:text-chocolate prose-li:text-chocolate-mid">
          <Content />
        </div>

        <footer className="mt-16 border-t border-chocolate/10 pt-8">
          <div className="rounded-[1.5rem] bg-pink/10 p-6 md:p-8">
            <h3 className="font-display text-2xl text-chocolate">
              Ready to add a jumbo cookie to your wall?
            </h3>
            <p className="mt-3 text-chocolate-mid">
              Browse our collection of handmade cookie sculptures, or request a custom piece in your
              favorite flavor.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
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
          </div>
        </footer>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-cream-deep">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <h2 className="font-display text-3xl text-chocolate">More from the Blog</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}/`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-card">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      width={400}
                      height={300}
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-xl leading-tight text-chocolate group-hover:text-pink">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 text-sm text-chocolate-soft">{relatedPost.readingTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
