import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Playful kitsch decor brings fun into your home. Giant food art looks best when it is made by hand with real care and detail.",
  "quickFactsTitle": "Why Playful Art Works",
  "quickFacts": [
    "Giant size turns a sweet treat into fun wall art.",
    "Handmade detail keeps fun art looking rich, not cheap.",
    "One or two big pieces are plenty for a whole room."
  ],
  "section1": {
    "heading": "Have Fun With Giant Size",
    "paragraphs": [
      "We all know what a small cookie looks like. When you hang a 16 inch cookie on the kitchen wall, guests stop and smile every time.",
      "Erynn shapes every crumb and chip by hand from spray foam and acrylic paint so it looks fresh from the oven."
    ],
    "links": [
      {
        "href": "/product/jumbo-pastel-mm-cookie/",
        "label": "Jumbo Pastel M&M Cookie"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/pastel-mm.jpg",
    "alt": "Pastel M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Soft pastel candy shells give a sweet, playful look."
  },
  "section2": {
    "heading": "Give Fun Art a Clean Wall",
    "paragraphs": [
      "Playful art stands out best when the spot around it is neat. Hang your cookie over a clean coffee bar, a wood table, or a stack of cookbooks.",
      "That way, your eye goes straight to the cookie."
    ]
  },
  "image2": {
    "src": "/images/products/peanut-butter.jpg",
    "alt": "Giant peanut butter candy cookie wall art by JOIRUSH",
    "caption": "Fork marks and peanut butter candy bits painted by hand."
  },
  "section3": {
    "heading": "Mix Two Flavors in Checkout",
    "paragraphs": [
      "Want a two cookie wall? Tap Buy Now on your favorite cookie and use the dropdown with photos to pick a second cookie. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      },
      {
        "href": "/oversized-food-wall-art/",
        "label": "Oversized Food Wall Art"
      }
    ]
  },
  "faqs": [
    {
      "question": "Will fake food art bring bugs?",
      "answer": "Never. JOIRUSH cookies have zero real food in them. They are 100% spray foam and acrylic paint."
    },
    {
      "question": "Where are JOIRUSH cookies made?",
      "answer": "Every cookie is made to order by Erynn in Daytona Beach, FL, and ships free in the U.S. in 14 days."
    }
  ]
};

export function WhimsicalKitschDecorSchema() {
  return renderBlogSchema(data);
}

export function WhimsicalKitschDecorContent() {
  return renderBlogContent(data);
}
