import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Most holiday wall signs look the same and feel flat. A 3D cookie brings warm christmas kitchen decor to your home.",
  "quickFactsTitle": "3D Holiday Cookie vs. Flat Signs",
  "quickFacts": [
    "Stands 2 to 3 inches off the wall with real baked texture.",
    "Weighs only 2 to 4 lbs and hangs on a single nail or hook.",
    "Stores flat in a box when the holidays end."
  ],
  "section1": {
    "heading": "Why 3D Holiday Art Beats Flat Prints",
    "paragraphs": [
      "Flat wood signs and paper prints fade into the wall. A 16 inch 3D cookie pops off the wall and catches warm tree lights.",
      "Our Jumbo Christmas Cookie has golden dough, dark chips, and red and green candy bits. It looks sweet next to gingerbread decor."
    ],
    "links": [
      {
        "href": "/product/jumbo-christmas-cookie/",
        "label": "Shop Jumbo Christmas Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/christmas.jpg",
    "alt": "Jumbo Christmas cookie 3D wall art with red and green candies by JOIRUSH",
    "caption": "Red and green candy bits make the 16 inch Christmas Cookie a star."
  },
  "section2": {
    "heading": "Build a Holiday Cocoa Bar Wall",
    "paragraphs": [
      "Hang the Jumbo Christmas Cookie above your cocoa bar or stove. It fits right in with your gingerbread decor. Want a bigger display? Buy 4 or more cookies and get 10% off each cookie.",
      "Pair it with the White Chocolate Chip Cookie or Classic Chocolate Chip Cookie for a sweet winter wall."
    ],
    "links": [
      {
        "href": "/product/jumbo-white-chocolate-chip-cookie/",
        "label": "Jumbo White Chocolate Chip Cookie"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/white-choc.jpg",
    "alt": "Jumbo white chocolate chip cookie wall art by JOIRUSH",
    "caption": "White chocolate chips pair well with red and green decor."
  },
  "section3": {
    "heading": "Easy to Hang and Store",
    "paragraphs": [
      "When the season ends, lift the cookie off its hook. Wrap it in soft paper and store it in a box for next year."
    ],
    "links": [
      {
        "href": "/kitchen-wall-art/",
        "label": "Explore Kitchen Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How big is the Jumbo Christmas Cookie?",
      "answer": "It is 16 inches wide, about 2 to 3 inches thick, and weighs 2 to 4 lbs."
    },
    {
      "question": "Can I leave cookie art up all year?",
      "answer": "Yes. Many folks keep Chocolate Chip up all year and swap in the Christmas Cookie in winter."
    }
  ]
};

export function ChristmasCookieWallArtSchema() {
  return renderBlogSchema(data);
}

export function ChristmasCookieWallArtContent() {
  return renderBlogContent(data);
}
