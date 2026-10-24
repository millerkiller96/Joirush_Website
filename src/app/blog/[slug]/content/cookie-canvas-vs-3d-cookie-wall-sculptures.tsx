import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Looking for a cookie canvas for your kitchen? Before you buy a flat canvas print, see why people hang 3D foam cookies instead.",
  "quickFactsTitle": "Flat Canvas vs 3D Cookie",
  "quickFacts": [
    "Shape: A flat canvas is a square box; a 3D cookie is round like a real cookie.",
    "Texture: Real raised chips and candy vs flat ink.",
    "Hanging: Both weigh 2 to 4 lbs and hang on one small hook."
  ],
  "section1": {
    "heading": "What a Flat Canvas Misses",
    "paragraphs": [
      "A flat canvas is just a photo stretched over wood bars. From across the room, it looks like any other flat poster.",
      "A 3D cookie is the art itself. There is no box frame around the cookie."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "3D chocolate chip cookie wall art by JOIRUSH",
    "caption": "No frame needed: the round 3D cookie sits right on your wall."
  },
  "section2": {
    "heading": "Real Shadows and Baked Texture",
    "paragraphs": [
      "Erynn shapes every cookie from spray foam and paints it with acrylics by hand. The raised chips and candy bits catch real sun in the day and warm lamp light at night."
    ],
    "links": [
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Jumbo M&M Cookie"
      },
      {
        "href": "/product/jumbo-white-chocolate-chip-cookie/",
        "label": "White Chocolate Chip Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/mm-classic.jpg",
    "alt": "3D M&M candy cookie wall art by JOIRUSH",
    "caption": "Shiny 3D candy shells pop right off the golden dough."
  },
  "section3": {
    "heading": "Just as Easy to Hang as a Canvas",
    "paragraphs": [
      "If you can hang a canvas print, you can hang a JOIRUSH cookie. Each one has a hanger on the back and ships free in the U.S. in 14 days."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      },
      {
        "href": "/blog/how-to-hang-jumbo-cookie-wall-art/",
        "label": "How to Hang Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "Does a 3D cookie stick out too far in a hall?",
      "answer": "Single cookies are only about 2 to 3 inches thick, so they sit neat and close to the wall."
    },
    {
      "question": "Can I buy two cookies together?",
      "answer": "Yes! Tap Buy Now on any cookie and pick a second cookie in the menu. Buy 4 or more cookies and get 10% off each cookie."
    }
  ]
};

export function CookieCanvasVs3DSchema() {
  return renderBlogSchema(data);
}

export function CookieCanvasVs3DContent() {
  return renderBlogContent(data);
}
