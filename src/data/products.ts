import etsySyncData from "./etsy-sync.json";

export type ProductCategory = "classic" | "candy" | "set" | "seasonal" | "statement";

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
  upsellPairPrice: number;
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
    question: "How long does shipping take?",
    answer: "Each piece ships in 14 days. Every sculpture is handcrafted to order — the 14-day timeline includes handmade production and shipping. True artistry takes time, and each cookie is individually sculpted and painted by hand.",
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
    answer: "Currently we offer free U.S. shipping with 14-day handmade production and delivery. For international orders, please contact us through the custom order form for a shipping quote.",
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
    stripeUpsellUrl: "https://buy.stripe.com/cNi9AL9kv9qw9su5Po2Nq0d",
    upsellPairPrice: 190,
    tagline: "The one that started it all. Golden crumble. Glossy chips. Zero guilt.",
    description:
      "Golden-brown edges. Thick, craggy dough. Chocolate chips catching the light like they just came out of the oven. This is the classic that makes guests reach out before their brain catches up — then laugh when they realize it's art. Comfort food for your wall, forever.",
    details: [
      "16 × 16 inches — statement size",
      "Spray foam + acrylic paint",
      "Built-in hanger — ready tonight",
      "Sculptural texture you can see from across the room",
      "Perfect for kitchens, playrooms, and spaces that need joy",
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
    stripeUpsellUrl: "https://buy.stripe.com/6oUfZ968j6ek8oq91A2Nq0i",
    upsellPairPrice: 332,
    tagline: "Two cookies. Double the dopamine. Half the decision-making.",
    description:
      "Can't pick just one? Don't. This pair was made to hang side by side — twice the golden crumble, twice the conversation. Thick sculptural texture on each cookie means they pop from across the room. Your wall's about to have a personality.",
    details: [
      "Two 14-inch handmade cookies",
      "Designed to hang together (or split — you do you)",
      "Spray foam + acrylic paint",
      "Lightweight — each hangs on a single nail",
      "One of a kind set",
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
    stripeUpsellUrl: "https://buy.stripe.com/aFabIT54f8msbACa5E2Nq0e",
    upsellPairPrice: 428,
    tagline: "Two jumbo candy cookies. Maximum color. Maximum chaos.",
    description:
      "Candy pops of red, yellow, blue, and green. Golden dough. Two 16-inch cookies that turn any wall into a statement. Together they're louder than furniture — hang them side by side and watch people's jaws drop. This is the set for rooms that already know who they are.",
    details: [
      "Two 16-inch jumbo cookies",
      "Handmade — no two sets are identical",
      "Lightweight — hangs on standard picture nails",
      "Display together or separate (your call)",
      "Perfect for big walls, kitchens, studios, or anywhere that needs color",
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
    stripeUpsellUrl: "https://buy.stripe.com/7sY14f8grfOUcEGgu22Nq0g",
    upsellPairPrice: 218,
    tagline: "Soft vanilla vibes. Creamy white chips. Dreamy energy.",
    description:
      "The same golden crumble as the classic, with a softer palette — creamy white chips on warm golden dough. It's the white chocolate lover's fantasy, frozen in sculpture. Craggy edges. That just-baked glow. Perfect for kitchens that lean light, bright, and sweet.",
    details: [
      "Approximately 16 inches",
      "Spray foam + acrylic paint",
      "Built-in hanger — up in minutes",
      "Dreamy dessert decor energy",
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
    stripeUpsellUrl: "https://buy.stripe.com/00w8wH54f46ceMO5Po2Nq0h",
    upsellPairPrice: 171,
    tagline: "Jewel-bright candy pops. Pure dopamine. $90.",
    description:
      "Orange. Purple. Yellow. Red. Blue. Green. Jewel-bright candy chips scattered across golden dough like confetti at a party. This is the cookie that turns boring walls into Candyland — playrooms, kitchens, anywhere that needs pure, unfiltered joy. At $90, it's the most fun per square inch you can hang.",
    details: [
      "14-inch handmade sculpture",
      "Rainbow candy chips — every color",
      "Spray foam + acrylic paint",
      "Built-in hanger — no tools needed",
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
    stripeUpsellUrl: "https://buy.stripe.com/aFabIT2W7fOU6gi7Xw2Nq0f",
    upsellPairPrice: 171,
    tagline: "Big impact. Smaller footprint. Same irresistible crumble.",
    description:
      "All the golden-brown goodness of the jumbo classic, sized for cozier spaces. Glossy chips. Thick, craggy texture. Still makes people reach out. Still makes them laugh when they realize it's not real. The entry point to cookie wall art addiction.",
    details: [
      "Mini jumbo format — perfect for smaller walls",
      "Spray foam + acrylic paint",
      "Built-in hanger — hang it tonight",
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
    stripeUrl: "https://buy.stripe.com/7sY6oz68jcCIcEGcdM2Nq06",
    stripeUpsellUrl: "https://buy.stripe.com/28E00bgMXfOU48a2Dc2Nq0j",
    upsellPairPrice: 218,
    tagline: "Candy vibes. Softer palette. Still stops the room.",
    description:
      "Lavender. Baby blue. Blush. Mint. Pastel candy pops on golden sculpted dough — all the fun of Candyland with a gentler, dreamier aesthetic. Perfect for nurseries, soft-maximalist kitchens, or anyone who wants bold art in a softer color story. Loud texture, quiet palette.",
    details: [
      "Jumbo 16-inch format",
      "Pastel candy detailing",
      "Spray foam + acrylic paint",
      "Built-in hanger — ready to display",
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
    stripeUpsellUrl: "https://buy.stripe.com/bJecMX40beKQawydhQ2Nq0m",
    upsellPairPrice: 190,
    tagline: "Festive. Forever fresh. No crumbs under the tree.",
    description:
      "Holiday candy colors on golden dough — the seasonal statement piece that never goes stale. Hang it in November, keep it through New Year's (or all year, we won't judge). No crumbs. No calories. Just pure holiday dopamine that lasts forever.",
    details: [
      "Jumbo 16-inch holiday sculpture",
      "Festive candy color palette",
      "Spray foam + acrylic paint",
      "Built-in hanger — perfect for holiday decor swaps",
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
    stripeUpsellUrl: "https://buy.stripe.com/8x2fZ90NZbyE8oqa5E2Nq0l",
    upsellPairPrice: 190,
    tagline: "Rich peanut butter dough. Candy pops. Pure nostalgia.",
    description:
      "Warm, nutty peanut butter tones with candy confetti on top — like grandma's kitchen, but cooler. Craggy handmade texture that begs to be touched. This is comfort food as wall art, for anyone who grew up sneaking cookies from the cooling rack.",
    details: [
      "Giant 16-inch format",
      "Colorful candy accents on PB dough",
      "Spray foam + acrylic paint",
      "Built-in hanger — hang it today",
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
    stripeUpsellUrl: "https://buy.stripe.com/eVq4gr40b328202a5E2Nq0k",
    upsellPairPrice: 209,
    tagline: "Twice the chocolate. Twice the temptation. Zero regrets.",
    description:
      "Dark cocoa dough. Glossy chocolate chips. This is for the people who look at a regular chocolate chip cookie and think 'needs more chocolate.' Moody, decadent, and absolutely show-stopping — the darkest piece in the collection.",
    details: [
      "Giant 16-inch format",
      "Double chocolate finish — deep and dramatic",
      "Spray foam + acrylic paint",
      "Built-in hanger — moody decor, easy install",
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
    stripeUpsellUrl: "https://buy.stripe.com/cNi28jdAL3280VYdhQ2Nq0n",
    upsellPairPrice: 418,
    tagline: "The showstopper. Two cookies. Vanilla slab. Zero melt.",
    description:
      "Two golden cookies hugging a thick vanilla ice cream layer — frozen in time, permanently delicious, zero mess. This is the piece that stops conversations and starts new ones. The ultimate childhood treat as adult wall art. Warning: it will become the most photographed thing in your home.",
    details: [
      "Statement piece — the biggest flex",
      "Cookie + faux ice cream construction",
      "Spray foam + acrylic paint",
      "Still only ~4-5 lbs — hangs on standard hooks",
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
    stripeUpsellUrl: "https://buy.stripe.com/4gM4gr0NZ9qwawyfpY2Nq0o",
    upsellPairPrice: 218,
    tagline: "Golden dough. Candy confetti. Instant serotonin.",
    description:
      "Classic M&M cookie energy — golden sculpted dough scattered with glossy candy pieces and chocolate chunks. Reads as pop art from across the room. The kind of piece that makes people smile before they even realize they're smiling.",
    details: [
      "Jumbo 16-inch format",
      "Candy + chocolate detailing",
      "Spray foam + acrylic paint",
      "Built-in hanger — ready to display",
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
    stripeUpsellUrl: "https://buy.stripe.com/14AcMX7cn7io8oqdhQ2Nq0p",
    upsellPairPrice: 218,
    tagline: "Loud. Pink. Unapologetic. The main character cookie.",
    description:
      "Hot pink dough. Candy confetti. Dark chocolate chunks. This is the cookie that screams 'I have a personality' — maximal, playful, and completely unapologetic. For rooms that are already bold and people who don't do subtle. The main character of the collection.",
    details: [
      "Hot pink sculpted finish — impossible to ignore",
      "Candy and chocolate accents",
      "Spray foam + acrylic paint",
      "Built-in hanger — command attention immediately",
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
