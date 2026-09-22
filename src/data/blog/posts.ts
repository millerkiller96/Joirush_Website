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
    slug: "cookie-canvas-vs-3d-cookie-wall-sculptures",
    title: "Cookie Canvas Prints vs Handmade 3D Cookie Wall Sculptures: What Collectors Actually Hang",
    excerpt:
      "Flat cookie canvas prints vs 3D spray-foam cookie wall sculptures — what's the difference and which do collectors actually hang? Learn why handmade sugar cookie wall sculptures from JOIRUSH offer the depth, texture, and statement-piece impact that flat prints can't match.",
    publishedAt: "2026-09-22",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "3D cookie wall sculpture vs flat cookie canvas print - handmade sugar cookie wall art by JOIRUSH",
    keywords: [
      "cookie canvas",
      "cookie wall art",
      "sugar cookie wall sculpture",
      "art cookies",
      "3d cookie wall art",
      "cookie art",
      "faux food wall art",
      "cookie canvas print",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
  {
    slug: "cookie-wall-art-for-home-collectors",
    title: "Cookie Wall Art for Home Collectors: Faux Sugar Cookie Sculptures That Last Forever",
    excerpt:
      "A collector's guide to cookie wall art — faux sugar cookie wall sculptures that look real but aren't edible. Learn what makes these spray-foam cookie sculptures different from royal icing cookies and how to choose the perfect piece for your home.",
    publishedAt: "2026-09-21",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Cookie wall art - handmade faux sugar cookie wall sculptures for home collectors by JOIRUSH",
    keywords: [
      "cookie wall art",
      "sugar cookie wall sculpture",
      "faux cookie decor",
      "cookie wall art for home",
      "decorative cookie sculptures",
      "faux food wall art",
      "cookie art collectors",
      "spray foam cookie sculpture",
    ],
    readingTime: "10 min read",
    category: "how-to",
  },
  {
    slug: "what-is-cookie-art-sugar-cookie-wall-sculptures-explained",
    title: "What is Cookie Art? A Guide to Sugar Cookie Wall Sculptures & Art Cookies",
    excerpt:
      "Discover cookie art — the emerging trend of decorative sugar cookie wall sculptures that look real but last forever. Learn what makes art cookies different from edible sugar cookies and why cookie artists are creating faux food wall art for homes and kitchens.",
    publishedAt: "2024-09-20",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Cookie art - handmade sugar cookie wall sculpture that looks real by cookie artist Erynn",
    keywords: [
      "cookie art",
      "sugar cookie art",
      "cookie artist",
      "art cookies",
      "cookie canvas",
      "faux food wall art",
      "decorative cookie sculptures",
    ],
    readingTime: "12 min read",
    category: "how-to",
  },
  {
    slug: "how-to-hang-jumbo-cookie-wall-art",
    title: "How to Hang Cookie Art: A Complete Guide to Sugar Cookie Wall Sculptures",
    excerpt:
      "Learn the best techniques for hanging cookie art safely and beautifully. From choosing the right hardware to creating gallery wall arrangements with sugar cookie wall sculptures and art cookies.",
    publishedAt: "2024-09-01",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Cookie art - sugar cookie wall sculpture hanging in a bright kitchen by cookie artist Erynn",
    keywords: [
      "how to hang cookie art",
      "sugar cookie art installation",
      "hanging cookie canvas",
      "faux food wall art mounting",
      "cookie artist tips",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
  {
    slug: "kitchen-dopamine-decor-dessert-gallery-wall",
    title: "Dopamine Decor: Creating a Cookie Art Gallery Wall in Your Kitchen",
    excerpt:
      "Embrace the dopamine decor trend with a curated gallery wall of cookie art. From sugar cookie wall sculptures to candy cookie art, learn how to create a space with art cookies that sparks joy.",
    publishedAt: "2024-09-05",
    author: "Erynn",
    image: "/images/products/rainbow.jpg",
    imageAlt: "Cookie art gallery wall - colorful sugar cookie wall sculptures creating dopamine decor",
    keywords: [
      "cookie art gallery wall",
      "sugar cookie art decor",
      "dopamine decor kitchen",
      "art cookies display",
      "cookie canvas gallery",
    ],
    readingTime: "10 min read",
    category: "inspiration",
  },
  {
    slug: "foodie-gift-guide-jumbo-cookie-sculptures",
    title: "The Ultimate Foodie Gift Guide: Cookie Art They'll Never Forget",
    excerpt:
      "Looking for a unique gift for the food lover in your life? These handmade sugar cookie wall sculptures and art cookies are conversation starters that last forever — unlike real cookies.",
    publishedAt: "2024-09-10",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Cookie art gift idea - sugar cookie wall sculpture set by cookie artist Erynn",
    keywords: [
      "cookie art gifts",
      "sugar cookie art gift guide",
      "unique art cookies",
      "cookie canvas gift ideas",
      "handmade cookie artist gifts",
    ],
    readingTime: "7 min read",
    category: "gift-guide",
  },
  {
    slug: "chocolate-chip-cookie-wall-art-joirush-classic",
    title: "The Story Behind the Classic: Cookie Artist Erynn's Signature Cookie Art",
    excerpt:
      "Every sugar cookie wall sculpture tells a story. Discover how cookie artist Erynn's love for nostalgia and realistic sculpture became the signature JOIRUSH cookie art piece.",
    publishedAt: "2024-09-15",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Cookie art - classic chocolate chip sugar cookie wall sculpture by cookie artist Erynn",
    keywords: [
      "cookie art story",
      "cookie artist Erynn",
      "sugar cookie art creation",
      "handmade cookie canvas",
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
