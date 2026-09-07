# Etsy Sync Integration

This document explains how the JoiRush website syncs product data from Etsy.

## Overview

The site syncs **prices**, **shop ratings/stats**, and **reviews** from Etsy at build time. This ensures the website reflects current Etsy listing prices without requiring manual updates.

**Important:** Stripe Payment Links are NOT auto-updated. Price synchronization is for display purposes only. When you change prices on Etsy, you must also update the corresponding Stripe Payment Links manually.

## How It Works

1. **Sync Script** (`scripts/sync-etsy.mjs`) reads Etsy listing IDs from `src/data/products.ts`
2. Calls Etsy Open API v3 for each listing to fetch current prices and stats
3. Writes results to `src/data/etsy-sync.json`
4. Site builds with fallback logic: uses synced values if available, otherwise uses hardcoded defaults

## GitHub Secrets Required

Add these secrets in your repository settings (Settings → Secrets and variables → Actions):

| Secret | Required | Description |
|--------|----------|-------------|
| `ETSY_API_KEY` | **Yes** | Your Etsy Open API v3 keystring |
| `ETSY_ACCESS_TOKEN` | No | OAuth access token for fetching reviews |
| `ETSY_SHOP_ID` | No | Your shop ID (auto-detected from listings if not set) |

### Getting an Etsy API Key

1. Go to [Etsy Developer Portal](https://www.etsy.com/developers/register)
2. Create a new app
3. Copy the "Keystring" (this is your `ETSY_API_KEY`)

### Getting an Access Token (Optional)

For fetching shop reviews, you need OAuth authentication:

1. In your Etsy app, set up OAuth 2.0
2. Complete the OAuth flow to get an access token
3. Set `ETSY_ACCESS_TOKEN` in your GitHub secrets

## GitHub Action

The sync runs automatically via `.github/workflows/etsy-sync.yml`:

- **Daily at 6 AM UTC** (cron schedule)
- **Manual trigger** (workflow_dispatch in GitHub Actions UI)

The workflow:
1. Syncs data from Etsy
2. Rebuilds the static site
3. Commits changes to `main` if any prices/stats changed

## Local Development

Run the sync locally:

```bash
# With API key
ETSY_API_KEY=your-key npm run sync:etsy

# Without API key (generates empty placeholder)
npm run sync:etsy
```

Build with sync:

```bash
ETSY_API_KEY=your-key npm run build:pages:synced
```

## Fallback Behavior

The site **never breaks** without Etsy secrets:

- If `ETSY_API_KEY` is missing, sync generates an empty placeholder file
- Product pages fall back to hardcoded prices in `products.ts`
- Shop stats return sensible defaults (5.0 rating, 0 reviews)

## Data Available from Sync

### Per Listing
- `price` - Current listing price (USD)
- `originalPrice` - Compare-at price if on sale
- `views` - Total listing views
- `numFavorers` - Number of users who favorited
- `quantity` - Available quantity

### Shop Stats
- `reviewAverage` - Average star rating (1-5)
- `reviewCount` - Total number of reviews
- `transactionSoldCount` - Total sales count

### Reviews (requires access token)
- Recent reviews with rating, text, and timestamp

## Using Synced Data in Code

```tsx
import {
  getSyncedPrice,
  getSyncedCompareAtPrice,
  getShopStats,
  getShopReviews,
  getListingStats,
  isSyncDataAvailable,
} from "@/data/products";

// Get synced price with fallback
const price = getSyncedPrice("jumbo-chocolate-chip-cookie");

// Get shop rating
const { reviewAverage, reviewCount } = getShopStats();

// Check if sync data exists
if (isSyncDataAvailable()) {
  // Show "Last updated" timestamp
}
```

## Troubleshooting

### Sync not updating prices
- Check that `ETSY_API_KEY` is set correctly in GitHub Secrets
- View workflow runs in Actions tab for error messages
- Verify listing IDs in `etsyUrl` fields match your actual Etsy URLs

### Reviews not appearing
- Reviews require `ETSY_ACCESS_TOKEN` (OAuth)
- Basic API key only gets public listing data

### Workflow not running
- Check that Actions are enabled for the repository
- Verify cron syntax in workflow file
- Manual trigger available in Actions → Etsy Sync & Deploy → Run workflow
