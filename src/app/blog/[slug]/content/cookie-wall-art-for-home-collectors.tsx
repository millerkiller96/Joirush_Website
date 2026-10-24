import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Welcome to our guide to JOIRUSH cookie wall art! Here is all you need to know to pick your first cookie or grow your wall set.",
  "quickFactsTitle": "Quick Buyer Guide",
  "quickFacts": [
    "11 cookies in stock, from $70 to $175.",
    "Every piece is one of a kind, made by Erynn in Daytona Beach, FL.",
    "Made of light spray foam and acrylic paint (for display only).",
    "Pick any second cookie in checkout for 10% off.",
    "Ships in 14 days with free U.S. shipping."
  ],
  "section1": {
    "heading": "How to Pick Your First Cookie",
    "paragraphs": [
      "Most people start in one of two ways: a warm bake shop classic or a bright candy pop.",
      "If your room has wood tables and plain walls, start with the 16 inch Jumbo Chocolate Chip Cookie ($80). If you love bold color, start with the Rainbow Candy Cookie ($70) or Classic M&M Cookie ($80)."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip ($80)"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie ($70)"
      },
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Classic M&M Cookie ($80)"
      }
    ]
  },
  "image1": {
    "src": "/images/products/mm-classic.jpg",
    "alt": "Classic M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Many people pair a candy cookie with a classic chocolate chip."
  },
  "section2": {
    "heading": "How the Second Cookie Deal Works",
    "paragraphs": [
      "Lots of homes hang two or three cookies together. When you tap Buy Now on any cookie, a popup lets you pick any second cookie in our shop from a photo menu at 10% off.",
      "You can get two matching twins or mix two fun flavors!"
    ]
  },
  "image2": {
    "src": "/images/brand/about-1.jpg",
    "alt": "Handmade JOIRUSH jumbo cookie wall art pieces",
    "caption": "Mix and match 14 inch and 16 inch cookies on one wall."
  },
  "section3": {
    "heading": "How to Care for Your Cookies",
    "paragraphs": [
      "Hang your cookies inside away from stove heat and steam. Dust gently with a dry cloth so the colors stay bright for years."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All 11 Cookies"
      },
      {
        "href": "/custom/",
        "label": "Ask for a Custom Cookie"
      }
    ]
  },
  "faqs": [
    {
      "question": "Are two cookies of the same flavor the exact same?",
      "answer": "They match in style and size. Because Erynn shapes and paints each one by hand with no molds, every cookie is one of a kind."
    },
    {
      "question": "Do you sell to businesses or homes?",
      "answer": "We make our cookies for people and home walls, not for businesses."
    }
  ]
};

export function CookieWallArtCollectorsSchema() {
  return renderBlogSchema(data);
}

export function CookieWallArtCollectorsContent() {
  return renderBlogContent(data);
}
