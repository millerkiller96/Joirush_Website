import {
  renderBlogContent,
  renderBlogSchema,
  type BlogPostStructuredData,
} from "@/components/BlogPostTemplate";

const data: BlogPostStructuredData = {
  "lead": "Hanging your JOIRUSH cookie takes less than 5 minutes! Every cookie is made of light spray foam with a hanger on the back, so you only need one small picture hook.",
  "quickFactsTitle": "What You Need",
  "quickFacts": [
    "1 picture hook or nail rated for 10 lbs (cookies weigh 2 to 4 lbs; ice cream sandwich weighs 4 to 5 lbs).",
    "A hammer and a pencil.",
    "5 minutes of time."
  ],
  "howTo": {
    "name": "How to Hang Jumbo Cookie Wall Art",
    "description": "Hang your light JOIRUSH cookie in 4 easy steps.",
    "steps": [
      {
        "name": "Pick a Safe Spot",
        "text": "Pick an inside wall away from stove heat, steam, or sink water."
      },
      {
        "name": "Mark Eye Level",
        "text": "Hold the cookie where you want it and make a light pencil mark at the top edge."
      },
      {
        "name": "Tap in Your Hook",
        "text": "See how far down the back hanger sits from the top edge, mark that spot on the wall, and tap in a 10 lb picture hook."
      },
      {
        "name": "Hang and Smile",
        "text": "Set the back hanger onto the hook and step back to check it."
      }
    ]
  },
  "section1": {
    "heading": "4 Easy Steps to Hang Your Cookie",
    "paragraphs": [
      "You do not need big bolts or wall studs for a single cookie. Just follow these four steps:"
    ],
    "bullets": [
      "Step 1: Pick an inside wall away from stove heat and sink water.",
      "Step 2: Hold the cookie at eye level and make a tiny pencil mark at the top edge.",
      "Step 3: Check how far the back hanger sits below the top edge, mark that spot on the wall, and tap in a 10 lb picture hook.",
      "Step 4: Hang your cookie on the hook and step back to smile!"
    ]
  },
  "image1": {
    "src": "/images/products/choc-chip.jpg",
    "alt": "Jumbo chocolate chip cookie wall art ready to hang by JOIRUSH",
    "caption": "Every single cookie weighs just 2 to 4 lbs and hangs on one hook."
  },
  "section2": {
    "heading": "Hanging Two or Three Cookies Together",
    "paragraphs": [
      "Hanging a pair? Leave 3 to 5 inches of bare wall between the cookies. Hang them side by side over a table, one over the other on a skinny wall, or at a fun slant."
    ],
    "links": [
      {
        "href": "/blog/jumbo-cookie-wall-art-size-guide/",
        "label": "Read the Size Guide"
      },
      {
        "href": "/kitchen-wall-art/",
        "label": "Kitchen Ideas"
      }
    ]
  },
  "image2": {
    "src": "/images/products/rainbow.jpg",
    "alt": "Rainbow candy jumbo cookie wall art by JOIRUSH",
    "caption": "Space cookies 3 to 5 inches apart so each round shape pops."
  },
  "section3": {
    "heading": "How to Keep It Clean",
    "paragraphs": [
      "To dust, gently wipe your cookie with a dry soft cloth or duster. Never soak it in water or use strong cleaners."
    ],
    "links": [
      {
        "href": "/catalogue/",
        "label": "Shop All Cookies"
      }
    ]
  },
  "faqs": [
    {
      "question": "Should I use sticky strips or a nail?",
      "answer": "A small nail or picture hook is best because it hooks right into the hanger on the back of the foam."
    },
    {
      "question": "How heavy is the Cookie Ice Cream Sandwich?",
      "answer": "The Cookie Ice Cream Sandwich weighs 4 to 5 lbs. Use a 15 to 20 lb picture hook for a strong hold."
    }
  ]
};

export function HowToHangSchema() {
  return renderBlogSchema(data);
}

export function HowToHangContent() {
  return renderBlogContent(data);
}
