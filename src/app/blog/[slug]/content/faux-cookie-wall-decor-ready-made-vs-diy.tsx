import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Thinking about making a big DIY cookie from paper board or salt dough? Before you buy craft supplies, see how DIY compares to a handmade spray foam cookie.",
  "quickFactsTitle": "Ready Made vs DIY",
  "quickFacts": [
    "Salt dough or clay: Very heavy, cracks fast, and can soak up damp air.",
    "Paper board and wall paste: Can bend or flake off the wall.",
    "JOIRUSH spray foam: 2 to 4 lbs, sealed acrylic paint, ready to hang.",
    "Cost: Craft supplies for one DIY often cost $60 to $90 plus hours of mess."
  ],
  "section1": {
    "heading": "Where DIY Giant Cookies Have Trouble",
    "paragraphs": [
      "Craft videos often use salt dough, clay, or wall paste on cardboard. At 16 inches wide, clay gets too heavy for a wall hook. Wall paste often cracks when cardboard bends.",
      "Making raw foam look like golden baked dough also takes many layers of paint."
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Handmade spray foam chocolate chip cookie wall art by JOIRUSH",
    "caption": "Rich acrylic paint and sealed spray foam hold up for years."
  },
  "section2": {
    "heading": "Why People Pick Ready Made Cookie Art",
    "paragraphs": [
      "Cookie artist Erynn has made hundreds of cookies over 3+ years with a 5.0 star rating. Every piece arrives dry, painted, sealed, and ready with a back hanger.",
      "You just open the box and hang it on one nail in five minutes."
    ],
    "links": [
      {
        "href": "/product/mini-jumbo-chocolate-chip-cookie/",
        "label": "Mini Chocolate Chip ($70)"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie ($70)"
      }
    ]
  },
  "image2": {
    "src": "/images/products/peanut-butter.jpg",
    "alt": "Giant peanut butter cookie wall art by JOIRUSH",
    "caption": "Ready to hang out of the box with free U.S. shipping."
  },
  "section3": {
    "heading": "Want Custom Colors With Zero Mess?",
    "paragraphs": [
      "If you wanted to DIY just to get your own colors, you can ask Erynn for a custom cookie! Or pair any two cookies in checkout for 10% off the second one."
    ],
    "links": [
      {
        "href": "/custom/",
        "label": "Request a Custom Cookie"
      },
      {
        "href": "/faux-food-wall-art/",
        "label": "Shop Faux Food Wall Art"
      },
      {
        "href": "/blog/fake-food-and-fake-cookies-for-wall-decor/",
        "label": "Fake Food & Fake Cookies Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "How long will a JOIRUSH cookie last?",
      "answer": "Hung inside away from stove heat and water, your sealed spray foam and acrylic cookie will last for years."
    },
    {
      "question": "How much do JOIRUSH cookies cost?",
      "answer": "Prices run from $70 to $175 with free U.S. shipping."
    }
  ]
};

export function FauxCookieWallDecorSchema() {
  return renderBlogSchema(data);
}

export function FauxCookieWallDecorContent() {
  return renderBlogContent(data);
}
