import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog/posts";
import { getAbsoluteUrl } from "@/lib/seo";
import { getGitLastModified } from "@/lib/gitLastModified";

export const dynamic = "force-static";

// Source and data files behind each page. lastmod is the last git commit that touched
// any of them, so it only moves when that page's content actually changed. Automated
// rebuild commits only touch docs/, so they do not bump these dates.
const PRODUCTS = "src/data/products.ts";
const SITE = "src/data/site.ts";
const POSTS = "src/data/blog/posts.ts";

const pageSources: Record<string, string[]> = {
  "/": ["src/app/page.tsx", PRODUCTS, SITE],
  "/catalogue/": ["src/app/catalogue/page.tsx", "src/components/CatalogueGrid.tsx", PRODUCTS, SITE],
  "/custom/": ["src/app/custom/page.tsx", "src/components/CustomForm.tsx", SITE],
  "/about/": ["src/app/about/page.tsx", SITE],
  "/jewelry/": ["src/app/jewelry/page.tsx", SITE],
  "/blog/": ["src/app/blog/page.tsx", POSTS, SITE],
  "/oversized-food-wall-art/": ["src/app/oversized-food-wall-art/page.tsx", PRODUCTS, SITE],
  "/kitchen-wall-art/": ["src/app/kitchen-wall-art/page.tsx", PRODUCTS, SITE],
  "/colorful-wall-art/": ["src/app/colorful-wall-art/page.tsx", PRODUCTS, SITE],
  "/contact/": ["src/app/contact/page.tsx", "src/components/ContactForm.tsx", SITE],
};

const productPageSources = [
  "src/app/product/[slug]/page.tsx",
  "src/components/ProductPageClient.tsx",
  "src/data/product-galleries.ts",
  PRODUCTS,
];

function lastModifiedFor(paths: string[]): { lastModified?: Date } {
  const date = getGitLastModified(paths);
  return date ? { lastModified: date } : {};
}

function staticPage(path: string): { url: string; lastModified?: Date } {
  return { url: getAbsoluteUrl(path), ...lastModifiedFor(pageSources[path] ?? []) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      ...staticPage("/"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      ...staticPage("/catalogue/"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      ...staticPage("/custom/"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      ...staticPage("/about/"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      ...staticPage("/jewelry/"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      ...staticPage("/blog/"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      ...staticPage("/oversized-food-wall-art/"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      ...staticPage("/kitchen-wall-art/"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      ...staticPage("/colorful-wall-art/"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      ...staticPage("/contact/"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: getAbsoluteUrl(`/product/${product.slug}/`),
    ...lastModifiedFor([...productPageSources, `public/products/${product.slug}`]),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}/`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: post.category === "how-to" ? ("monthly" as const) : ("yearly" as const),
    priority: post.category === "how-to" ? 0.8 : 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPostPages];
}
