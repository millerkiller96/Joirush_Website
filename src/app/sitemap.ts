import type { MetadataRoute } from "next";
import { statSync } from "fs";
import { join } from "path";
import { products } from "@/data/products";
import { blogPosts } from "@/data/blog/posts";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function getLatestMtime(relativePaths: string[]): Date {
  let latest = 0;
  for (const rel of relativePaths) {
    try {
      const mtime = statSync(join(process.cwd(), rel)).mtimeMs;
      if (mtime > latest) latest = mtime;
    } catch {
      // Fallback if file does not exist
    }
  }
  return latest > 0 ? new Date(latest) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pageSources: Record<string, string[]> = {
    "/": ["src/app/page.tsx", "src/data/products.ts"],
    "/catalogue/": ["src/app/catalogue/page.tsx", "src/data/products.ts"],
    "/oversized-food-wall-art/": ["src/app/oversized-food-wall-art/page.tsx", "src/data/products.ts"],
    "/kitchen-wall-art/": ["src/app/kitchen-wall-art/page.tsx", "src/data/products.ts"],
    "/colorful-wall-art/": ["src/app/colorful-wall-art/page.tsx", "src/data/products.ts"],
    "/dopamine-decor-wall-art/": ["src/app/dopamine-decor-wall-art/page.tsx", "src/data/products.ts"],
    "/pink-wall-art/": ["src/app/pink-wall-art/page.tsx", "src/data/products.ts"],
    "/faux-food-wall-art/": ["src/app/faux-food-wall-art/page.tsx", "src/data/products.ts"],
    "/jewelry/": ["src/app/jewelry/page.tsx", "src/data/jewelry.ts"],
    "/custom/": ["src/app/custom/page.tsx"],
    "/about/": ["src/app/about/page.tsx", "src/data/site.ts"],
    "/faq/": ["src/app/faq/page.tsx"],
    "/shipping-returns/": ["src/app/shipping-returns/page.tsx"],
    "/blog/": ["src/app/blog/page.tsx", "src/data/blog/posts.ts"],
    "/contact/": ["src/app/contact/page.tsx"],
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: getLatestMtime(pageSources["/"]),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/catalogue/`,
      lastModified: getLatestMtime(pageSources["/catalogue/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/oversized-food-wall-art/`,
      lastModified: getLatestMtime(pageSources["/oversized-food-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/kitchen-wall-art/`,
      lastModified: getLatestMtime(pageSources["/kitchen-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/colorful-wall-art/`,
      lastModified: getLatestMtime(pageSources["/colorful-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/dopamine-decor-wall-art/`,
      lastModified: getLatestMtime(pageSources["/dopamine-decor-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pink-wall-art/`,
      lastModified: getLatestMtime(pageSources["/pink-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/faux-food-wall-art/`,
      lastModified: getLatestMtime(pageSources["/faux-food-wall-art/"]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/jewelry/`,
      lastModified: getLatestMtime(pageSources["/jewelry/"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/custom/`,
      lastModified: getLatestMtime(pageSources["/custom/"]),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about/`,
      lastModified: getLatestMtime(pageSources["/about/"]),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq/`,
      lastModified: getLatestMtime(pageSources["/faq/"]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/shipping-returns/`,
      lastModified: getLatestMtime(pageSources["/shipping-returns/"]),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/`,
      lastModified: getLatestMtime(pageSources["/blog/"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact/`,
      lastModified: getLatestMtime(pageSources["/contact/"]),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const productPagesLastMod = getLatestMtime([
    "src/data/products.ts",
    "src/app/product/[slug]/page.tsx",
  ]);
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}/`,
    lastModified: productPagesLastMod,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
