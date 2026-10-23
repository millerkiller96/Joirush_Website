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
    price: 100,
    compareAtPrice: 149,
    size: "16 × 16 in",
    category: "classic",
    featured: true,
    image: "/images/products/choc-chip.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831819997/jumbo-chocolate-chip-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/bJe9AN6B5eQ66DW1z69fW00",
    stripeUpsellUrl: "https://buy.stripe.com/00wbIV4sX0Zg3rK91y9fW0r",
    stripeProductId: "prod_VInUXaAP2bjrGc",
    stripeUnitPriceId: "price_1UIBtx8dNREsB4xBV16Vh5FF",
    stripeSecond10OffPriceId: "price_1UIs5S8dNREsB4xBgEhSim2q",
    stripeTierPriceIds: {
      unit: "price_1UIBtx8dNREsB4xBV16Vh5FF",
      second10Off: "price_1UIs5S8dNREsB4xBgEhSim2q",
      third15Off: "price_1UTXKR8dNREsB4xBbjHQB1C0",
      bulk20Off: "price_1UTXKS8dNREsB4xB65irUAY2",
      bulk25Off: "price_1UTXKT8dNREsB4xBoGMSEhDY",
      bulk30Off: "price_1UTXKU8dNREsB4xBCEaWH8a8",
    },
    stripePairUrls: {
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/00wbIV4sX0Zg3rK91y9fW0r",
      "rainbow-candy-cookie": "https://buy.stripe.com/aFabIV9Nh4bsfas4Li9fX08",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFa5kxe3xdM29Q8dhO9fX09",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28E4gt5x1azQ3rKgu09fX0a",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/6oU00d2kP0Zgd2k91y9fX0b",
      "jumbo-christmas-cookie": "https://buy.stripe.com/cNidR3aRlbDUaUc0v29fX0c",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/cNi6oB7F95fw2nGdhO9fX0d",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/28E28l4sXdM29Q8gu09fX0f",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/7sY8wJ9NhfUaaUcb9G9fX0e",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJe5kxgbF4bs3rK6Tq9fX0g",
      "hot-pink-mm-cookie": "https://buy.stripe.com/dRmeV7e3x23k5zSelS9fX0k",
    },
    stripeTrioUrl: "https://buy.stripe.com/eVqdR39NhcHYd2kb9G9fW45",
    stripeTrioUrls: {
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/eVqdR39NhcHYd2kb9G9fW45",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ28le3x4bs1jC2Da9fX1U",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/9B600d6B50Zggewb9G9fX1V",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gM7sF0cH9vM3rK7Xu9fX1W",
      "rainbow-candy-cookie": "https://buy.stripe.com/5kQ6oB6B5fUa8M42Da9fX1X",
      "jumbo-christmas-cookie": "https://buy.stripe.com/7sYaER7F9gYe4vOa5C9fX1Y",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJe3cpbVp8rI9Q84Li9fX1Z",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/9B628lf7B7nEd2k0v29fX20",
      "hot-pink-mm-cookie": "https://buy.stripe.com/14A5kx2kP37o4vO1z69fX21",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/8x28wJ5x19vM1jCb9G9fX22",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFaaER7F923k8M4fpW9fX24",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/8x214h6B5bDUe6o3He9fW14",
      "bulk25Off": "https://buy.stripe.com/cNiaERbVpazQ7I02Da9fW0W",
      "bulk30Off": "https://buy.stripe.com/28E14hf7B6jAbYgfpW9fW0Z",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/bJe9AN6B5eQ66DW1z69fW00",
      "2": "https://buy.stripe.com/00wbIV4sX0Zg3rK91y9fW0r",
      "6": "https://buy.stripe.com/3cI6oB2kP7nE5zSgu09fW0T",
      "4": "https://buy.stripe.com/fZu28l0cHazQ5zS7Xu9fW0U",
      "11": "https://buy.stripe.com/eVq28l6B523kbYg5Pm9fW0V",
      "5": "https://buy.stripe.com/cNiaERbVpazQ7I02Da9fW0W",
      "9": "https://buy.stripe.com/dRm9ANf7B4bs8M4fpW9fW0X",
      "8": "https://buy.stripe.com/8x2fZbf7B0Zgd2k7Xu9fW0Y",
      "10": "https://buy.stripe.com/28E14hf7B6jAbYgfpW9fW0Z",
      "7": "https://buy.stripe.com/aFadR3f7B0Zg9Q82Da9fW10",
      "12": "https://buy.stripe.com/eVq28l5x1eQ64vOfpW9fW11",
      "14": "https://buy.stripe.com/9B63cpf7BdM23rK6Tq9fW12",
      "15": "https://buy.stripe.com/bJe7sFe3xcHY4vOgu09fW13",
      "3": "https://buy.stripe.com/8x214h6B5bDUe6o3He9fW14",
      "17": "https://buy.stripe.com/cNi28lcZt4bsgewa5C9fW15",
      "16": "https://buy.stripe.com/bJe28l3oT8rI8M44Li9fW16",
      "18": "https://buy.stripe.com/7sYeV75x123kd2k0v29fW17",
      "20": "https://buy.stripe.com/6oU28lgbFcHYd2k1z69fW18",
      "19": "https://buy.stripe.com/9B6cMZ9Nh37o3rKa5C9fW19",
      "13": "https://buy.stripe.com/fZuaER9Nh6jA9Q82Da9fW1o",
    },
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
    stripeProductId: "prod_VInVwq4gwbHX7W",
    stripeUnitPriceId: "price_1UIBu48dNREsB4xBJU4XWWaG",
    stripeSecond10OffPriceId: "price_1UIs5Z8dNREsB4xBATCXEZ7W",
    stripeTierPriceIds: {
      unit: "price_1UIBu48dNREsB4xBJU4XWWaG",
      second10Off: "price_1UIs5Z8dNREsB4xBATCXEZ7W",
      third15Off: "price_1UTXKV8dNREsB4xBgaTkODBx",
      bulk20Off: "price_1UTXKX8dNREsB4xBdR8J216N",
      bulk25Off: "price_1UTXKY8dNREsB4xBxba7CIve",
      bulk30Off: "price_1UTXKZ8dNREsB4xBEF5txp8R",
    },
    stripePairUrls: {
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/cNibIV8JdfUaaUc91y9fW0B",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/cNi8wJ1gL37o7I091y9fX0h",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/5kQ9ANf7B9vMd2kcdK9fX0i",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/cNibIV9NhcHYaUcgu09fX0j",
      "jumbo-christmas-cookie": "https://buy.stripe.com/5kQeV72kP37o6DW2Da9fX0l",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/eVq28lcZt6jA7I02Da9fX0m",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/7sY7sF5x16jA1jCcdK9fX0n",
      "jumbo-mm-cookie": "https://buy.stripe.com/fZu28l3oT6jAaUc4Li9fX0o",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/6oU5kxf7B0Zg8M4elS9fX0p",
      "hot-pink-mm-cookie": "https://buy.stripe.com/fZu7sF7F9eQ6faselS9fX0q",
      "rainbow-candy-cookie": "https://buy.stripe.com/cNi14hcZtdM22nGa5C9fX0r",
    },
    stripeTrioUrl: "https://buy.stripe.com/6oUfZbbVp23k0fycdK9fW46",
    stripeTrioUrls: {
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/6oUfZbbVp23k0fycdK9fW46",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28E00df7B8rI6DW4Li9fX23",
      "jumbo-christmas-cookie": "https://buy.stripe.com/14AeV7gbF6jA1jC7Xu9fX25",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x2bIVcZt0Zg6DW5Pm9fX26",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/8x26oB2kP0Zg8M4elS9fX29",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/cNieV76B5gYe6DWfpW9fX2a",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/3cIcMZaRlazQ2nG4Li9fX27",
      "rainbow-candy-cookie": "https://buy.stripe.com/28EbIVaRl23kfas6Tq9fX28",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/eVq7sFbVp23k1jCelS9fX2b",
      "jumbo-mm-cookie": "https://buy.stripe.com/aFa9ANf7BeQ62nG91y9fX2c",
      "hot-pink-mm-cookie": "https://buy.stripe.com/9B69ANe3xdM28M4dhO9fX2d",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/fZubIV7F937o2nG1z69fW1a",
      "bulk25Off": "https://buy.stripe.com/fZu00d6B5dM29Q8b9G9fW1b",
      "bulk30Off": "https://buy.stripe.com/14A28l8JdazQ6DWdhO9fW1g",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/fZu7sF1gLdM22nGfpW9fW06",
      "2": "https://buy.stripe.com/cNibIV8JdfUaaUc91y9fW0B",
      "3": "https://buy.stripe.com/fZubIV7F937o2nG1z69fW1a",
      "5": "https://buy.stripe.com/fZu00d6B5dM29Q8b9G9fW1b",
      "6": "https://buy.stripe.com/8x200dgbF9vM5zS7Xu9fW1c",
      "7": "https://buy.stripe.com/aFabIVf7B7nE5zSgu09fW1d",
      "8": "https://buy.stripe.com/6oU6oB6B5azQ5zS7Xu9fW1e",
      "4": "https://buy.stripe.com/eVq5kxcZt7nEe6oelS9fW1f",
      "10": "https://buy.stripe.com/14A28l8JdazQ6DWdhO9fW1g",
      "11": "https://buy.stripe.com/cNi3cp3oTcHY4vOelS9fW1h",
      "12": "https://buy.stripe.com/dRm28laRl5fwgew6Tq9fW1i",
      "13": "https://buy.stripe.com/5kQeV76B5gYee6oelS9fW1j",
      "14": "https://buy.stripe.com/00w28l8Jd9vM2nGelS9fW1k",
      "17": "https://buy.stripe.com/3cI5kx6B56jA1jCgu09fW1l",
      "15": "https://buy.stripe.com/aFa3cp2kPfUa3rK4Li9fW1m",
      "9": "https://buy.stripe.com/5kQfZb4sXbDUbYg5Pm9fW1n",
      "18": "https://buy.stripe.com/eVq28le3xdM27I0a5C9fW1p",
      "16": "https://buy.stripe.com/28EcMZ2kPcHYe6o91y9fW1q",
      "19": "https://buy.stripe.com/4gMfZb4sXeQ60fyelS9fW1r",
      "20": "https://buy.stripe.com/aFa5kxgbF5fwfas5Pm9fW1s",
    },
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
    stripeProductId: "prod_VInVAr2A30To1r",
    stripeUnitPriceId: "price_1UIBu68dNREsB4xBvnCx5qG0",
    stripeSecond10OffPriceId: "price_1UIs5a8dNREsB4xBQM6AXYap",
    stripeTierPriceIds: {
      unit: "price_1UIBu68dNREsB4xBvnCx5qG0",
      second10Off: "price_1UIs5a8dNREsB4xBQM6AXYap",
      third15Off: "price_1UTXKa8dNREsB4xBpXYxbrM5",
      bulk20Off: "price_1UTXKc8dNREsB4xBMpvbZE6D",
      bulk25Off: "price_1UTXKe8dNREsB4xB7qtmGxjU",
      bulk30Off: "price_1UTXKe8dNREsB4xB24Xa5O8z",
    },
    stripePairUrls: {
      "rainbow-candy-cookie": "https://buy.stripe.com/6oU3cpe3x23kgewelS9fW0D",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/6oUfZbgbFazQd2kb9G9fX0s",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/3cI00dgbF0Zg4vO2Da9fX0t",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/00w9AN1gLazQ3rK1z69fX0u",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/dRm9ANbVpbDUbYg7Xu9fX0v",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/3cI28l8Jd37ofaselS9fX0x",
      "jumbo-christmas-cookie": "https://buy.stripe.com/28E6oBf7BeQ63rK0v29fX0w",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/14A14h5x1eQ66DW7Xu9fX0y",
      "jumbo-mm-cookie": "https://buy.stripe.com/7sYaER4sX6jA2nGcdK9fX0z",
      "hot-pink-mm-cookie": "https://buy.stripe.com/dRm8wJ2kP6jAe6o5Pm9fX0A",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/3cIcMZ1gL6jAd2k7Xu9fX0D",
    },
    stripeTrioUrl: "https://buy.stripe.com/14A6oB3oTgYe5zS6Tq9fW47",
    stripeTrioUrls: {
      "rainbow-candy-cookie": "https://buy.stripe.com/14A6oB3oTgYe5zS6Tq9fW47",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/9B63cp3oT6jAgew2Da9fX2e",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/bJe00d8JdcHY9Q8cdK9fX2f",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sYfZb8Jd6jA9Q891y9fX2g",
      "jumbo-christmas-cookie": "https://buy.stripe.com/8x27sFaRldM27I00v29fX2i",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/fZu28l7F94bs1jC4Li9fX2h",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/cNi6oB7F9cHYgew5Pm9fX2j",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/14A14hbVpfUad2k7Xu9fX2k",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/bJe4gt9NhdM21jC91y9fX2l",
      "hot-pink-mm-cookie": "https://buy.stripe.com/14A6oB5x18rI3rK4Li9fX2m",
      "jumbo-mm-cookie": "https://buy.stripe.com/9B600d9Nh4bs2nGb9G9fX2n",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/bJeeV76B54bsaUc91y9fW1t",
      "bulk25Off": "https://buy.stripe.com/28EcMZ6B59vM3rK6Tq9fW1v",
      "bulk30Off": "https://buy.stripe.com/3cI28lbVpazQbYg6Tq9fW1A",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/28EdR3gbF6jA5zSelS9fW08",
      "2": "https://buy.stripe.com/6oU3cpe3x23kgewelS9fW0D",
      "3": "https://buy.stripe.com/bJeeV76B54bsaUc91y9fW1t",
      "4": "https://buy.stripe.com/fZu14h1gLgYed2k91y9fW1u",
      "5": "https://buy.stripe.com/28EcMZ6B59vM3rK6Tq9fW1v",
      "6": "https://buy.stripe.com/dRm9ANe3x37o2nGgu09fW1w",
      "9": "https://buy.stripe.com/dRm8wJ8Jd8rI0fydhO9fW1y",
      "8": "https://buy.stripe.com/14A5kxcZt37od2kb9G9fW1x",
      "11": "https://buy.stripe.com/cNi14h8JdbDUaUca5C9fW1z",
      "10": "https://buy.stripe.com/3cI28lbVpazQbYg6Tq9fW1A",
      "12": "https://buy.stripe.com/9B69AN6B56jA9Q80v29fW1B",
      "13": "https://buy.stripe.com/9B66oBf7BeQ6bYggu09fW1C",
      "14": "https://buy.stripe.com/3cIfZbe3x0Zg6DW6Tq9fW1D",
      "15": "https://buy.stripe.com/cNi28l7F9cHYe6odhO9fW1E",
      "16": "https://buy.stripe.com/9B614h9Nh5fwfasgu09fW1F",
      "19": "https://buy.stripe.com/5kQ5kx4sXbDU6DW5Pm9fW1G",
      "17": "https://buy.stripe.com/14AeV70cHgYe7I03He9fW1H",
      "20": "https://buy.stripe.com/fZu9AN0cH9vM0fy5Pm9fW1I",
      "18": "https://buy.stripe.com/cNi8wJ2kP7nEd2ka5C9fW1J",
      "7": "https://buy.stripe.com/28E3cp4sX0Zg3rK2Da9fW1O",
    },
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
    stripeProductId: "prod_VInVMu4LI8B4Yp",
    stripeUnitPriceId: "price_1UIBu88dNREsB4xBTNS59vIX",
    stripeSecond10OffPriceId: "price_1UIs5a8dNREsB4xBWxtJaEv3",
    stripeTierPriceIds: {
      unit: "price_1UIBu88dNREsB4xBTNS59vIX",
      second10Off: "price_1UIs5a8dNREsB4xBWxtJaEv3",
      third15Off: "price_1UTXKf8dNREsB4xBXnfRWmlc",
      bulk20Off: "price_1UTXKh8dNREsB4xBZAuLXILT",
      bulk25Off: "price_1UTXKi8dNREsB4xBuE87OG4S",
      bulk30Off: "price_1UTXKj8dNREsB4xBm6rp5Izz",
    },
    stripePairUrls: {
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/5kQdR34sX37o3rK6Tq9fW0F",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRmaERgbF37o7I05Pm9fX0B",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFa7sF0cHcHY5zS2Da9fX0C",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/fZu9ANbVp23k5zSelS9fX0E",
      "jumbo-christmas-cookie": "https://buy.stripe.com/eVq9ANf7B8rI3rK6Tq9fX0F",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/14AcMZ2kP0Zg9Q81z69fX0H",
      "rainbow-candy-cookie": "https://buy.stripe.com/5kQ14hcZt4bs8M4elS9fX0G",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/bJe4gtcZt23k4vO7Xu9fX0I",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ4gtcZteQ68M44Li9fX0J",
      "jumbo-mm-cookie": "https://buy.stripe.com/28EbIV4sX4bs8M4elS9fX0K",
      "hot-pink-mm-cookie": "https://buy.stripe.com/fZu5kx5x1cHYfas2Da9fX0M",
    },
    stripeTrioUrl: "https://buy.stripe.com/bJeeV78JdeQ64vOfpW9fX00",
    stripeTrioUrls: {
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/bJeeV78JdeQ64vOfpW9fX00",
      "rainbow-candy-cookie": "https://buy.stripe.com/7sY14h0cHeQ6fas7Xu9fX2p",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/fZu5kxbVpgYebYg91y9fX2o",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/7sY6oBf7B5fw5zS7Xu9fX2q",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/8x200de3xcHYaUc91y9fX2r",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/14A14h1gL37o7I0cdK9fX2s",
      "jumbo-christmas-cookie": "https://buy.stripe.com/dRm28l1gL23k0fy6Tq9fX2t",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/fZufZb2kP4bsfas1z69fX2v",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/fZu8wJ6B55fwbYg91y9fX2u",
      "hot-pink-mm-cookie": "https://buy.stripe.com/bJefZbbVp37o8M41z69fX2w",
      "jumbo-mm-cookie": "https://buy.stripe.com/dRmfZb6B5fUa3rK1z69fX2y",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/00w8wJ7F9gYebYggu09fW1K",
      "bulk25Off": "https://buy.stripe.com/eVqfZbgbF8rIbYgfpW9fW1M",
      "bulk30Off": "https://buy.stripe.com/5kQ3cp8JdfUa6DW2Da9fW1S",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/3cIbIVcZtgYe5zS91y9fW0a",
      "2": "https://buy.stripe.com/5kQdR34sX37o3rK6Tq9fW0F",
      "4": "https://buy.stripe.com/aFafZb1gL5fwfasa5C9fW1L",
      "3": "https://buy.stripe.com/00w8wJ7F9gYebYggu09fW1K",
      "5": "https://buy.stripe.com/eVqfZbgbF8rIbYgfpW9fW1M",
      "6": "https://buy.stripe.com/00wcMZ9NheQ6fasdhO9fW1N",
      "7": "https://buy.stripe.com/6oUcMZ9NhazQ7I0a5C9fW1P",
      "8": "https://buy.stripe.com/eVqcMZ0cH23kd2kgu09fW1Q",
      "9": "https://buy.stripe.com/aFa5kxcZtcHYe6o4Li9fW1R",
      "10": "https://buy.stripe.com/5kQ3cp8JdfUa6DW2Da9fW1S",
      "12": "https://buy.stripe.com/cNi3cp8Jd37o0fycdK9fW1U",
      "11": "https://buy.stripe.com/dRm4gt6B5azQ1jC0v29fW1T",
      "14": "https://buy.stripe.com/28EfZb2kP37od2k91y9fW1V",
      "15": "https://buy.stripe.com/6oUfZb4sXcHYe6ocdK9fW1W",
      "16": "https://buy.stripe.com/8x23cpcZtfUa5zSa5C9fW1X",
      "13": "https://buy.stripe.com/cNi14h2kP7nEd2k0v29fW1Y",
      "19": "https://buy.stripe.com/14A3cpbVp23k0fy7Xu9fW1Z",
      "17": "https://buy.stripe.com/9B600d6B5gYe0fydhO9fW20",
      "18": "https://buy.stripe.com/28E6oB3oT4bs9Q8b9G9fW21",
      "20": "https://buy.stripe.com/5kQ00df7BeQ68M47Xu9fW23",
    },
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
    stripeProductId: "prod_VInV5JgsOOBYsl",
    stripeUnitPriceId: "price_1UIBuA8dNREsB4xBPy2WFC92",
    stripeSecond10OffPriceId: "price_1UIs5b8dNREsB4xBPn1XjWuu",
    stripeTierPriceIds: {
      unit: "price_1UIBuA8dNREsB4xBPy2WFC92",
      second10Off: "price_1UIs5b8dNREsB4xBPn1XjWuu",
      third15Off: "price_1UTXKk8dNREsB4xBQaTPZe6h",
      bulk20Off: "price_1UTXKm8dNREsB4xBYeT8pzr2",
      bulk25Off: "price_1UTXKn8dNREsB4xBsY0Pg5dG",
      bulk30Off: "price_1UTXKo8dNREsB4xBoT8y0jKu",
    },
    stripePairUrls: {
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/eVqbIV9NhdM20fyfpW9fW0G",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/14AbIV7F9cHYaUc3He9fX0L",
      "rainbow-candy-cookie": "https://buy.stripe.com/fZufZbe3x37o0fyfpW9fX0N",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/00w6oB4sX7nEaUc5Pm9fX0O",
      "jumbo-christmas-cookie": "https://buy.stripe.com/5kQ8wJgbF23kaUc2Da9fX0P",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/14A8wJ2kPdM2bYg7Xu9fX0Q",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/9B65kx0cH7nE9Q8elS9fX0R",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/8x2fZb3oTdM27I0b9G9fX0S",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQfZb6B5dM2fasa5C9fX0T",
      "hot-pink-mm-cookie": "https://buy.stripe.com/aFa3cp0cHgYe0fya5C9fX0V",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJebIVbVpgYee6o6Tq9fX0U",
    },
    stripeTrioUrl: "https://buy.stripe.com/6oUeV7aRl5fw3rK4Li9fX01",
    stripeTrioUrls: {
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/6oUeV7aRl5fw3rK4Li9fX01",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/9B6bIV5x1cHYgew5Pm9fX2x",
      "rainbow-candy-cookie": "https://buy.stripe.com/cNifZbcZt0Zg8M47Xu9fX2A",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/3cIbIV9NhgYefas2Da9fX2z",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/fZu5kx6B55fw2nG7Xu9fX2C",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/aFa3cpe3xcHY3rKgu09fX2B",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/fZu9AN4sX0ZgaUca5C9fX2D",
      "jumbo-mm-cookie": "https://buy.stripe.com/00w5kxaRl37o6DW1z69fX2E",
      "hot-pink-mm-cookie": "https://buy.stripe.com/bJe6oB1gL23kgew2Da9fX2G",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/5kQ4gt3oTbDU5zS5Pm9fX2H",
      "jumbo-christmas-cookie": "https://buy.stripe.com/4gM9AN8JdgYe2nG7Xu9fX2V",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/6oU6oB5x10Zg3rK1z69fW24",
      "bulk25Off": "https://buy.stripe.com/fZu4gtaRlazQe6ofpW9fW25",
      "bulk30Off": "https://buy.stripe.com/fZueV75x18rI4vO1z69fW2a",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/bJefZbe3x9vM9Q8dhO9fW0c",
      "2": "https://buy.stripe.com/eVqbIV9NhdM20fyfpW9fW0G",
      "4": "https://buy.stripe.com/eVq28l6B5azQgewelS9fW22",
      "3": "https://buy.stripe.com/6oU6oB5x10Zg3rK1z69fW24",
      "7": "https://buy.stripe.com/6oU28l4sX6jA6DWa5C9fW26",
      "5": "https://buy.stripe.com/fZu4gtaRlazQe6ofpW9fW25",
      "8": "https://buy.stripe.com/14AaER6B50Zg5zS7Xu9fW27",
      "6": "https://buy.stripe.com/5kQ28l2kPcHYd2k1z69fW28",
      "9": "https://buy.stripe.com/aFafZbe3xbDUgew4Li9fW29",
      "10": "https://buy.stripe.com/fZueV75x18rI4vO1z69fW2a",
      "12": "https://buy.stripe.com/28E28l2kPfUa5zScdK9fW2b",
      "13": "https://buy.stripe.com/4gMcMZbVp23kbYggu09fW2c",
      "14": "https://buy.stripe.com/5kQ28l2kP8rI1jC4Li9fW2d",
      "11": "https://buy.stripe.com/7sY8wJ0cH6jAfascdK9fW2e",
      "17": "https://buy.stripe.com/bJe3cp6B5cHY4vO5Pm9fW2f",
      "16": "https://buy.stripe.com/7sYaER3oTdM20fygu09fW2h",
      "18": "https://buy.stripe.com/6oU28l9Nh37o6DW6Tq9fW2g",
      "20": "https://buy.stripe.com/6oU14h8JdeQ63rK91y9fW2j",
      "19": "https://buy.stripe.com/3cI8wJ3oT0ZgbYg7Xu9fW2i",
      "15": "https://buy.stripe.com/4gMaERcZtdM22nGgu09fW2p",
    },
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
    stripeProductId: "prod_VInVVIXb3NPwt0",
    stripeUnitPriceId: "price_1UIBuC8dNREsB4xBn3wpHOZO",
    stripeSecond10OffPriceId: "price_1UIs5c8dNREsB4xBvh6VC7vj",
    stripeTierPriceIds: {
      unit: "price_1UIBuC8dNREsB4xBn3wpHOZO",
      second10Off: "price_1UIs5c8dNREsB4xBvh6VC7vj",
      third15Off: "price_1UTXKq8dNREsB4xBj8KbWQGW",
      bulk20Off: "price_1UTXKr8dNREsB4xB1yt3tGWc",
      bulk25Off: "price_1UTXKs8dNREsB4xBUY0OMkSW",
      bulk30Off: "price_1UTXKu8dNREsB4xBRHtlHEZI",
    },
    stripePairUrls: {
      "jumbo-christmas-cookie": "https://buy.stripe.com/7sYdR3f7BdM28M42Da9fW0L",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/aFa6oB6B59vMfas6Tq9fX0W",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x2fZbf7B8rIbYgb9G9fX0X",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRmbIV9Nh8rIaUcb9G9fX0Y",
      "rainbow-candy-cookie": "https://buy.stripe.com/28E28l1gLeQ6bYgb9G9fX0Z",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/eVqfZb6B57nE0fy91y9fX10",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/28E5kx8Jd9vM2nG7Xu9fX11",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/aFaaERgbFfUa3rKdhO9fX12",
      "hot-pink-mm-cookie": "https://buy.stripe.com/aFa28l0cH5fwgew6Tq9fX13",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/cNi4gtcZtcHY7I03He9fX14",
      "jumbo-mm-cookie": "https://buy.stripe.com/fZu5kx1gL4bs5zS4Li9fX18",
    },
    stripeTrioUrl: "https://buy.stripe.com/4gM00d3oTgYe9Q80v29fX02",
    stripeTrioUrls: {
      "jumbo-christmas-cookie": "https://buy.stripe.com/4gM00d3oTgYe9Q80v29fX02",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x24gt9Nh7nEd2k3He9fX2F",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/dRm4gt8JdfUa3rKdhO9fX2I",
      "rainbow-candy-cookie": "https://buy.stripe.com/00w5kx7F9bDU7I00v29fX2J",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/3cI4gt7F9fUafas0v29fX2K",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/8x2dR30cHbDU7I0dhO9fX2L",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/8x25kxe3xgYe4vO6Tq9fX2M",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/eVqfZbaRl37o9Q86Tq9fX2N",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/bJe4gtf7B4bs0fyfpW9fX2O",
      "jumbo-mm-cookie": "https://buy.stripe.com/8x24gt5x15fw2nG0v29fX2P",
      "hot-pink-mm-cookie": "https://buy.stripe.com/cNifZb5x1azQbYggu09fX2U",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/bJe28l0cHeQ6aUca5C9fW2k",
      "bulk25Off": "https://buy.stripe.com/cNicMZ7F94bs1jC2Da9fW2m",
      "bulk30Off": "https://buy.stripe.com/dRm3cp7F94bse6odhO9fW2t",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/00waERe3xazQ8M41z69fW0e",
      "2": "https://buy.stripe.com/7sYdR3f7BdM28M42Da9fW0L",
      "3": "https://buy.stripe.com/bJe28l0cHeQ6aUca5C9fW2k",
      "4": "https://buy.stripe.com/bJe7sF4sXdM2fas7Xu9fW2l",
      "5": "https://buy.stripe.com/cNicMZ7F94bs1jC2Da9fW2m",
      "6": "https://buy.stripe.com/7sYcMZf7B8rI8M41z69fW2n",
      "9": "https://buy.stripe.com/bJedR30cHgYee6ob9G9fW2o",
      "8": "https://buy.stripe.com/7sYcMZf7B23kfaselS9fW2q",
      "7": "https://buy.stripe.com/7sYfZb1gLeQ66DW0v29fW2r",
      "11": "https://buy.stripe.com/9B63cp3oT6jA6DW1z69fW2s",
      "10": "https://buy.stripe.com/dRm3cp7F94bse6odhO9fW2t",
      "12": "https://buy.stripe.com/9B6aER4sX5fw5zSelS9fW2u",
      "13": "https://buy.stripe.com/9B66oB8Jd6jA9Q8elS9fW2v",
      "14": "https://buy.stripe.com/fZu14h5x18rIgew91y9fW2w",
      "16": "https://buy.stripe.com/cNi4gt3oTgYee6o4Li9fW2x",
      "19": "https://buy.stripe.com/9B6dR36B5azQbYgdhO9fW2y",
      "17": "https://buy.stripe.com/8x2cMZ7F9azQ7I0elS9fW2z",
      "15": "https://buy.stripe.com/fZueV7cZt23k0fyfpW9fW2A",
      "18": "https://buy.stripe.com/3cI7sF5x18rI7I06Tq9fW2B",
      "20": "https://buy.stripe.com/5kQ3cpaRlcHYe6o7Xu9fW2E",
    },
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
    stripeProductId: "prod_VInVIoE0t4agYj",
    stripeUnitPriceId: "price_1UIBuE8dNREsB4xBZ5sbwIL2",
    stripeSecond10OffPriceId: "price_1UIs5d8dNREsB4xBshDuVkkF",
    stripeTierPriceIds: {
      unit: "price_1UIBuE8dNREsB4xBZ5sbwIL2",
      second10Off: "price_1UIs5d8dNREsB4xBshDuVkkF",
      third15Off: "price_1UTXL38dNREsB4xBpnzoCb1S",
      bulk20Off: "price_1UTXL58dNREsB4xBj1JvJkfN",
      bulk25Off: "price_1UTXL68dNREsB4xBGA65T79l",
      bulk30Off: "price_1UTXL78dNREsB4xBwjpbBBav",
    },
    stripePairUrls: {
      "giant-peanut-butter-cookie": "https://buy.stripe.com/9B64gtbVp37ofas7Xu9fW0M",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x28wJaRlazQ4vO6Tq9fX15",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/3cIdR30cHgYe5zS3He9fX16",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/bJe6oB9Nh7nEd2k3He9fX17",
      "rainbow-candy-cookie": "https://buy.stripe.com/28E4gtgbF7nE1jC0v29fX19",
      "jumbo-christmas-cookie": "https://buy.stripe.com/28E5kx7F9fUa9Q8a5C9fX1a",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/bJeeV70cH7nE4vO4Li9fX1c",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/bJe6oBgbFazQ3rK91y9fX1b",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/6oU5kxf7B23kgew91y9fX1d",
      "hot-pink-mm-cookie": "https://buy.stripe.com/bJe7sFf7BeQ6e6o4Li9fX1e",
      "jumbo-mm-cookie": "https://buy.stripe.com/aFabIVf7B8rI3rKdhO9fX1g",
    },
    stripeTrioUrl: "https://buy.stripe.com/7sY8wJe3x6jA2nGb9G9fX03",
    stripeTrioUrls: {
      "giant-peanut-butter-cookie": "https://buy.stripe.com/7sY8wJe3x6jA2nGb9G9fX03",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/7sY3cp7F9azQ8M4b9G9fX2Q",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/5kQeV70cH23k6DWb9G9fX2R",
      "rainbow-candy-cookie": "https://buy.stripe.com/00wcMZe3x5fw0fy4Li9fX2S",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/5kQeV7f7BgYe9Q87Xu9fX2T",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/cNifZb8JdazQ3rKdhO9fX2W",
      "jumbo-christmas-cookie": "https://buy.stripe.com/4gM6oB1gLgYe7I091y9fX2X",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/eVqdR31gLbDU9Q8elS9fX2Y",
      "jumbo-mm-cookie": "https://buy.stripe.com/9B69AN2kPgYeaUc5Pm9fX2Z",
      "hot-pink-mm-cookie": "https://buy.stripe.com/9B600daRlcHY6DWelS9fX32",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/aFaeV7e3x6jA9Q85Pm9fX31",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/7sYaERbVp37oe6o91y9fW2C",
      "bulk25Off": "https://buy.stripe.com/14A6oBcZt4bs5zS3He9fW2F",
      "bulk30Off": "https://buy.stripe.com/6oUdR3bVpbDUbYgelS9fW2J",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/6oU7sFgbFbDU6DW91y9fW0g",
      "2": "https://buy.stripe.com/9B64gtbVp37ofas7Xu9fW0M",
      "3": "https://buy.stripe.com/7sYaERbVp37oe6o91y9fW2C",
      "6": "https://buy.stripe.com/6oU8wJ3oTazQgew5Pm9fW2D",
      "5": "https://buy.stripe.com/14A6oBcZt4bs5zS3He9fW2F",
      "7": "https://buy.stripe.com/fZu7sF7F9dM27I091y9fW2G",
      "9": "https://buy.stripe.com/aFacMZaRlazQe6o91y9fW2H",
      "10": "https://buy.stripe.com/6oUdR3bVpbDUbYgelS9fW2J",
      "8": "https://buy.stripe.com/4gM6oBe3x8rIfas1z69fW2I",
      "12": "https://buy.stripe.com/cNi8wJe3x7nEfascdK9fW2K",
      "11": "https://buy.stripe.com/6oU5kx1gLcHY3rKcdK9fW2L",
      "13": "https://buy.stripe.com/3cIbIV4sXeQ66DW2Da9fW2M",
      "14": "https://buy.stripe.com/28E14h7F9gYed2kfpW9fW2N",
      "15": "https://buy.stripe.com/6oU3cpf7BcHY9Q82Da9fW2O",
      "16": "https://buy.stripe.com/aFa6oB2kPcHYfas6Tq9fW2P",
      "17": "https://buy.stripe.com/6oU28l4sX4bsbYg0v29fW2Q",
      "19": "https://buy.stripe.com/7sY7sFaRl37o5zS6Tq9fW2S",
      "18": "https://buy.stripe.com/4gMfZb4sX9vM9Q80v29fW2R",
      "4": "https://buy.stripe.com/14AeV76B5gYe4vO2Da9fW2V",
      "20": "https://buy.stripe.com/6oU8wJ4sXbDUd2ka5C9fW2T",
    },
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
    stripeProductId: "prod_VInVAztIr2Mo7D",
    stripeUnitPriceId: "price_1UIBuG8dNREsB4xBp4640Aby",
    stripeSecond10OffPriceId: "price_1UIs5e8dNREsB4xBBcGskFlB",
    stripeTierPriceIds: {
      unit: "price_1UIBuG8dNREsB4xBp4640Aby",
      second10Off: "price_1UIs5e8dNREsB4xBBcGskFlB",
      third15Off: "price_1UTXL88dNREsB4xBp7E8OBdv",
      bulk20Off: "price_1UTXL98dNREsB4xBQp21PRSB",
      bulk25Off: "price_1UTXLA8dNREsB4xBtRc9hjGZ",
      bulk30Off: "price_1UTXLC8dNREsB4xB16ML906I",
    },
    stripePairUrls: {
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B628lgbF0Zgd2kcdK9fW0N",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/aFafZb7F9fUaaUc2Da9fX1f",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/cNi3cp1gLcHY8M491y9fX1h",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/eVq6oB5x1gYe8M47Xu9fX1j",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/14AcMZ3oTdM20fy2Da9fX1i",
      "jumbo-christmas-cookie": "https://buy.stripe.com/6oU7sF5x123k7I04Li9fX1k",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/fZu9ANf7BazQgewelS9fX1l",
      "rainbow-candy-cookie": "https://buy.stripe.com/9B66oB8Jd0Zg1jCfpW9fX1m",
      "jumbo-mm-cookie": "https://buy.stripe.com/4gM6oB7F96jA8M44Li9fX1n",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/cNiaERe3xazQfas0v29fX1o",
      "hot-pink-mm-cookie": "https://buy.stripe.com/dRm00d1gL5fwd2ka5C9fX1p",
    },
    stripeTrioUrl: "https://buy.stripe.com/8x2eV76B5fUa4vOa5C9fX04",
    stripeTrioUrls: {
      "giant-double-chocolate-cookie": "https://buy.stripe.com/8x2eV76B5fUa4vOa5C9fX04",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oUeV76B5eQ68M491y9fX30",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/8x2aERaRl7nEgew1z69fX33",
      "rainbow-candy-cookie": "https://buy.stripe.com/9B66oBbVp4bs5zS91y9fX34",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gMbIV3oTcHY4vOcdK9fX35",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/9B628lbVpdM2bYgdhO9fX36",
      "jumbo-christmas-cookie": "https://buy.stripe.com/7sY28l2kPfUagew4Li9fX37",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/cNi4gt3oTazQ9Q87Xu9fX38",
      "jumbo-mm-cookie": "https://buy.stripe.com/dRm6oB1gL23kfas91y9fX39",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/4gMaER9Nh0Zg9Q82Da9fX3a",
      "hot-pink-mm-cookie": "https://buy.stripe.com/14A6oB1gLfUa2nG91y9fX3b",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/6oUeV71gLbDUgew2Da9fW3b",
      "bulk25Off": "https://buy.stripe.com/14A4gte3x6jA8M47Xu9fW2W",
      "bulk30Off": "https://buy.stripe.com/9B64gt1gL37o9Q80v29fW35",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/3cIeV7f7B37o2nG91y9fW0i",
      "2": "https://buy.stripe.com/9B628lgbF0Zgd2kcdK9fW0N",
      "4": "https://buy.stripe.com/aFa7sFaRl9vMd2k2Da9fW2U",
      "5": "https://buy.stripe.com/14A4gte3x6jA8M47Xu9fW2W",
      "6": "https://buy.stripe.com/4gMcMZf7B5fw8M46Tq9fW2X",
      "7": "https://buy.stripe.com/5kQ8wJbVpgYe5zSfpW9fW2Y",
      "8": "https://buy.stripe.com/28E6oB7F9eQ61jC4Li9fW2Z",
      "9": "https://buy.stripe.com/7sY7sFaRldM2e6ob9G9fW30",
      "12": "https://buy.stripe.com/7sY7sF8Jd7nEgew3He9fW31",
      "11": "https://buy.stripe.com/bJe5kx8Jd5fw5zS6Tq9fW32",
      "14": "https://buy.stripe.com/3cI4gtcZteQ65zS0v29fW33",
      "13": "https://buy.stripe.com/fZudR3gbF4bs1jCfpW9fW34",
      "10": "https://buy.stripe.com/9B64gt1gL37o9Q80v29fW35",
      "17": "https://buy.stripe.com/bJeaERf7B5fw2nG1z69fW37",
      "15": "https://buy.stripe.com/8x2aER5x1bDU8M4gu09fW36",
      "16": "https://buy.stripe.com/6oU4gtbVpfUa1jCcdK9fW38",
      "18": "https://buy.stripe.com/bJe4gt5x1eQ63rKelS9fW39",
      "3": "https://buy.stripe.com/6oUeV71gLbDUgew2Da9fW3b",
      "19": "https://buy.stripe.com/28EaERbVpbDU1jC4Li9fW3a",
      "20": "https://buy.stripe.com/bJedR31gL6jAd2k7Xu9fW3d",
    },
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
    stripeProductId: "prod_VInVDITITvdjRz",
    stripeUnitPriceId: "price_1UIBuI8dNREsB4xBGkiyAYnR",
    stripeSecond10OffPriceId: "price_1UIs5f8dNREsB4xB7tAbAeJU",
    stripeTierPriceIds: {
      unit: "price_1UIBuI8dNREsB4xBGkiyAYnR",
      second10Off: "price_1UIs5f8dNREsB4xB7tAbAeJU",
      third15Off: "price_1UTXLD8dNREsB4xBdSBxMHVT",
      bulk20Off: "price_1UTXLF8dNREsB4xBxsVELwiF",
      bulk25Off: "price_1UTXLF8dNREsB4xBg1GZCLWg",
      bulk30Off: "price_1UTXLH8dNREsB4xBAGIGbuP7",
    },
    stripePairUrls: {
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/9B614h6B50Zg7I01z69fW0O",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/dRmaER2kPgYee6o5Pm9fX1q",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/28E9ANgbF7nE0fy2Da9fX1r",
      "rainbow-candy-cookie": "https://buy.stripe.com/3cI6oBe3x9vMfasgu09fX1s",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/bJe5kx0cH0Zge6o1z69fX1t",
      "jumbo-christmas-cookie": "https://buy.stripe.com/14A5kxe3x9vM9Q8b9G9fX1u",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/4gM28l3oT23kd2ka5C9fX1v",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/7sY5kx1gLcHY8M47Xu9fX1w",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/fZubIV1gL37o7I04Li9fX1x",
      "jumbo-mm-cookie": "https://buy.stripe.com/5kQ3cp1gL0Zg3rKgu09fX1y",
      "hot-pink-mm-cookie": "https://buy.stripe.com/28E9AN7F9gYe8M43He9fX1z",
    },
    stripeTrioUrl: "https://buy.stripe.com/cNi00d2kPeQ67I01z69fX07",
    stripeTrioUrls: {
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/cNi00d2kPeQ67I01z69fX07",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/5kQ5kx4sXbDU2nGb9G9fX3c",
      "rainbow-candy-cookie": "https://buy.stripe.com/4gM3cpaRldM26DWdhO9fX3d",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/cNi6oB0cH0Zg7I0cdK9fX3e",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/14A14hbVpdM2d2kfpW9fX3f",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/eVqeV72kP7nEbYg91y9fX3g",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/4gM6oBe3x23k3rKdhO9fX3h",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/28E00d7F9fUabYg0v29fX3i",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJecMZaRl23k2nGfpW9fX3j",
      "jumbo-christmas-cookie": "https://buy.stripe.com/00waERgbF8rIbYg3He9fX3l",
      "hot-pink-mm-cookie": "https://buy.stripe.com/00weV70cHazQ4vOgu09fX3n",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/3cI8wJbVpbDUgewdhO9fW3c",
      "bulk25Off": "https://buy.stripe.com/4gMbIVcZteQ6e6o91y9fW3l",
      "bulk30Off": "https://buy.stripe.com/bJefZb6B54bs9Q82Da9fW3k",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/00wcMZ1gL6jA1jC5Pm9fW0k",
      "2": "https://buy.stripe.com/9B614h6B50Zg7I01z69fW0O",
      "3": "https://buy.stripe.com/3cI8wJbVpbDUgewdhO9fW3c",
      "6": "https://buy.stripe.com/aFaeV7bVpfUagew4Li9fW3e",
      "7": "https://buy.stripe.com/3cI5kx6B5gYee6o5Pm9fW3f",
      "4": "https://buy.stripe.com/9B66oB8Jd8rI6DW2Da9fW3g",
      "8": "https://buy.stripe.com/fZu5kxf7B5fw5zSelS9fW3h",
      "9": "https://buy.stripe.com/7sY28l0cH7nE4vO6Tq9fW3i",
      "12": "https://buy.stripe.com/28E9AN0cH4bs3rK91y9fW3j",
      "5": "https://buy.stripe.com/4gMbIVcZteQ6e6o91y9fW3l",
      "10": "https://buy.stripe.com/bJefZb6B54bs9Q82Da9fW3k",
      "13": "https://buy.stripe.com/fZu00d0cH23k9Q891y9fW3n",
      "15": "https://buy.stripe.com/28E4gt8JdgYegew5Pm9fW3o",
      "11": "https://buy.stripe.com/5kQcMZ9NhfUae6o0v29fW3m",
      "16": "https://buy.stripe.com/aFa4gtgbF7nE9Q8a5C9fW3p",
      "14": "https://buy.stripe.com/9B6dR36B5azQbYg1z69fW3q",
      "17": "https://buy.stripe.com/aFacMZ5x1eQ60fy6Tq9fW3r",
      "18": "https://buy.stripe.com/14AbIVf7BeQ61jCdhO9fW3s",
      "19": "https://buy.stripe.com/dRm28le3x4bs5zSfpW9fW3t",
      "20": "https://buy.stripe.com/9B614h6B537oe6o6Tq9fW3z",
    },
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
    stripeUpsellUrl: "https://buy.stripe.com/aFa6oBe3xfUa5zS91y9fW0P",
    stripeProductId: "prod_VInV2orrtkSQHB",
    stripeUnitPriceId: "price_1UIBuK8dNREsB4xBpRTIIqyJ",
    stripeSecond10OffPriceId: "price_1UIs5g8dNREsB4xBXOFeeVQA",
    stripeTierPriceIds: {
      unit: "price_1UIBuK8dNREsB4xBpRTIIqyJ",
      second10Off: "price_1UIs5g8dNREsB4xBXOFeeVQA",
      third15Off: "price_1UTXLI8dNREsB4xBQ7vz6QxM",
      bulk20Off: "price_1UTXLJ8dNREsB4xBEOqI4f0P",
      bulk25Off: "price_1UTXLK8dNREsB4xBX8kKmvSI",
      bulk30Off: "price_1UTXLL8dNREsB4xBUdq4i5Qx",
    },
    stripePairUrls: {
      "jumbo-mm-cookie": "https://buy.stripe.com/aFa6oBe3xfUa5zS91y9fW0P",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/14A9AN1gL6jAd2k1z69fX1A",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU8wJ9Nh6jA2nG3He9fX1B",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/6oU8wJ2kP6jAd2kcdK9fX1C",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/14A3cp6B57nE2nG2Da9fX1D",
      "jumbo-christmas-cookie": "https://buy.stripe.com/3cI28lbVp5fwfas2Da9fX1E",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/9B65kx2kP23k2nG1z69fX1F",
      "hot-pink-mm-cookie": "https://buy.stripe.com/14A00d3oT7nEgewelS9fX1H",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B67sF8JdgYee6o0v29fX1G",
      "rainbow-candy-cookie": "https://buy.stripe.com/7sYfZb8Jd23k9Q81z69fX1I",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/4gM8wJ2kPazQfasgu09fX1K",
    },
    stripeTrioUrl: "https://buy.stripe.com/bJe3cpcZtdM2e6o7Xu9fX05",
    stripeTrioUrls: {
      "jumbo-mm-cookie": "https://buy.stripe.com/bJe3cpcZtdM2e6o7Xu9fX05",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/14A14hf7B7nE2nG1z69fX3k",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/dRmcMZ9Nh37o8M4cdK9fX3m",
      "rainbow-candy-cookie": "https://buy.stripe.com/28EaER0cH4bs5zS1z69fX3o",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/28EfZbaRl5fwbYgfpW9fX3p",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/aFa5kx2kPfUagew6Tq9fX3q",
      "jumbo-christmas-cookie": "https://buy.stripe.com/eVq28l1gL5fw9Q80v29fX3r",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/4gMeV7e3xfUa5zS7Xu9fX3s",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/9B69AN3oT6jA4vO7Xu9fX3t",
      "hot-pink-mm-cookie": "https://buy.stripe.com/3cIeV73oTeQ6aUc2Da9fX3u",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/8x228l4sX4bs2nG7Xu9fX3w",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/eVq4gt5x17nEe6o2Da9fW3G",
      "bulk25Off": "https://buy.stripe.com/cNidR3cZt4bs1jC6Tq9fW3v",
      "bulk30Off": "https://buy.stripe.com/28E9ANe3x6jA5zS4Li9fW3B",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/cNidR3cZt5fwbYg0v29fW0m",
      "2": "https://buy.stripe.com/aFa6oBe3xfUa5zS91y9fW0P",
      "4": "https://buy.stripe.com/4gM5kx3oT5fw8M41z69fW3u",
      "5": "https://buy.stripe.com/cNidR3cZt4bs1jC6Tq9fW3v",
      "7": "https://buy.stripe.com/7sYcMZaRl7nE6DW1z69fW3x",
      "6": "https://buy.stripe.com/9B6dR36B5azQ3rKdhO9fW3w",
      "8": "https://buy.stripe.com/00w7sFbVp7nEd2ka5C9fW3y",
      "9": "https://buy.stripe.com/7sYeV7e3xeQ60fy6Tq9fW3A",
      "10": "https://buy.stripe.com/28E9ANe3x6jA5zS4Li9fW3B",
      "11": "https://buy.stripe.com/fZubIV5x123k5zS7Xu9fW3C",
      "12": "https://buy.stripe.com/14AeV7aRl7nE3rK3He9fW3D",
      "13": "https://buy.stripe.com/eVq14h8JdfUa8M42Da9fW3E",
      "14": "https://buy.stripe.com/9B63cp8Jd9vM1jC1z69fW3F",
      "16": "https://buy.stripe.com/4gM00d2kP7nE1jC5Pm9fW3H",
      "3": "https://buy.stripe.com/eVq4gt5x17nEe6o2Da9fW3G",
      "15": "https://buy.stripe.com/dRmdR32kPfUa4vOdhO9fW3I",
      "18": "https://buy.stripe.com/fZufZb4sX9vM8M42Da9fW3J",
      "17": "https://buy.stripe.com/5kQ28l3oT6jA3rKcdK9fW3K",
      "19": "https://buy.stripe.com/eVq28l3oT37o8M43He9fW3L",
      "20": "https://buy.stripe.com/00wcMZ0cHbDU1jC6Tq9fW3O",
    },
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
    stripeProductId: "prod_VInVfyjuGE81ol",
    stripeUnitPriceId: "price_1UIBuM8dNREsB4xBUYv9o4uL",
    stripeSecond10OffPriceId: "price_1UIs5g8dNREsB4xBhDA0yXs5",
    stripeTierPriceIds: {
      unit: "price_1UIBuM8dNREsB4xBUYv9o4uL",
      second10Off: "price_1UIs5g8dNREsB4xBhDA0yXs5",
      third15Off: "price_1UTXLM8dNREsB4xB5sbvE1ol",
      bulk20Off: "price_1UTXLO8dNREsB4xBpWZAvZyz",
      bulk25Off: "price_1UTXLP8dNREsB4xByAL1zzY2",
      bulk30Off: "price_1UTXLS8dNREsB4xBJ9bd9V73",
    },
    stripePairUrls: {
      "hot-pink-mm-cookie": "https://buy.stripe.com/3cI9AN7F98rIbYg0v29fW0Q",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/14AbIV6B54bs2nGb9G9fX1J",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/28E8wJf7BdM2bYg4Li9fX1L",
      "rainbow-candy-cookie": "https://buy.stripe.com/eVq6oBcZtbDUd2kdhO9fX1M",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/8x228l9Nh5fwfasdhO9fX1N",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/00w28l8Jd9vMe6odhO9fX1O",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/eVq8wJ3oT5fwfas1z69fX1P",
      "jumbo-mm-cookie": "https://buy.stripe.com/14AbIV9Nh5fw2nG91y9fX1R",
      "jumbo-christmas-cookie": "https://buy.stripe.com/aFa5kx0cHdM24vOa5C9fX1Q",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/3cI6oB2kPeQ69Q891y9fX1S",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/4gM3cp6B5bDU4vO4Li9fX1T",
    },
    stripeTrioUrl: "https://buy.stripe.com/6oU00d3oTfUa7I05Pm9fX06",
    stripeTrioUrls: {
      "hot-pink-mm-cookie": "https://buy.stripe.com/6oU00d3oTfUa7I05Pm9fX06",
      "jumbo-chocolate-chip-cookie": "https://buy.stripe.com/4gMdR31gLgYegewcdK9fX3v",
      "jumbo-white-chocolate-chip-cookie": "https://buy.stripe.com/cNi8wJf7B6jA4vO5Pm9fX3x",
      "mini-jumbo-chocolate-chip-cookie": "https://buy.stripe.com/3cI00d6B523k5zS6Tq9fX3y",
      "rainbow-candy-cookie": "https://buy.stripe.com/dRmdR3gbF6jAe6odhO9fX3z",
      "jumbo-pastel-mm-cookie": "https://buy.stripe.com/dRm9AN1gLcHY4vO6Tq9fX3A",
      "jumbo-christmas-cookie": "https://buy.stripe.com/cNieV73oT6jAbYg2Da9fX3B",
      "cookie-ice-cream-sandwich": "https://buy.stripe.com/8x28wJ7F937obYgb9G9fX3C",
      "giant-peanut-butter-cookie": "https://buy.stripe.com/5kQ14h4sX4bs3rK6Tq9fX3D",
      "jumbo-mm-cookie": "https://buy.stripe.com/bJe8wJ4sXbDU7I02Da9fX3E",
      "giant-double-chocolate-cookie": "https://buy.stripe.com/fZu5kx8Jd6jA1jCdhO9fX3F",
    },
    stripeBulkTierUrls: {
      "bulk20Off": "https://buy.stripe.com/eVq5kxgbFgYe0fy7Xu9fW3Q",
      "bulk25Off": "https://buy.stripe.com/eVqeV7f7BdM2bYgcdK9fW3N",
      "bulk30Off": "https://buy.stripe.com/bJeeV7gbFdM22nG1z69fW3Y",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/4gMfZb2kPgYefas4Li9fW0o",
      "2": "https://buy.stripe.com/3cI9AN7F98rIbYg0v29fW0Q",
      "4": "https://buy.stripe.com/aFa9ANbVp0Zg3rK0v29fW3M",
      "5": "https://buy.stripe.com/eVqeV7f7BdM2bYgcdK9fW3N",
      "7": "https://buy.stripe.com/5kQeV73oT8rIe6o91y9fW3R",
      "6": "https://buy.stripe.com/5kQ28lbVp8rId2kfpW9fW3P",
      "11": "https://buy.stripe.com/4gM4gte3x0Zg9Q84Li9fW3S",
      "3": "https://buy.stripe.com/eVq5kxgbFgYe0fy7Xu9fW3Q",
      "9": "https://buy.stripe.com/aFabIV3oT0Zge6oa5C9fW3U",
      "8": "https://buy.stripe.com/bJe14he3x7nEbYgcdK9fW3T",
      "12": "https://buy.stripe.com/14A7sF4sXdM21jCelS9fW3V",
      "13": "https://buy.stripe.com/fZu00d9NhfUagew91y9fW3W",
      "14": "https://buy.stripe.com/7sYdR3cZtazQ2nGb9G9fW3X",
      "10": "https://buy.stripe.com/bJeeV7gbFdM22nG1z69fW3Y",
      "15": "https://buy.stripe.com/28E6oB1gL6jA9Q84Li9fW3Z",
      "16": "https://buy.stripe.com/14AfZb4sX5fw5zSelS9fW40",
      "17": "https://buy.stripe.com/28EaERe3x23k1jCb9G9fW41",
      "19": "https://buy.stripe.com/3cI9AN6B5dM2fascdK9fW42",
      "20": "https://buy.stripe.com/14A14hcZt6jA7I02Da9fW43",
      "18": "https://buy.stripe.com/bJeeV73oT6jAd2kb9G9fW44",
    },
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
