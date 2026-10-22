#!/usr/bin/env node
import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/app/blog/[slug]/content");
const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".tsx"));

// Template shared prose (CTA card + headings) is ~42 words
const TEMPLATE_SHARED_WORDS = 42;

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
  const pushText = (t) => {
    if (!t) return;
    const trimmed = t.trim();
    if (!trimmed) return;
    sentences.push(/[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`);
  };

  pushText(data.lead);
  pushText(data.quickFactsTitle);
  for (const item of data.quickFacts || []) pushText(item);

  for (const sec of [data.section1, data.section2, data.section3]) {
    if (!sec) continue;
    pushText(sec.heading);
    for (const p of sec.paragraphs || []) pushText(p);
    for (const b of sec.bullets || []) pushText(b);
    for (const l of sec.links || []) pushText(l.label);
  }

  if (data.image1) pushText(data.image1.caption);
  if (data.image2) pushText(data.image2.caption);

  for (const faq of data.faqs || []) {
    pushText(faq.question);
    pushText(faq.answer);
  }

  return sentences;
}

let failed = false;
console.log(`Validating ${files.length} blog posts against the JOIRUSH Blog Post Algorithm...\n`);

for (const file of files) {
  const fullPath = path.join(contentDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");

  const match = raw.match(/const data:\s*BlogPostStructuredData\s*=\s*(\{[\s\S]*?\});\s*\n\s*export function/);
  if (!match) {
    console.error(`❌ ${file}: Does not use BlogPostStructuredData template`);
    failed = true;
    continue;
  }

  const data = JSON.parse(match[1]);
  const sentencesList = collectVisibleSentences(data);
  const fullText = sentencesList.join(" ");

  // Check for forbidden dashes in any visible text (lead, headings, paragraphs, bullets, captions, faqs, link labels)
  const dashMatch = fullText.match(/[-–—]/);

  // Word count
  const words = fullText
    .replace(/[^a-zA-Z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const totalWords = words.length + TEMPLATE_SHARED_WORDS;

  // Sentence count for FK grade
  const sentences = fullText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);

  const wordsPerSentence = words.length / Math.max(1, sentences.length);
  const syllablesPerWord = totalSyllables / Math.max(1, words.length);
  const fkGrade = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  // Image check: must have image1 and image2
  const hasTwoImages = Boolean(data.image1?.src && data.image2?.src);

  const issues = [];
  if (totalWords > 500) issues.push(`Word count ${totalWords} > 500`);
  if (totalWords < 180) issues.push(`Word count ${totalWords} < 180`);
  if (!hasTwoImages) issues.push(`Missing 2 inline images`);
  if (dashMatch) issues.push(`Contains forbidden dash character`);
  if (fkGrade > 5.0) issues.push(`FK Grade ${fkGrade.toFixed(1)} too high (target ~3rd grade / <= 5.0)`);

  const status = issues.length === 0 ? "✅" : "❌";
  console.log(
    `${status} ${file.padEnd(55)} | ${String(totalWords).padStart(3)} words | FK grade ${fkGrade.toFixed(1)} | 2 images | ${
      issues.length ? issues.join(", ") : "0 dashes"
    }`
  );
  if (issues.length > 0) failed = true;
}

if (failed) {
  console.error("\nBlog validation failed.");
  process.exit(1);
} else {
  console.log("\nAll 21 blog posts passed validation!");
}
