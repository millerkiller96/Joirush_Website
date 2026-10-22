import etsySyncData from "./etsy-sync.json";

export type ProductCategory = "classic" | "candy" | "seasonal" | "statement";

export type ProductFAQ = {
  question: string;
  answer: string;
};

/**
 * Synced data from Etsy API (populated by scripts/sync-etsy.mjs)
 * All values here are optional with fallbacks to hardcoded values in products array.
 * NOTE: Stripe Payment Links are NOT auto-updated from Etsy prices.
 *       The price sync is for display purposes; Stripe checkout must be updated manually.
 */
export type EtsySyncListing = {
  listingId: string;
  title?: string;
  price?: number | null;
  originalPrice?: number | null;
  state?: string;
  views?: number;
  numFavorers?: number;
  quantity?: number;
  lastModified?: number;
};

export type EtsySyncShop = {
  shopId: number;
  shopName: string;
  title?: string;
  reviewAverage?: number;
  reviewCount?: number;
  listingActiveCount?: number;
  transactionSoldCount?: number;
};

export type EtsySyncReview = {
  rating: number;
  review: string;
  createTimestamp: number;
  buyerUserId?: number;
};

export type EtsySyncData = {
  syncedAt: string | null;
  listings: Record<string, EtsySyncListing>;
  shop: EtsySyncShop | null;
  reviews: {
    count: number;
    reviews: EtsySyncReview[];
  } | null;
};

const syncData = etsySyncData as EtsySyncData;

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
  stripeUpsellUrl: string;
  stripePairUrls?: Record<string, string>;
  upsellPairPrice: number;
  tagline: string;
  /** Optional search snippet lead (no price; the page appends price + shipping). */
  metaDescription?: string;
  description: string;
  details: string[];
  materials: string;
  faqs: ProductFAQ[];
};

export const defaultFAQs: ProductFAQ[] = [
  {
    question: "Is this cookie art edible?",
    answer: "No, this is decorative cookie art: a wall sculpture made from spray foam and acrylic paint. These art cookies are designed to look like real sugar cookies but are not food. They're faux food wall art meant to last forever on your wall.",
  },
  {
    question: "What is cookie art?",
    answer: "Cookie art refers to decorative sugar cookie wall sculptures, handmade faux food wall art that looks like real cookies. Unlike edible sugar cookie art, these pieces are crafted from durable materials by a cookie artist and designed to hang on your wall permanently.",
  },
  {
    question: "How long does shipping take?",
    answer: "Each cookie art piece ships in 14 days. Every sugar cookie wall sculpture is handcrafted to order by cookie artist Erynn. The 14 day timeline includes handmade production and shipping. True artistry takes time.",
  },
  {
    question: "How do I hang this cookie canvas on my wall?",
    answer: "Each cookie art piece comes with an attached wall hanger on the back. Simply use a nail or picture hook rated for the weight (most pieces weigh 2 to 4 lbs). These sugar cookie wall sculptures are lightweight and easy to hang.",
  },
  {
    question: "How big is this art cookie?",
    answer: "Most jumbo cookie art pieces are approximately 16 inches in diameter. Check the specific listing for exact dimensions of each sugar cookie wall sculpture.",
  },
  {
    question: "Do you ship cookie art internationally?",
    answer: "Currently we offer free U.S. shipping with 14 day handmade production and delivery. For international cookie art orders, please contact us through the custom order form for a shipping quote.",
  },
  {
    question: "Can I commission custom cookie art?",
    answer: "Absolutely! Visit our custom orders page to commission sugar cookie wall sculptures in specific colors, sizes, or flavors. Cookie artist Erynn loves creating one of a kind art cookies.",
  },
];

