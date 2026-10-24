import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Not sure which cookie size fits your wall? Here are the real sizes and weights for every JOIRUSH cookie so you can pick in two minutes.",
  "quickFactsTitle": "Every Size at a Glance",
  "quickFacts": [
    "14 inch cookies (2 to 3 lbs): Mini Chocolate Chip ($70) and Rainbow Candy ($70).",
    "16 inch cookies (2 to 4 lbs): Chocolate Chip ($80), Peanut Butter ($80), Christmas ($80), Double Chocolate ($80), White Chocolate ($80), Classic M&M ($80), Pastel M&M ($80), and Hot Pink M&M ($80).",
    "16 inch tall x 5 inch thick (4 to 5 lbs): Cookie Ice Cream Sandwich ($175).",
    "Tip: Hold a 16 inch pizza box on your wall to see how big a 16 inch cookie looks."
  ],
  "section1": {
    "heading": "When to Pick a 14 Inch Cookie",
    "paragraphs": [
      "A 14 inch cookie is as wide as a big serving plate. It fits skinny walls between cabinets, next to a window, or right over a coffee pot.",
      "It is also great when you want to hang two cookies side by side in a small nook."
    ],
    "links": [
      {
        "href": "/product/mini-jumbo-chocolate-chip-cookie/",
        "label": "Mini Jumbo Chocolate Chip (14 in)"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie (14 in)"
      }
    ]
  },
  "image1": {
    "src": "/images/products/mini-choc.jpg",
    "alt": "14 inch mini jumbo chocolate chip cookie wall art by JOIRUSH",
    "caption": "The 14 inch size fits skinny kitchen walls and coffee bars."
  },
  "section2": {
    "heading": "When to Pick a 16 Inch Cookie",
    "paragraphs": [
      "Our 16 inch cookies are our top sellers. They fill an open wall over a kitchen table, a bar cart, or a door with ease.",
      "Want a bigger look? Pick a second cookie in checkout and hang the pair 4 inches apart. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "16 Inch Chocolate Chip"
      },
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "16 Inch Classic M&M"
      }
    ]
  },
  "image2": {
    "src": "/images/products/ice-cream.jpg",
    "alt": "16 inch tall cookie ice cream sandwich wall art by JOIRUSH",
    "caption": "The Cookie Ice Cream Sandwich is 5 inches thick for big 3D pop."
  },
  "section3": {
    "heading": "How Much Space to Leave Around It",
    "paragraphs": [
      "Leave at least 3 to 4 inches of bare wall all around your cookie. That open space makes the round shape pop."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      },
      {
        "href": "/blog/how-to-hang-jumbo-cookie-wall-art/",
        "label": "How to Hang Your Cookie"
      }
    ]
  },
  "faqs": [
    {
      "question": "Why does the size vary a tiny bit?",
      "answer": "Erynn shapes every cookie by hand from spray foam with no molds. Each one can vary by about half an inch."
    },
    {
      "question": "How heavy is the biggest piece?",
      "answer": "The Cookie Ice Cream Sandwich weighs 4 to 5 lbs. All single cookies weigh 2 to 4 lbs."
    }
  ]
};

export function CookieSizeGuideSchema() {
  return renderBlogSchema(data);
}

export function CookieSizeGuideContent() {
  return renderBlogContent(data);
}
