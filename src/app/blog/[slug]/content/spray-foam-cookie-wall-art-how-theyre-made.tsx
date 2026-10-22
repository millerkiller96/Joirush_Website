import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "How can a 16 inch cookie look fresh from the oven and still weigh only 2 to 4 pounds? Here is how cookie artist Erynn makes every JOIRUSH cookie by hand.",
  "quickFactsTitle": "Inside the Studio",
  "quickFacts": [
    "Artist: Made by hand by Erynn in Daytona Beach, FL.",
    "Base: Spray foam shaped by hand with no molds.",
    "Finish: Rich acrylic paint and a clear top coat.",
    "Weight: 2 to 4 lbs per cookie (4 to 5 lbs for the ice cream sandwich).",
    "Shipping: Made to order and ships in 14 days with free U.S. shipping."
  ],
  "section1": {
    "heading": "Step 1: Shaping the Foam by Hand",
    "paragraphs": [
      "Every cookie starts as soft spray foam. As the foam puffs up and dries, it makes tiny air pockets and cracks, just like real dough in an oven.",
      "Erynn shapes each piece by hand with no mold, so no two cookies are ever the same."
    ]
  },
  "image1": {
    "src": "/images/brand/erynn.jpg",
    "alt": "Cookie artist Erynn holding handmade jumbo cookie wall art in her studio",
    "caption": "Cookie artist Erynn makes every piece by hand in Daytona Beach, FL."
  },
  "section2": {
    "heading": "Step 2: Painting Every Crumb and Chip",
    "paragraphs": [
      "Once dry, Erynn paints layers of warm golden brown, toasted edges, and dark chips or bright candy shells with acrylic paint.",
      "Last, each piece gets a clear seal coat and a strong hanger on the back."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Jumbo M&M Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Close up of handmade spray foam chocolate chip cookie wall art by JOIRUSH",
    "caption": "Layers of acrylic paint give the dough its warm, baked look."
  },
  "section3": {
    "heading": "Why Spray Foam Beats Heavy Plaster",
    "paragraphs": [
      "Plaster or resin art this big can weigh 15 pounds and crack if bumped. Dry spray foam is tough, stays under 4 pounds for single cookies, and hangs on one nail."
    ],
    "links": [
      {
        "href": "/about/",
        "label": "Meet Erynn"
      },
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "Does spray foam smell or flake?",
      "answer": "No. Once dry, painted, and sealed in our shop, the foam has no smell and stays solid for years."
    },
    {
      "question": "Who buys JOIRUSH cookies?",
      "answer": "JOIRUSH cookies are made for people to hang in their homes, not for businesses."
    }
  ]
};

export function SprayFoamCookieWallArtSchema() {
  return renderBlogSchema(data);
}

export function SprayFoamCookieWallArtContent() {
  return renderBlogContent(data);
}
