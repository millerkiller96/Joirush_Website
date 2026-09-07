export type ProductCategory = "classic" | "candy" | "set" | "seasonal" | "statement";

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: number;
  compareAtPrice: number;
  size: string;
  category: ProductCategory;
  featured?: boolean;
  image: string;
  etsyUrl: string;
  stripeUrl: string;
  tagline: string;
  description: string;
  details: string[];
  materials: string;
  faqs: ProductFAQ[];
};

export const defaultFAQs: ProductFAQ[] = [
  {
    question: "Is this cookie edible?",
    answer: "No, this is a decorative wall sculpture made from spray foam and acrylic paint. It's designed to look realistic but is not food.",
  },
  {
    question: "How do I hang this on my wall?",
    answer: "Each piece comes with a built-in wall hanger on the back. Simply use a nail or picture hook rated for the weight (most pieces are under 3 lbs). No special hardware needed.",
  },
  {
    question: "How big is this piece?",
    answer: "Most jumbo cookies are approximately 16 inches in diameter. Check the specific listing for exact dimensions.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we ship free within the United States. For international orders, please contact us through the custom order form for a shipping quote.",
  },
  {
    question: "Can I order a custom version?",
    answer: "Absolutely! Visit our custom orders page to request a cookie in specific colors, sizes, or flavors. Erynn loves creating one-of-a-kind pieces.",
  },
];

