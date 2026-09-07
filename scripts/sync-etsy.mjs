#!/usr/bin/env node
/**
 * Etsy Sync Script for JoiRush
 *
 * Fetches listing prices, shop stats, and reviews from Etsy Open API v3.
 * Writes output to src/data/etsy-sync.json for consumption at build time.
 *
 * Environment Variables:
 *   ETSY_API_KEY       (required) - Your Etsy Open API v3 keystring
 *   ETSY_ACCESS_TOKEN  (optional) - OAuth access token for shop reviews/stats
 *   ETSY_SHOP_ID       (optional) - Shop ID for reviews endpoint (defaults to listing owner)
 *
 * NOTE: Stripe Payment Links are NOT auto-updated by this script.
 *       Prices are synced for display only; Stripe checkout links must be updated manually.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const ETSY_API_BASE = "https://api.etsy.com/v3/application";

/**
 * Parse listing ID from Etsy URL
 * Format: https://www.etsy.com/listing/1234567890/...
 */
function extractListingId(etsyUrl) {
  const match = etsyUrl.match(/\/listing\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Extract product data from products.ts
 * We parse it as text since this is a JS/MJS file and products.ts is TypeScript.
 */
function loadProducts() {
  const productsPath = join(ROOT, "src", "data", "products.ts");
  const content = readFileSync(productsPath, "utf-8");

  const products = [];
  const productBlockRegex =
    /\{\s*slug:\s*["']([^"']+)["'][^}]*etsyUrl:\s*["']([^"']+)["'][^}]*\}/gs;

  let match;
  while ((match = productBlockRegex.exec(content)) !== null) {
    const slug = match[1];
    const etsyUrl = match[2];
    const listingId = extractListingId(etsyUrl);

    if (listingId) {
      products.push({ slug, etsyUrl, listingId });
    } else {
      console.warn(`Could not extract listing ID from: ${etsyUrl}`);
    }
  }

  return products;
}

/**
 * Fetch a single listing from Etsy API
 */
async function fetchListing(listingId, apiKey) {
  const url = `${ETSY_API_BASE}/listings/${listingId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch listing ${listingId}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching listing ${listingId}:`, error.message);
    return null;
  }
}

/**
 * Fetch shop info including rating
 */
async function fetchShop(shopId, apiKey) {
  const url = `${ETSY_API_BASE}/shops/${shopId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch shop ${shopId}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching shop ${shopId}:`, error.message);
    return null;
  }
}

/**
 * Fetch shop reviews (requires OAuth access token for private shop data)
 */
async function fetchShopReviews(shopId, apiKey, accessToken) {
  if (!accessToken) {
    console.log("No access token provided, skipping reviews fetch");
    return null;
  }

  const url = `${ETSY_API_BASE}/shops/${shopId}/reviews?limit=25`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch reviews for shop ${shopId}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching reviews for shop ${shopId}:`, error.message);
    return null;
  }
}

/**
 * Convert Etsy price to USD dollars
 * Etsy returns prices in divisor format (e.g., amount: 10000, divisor: 100 = $100.00)
 */
function convertPrice(priceObj) {
  if (!priceObj || !priceObj.amount || !priceObj.divisor) {
    return null;
  }
  return priceObj.amount / priceObj.divisor;
}

/**
 * Main sync function
 */
async function syncEtsy() {
  const apiKey = process.env.ETSY_API_KEY;
  const accessToken = process.env.ETSY_ACCESS_TOKEN;
  const shopIdOverride = process.env.ETSY_SHOP_ID;

  if (!apiKey) {
    console.log("ETSY_API_KEY not set. Generating empty sync file for fallback.");
    const emptySync = {
      syncedAt: null,
      listings: {},
      shop: null,
      reviews: null,
      _note: "Sync skipped: ETSY_API_KEY not provided",
    };
    writeFileSync(
      join(ROOT, "src", "data", "etsy-sync.json"),
      JSON.stringify(emptySync, null, 2)
    );
    return;
  }

  console.log("Starting Etsy sync...");

  const products = loadProducts();
  console.log(`Found ${products.length} products with Etsy URLs`);

  const listings = {};
  let shopId = shopIdOverride;

  for (const product of products) {
    console.log(`Fetching listing ${product.listingId} (${product.slug})...`);
    const listing = await fetchListing(product.listingId, apiKey);

    if (listing) {
      const price = convertPrice(listing.price);

      listings[product.slug] = {
        listingId: product.listingId,
        title: listing.title,
        price: price,
        originalPrice: listing.original_price ? convertPrice(listing.original_price) : null,
        state: listing.state,
        views: listing.views,
        numFavorers: listing.num_favorers,
        quantity: listing.quantity,
        lastModified: listing.last_modified_timestamp,
      };

      // Capture shop ID from the first successful listing if not overridden
      if (!shopId && listing.shop_id) {
        shopId = listing.shop_id;
      }
    }

    // Rate limit: Etsy allows 10 requests per second, we'll be conservative
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  // Fetch shop info
  let shopData = null;
  if (shopId) {
    console.log(`Fetching shop info for ${shopId}...`);
    const shop = await fetchShop(shopId, apiKey);
    if (shop) {
      shopData = {
        shopId: shop.shop_id,
        shopName: shop.shop_name,
        title: shop.title,
        reviewAverage: shop.review_average,
        reviewCount: shop.review_count,
        listingActiveCount: shop.listing_active_count,
        transactionSoldCount: shop.transaction_sold_count,
      };
    }
  }

  // Fetch reviews if we have an access token
  let reviewsData = null;
  if (shopId && accessToken) {
    console.log("Fetching shop reviews...");
    const reviews = await fetchShopReviews(shopId, apiKey, accessToken);
    if (reviews && reviews.results) {
      reviewsData = {
        count: reviews.count,
        reviews: reviews.results.slice(0, 10).map((r) => ({
          rating: r.rating,
          review: r.review,
          createTimestamp: r.create_timestamp,
          buyerUserId: r.buyer_user_id,
        })),
      };
    }
  }

  const syncData = {
    syncedAt: new Date().toISOString(),
    listings,
    shop: shopData,
    reviews: reviewsData,
  };

  const outputPath = join(ROOT, "src", "data", "etsy-sync.json");
  writeFileSync(outputPath, JSON.stringify(syncData, null, 2));

  console.log(`Sync complete! Wrote ${Object.keys(listings).length} listings to ${outputPath}`);

  if (shopData) {
    console.log(
      `Shop: ${shopData.shopName} - ${shopData.reviewAverage}★ (${shopData.reviewCount} reviews)`
    );
  }
}

// Run the sync
syncEtsy().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