export const products: Product[] = [
  {
    slug: "jumbo-chocolate-chip-cookie",
    name: "Jumbo Chocolate Chip Cookie Wall Art | Classic Sugar Cookie Sculpture",
    shortName: "Classic Chocolate Chip",
    price: 100,
    compareAtPrice: 149,
    size: "16 × 16 in",
    category: "classic",
    featured: true,
    image: "/images/products/choc-chip.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831819997/jumbo-chocolate-chip-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/bJe9AN6B5eQ66DW1z69fW00",
    stripeUpsellUrl: "https://buy.stripe.com/00wbIV4sX0Zg3rK91y9fW0r",
    upsellPairPrice: 190,
    tagline: "The cookie art that started it all. Golden crumble. Glossy chips. Zero guilt.",
    description:
      "Golden brown edges. Thick, craggy dough. Chocolate chips catching the light like they just came out of the oven. This cookie art classic is a sugar cookie wall sculpture that makes guests reach out before their brain catches up, then laugh when they realize it's faux food wall art. Cookie canvas comfort for your wall, forever, and the easiest piece of kitchen wall art to love.",
    metaDescription:
      "The classic 16 inch jumbo chocolate chip cookie wall art, handmade from spray foam and acrylic. Cozy, fun kitchen wall art.",
    details: [
      "16 × 16 inches, a statement cookie art size",
      "Handmade by cookie artist Erynn",
      "Attached hanger, so you can hang this cookie canvas tonight",
      "Sculptural sugar cookie art texture you can see from across the room",
      "Perfect for kitchens, playrooms, and spaces that need joy",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: [
      ...defaultFAQs,
      {
        question: "What makes this cookie art different from commercial food props?",
        answer: "Unlike heavy fiberglass commercial props that cost $350+, this is a lightweight (~2 lb) handmade sugar cookie wall sculpture that's easy to hang. Each art cookie is individually sculpted by cookie artist Erynn with unique texture and character.",
      },
    ],
  },
  {
    slug: "jumbo-white-chocolate-chip-cookie",
    name: "Jumbo White Chocolate Chip Cookie Wall Art",
    shortName: "White Chocolate Chip",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "classic",
    featured: true,
    image: "/images/products/white-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452647836/jumbo-white-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/fZu7sF1gLdM22nGfpW9fW06",
    stripeUpsellUrl: "https://buy.stripe.com/cNibIV8JdfUaaUc91y9fW0B",
    upsellPairPrice: 218,
    tagline: "Soft vanilla vibes. Creamy white chips. Dreamy energy.",
    description:
      "The same golden crumble as the classic, with a softer palette: creamy white chips on warm golden dough. It's the white chocolate lover's fantasy, frozen in sculpture. Craggy edges. That just baked glow. Perfect for kitchens that lean light, bright, and sweet.",
    details: [
      "Approximately 16 inches",
      "Spray foam + acrylic paint",
      "Attached hanger, up in minutes",
      "Dreamy dessert decor energy",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "rainbow-candy-cookie",
    name: "Rainbow Jumbo Cookie Wall Art | Colorful Sugar Cookie Sculpture",
    shortName: "Rainbow Candy Cookie",
    price: 90,
    compareAtPrice: 129,
    size: "14 in",
    category: "candy",
    featured: true,
    image: "/images/products/rainbow.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452645632/colorful-candy-cookie-wall-decor",
    stripeUrl: "https://buy.stripe.com/28EdR3gbF6jA5zSelS9fW08",
    stripeUpsellUrl: "https://buy.stripe.com/6oU3cpe3x23kgewelS9fW0D",
    upsellPairPrice: 171,
    tagline: "Jewel bright cookie art. Pure dopamine. $90.",
    description:
      "Orange. Purple. Yellow. Red. Blue. Green. Jewel bright candy chips scattered across golden dough like confetti at a party. This cookie art turns boring walls into Candyland: playrooms, kitchens, anywhere that needs pure, unfiltered joy. At $90, it's the most colorful sugar cookie wall sculpture you can hang, and an easy first step into dopamine decor.",
    metaDescription:
      "Rainbow candy jumbo cookie wall art, handmade from spray foam and acrylic. Colorful wall art for kitchens and playrooms.",
    details: [
      "14 inch handmade cookie art",
      "Rainbow candy chips in every color of art cookies",
      "Crafted by cookie artist Erynn",
      "Attached hanger, so this cookie canvas goes up with no tools",
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
    stripeUrl: "https://buy.stripe.com/3cIbIVcZtgYe5zS91y9fW0a",
    stripeUpsellUrl: "https://buy.stripe.com/5kQdR34sX37o3rK6Tq9fW0F",
    upsellPairPrice: 171,
    tagline: "Big impact. Smaller footprint. Same irresistible crumble.",
    description:
      "All the golden brown goodness of the jumbo classic, sized for cozier spaces. Glossy chips. Thick, craggy texture. Still makes people reach out. Still makes them laugh when they realize it's not real. The entry point to cookie wall art addiction.",
    details: [
      "Mini jumbo format, perfect for smaller walls",
      "Spray foam + acrylic paint",
      "Attached hanger, so you can hang it tonight",
      "The gateway cookie",
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
    stripeUrl: "https://buy.stripe.com/bJefZbe3x9vM9Q8dhO9fW0c",
    stripeUpsellUrl: "https://buy.stripe.com/eVqbIV9NhdM20fyfpW9fW0G",
    upsellPairPrice: 218,
    tagline: "Candy vibes. Softer palette. Still stops the room.",
    description:
      "Lavender. Baby blue. Blush. Mint. Pastel candy pops on golden sculpted dough. All the fun of Candyland with a gentler, dreamier aesthetic. Perfect for nurseries, whimsical playrooms, soft maximalist kitchens, or anyone who wants bold art in a softer color story. Loud texture, quiet palette.",
    details: [
      "Jumbo 16 inch format",
      "Pastel candy detailing",
      "Spray foam + acrylic paint",
      "Attached hanger, ready to display",
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
    stripeUrl: "https://buy.stripe.com/00waERe3xazQ8M41z69fW0e",
    stripeUpsellUrl: "https://buy.stripe.com/7sYdR3f7BdM28M42Da9fW0L",
    upsellPairPrice: 190,
    tagline: "Christmas cookie wall art with festive candy color and zero crumbs.",
    description:
      "Holiday candy colors on golden dough make this Christmas cookie wall art a seasonal statement for holiday wall decor. Hang it in November, keep it through New Year's (or all year, we won't judge). No crumbs. No calories. Just festive faux cookie sculpture dopamine that lasts forever.",
    details: [
      "Jumbo 16 inch Christmas cookie wall sculpture",
      "Festive candy color palette for holiday wall decor",
      "Spray foam + acrylic paint",
      "Attached hanger, ready for festive decor swaps",
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
    stripeUrl: "https://buy.stripe.com/6oU7sFgbFbDU6DW91y9fW0g",
    stripeUpsellUrl: "https://buy.stripe.com/9B64gtbVp37ofas7Xu9fW0M",
    upsellPairPrice: 190,
    tagline: "Rich peanut butter dough. Candy pops. Pure nostalgia.",
    description:
      "Warm, nutty peanut butter tones with candy confetti on top, like grandma's kitchen, but cooler. Craggy handmade texture that begs to be touched. This is comfort food as kitchen wall art, for anyone who grew up sneaking cookies from the cooling rack.",
    details: [
      "Giant 16 inch format",
      "Colorful candy accents on PB dough",
      "Spray foam + acrylic paint",
      "Attached hanger, so you can hang it today",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "giant-double-chocolate-cookie",
    name: "Giant Double Chocolate Cookie Wall Art | Jumbo Faux Cookie",
    shortName: "Double Chocolate",
    price: 110,
    compareAtPrice: 159,
    size: "16 in",
    category: "classic",
    image: "/images/products/double-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817632262/giant-faux-double-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/3cIeV7f7B37o2nG91y9fW0i",
    stripeUpsellUrl: "https://buy.stripe.com/9B628lgbF0Zgd2kcdK9fW0N",
    upsellPairPrice: 209,
    tagline: "Twice the chocolate. Twice the temptation. Zero regrets.",
    description:
      "Dark cocoa dough. Glossy chocolate chips. This is for the people who look at a regular chocolate chip cookie and think 'needs more chocolate.' Moody, decadent, and absolutely showstopping. It's the darkest piece in the collection.",
    details: [
      "Giant 16 inch format",
      "Double chocolate finish, deep and dramatic",
      "Spray foam + acrylic paint",
      "Attached hanger: moody decor, easy install",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "cookie-ice-cream-sandwich",
    name: "Jumbo Ice Cream Sandwich Cookie Wall Art | Statement Sculpture",
    shortName: "Ice Cream Sandwich",
    price: 220,
    compareAtPrice: 315,
    size: "Statement piece",
    category: "statement",
    featured: true,
    image: "/images/products/ice-cream.jpg",
    etsyUrl: "https://www.etsy.com/listing/1892110346/jumbo-chocolate-chip-cookie-ice-cream",
    stripeUrl: "https://buy.stripe.com/00wcMZ1gL6jA1jC5Pm9fW0k",
    stripeUpsellUrl: "https://buy.stripe.com/9B614h6B50Zg7I01z69fW0O",
    upsellPairPrice: 418,
    tagline: "The showstopper cookie art. Two cookies. Vanilla slab. Zero melt.",
    description:
      "Two golden sugar cookie wall sculptures hugging a thick vanilla ice cream layer, frozen in time, permanently delicious, zero mess. It's sculptural decor with a sense of humor: a statement piece that stops conversations and starts new ones. The ultimate childhood treat as adult faux food wall art. Warning: this art cookie will become the most photographed thing in your home.",
    metaDescription:
      "Jumbo cookie ice cream sandwich wall sculpture, handmade from spray foam and acrylic. Our biggest statement piece.",
    details: [
      "Statement cookie canvas, the biggest flex",
      "Cookie art + faux ice cream construction",
      "Handmade by cookie artist Erynn",
      "Still only about 4 to 5 lbs, so it hangs on standard hooks",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: [
      ...defaultFAQs,
      {
        question: "How heavy is this cookie art statement piece?",
        answer: "Despite its size, this sugar cookie wall sculpture is lightweight at around 4 to 5 lbs. It's designed to hang securely on standard picture hooks.",
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
    featured: true,
    image: "/images/products/mm-classic.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831839675/jumbo-mm-cookie-wall-art-candyland",
    stripeUrl: "https://buy.stripe.com/cNidR3cZt5fwbYg0v29fW0m",
    stripeUpsellUrl: "https://buy.stripe.com/aFa6oBe3xfUa5zS51y9fW0P",
    upsellPairPrice: 218,
    tagline: "Golden dough. Candy confetti. Instant serotonin.",
    description:
      "Classic M&M cookie energy: golden sculpted dough scattered with glossy candy pieces and chocolate chunks. Reads as pop art from across the room, with just the right amount of kitsch. The kind of piece that makes people smile before they even realize they're smiling.",
    details: [
      "Jumbo 16 inch format",
      "Candy + chocolate detailing",
      "Spray foam + acrylic paint",
      "Attached hanger, ready to display",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
  {
    slug: "hot-pink-mm-cookie",
    name: "Hot Pink M&M Cookie Wall Art | Jumbo Sugar Cookie Sculpture",
    shortName: "Hot Pink M&M Cookie",
    price: 115,
    compareAtPrice: 165,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/hot-pink-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831836105/hot-pink-jumbo-mm-cookie-candyland-wall",
    stripeUrl: "https://buy.stripe.com/4gMfZb2kPgYefas4Li9fW0o",
    stripeUpsellUrl: "https://buy.stripe.com/3cI9AN7F98rIbYg0v29fW0Q",
    upsellPairPrice: 218,
    tagline: "Loud. Pink. Unapologetic. The main character cookie art.",
    description:
      "Hot pink dough. Candy confetti. Dark chocolate chunks. This sugar cookie wall sculpture screams 'I have a personality.' Maximalist, playful, and completely unapologetic cookie art. For rooms that are already bold and people who don't do subtle. The main character art cookie of the collection.",
    metaDescription:
      "Hot pink M&M jumbo cookie wall art, handmade from spray foam and acrylic. A bold statement piece for maximalist rooms.",
    details: [
      "Hot pink cookie canvas finish that is impossible to ignore",
      "Candy and chocolate accents",
      "Handmade by cookie artist Erynn",
      "Attached hanger, so this faux food wall art commands attention right away",
    ],
    materials: "Spray foam, acrylic paint",
    faqs: defaultFAQs,
  },
];

export const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All pieces",
  classic: "Classic cookies",
  candy: "Candy & color",
  seasonal: "Seasonal",
  statement: "Statement",
};

/** Display name without the " | " search qualifier, used for headings and schema names. */
export function getDisplayName(product: { name: string }) {
  return product.name.split("|")[0].trim();
}

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

/**
 * Get synced price for a product with fallback to hardcoded value.
 * Returns the Etsy-synced price if available, otherwise the original hardcoded price.
 */
export function getSyncedPrice(slug: string): number {
  const product = getProduct(slug);
  if (!product) return 0;

  const synced = syncData.listings?.[slug];
  if (synced?.price != null && synced.price > 0) {
    return synced.price;
  }
  return product.price;
}

/**
 * Get synced compare-at price for a product with fallback to hardcoded value.
 * Uses Etsy's original_price if synced, otherwise falls back to hardcoded compareAtPrice.
 */
export function getSyncedCompareAtPrice(slug: string): number {
  const product = getProduct(slug);
  if (!product) return 0;

  const synced = syncData.listings?.[slug];
  if (synced?.originalPrice != null && synced.originalPrice > 0) {
    return synced.originalPrice;
  }
  return product.compareAtPrice;
}

/**
 * Get shop stats (rating, review count, etc.) with fallback defaults.
 */
export function getShopStats(): {
  reviewAverage: number;
  reviewCount: number;
  transactionSoldCount: number;
  syncedAt: string | null;
} {
  if (syncData.shop) {
    return {
      reviewAverage: syncData.shop.reviewAverage ?? 5.0,
      reviewCount: syncData.shop.reviewCount ?? 0,
      transactionSoldCount: syncData.shop.transactionSoldCount ?? 0,
      syncedAt: syncData.syncedAt,
    };
  }
  // Fallback defaults when no sync data
  return {
    reviewAverage: 5.0,
    reviewCount: 0,
    transactionSoldCount: 0,
    syncedAt: null,
  };
}

/**
 * Get recent reviews from Etsy with fallback to empty array.
 */
export function getShopReviews(): EtsySyncReview[] {
  return syncData.reviews?.reviews ?? [];
}

/**
 * Get listing-specific stats (views, favorites) with fallbacks.
 */
export function getListingStats(slug: string): {
  views: number;
  favorites: number;
  quantity: number;
} {
  const synced = syncData.listings?.[slug];
  return {
    views: synced?.views ?? 0,
    favorites: synced?.numFavorers ?? 0,
    quantity: synced?.quantity ?? 0,
  };
}

/**
 * Check if sync data is available and recent.
 */
export function isSyncDataAvailable(): boolean {
  return syncData.syncedAt != null && Object.keys(syncData.listings).length > 0;
}

/**
 * Get the timestamp of the last successful sync.
 */
export function getLastSyncTime(): string | null {
  return syncData.syncedAt;
}
