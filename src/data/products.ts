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

export type StripeTierPriceIds = {
  unit?: string;
  second10Off?: string;
  third15Off?: string;
  bulk20Off?: string;
  bulk25Off?: string;
  bulk30Off?: string;
};

export type StripeBulkTierUrls = {
  bulk20Off?: string;
  bulk25Off?: string;
  bulk30Off?: string;
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
  stripeUpsellUrl: string;
  stripeProductId: string;
  stripeUnitPriceId: string;
  stripeSecond10OffPriceId: string;
  stripeTierPriceIds?: StripeTierPriceIds;
  stripePairUrls?: Record<string, string>;
  stripeTrioUrl?: string;
  stripeTrioUrls?: Record<string, string>;
  stripeBulkTierUrls?: StripeBulkTierUrls;
  stripeQuantityUrls?: Record<string, string>;
  upsellPairPrice: number;
  tagline: string;
  /** Optional search snippet lead (no price; the page appends price + shipping). */
  metaDescription?: string;
  description: string;
  details: string[];
  materials: string;
  faqs: ProductFAQ[];
};

export const JOIRUSH_STRIPE_ACCOUNT_ID = "acct_1UIAw68dNREsB4xB";
export const JOIRUSH_FREE_SHIPPING_RATE_ID = "shr_1UIs5g8dNREsB4xBpIhVBs6y";

export type BulkPricingTierInfo = {
  id: "bogo10" | "third15" | "bulk20" | "bulk25" | "bulk30";
  label: string;
  shortLabel: string;
  discountPercent: number;
  minQty: number;
  maxQty: number;
  description: string;
};

export const BULK_PRICING_TIERS: BulkPricingTierInfo[] = [
  {
    id: "bogo10",
    label: "Buy 1, get 1 10% off",
    shortLabel: "2 cookies (2nd 10% off)",
    discountPercent: 10,
    minQty: 2,
    maxQty: 2,
    description: "2nd cookie is 10% off",
  },
  {
    id: "third15",
    label: "Want a third? 15% off",
    shortLabel: "3rd cookie 15% off",
    discountPercent: 15,
    minQty: 3,
    maxQty: 3,
    description: "Add a 3rd cookie in checkout for 15% off",
  },
  {
    id: "bulk20",
    label: "3 to 5 cookies: 20% off",
    shortLabel: "3 to 5 (20% off)",
    discountPercent: 20,
    minQty: 3,
    maxQty: 5,
    description: "20% off each cookie",
  },
  {
    id: "bulk25",
    label: "5 to 10 cookies: 25% off",
    shortLabel: "5 to 10 (25% off)",
    discountPercent: 25,
    minQty: 5,
    maxQty: 10,
    description: "25% off each cookie",
  },
  {
    id: "bulk30",
    label: "10 to 20 cookies: 30% off each",
    shortLabel: "10 to 20 (30% off)",
    discountPercent: 30,
    minQty: 10,
    maxQty: 20,
    description: "30% off each cookie",
  },
];

