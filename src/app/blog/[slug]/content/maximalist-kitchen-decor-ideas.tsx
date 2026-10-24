import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "A maximalist kitchen is full of color, warmth, and things you love. Adding 3D cookie decor gives your walls bold depth that flat prints cannot match.",
  "quickFactsTitle": "Maximalist Kitchen Wall Rules",
  "quickFacts": [
    "Start your wall with one or two 16 inch 3D food pieces.",
    "Mix warm baked browns with bright pink, yellow, or blue.",
    "Buy 4 or more cookies and get 10% off each cookie."
  ],
  "section1": {
    "heading": "Bring Pop Art Sculpture Into the Kitchen",
    "paragraphs": [
      "The best maximalist kitchen walls mix flat art with 3D sculptural wall art. A round cookie pops 2 to 3 inches off the wall and breaks up square frames.",
      "Hang our 16 inch Hot Pink M&M Cookie or Cookie Ice Cream Sandwich for bold pop art sculpture charm."
    ],
    "links": [
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      },
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      },
      {
        "href": "/kitchen-wall-art/",
        "label": "Shop Kitchen Wall Art"
      }
    ]
  },
  "image1": {
    "src": "/images/products/hot-pink-mm.jpg",
    "alt": "Hot pink M&M cookie maximalist kitchen sculptural wall art by JOIRUSH",
    "caption": "Hot pink dough and candy bits stand out on bold maximalist kitchen walls."
  },
  "section2": {
    "heading": "Layer Kitschy Kitchen Pairings",
    "paragraphs": [
      "Love a cozy kitschy kitchen look? Pair a warm Jumbo Chocolate Chip Cookie with a bright Rainbow Candy Cookie above your table or coffee bar.",
      "Group two or three pieces of cookie decor on your wall. That builds a fun treat wall in minutes."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy cookie kitschy kitchen decor by JOIRUSH",
    "caption": "Mix classic baked tones with rainbow candy colors for a fun wall."
  },
  "section3": {
    "heading": "Light, Renter Friendly, and Easy to Hang",
    "paragraphs": [
      "Each JOIRUSH piece is made from light spray foam in Queens, NY. It weighs 2 to 4 lbs, hangs on one nail, and ships free in the U.S."
    ],
    "links": [
      {
        "href": "/oversized-food-wall-art/",
        "label": "Explore Oversized Food Art"
      },
      {
        "href": "/catalogue/",
        "label": "Browse All 11 Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How many cookies should I hang on a maximalist kitchen wall?",
      "answer": "Two or three cookies in a stack or triangle fill a nook or coffee bar wall with bold 3D depth."
    },
    {
      "question": "How do I clean sculptural wall art in a kitchen?",
      "answer": "Hang your cookie away from stove steam and dust it gently with a dry soft cloth."
    }
  ]
};

export function MaximalistKitchenDecorSchema() {
  return renderBlogSchema(data);
}

export function MaximalistKitchenDecorContent() {
  return renderBlogContent(data);
}
