import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Realistic fake food makes everyone look twice and smile. Handmade fake cookies and faux food wall art bring warm baked charm to your home without ever going stale.",
  "quickFactsTitle": "Why Collectors Love Fake Food Art",
  "quickFacts": [
    "Hand sculpted from light spray foam on a sturdy wood base.",
    "Painted with warm golden and cocoa acrylics so it looks real.",
    "Never melts, crumbs, or attracts bugs on your wall."
  ],
  "section1": {
    "heading": "How Erynn Makes Realistic Fake Food",
    "paragraphs": [
      "In her Queens, NY studio, artist Erynn shapes each fake cookie by hand from expanding foam. She paints every golden edge and dark chip with rich acrylic paint.",
      "The result is faux food that looks warm from the oven but weighs only 2 to 4 lbs."
    ],
    "links": [
      {
        "href": "/faux-food-wall-art/",
        "label": "Shop Faux Food Wall Art"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Realistic fake chocolate chip cookie wall art by JOIRUSH",
    "caption": "Hand mixed golden and brown tones make our 16 inch fake cookie look fresh from the oven."
  },
  "section2": {
    "heading": "Best Fake Cookies for Kitchen and Room Walls",
    "paragraphs": [
      "For classic fake food decor above a coffee bar, try the 16 inch Giant Peanut Butter Cookie or Giant Double Chocolate Cookie.",
      "Want a colorful treat? Pick the Rainbow Candy Cookie or bundle 2 or more fake cookies in your cart to save up to 25%."
    ],
    "links": [
      {
        "href": "/product/giant-peanut-butter-cookie/",
        "label": "Giant Peanut Butter Cookie"
      },
      {
        "href": "/product/giant-double-chocolate-cookie/",
        "label": "Giant Double Chocolate Cookie"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/double-choc.jpg",
    "alt": "Giant double chocolate fake cookie wall decor by JOIRUSH",
    "caption": "Deep cocoa dough and glossy chips give real 3D depth to any wall."
  },
  "section3": {
    "heading": "Hangs in Seconds With Free U.S. Shipping",
    "paragraphs": [
      "Every piece of JOIRUSH fake food decor comes with a built in hanger on the back. Hang it on one nail and dust it with a dry cloth."
    ],
    "links": [
      {
        "href": "/oversized-food-wall-art/",
        "label": "Explore Oversized Food Art"
      },
      {
        "href": "/catalogue/",
        "label": "View Full Cookie Menu"
      }
    ]
  },
  "faqs": [
    {
      "question": "Are JOIRUSH fake cookies made with real food?",
      "answer": "No. They are made from 100% foam, wood, and sealed acrylic paint, so they last for years and never spoil."
    },
    {
      "question": "How big are the fake cookies?",
      "answer": "Most of our jumbo cookies are 14 to 16 inches wide and stand 2 to 3 inches off the wall."
    }
  ]
};

export function FakeFoodFakeCookiesSchema() {
  return renderBlogSchema(data);
}

export function FakeFoodFakeCookiesContent() {
  return renderBlogContent(data);
}
