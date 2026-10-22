export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Optional shorter title for the search result title tag (the H1 keeps title). */
  seoTitle?: string;
  /** Optional search snippet (the blog card keeps excerpt). */
  metaDescription?: string;
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
    slug: "giant-cookie-prop-vs-cookie-wall-art",
    title: "Giant Cookie Prop vs Cookie Wall Art: Which Giant Cookie Should You Buy?",
    seoTitle: "Giant Cookie Prop vs Cookie Wall Art: Which to Buy",
    metaDescription:
      "Giant cookie prop or cookie wall art? How party props and handmade wall sculptures differ in size, finish, and hanging, and which fits your home or event.",
    excerpt:
      "Party props are built for one event. Cookie wall art is built to live on your wall. Here is how they compare and how to pick the right giant cookie.",
    publishedAt: "2026-10-22",
    updatedAt: "2026-10-22",
    author: "Erynn",
    image: "/images/products/ice-cream.jpg",
    imageAlt: "Giant cookie wall art: handmade jumbo ice cream sandwich cookie sculpture by JOIRUSH",
    keywords: [
      "giant cookie prop",
      "giant cookie wall art",
      "giant cookie decor",
      "big cookie prop",
      "cookie party prop",
      "oversized cookie decor",
    ],
    readingTime: "5 min read",
    category: "how-to",
  },
  {
    slug: "jumbo-cookie-wall-art-size-guide",
    title: "Jumbo Cookie Wall Art Size Guide: How Big Is a Giant Cookie on Your Wall?",
    seoTitle: "Jumbo Cookie Wall Art Size Guide: Real Sizes and Weights",
    metaDescription:
      "How big is jumbo cookie wall art? Real sizes and weights for every JOIRUSH cookie sculpture, plus how to pick a size for your kitchen, nook, or gallery wall.",
    excerpt:
      "Real sizes for every JOIRUSH cookie, how a 16 inch piece reads on a wall, when a 14 inch or a pair fits better, and how giant cookie sculptures compare to props and resin statues.",
    publishedAt: "2026-10-19",
    updatedAt: "2026-10-19",
    author: "Erynn",
    image: "/images/products/choc-chip.jpg",
    imageAlt: "Jumbo cookie wall art size guide: 16 inch handmade chocolate chip cookie sculpture by JOIRUSH",
    keywords: [
      "jumbo cookie wall art size",
      "giant cookie wall art",
      "giant cookie prop",
      "how big is a giant cookie",
      "oversized cookie wall decor",
      "cookie wall sculpture size",
    ],
    readingTime: "6 min read",
    category: "how-to",
  },
  {
    slug: "christmas-cookie-wall-art-vs-prints",
    title: "Christmas Cookie Wall Art vs Flat Prints: What Collectors Hang for the Holidays",
    seoTitle: "Christmas Cookie Wall Art vs Flat Holiday Prints",
    metaDescription:
      "Christmas cookie wall art vs flat prints and printables: why collectors choose 3D holiday cookie sculptures for festive wall decor that lasts all season.",
    excerpt:
      "Amazon is full of flat Christmas cookie printables. Collectors hang something else: handmade 3D Christmas cookie wall art with real depth, holiday color, and no crumbs under the tree.",
    publishedAt: "2026-10-16",
    updatedAt: "2026-10-16",
    author: "Erynn",
    image: "/images/products/christmas.jpg",
    imageAlt: "Christmas cookie wall art: handmade festive jumbo cookie wall sculpture by JOIRUSH",
    keywords: [
      "christmas cookie wall art",
      "holiday cookie wall decor",
      "festive faux cookie sculpture",
      "christmas cookie sculpture",
      "holiday wall decor",
      "3d christmas cookie art",
      "jumbo christmas cookie",
    ],
    readingTime: "8 min read",
    category: "how-to",
  },
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
    seoTitle: "Kitchen Wall Decor for Coffee Bars and Small Kitchens",
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
    seoTitle: "Retro Kitchen Decor Ideas for a Kitschy Kitchen",
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
    seoTitle: "Spray Foam Cookie Wall Art: How It's Made",
    metaDescription: "How spray foam cookie wall art is sculpted, painted, and sealed by hand, and why each jumbo cookie sculpture weighs just 2 to 4 lbs.",
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
    seoTitle: "Faux Cookie Wall Decor: Ready Made vs DIY",
    metaDescription: "DIY giant cookie projects vs handmade spray foam cookie sculptures: weight, texture, durability, and which faux cookie wall decor really lasts.",
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
    seoTitle: "Cookie Canvas Prints vs 3D Cookie Wall Sculptures",
    metaDescription: "Cookie canvas prints vs handmade 3D cookie wall sculptures: how they compare on depth, texture, and price, and which one collectors actually hang.",
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
    seoTitle: "Cookie Wall Art for Home Collectors: A Buying Guide",
    metaDescription: "A collector's guide to cookie wall art: faux sugar cookie sculptures that look real, last forever, and hang on one nail. How to choose your piece.",
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
    seoTitle: "What Is Cookie Art? Sugar Cookie Art Explained",
    metaDescription: "Cookie art can mean edible royal icing cookies or sugar cookie wall sculptures that last forever. How art cookies differ and what a cookie artist makes.",
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
    seoTitle: "How to Hang Jumbo Cookie Wall Art",
    metaDescription: "How to hang jumbo cookie wall art: the right hardware, gallery wall layouts, and care tips for lightweight sugar cookie sculptures (2 to 4 lbs).",
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
    seoTitle: "Kitchen Dopamine Decor: Dessert Gallery Wall Ideas",
    metaDescription: "Bring dopamine decor into the kitchen with a dessert gallery wall: how to pick a statement cookie, plan the layout, and choose joyful colors.",
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
    seoTitle: "Foodie Gift Guide: Cookie Art They'll Never Forget",
    metaDescription:
      "Holiday and year round foodie gift ideas: handmade jumbo cookie wall art, including Christmas cookie wall sculptures with free U.S. shipping and a 14 day lead time.",
    excerpt:
      "Looking for a unique gift for the food lover in your life? These handmade sugar cookie wall sculptures and art cookies are conversation starters that last forever, unlike real cookies.",
    publishedAt: "2024-09-10",
    updatedAt: "2026-10-16",
    author: "Erynn",
    image: "/images/products/mm-set.jpg",
    imageAlt: "Cookie art gift idea: sugar cookie wall sculpture set by cookie artist Erynn",
    keywords: [
      "cookie art gifts",
      "holiday foodie gifts",
      "christmas cookie wall art gift",
      "sugar cookie art gift guide",
      "unique art cookies",
      "handmade cookie artist gifts",
    ],
    readingTime: "8 min read",
    category: "gift-guide",
  },
  {
    slug: "chocolate-chip-cookie-wall-art-joirush-classic",
    title: "The Story Behind the Classic: Cookie Artist Erynn's Signature Cookie Art",
    seoTitle: "The Story Behind Erynn's Classic Cookie Art",
    metaDescription: "How cookie artist Erynn's love of nostalgia and realistic sculpture became the signature JOIRUSH chocolate chip cookie wall art piece.",
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
