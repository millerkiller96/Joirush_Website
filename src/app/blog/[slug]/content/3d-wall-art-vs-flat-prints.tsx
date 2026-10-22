import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Why do some walls still feel flat after you hang a poster? Flat prints only give you color. 3D wall art gives your room real depth and shadow.",
  "quickFactsTitle": "3D Cookie vs Flat Print",
  "quickFacts": [
    "Depth: JOIRUSH cookies stand 2 to 5 inches off the wall.",
    "Light: Real shadows change from morning sun to night lamp light.",
    "Shape: A round cookie breaks up boxy frames and cabinets.",
    "Weight: Still only 2 to 4 lbs (4 to 5 lbs for the ice cream sandwich)."
  ],
  "section1": {
    "heading": "How Real Depth Changes a Room",
    "paragraphs": [
      "When you walk past a flat poster from the side, it hides in the frame. When you walk past a 3D cookie, you see thick baked edges, raised chips, and real shadows.",
      "It feels like a real piece of art living in the room with you."
    ],
    "links": [
      {
        "href": "/product/giant-double-chocolate-cookie/",
        "label": "Giant Double Chocolate Cookie"
      },
      {
        "href": "/product/jumbo-chocolate-chip-cookie/",
        "label": "Jumbo Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/double-choc.jpg",
    "alt": "Giant double chocolate 3D cookie wall art by JOIRUSH",
    "caption": "Thick baked edges and raised chocolate chunks catch the light all day."
  },
  "section2": {
    "heading": "How to Mix 3D Art With Flat Frames",
    "paragraphs": [
      "You can keep your framed prints! Hang one 16 inch cookie in the middle of your wall, and put 2 or 3 flat frames around it.",
      "The round 3D cookie makes the whole wall pop."
    ]
  },
  "image2": {
    "src": "/images/products/ice-cream.jpg",
    "alt": "3D cookie ice cream sandwich wall art by JOIRUSH",
    "caption": "At 5 inches thick, the Cookie Ice Cream Sandwich brings bold 3D depth."
  },
  "section3": {
    "heading": "Hangs Just Like a Picture Frame",
    "paragraphs": [
      "Some people think 3D art needs big bolts. Because Erynn uses light spray foam, each cookie hangs on one regular picture hook."
    ],
    "links": [
      {
        "href": "/oversized-food-wall-art/",
        "label": "Oversized Food Wall Art"
      },
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "How thick is a JOIRUSH cookie?",
      "answer": "Single cookies are about 2 to 3 inches thick. The Cookie Ice Cream Sandwich is about 5 inches thick."
    },
    {
      "question": "Do I need special tools to hang 3D cookie art?",
      "answer": "No. Every cookie has a hanger on the back that fits a regular picture hook or nail."
    }
  ]
};

export function ThreeDWallArtSchema() {
  return renderBlogSchema(data);
}

export function ThreeDWallArtContent() {
  return renderBlogContent(data);
}
