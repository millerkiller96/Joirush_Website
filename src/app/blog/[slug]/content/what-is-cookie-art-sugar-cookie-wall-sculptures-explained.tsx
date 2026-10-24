import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "When people say cookie art, they used to mean iced cookies you eat at a party. Today, cookie art also means giant 3D cookies you hang on your wall for years!",
  "quickFactsTitle": "Real Cookies vs Wall Cookie Art",
  "quickFacts": [
    "Real iced cookies: 3 to 4 inches wide, made of flour and sugar, eaten in days.",
    "JOIRUSH wall cookie art: 14 to 16 inches wide, made of spray foam and acrylic paint, lasts for years.",
    "For display only: Never molds, crumbles, or brings bugs."
  ],
  "section1": {
    "heading": "Why Turn a Cookie Into Wall Art?",
    "paragraphs": [
      "Cookies make us think of warm kitchens, sweet treats, and happy days. Cookie artist Erynn wanted to save that cozy feeling in a piece of art that never goes bad.",
      "At a big 14 to 16 inch size, every chip and candy bit becomes bold pop art for your home."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/jumbo-pastel-mm-cookie/",
        "label": "Pastel M&M Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Handmade 16 inch chocolate chip cookie wall art by JOIRUSH",
    "caption": "Looks fresh from the oven, but made from light spray foam."
  },
  "section2": {
    "heading": "What Are Art Cookies Made Of?",
    "paragraphs": [
      "Every JOIRUSH piece is shaped by hand from spray foam and painted with acrylics in Daytona Beach, FL. There is zero real food inside.",
      "Each single cookie weighs just 2 to 4 lbs and has a hanger on the back."
    ]
  },
  "image2": {
    "src": "/images/brand/about-2.jpg",
    "alt": "Handmade colorful cookie wall art by cookie artist Erynn",
    "caption": "Every flavor is shaped and painted by hand with no molds."
  },
  "section3": {
    "heading": "Where People Hang Them",
    "paragraphs": [
      "People hang their cookies in kitchens, dining nooks, coffee bars, playrooms, and offices. Hang one star cookie or pair two flavors. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "See All Cookies"
      },
      {
        "href": "/about/",
        "label": "Read Erynn's Story"
      }
    ]
  },
  "faqs": [
    {
      "question": "Can you eat JOIRUSH cookies?",
      "answer": "No! They are 100% wall art made from spray foam and acrylic paint."
    },
    {
      "question": "How long does it take to get my cookie?",
      "answer": "Every cookie is made to order and ships in 14 days with free U.S. shipping."
    }
  ]
};

export function WhatIsCookieArtSchema() {
  return renderBlogSchema(data);
}

export function WhatIsCookieArtContent() {
  return renderBlogContent(data);
}
