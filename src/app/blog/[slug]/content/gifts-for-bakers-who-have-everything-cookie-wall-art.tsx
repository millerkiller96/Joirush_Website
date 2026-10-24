import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Shopping for gifts for bakers is hard when they own every pan and whisk. Handmade 3D cookie art gives them sweet baking decor they do not have yet.",
  "quickFactsTitle": "Why Bakers Love 3D Cookie Gifts",
  "quickFacts": [
    "Hand sculpted in Queens, NY by artist Erynn from light foam.",
    "Looks like a warm 16 inch cookie fresh from the oven.",
    "Weighs 2 to 4 lbs and hangs on one nail with free U.S. shipping."
  ],
  "section1": {
    "heading": "A Gift for a Baker Who Owns Every Tool",
    "paragraphs": [
      "Most baker gifts are tools they already keep in a drawer. A giant 3D cookie is a fun piece of art for their kitchen wall or coffee bar.",
      "Our 16 inch Jumbo Chocolate Chip Cookie and Giant Peanut Butter Cookie are our top cookie gifts for home bakers."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/giant-peanut-butter-cookie/",
        "label": "Giant Peanut Butter Cookie"
      },
      {
        "href": "/kitchen-wall-art/",
        "label": "Shop Kitchen & Baking Decor"
      }
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Jumbo chocolate chip cookie wall art gift for baker by JOIRUSH",
    "caption": "Golden baked dough and dark chips make this our top cookie gift for home bakers."
  },
  "section2": {
    "heading": "Sweet Choices for Bright Kitchens",
    "paragraphs": [
      "Does your friend bake bright treats with sprinkles and frosting? Pick the 14 inch Rainbow Candy Cookie or 16 inch Pastel M&M Cookie for their wall.",
      "You can also add a second cookie at checkout, and if you buy 4 or more cookies you get 10% off each cookie. That makes a sweet two piece baking decor gift set."
    ],
    "links": [
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      },
      {
        "href": "/product/jumbo-pastel-mm-cookie/",
        "label": "Jumbo Pastel M&M Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/peanut-butter.jpg",
    "alt": "Giant peanut butter cookie 3D baking decor gift by JOIRUSH",
    "caption": "Classic fork marks on the Peanut Butter Cookie make every home baker smile."
  },
  "section3": {
    "heading": "Signed and Shipped Free in the U.S.",
    "paragraphs": [
      "Each JOIRUSH cookie gift is signed on the back. It ships free in the U.S. in safe gift wrap and hangs in five minutes."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All Cookie Gifts"
      },
      {
        "href": "/blog/foodie-gift-guide-jumbo-cookie-sculptures/",
        "label": "Read Foodie Gift Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "What is the best gift for a baker who has everything?",
      "answer": "Our 16 inch Jumbo Chocolate Chip Cookie ($80) is warm baking decor that fits any kitchen wall."
    },
    {
      "question": "How does a baker hang the cookie on the wall?",
      "answer": "Every cookie has a built in hanger on the back and hangs on one standard nail or hook."
    }
  ]
};

export function GiftsForBakersSchema() {
  return renderBlogSchema(data);
}

export function GiftsForBakersContent() {
  return renderBlogContent(data);
}
