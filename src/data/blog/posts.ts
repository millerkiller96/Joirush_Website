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
    slug: "dopamine-decor-ideas",
    title: "Dopamine Decor Ideas: How to Make Your Home Feel Happy",
    excerpt:
      "Dopamine decor ideas for every room: color, pattern, texture, and dopamine art that makes you smile. Practical tips to keep a joyful home from tipping into chaos.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/rainbow.jpg",
    imageAlt: "Dopamine decor idea: rainbow candy jumbo cookie wall art by JOIRUSH on a bright wall",
    keywords: [
      "dopamine decor",
      "dopamine decor ideas",
      "dopamine art",
      "dopamine decor kitchen",
      "colorful home decor",
      "jumbo cookie wall art",
    ],
    readingTime: "9 min read",
    category: "inspiration",
  },
  {
    slug: "maximalist-decor-ideas",
    title: "Maximalist Decor Ideas (and How Eclectic Decor Fits In)",
    excerpt:
      "Maximalist decor ideas that feel collected, not cluttered: how to pick an anchor piece, build a palette, mix patterns, and where eclectic decor fits in.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/hot-pink-mm.jpg",
    imageAlt: "Maximalist decor statement piece: hot pink M&M jumbo cookie wall art by JOIRUSH",
    keywords: [
      "maximalist decor",
      "maximalist decor ideas",
      "eclectic decor",
      "maximalist vs eclectic",
      "statement wall art",
      "sculptural decor",
    ],
    readingTime: "9 min read",
    category: "inspiration",
  },
  {
    slug: "whimsical-kitsch-decor-ideas",
    title: "Whimsical Decor & Kitsch Decor Ideas for a Playful Home",
    excerpt:
      "Whimsical decor and kitsch decor ideas that look styled instead of silly: food as art, playful scale, retro kitchens, and how to keep collections tidy.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/pastel-mm.jpg",
    imageAlt: "Whimsical decor idea: pastel M&M jumbo cookie wall art by JOIRUSH",
    keywords: [
      "whimsical decor",
      "kitsch decor",
      "whimsical home decor",
      "kitschy kitchen",
      "playful wall decor",
      "faux food decor",
    ],
    readingTime: "8 min read",
    category: "inspiration",
  },
  {
    slug: "eclectic-decor-ideas-mix-styles",
    title: "Eclectic Decor Ideas: How to Mix Styles Without Chaos",
    excerpt:
      "Eclectic decor ideas for mixing old and new, modern and vintage, serious and silly. A simple framework for a room that looks collected, not random.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/mm-classic.jpg",
    imageAlt: "Eclectic decor idea: classic M&M jumbo cookie wall art by JOIRUSH",
    keywords: ["eclectic decor ideas", "eclectic decor", "how to mix decor styles", "eclectic living room", "eclectic gallery wall"],
    readingTime: "4 min read",
    category: "inspiration",
  },
  {
    slug: "kitchen-wall-decor-ideas-coffee-bar-small-kitchens",
    title: "Kitchen Wall Decor Ideas for Coffee Bars and Small Kitchens",
    excerpt:
      "Kitchen wall decor ideas for the tricky spots: the coffee bar, the breakfast nook, above the cabinets, skinny walls, and rentals. What to hang and how high.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/mini-choc.jpg",
    imageAlt: "Kitchen wall decor idea: mini jumbo chocolate chip cookie wall art by JOIRUSH",
    keywords: ["kitchen wall decor ideas", "coffee bar wall decor", "small kitchen wall decor", "above kitchen cabinet decor", "kitchen wall art ideas"],
    readingTime: "5 min read",
    category: "how-to",
  },
  {
    slug: "dopamine-decor-playroom-kids-room",
    title: "Dopamine Decor for Playrooms and Kids' Rooms",
    excerpt:
      "How to bring dopamine decor into a playroom or kids' room: bold color with calm spots, storage that doubles as decor, and art kids and grownups both love.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/peanut-butter.jpg",
    imageAlt: "Dopamine decor playroom idea: peanut butter candy jumbo cookie wall art by JOIRUSH",
    keywords: ["dopamine decor playroom", "dopamine decor kids room", "colorful playroom ideas", "playroom wall decor", "fun kids room decor"],
    readingTime: "4 min read",
    category: "inspiration",
  },
  {
    slug: "retro-kitschy-kitchen-decor-ideas",
    title: "Retro Kitchen Decor Ideas: How to Do a Kitschy Kitchen Right",
    excerpt:
      "Retro and kitschy kitchen decor ideas without a renovation: diner colors, checks and gingham, thrifted collections, playful appliances, and fun food art.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/ice-cream.jpg",
    imageAlt: "Retro kitchen decor idea: jumbo cookie ice cream sandwich wall sculpture by JOIRUSH",
    keywords: ["retro kitchen decor ideas", "kitschy kitchen decor", "kitsch kitchen", "retro kitchen wall decor", "diner kitchen decor"],
    readingTime: "4 min read",
    category: "inspiration",
  },
  {
    slug: "add-color-to-neutral-home-without-painting",
    title: "How to Add Color to a Neutral Home Without Painting",
    excerpt:
      "Love your neutral walls but want more color? Ten renter friendly ways to add color to a neutral home, starting with one piece of art and a three color rule.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/white-choc.jpg",
    imageAlt: "Adding color to a neutral home: white chocolate chip jumbo cookie wall art by JOIRUSH",
    keywords: ["add color to neutral room", "add color without painting", "colorful home decor for neutral homes", "renter friendly color ideas", "colorful home decor"],
    readingTime: "4 min read",
    category: "how-to",
  },
  {
    slug: "3d-wall-art-vs-flat-prints",
    title: "3D Wall Art vs Flat Prints: When Sculptural Decor Wins",
    excerpt:
      "3D wall art vs flat prints: how depth, shadow, and texture change a wall, where sculptural wall decor works best, and how to mix both on one wall.",
    publishedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/double-choc.jpg",
    imageAlt: "3D wall art: giant double chocolate cookie wall sculpture by JOIRUSH",
    keywords: ["3d wall art", "3d wall art vs prints", "sculptural wall decor", "3d wall art ideas", "dimensional wall art"],
    readingTime: "4 min read",
    category: "how-to",
  },
  {
    slug: "spray-foam-cookie-wall-art-how-theyre-made",
    title: "Spray Foam Cookie Wall Art: How Collectors' Sculptures Are Made",
    excerpt:
      "Learn how spray foam cookie wall art is sculpted, painted, and sealed. Discover why this lightweight material creates realistic jumbo cookie sculptures that weigh just 2 to 4 lbs and hang on a single nail.",
    publishedAt: "2026-09-29",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Spray foam jumbo cookie wall sculpture: handmade faux cookie wall art by JOIRUSH",
    keywords: [
      "spray foam cookie wall art",
      "spray foam cookie sculpture",
      "jumbo cookie wall art",
      "faux cookie wall decor",
      "sugar cookie wall sculpture",
      "3d cookie wall sculpture",
      "cookie art",
    ],
    readingTime: "9 min read",
    category: "how-to",
  },
  {
    slug: "faux-cookie-wall-decor-ready-made-vs-diy",
    title: "Faux Cookie Wall Decor: Ready Made Sculptures vs DIY Giant Cookies",
    excerpt:
      "Comparing DIY faux cookie projects (foam board, salt dough tutorials) to buying handmade spray foam sugar cookie wall sculptures. Weight, texture, durability, and why collectors who want it done right choose ready made cookie art.",
    publishedAt: "2026-09-23",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Faux cookie wall decor: handmade spray foam sugar cookie wall sculpture vs DIY giant cookie",
    keywords: [
      "faux cookie wall decor",
      "giant faux cookie",
      "oversized cookie wall art",
      "DIY cookie wall art",
      "faux food wall art",
      "spray foam cookie sculpture",
      "sugar cookie wall sculpture",
      "cookie art",
    ],
    readingTime: "9 min read",
    category: "how-to",
  },
  {
    slug: "cookie-canvas-vs-3d-cookie-wall-sculptures",
    title: "Cookie Canvas Prints vs Handmade 3D Cookie Wall Sculptures: What Collectors Actually Hang",
    excerpt:
      "Flat cookie canvas prints vs 3D spray foam cookie wall sculptures: what's the difference and which do collectors actually hang? Learn why handmade sugar cookie wall sculptures from JOIRUSH offer the depth, texture, and statement piece impact that flat prints can't match.",
    publishedAt: "2026-09-22",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "3D cookie wall sculpture vs flat cookie canvas print: handmade sugar cookie wall art by JOIRUSH",
    keywords: [
      "cookie canvas",
      "cookie wall art",
      "sugar cookie wall sculpture",
      "art cookies",
      "3d cookie wall art",
      "cookie art",
      "faux food wall art",
      "cookie canvas print",
      "spray foam cookie wall art",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
  {
    slug: "cookie-wall-art-for-home-collectors",
    title: "Cookie Wall Art for Home Collectors: Faux Sugar Cookie Sculptures That Last Forever",
    excerpt:
      "A collector's guide to cookie wall art: faux sugar cookie wall sculptures that look real but aren't edible. Learn what makes these spray foam cookie sculptures different from royal icing cookies and how to choose the perfect piece for your home.",
    publishedAt: "2026-09-21",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Cookie wall art: handmade faux sugar cookie wall sculptures for home collectors by JOIRUSH",
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
      "Discover cookie art, the emerging trend of decorative sugar cookie wall sculptures that look real but last forever. Learn what makes art cookies different from edible sugar cookies and why cookie artists are creating faux food wall art for homes and kitchens.",
    publishedAt: "2024-09-20",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Cookie art: handmade sugar cookie wall sculpture that looks real by cookie artist Erynn",
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
    title: "How to Hang Jumbo Cookie Wall Art: Sugar Cookie Sculpture Display Guide",
    excerpt:
      "Learn how to hang jumbo cookie wall art safely and beautifully. Hardware tips, gallery wall layouts, and care for lightweight sugar cookie wall sculptures (2 to 4 lbs) made for home collectors.",
    publishedAt: "2024-09-01",
    updatedAt: "2026-10-04",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Cookie art: sugar cookie wall sculpture hanging in a bright kitchen by cookie artist Erynn",
    keywords: [
      "how to hang jumbo cookie wall art",
      "jumbo cookie wall art",
      "how to hang cookie art",
      "sugar cookie wall sculpture hanging",
      "hanging cookie canvas",
      "faux food wall art mounting",
      "cookie artist tips",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
  {
    slug: "kitchen-dopamine-decor-dessert-gallery-wall",
    title: "Kitchen Dopamine Decor: How to Build a Dessert Gallery Wall",
    excerpt:
      "Bring dopamine decor into the kitchen with a dessert gallery wall. How to pick a statement cookie, plan the layout, and choose colors that feel joyful and intentional.",
    publishedAt: "2024-09-05",
    updatedAt: "2026-10-08",
    author: "Erynn",
    image: "/images/products/rainbow.jpg",
    imageAlt: "Cookie art gallery wall: colorful sugar cookie wall sculptures creating dopamine decor",
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
      "Looking for a unique gift for the food lover in your life? These handmade sugar cookie wall sculptures and art cookies are conversation starters that last forever, unlike real cookies.",
    publishedAt: "2024-09-10",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Cookie art gift idea: sugar cookie wall sculpture set by cookie artist Erynn",
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
    imageAlt: "Cookie art: classic chocolate chip sugar cookie wall sculpture by cookie artist Erynn",
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
