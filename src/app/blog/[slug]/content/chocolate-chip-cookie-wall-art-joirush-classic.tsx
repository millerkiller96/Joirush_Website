import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Every artist has one piece that started it all. For cookie artist Erynn, that piece is the 16 inch Jumbo Chocolate Chip Cookie.",
  "quickFactsTitle": "The First Classic",
  "quickFacts": [
    "Size & Weight: 16 inches wide, 2 to 4 lbs.",
    "Price: $80 with free U.S. shipping (or $70 for the 14 inch Mini size).",
    "Made from: Hand shaped spray foam and acrylic paint.",
    "Made in: Daytona Beach, FL, and ships in 14 days."
  ],
  "section1": {
    "heading": "Why Chocolate Chip Came First",
    "paragraphs": [
      "We all love the smell of warm chocolate chip cookies fresh from the oven. Erynn wanted to turn that cozy, happy feeling into wall art that makes you smile every day.",
      "She tested ways to get real baked cracks and shiny chips without heavy clay. That is how she found her spray foam method."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "16 Inch Jumbo Chocolate Chip ($80)"
      },
      {
        "href": "/product/mini-jumbo-chocolate-chip-cookie/",
        "label": "14 Inch Mini Chocolate Chip ($70)"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "16 inch jumbo chocolate chip cookie wall art by JOIRUSH",
    "caption": "The cookie that started JOIRUSH: 16 inches of golden dough and dark chips."
  },
  "section2": {
    "heading": "How Erynn Paints the Baked Glow",
    "paragraphs": [
      "A real cookie is not just one flat brown shade. It has light golden spots, toasted brown edges, and dark chocolate chips.",
      "Erynn paints soft layers of acrylic paint onto the dry foam so the cookie looks fresh from the oven."
    ]
  },
  "image2": {
    "src": "/images/brand/erynn.jpg",
    "alt": "Cookie artist Erynn in her studio with handmade cookie wall art",
    "caption": "Over 138 happy homes hang Erynn's handmade cookies."
  },
  "section3": {
    "heading": "Still Our #1 Bestseller",
    "paragraphs": [
      "Hung solo over a coffee bar or paired with a bright M&M cookie in a dining nook, the Classic Chocolate Chip fits right in."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "See All Cookies"
      },
      {
        "href": "/about/",
        "label": "More About Erynn"
      }
    ]
  },
  "faqs": [
    {
      "question": "Should I get the 16 inch or 14 inch chocolate chip cookie?",
      "answer": "Pick the 16 inch ($80) for open walls and dining tables. Pick the 14 inch ($70) for skinny walls or small coffee bars."
    },
    {
      "question": "Can I pair the 16 inch and 14 inch together?",
      "answer": "Yes! Tap Buy Now on the 16 inch cookie and pick the 14 inch Mini Chocolate Chip in the menu for 10% off."
    }
  ]
};

export function ChocolateChipStorySchema() {
  return renderBlogSchema(data);
}

export function ChocolateChipStoryContent() {
  return renderBlogContent(data);
}
