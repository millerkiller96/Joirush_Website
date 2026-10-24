import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "A cookie wall turns a plain kitchen or dining nook into the happiest spot in the house. Here is how to plan a two or three cookie wall in minutes.",
  "quickFactsTitle": "Cookie Wall Plan",
  "quickFacts": [
    "Pick 2 or 3: Hang 2 cookies as a pair, or 3 cookies in a triangle.",
    "Space: Keep 3 to 5 inches of bare wall between each cookie.",
    "Mix sizes: Pair a 16 inch cookie with a 14 inch cookie for fun."
  ],
  "section1": {
    "heading": "Pick Your Star Cookie First",
    "paragraphs": [
      "Start with the cookie that grabs your eye most, like the 16 inch Classic M&M Cookie, Hot Pink M&M Cookie, or Cookie Ice Cream Sandwich.",
      "Hang that piece near the middle of your wall first."
    ],
    "links": [
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Classic M&M Cookie (16 in)"
      },
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie (16 in)"
      }
    ]
  },
  "image1": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy jumbo cookie wall art by JOIRUSH",
    "caption": "Bright candy cookies bring happy color to kitchen walls."
  },
  "section2": {
    "heading": "Buy 4 or More Cookies for 10% Off Each",
    "paragraphs": [
      "Next, pick a second flavor that looks great next to your first one. Pair a bright candy cookie with a warm Classic Chocolate Chip or a 14 inch Rainbow Candy Cookie.",
      "When you tap Buy Now, use the menu with photos to pick a second cookie. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Classic Chocolate Chip (16 in)"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie (14 in)"
      }
    ]
  },
  "image2": {
    "src": "/images/products/pastel-mm.jpg",
    "alt": "Pastel M&M cookie wall art by JOIRUSH",
    "caption": "Mix pastel and classic cookies for a sweet bake shop look."
  },
  "section3": {
    "heading": "Test It on the Table First",
    "paragraphs": [
      "Set your cookies on the table or floor first to see how they look side by side. Once you love the look, hang them 3 to 5 inches apart."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      },
      {
        "href": "/blog/how-to-hang-jumbo-cookie-wall-art/",
        "label": "How to Hang Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "Should I hang two cookies even or slanted?",
      "answer": "Over a dining table, side by side at the same height looks neat. In a corner or coffee bar, hanging one a little higher than the other looks playful."
    },
    {
      "question": "Can I put framed art around my cookies?",
      "answer": "Yes! Round 3D cookies look great next to square picture frames."
    }
  ]
};

export function DopamineDecorSchema() {
  return renderBlogSchema(data);
}

export function DopamineDecorContent() {
  return renderBlogContent(data);
}
