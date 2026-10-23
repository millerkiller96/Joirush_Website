import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Plain wall prints can make a room feel like a hotel. Funky wall art and quirky wall art bring real joy and warmth to your bedroom, kitchen, or studio.",
  "quickFactsTitle": "3 Tips for Fun Walls",
  "quickFacts": [
    "Add one round 3D piece to break up square picture frames.",
    "Pick weird wall art that makes you smile every single day.",
    "Hang light foam art on one nail so rental walls stay neat."
  ],
  "section1": {
    "heading": "Swap Flat Posters for 3D Pop Art",
    "paragraphs": [
      "The fastest way to build quirky home decor is to mix shapes on your wall. When every frame is a flat box, a round 3D cookie grabs your eye right away.",
      "Our 16 inch Hot Pink M&M Cookie and 14 inch Rainbow Candy Cookie bring bold funky home decor energy to any blank spot."
    ],
    "links": [
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      },
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      },
      {
        "href": "/dopamine-decor-wall-art/",
        "label": "Explore Dopamine Decor"
      }
    ]
  },
  "image1": {
    "src": "/images/products/hot-pink-mm.jpg",
    "alt": "Hot pink M&M cookie funky wall art by JOIRUSH",
    "caption": "Bright pink dough and candy shells turn a plain wall into a fun focal point."
  },
  "section2": {
    "heading": "Make a Sweet Statement Corner",
    "paragraphs": [
      "Great unique wall art works in small spaces too. Hang the Cookie Ice Cream Sandwich above a bar cart, desk, or reading chair for instant charm.",
      "Want a bigger wall display? Bundle two or more cookies in your cart to save 5% to 25% automatically."
    ],
    "links": [
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      },
      {
        "href": "/colorful-wall-art/",
        "label": "Shop Colorful Wall Art"
      }
    ]
  },
  "image2": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy cookie quirky wall art by JOIRUSH",
    "caption": "Round 3D cookie art breaks up straight lines on a gallery wall."
  },
  "section3": {
    "heading": "Handmade in Queens, NY",
    "paragraphs": [
      "Every JOIRUSH cookie is sculpted and painted by hand by artist Erynn. Each piece weighs just 2 to 4 lbs and ships free in the U.S."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All 11 Cookies"
      },
      {
        "href": "/blog/whimsical-kitsch-decor-ideas/",
        "label": "Whimsical Kitsch Decor Ideas"
      }
    ]
  },
  "faqs": [
    {
      "question": "How do I style funky wall art without making my room look messy?",
      "answer": "Leave 3 to 4 inches of bare wall around your 3D cookie and repeat two of its candy colors in pillows or mugs."
    },
    {
      "question": "Will quirky 3D wall art damage apartment walls?",
      "answer": "No. Each cookie weighs only 2 to 4 lbs and hangs from one small nail or standard picture hook."
    }
  ]
};

export function FunkyQuirkyWallArtSchema() {
  return renderBlogSchema(data);
}

export function FunkyQuirkyWallArtContent() {
  return renderBlogContent(data);
}