export const BULK_PRICING_SUMMARY_BULLET =
  "Bundle and bulk savings: Buy 1 get 1 10% off · 3rd cookie 15% off · 3 to 5 cookies 20% off · 5 to 10 cookies 25% off · 10 to 20 cookies 30% off each";

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
    price: 80,
    compareAtPrice: 100,
    size: "16 × 16 in",
    category: "classic",
    featured: true,
    image: "/images/products/choc-chip.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831819997/jumbo-chocolate-chip-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/28E9ANbVpfUa1jC4Li9fX3Y",
    stripeUpsellUrl: "https://buy.stripe.com/5kQaER4sX5fwgewa5C9fX3Z",
    stripeProductId: "prod_VInUXaAP2bjrGc",
    stripeUnitPriceId: "price_1UU8xh8dNREsB4xBwDr1quJh",
    stripeSecond10OffPriceId: "price_1UU8xp8dNREsB4xBJc3JWiNQ",
    stripeTierPriceIds: {
      unit: "price_1UU8xh8dNREsB4xBwDr1quJh",
      second10Off: "price_1UU8xp8dNREsB4xBJc3JWiNQ",
      third15Off: "price_1UU8xq8dNREsB4xBgaxlUL7I",
      bulk20Off: "price_1UU8xs8dNREsB4xBHutBs2SS",
      bulk25Off: "price_1UU8xu8dNREsB4xBaRTrUAjP",
      bulk30Off: "price_1UU8xw8dNREsB4xBWB4NfmJc",
    },
    stripePairUrls: {
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/5kQaER4sX5fwgewa5C9fX3Z",
      "rainbow-candy-cookie": "https://buy.stripe.com/cNi3cp0cH9vM2nG2Da9fX43",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/cNifZbgbFeQ67I02Da9fX41",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gMbIVf7B4bsbYga5C9fX45",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/7sYcMZ6B5bDU9Q82Da9fX47",
      "jumbo-christmas-cookie": "https://buy.stripe.com/dRm00d5x1eQ68M491y9fY01",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/9B6eV77F9cHY8M40v29fY03",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ9AN9Nh0Zg4vO7Xu9fZ0e",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/6oUeV70cHeQ6d2kcdK9fY05",
      "jumbo-mm-cookie": "https://buy.stripe.com/aFa4gt7F99vM6DW2Da9fZ0g",
      "hot-pink-mm-cookie": "https://buy.stripe.com/cNicMZ0cH7nE4vO91y9fZ0i",
    },
    stripeTrioUrl: "https://buy.stripe.com/8x2cMZe3x23k1jCfpW9fX40",
    stripeTrioUrls: {
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x2cMZe3x23k1jCfpW9fX40",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/fZu6oBaRl0Zggewgu09fZ0f",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/cNi4gtbVpbDU0fyelS9fY04",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/3cI5kx6B5eQ68M46Tq9fX46",
      "rainbow-candy-cookie": "https://buy.stripe.com/00w5kxaRl5fw1jCfpW9fX44",
      "jumbo-christmas-cookie": "https://buy.stripe.com/cNi6oBbVp23kd2k5Pm9fY02",
      "jumbo-mm-cookie": "https://buy.stripe.com/4gMeV77F9cHYfaselS9fZ0h",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/8x26oB1gL8rI8M46Tq9fX42",
      "hot-pink-mm-cookie": "https://buy.stripe.com/00weV70cHgYebYg2Da9fZ0j",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/3cI6oBbVp4bs3rK91y9fY06",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/fZufZbf7B9vMe6ob9G9fY00",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/aFa00daRlbDU9Q86Tq9fY07",
      "bulk25Off": "https://buy.stripe.com/4gM7sF4sX0ZggewcdK9fY09",
      "bulk30Off": "https://buy.stripe.com/5kQ7sF2kP0ZgfasfpW9fY0e",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/28E9ANbVpfUa1jC4Li9fX3Y",
      "2": "https://buy.stripe.com/5kQaER4sX5fwgewa5C9fX3Z",
      "6": "https://buy.stripe.com/6oUdR3f7BcHY3rKelS9fY0a",
      "4": "https://buy.stripe.com/6oU4gt1gL6jAbYggu09fY08",
      "11": "https://buy.stripe.com/9B6eV78Jd9vM6DWgu09fY0f",
      "5": "https://buy.stripe.com/4gM7sF4sX0ZggewcdK9fY09",
      "9": "https://buy.stripe.com/6oU4gt4sXcHYfas2Da9fY0d",
      "8": "https://buy.stripe.com/4gMcMZ1gL9vM8M4dhO9fY0c",
      "10": "https://buy.stripe.com/5kQ7sF2kP0ZgfasfpW9fY0e",
      "7": "https://buy.stripe.com/bJecMZ8JdcHYd2kelS9fY0b",
      "12": "https://buy.stripe.com/aFa14hbVpcHY6DW2Da9fY0g",
      "14": "https://buy.stripe.com/fZudR38JdbDUfascdK9fY0i",
      "15": "https://buy.stripe.com/28E9AN7F9eQ6fas6Tq9fY0j",
      "3": "https://buy.stripe.com/aFa00daRlbDU9Q86Tq9fY07",
      "17": "https://buy.stripe.com/fZu9ANf7B4bs1jCgu09fY0l",
      "16": "https://buy.stripe.com/7sYbIVcZt8rI0fy1z69fY0k",
      "18": "https://buy.stripe.com/cNifZb6B58rI1jCcdK9fY0m",
      "20": "https://buy.stripe.com/dRm9AN1gL8rI5zS91y9fY0o",
      "19": "https://buy.stripe.com/eVq5kxaRldM28M4b9G9fY0n",
      "13": "https://buy.stripe.com/9B6bIV0cHfUa4vO5Pm9fY0h",
    },
    upsellPairPrice: 152,
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
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "classic",
    featured: true,
    image: "/images/products/white-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452647836/jumbo-white-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/7sY3cpcZt8rIfas5Pm9fY0p",
    stripeUpsellUrl: "https://buy.stripe.com/14A3cp4sXdM25zS5Pm9fY0s",
    stripeProductId: "prod_VInVwq4gwbHX7W",
    stripeUnitPriceId: "price_1UU8xx8dNREsB4xBdv9ykU9Z",
    stripeSecond10OffPriceId: "price_1UU8y08dNREsB4xBK3U75Wx5",
    stripeTierPriceIds: {
      unit: "price_1UU8xx8dNREsB4xBdv9ykU9Z",
      second10Off: "price_1UU8y08dNREsB4xBK3U75Wx5",
      third15Off: "price_1UU8y18dNREsB4xBOhTA6tRz",
      bulk20Off: "price_1UU8y48dNREsB4xBfdxSoXLr",
      bulk25Off: "price_1UU8y58dNREsB4xBrIEoDo3g",
      bulk30Off: "price_1UU8y68dNREsB4xBhOT7GxOb",
    },
    stripePairUrls: {
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/14A3cp4sXdM25zS5Pm9fY0s",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/aFa8wJ9NhfUa3rK1z69fY0q",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFa5kxe3x37o7I02Da9fY0y",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU8wJf7B6jA7I0elS9fY0w",
      "jumbo-christmas-cookie": "https://buy.stripe.com/6oU3cp8JdazQaUc1z69fY0A",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/3cI14h9Nh23k9Q8gu09fY0C",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/00wbIV2kP23k1jC5Pm9fY0E",
      "jumbo-mm-cookie": "https://buy.stripe.com/6oUdR37F90Zgfas0v29fZ0m",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/6oUaER1gL37o0fy3He9fZ0k",
      "hot-pink-mm-cookie": "https://buy.stripe.com/8x26oBe3x9vM1jCgu09fZ0o",
      "rainbow-candy-cookie": "https://buy.stripe.com/6oUfZb5x1fUa5zS91y9fY0u",
    },
    stripeTrioUrl: "https://buy.stripe.com/bJe7sF1gLeQ6d2k0v29fY0t",
    stripeTrioUrls: {
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/bJe7sF1gLeQ6d2k0v29fY0t",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oUeV7aRlazQd2k7Xu9fY0x",
      "jumbo-christmas-cookie": "https://buy.stripe.com/fZu6oBbVp8rIfasb9G9fY0B",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/00wdR3e3xeQ69Q81z69fY0r",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/5kQfZbgbF4bs1jCgu09fY0z",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/aFa00df7BcHYgewgu09fY0F",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/eVqbIVf7B23k8M46Tq9fY0D",
      "rainbow-candy-cookie": "https://buy.stripe.com/28EeV72kP6jA1jC7Xu9fY0v",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/7sY4gt0cHdM2bYg7Xu9fZ0l",
      "jumbo-mm-cookie": "https://buy.stripe.com/cNi8wJe3x9vM5zSfpW9fZ0n",
      "hot-pink-mm-cookie": "https://buy.stripe.com/3cI9ANgbFeQ6fas3He9fZ0p",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/5kQ00dbVp8rI5zS6Tq9fY0G",
      "bulk25Off": "https://buy.stripe.com/fZu6oBe3x9vMe6o4Li9fY0I",
      "bulk30Off": "https://buy.stripe.com/fZu9ANcZt5fw4vOdhO9fY0N",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/7sY3cpcZt8rIfas5Pm9fY0p",
      "2": "https://buy.stripe.com/14A3cp4sXdM25zS5Pm9fY0s",
      "3": "https://buy.stripe.com/5kQ00dbVp8rI5zS6Tq9fY0G",
      "5": "https://buy.stripe.com/fZu6oBe3x9vMe6o4Li9fY0I",
      "6": "https://buy.stripe.com/cNi5kx0cH0Zgfas2Da9fY0J",
      "7": "https://buy.stripe.com/aFa00d7F9cHY7I0elS9fY0K",
      "8": "https://buy.stripe.com/cNi00d7F9azQe6o91y9fY0L",
      "4": "https://buy.stripe.com/6oU5kx4sXbDUaUcelS9fY0H",
      "10": "https://buy.stripe.com/fZu9ANcZt5fw4vOdhO9fY0N",
      "11": "https://buy.stripe.com/aFabIV1gLfUa8M43He9fY0O",
      "12": "https://buy.stripe.com/fZufZb5x14bsaUc2Da9fY0P",
      "13": "https://buy.stripe.com/6oUcMZcZt5fwd2k2Da9fY0Q",
      "14": "https://buy.stripe.com/aFaeV7aRl5fw4vO7Xu9fY0R",
      "17": "https://buy.stripe.com/aFa4gtgbFbDU4vO6Tq9fY0U",
      "15": "https://buy.stripe.com/aFa6oBaRl37obYg1z69fY0S",
      "9": "https://buy.stripe.com/7sY8wJ3oT5fw3rKelS9fY0M",
      "18": "https://buy.stripe.com/aFa14hbVpcHYaUca5C9fY0V",
      "16": "https://buy.stripe.com/6oU28lcZt0ZgbYgb9G9fY0T",
      "19": "https://buy.stripe.com/dRmfZb3oT9vM2nGa5C9fY0W",
      "20": "https://buy.stripe.com/fZu8wJ0cH37o5zS3He9fY0X",
    },
    upsellPairPrice: 152,
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
    price: 70,
    compareAtPrice: 90,
    size: "14 in",
    category: "candy",
    featured: true,
    image: "/images/products/rainbow.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452645632/colorful-candy-cookie-wall-decor",
    stripeUrl: "https://buy.stripe.com/28E9AN7F9gYee6o91y9fY0Y",
    stripeUpsellUrl: "https://buy.stripe.com/bJecMZ6B5dM25zSelS9fY13",
    stripeProductId: "prod_VInVAr2A30To1r",
    stripeUnitPriceId: "price_1UU8yE8dNREsB4xB04SONHcj",
    stripeSecond10OffPriceId: "price_1UU8yG8dNREsB4xBgeiheHYM",
    stripeTierPriceIds: {
      unit: "price_1UU8yE8dNREsB4xB04SONHcj",
      second10Off: "price_1UU8yG8dNREsB4xBgeiheHYM",
      third15Off: "price_1UU8yJ8dNREsB4xBluR1BRYQ",
      bulk20Off: "price_1UU8yK8dNREsB4xBzn8jCaQH",
      bulk25Off: "price_1UU8yN8dNREsB4xBWcr0EYxS",
      bulk30Off: "price_1UU8yO8dNREsB4xBy6dXoAJi",
    },
    stripePairUrls: {
      "rainbow-candy-cookie": "https://buy.stripe.com/bJecMZ6B5dM25zSelS9fY13",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/8x2fZb8Jd8rIe6o2Da9fY11",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x2aER9Nh8rI6DWdhO9fY15",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/6oUdR30cHeQ67I091y9fY1b",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/cNi14h1gLdM2d2k3He9fY1d",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/7sY3cpbVpeQ61jC6Tq9fY17",
      "jumbo-christmas-cookie": "https://buy.stripe.com/6oU4gtf7BazQ9Q891y9fY19",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/fZucMZ6B5dM2fas91y9fZ0q",
      "jumbo-mm-cookie": "https://buy.stripe.com/eVq5kx6B57nE8M4b9G9fZ0s",
      "hot-pink-mm-cookie": "https://buy.stripe.com/9B6fZb9Nh0Zge6o91y9fZ0u",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28EaER0cH5fwe6o7Xu9fY0Z",
    },
    stripeTrioUrl: "https://buy.stripe.com/00wbIVgbF8rIfascdK9fY14",
    stripeTrioUrls: {
      "rainbow-candy-cookie": "https://buy.stripe.com/00wbIVgbF8rIfascdK9fY14",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU14hgbFdM2e6o3He9fY10",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/fZufZb7F97nE4vO6Tq9fY12",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/9B68wJaRl7nE3rKa5C9fY16",
      "jumbo-christmas-cookie": "https://buy.stripe.com/5kQ6oB8Jd5fw3rKdhO9fY1a",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/7sY14hf7B9vM5zS3He9fY18",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/7sY9ANbVpdM21jC0v29fY1e",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/cNi3cpgbF0Zg1jC4Li9fZ0r",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/8x26oB8Jd8rI3rK1z69fY1c",
      "hot-pink-mm-cookie": "https://buy.stripe.com/00w4gt0cH37o1jC6Tq9fZ0v",
      "jumbo-mm-cookie": "https://buy.stripe.com/5kQ9ANcZt9vM3rKb9G9fZ0t",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/7sY4gtaRl0Zg3rKcdK9fY1f",
      "bulk25Off": "https://buy.stripe.com/4gMdR3gbFazQbYg1z69fY1h",
      "bulk30Off": "https://buy.stripe.com/fZueV70cHgYe5zSb9G9fY1m",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/28E9AN7F9gYee6o91y9fY0Y",
      "2": "https://buy.stripe.com/bJecMZ6B5dM25zSelS9fY13",
      "3": "https://buy.stripe.com/7sY4gtaRl0Zg3rKcdK9fY1f",
      "4": "https://buy.stripe.com/00w6oBgbF0Zggew7Xu9fY1g",
      "5": "https://buy.stripe.com/4gMdR3gbFazQbYg1z69fY1h",
      "6": "https://buy.stripe.com/00w3cpbVpbDU3rK3He9fY1i",
      "9": "https://buy.stripe.com/4gM3cpf7B6jAgew1z69fY1l",
      "8": "https://buy.stripe.com/dRm00d9NhgYebYg0v29fY1k",
      "11": "https://buy.stripe.com/28E6oBe3xfUa9Q83He9fY1n",
      "10": "https://buy.stripe.com/fZueV70cHgYe5zSb9G9fY1m",
      "12": "https://buy.stripe.com/bJecMZ9Nh6jA9Q8elS9fY1o",
      "13": "https://buy.stripe.com/4gMcMZ2kPgYe0fydhO9fY1p",
      "14": "https://buy.stripe.com/bJebIV5x16jA1jC7Xu9fY1q",
      "15": "https://buy.stripe.com/4gM5kx5x1gYe7I0cdK9fY1r",
      "16": "https://buy.stripe.com/28E7sF5x1bDU4vOa5C9fY1s",
      "19": "https://buy.stripe.com/dRm8wJcZtgYegewdhO9fY1v",
      "17": "https://buy.stripe.com/cNibIV8Jd6jA1jC91y9fY1t",
      "20": "https://buy.stripe.com/cNiaER3oT23k3rKgu09fY1w",
      "18": "https://buy.stripe.com/cNiaER3oT4bsbYgb9G9fY1u",
      "7": "https://buy.stripe.com/cNi28lgbF0Zg0fy7Xu9fY1j",
    },
    upsellPairPrice: 133,
    tagline: "Jewel bright cookie art. Pure dopamine. $70.",
    description:
      "Orange. Purple. Yellow. Red. Blue. Green. Jewel bright candy chips scattered across golden dough like confetti at a party. This cookie art turns boring walls into Candyland: playrooms, kitchens, anywhere that needs pure, unfiltered joy. At $70, it's the most colorful sugar cookie wall sculpture you can hang, and an easy first step into dopamine decor.",
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
    price: 70,
    compareAtPrice: 90,
    size: "Mini jumbo",
    category: "classic",
    image: "/images/products/mini-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452643820/mini-jumbo-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/fZu5kx7F94bs7I03He9fY1x",
    stripeUpsellUrl: "https://buy.stripe.com/8x2cMZ2kP5fwd2k6Tq9fY1E",
    stripeProductId: "prod_VInVMu4LI8B4Yp",
    stripeUnitPriceId: "price_1UU8yP8dNREsB4xBpIku2IOL",
    stripeSecond10OffPriceId: "price_1UU8yR8dNREsB4xB1kKV9HQy",
    stripeTierPriceIds: {
      unit: "price_1UU8yP8dNREsB4xBpIku2IOL",
      second10Off: "price_1UU8yR8dNREsB4xB1kKV9HQy",
      third15Off: "price_1UU8yT8dNREsB4xBiRnw9RFl",
      bulk20Off: "price_1UU8yU8dNREsB4xBtvkqVTcu",
      bulk25Off: "price_1UU8yW8dNREsB4xB7kE4hu2D",
      bulk30Off: "price_1UU8yY8dNREsB4xBeZ9szc8W",
    },
    stripePairUrls: {
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x2cMZ2kP5fwd2k6Tq9fY1E",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/eVqcMZgbFfUa2nGdhO9fY1y",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/fZu5kx0cHeQ6bYga5C9fY1A",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/00w14h9NheQ64vOcdK9fY1G",
      "jumbo-christmas-cookie": "https://buy.stripe.com/3cI8wJ4sX6jA0fy0v29fY1I",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/eVq28lf7BbDUd2kgu09fY1M",
      "rainbow-candy-cookie": "https://buy.stripe.com/00w3cpgbF37obYgb9G9fY1C",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/5kQ4gt4sXdM2aUc5Pm9fY1K",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/dRmaER9NhcHY8M4elS9fZ0w",
      "jumbo-mm-cookie": "https://buy.stripe.com/5kQaERbVp37o8M44Li9fZ0y",
      "hot-pink-mm-cookie": "https://buy.stripe.com/7sY14h4sXazQd2ka5C9fZ0A",
    },
    stripeTrioUrl: "https://buy.stripe.com/dRmdR3aRl37o4vOb9G9fY1F",
    stripeTrioUrls: {
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRmdR3aRl37o4vOb9G9fY1F",
      "rainbow-candy-cookie": "https://buy.stripe.com/bJefZb3oTdM26DWcdK9fY1D",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/5kQ00df7B7nE6DWcdK9fY1z",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFabIV3oTeQ63rK1z69fY1B",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/cNi3cp2kPeQ65zS91y9fY1H",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/9B64gt2kPgYe3rKdhO9fY1L",
      "jumbo-christmas-cookie": "https://buy.stripe.com/8x2fZb4sX37ofasb9G9fY1J",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B600de3x8rI9Q8fpW9fY1N",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/8x2fZbaRlbDUfasfpW9fZ0x",
      "hot-pink-mm-cookie": "https://buy.stripe.com/cNicMZf7B5fwfas2Da9fZ0B",
      "jumbo-mm-cookie": "https://buy.stripe.com/9B614he3xcHY8M40v29fZ0z",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/bJedR37F97nEd2kb9G9fY1O",
      "bulk25Off": "https://buy.stripe.com/fZu7sF6B523ke6odhO9fY1Q",
      "bulk30Off": "https://buy.stripe.com/28EdR33oTazQfas7Xu9fY1V",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/fZu5kx7F94bs7I03He9fY1x",
      "2": "https://buy.stripe.com/8x2cMZ2kP5fwd2k6Tq9fY1E",
      "4": "https://buy.stripe.com/00w28l0cH5fw7I03He9fY1P",
      "3": "https://buy.stripe.com/bJedR37F97nEd2kb9G9fY1O",
      "5": "https://buy.stripe.com/fZu7sF6B523ke6odhO9fY1Q",
      "6": "https://buy.stripe.com/cNieV70cHfUa2nGb9G9fY1R",
      "7": "https://buy.stripe.com/9B628l5x16jA3rK91y9fY1S",
      "8": "https://buy.stripe.com/8x26oB3oT0Zg9Q8gu09fY1T",
      "9": "https://buy.stripe.com/cNieV74sX0ZgaUc1z69fY1U",
      "10": "https://buy.stripe.com/28EdR33oTazQfas7Xu9fY1V",
      "12": "https://buy.stripe.com/eVqaERe3xdM24vOcdK9fY1X",
      "11": "https://buy.stripe.com/3cI28l1gL37ogew6Tq9fY1W",
      "14": "https://buy.stripe.com/fZu8wJgbF0Zg3rKgu09fY1Z",
      "15": "https://buy.stripe.com/6oU7sFgbF9vM3rK3He9fY20",
      "16": "https://buy.stripe.com/cNi00d5x137o1jCa5C9fY21",
      "13": "https://buy.stripe.com/28E14h1gL6jA5zS2Da9fY1Y",
      "19": "https://buy.stripe.com/dRmbIVe3x23k0fygu09fY24",
      "17": "https://buy.stripe.com/7sY7sFf7BfUaaUcdhO9fY22",
      "18": "https://buy.stripe.com/cNi9ANf7B9vM0fy91y9fY23",
      "20": "https://buy.stripe.com/00wbIVgbFbDUfascdK9fY25",
    },
    upsellPairPrice: 133,
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
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    image: "/images/products/pastel-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452635945/jumbo-pastel-mm-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/5kQ14h2kPgYe8M42Da9fY26",
    stripeUpsellUrl: "https://buy.stripe.com/aFa4gt9Nh7nEbYga5C9fY2f",
    stripeProductId: "prod_VInV5JgsOOBYsl",
    stripeUnitPriceId: "price_1UU8yg8dNREsB4xB3W2nTPZZ",
    stripeSecond10OffPriceId: "price_1UU8yi8dNREsB4xBlhmFJWWG",
    stripeTierPriceIds: {
      unit: "price_1UU8yg8dNREsB4xB3W2nTPZZ",
      second10Off: "price_1UU8yi8dNREsB4xBlhmFJWWG",
      third15Off: "price_1UU8yk8dNREsB4xB2Z9vtNhu",
      bulk20Off: "price_1UU8ym8dNREsB4xBpi45ia1U",
      bulk25Off: "price_1UU8yo8dNREsB4xBVfyw88nx",
      bulk30Off: "price_1UU8yp8dNREsB4xBHBNp45mI",
    },
    stripePairUrls: {
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFa4gt9Nh7nEbYga5C9fY2f",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU5kx8JddM26DW91y9fY27",
      "rainbow-candy-cookie": "https://buy.stripe.com/14AfZb1gL37o2nG3He9fY2b",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sY3cp8Jd23k7I0gu09fY2d",
      "jumbo-christmas-cookie": "https://buy.stripe.com/bJe5kx2kPdM21jC4Li9fY2h",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/6oU5kx3oT4bsd2kfpW9fY2j",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/00w4gtf7BgYed2k7Xu9fY29",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/8x23cpbVp9vM9Q86Tq9fY2l",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/00w7sF2kP4bs8M4fpW9fZ0C",
      "hot-pink-mm-cookie": "https://buy.stripe.com/bJe00dcZtdM26DWdhO9fZ0G",
      "jumbo-mm-cookie": "https://buy.stripe.com/fZufZb9NhgYee6ocdK9fZ0E",
    },
    stripeTrioUrl: "https://buy.stripe.com/dRmbIV3oTbDU3rK1z69fY2g",
    stripeTrioUrls: {
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/dRmbIV3oTbDU3rK1z69fY2g",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/eVq7sF3oT7nE3rKb9G9fY28",
      "rainbow-candy-cookie": "https://buy.stripe.com/3cI14h8JdcHY1jC2Da9fY2c",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/dRmfZb5x123k5zS0v29fY2a",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/7sYcMZ4sX4bsd2k2Da9fY2k",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oUcMZf7B5fwfas5Pm9fY2e",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/14AfZbgbFbDU1jC7Xu9fY2m",
      "jumbo-mm-cookie": "https://buy.stripe.com/8x2fZb0cHcHYaUc2Da9fZ0F",
      "hot-pink-mm-cookie": "https://buy.stripe.com/8x28wJ3oTcHY3rK4Li9fZ0H",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/aFaeV74sX8rI2nGcdK9fZ0D",
      "jumbo-christmas-cookie": "https://buy.stripe.com/bJebIV6B5bDU0fyfpW9fY2i",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/aFa9ANe3x6jA4vOcdK9fY2n",
      "bulk25Off": "https://buy.stripe.com/00w00dgbFcHYaUc3He9fY2p",
      "bulk30Off": "https://buy.stripe.com/00w6oB9Nh9vMgewgu09fY2u",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/5kQ14h2kPgYe8M42Da9fY26",
      "2": "https://buy.stripe.com/aFa4gt9Nh7nEbYga5C9fY2f",
      "4": "https://buy.stripe.com/cNicMZ0cH6jA3rKa5C9fY2o",
      "3": "https://buy.stripe.com/aFa9ANe3x6jA4vOcdK9fY2n",
      "7": "https://buy.stripe.com/6oU00df7B23k6DW3He9fY2r",
      "5": "https://buy.stripe.com/00w00dgbFcHYaUc3He9fY2p",
      "8": "https://buy.stripe.com/8x214hgbFgYe9Q84Li9fY2s",
      "6": "https://buy.stripe.com/6oU00dgbF37o7I0fpW9fY2q",
      "9": "https://buy.stripe.com/7sY5kxaRl8rI9Q8b9G9fY2t",
      "10": "https://buy.stripe.com/00w6oB9Nh9vMgewgu09fY2u",
      "12": "https://buy.stripe.com/00w3cp0cH5fwbYg5Pm9fY2w",
      "13": "https://buy.stripe.com/eVq7sFbVpcHYbYg3He9fY2x",
      "14": "https://buy.stripe.com/4gMaER9Nh23kaUcb9G9fY2y",
      "11": "https://buy.stripe.com/4gM14h8Jd9vMgew7Xu9fY2v",
      "17": "https://buy.stripe.com/5kQ9AN0cHcHYgew6Tq9fY2B",
      "16": "https://buy.stripe.com/8x2fZbaRl5fwd2kfpW9fY2A",
      "18": "https://buy.stripe.com/28EcMZf7B23k6DW91y9fY2C",
      "20": "https://buy.stripe.com/14A7sF8Jd0Zg1jC6Tq9fY2E",
      "19": "https://buy.stripe.com/bJeeV77F9gYee6o2Da9fY2D",
      "15": "https://buy.stripe.com/eVq7sFf7BazQ0fyfpW9fY2z",
    },
    upsellPairPrice: 152,
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
    price: 80,
    compareAtPrice: 100,
    size: "16 in",
    category: "seasonal",
    image: "/images/products/christmas.jpg",
    etsyUrl: "https://www.etsy.com/listing/4438064219/jumbo-christmas-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/8x2bIV0cH7nE2nG4Li9fY2F",
    stripeUpsellUrl: "https://buy.stripe.com/9B66oB4sX23kaUc3He9fY2Q",
    stripeProductId: "prod_VInVVIXb3NPwt0",
    stripeUnitPriceId: "price_1UU8yr8dNREsB4xBIM18x4m7",
    stripeSecond10OffPriceId: "price_1UU8yt8dNREsB4xBcIzBO4M5",
    stripeTierPriceIds: {
      unit: "price_1UU8yr8dNREsB4xBIM18x4m7",
      second10Off: "price_1UU8yt8dNREsB4xBcIzBO4M5",
      third15Off: "price_1UU8yw8dNREsB4xBXgu0q2XB",
      bulk20Off: "price_1UU8yw8dNREsB4xBZ5eV7Egw",
      bulk25Off: "price_1UU8yy8dNREsB4xBPigGAx4b",
      bulk30Off: "price_1UU8z08dNREsB4xBVH9aC48W",
    },
    stripePairUrls: {
      "jumbo-christmas-cookie": "https://buy.stripe.com/9B66oB4sX23kaUc3He9fY2Q",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/cNieV75x10Zgfas1z69fY2I",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sY9AN6B55fw8M42Da9fY2G",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28EdR31gLazQ4vO7Xu9fY2M",
      "rainbow-candy-cookie": "https://buy.stripe.com/28E14h9Nh37o9Q8gu09fY2K",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/fZueV73oTbDU3rK6Tq9fY2U",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/4gM00d8Jd9vMe6oelS9fY2S",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/eVq5kx6B5azQ0fy2Da9fZ0I",
      "hot-pink-mm-cookie": "https://buy.stripe.com/5kQeV72kP4bse6o91y9fZ0M",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/fZu6oBf7BbDUgewb9G9fY2O",
      "jumbo-mm-cookie": "https://buy.stripe.com/00wfZb6B5cHY4vOelS9fZ0K",
    },
    stripeTrioUrl: "https://buy.stripe.com/3cI28l1gL37o1jCb9G9fY2R",
    stripeTrioUrls: {
      "jumbo-christmas-cookie": "https://buy.stripe.com/3cI28l1gL37o1jCb9G9fY2R",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU14h7F9azQbYg5Pm9fY2H",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFa8wJ7F96jA9Q891y9fY2J",
      "rainbow-candy-cookie": "https://buy.stripe.com/8x2bIVbVpazQ0fy1z69fY2L",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sY8wJ5x123k5zS4Li9fY2N",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/fZu00d2kPgYe2nGa5C9fY2P",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/00w7sF7F96jA1jCelS9fY2T",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/8x2aER5x1gYe4vOb9G9fY2V",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ8wJ1gLgYee6o4Li9fZ0J",
      "jumbo-mm-cookie": "https://buy.stripe.com/eVq14he3x5fwgew4Li9fZ0L",
      "hot-pink-mm-cookie": "https://buy.stripe.com/5kQ6oB2kP23k3rKelS9fZ0N",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/8x24gtcZt37o1jCa5C9fY2W",
      "bulk25Off": "https://buy.stripe.com/28EcMZ3oTcHYgewelS9fY2Y",
      "bulk30Off": "https://buy.stripe.com/8x24gt6B5azQd2k2Da9fY33",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/8x2bIV0cH7nE2nG4Li9fY2F",
      "2": "https://buy.stripe.com/9B66oB4sX23kaUc3He9fY2Q",
      "3": "https://buy.stripe.com/8x24gtcZt37o1jCa5C9fY2W",
      "4": "https://buy.stripe.com/6oU4gtbVp9vMd2k3He9fY2X",
      "5": "https://buy.stripe.com/28EcMZ3oTcHYgewelS9fY2Y",
      "6": "https://buy.stripe.com/bJeaERgbF6jAbYg1z69fY2Z",
      "9": "https://buy.stripe.com/eVq14hbVpeQ66DW5Pm9fY32",
      "8": "https://buy.stripe.com/cNi5kx6B57nEe6oelS9fY31",
      "7": "https://buy.stripe.com/6oU5kx8Jd5fwaUc91y9fY30",
      "11": "https://buy.stripe.com/14AaER2kPdM24vO7Xu9fY34",
      "10": "https://buy.stripe.com/8x24gt6B5azQd2k2Da9fY33",
      "12": "https://buy.stripe.com/4gMeV72kPdM2aUcfpW9fY35",
      "13": "https://buy.stripe.com/4gMbIV3oTbDUbYg1z69fY36",
      "14": "https://buy.stripe.com/4gMeV73oT37o1jC2Da9fY37",
      "16": "https://buy.stripe.com/bJeeV7gbF37obYgelS9fY39",
      "19": "https://buy.stripe.com/eVq9AN1gL6jA9Q85Pm9fY3c",
      "17": "https://buy.stripe.com/00w14h9Nh8rIgewgu09fY3a",
      "15": "https://buy.stripe.com/fZu14h2kPgYegew6Tq9fY38",
      "18": "https://buy.stripe.com/00waERbVpeQ64vOelS9fY3b",
      "20": "https://buy.stripe.com/eVq28l1gLazQ0fyb9G9fY3d",
    },
    upsellPairPrice: 152,
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
    price: 80,
    compareAtPrice: 100,
    size: "16 in",
    category: "classic",
    image: "/images/products/peanut-butter.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817504830/giant-peanut-butter-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/cNi00dcZtgYed2kfpW9fY3e",
    stripeUpsellUrl: "https://buy.stripe.com/00wdR35x14bs2nGfpW9fY3r",
    stripeProductId: "prod_VInVIoE0t4agYj",
    stripeUnitPriceId: "price_1UU8z88dNREsB4xB0RcfK0B0",
    stripeSecond10OffPriceId: "price_1UU8zA8dNREsB4xB2tZp8xJY",
    stripeTierPriceIds: {
      unit: "price_1UU8z88dNREsB4xB0RcfK0B0",
      second10Off: "price_1UU8zA8dNREsB4xB2tZp8xJY",
      third15Off: "price_1UU8zC8dNREsB4xBRxJmT9F2",
      bulk20Off: "price_1UU8zD8dNREsB4xBeZioXrH1",
      bulk25Off: "price_1UU8zF8dNREsB4xBMsEZPP4T",
      bulk30Off: "price_1UU8zH8dNREsB4xBtXbQidhN",
    },
    stripePairUrls: {
      "giant-peanut-butter-cookie": "https://buy.stripe.com/00wdR35x14bs2nGfpW9fY3r",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x28wJ4sX6jAbYg5Pm9fY3f",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFa14he3xfUa9Q87Xu9fY3h",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sYfZbbVpeQ6e6oelS9fY3l",
      "rainbow-candy-cookie": "https://buy.stripe.com/5kQfZbe3x4bsfasdhO9fY3j",
      "jumbo-christmas-cookie": "https://buy.stripe.com/8x24gt2kP23kfas4Li9fY3p",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/bJedR38Jd23k6DWdhO9fY3t",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/6oU28l3oT0Zg0fy7Xu9fY3n",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/bJeaER3oT6jA0fydhO9fZ0O",
      "hot-pink-mm-cookie": "https://buy.stripe.com/00wdR31gLbDUd2k91y9fZ0S",
      "jumbo-mm-cookie": "https://buy.stripe.com/dRm9ANcZt23k7I05Pm9fZ0Q",
    },
    stripeTrioUrl: "https://buy.stripe.com/bJefZbf7BcHY3rK91y9fY3s",
    stripeTrioUrls: {
      "giant-peanut-butter-cookie": "https://buy.stripe.com/bJefZbf7BcHY3rK91y9fY3s",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRmaER9NheQ6e6o0v29fY3g",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/eVq8wJ2kPcHYgewelS9fY3i",
      "rainbow-candy-cookie": "https://buy.stripe.com/5kQ8wJ8Jd5fw7I091y9fY3k",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oUaERf7B23k6DWcdK9fY3m",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/cNiaER7F9azQ7I03He9fY3o",
      "jumbo-christmas-cookie": "https://buy.stripe.com/eVq9AN5x19vM5zSa5C9fY3q",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/28EaER5x1azQ6DW4Li9fY3u",
      "jumbo-mm-cookie": "https://buy.stripe.com/9B65kx6B57nE4vO3He9fZ0R",
      "hot-pink-mm-cookie": "https://buy.stripe.com/4gMeV74sX8rI3rKa5C9fZ0T",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/9B66oB7F9gYe3rKa5C9fZ0P",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/4gM00daRl37obYggu09fY3v",
      "bulk25Off": "https://buy.stripe.com/28E5kxcZt4bs7I0gu09fY3x",
      "bulk30Off": "https://buy.stripe.com/bJe6oBaRlbDUe6o2Da9fY3C",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/cNi00dcZtgYed2kfpW9fY3e",
      "2": "https://buy.stripe.com/00wdR35x14bs2nGfpW9fY3r",
      "3": "https://buy.stripe.com/4gM00daRl37obYggu09fY3v",
      "6": "https://buy.stripe.com/8x214hf7B5fw4vOcdK9fY3y",
      "5": "https://buy.stripe.com/28E5kxcZt4bs7I0gu09fY3x",
      "7": "https://buy.stripe.com/cNi00d9NhdM2gew1z69fY3z",
      "9": "https://buy.stripe.com/28EcMZcZt8rI7I0b9G9fY3B",
      "10": "https://buy.stripe.com/bJe6oBaRlbDUe6o2Da9fY3C",
      "8": "https://buy.stripe.com/5kQaER7F97nEe6odhO9fY3A",
      "12": "https://buy.stripe.com/cNi8wJ9NhazQbYgelS9fY3E",
      "11": "https://buy.stripe.com/28E6oBcZt8rI2nG6Tq9fY3D",
      "13": "https://buy.stripe.com/eVqeV73oT4bsgew0v29fY3F",
      "14": "https://buy.stripe.com/3cI00d5x17nEfasb9G9fY3G",
      "15": "https://buy.stripe.com/6oUfZbcZt5fw3rK7Xu9fY3H",
      "16": "https://buy.stripe.com/cNi7sFaRldM28M4gu09fY3I",
      "17": "https://buy.stripe.com/5kQ00d2kP9vM6DW4Li9fY3J",
      "19": "https://buy.stripe.com/5kQ00d4sXeQ62nGfpW9fY3L",
      "18": "https://buy.stripe.com/cNiaER0cH23k4vO5Pm9fY3K",
      "4": "https://buy.stripe.com/bJe28l9NhdM2bYg6Tq9fY3w",
      "20": "https://buy.stripe.com/8x29ANaRl4bsaUc6Tq9fY3M",
    },
    upsellPairPrice: 152,
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
    price: 80,
    compareAtPrice: 110,
    size: "16 in",
    category: "classic",
    image: "/images/products/double-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817632262/giant-faux-double-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/cNiaER3oT0Zg3rKfpW9fY3N",
    stripeUpsellUrl: "https://buy.stripe.com/14A4gtgbFeQ64vO91y9fY42",
    stripeProductId: "prod_VInVAztIr2Mo7D",
    stripeUnitPriceId: "price_1UU8zJ8dNREsB4xBiy6zpewI",
    stripeSecond10OffPriceId: "price_1UU8zL8dNREsB4xB5xfFOhMZ",
    stripeTierPriceIds: {
      unit: "price_1UU8zJ8dNREsB4xBiy6zpewI",
      second10Off: "price_1UU8zL8dNREsB4xB5xfFOhMZ",
      third15Off: "price_1UU8zM8dNREsB4xBk6chTArW",
      bulk20Off: "price_1UU8zQ8dNREsB4xBdNdXv4Ad",
      bulk25Off: "price_1UU8zR8dNREsB4xBHLnTUtdc",
      bulk30Off: "price_1UU8zT8dNREsB4xB7bXAb5c5",
    },
    stripePairUrls: {
      "giant-double-chocolate-cookie": "https://buy.stripe.com/14A4gtgbFeQ64vO91y9fY42",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/00w00de3x0Zg5zSfpW9fY3O",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/bJebIVbVpbDU6DWb9G9fY3U",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/5kQ14h5x1fUa3rK91y9fY3W",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/8x23cpcZtgYebYg3He9fY3Q",
      "jumbo-christmas-cookie": "https://buy.stripe.com/fZu14h4sX9vM7I0b9G9fY3Y",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/7sY7sFbVpbDU3rK2Da9fY40",
      "rainbow-candy-cookie": "https://buy.stripe.com/6oUeV7bVp4bs8M4cdK9fY3S",
      "jumbo-mm-cookie": "https://buy.stripe.com/fZuaERaRldM27I03He9fZ0W",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/00wfZb5x17nEbYg5Pm9fZ0U",
      "hot-pink-mm-cookie": "https://buy.stripe.com/cNi8wJbVpgYeaUcelS9fZ0Y",
    },
    stripeTrioUrl: "https://buy.stripe.com/bJe14h2kPcHY0fy1z69fY43",
    stripeTrioUrls: {
      "giant-double-chocolate-cookie": "https://buy.stripe.com/bJe14h2kPcHY0fy1z69fY43",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRm14hgbFeQ6e6oelS9fY3P",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/6oU00d4sX23k0fy91y9fY3R",
      "rainbow-candy-cookie": "https://buy.stripe.com/dRmcMZf7B8rI4vOdhO9fY3T",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28E8wJaRl5fwaUc2Da9fY3V",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/7sYdR3cZtazQ9Q84Li9fY3X",
      "jumbo-christmas-cookie": "https://buy.stripe.com/fZucMZcZt8rIfasb9G9fY3Z",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/fZu8wJ9NhfUa1jCelS9fY41",
      "jumbo-mm-cookie": "https://buy.stripe.com/14AeV7e3x0Zge6oelS9fZ0X",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/7sY00d5x17nEd2k2Da9fZ0V",
      "hot-pink-mm-cookie": "https://buy.stripe.com/aFa3cp3oTeQ69Q86Tq9fZ0Z",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/cNi4gt7F9fUagewdhO9fY44",
      "bulk25Off": "https://buy.stripe.com/14AeV7aRl4bsgew5Pm9fY46",
      "bulk30Off": "https://buy.stripe.com/fZu3cp7F90Zge6o0v29fZ03",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/cNiaER3oT0Zg3rKfpW9fY3N",
      "2": "https://buy.stripe.com/14A4gtgbFeQ64vO91y9fY42",
      "4": "https://buy.stripe.com/9B628l4sXdM2fas6Tq9fY45",
      "5": "https://buy.stripe.com/14AeV7aRl4bsgew5Pm9fY46",
      "6": "https://buy.stripe.com/8x200df7B23ke6ob9G9fY47",
      "7": "https://buy.stripe.com/4gM4gt1gL37obYga5C9fZ00",
      "8": "https://buy.stripe.com/eVqcMZ7F9cHY6DW0v29fZ01",
      "9": "https://buy.stripe.com/bJeeV7f7B8rIe6oa5C9fZ02",
      "12": "https://buy.stripe.com/7sY00d6B55fwd2kfpW9fZ05",
      "11": "https://buy.stripe.com/28EfZb0cH7nEfas3He9fZ04",
      "14": "https://buy.stripe.com/9B6bIV0cH5fwd2kdhO9fZ07",
      "13": "https://buy.stripe.com/3cI3cp2kPcHY9Q8b9G9fZ06",
      "10": "https://buy.stripe.com/fZu3cp7F90Zge6o0v29fZ03",
      "17": "https://buy.stripe.com/00w8wJbVp4bs0fy0v29fZ0a",
      "15": "https://buy.stripe.com/28E28l3oT4bse6o4Li9fZ08",
      "16": "https://buy.stripe.com/eVq14h7F97nE5zSfpW9fZ09",
      "18": "https://buy.stripe.com/aFa7sF3oT6jAgewfpW9fZ0b",
      "3": "https://buy.stripe.com/cNi4gt7F9fUagewdhO9fY44",
      "19": "https://buy.stripe.com/00waERe3x37o3rKb9G9fZ0c",
      "20": "https://buy.stripe.com/4gM4gtf7BeQ65zSb9G9fZ0d",
    },
    upsellPairPrice: 152,
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
    price: 175,
    compareAtPrice: 220,
    size: "Statement piece",
    category: "statement",
    featured: true,
    image: "/images/products/ice-cream.jpg",
    etsyUrl: "https://www.etsy.com/listing/1892110346/jumbo-chocolate-chip-cookie-ice-cream",
    stripeUrl: "https://buy.stripe.com/aFa14h8Jd8rIfasgu09fZ10",
    stripeUpsellUrl: "https://buy.stripe.com/28EaERe3xfUagewfpW9fZ1h",
    stripeProductId: "prod_VInVDITITvdjRz",
    stripeUnitPriceId: "price_1UU8zb8dNREsB4xB86MYE4Tt",
    stripeSecond10OffPriceId: "price_1UU8zf8dNREsB4xBH2iArGZA",
    stripeTierPriceIds: {
      unit: "price_1UU8zb8dNREsB4xB86MYE4Tt",
      second10Off: "price_1UU8zf8dNREsB4xBH2iArGZA",
      third15Off: "price_1UU8zh8dNREsB4xBPWCMM7H6",
      bulk20Off: "price_1UU8zj8dNREsB4xBjO7eSuS6",
      bulk25Off: "price_1UU8zj8dNREsB4xB2tpXR8uO",
      bulk30Off: "price_1UU8zk8dNREsB4xBwFP7XRRs",
    },
    stripePairUrls: {
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/28EaERe3xfUagewfpW9fZ1h",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gM7sF6B58rI1jC0v29fZ11",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/28EcMZ5x10Zg3rKb9G9fZ13",
      "rainbow-candy-cookie": "https://buy.stripe.com/14A28lf7BgYe2nGcdK9fZ15",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU9ANe3x0Zg3rK2Da9fZ17",
      "jumbo-christmas-cookie": "https://buy.stripe.com/cNifZb6B5dM25zS5Pm9fZ1b",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/6oU28l5x10Zg2nGa5C9fZ19",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/14A00de3xeQ62nG6Tq9fZ1d",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/14A28l2kP7nE1jCa5C9fZ1f",
      "jumbo-mm-cookie": "https://buy.stripe.com/3cIfZbgbF9vMbYgdhO9fZ1j",
      "hot-pink-mm-cookie": "https://buy.stripe.com/7sYbIV9Nh37od2kdhO9fZ1l",
    },
    stripeTrioUrl: "https://buy.stripe.com/5kQ28l3oTbDUd2k91y9fZ1i",
    stripeTrioUrls: {
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ28l3oTbDUd2k91y9fZ1i",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/28E28l7F923ke6ofpW9fZ14",
      "rainbow-candy-cookie": "https://buy.stripe.com/28E5kx9NhdM29Q8fpW9fZ16",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRm3cp2kPbDUe6oa5C9fZ18",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gM28l0cH7nEe6o1z69fZ12",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFa3cp4sXgYe3rKelS9fZ1a",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B6dR3f7B6jA2nG5Pm9fZ1g",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/bJe3cp4sXgYe6DWcdK9fZ1e",
      "jumbo-mm-cookie": "https://buy.stripe.com/fZucMZ3oTdM25zS91y9fZ1k",
      "jumbo-christmas-cookie": "https://buy.stripe.com/28EaER0cH37od2k0v29fZ1c",
      "hot-pink-mm-cookie": "https://buy.stripe.com/aFa5kxf7BgYe4vO1z69fZ1m",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/00wdR36B537o7I05Pm9fZ1n",
      "bulk25Off": "https://buy.stripe.com/8x23cp1gL0Zg6DW5Pm9fZ1p",
      "bulk30Off": "https://buy.stripe.com/6oUaER4sXbDUe6oelS9fZ1u",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/aFa14h8Jd8rIfasgu09fZ10",
      "2": "https://buy.stripe.com/28EaERe3xfUagewfpW9fZ1h",
      "3": "https://buy.stripe.com/00wdR36B537o7I05Pm9fZ1n",
      "6": "https://buy.stripe.com/5kQ9AN5x14bs5zSgu09fZ1q",
      "7": "https://buy.stripe.com/7sYaER7F94bsd2k3He9fZ1r",
      "4": "https://buy.stripe.com/fZu28l4sX37oaUc6Tq9fZ1o",
      "8": "https://buy.stripe.com/9B63cpe3xdM2aUcgu09fZ1s",
      "9": "https://buy.stripe.com/8x24gtbVpdM2aUccdK9fZ1t",
      "12": "https://buy.stripe.com/28EcMZ1gLcHY9Q8cdK9fZ1w",
      "5": "https://buy.stripe.com/8x23cp1gL0Zg6DW5Pm9fZ1p",
      "10": "https://buy.stripe.com/6oUaER4sXbDUe6oelS9fZ1u",
      "13": "https://buy.stripe.com/fZu8wJ8Jd0Zge6o4Li9fZ1x",
      "15": "https://buy.stripe.com/eVq5kxgbF37o6DW0v29fZ1z",
      "11": "https://buy.stripe.com/cNicMZe3xgYe8M4a5C9fZ1v",
      "16": "https://buy.stripe.com/fZu5kx7F96jA0fy6Tq9fZ1A",
      "14": "https://buy.stripe.com/eVq28laRleQ68M4fpW9fZ1y",
      "17": "https://buy.stripe.com/7sY8wJaRl37o9Q84Li9fZ1B",
      "18": "https://buy.stripe.com/28EfZb6B537o8M44Li9fZ1C",
      "19": "https://buy.stripe.com/3cI00de3x6jA0fydhO9fZ1D",
      "20": "https://buy.stripe.com/aFa5kx4sXdM22nGb9G9fZ1E",
    },
    upsellPairPrice: 332,
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
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/mm-classic.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831839675/jumbo-mm-cookie-wall-art-candyland",
    stripeUrl: "https://buy.stripe.com/00wcMZcZt37ofas1z69fZ1F",
    stripeUpsellUrl: "https://buy.stripe.com/aFa9ANgbFfUa5zS7Xu9fZ1Y",
    stripeProductId: "prod_VInV2orrtkSQHB",
    stripeUnitPriceId: "price_1UU8zm8dNREsB4xBu3BnOhmv",
    stripeSecond10OffPriceId: "price_1UU8zo8dNREsB4xBcbxKH8jo",
    stripeTierPriceIds: {
      unit: "price_1UU8zm8dNREsB4xBu3BnOhmv",
      second10Off: "price_1UU8zo8dNREsB4xBcbxKH8jo",
      third15Off: "price_1UU8zr8dNREsB4xBil3onUCj",
      bulk20Off: "price_1UU8zs8dNREsB4xB4rDZjujC",
      bulk25Off: "price_1UU8zu8dNREsB4xBEkkppun7",
      bulk30Off: "price_1UU8zv8dNREsB4xBCmMqBF3k",
    },
    stripePairUrls: {
      "jumbo-mm-cookie": "https://buy.stripe.com/aFa9ANgbFfUa5zS7Xu9fZ1Y",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/4gM14h2kP37oaUc2Da9fZ1I",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/fZufZb9Nh8rIaUc7Xu9fZ1G",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRm9AN5x15fwgewcdK9fZ1M",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/6oUdR36B56jAe6o0v29fZ1O",
      "jumbo-christmas-cookie": "https://buy.stripe.com/fZu5kx4sX23kbYg5Pm9fZ1Q",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/cNi6oB6B54bs0fyfpW9fZ1S",
      "hot-pink-mm-cookie": "https://buy.stripe.com/bJe28l3oT9vM9Q83He9fZ20",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B69AN3oT23kd2k3He9fZ1U",
      "rainbow-candy-cookie": "https://buy.stripe.com/8x28wJcZt6jAaUca5C9fZ1K",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ7sF2kP23k1jC6Tq9fZ1W",
    },
    stripeTrioUrl: "https://buy.stripe.com/5kQ3cpbVp9vM8M4cdK9fZ1Z",
    stripeTrioUrls: {
      "jumbo-mm-cookie": "https://buy.stripe.com/5kQ3cpbVp9vM8M4cdK9fZ1Z",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRm14haRl6jA6DWcdK9fZ1H",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/cNifZb3oTazQ3rKcdK9fZ1J",
      "rainbow-candy-cookie": "https://buy.stripe.com/9B600daRl23kd2ka5C9fZ1L",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gM14h5x1gYeaUcfpW9fZ1N",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFadR39Nh0Zggew3He9fZ1P",
      "jumbo-christmas-cookie": "https://buy.stripe.com/3cIeV7bVpeQ6fasb9G9fZ1R",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/fZucMZ4sXbDU6DWelS9fZ1T",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B628lcZtazQ8M41z69fZ1V",
      "hot-pink-mm-cookie": "https://buy.stripe.com/3cIbIV9Nh9vMe6o1z69fZ21",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/28E7sF1gLdM25zS4Li9fZ1X",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/6oU9AN7F937o7I0cdK9fZ22",
      "bulk25Off": "https://buy.stripe.com/eVq5kx2kP37oaUc0v29fZ24",
      "bulk30Off": "https://buy.stripe.com/14A4gt5x10Zg3rK91y9fZ29",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/00wcMZcZt37ofas1z69fZ1F",
      "2": "https://buy.stripe.com/aFa9ANgbFfUa5zS7Xu9fZ1Y",
      "4": "https://buy.stripe.com/dRm4gt9NhazQd2k3He9fZ23",
      "5": "https://buy.stripe.com/eVq5kx2kP37oaUc0v29fZ24",
      "7": "https://buy.stripe.com/14AaER4sXazQ6DW91y9fZ26",
      "6": "https://buy.stripe.com/dRmfZb7F9cHY5zSb9G9fZ25",
      "8": "https://buy.stripe.com/3cI6oB4sX8rI9Q8cdK9fZ27",
      "9": "https://buy.stripe.com/3cI4gt5x14bse6o91y9fZ28",
      "10": "https://buy.stripe.com/14A4gt5x10Zg3rK91y9fZ29",
      "11": "https://buy.stripe.com/eVq3cp9Nh9vM3rKb9G9fZ2a",
      "12": "https://buy.stripe.com/00wfZbgbFazQ4vO91y9fZ2b",
      "13": "https://buy.stripe.com/fZu5kx9NhazQ6DWgu09fZ2c",
      "14": "https://buy.stripe.com/9B67sFgbF5fwd2kcdK9fZ2d",
      "16": "https://buy.stripe.com/cNi6oB6B5eQ61jC1z69fZ2f",
      "3": "https://buy.stripe.com/6oU9AN7F937o7I0cdK9fZ22",
      "15": "https://buy.stripe.com/eVqbIV5x1dM23rKgu09fZ2e",
      "18": "https://buy.stripe.com/dRm00d5x18rIgew2Da9fZ2h",
      "17": "https://buy.stripe.com/5kQeV70cHcHY8M4elS9fZ2g",
      "19": "https://buy.stripe.com/dRmfZbe3xeQ6fas3He9fZ2i",
      "20": "https://buy.stripe.com/3cI00d9Nh6jA3rKb9G9fZ2j",
    },
    upsellPairPrice: 152,
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
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/hot-pink-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831836105/hot-pink-jumbo-mm-cookie-candyland-wall",
    stripeUrl: "https://buy.stripe.com/bJecMZf7B0ZgaUc7Xu9fZ2k",
    stripeUpsellUrl: "https://buy.stripe.com/aFa9AN7F9dM2bYga5C9fZ2F",
    stripeProductId: "prod_VInVfyjuGE81ol",
    stripeUnitPriceId: "price_1UU8zx8dNREsB4xBED6HAv9a",
    stripeSecond10OffPriceId: "price_1UU8zz8dNREsB4xBAGINUp27",
    stripeTierPriceIds: {
      unit: "price_1UU8zx8dNREsB4xBED6HAv9a",
      second10Off: "price_1UU8zz8dNREsB4xBAGINUp27",
      third15Off: "price_1UU9008dNREsB4xBdqQbByqO",
      bulk20Off: "price_1UU9028dNREsB4xBEHyBN4Li",
      bulk25Off: "price_1UU9048dNREsB4xBCvWByeDt",
      bulk30Off: "price_1UU9078dNREsB4xBuuHhlNOy",
    },
    stripePairUrls: {
      "hot-pink-mm-cookie": "https://buy.stripe.com/aFa9AN7F9dM2bYga5C9fZ2F",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sYaER2kP5fw6DWdhO9fZ2l",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/28E28lgbFeQ6e6o5Pm9fZ2n",
      "rainbow-candy-cookie": "https://buy.stripe.com/5kQ7sF8JdbDUbYg5Pm9fZ2p",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28EcMZf7B4bs7I05Pm9fZ2r",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/5kQ6oB1gL37o0fygu09fZ2t",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/14A00daRl7nEd2kb9G9fZ2x",
      "jumbo-mm-cookie": "https://buy.stripe.com/dRm3cp8JdazQ2nG6Tq9fZ2D",
      "jumbo-christmas-cookie": "https://buy.stripe.com/eVq4gt6B5azQd2k7Xu9fZ2v",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/aFa7sF9Nh7nEaUc1z69fZ2B",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/4gM7sF1gL8rI6DW7Xu9fZ2z",
    },
    stripeTrioUrl: "https://buy.stripe.com/dRmbIVbVpbDU8M40v29fZ2G",
    stripeTrioUrls: {
      "hot-pink-mm-cookie": "https://buy.stripe.com/dRmbIVbVpbDU8M40v29fZ2G",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/bJe4gte3x8rIe6ocdK9fZ2m",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/eVqeV7f7BdM2e6o5Pm9fZ2o",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/9B6bIV0cHazQ8M4cdK9fZ2s",
      "rainbow-candy-cookie": "https://buy.stripe.com/dRmcMZ7F937o8M4a5C9fZ2q",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/14A28le3x23k7I02Da9fZ2u",
      "jumbo-christmas-cookie": "https://buy.stripe.com/3cI3cp6B5dM2gew6Tq9fZ2w",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/aFadR39Nh37o0fy0v29fZ2C",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/4gM4gtcZt37ofascdK9fZ2y",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJe9AN6B5bDU8M42Da9fZ2E",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/5kQaER5x1gYe3rK2Da9fZ2A",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/00w28lgbF9vM3rK0v29fZ2H",
      "bulk25Off": "https://buy.stripe.com/14AbIV5x123ke6o6Tq9fZ2J",
      "bulk30Off": "https://buy.stripe.com/5kQ8wJbVpcHY9Q80v29fZ2O",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/bJecMZf7B0ZgaUc7Xu9fZ2k",
      "2": "https://buy.stripe.com/aFa9AN7F9dM2bYga5C9fZ2F",
      "4": "https://buy.stripe.com/00w6oB4sXazQ5zScdK9fZ2I",
      "5": "https://buy.stripe.com/14AbIV5x123ke6o6Tq9fZ2J",
      "7": "https://buy.stripe.com/bJeeV7f7BazQbYg6Tq9fZ2L",
      "6": "https://buy.stripe.com/8x25kx8Jd6jAaUcgu09fZ2K",
      "11": "https://buy.stripe.com/28E28l2kP4bs7I05Pm9fZ2P",
      "3": "https://buy.stripe.com/00w28lgbF9vM3rK0v29fZ2H",
      "9": "https://buy.stripe.com/fZu28l0cHfUa5zS3He9fZ2N",
      "8": "https://buy.stripe.com/cNi28l6B55fwe6ob9G9fZ2M",
      "12": "https://buy.stripe.com/14AaER2kP37oe6oa5C9fZ2Q",
      "13": "https://buy.stripe.com/fZueV7cZt23k1jCcdK9fZ2R",
      "14": "https://buy.stripe.com/fZufZb3oT7nEbYgdhO9fZ2S",
      "10": "https://buy.stripe.com/5kQ8wJbVpcHY9Q80v29fZ2O",
      "15": "https://buy.stripe.com/eVq14h4sXeQ6fas91y9fZ2T",
      "16": "https://buy.stripe.com/eVqaER9NhfUa0fy0v29fZ2U",
      "17": "https://buy.stripe.com/4gM3cpaRl37od2kdhO9fZ2V",
      "19": "https://buy.stripe.com/dRm5kx0cH0Zgfas0v29fZ2X",
      "20": "https://buy.stripe.com/14AfZb6B5bDUbYggu09fZ2Y",
      "18": "https://buy.stripe.com/7sY9AN9NhdM2gew5Pm9fZ2W",
    },
    upsellPairPrice: 152,
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

/** 10% off price for the second cookie in a BOGO 10% off pair. */
export function getSecondCookiePrice(product: Pick<Product, "price" | "upsellPairPrice">): number {
  return product.upsellPairPrice - product.price;
}

/** 15% off price for the third cookie in the "Want a third?" prompt. */
export function getThirdCookiePrice(product: Pick<Product, "price">): number {
  return Math.round(product.price * 0.85);
}

/**
 * Bulk tier discount percentage for a given total cookie count (for bulk orders of 3 to 20 cookies).
 * - 10 to 20 cookies: 30% off each
 * - 5 to 9 cookies: 25% off each (covers "5 to 10 cookies: 25% off", with 10+ getting 30% off)
 * - 3 to 4 cookies: 20% off each (covers "3 to 5 cookies: 20% off", with 5+ getting 25% off)
 */
export function getBulkDiscountPercent(totalCookies: number): 0 | 20 | 25 | 30 {
  if (totalCookies >= 10) return 30;
  if (totalCookies >= 5) return 25;
  if (totalCookies >= 3) return 20;
  return 0;
}

/** Discounted unit price in whole USD for a given percentage discount (e.g. 15, 20, 25, 30). */
export function getDiscountedUnitPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
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