export const products: Product[] = [
  {
    slug: "jumbo-chocolate-chip-cookie",
    name: "Jumbo Chocolate Chip Cookie Wall Art",
    shortName: "Classic Chocolate Chip",
    price: 100,
    compareAtPrice: 149,
    size: "16 × 16 in",
    category: "classic",
    featured: true,
    image: "/images/products/choc-chip.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831819997/jumbo-chocolate-chip-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/7sY14f8gr3287kmb9I2Nq00",
    tagline: "Your favorite comfort cookie — oversized and zero calories.",
    description:
      "This jumbo chocolate chip cookie looks so real you'll want to take a bite. Hand-sculpted and painted to mimic the perfect golden-brown finish and melty chips, it's the piece that started the sugar rush. Built to hang, built to turn heads.",
    details: [
      "16 × 16 inches",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
      "Highly realistic texture and shading",
      "Perfect for kitchens, playrooms, dessert rooms, and content studios",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: [
      ...defaultFAQs,
      {
        question: "What makes this different from commercial food props?",
        answer: "Unlike heavy fiberglass commercial props that cost $350+, this is a lightweight (~2 lb) handmade art piece that's easy to hang. Each cookie is individually sculpted with unique texture and character.",
      },
    ],
  },
  {
    slug: "oversized-mini-cookie-pair",
    name: "Oversized Mini Cookie Wall Decor Set",
    shortName: "Mini Cookie Pair",
    price: 175,
    compareAtPrice: 249,
    size: "14 in pair",
    category: "set",
    featured: true,
    image: "/images/products/mini-set.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452655428/oversized-mini-cookie-wall-decor-set",
    stripeUrl: "https://buy.stripe.com/cNi7sD2W79qwgUWgu22Nq01",
    tagline: "A handmade 14-inch pair made to be hung together.",
    description:
      "Two oversized 'mini' cookies, designed as a set for walls that want twice the sweetness. Each piece is handmade food art with thick sculptural texture — playful, collectible, and ready to display as a pair.",
    details: [
      "Two 14-inch handmade cookies",
      "Designed to be displayed together",
      "Spray foam + acrylic paint",
      "Lightweight with built-in hangers",
      "One of a kind",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "jumbo-mm-cookie-set",
    name: "Jumbo M&M Cookie Wall Art Set",
    shortName: "M&M Cookie Set",
    price: 225,
    compareAtPrice: 325,
    size: "16 in pair",
    category: "set",
    featured: true,
    image: "/images/products/mm-set.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452651114/jumbo-mm-cookie-wall-art-set-fake-cookie",
    stripeUrl: "https://buy.stripe.com/eVq5kvcwH5ag7km6Ts2Nq02",
    tagline: "Two 16-inch pop-art cookies for maximum visual impact.",
    description:
      "This jumbo cookie wall art set includes two handmade oversized cookies designed to be displayed together. Each piece features thick sculptural texture, candy color, and realistic detailing — playful, bold, and collectible. Art that feels fun, nostalgic, and unforgettable.",
    details: [
      "Two 16-inch jumbo cookies",
      "Handmade and one of a kind",
      "Lightweight and durable",
      "Designed to be displayed together",
      "Perfect for large walls, kitchens, living spaces, and studios",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "jumbo-white-chocolate-chip-cookie",
    name: "Jumbo White Chocolate Chip Cookie Wall Art",
    shortName: "White Chocolate Chip",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "classic",
    image: "/images/products/white-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452647836/jumbo-white-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/fZucMXfIT46c5cedhQ2Nq03",
    tagline: "A softer golden cookie with creamy white chips.",
    description:
      "A jumbo white chocolate chip cookie sculpted with the same bakery-case realism as the classic — just a little more vanilla-dream. Hand-painted chips, craggy edges, and that just-baked glow, made for dessert-forward rooms.",
    details: [
      "Approximately 16 inches",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
      "Pop-art dessert decor",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "rainbow-candy-cookie",
    name: "Rainbow Candy Cookie Wall Art",
    shortName: "Rainbow Candy Cookie",
    price: 90,
    compareAtPrice: 129,
    size: "14 in",
    category: "candy",
    featured: true,
    image: "/images/products/rainbow.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452645632/colorful-candy-cookie-wall-decor",
    stripeUrl: "https://buy.stripe.com/cNi6oz40b0U0awy3Hg2Nq04",
    tagline: "A 14-inch sculpture studded with candy-color chips.",
    description:
      "A handmade 14-inch rainbow candy cookie — beige dough texture with jewel-bright chips in orange, purple, yellow, red, blue, and green. Candyland energy for kitchens, playrooms, and anyone collecting color.",
    details: [
      "14-inch handmade sculpture",
      "Rainbow candy chips",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "mini-jumbo-chocolate-chip-cookie",
    name: "Mini Jumbo Chocolate Chip Cookie Wall Art",
    shortName: "Mini Jumbo Chip",
    price: 90,
    compareAtPrice: 129,
    size: "Mini jumbo",
    category: "classic",
    image: "/images/products/mini-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452643820/mini-jumbo-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/3cI14f0NZ46ceMOelU2Nq05",
    tagline: "The classic chip cookie, scaled for smaller walls.",
    description:
      "All the golden-brown crumble and glossy chips of the jumbo classic, in a slightly more intimate size. Still a statement. Still handmade. Still the kind of piece people try to steal a bite from.",
    details: [
      "Smaller jumbo format",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
      "Dessert-themed wall decor",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "jumbo-pastel-mm-cookie",
    name: "Jumbo Pastel M&M Cookie Wall Art",
    shortName: "Pastel M&M Cookie",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "candy",
    image: "/images/products/pastel-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452635945/jumbo-pastel-mm-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/7sY6oz68jcCIcEGcdM2Nq06",
    tagline: "Candyland, but make it soft and dreamy.",
    description:
      "A jumbo cookie loaded with pastel candy pieces — lavender, baby blue, blush, and mint energy on a golden sculpted base. Soft color, loud texture. Candyland dessert decor with a gentler palette.",
    details: [
      "Jumbo format",
      "Pastel candy detailing",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "jumbo-christmas-cookie",
    name: "Jumbo Christmas Cookie Wall Art",
    shortName: "Christmas Cookie",
    price: 100,
    compareAtPrice: 149,
    size: "16 in",
    category: "seasonal",
    image: "/images/products/christmas.jpg",
    etsyUrl: "https://www.etsy.com/listing/4438064219/jumbo-christmas-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/7sY5kv9kveKQ48a3Hg2Nq07",
    tagline: "Faux candy dessert decor for the holiday wall.",
    description:
      "A jumbo Christmas cookie with festive candy energy — the holiday piece that doesn't crumble, doesn't stale, and doesn't leave crumbs under the tree. Handmade faux candy dessert decor for seasonal kitchens and year-round maximalists.",
    details: [
      "Jumbo holiday sculpture",
      "Faux candy dessert decor",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "giant-peanut-butter-cookie",
    name: "Giant Peanut Butter Cookie Wall Art",
    shortName: "Peanut Butter Cookie",
    price: 100,
    compareAtPrice: 149,
    size: "16 in",
    category: "classic",
    image: "/images/products/peanut-butter.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817504830/giant-peanut-butter-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/fZufZ954fcCIeMOgu22Nq08",
    tagline: "Warm peanut-butter dough with colorful candy pops.",
    description:
      "A giant peanut butter cookie with colorful candy decor — richer dough tones, craggy handmade texture, and a little extra sweetness on top. Comfort-food nostalgia as wall sculpture.",
    details: [
      "Giant format",
      "Colorful candy accents",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "giant-double-chocolate-cookie",
    name: "Giant Faux Double Chocolate Chip Cookie",
    shortName: "Double Chocolate",
    price: 110,
    compareAtPrice: 159,
    size: "16 in",
    category: "classic",
    image: "/images/products/double-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817632262/giant-faux-double-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/3cI6oz0NZ8msdIKfpY2Nq09",
    tagline: "Darker dough. Deeper chips. Same sugar-rush attitude.",
    description:
      "A giant faux double chocolate chip cookie for anyone who likes their dessert decor extra rich. Darker baked tones, glossy chips, and the same hand-sculpted texture that makes every JoiRush piece look good enough to eat.",
    details: [
      "Giant format",
      "Double chocolate finish",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "cookie-ice-cream-sandwich",
    name: "Jumbo Cookie Ice Cream Sandwich Wall Art",
    shortName: "Ice Cream Sandwich",
    price: 220,
    compareAtPrice: 315,
    size: "Statement piece",
    category: "statement",
    featured: true,
    image: "/images/products/ice-cream.jpg",
    etsyUrl: "https://www.etsy.com/listing/1892110346/jumbo-chocolate-chip-cookie-ice-cream",
    stripeUrl: "https://buy.stripe.com/14A3cnfITgSYgUW7Xw2Nq0a",
    tagline: "Two jumbo cookies, one vanilla slab, zero melt.",
    description:
      "A jumbo chocolate chip cookie ice cream sandwich — two textured cookies hugging a thick vanilla layer. The ultimate dessert wall statement: nostalgic, oversized, and completely calorie-free. Made for rooms that want a conversation starter.",
    details: [
      "Statement dessert sculpture",
      "Cookie + faux ice cream construction",
      "Spray foam + acrylic paint",
      "Dessert wall decor",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: [
      ...defaultFAQs,
      {
        question: "How heavy is the ice cream sandwich?",
        answer: "Despite its size, the ice cream sandwich is lightweight at around 4-5 lbs. It's designed to hang securely on standard picture hooks.",
      },
    ],
  },
  {
    slug: "jumbo-mm-cookie",
    name: "Jumbo M&M Cookie Wall Art",
    shortName: "Classic M&M Cookie",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "candy",
    image: "/images/products/mm-classic.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831839675/jumbo-mm-cookie-wall-art-candyland",
    stripeUrl: "https://buy.stripe.com/3cIbITcwHdGM3462Dc2Nq0b",
    tagline: "Candyland dessert decor with glossy candy pieces.",
    description:
      "A single jumbo M&M cookie — golden sculpted dough, chocolate chunks, and candy-coated pops of color. Candyland dessert decor that reads as pop art from across the room.",
    details: [
      "Jumbo format",
      "Candy + chocolate detailing",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "hot-pink-mm-cookie",
    name: "Hot Pink Jumbo M&M Cookie Wall Art",
    shortName: "Hot Pink M&M Cookie",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/hot-pink-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831836105/hot-pink-jumbo-mm-cookie-candyland-wall",
    stripeUrl: "https://buy.stripe.com/9B65kv0NZ1Y448a0v42Nq0c",
    tagline: "The loudest cookie on the wall.",
    description:
      "A hot pink jumbo cookie studded with candy pieces and dark chocolate chunks. Maximal, playful, and unapologetically extra — candyland wall art for rooms that already know who they are.",
    details: [
      "Hot pink sculpted finish",
      "Candy and chocolate accents",
      "Spray foam + acrylic paint",
      "Built-in wall hanger",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
];

export const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All pieces",
  classic: "Classic cookies",
  candy: "Candy & color",
  set: "Sets",
  seasonal: "Seasonal",
  statement: "Statement",
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getRelatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateSavings(price: number, compareAtPrice: number) {
  const savings = compareAtPrice - price;
  const percent = Math.round((savings / compareAtPrice) * 100);
  return { savings, percent };
}
