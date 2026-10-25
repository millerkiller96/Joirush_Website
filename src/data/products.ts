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
  /** Full price, used for orders of 1 to 3 cookies. */
  unit?: string;
  /** 10% off price, used for every cookie in orders of 4 or more. */
  buy4TenOff?: string;
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
  stripeBuy4PriceId: string;
  stripeTierPriceIds?: StripeTierPriceIds;
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
  id: "buy4_10off";
  label: string;
  shortLabel: string;
  discountPercent: number;
  minQty: number;
  maxQty: number;
  description: string;
};

/** The one multi cookie offer: buy 4 or more cookies and get 10% off each cookie. */
export const BULK_PRICING_TIERS: BulkPricingTierInfo[] = [
  {
    id: "buy4_10off",
    label: "Buy 4 or more cookies and get 10% off each cookie",
    shortLabel: "4 or more cookies (10% off each)",
    discountPercent: 10,
    minQty: 4,
    maxQty: 20,
    description: "10% off each cookie when you buy 4 or more",
  },
];

export const BULK_PRICING_SUMMARY_BULLET =
  "Buy 4 or more cookies and get 10% off each cookie. Mix and match any flavors.";

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
    name: "Jumbo Chocolate Chip Cookie Wall Art | JOIRUSH",
    shortName: "Classic Chocolate Chip",
    price: 80,
    compareAtPrice: 100,
    size: "16 × 16 in",
    category: "classic",
    featured: true,
    image: "/images/products/choc-chip.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831819997/jumbo-chocolate-chip-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/28E9ANbVpfUa1jC4Li9fX3Y",
    stripeUpsellUrl: "https://buy.stripe.com/14AbIV4sXbDUaUcgu09fZ3h",
    stripeProductId: "prod_VInUXaAP2bjrGc",
    stripeUnitPriceId: "price_1UU8xh8dNREsB4xBwDr1quJh",
    stripeBuy4PriceId: "price_1UU8xp8dNREsB4xBJc3JWiNQ",
    stripeTierPriceIds: {
      unit: "price_1UU8xh8dNREsB4xBwDr1quJh",
      buy4TenOff: "price_1UU8xp8dNREsB4xBJc3JWiNQ",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/28E9ANbVpfUa1jC4Li9fX3Y",
      "2": "https://buy.stripe.com/14AbIV4sXbDUaUcgu09fZ3h",
      "3": "https://buy.stripe.com/dRm00d0cHcHY6DW6Tq9fZ3i",
      "4": "https://buy.stripe.com/fZu7sF2kPdM21jCdhO9fZ3j",
      "5": "https://buy.stripe.com/fZu4gt5x123kbYg91y9fZ3k",
      "6": "https://buy.stripe.com/8x25kx1gL8rIe6o3He9fZ3l",
      "7": "https://buy.stripe.com/3cI28l9NheQ6fas7Xu9fZ3m",
      "8": "https://buy.stripe.com/3cI4gt1gL23k8M491y9fZ3n",
      "9": "https://buy.stripe.com/14A9AN8JdeQ64vO3He9fZ3o",
      "10": "https://buy.stripe.com/cNi7sF2kP6jA2nGcdK9fZ3p",
      "11": "https://buy.stripe.com/00wbIVbVp4bsd2kelS9fZ3q",
      "12": "https://buy.stripe.com/00wdR3aRl7nEe6o3He9fZ3r",
      "13": "https://buy.stripe.com/9B63cp7F90ZgaUc91y9fZ3s",
      "14": "https://buy.stripe.com/eVq28le3xbDU7I02Da9fZ3t",
      "15": "https://buy.stripe.com/5kQ28lbVp4bs1jC91y9fZ3u",
      "16": "https://buy.stripe.com/28E9AN4sX37o5zS6Tq9fZ3v",
      "17": "https://buy.stripe.com/4gM14hcZtcHY4vO4Li9fZ3w",
      "18": "https://buy.stripe.com/fZu14h4sXgYe9Q891y9fZ3x",
      "19": "https://buy.stripe.com/6oU3cp8JdeQ61jC91y9fZ3y",
      "20": "https://buy.stripe.com/fZu6oB7F99vM5zSdhO9fZ3z",
    },
    upsellPairPrice: 160,
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
    name: "White Chocolate Chip Cookie Wall Art | JOIRUSH",
    shortName: "White Chocolate Chip",
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "classic",
    featured: true,
    image: "/images/products/white-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452647836/jumbo-white-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/7sY3cpcZt8rIfas5Pm9fY0p",
    stripeUpsellUrl: "https://buy.stripe.com/00wfZb6B50Zg2nG7Xu9fZ3A",
    stripeProductId: "prod_VInVwq4gwbHX7W",
    stripeUnitPriceId: "price_1UU8xx8dNREsB4xBdv9ykU9Z",
    stripeBuy4PriceId: "price_1UU8y08dNREsB4xBK3U75Wx5",
    stripeTierPriceIds: {
      unit: "price_1UU8xx8dNREsB4xBdv9ykU9Z",
      buy4TenOff: "price_1UU8y08dNREsB4xBK3U75Wx5",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/7sY3cpcZt8rIfas5Pm9fY0p",
      "2": "https://buy.stripe.com/00wfZb6B50Zg2nG7Xu9fZ3A",
      "3": "https://buy.stripe.com/5kQ3cp6B55fw9Q8fpW9fZ3B",
      "4": "https://buy.stripe.com/7sYbIVf7BeQ63rKfpW9fZ3C",
      "5": "https://buy.stripe.com/7sY4gtf7B9vM6DWelS9fZ3D",
      "6": "https://buy.stripe.com/fZuaERbVp7nE1jC91y9fZ3E",
      "7": "https://buy.stripe.com/00w14h2kPeQ67I0elS9fZ3F",
      "8": "https://buy.stripe.com/4gM6oB7F937o5zS7Xu9fZ3G",
      "9": "https://buy.stripe.com/5kQfZbe3x9vMbYgelS9fZ3H",
      "10": "https://buy.stripe.com/8x228l3oT0Zg8M491y9fZ3I",
      "11": "https://buy.stripe.com/eVq7sF8JddM28M4b9G9fZ3J",
      "12": "https://buy.stripe.com/aFabIV1gLazQaUc2Da9fZ3K",
      "13": "https://buy.stripe.com/4gMcMZ4sXdM27I05Pm9fZ3L",
      "14": "https://buy.stripe.com/aFafZbgbF37o3rK3He9fZ3M",
      "15": "https://buy.stripe.com/5kQ14hf7BcHY7I03He9fZ3N",
      "16": "https://buy.stripe.com/eVqdR37F97nE0fy6Tq9fZ3O",
      "17": "https://buy.stripe.com/fZu9ANcZt0Zg0fygu09fZ3P",
      "18": "https://buy.stripe.com/cNi28lgbF5fw7I0fpW9fZ3Q",
      "19": "https://buy.stripe.com/bJe3cpe3xeQ6d2kdhO9fZ3R",
      "20": "https://buy.stripe.com/7sY14h4sX5fw0fy5Pm9fZ3S",
    },
    upsellPairPrice: 160,
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
    name: "Rainbow Candy Cookie Wall Art | JOIRUSH",
    shortName: "Rainbow Candy Cookie",
    price: 70,
    compareAtPrice: 90,
    size: "14 in",
    category: "candy",
    featured: true,
    image: "/images/products/rainbow.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452645632/colorful-candy-cookie-wall-decor",
    stripeUrl: "https://buy.stripe.com/28E9AN7F9gYee6o91y9fY0Y",
    stripeUpsellUrl: "https://buy.stripe.com/5kQbIV6B58rI3rKgu09fZ3T",
    stripeProductId: "prod_VInVAr2A30To1r",
    stripeUnitPriceId: "price_1UU8yE8dNREsB4xB04SONHcj",
    stripeBuy4PriceId: "price_1UU8yG8dNREsB4xBgeiheHYM",
    stripeTierPriceIds: {
      unit: "price_1UU8yE8dNREsB4xB04SONHcj",
      buy4TenOff: "price_1UU8yG8dNREsB4xBgeiheHYM",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/28E9AN7F9gYee6o91y9fY0Y",
      "2": "https://buy.stripe.com/5kQbIV6B58rI3rKgu09fZ3T",
      "3": "https://buy.stripe.com/fZu5kx6B5azQbYgelS9fZ3U",
      "4": "https://buy.stripe.com/6oUcMZ1gLbDUd2k6Tq9fZ3V",
      "5": "https://buy.stripe.com/5kQdR30cH9vMe6o91y9fZ3W",
      "6": "https://buy.stripe.com/fZu8wJ5x123k6DWdhO9fZ3X",
      "7": "https://buy.stripe.com/3cI3cp9NhcHY8M4fpW9fZ3Y",
      "8": "https://buy.stripe.com/3cIbIVe3x9vMbYga5C9fZ3Z",
      "9": "https://buy.stripe.com/4gMdR31gL23k7I01z69fZ40",
      "10": "https://buy.stripe.com/3cI9AN4sXeQ61jCelS9fZ41",
      "11": "https://buy.stripe.com/4gMbIV1gL5fw0fy6Tq9fZ42",
      "12": "https://buy.stripe.com/bJe7sFcZteQ61jCgu09fZ43",
      "13": "https://buy.stripe.com/28EcMZ4sX37o5zS91y9fZ44",
      "14": "https://buy.stripe.com/eVqeV78Jd0Zg3rK0v29fZ45",
      "15": "https://buy.stripe.com/aFa4gte3x0ZgaUc3He9fZ46",
      "16": "https://buy.stripe.com/5kQbIVaRl8rI2nGdhO9fZ47",
      "17": "https://buy.stripe.com/3cI9ANcZt4bs3rK1z69g000",
      "18": "https://buy.stripe.com/6oUfZbaRl9vMd2k91y9g001",
      "19": "https://buy.stripe.com/cNi9ANf7BbDU1jCcdK9g002",
      "20": "https://buy.stripe.com/8x24gtgbFbDU7I0fpW9g003",
    },
    upsellPairPrice: 140,
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
    name: "Mini Chocolate Chip Cookie Wall Art | JOIRUSH",
    shortName: "Mini Jumbo Chip",
    price: 70,
    compareAtPrice: 90,
    size: "Mini jumbo",
    category: "classic",
    image: "/images/products/mini-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452643820/mini-jumbo-chocolate-chip-cookie-wall",
    stripeUrl: "https://buy.stripe.com/fZu5kx7F94bs7I03He9fY1x",
    stripeUpsellUrl: "https://buy.stripe.com/7sY14hbVp9vM1jC1z69g004",
    stripeProductId: "prod_VInVMu4LI8B4Yp",
    stripeUnitPriceId: "price_1UU8yP8dNREsB4xBpIku2IOL",
    stripeBuy4PriceId: "price_1UU8yR8dNREsB4xB1kKV9HQy",
    stripeTierPriceIds: {
      unit: "price_1UU8yP8dNREsB4xBpIku2IOL",
      buy4TenOff: "price_1UU8yR8dNREsB4xB1kKV9HQy",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/fZu5kx7F94bs7I03He9fY1x",
      "2": "https://buy.stripe.com/7sY14hbVp9vM1jC1z69g004",
      "3": "https://buy.stripe.com/00wdR33oTazQfas3He9g005",
      "4": "https://buy.stripe.com/00wbIV6B58rIfasfpW9g006",
      "5": "https://buy.stripe.com/7sYbIV3oT6jAe6oelS9g007",
      "6": "https://buy.stripe.com/aFa6oBgbF4bsaUc1z69g008",
      "7": "https://buy.stripe.com/cNi9ANbVp8rI7I0gu09g009",
      "8": "https://buy.stripe.com/5kQ6oB7F9cHY6DW5Pm9g00a",
      "9": "https://buy.stripe.com/4gMbIVe3xdM24vO7Xu9g00b",
      "10": "https://buy.stripe.com/bJe28lf7BdM23rKdhO9g00c",
      "11": "https://buy.stripe.com/cNi9ANbVpbDUfas91y9g00d",
      "12": "https://buy.stripe.com/00wbIVgbF8rIfasa5C9g00e",
      "13": "https://buy.stripe.com/fZu9AN7F98rI5zS5Pm9g00f",
      "14": "https://buy.stripe.com/4gM5kx5x14bs6DW5Pm9g00g",
      "15": "https://buy.stripe.com/28EaER4sX4bs7I0a5C9g00h",
      "16": "https://buy.stripe.com/28EcMZ0cHcHY1jC3He9g00i",
      "17": "https://buy.stripe.com/4gM8wJ7F9azQ0fycdK9g00j",
      "18": "https://buy.stripe.com/28E4gte3x9vMfasfpW9g00k",
      "19": "https://buy.stripe.com/dRmfZb8JdazQ1jCcdK9g00l",
      "20": "https://buy.stripe.com/7sYbIV5x1bDUd2kfpW9g00m",
    },
    upsellPairPrice: 140,
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
    name: "Pastel M&M Cookie Wall Art | JOIRUSH",
    shortName: "Pastel M&M Cookie",
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    image: "/images/products/pastel-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/4452635945/jumbo-pastel-mm-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/5kQ14h2kPgYe8M42Da9fY26",
    stripeUpsellUrl: "https://buy.stripe.com/fZu4gt7F937o4vOdhO9g00n",
    stripeProductId: "prod_VInV5JgsOOBYsl",
    stripeUnitPriceId: "price_1UU8yg8dNREsB4xB3W2nTPZZ",
    stripeBuy4PriceId: "price_1UU8yi8dNREsB4xBlhmFJWWG",
    stripeTierPriceIds: {
      unit: "price_1UU8yg8dNREsB4xB3W2nTPZZ",
      buy4TenOff: "price_1UU8yi8dNREsB4xBlhmFJWWG",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/5kQ14h2kPgYe8M42Da9fY26",
      "2": "https://buy.stripe.com/fZu4gt7F937o4vOdhO9g00n",
      "3": "https://buy.stripe.com/cNi28lgbFdM25zS5Pm9g00o",
      "4": "https://buy.stripe.com/14A28lgbFeQ62nG91y9g00p",
      "5": "https://buy.stripe.com/bJeaER5x16jA6DW91y9g00q",
      "6": "https://buy.stripe.com/8x2dR32kP8rI1jC2Da9g00r",
      "7": "https://buy.stripe.com/9B628l5x1fUa2nGcdK9g00s",
      "8": "https://buy.stripe.com/bJe5kx7F99vMe6o0v29g00t",
      "9": "https://buy.stripe.com/3cI7sFf7BfUa8M46Tq9g00u",
      "10": "https://buy.stripe.com/bJe4gtcZtazQ6DW5Pm9g00v",
      "11": "https://buy.stripe.com/00w3cp2kP9vMe6o0v29g00w",
      "12": "https://buy.stripe.com/bJedR33oT6jA6DW4Li9g00x",
      "13": "https://buy.stripe.com/fZu9ANgbF0ZgaUcelS9g00y",
      "14": "https://buy.stripe.com/fZu28lcZt6jA3rK3He9g00z",
      "15": "https://buy.stripe.com/fZu8wJ7F937o4vOb9G9g00A",
      "16": "https://buy.stripe.com/dRm6oB2kP8rIaUc4Li9g00B",
      "17": "https://buy.stripe.com/6oU5kx2kPcHYbYgfpW9g00C",
      "18": "https://buy.stripe.com/00wbIV8Jd8rI2nG91y9g00D",
      "19": "https://buy.stripe.com/4gM7sF5x1cHY1jC91y9g00E",
      "20": "https://buy.stripe.com/aFa28l5x18rI2nGa5C9g00F",
    },
    upsellPairPrice: 160,
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
    name: "Christmas Cookie Wall Art | JOIRUSH",
    shortName: "Christmas Cookie",
    price: 80,
    compareAtPrice: 100,
    size: "16 in",
    category: "seasonal",
    image: "/images/products/christmas.jpg",
    etsyUrl: "https://www.etsy.com/listing/4438064219/jumbo-christmas-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/8x2bIV0cH7nE2nG4Li9fY2F",
    stripeUpsellUrl: "https://buy.stripe.com/14A28l2kP7nE4vO1z69g00G",
    stripeProductId: "prod_VInVVIXb3NPwt0",
    stripeUnitPriceId: "price_1UU8yr8dNREsB4xBIM18x4m7",
    stripeBuy4PriceId: "price_1UU8yt8dNREsB4xBcIzBO4M5",
    stripeTierPriceIds: {
      unit: "price_1UU8yr8dNREsB4xBIM18x4m7",
      buy4TenOff: "price_1UU8yt8dNREsB4xBcIzBO4M5",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/8x2bIV0cH7nE2nG4Li9fY2F",
      "2": "https://buy.stripe.com/14A28l2kP7nE4vO1z69g00G",
      "3": "https://buy.stripe.com/00w3cpe3x6jAgew0v29g00H",
      "4": "https://buy.stripe.com/dRmeV7e3x5fwaUc91y9g00I",
      "5": "https://buy.stripe.com/6oU6oBcZt8rIe6ob9G9g00J",
      "6": "https://buy.stripe.com/eVqaER1gL9vMfasa5C9g00K",
      "7": "https://buy.stripe.com/4gMeV7aRldM22nGa5C9g00L",
      "8": "https://buy.stripe.com/dRmbIVe3xazQe6oelS9g00M",
      "9": "https://buy.stripe.com/9B6cMZ3oT5fwd2k7Xu9g00N",
      "10": "https://buy.stripe.com/eVq9AN8JdeQ6d2k1z69g00O",
      "11": "https://buy.stripe.com/9B63cpe3x6jA8M44Li9g00P",
      "12": "https://buy.stripe.com/4gM9ANgbF9vMe6ofpW9g00Q",
      "13": "https://buy.stripe.com/00waERe3x8rI9Q80v29g00R",
      "14": "https://buy.stripe.com/8x2eV72kPfUafas1z69g00S",
      "15": "https://buy.stripe.com/14A00de3x7nE8M4dhO9g00T",
      "16": "https://buy.stripe.com/7sYfZbbVp8rI6DWgu09g00U",
      "17": "https://buy.stripe.com/00wcMZ3oT7nEaUc1z69g00V",
      "18": "https://buy.stripe.com/14A7sFcZt4bs4vO3He9g00W",
      "19": "https://buy.stripe.com/eVq00de3xazQ5zS4Li9g00X",
      "20": "https://buy.stripe.com/4gMeV75x14bs3rKa5C9g00Y",
    },
    upsellPairPrice: 160,
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
    name: "Peanut Butter Cookie Wall Art | JOIRUSH",
    shortName: "Peanut Butter Cookie",
    price: 80,
    compareAtPrice: 100,
    size: "16 in",
    category: "classic",
    image: "/images/products/peanut-butter.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817504830/giant-peanut-butter-cookie-wall-art",
    stripeUrl: "https://buy.stripe.com/cNi00dcZtgYed2kfpW9fY3e",
    stripeUpsellUrl: "https://buy.stripe.com/4gM6oBcZtcHYfascdK9g00Z",
    stripeProductId: "prod_VInVIoE0t4agYj",
    stripeUnitPriceId: "price_1UU8z88dNREsB4xB0RcfK0B0",
    stripeBuy4PriceId: "price_1UU8zA8dNREsB4xB2tZp8xJY",
    stripeTierPriceIds: {
      unit: "price_1UU8z88dNREsB4xB0RcfK0B0",
      buy4TenOff: "price_1UU8zA8dNREsB4xB2tZp8xJY",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/cNi00dcZtgYed2kfpW9fY3e",
      "2": "https://buy.stripe.com/4gM6oBcZtcHYfascdK9g00Z",
      "3": "https://buy.stripe.com/28E14h0cH37od2kb9G9g010",
      "4": "https://buy.stripe.com/7sY4gtcZtdM20fy2Da9g011",
      "5": "https://buy.stripe.com/4gM28l8JdazQ9Q8fpW9g012",
      "6": "https://buy.stripe.com/cNi7sF7F937o2nG1z69g013",
      "7": "https://buy.stripe.com/3cI28lbVp37obYga5C9g014",
      "8": "https://buy.stripe.com/4gMeV74sX0Zg8M43He9g015",
      "9": "https://buy.stripe.com/cNi4gt4sXeQ62nG7Xu9g016",
      "10": "https://buy.stripe.com/9B6bIV3oT7nEgewgu09g017",
      "11": "https://buy.stripe.com/aFa14h0cHgYee6o4Li9g018",
      "12": "https://buy.stripe.com/8x28wJ7F90ZgaUc3He9g019",
      "13": "https://buy.stripe.com/eVq7sFbVp6jAfas3He9g01a",
      "14": "https://buy.stripe.com/fZu5kxf7B8rI5zS0v29g01b",
      "15": "https://buy.stripe.com/8x200dcZt4bsd2kelS9g01c",
      "16": "https://buy.stripe.com/14A3cpcZtdM26DW4Li9g01d",
      "17": "https://buy.stripe.com/14A4gt8Jd0Zg7I07Xu9g01e",
      "18": "https://buy.stripe.com/14AaER5x123k1jC4Li9g01f",
      "19": "https://buy.stripe.com/fZueV7cZt8rI1jC1z69g01g",
      "20": "https://buy.stripe.com/eVq3cpf7B0Zg9Q81z69g01h",
    },
    upsellPairPrice: 160,
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
    name: "Giant Double Chocolate Cookie Wall Art | JOIRUSH",
    shortName: "Double Chocolate",
    price: 80,
    compareAtPrice: 110,
    size: "16 in",
    category: "classic",
    image: "/images/products/double-choc.jpg",
    etsyUrl: "https://www.etsy.com/listing/1817632262/giant-faux-double-chocolate-chip-cookie",
    stripeUrl: "https://buy.stripe.com/cNiaER3oT0Zg3rKfpW9fY3N",
    stripeUpsellUrl: "https://buy.stripe.com/8x2cMZ4sXgYe6DW91y9g01i",
    stripeProductId: "prod_VInVAztIr2Mo7D",
    stripeUnitPriceId: "price_1UU8zJ8dNREsB4xBiy6zpewI",
    stripeBuy4PriceId: "price_1UU8zL8dNREsB4xB5xfFOhMZ",
    stripeTierPriceIds: {
      unit: "price_1UU8zJ8dNREsB4xBiy6zpewI",
      buy4TenOff: "price_1UU8zL8dNREsB4xB5xfFOhMZ",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/cNiaER3oT0Zg3rKfpW9fY3N",
      "2": "https://buy.stripe.com/8x2cMZ4sXgYe6DW91y9g01i",
      "3": "https://buy.stripe.com/7sY7sF4sXdM23rKgu09g01j",
      "4": "https://buy.stripe.com/6oUbIVgbF23k8M47Xu9g01k",
      "5": "https://buy.stripe.com/9B628l8Jd8rI7I02Da9g01l",
      "6": "https://buy.stripe.com/4gM00d8Jd6jA3rK7Xu9g01m",
      "7": "https://buy.stripe.com/6oU7sFgbFfUad2k4Li9g01n",
      "8": "https://buy.stripe.com/dRm9ANbVpcHY3rK5Pm9g01o",
      "9": "https://buy.stripe.com/5kQeV76B523k3rK7Xu9g01p",
      "10": "https://buy.stripe.com/bJe28l8JdazQaUc1z69g01q",
      "11": "https://buy.stripe.com/9B66oB3oTfUa8M41z69g01r",
      "12": "https://buy.stripe.com/dRm00daRl37o8M45Pm9g01s",
      "13": "https://buy.stripe.com/dRm14haRleQ6aUc0v29g01t",
      "14": "https://buy.stripe.com/7sY6oBcZtgYe7I01z69g01u",
      "15": "https://buy.stripe.com/28E3cpcZtbDUaUc5Pm9g01v",
      "16": "https://buy.stripe.com/5kQaER3oT7nE2nGa5C9g01w",
      "17": "https://buy.stripe.com/dRm6oB7F97nE0fy5Pm9g01x",
      "18": "https://buy.stripe.com/5kQ4gt7F99vM1jC4Li9g01y",
      "19": "https://buy.stripe.com/cNi3cp5x1gYe0fy7Xu9g01z",
      "20": "https://buy.stripe.com/6oU6oB6B5cHY7I05Pm9g01A",
    },
    upsellPairPrice: 160,
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
    name: "Cookie Ice Cream Sandwich Wall Art | JOIRUSH",
    shortName: "Ice Cream Sandwich",
    price: 175,
    compareAtPrice: 220,
    size: "Statement piece",
    category: "statement",
    featured: true,
    image: "/images/products/ice-cream.jpg",
    etsyUrl: "https://www.etsy.com/listing/1892110346/jumbo-chocolate-chip-cookie-ice-cream",
    stripeUrl: "https://buy.stripe.com/aFa14h8Jd8rIfasgu09fZ10",
    stripeUpsellUrl: "https://buy.stripe.com/8x228l7F923k4vO0v29g01B",
    stripeProductId: "prod_VInVDITITvdjRz",
    stripeUnitPriceId: "price_1UU8zb8dNREsB4xB86MYE4Tt",
    stripeBuy4PriceId: "price_1UU9cn8dNREsB4xB4W6cqPzS",
    stripeTierPriceIds: {
      unit: "price_1UU8zb8dNREsB4xB86MYE4Tt",
      buy4TenOff: "price_1UU9cn8dNREsB4xB4W6cqPzS",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/aFa14h8Jd8rIfasgu09fZ10",
      "2": "https://buy.stripe.com/8x228l7F923k4vO0v29g01B",
      "3": "https://buy.stripe.com/9B6eV7cZtgYegewgu09g01C",
      "4": "https://buy.stripe.com/00waER0cHgYe6DWfpW9g01D",
      "5": "https://buy.stripe.com/dRmeV71gLdM24vOb9G9g01E",
      "6": "https://buy.stripe.com/bJefZbaRl7nE6DW4Li9g01F",
      "7": "https://buy.stripe.com/6oUeV75x1gYee6o91y9g01G",
      "8": "https://buy.stripe.com/6oUaERgbF9vM2nGelS9g01H",
      "9": "https://buy.stripe.com/9B600daRlcHY9Q83He9g01I",
      "10": "https://buy.stripe.com/eVqaER7F9azQ1jCfpW9g01J",
      "11": "https://buy.stripe.com/8x2aERgbF9vMd2k91y9g01K",
      "12": "https://buy.stripe.com/9B628l6B56jA3rK5Pm9g01L",
      "13": "https://buy.stripe.com/dRm8wJcZt4bs5zS5Pm9g01M",
      "14": "https://buy.stripe.com/3cI6oB4sXazQ9Q8elS9g01N",
      "15": "https://buy.stripe.com/00wdR3f7B23k7I00v29g01O",
      "16": "https://buy.stripe.com/5kQaER3oT5fw5zS2Da9g01P",
      "17": "https://buy.stripe.com/14AcMZ6B5fUa0fy1z69g01Q",
      "18": "https://buy.stripe.com/dRmeV72kP23k5zS2Da9g01R",
      "19": "https://buy.stripe.com/dRmcMZbVp6jAe6o3He9g01S",
      "20": "https://buy.stripe.com/fZueV7cZtdM29Q8fpW9g01T",
    },
    upsellPairPrice: 350,
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
    name: "M&M Cookie Wall Art | JOIRUSH",
    shortName: "Classic M&M Cookie",
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/mm-classic.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831839675/jumbo-mm-cookie-wall-art-candyland",
    stripeUrl: "https://buy.stripe.com/00wcMZcZt37ofas1z69fZ1F",
    stripeUpsellUrl: "https://buy.stripe.com/fZu5kx9NhcHY4vOfpW9g01U",
    stripeProductId: "prod_VInV2orrtkSQHB",
    stripeUnitPriceId: "price_1UU8zm8dNREsB4xBu3BnOhmv",
    stripeBuy4PriceId: "price_1UU8zo8dNREsB4xBcbxKH8jo",
    stripeTierPriceIds: {
      unit: "price_1UU8zm8dNREsB4xBu3BnOhmv",
      buy4TenOff: "price_1UU8zo8dNREsB4xBcbxKH8jo",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/00wcMZcZt37ofas1z69fZ1F",
      "2": "https://buy.stripe.com/fZu5kx9NhcHY4vOfpW9g01U",
      "3": "https://buy.stripe.com/aFa00daRleQ6aUcdhO9g01V",
      "4": "https://buy.stripe.com/fZu00d4sXfUa5zS3He9g01W",
      "5": "https://buy.stripe.com/eVqaER1gL4bs6DWb9G9g01X",
      "6": "https://buy.stripe.com/14AbIV8JdazQ8M4b9G9g01Y",
      "7": "https://buy.stripe.com/fZu00d7F923k2nGa5C9g01Z",
      "8": "https://buy.stripe.com/cNidR33oTeQ64vO91y9g020",
      "9": "https://buy.stripe.com/5kQ9ANgbF23kaUcelS9g021",
      "10": "https://buy.stripe.com/3cI3cp5x19vM6DW4Li9g022",
      "11": "https://buy.stripe.com/5kQ8wJ9Nh9vM1jC1z69g023",
      "12": "https://buy.stripe.com/6oUfZb1gLazQ1jCelS9g024",
      "13": "https://buy.stripe.com/14A5kx8JdeQ67I0elS9g025",
      "14": "https://buy.stripe.com/28E00d8JddM22nG3He9g026",
      "15": "https://buy.stripe.com/7sYaERbVpazQfasfpW9g027",
      "16": "https://buy.stripe.com/dRm6oBgbFbDU4vOgu09g028",
      "17": "https://buy.stripe.com/00w4gt8JdgYebYggu09g029",
      "18": "https://buy.stripe.com/9B65kx8Jd4bs9Q8a5C9g02a",
      "19": "https://buy.stripe.com/fZufZbaRl37o3rKcdK9g02b",
      "20": "https://buy.stripe.com/6oUfZbgbFazQ3rK2Da9g02c",
    },
    upsellPairPrice: 160,
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
    name: "Hot Pink M&M Cookie Wall Art | JOIRUSH",
    shortName: "Hot Pink M&M Cookie",
    price: 80,
    compareAtPrice: 115,
    size: "16 in",
    category: "candy",
    featured: true,
    image: "/images/products/hot-pink-mm.jpg",
    etsyUrl: "https://www.etsy.com/listing/1831836105/hot-pink-jumbo-mm-cookie-candyland-wall",
    stripeUrl: "https://buy.stripe.com/bJecMZf7B0ZgaUc7Xu9fZ2k",
    stripeUpsellUrl: "https://buy.stripe.com/bJe28l7F9azQgew1z69g02d",
    stripeProductId: "prod_VInVfyjuGE81ol",
    stripeUnitPriceId: "price_1UU8zx8dNREsB4xBED6HAv9a",
    stripeBuy4PriceId: "price_1UU8zz8dNREsB4xBAGINUp27",
    stripeTierPriceIds: {
      unit: "price_1UU8zx8dNREsB4xBED6HAv9a",
      buy4TenOff: "price_1UU8zz8dNREsB4xBAGINUp27",
    },
    stripeQuantityUrls: {
      "1": "https://buy.stripe.com/bJecMZf7B0ZgaUc7Xu9fZ2k",
      "2": "https://buy.stripe.com/bJe28l7F9azQgew1z69g02d",
      "3": "https://buy.stripe.com/eVqfZb4sX23k8M4elS9g02e",
      "4": "https://buy.stripe.com/9B66oBgbF8rIbYg0v29g02f",
      "5": "https://buy.stripe.com/4gMcMZ6B5fUad2kfpW9g02g",
      "6": "https://buy.stripe.com/bJeeV7cZt37obYgcdK9g02h",
      "7": "https://buy.stripe.com/eVqbIV1gLcHY4vOa5C9g02i",
      "8": "https://buy.stripe.com/aFadR38Jd9vM9Q84Li9g02j",
      "9": "https://buy.stripe.com/14AeV78Jd23k7I05Pm9g02k",
      "10": "https://buy.stripe.com/00w6oB2kPazQ8M4fpW9g02l",
      "11": "https://buy.stripe.com/dRmaER6B5dM29Q8elS9g02m",
      "12": "https://buy.stripe.com/dRm4gtbVpgYe2nGfpW9g02n",
      "13": "https://buy.stripe.com/8x200d7F99vM8M4cdK9g02o",
      "14": "https://buy.stripe.com/14AcMZ5x1cHY7I0elS9g02p",
      "15": "https://buy.stripe.com/4gMdR3aRl0ZgfasdhO9g02q",
      "16": "https://buy.stripe.com/3cI28l2kPeQ60fy91y9g02r",
      "17": "https://buy.stripe.com/8x23cpf7B0Zg0fy0v29g02s",
      "18": "https://buy.stripe.com/fZueV7e3x8rId2kb9G9g02t",
      "19": "https://buy.stripe.com/eVq8wJe3x5fw3rK0v29g02u",
      "20": "https://buy.stripe.com/7sY00d7F9bDU1jC3He9g02v",
    },
    upsellPairPrice: 160,
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
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

export function calculateSavings(price: number, compareAtPrice: number) {
  const savings = compareAtPrice - price;
  const percent = Math.round((savings / compareAtPrice) * 100);
  return { savings, percent };
}

/** Price of an added second cookie. The discount only starts at 4 cookies, so this is full price. */
export function getSecondCookiePrice(product: Pick<Product, "price">): number {
  return product.price;
}

/** Price of an added third cookie. The discount only starts at 4 cookies, so this is full price. */
export function getThirdCookiePrice(product: Pick<Product, "price">): number {
  return product.price;
}

/** Discount percent for a cart: 10% off each cookie at 4 or more cookies, otherwise none. */
export function getBulkDiscountPercent(totalCookies: number): 0 | 10 {
  return totalCookies >= 4 ? 10 : 0;
}

/** Discounted unit price in USD, exact to the cent (e.g. 175 at 10% off is 157.50). */
export function getDiscountedUnitPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price;
  return Math.round(price * (100 - discountPercent)) / 100;
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
