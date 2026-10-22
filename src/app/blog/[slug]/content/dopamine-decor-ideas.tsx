import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Dopamine decor means using colors and shapes that make you smile when you walk into a room. Here is how to do it while keeping your room neat.",
  "quickFactsTitle": "3 Simple Rules for Happy Rooms",
  "quickFacts": [
    "Pick one fun piece of art that makes you smile right away.",
    "Use 2 or 3 colors from that piece in other spots in the room.",
    "Leave bare space on the wall so the bright colors stand out."
  ],
  "section1": {
    "heading": "Start With One Fun Spot",
    "paragraphs": [
      "You do not have to paint every wall bright pink to make a happy room. Start with one fun piece of 3D art on a clean white or cream wall.",
      "A 14 inch Rainbow Candy Cookie or 16 inch Hot Pink M&M Cookie gives your kitchen or desk wall a fast pop of joy."
    ],
    "links": [
      {
        "href": "/product/rainbow-candy-cookie/",
        "label": "Rainbow Candy Cookie"
      },
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy cookie wall art by JOIRUSH",
    "caption": "One rainbow cookie brings five happy candy colors to a plain wall."
  },
  "section2": {
    "heading": "Repeat the Colors Near It",
    "paragraphs": [
      "Look at the candy colors on your cookie and use two of them nearby. Try a yellow mug on the coffee bar, a pink dish towel, or a blue vase on the table.",
      "Using the same colors again makes the whole room feel cozy and planned."
    ]
  },
  "image2": {
    "src": "/images/products/pastel-mm.jpg",
    "alt": "Pastel M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Soft pastel candy tones look sweet in sunny kitchens and bedrooms."
  },
  "section3": {
    "heading": "Light and Easy to Hang",
    "paragraphs": [
      "Every JOIRUSH cookie is made from light spray foam (2 to 4 lbs) and hangs on one nail or hook. You can cheer up a wall in five minutes."
    ],
    "links": [
      {
        "href": "/colorful-wall-art/",
        "label": "Explore Colorful Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "What does dopamine decor mean?",
      "answer": "It is a home style with bright colors, soft textures, and fun art that makes you feel happy at home."
    },
    {
      "question": "Which cookie has the most colors?",
      "answer": "The Rainbow Candy Cookie and the Classic M&M Cookie pack the most bright colors into one piece."
    }
  ]
};

export function DopamineDecorIdeasSchema() {
  return renderBlogSchema(data);
}

export function DopamineDecorIdeasContent() {
  return renderBlogContent(data);
}
