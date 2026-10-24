import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Kids love big, bright art, and parents want wall art that is light and lasts for years. A foam cookie checks both boxes.",
  "quickFactsTitle": "Playroom Parent Guide",
  "quickFacts": [
    "Light weight: 2 to 4 lbs per cookie (no heavy glass frames).",
    "Strong finish: Sealed acrylic paint over solid spray foam.",
    "Hang height: Hang high up out of reach over a desk or book nook.",
    "Not a toy: For wall display only, not real food."
  ],
  "section1": {
    "heading": "Why Foam Beats Glass in Kids' Rooms",
    "paragraphs": [
      "Heavy glass frames can be a worry in a busy playroom. JOIRUSH cookies are made from light spray foam with no glass at all.",
      "Hung up high on a wall hook, they add big color and fun."
    ],
    "links": [
      {
        "href": "/product/giant-peanut-butter-cookie/",
        "label": "Giant Peanut Butter Cookie"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/peanut-butter.jpg",
    "alt": "Giant peanut butter candy cookie wall art by JOIRUSH",
    "caption": "Bright candy bits make kids and grownups smile."
  },
  "section2": {
    "heading": "Art That Grows With Your Kid",
    "paragraphs": [
      "Kids grow out of baby posters fast. A cool 3D cookie works in a baby room, a big kid reading spot, and even a teen room or dorm."
    ],
    "links": [
      {
        "href": "/product/jumbo-pastel-mm-cookie/",
        "label": "Pastel M&M Cookie"
      },
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/pastel-mm.jpg",
    "alt": "Pastel M&M cookie wall art by JOIRUSH",
    "caption": "The Pastel M&M Cookie is a top pick for kids' rooms."
  },
  "section3": {
    "heading": "Pick Two Flavors in Checkout",
    "paragraphs": [
      "Do two kids share a room? Let each kid pick a cookie! When you tap Buy Now, pick the second cookie from the menu. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "Are JOIRUSH cookies toys?",
      "answer": "No. They are wall art meant to hang high on the wall out of reach of small kids."
    },
    {
      "question": "What if it gets dusty?",
      "answer": "Just wipe it gently with a dry, soft duster."
    }
  ]
};

export function DopaminePlayroomSchema() {
  return renderBlogSchema(data);
}

export function DopaminePlayroomContent() {
  return renderBlogContent(data);
}
