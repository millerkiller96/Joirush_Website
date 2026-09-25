#!/usr/bin/env node
/**
 * Generate static redirect pages for old /b/{code} short URLs.
 * 
 * Creates HTML files in public/b/{code}/index.html that:
 * 1. Use meta refresh for immediate redirect
 * 2. Include canonical link pointing to destination for SEO
 * 3. Use JavaScript location.replace as backup
 * 4. Provide a visible fallback link for no-JS browsers
 * 
 * These files get copied into docs/b/{code}/index.html during build.
 * GitHub Pages will serve them, consolidating search ranking to the new URLs.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');
const REDIRECTS_FILE = join(ROOT, 'src/data/b-redirects.json');
const SITE_URL = 'https://joirush.com';

function generateRedirectHTML(destination, oldTitle) {
  const absoluteUrl = `${SITE_URL}${destination}`;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0;url=${destination}">
  <link rel="canonical" href="${absoluteUrl}">
  <title>Redirecting to ${oldTitle}</title>
  <script>location.replace("${destination}");</script>
</head>
<body>
  <p>This page has moved. If you are not redirected automatically, <a href="${destination}">click here to continue</a>.</p>
</body>
</html>
`;
}

function main() {
  console.log('Generating /b/ redirect pages...');
  
  const data = JSON.parse(readFileSync(REDIRECTS_FILE, 'utf8'));
  const redirects = data.redirects;
  
  let created = 0;
  
  for (const redirect of redirects) {
    const { code, oldTitle, destination } = redirect;
    const dir = join(PUBLIC_DIR, 'b', code);
    const file = join(dir, 'index.html');
    
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    
    const html = generateRedirectHTML(destination, oldTitle);
    writeFileSync(file, html, 'utf8');
    console.log(`  Created: /b/${code}/ -> ${destination}`);
    created++;
  }
  
  console.log(`\nGenerated ${created} redirect pages in public/b/`);
}

main();
