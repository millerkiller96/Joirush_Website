import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Nothing makes a room feel happier than sweet treats on the wall. Fake ice cream and candy wall art turn plain rooms into fun spaces.",
  "quickFactsTitle": "Sweet Decor Highlights",
  "quickFacts": [
    "3D faux ice cream and candy shells that never melt or fade.",
    "Light foam build (2 to 5 lbs) hangs on one wall hook.",
    "Made and painted by hand in Queens, NY with free U.S. shipping."
  ],
  "section1": {
    "heading": "Fake Ice Cream Wall Art That Never Melts",
    "paragraphs": [
      "Our Cookie Ice Cream Sandwich is our star piece of ice cream wall art. It stacks two dark chip cookies around a thick scoop of swirled fake ice cream.",
      "Hang this sweet ice cream decor in your kitchen, dining nook, or room for a quick smile."
    ],
    "links": [
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      },
      {
        "href": "/faux-food-wall-art/",
        "label": "Shop Faux Food Wall Art"
      }
    ]
  },
  "image1": {
    "src": "/images/products/ice-cream.jpg",
    "alt": "Cookie ice cream sandwich fake ice cream wall art by JOIRUSH",
    "caption": "Two chip cookies and a thick scoop of faux ice cream make a bold 3D star piece."
  },
  "section2": {
    "heading": "Bright Candy Wall Art for Any Room",
    "paragraphs": [
      "Love bright candy decor? Our 14 inch Rainbow Candy Cookie and 16 inch Hot Pink M&M Cookie pack shiny candy colors onto warm baked dough.",
      "Mix and match two or more pieces of sweet decor in your cart. Buy 4 or more cookies and get 10% off each cookie."
    ],
    "links": [
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      },
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Jumbo M&M Cookie"
      },
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/mm-classic.jpg",
    "alt": "Jumbo M&M cookie candy wall art by JOIRUSH",
    "caption": "Bright candy colors bring fun candy wall art charm to white walls."
  },
  "section3": {
    "heading": "Built by Hand to Last for Years",
    "paragraphs": [
      "Artist Erynn seals each piece with rich paint so the colors stay bright. Hang yours in five minutes on one nail."
    ],
    "links": [
      {
        "href": "/dopamine-decor-wall-art/",
        "label": "Explore Dopamine Decor"
      },
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How heavy is the Cookie Ice Cream Sandwich?",
      "answer": "It weighs about 4 to 5 lbs and hangs on one standard wall hook or nail."
    },
    {
      "question": "Which cookie has the brightest candy decor colors?",
      "answer": "The Rainbow Candy Cookie and Jumbo M&M Cookie pack five bright candy shades onto one piece."
    }
  ]
};

export function IceCreamCandyWallArtSchema() {
  return renderBlogSchema(data);
}

export function IceCreamCandyWallArtContent() {
  return renderBlogContent(data);
}
