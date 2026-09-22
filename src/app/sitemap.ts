import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog/posts";
import { getAbsoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl("/wall-art/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/catalogue/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/custom/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/about/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: getAbsoluteUrl("/jewelry/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl("/blog/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: getAbsoluteUrl(`/product/${product.slug}/`),
    lastModified: now,
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
