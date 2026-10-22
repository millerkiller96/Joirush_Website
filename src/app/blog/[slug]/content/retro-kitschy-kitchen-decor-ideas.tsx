import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Love the look of an old 1950s diner or bake shop? You can get that happy vintage kitchen look without changing a single cabinet.",
  "quickFactsTitle": "Retro Kitchen Recipe",
  "quickFacts": [
    "Colors: Cherry red, mint green, butter yellow, soft pink, and brown.",
    "Patterns: Checked dish towels, striped mugs, and round wall art.",
    "Star piece: A 3D Cookie Ice Cream Sandwich or Classic M&M Cookie."
  ],
  "section1": {
    "heading": "Make the Wall Feel Like an Ice Cream Shop",
    "paragraphs": [
      "Old diners and ice cream shops always had big, fun food signs on the wall. Our 16 inch tall Cookie Ice Cream Sandwich brings that fun look home.",
      "With thick white ice cream between two chocolate chip cookies, it stands 5 inches off the wall."
    ],
    "links": [
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      },
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Classic M&M Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/ice-cream.jpg",
    "alt": "Jumbo cookie ice cream sandwich wall art by JOIRUSH",
    "caption": "Our 16 inch Cookie Ice Cream Sandwich is the best retro diner star piece."
  },
  "section2": {
    "heading": "Fast Retro Swaps Under 10 Minutes",
    "paragraphs": [
      "Pair your cookie with a checked dish towel, a retro toaster, or a glass cake stand on the counter. Those small touches turn a plain white kitchen into a cozy diner nook."
    ]
  },
  "image2": {
    "src": "/images/products/mm-classic.jpg",
    "alt": "Classic M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Bright candy colors match red, yellow, and blue dishes."
  },
  "section3": {
    "heading": "Made by Hand in the USA",
    "paragraphs": [
      "Cookie artist Erynn shapes and paints every piece by hand in Daytona Beach, FL. Your order ships in 14 days with free U.S. shipping."
    ],
    "links": [
      {
        "href": "/kitchen-wall-art/",
        "label": "Explore Kitchen Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "See All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How heavy is the Cookie Ice Cream Sandwich?",
      "answer": "It weighs 4 to 5 lbs and has a hanger built into the back."
    },
    {
      "question": "Can I pair two cookies for a diner booth wall?",
      "answer": "Yes! Pick any second cookie in the checkout popup to get 10% off your second piece."
    }
  ]
};

export function RetroKitchenSchema() {
  return renderBlogSchema(data);
}

export function RetroKitchenContent() {
  return renderBlogContent(data);
}
