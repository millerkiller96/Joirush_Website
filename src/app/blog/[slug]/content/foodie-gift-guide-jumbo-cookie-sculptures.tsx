import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Shopping for foodie gifts is hard when your friend already owns every pan and mixer. A handmade 3D cookie sculpture is a sweet cookie gift that never goes stale.",
  "quickFactsTitle": "Why Food Lovers Adore Cookie Wall Art",
  "quickFacts": [
    "Hand sculpted in Queens, NY by artist Erynn from light spray foam.",
    "Hangs on one nail or hook right out of the box.",
    "Ships free across the U.S. in safe, padded gift packaging."
  ],
  "section1": {
    "heading": "Top Cookie Gifts by Sweet Tooth Style",
    "paragraphs": [
      "For the classic home baker, the 16 inch Jumbo Chocolate Chip Cookie or Giant Peanut Butter Cookie brings warm golden tones above a coffee bar. It is our top cookie lover gift.",
      "For a fun friend who loves bright rooms, pick the 16 inch Hot Pink M&M Cookie or 14 inch Rainbow Candy Cookie."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Jumbo chocolate chip cookie wall art gift by JOIRUSH",
    "caption": "Our 16 inch Chocolate Chip Cookie is our number one foodie gift for bakers."
  },
  "section2": {
    "heading": "The Ultimate Showstopper Gift",
    "paragraphs": [
      "Want one of the most memorable gifts for foodies? The Cookie Ice Cream Sandwich pairs two chocolate chip cookies with a thick scoop of faux ice cream in the middle.",
      "At checkout, you can also add a second cookie to build a two piece gift set. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      },
      {
        "href": "/blog/gifts-for-bakers-who-have-everything-cookie-wall-art/",
        "label": "Gifts for Bakers Guide"
      }
    ]
  },
  "image2": {
    "src": "/images/products/ice-cream.jpg",
    "alt": "Cookie ice cream sandwich 3D wall art gift by JOIRUSH",
    "caption": "A sweet statement gift for birthdays, holidays, and new homes."
  },
  "section3": {
    "heading": "Ready to Gift With Free U.S. Shipping",
    "paragraphs": [
      "Every JOIRUSH cookie is signed on the back, packed with care, and shipped free in the U.S. so your gift arrives ready to hang."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookie Gifts"
      }
    ]
  },
  "faqs": [
    {
      "question": "Does JOIRUSH charge for shipping on gifts?",
      "answer": "No. Every U.S. order ships free from our Queens, NY studio."
    },
    {
      "question": "Which cookie is the safest gift choice?",
      "answer": "The 16 inch Jumbo Chocolate Chip Cookie ($80) fits almost any kitchen or coffee bar."
    }
  ]
};

export function FoodieGiftGuideSchema() {
  return renderBlogSchema(data);
}

export function FoodieGiftGuideContent() {
  return renderBlogContent(data);
}
