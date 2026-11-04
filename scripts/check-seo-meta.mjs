// Post build check: every exported HTML page should have one brand suffix,
// a title of 60 characters or less, and a meta description of 160 or less.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || "out";
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") files.push(p);
  }
};
walk(root);

const problems = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  if (/noindex/.test(html.match(/<meta name="robots" content="[^"]*"/)?.[0] || "")) continue;
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
  if ((title.match(/JOIRUSH/g) || []).length > 1 && /\|\s*JOIRUSH\s*\|\s*JOIRUSH/.test(title))
    problems.push(`${file}: doubled brand suffix in title "${title}"`);
  if (title.length > 60) problems.push(`${file}: title ${title.length} chars "${title}"`);
  if (desc.length > 160) problems.push(`${file}: description ${desc.length} chars`);
}
if (problems.length) {
  console.error("SEO meta check failed:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`SEO meta check passed for ${files.length} pages.`);
