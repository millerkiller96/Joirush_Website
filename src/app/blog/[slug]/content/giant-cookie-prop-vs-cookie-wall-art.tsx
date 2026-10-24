import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Want a big fake cookie? Party props and cookie wall art do two very different jobs. Here is how to pick the right one for your home.",
  "quickFactsTitle": "Quick Facts",
  "quickFacts": [
    "Party props use paper board or heavy plastic for one day events.",
    "JOIRUSH cookie wall art is made by hand from spray foam and acrylic paint.",
    "Each wall cookie weighs 2 to 4 lbs and has a hanger on the back.",
    "The ice cream sandwich weighs 4 to 5 lbs.",
    "Every piece is for display only and ships in 14 days with free U.S. shipping."
  ],
  "section1": {
    "heading": "What a Party Prop Does",
    "paragraphs": [
      "A party prop is made to look good from far away in a photo. Flat paper cutouts bend fast. Big plastic statues can weigh 15 pounds and sit on the floor.",
      "Neither one is made to hang on a kitchen wall all year."
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Handmade 16 inch chocolate chip cookie wall art by JOIRUSH",
    "caption": "Real 3D texture up close: spray foam and acrylic paint."
  },
  "section2": {
    "heading": "Why Cookie Wall Art Works at Home",
    "paragraphs": [
      "Cookie artist Erynn shapes each JOIRUSH cookie by hand in Daytona Beach, FL. The baked cracks, golden dough, and shiny chips look real even up close.",
      "Because spray foam is light, a 14 to 16 inch cookie hangs on one small hook just like a picture frame."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      },
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      }
    ]
  },
  "image2": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy jumbo cookie wall art by JOIRUSH",
    "caption": "Bright candy colors that stay bold on your wall for years."
  },
  "section3": {
    "heading": "Which One Should You Buy?",
    "paragraphs": [
      "Pick a paper prop if you only need a one day party sign. Pick handmade cookie wall art if you want a fun piece to hang in your kitchen, nook, or playroom for years."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      },
      {
        "href": "/blog/jumbo-cookie-wall-art-size-guide/",
        "label": "See the Size Guide"
      }
    ]
  },
  "faqs": [
    {
      "question": "Can I hold cookie wall art in party photos first?",
      "answer": "Yes! Many people hold their cookie in birthday photos first. Then they hang it on the wall right after."
    },
    {
      "question": "Are JOIRUSH cookies real food?",
      "answer": "No. They are for display only and made from spray foam and acrylic paint."
    },
    {
      "question": "Can I get two different cookies?",
      "answer": "Yes. Tap Buy Now on any cookie and pick a second cookie from the menu. Buy 4 or more cookies and get 10% off each cookie."
    }
  ]
};

export function GiantCookiePropSchema() {
  return renderBlogSchema(data);
}

export function GiantCookiePropContent() {
  return renderBlogContent(data);
}
