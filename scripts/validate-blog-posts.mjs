#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src/app/blog/[slug]/content");

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function collectVisibleSentences(data) {
  const sentences = [];
  sentences.push(data.lead);
  sentences.push(data.quickFactsTitle);
  for (const f of data.quickFacts || []) sentences.push(f);
  for (const sec of [data.section1, data.section2, data.section3]) {
    if (!sec) continue;
    sentences.push(sec.heading + ".");
    for (const p of sec.paragraphs || []) sentences.push(p);
    for (const l of sec.links || []) sentences.push(l.label + ".");
  }
  if (data.image1) {
    sentences.push(data.image1.caption);
  }
  if (data.image2) {
    sentences.push(data.image2.caption);
  }
  for (const faq of data.faqs || []) {
    sentences.push(faq.question);
    sentences.push(faq.answer);
  }
  return sentences;
}

function collectAllVisibleStringsForDashCheck(data) {
  const strings = [...collectVisibleSentences(data)];
  if (data.image1?.alt) strings.push(data.image1.alt);
  if (data.image2?.alt) strings.push(data.image2.alt);
  return strings;
}

const files = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .sort();

let failed = false;

console.log(`Validating ${files.length} blog posts against the JOIRUSH Blog Post Algorithm...\n`);

for (const file of files) {
  const fullPath = path.join(CONTENT_DIR, file);
  const src = fs.readFileSync(fullPath, "utf8");
  const match = src.match(/const data:\s*BlogPostStructuredData\s*=\s*(\{[\s\S]*?\});\s*\n\s*export function/);
  if (!match) {
    console.error(`❌ ${file}: Does not use BlogPostStructuredData template`);
    failed = true;
    continue;
  }

  let data;
  try {
    data = JSON.parse(match[1]);
  } catch (e) {
    console.error(`❌ ${file}: Failed to parse data JSON: ${e.message}`);
    failed = true;
    continue;
  }

  const visibleChunks = collectVisibleSentences(data);
  const fullText = visibleChunks.join(" ");
  const allDashStrings = collectAllVisibleStringsForDashCheck(data).join(" ");

  // 1. Check dashes (-, –, —) in visible text, alt text, and link labels
  const dashMatches = allDashStrings.match(/[-–—]/g) || [];

  // 2. Check images
  const imageCount = (data.image1?.src ? 1 : 0) + (data.image2?.src ? 1 : 0);

  // 3. Word count (include CTA words ~ 42 words across 3 CTAs)
  const words = fullText
    .replace(/[^a-zA-Z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const totalWords = words.length + 42;

  // 4. Sentence count & syllables for Flesch-Kincaid Grade Level
  const sentenceList = fullText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = Math.max(1, sentenceList.length);
  const syllableCount = words.reduce((acc, w) => acc + countSyllables(w), 0);

  const fkGrade =
    0.39 * (words.length / sentenceCount) +
    11.8 * (syllableCount / Math.max(1, words.length)) -
    15.59;

  const issues = [];
  if (dashMatches.length > 0) issues.push(`found ${dashMatches.length} dash(es)`);
  if (imageCount < 2) issues.push(`only ${imageCount} images (need 2)`);
  if (totalWords > 500) issues.push(`${totalWords} words (max 500)`);
  if (totalWords < 180) issues.push(`${totalWords} words (too short, min 180)`);
  if (fkGrade > 3.5) issues.push(`FK grade ${fkGrade.toFixed(1)} (max 3.5)`);

  const status = issues.length === 0 ? "✅" : "❌";
  if (issues.length > 0) failed = true;

  console.log(
    `${status} ${file.padEnd(55)} | ${String(totalWords).padStart(3)} words | FK grade ${fkGrade.toFixed(1)} | ${imageCount} images | ${dashMatches.length} dashes${issues.length ? " | " + issues.join(", ") : ""}`
  );
}

if (failed) {
  console.error("\nBlog validation failed.");
  process.exit(1);
} else {
  console.log(`\nAll ${files.length} blog posts passed validation!`);
}
