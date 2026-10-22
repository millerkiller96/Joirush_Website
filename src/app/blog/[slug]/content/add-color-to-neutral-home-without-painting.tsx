import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Have white, tan, or gray walls you cannot paint? You can warm up a plain room in minutes with 3D wall art and a few small color pops.",
  "quickFactsTitle": "Easy Color Tips",
  "quickFacts": [
    "No paint needed: One 16 inch cookie hangs on one small hook.",
    "Warm up plain walls: Golden cookie dough warms up cold gray or white walls.",
    "Easy to move: Weighs 2 to 4 lbs and packs right into a box when you move."
  ],
  "section1": {
    "heading": "Why Golden Dough Warms Up White Walls",
    "paragraphs": [
      "All white rooms can feel a bit cold. Hanging a warm, golden brown cookie adds cozy bake shop color and real 3D shadow with zero wall paint.",
      "Want a soft look? Start with the White Chocolate Chip or Classic Chocolate Chip cookie."
    ],
    "links": [
      {
        "href": "/product/jumbo-white-chocolate-chip-cookie/",
        "label": "White Chocolate Chip Cookie"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Classic Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/white-choc.jpg",
    "alt": "White chocolate chip jumbo cookie wall art by JOIRUSH",
    "caption": "Warm golden dough and creamy chips warm up plain white walls."
  },
  "section2": {
    "heading": "Want Brighter Color?",
    "paragraphs": [
      "Plain walls are the best spot for candy colors because nothing clashes with them. A Rainbow Candy Cookie or Pastel M&M Cookie pops right off a tan or gray wall."
    ],
    "links": [
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      },
      {
        "href": "/product/jumbo-pastel-mm-cookie/",
        "label": "Pastel M&M Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy jumbo cookie wall art by JOIRUSH",
    "caption": "Candy colors stand out best on calm plain walls."
  },
  "section3": {
    "heading": "Match One Color on the Table",
    "paragraphs": [
      "After you hang your cookie, put one matching item nearby, like a pink candle or a blue bowl. That ties the whole wall into your room."
    ],
    "links": [
      {
        "href": "/colorful-wall-art/",
        "label": "Browse Colorful Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "Will hanging a cookie hurt rental walls?",
      "answer": "Each cookie weighs only 2 to 4 lbs. A small hook or nail leaves only a tiny pin hole that is easy to fill when you move."
    },
    {
      "question": "Can I ask for custom colors to match my room?",
      "answer": "Yes! Visit our Custom page to ask Erynn for your own candy colors."
    }
  ]
};

export function NeutralHomeColorSchema() {
  return renderBlogSchema(data);
}

export function NeutralHomeColorContent() {
  return renderBlogContent(data);
}
