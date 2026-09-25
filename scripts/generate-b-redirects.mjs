#!/usr/bin/env node

/**
 * Generate /b/ short-link redirect HTML files.
 * Each file uses meta refresh + JS location.replace with absolute URLs.
 * Includes noindex + canonical to the destination.
 *
 * Run: node scripts/generate-b-redirects.mjs
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const SITE_URL = "https://joirush.com";

// Read the redirects data
const redirectsPath = join(projectRoot, "src/data/b-redirects.json");
const redirects = JSON.parse(readFileSync(redirectsPath, "utf-8"));

// Output to public/b for development and docs/b for GitHub Pages
const outputDirs = [
  join(projectRoot, "public/b"),
  join(projectRoot, "docs/b"),
];

function generateRedirectHtml(code, config) {
  const { destination, oldTitle } = config;
  const absoluteDestination = `${SITE_URL}${destination}`;
  const canonicalUrl = absoluteDestination;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${canonicalUrl}">
  <title>${oldTitle} - Redirecting to JOIRUSH</title>
  <meta http-equiv="refresh" content="0; url=${absoluteDestination}">
</head>
<body>
  <p>Redirecting to <a href="${absoluteDestination}">${absoluteDestination}</a>...</p>
  <script>location.replace("${absoluteDestination}");</script>
</body>
</html>
`;
}

// Generate redirect files
for (const [code, config] of Object.entries(redirects)) {
  const html = generateRedirectHtml(code, config);

  for (const outputDir of outputDirs) {
    const codeDir = join(outputDir, code);

    // Create directory if it doesn't exist
    if (!existsSync(codeDir)) {
      mkdirSync(codeDir, { recursive: true });
    }

    // Write index.html
    const outputPath = join(codeDir, "index.html");
    writeFileSync(outputPath, html);
    console.log(`Generated: ${outputPath}`);
  }
}

console.log(`\nGenerated ${Object.keys(redirects).length} redirect(s) successfully.`);
