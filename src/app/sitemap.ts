import type { MetadataRoute } from "next";
import { products } from "@/data/products";
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

  const blogPosts: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/blog/how-to-hang-jumbo-cookie-wall-art/"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/blog/kitchen-dopamine-decor-dessert-gallery-wall/"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/blog/foodie-gift-guide-jumbo-cookie-sculptures/"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/blog/chocolate-chip-cookie-wall-art-joirush-classic/"),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...productPages, ...blogPosts];
}
