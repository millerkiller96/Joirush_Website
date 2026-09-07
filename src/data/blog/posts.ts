export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  readingTime: string;
  category: "how-to" | "inspiration" | "gift-guide" | "product-story";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-hang-jumbo-cookie-wall-art",
    title: "How to Hang Jumbo Cookie Wall Art: A Complete Guide to Faux Food Decor",
    excerpt:
      "Learn the best techniques for hanging oversized cookie sculptures safely and beautifully. From choosing the right hardware to creating gallery wall arrangements with faux food wall art.",
    publishedAt: "2024-09-01",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Jumbo chocolate chip cookie wall art hanging in a bright kitchen",
    keywords: [
      "how to hang faux food wall art",
      "jumbo cookie wall art installation",
      "hanging oversized wall decor",
      "faux food sculpture mounting",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
  {
    slug: "kitchen-dopamine-decor-dessert-gallery-wall",
    title: "Dopamine Decor for Your Kitchen: Creating a Dessert Gallery Wall",
    excerpt:
      "Embrace the dopamine decor trend in your kitchen with a curated gallery wall of dessert art. From jumbo cookies to candy sculptures, learn how to create a space that sparks joy.",
    publishedAt: "2024-09-05",
    author: "Erynn",
    image: "/images/products/rainbow.jpg",
    imageAlt: "Colorful candy cookie wall art creating a dopamine-inducing kitchen gallery wall",
    keywords: [
      "dopamine decor kitchen",
      "gallery wall dessert ideas",
      "kitschy kitchen wall art",
      "colorful kitchen decor",
    ],
    readingTime: "10 min read",
    category: "inspiration",
  },
  {
    slug: "foodie-gift-guide-jumbo-cookie-sculptures",
    title: "The Ultimate Foodie Gift Guide: Jumbo Cookie Sculptures They'll Never Forget",
    excerpt:
      "Looking for a unique gift for the food lover in your life? These handmade jumbo cookie sculptures are conversation starters that last forever — unlike real cookies.",
    publishedAt: "2024-09-10",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Jumbo M&M cookie wall art set as a perfect foodie gift",
    keywords: [
      "gift guide for foodies wall art",
      "unique foodie gifts",
      "handmade wall art gifts",
      "cookie sculpture gift ideas",
    ],
    readingTime: "7 min read",
    category: "gift-guide",
  },
  {
    slug: "chocolate-chip-cookie-wall-art-joirush-classic",
    title: "The Story Behind the Classic: JOIRUSH Chocolate Chip Cookie Wall Art",
    excerpt:
      "Every cookie tells a story. Discover how a love for nostalgia and realistic sculpture became the signature JOIRUSH chocolate chip cookie wall art piece.",
    publishedAt: "2024-09-15",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Classic JOIRUSH jumbo chocolate chip cookie wall art",
    keywords: [
      "chocolate chip cookie wall art",
      "JOIRUSH cookie sculpture",
      "handmade cookie wall art story",
      "faux cookie sculpture artist",
    ],
    readingTime: "9 min read",
    category: "product-story",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}
