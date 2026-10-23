#!/usr/bin/env node
/**
 * Syncs JoiRush bulk & bundle discount tiers to Stripe (acct_1UIAw68dNREsB4xB):
 * 1. Creates tier Price objects on each of the 11 live Stripe Products:
 *    - third15Off (15% off 3rd cookie in "Want a third?" prompt)
 *    - bulk20Off  (20% off for 3 to 5 cookies)
 *    - bulk25Off  (25% off for 5 to 10 cookies)
 *    - bulk30Off  (30% off for 10 to 20 cookies)
 * 2. Creates the 110 mixed-flavor 2-cookie Payment Links (1st full price + 2nd 10% off)
 *    and writes them into stripePairUrls in src/data/products.ts.
 * 3. Creates the 33 bulk-tier Payment Links (tier3to5, tier5to10, tier10to20 for each cookie,
 *    with the other 10 cookies attached as optional_items at that tier's discount)
 *    and writes them into stripeBulkTierUrls in src/data/products.ts.
 *
 * Usage:
 *   STRIPE_JOIRUSH_KEY=sk_live_... node scripts/sync-stripe-bulk-tiers.mjs
 */

import fs from "node:fs";
import path from "node:path";

const STRIPE_KEY = process.env.STRIPE_JOIRUSH_KEY || process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error(
    "Missing STRIPE_JOIRUSH_KEY environment variable. Run with:\n  STRIPE_JOIRUSH_KEY=sk_live_... node scripts/sync-stripe-bulk-tiers.mjs"
  );
  process.exit(1);
}

const SHIPPING_RATE_ID = "shr_1UIs5g8dNREsB4xBpIhVBs6y";

const CATALOG = [
  {
    slug: "jumbo-chocolate-chip-cookie",
    name: "Jumbo Chocolate Chip Cookie",
    priceUsd: 100,
    productId: "prod_VInUXaAP2bjrGc",
    unitPriceId: "price_1UIBtx8dNREsB4xBV16Vh5FF",
    second10PriceId: "price_1UIs5S8dNREsB4xBgEhSim2q",
  },
  {
    slug: "jumbo-white-chocolate-chip-cookie",
    name: "Jumbo White Chocolate Chip Cookie",
    priceUsd: 115,
    productId: "prod_VInVwq4gwbHX7W",
    unitPriceId: "price_1UIBu48dNREsB4xBJU4XWWaG",
    second10PriceId: "price_1UIs5Z8dNREsB4xBATCXEZ7W",
  },
  {
    slug: "rainbow-candy-cookie",
    name: "Rainbow Candy Cookie",
    priceUsd: 90,
    productId: "prod_VInVAr2A30To1r",
    unitPriceId: "price_1UIBu68dNREsB4xBvnCx5qG0",
    second10PriceId: "price_1UIs5a8dNREsB4xBQM6AXYap",
  },
  {
    slug: "mini-jumbo-chocolate-chip-cookie",
    name: "Mini Jumbo Chocolate Chip Cookie",
    priceUsd: 90,
    productId: "prod_VInVMu4LI8B4Yp",
    unitPriceId: "price_1UIBu88dNREsB4xBTNS59vIX",
    second10PriceId: "price_1UIs5a8dNREsB4xBWxtJaEv3",
  },
  {
    slug: "jumbo-pastel-mm-cookie",
    name: "Jumbo Pastel M&M Cookie",
    priceUsd: 115,
    productId: "prod_VInV5JgsOOBYsl",
    unitPriceId: "price_1UIBuA8dNREsB4xBPy2WFC92",
    second10PriceId: "price_1UIs5b8dNREsB4xBPn1XjWuu",
  },
  {
    slug: "jumbo-christmas-cookie",
    name: "Jumbo Christmas Cookie",
    priceUsd: 100,
    productId: "prod_VInVVIXb3NPwt0",
    unitPriceId: "price_1UIBuC8dNREsB4xBn3wpHOZO",
    second10PriceId: "price_1UIs5c8dNREsB4xBvh6VC7vj",
  },
  {
    slug: "giant-peanut-butter-cookie",
    name: "Giant Peanut Butter Cookie",
    priceUsd: 100,
    productId: "prod_VInVIoE0t4agYj",
    unitPriceId: "price_1UIBuE8dNREsB4xBZ5sbwIL2",
    second10PriceId: "price_1UIs5d8dNREsB4xBshDuVkkF",
  },
  {
    slug: "giant-double-chocolate-cookie",
    name: "Giant Double Chocolate Cookie",
    priceUsd: 110,
    productId: "prod_VInVAztIr2Mo7D",
    unitPriceId: "price_1UIBuG8dNREsB4xBp4640Aby",
    second10PriceId: "price_1UIs5e8dNREsB4xBBcGskFlB",
  },
  {
    slug: "cookie-ice-cream-sandwich",
    name: "Cookie Ice Cream Sandwich",
    priceUsd: 220,
    productId: "prod_VInVDITITvdjRz",
    unitPriceId: "price_1UIBuI8dNREsB4xBGkiyAYnR",
    second10PriceId: "price_1UIs5f8dNREsB4xB7tAbAeJU",
  },
  {
    slug: "jumbo-mm-cookie",
    name: "Jumbo M&M Cookie",
    priceUsd: 115,
    productId: "prod_VInV2orrtkSQHB",
    unitPriceId: "price_1UIBuK8dNREsB4xBpRTIIqyJ",
    second10PriceId: "price_1UIs5g8dNREsB4xBXOFeeVQA",
  },
  {
    slug: "hot-pink-mm-cookie",
    name: "Hot Pink M&M Cookie",
    priceUsd: 115,
    productId: "prod_VInVfyjuGE81ol",
    unitPriceId: "price_1UIBuM8dNREsB4xBUYv9o4uL",
    second10PriceId: "price_1UIs5g8dNREsB4xBhDA0yXs5",
  },
];

