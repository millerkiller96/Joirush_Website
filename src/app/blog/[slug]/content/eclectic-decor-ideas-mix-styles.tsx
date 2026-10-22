import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Mixing old and new styles makes a room feel cozy and lived in. A fun 3D cookie is an easy way to keep a room from feeling too stiff.",
  "quickFactsTitle": "How to Mix Styles",
  "quickFacts": [
    "Pair old wood tables with one fun modern piece of art.",
    "Mix smooth glass and metal with bumpy 3D foam art.",
    "Tie the room together with warm brown and cream colors."
  ],
  "section1": {
    "heading": "Add One Fun Piece to a Calm Room",
    "paragraphs": [
      "If your dining room has a wood table, framed art, and simple rugs, adding one 16 inch cookie makes the room feel warm and friendly.",
      "Golden cookie dough shades match wood tables and brass lamps with ease."
    ],
    "links": [
      {
        "href": "/product/jumbo-mm-cookie/",
        "label": "Jumbo M&M Cookie"
      },
      {
        "href": "/product/jumbo-white-chocolate-chip-cookie/",
        "label": "White Chocolate Chip Cookie"
      }
    ]
  },
  "image1": {
    "src": "/images/products/mm-classic.jpg",
    "alt": "Classic M&M jumbo cookie wall art by JOIRUSH",
    "caption": "Warm golden dough matches wood tones while candy colors pop."
  },
  "section2": {
    "heading": "Mix Round and Square Shapes",
    "paragraphs": [
      "Most wall art is a flat box. Hanging a round, 3D cookie next to a mirror or a framed print makes the wall much more fun to look at."
    ]
  },
  "image2": {
    "src": "/images/products/white-choc.jpg",
    "alt": "Jumbo white chocolate chip cookie wall art by JOIRUSH",
    "caption": "Creamy white chips and golden dough fit right into warm rooms."
  },
  "section3": {
    "heading": "Easy to Move Anytime",
    "paragraphs": [
      "Because each cookie weighs only 2 to 4 lbs and uses one small hook, you can move it from the kitchen to the desk wall whenever you like."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Browse All Cookies"
      },
      {
        "href": "/kitchen-wall-art/",
        "label": "Kitchen Wall Art Ideas"
      }
    ]
  },
  "faqs": [
    {
      "question": "Which cookie looks best with wood tables?",
      "answer": "The Classic Chocolate Chip, White Chocolate Chip, and Giant Peanut Butter cookies have warm golden tones that look great with wood."
    },
    {
      "question": "How long does shipping take?",
      "answer": "Every piece is made to order and ships in 14 days with free U.S. shipping."
    }
  ]
};

export function EclecticDecorSchema() {
  return renderBlogSchema(data);
}

export function EclecticDecorContent() {
  return renderBlogContent(data);
}
