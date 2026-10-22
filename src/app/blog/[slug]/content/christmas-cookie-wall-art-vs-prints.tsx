import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Flat holiday posters get lost behind lights and wreaths. A 3D Christmas cookie brings real texture and bright candy color to your kitchen wall.",
  "quickFactsTitle": "Holiday Cookie Facts",
  "quickFacts": [
    "Size: 16 inches wide and 2 to 4 lbs.",
    "Material: Handmade spray foam and acrylic paint by cookie artist Erynn.",
    "Hanger: Built in on the back for one nail or hook.",
    "Shipping: Ships in 14 days from Daytona Beach, FL, with free U.S. shipping."
  ],
  "section1": {
    "heading": "Why 3D Beats a Flat Poster",
    "paragraphs": [
      "Paper posters shine too much under tree lights and look flat on the wall. A 3D cookie catches warm light and makes real shadows.",
      "Best of all, it never goes bad and leaves zero crumbs."
    ],
    "links": [
      {
        "href": "/product/jumbo-christmas-cookie/",
        "label": "Shop the Jumbo Christmas Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/christmas.jpg",
    "alt": "Jumbo Christmas cookie wall art by JOIRUSH",
    "caption": "Red and green candy bits shaped and painted by hand."
  },
  "section2": {
    "heading": "Best Spots to Hang Your Christmas Cookie",
    "paragraphs": [
      "Hang it over your hot cocoa bar, next to the pantry door, or right above the kitchen table. In January, pack it with your tree decor or swap a chocolate chip cookie onto the same hook."
    ],
    "bullets": [
      "Above the hot cocoa or coffee bar.",
      "In the dining nook with a red bow above the hook.",
      "Next to a Classic Chocolate Chip cookie for a two cookie wall."
    ]
  },
  "image2": {
    "src": "/images/products/white-choc.jpg",
    "alt": "White chocolate chip jumbo cookie wall art by JOIRUSH",
    "caption": "Pair your Christmas cookie with a warm white chocolate chip cookie."
  },
  "section3": {
    "heading": "Order Early for Gifts",
    "paragraphs": [
      "Every cookie is made to order by hand, so allow 14 days for shipping. You can also pick a second cookie in checkout for 10% off."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "See All Cookies"
      },
      {
        "href": "/blog/foodie-gift-guide-jumbo-cookie-sculptures/",
        "label": "Read the Gift Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "How do I store my Christmas cookie after winter?",
      "answer": "Wrap it in soft paper or bubble wrap and set it in a closet at room temp. Do not stack heavy boxes on top."
    },
    {
      "question": "Can I hang it right over the stove?",
      "answer": "No. Hang it away from stove heat and steam so the paint stays bright for years."
    }
  ]
};

export function ChristmasCookieWallArtSchema() {
  return renderBlogSchema(data);
}

export function ChristmasCookieWallArtContent() {
  return renderBlogContent(data);
}