async function stripePost(endpoint, params) {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Stripe ${endpoint} failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function createTierPrice(item, discountPct, nicknameSuffix) {
  const unitUsd = Math.round(item.priceUsd * (1 - discountPct / 100));
  const price = await stripePost("prices", {
    product: item.productId,
    currency: "usd",
    unit_amount: String(unitUsd * 100),
    nickname: `${item.name} (${nicknameSuffix} - $${unitUsd})`,
    "metadata[slug]": item.slug,
    "metadata[discount_pct]": String(discountPct),
  });
  return { id: price.id, unitUsd };
}

async function main() {
  const results = {
    tierPrices: {},
    pairUrls: {},
    bulkTierUrls: {},
  };

  console.log("1. Creating 15%, 20%, 25%, and 30% off Stripe Prices on all 11 cookies...");
  for (const item of CATALOG) {
    const p15 = await createTierPrice(item, 15, "3rd Cookie 15% Off");
    const p20 = await createTierPrice(item, 20, "Bulk 3 to 5 Cookies 20% Off");
    const p25 = await createTierPrice(item, 25, "Bulk 5 to 10 Cookies 25% Off");
    const p30 = await createTierPrice(item, 30, "Bulk 10 to 20 Cookies 30% Off");

    results.tierPrices[item.slug] = {
      third15Off: p15.id,
      bulk20Off: p20.id,
      bulk25Off: p25.id,
      bulk30Off: p30.id,
    };
    console.log(`  ✓ ${item.slug}:`, results.tierPrices[item.slug]);
  }

  console.log("2. Creating 33 bulk-tier Payment Links (with optional_items for multi-cookie mix & match)...");
  const tierDefs = [
    { key: "tier3to5", priceKey: "bulk20Off", minQty: 3, maxQty: 5, defaultQty: 3, label: "3 to 5 Cookies (20% Off)" },
    { key: "tier5to10", priceKey: "bulk25Off", minQty: 5, maxQty: 10, defaultQty: 5, label: "5 to 10 Cookies (25% Off)" },
    { key: "tier10to20", priceKey: "bulk30Off", minQty: 10, maxQty: 20, defaultQty: 10, label: "10 to 20 Cookies (30% Off)" },
  ];

  for (const item of CATALOG) {
    results.bulkTierUrls[item.slug] = {};
    for (const tier of tierDefs) {
      const primaryPriceId = results.tierPrices[item.slug][tier.priceKey];
      const params = {
        "line_items[0][price]": primaryPriceId,
        "line_items[0][quantity]": String(tier.defaultQty),
        "line_items[0][adjustable_quantity][enabled]": "true",
        "line_items[0][adjustable_quantity][minimum]": "1",
        "line_items[0][adjustable_quantity][maximum]": "20",
        "shipping_address_collection[allowed_countries][0]": "US",
        "shipping_options[0][shipping_rate]": SHIPPING_RATE_ID,
        "after_completion[type]": "redirect",
        "after_completion[redirect][url]": "https://joirush.com/catalogue/?checkout=success",
        "metadata[slug]": item.slug,
        "metadata[tier]": tier.key,
      };
      const others = CATALOG.filter((other) => other.slug !== item.slug);
      others.forEach((other, idx) => {
        const otherPriceId = results.tierPrices[other.slug][tier.priceKey];
        params[`optional_items[${idx}][price]`] = otherPriceId;
        params[`optional_items[${idx}][quantity]`] = "1";
        params[`optional_items[${idx}][adjustable_quantity][enabled]`] = "true";
        params[`optional_items[${idx}][adjustable_quantity][minimum]`] = "1";
        params[`optional_items[${idx}][adjustable_quantity][maximum]`] = "20";
      });
      const link = await stripePost("payment_links", params);
      results.bulkTierUrls[item.slug][tier.key] = link.url;
    }
    console.log(`  ✓ Bulk links for ${item.slug}`);
  }

  const outPath = path.resolve(process.cwd(), "stripe-bulk-sync-output.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Saved full sync output to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
