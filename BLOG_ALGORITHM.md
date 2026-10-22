# JOIRUSH Blog Post Algorithm & Editorial Standard

Every blog post on `joirush.com` must be genuinely useful to a shopper deciding which cookie to buy, where to hang it, or how to style their room. No filler paragraphs or "blog posts for blog post's sake."

All posts are rendered through `src/components/BlogPostTemplate.tsx` (`BlogPostStructuredData`) and enforced automatically by `npm run validate:blog` (`scripts/validate-blog-posts.mjs`) during `npm run build:pages`.

## 1. Length & Readability Rules
* **Word Count:** Strictly **500 words or less** (target **250 to 400 words** total, including FAQ and shared template copy).
* **Reading Level:** **3rd grade reading level** (Flesch-Kincaid Grade Level target **2.0 to 3.5**, enforced max `<= 5.0` in `scripts/validate-blog-posts.mjs`).
  * Keep sentences short (8 to 15 words on average).
  * Prefer simple, everyday 1 and 2 syllable words (`light` instead of `lightweight`, `hand shaped` instead of `hand sculpted`, `art` instead of `sculpture`, `plain` instead of `neutral`, `make` instead of `transform`).
* **No Dashes in Visible Copy:** Never use hyphens (`-`), en dashes (`–`), or em dashes (`—`) anywhere in user-facing text. Write `14 inch`, `3 to 5 inches`, `one of a kind`, and `hand shaped`.

## 2. Mandatory Post Structure (`BlogPostStructuredData`)
Every blog post in `src/app/blog/[slug]/content/*.tsx` follows this exact visual rhythm so text is never a wall of words:
1. **Lead (`lead`):** 2 short sentences answering the reader's core question right away.
2. **Quick Facts Box (`quickFactsTitle` + `quickFacts`):** 3 to 5 bullet points with concrete numbers (inches, pounds, prices, or steps).
3. **Section 1 (`section1`):** Short heading + 1 to 2 short paragraphs (plus optional bullets and product pill links).
4. **Inline Image 1 (`image1`):** Full width `<Image />` with `alt` and a short visible `<figcaption>` (`caption`) breaking up Sections 1 and 2.
5. **Section 2 (`section2`):** Short heading + 1 to 2 short paragraphs (plus optional bullets and product pill links).
6. **Inline Image 2 (`image2`):** Full width `<Image />` with `alt` and a short visible `<figcaption>` (`caption`) breaking up Sections 2 and 3.
7. **Section 3 (`section3`):** Actionable takeaway + links to `/catalogue/` ("Cookies") or specific cookies.
8. **Concise FAQ (`faqs`):** 2 to 3 real customer questions with 1 to 2 sentence answers (automatically outputs `FAQPage` JSON-LD schema).

## 3. Standing Product Facts
* **Materials:** Handmade from spray foam and acrylic paint by cookie artist Erynn in Daytona Beach, FL.
* **Weight:** Single cookies weigh 2 to 4 lbs; the Cookie Ice Cream Sandwich weighs 4 to 5 lbs.
* **Sizes & Prices:** 11 single cookies in stock, 14 inches to 16 inches wide, priced from $90 to $220.
* **Second Cookie Deal:** Customers can pick any second cookie from the dropdown menu with photos in checkout for 10% off the second cookie.
* **Shipping:** Made to order and ships in 14 days with free U.S. shipping.
* **Use:** Decorative wall art for homes and individuals only (not edible, not sold to businesses).
