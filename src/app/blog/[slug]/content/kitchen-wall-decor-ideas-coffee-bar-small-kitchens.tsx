import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Kitchens are full of cabinets, leaving only small wall spots for art. Here is how to pick and hang a cookie in small kitchen spaces.",
  "quickFactsTitle": "Best Kitchen Spots",
  "quickFacts": [
    "Above the coffee bar: Hang a 14 inch cookie 6 to 8 inches over your coffee pot.",
    "Skinny wall between windows: Use a 14 inch cookie or stack two up and down.",
    "Breakfast nook: Hang a 16 inch cookie or a two cookie pair at eye level.",
    "Safety rule: Keep away from heat and water right over the stove and sink."
  ],
  "section1": {
    "heading": "1. Over the Coffee Bar",
    "paragraphs": [
      "A coffee spot feels like a real bake shop when you hang a cookie right over the mugs. Our 14 inch Mini Jumbo Chocolate Chip Cookie fits right over a coffee pot."
    ],
    "links": [
      {
        "href": "/product/mini-jumbo-chocolate-chip-cookie/",
        "label": "14 Inch Mini Chocolate Chip"
      }
    ]
  },
  "image1": {
    "src": "/images/products/mini-choc.jpg",
    "alt": "14 inch mini jumbo chocolate chip cookie wall art by JOIRUSH",
    "caption": "At 14 inches wide, the Mini Jumbo Chocolate Chip fits right over a coffee bar."
  },
  "section2": {
    "heading": "2. Skinny Walls and Rental Kitchens",
    "paragraphs": [
      "Have a narrow strip of wall next to the fridge? Round art fits much better there than a wide box frame.",
      "Because each cookie weighs 2 to 4 lbs, one small hook holds it up with a tiny pin hole."
    ],
    "links": [
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "14 Inch Rainbow Candy Cookie"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "16 Inch Chocolate Chip Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "16 inch chocolate chip cookie wall art by JOIRUSH",
    "caption": "Hang a 16 inch classic in your dining nook."
  },
  "section3": {
    "heading": "How to Dust Kitchen Wall Art",
    "paragraphs": [
      "Wipe your cookie gently with a dry soft cloth or duster now and then. Do not soak it in water or use strong sprays."
    ],
    "links": [
      {
        "href": "/kitchen-wall-art/",
        "label": "See All Kitchen Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How high over a coffee bar should I hang my cookie?",
      "answer": "Hang the bottom edge of the cookie about 6 to 8 inches above the tallest thing on your counter."
    },
    {
      "question": "Can I hang it above the stove?",
      "answer": "No. Keep it on a wall away from stove heat, steam, and cooking oil."
    }
  ]
};

export function KitchenWallDecorSpotsSchema() {
  return renderBlogSchema(data);
}

export function KitchenWallDecorSpotsContent() {
  return renderBlogContent(data);
}
