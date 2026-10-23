#!/usr/bin/env node
/**
 * Lightweight zero-dependency Stripe Payment Link creator & redirector for JOIRUSH
 * multi-flavor Mix & Match carts (acct_1UIAw68dNREsB4xB).
 *
 * Endpoints:
 *   GET  /health
 *     -> 200 OK {"ok":true}
 *   POST /api/payment-link
 *     Body: { items: [{ price: "price_...", quantity: 5 }, ...], clientReferenceId?: "..." }
 *     -> 200 OK {"ok":true,"url":"https://buy.stripe.com/..."}
 *   GET  /checkout?items=price_xxx:10,price_yyy:10&ref=bulk30_...&fallback=https://buy.stripe.com/...
 *     -> 302 Found Location: https://buy.stripe.com/...?client_reference_id=...
 */

import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 10000);
const STRIPE_KEY = process.env.STRIPE_JOIRUSH_KEY || process.env.STRIPE_SECRET_KEY || "";
const SHIPPING_RATE_ID = process.env.JOIRUSH_SHIPPING_RATE_ID || "shr_1UIs5g8dNREsB4xBpIhVBs6y";

// In-memory cache of canonical cart signature -> buy.stripe.com URL
const linkCache = new Map();

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function validateItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 15) {
    throw new Error("Invalid items list");
  }
  const cleaned = [];
  let totalQty = 0;
  for (const item of rawItems) {
    const price = String(item?.price || item?.stripePriceId || "").trim();
    const quantity = Math.floor(Number(item?.quantity || 0));
    if (!/^price_[A-Za-z0-9]+$/.test(price)) {
      throw new Error(`Invalid price ID: ${price}`);
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
      throw new Error(`Invalid quantity: ${quantity}`);
    }
    totalQty += quantity;
    cleaned.push({ price, quantity });
  }
  if (totalQty < 1 || totalQty > 40) {
    throw new Error(`Invalid total quantity: ${totalQty}`);
  }
  return cleaned;
}

async function getOrCreatePaymentLink(items, clientReferenceId = "") {
  const signature = items.map((i) => `${i.price}:${i.quantity}`).join(",");
  if (linkCache.has(signature)) {
    return appendRef(linkCache.get(signature), clientReferenceId);
  }

  if (!STRIPE_KEY) {
    throw new Error("Missing STRIPE_JOIRUSH_KEY");
  }

  const params = new URLSearchParams();
  params.set("billing_address_collection", "required");
  params.set("shipping_address_collection[allowed_countries][0]", "US");
  params.set("shipping_options[0][shipping_rate]", SHIPPING_RATE_ID);
  params.set("allow_promotion_codes", "true");
  params.set("customer_creation", "always");
  params.set("metadata[brand]", "JOIRUSH");
  params.set("metadata[cart_signature]", signature.slice(0, 450));

  items.forEach((item, idx) => {
    params.set(`line_items[${idx}][price]`, item.price);
    params.set(`line_items[${idx}][quantity]`, String(item.quantity));
    params.set(`line_items[${idx}][adjustable_quantity][enabled]`, "true");
    params.set(`line_items[${idx}][adjustable_quantity][minimum]`, "1");
    params.set(`line_items[${idx}][adjustable_quantity][maximum]`, "20");
  });

  const resp = await fetch("https://api.stripe.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await resp.json();
  if (!resp.ok || !data?.url) {
    throw new Error(data?.error?.message || `Stripe error ${resp.status}`);
  }

  linkCache.set(signature, data.url);
  return appendRef(data.url, clientReferenceId);
}

function appendRef(baseUrl, clientReferenceId) {
  if (!clientReferenceId) return baseUrl;
  const safeRef = String(clientReferenceId).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 200);
  if (!safeRef) return baseUrl;
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}client_reference_id=${encodeURIComponent(safeRef)}`;
}

function parseQueryItems(itemsParam) {
  if (!itemsParam) return [];
  return String(itemsParam)
    .split(",")
    .map((part) => {
      const [price, qtyStr] = part.trim().split(":");
      return { price, quantity: Number(qtyStr) };
    })
    .filter((x) => x.price && x.quantity > 0);
}

const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (reqUrl.pathname === "/health" || reqUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "joirush-checkout" }));
    return;
  }

  if (req.method === "GET" && reqUrl.pathname === "/checkout") {
    const fallback = reqUrl.searchParams.get("fallback") || "https://joirush.com/catalogue/";
    const ref = reqUrl.searchParams.get("ref") || "";
    try {
      const rawItems = parseQueryItems(reqUrl.searchParams.get("items") || "");
      const items = validateItems(rawItems);
      const stripeUrl = await getOrCreatePaymentLink(items, ref);
      res.writeHead(302, { Location: stripeUrl, "Cache-Control": "no-store" });
      res.end();
    } catch (err) {
      res.writeHead(302, { Location: fallback, "Cache-Control": "no-store" });
      res.end();
    }
    return;
  }

  if (req.method === "POST" && reqUrl.pathname === "/api/payment-link") {
    let body = "";
    req.on("data", (chunk) => {
      if (body.length < 32768) body += chunk;
    });
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body || "{}");
        const items = validateItems(parsed.items || parsed.lineItems || []);
        const url = await getOrCreatePaymentLink(items, parsed.clientReferenceId || "");
        res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: true, url }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "Bad request" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: false, error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`joirush-checkout listening on port ${PORT}`);
});
