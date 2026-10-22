import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Maximalist decor is all about showing off the things you love. The trick to a great bold room is picking one star piece and a clear color plan.",
  "quickFactsTitle": "Bold Wall Tips",
  "quickFacts": [
    "Mix flat picture frames with 3D wall art for real depth.",
    "Stick to 3 main colors so full walls still feel calm.",
    "Leave 3 to 4 inches of space between pieces on the wall."
  ],
  "section1": {
    "heading": "Break Up Flat Frames With 3D Art",
    "paragraphs": [
      "A wall full of square frames can look too boxy. Putting a round, 3D cookie in the middle breaks up all those straight lines.",
      "Our 16 inch Hot Pink M&M Cookie or Cookie Ice Cream Sandwich pops off the wall and grabs your eye first."
    ],
    "links": [
      {
        "href": "/product/hot-pink-mm-cookie/",
        "label": "Hot Pink M&M Cookie"
      },
      {
        "href": "/product/cookie-ice-cream-sandwich/",
        "label": "Cookie Ice Cream Sandwich"
      }
    ]
  },
  "image1": {
    "src": "/images/products/hot-pink-mm.jpg",
    "alt": "Hot pink M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Bold pink dough and shiny candy bits stand out on any wall."
  },
  "section2": {
    "heading": "Pair Two Cookies for Big Walls",
    "paragraphs": [
      "Big walls love pairs. In checkout, you can pick any second cookie from our menu at 10% off to hang next to your first one.",
      "Try a Double Chocolate Cookie next to a Hot Pink M&M Cookie for bold contrast."
    ],
    "links": [
      {
        "href": "/product/giant-double-chocolate-cookie/",
        "label": "Giant Double Chocolate Cookie"
      }
    ]
  },
  "image2": {
    "src": "/images/products/double-choc.jpg",
    "alt": "Giant double chocolate cookie wall art by JOIRUSH",
    "caption": "Rich dark brown tones balance bright pink and yellow walls."
  },
  "section3": {
    "heading": "Keep Small Items Together",
    "paragraphs": [
      "Do not spread small items across every shelf. Group them in one spot near your wall art. That makes your shelf look neat, not messy."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      },
      {
        "href": "/colorful-wall-art/",
        "label": "See Colorful Wall Art"
      }
    ]
  },
  "faqs": [
    {
      "question": "How do I keep a bold room from looking messy?",
      "answer": "Use the same two or three colors around the room and leave a few inches of bare wall between frames."
    },
    {
      "question": "How heavy are JOIRUSH cookies?",
      "answer": "Single cookies weigh 2 to 4 lbs, and the ice cream sandwich weighs 4 to 5 lbs. Each has a hanger on the back."
    }
  ]
};

export function MaximalistDecorSchema() {
  return renderBlogSchema(data);
}

export function MaximalistDecorContent() {
  return renderBlogContent(data);
}
