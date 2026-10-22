import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Shopping for a baker, food lover, or friend who already has every kitchen tool? A handmade giant cookie for their wall is a gift they will love for years.",
  "quickFactsTitle": "Gift Buyer Guide",
  "quickFacts": [
    "Prices: $90 to $220 with free U.S. shipping.",
    "Shipping time: Made to order and ships in 14 days from Daytona Beach, FL.",
    "Pair deal: Buy one for them and add a second cookie for 10% off in checkout.",
    "Ready to hang: Weighs 2 to 4 lbs with a hanger on the back."
  ],
  "section1": {
    "heading": "Best Cookie Gifts for Every Friend",
    "paragraphs": [
      "Not sure which flavor to pick? Match the cookie to their style:"
    ],
    "bullets": [
      "For the baker: 16 inch Jumbo Chocolate Chip Cookie ($100) or 14 inch Mini Chocolate Chip ($90).",
      "For the color lover: Rainbow Candy Cookie ($90) or Hot Pink M&M Cookie ($115).",
      "For the holiday host: Jumbo Christmas Cookie ($100).",
      "For the big statement fan: Cookie Ice Cream Sandwich ($220)."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip ($100)"
      },
      {
        "href": "/product/jumbo-christmas-cookie/",
        "label": "Jumbo Christmas Cookie ($100)"
      }
    ]
  },
  "image1": {
    "src": "/images/products/christmas.jpg",
    "alt": "Jumbo Christmas cookie wall art gift by JOIRUSH",
    "caption": "The Jumbo Christmas Cookie makes a fun holiday gift."
  },
  "section2": {
    "heading": "Why It Beats a Snack Basket",
    "paragraphs": [
      "Real cookies are gone in two days. A spray foam and acrylic cookie hangs in their kitchen for years. They will think of you every time a guest smiles at it."
    ]
  },
  "image2": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Classic chocolate chip jumbo cookie wall art by JOIRUSH",
    "caption": "Our #1 gift pick for new homes, birthdays, and bakers."
  },
  "section3": {
    "heading": "Order 2 Weeks Ahead",
    "paragraphs": [
      "Cookie artist Erynn shapes and paints every piece by hand to order, so allow 14 days for shipping. U.S. shipping is always free!"
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      },
      {
        "href": "/custom/",
        "label": "Ask for a Custom Gift"
      }
    ]
  },
  "faqs": [
    {
      "question": "Will my friend need special tools to hang it?",
      "answer": "No! Every cookie has a hanger on the back and hangs on one regular picture hook or nail."
    },
    {
      "question": "Can I get one for a friend and one for me?",
      "answer": "Yes! When you tap Buy Now, pick your second cookie in the dropdown menu to save 10% on the second piece."
    }
  ]
};

export function FoodieGiftGuideSchema() {
  return renderBlogSchema(data);
}

export function FoodieGiftGuideContent() {
  return renderBlogContent(data);
}
