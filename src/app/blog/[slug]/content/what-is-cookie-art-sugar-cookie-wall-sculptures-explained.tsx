import Link from "next/link";
import { getAbsoluteUrl } from "@/lib/seo";

export function WhatIsCookieArtSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is cookie art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cookie art refers to decorative sculptures that replicate the look of cookies, particularly sugar cookies. Unlike edible sugar cookie art used for events, cookie art for walls is made from durable materials like spray foam and acrylic paint to create permanent, hangable wall decor that looks realistic but lasts forever.",
        },
      },
      {
        "@type": "Question",
        name: "What is sugar cookie art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sugar cookie art has two meanings: (1) edible decorated sugar cookies often seen at parties and weddings, and (2) decorative faux sugar cookie wall sculptures that replicate the look of oversized sugar cookies. The wall sculpture version is handmade from materials like spray foam and acrylic paint by cookie artists.",
        },
      },
      {
        "@type": "Question",
        name: "What does a cookie artist do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A cookie artist who creates wall sculptures hand-crafts realistic oversized cookie decorations using materials like spray foam and acrylic paint. They sculpt realistic textures, paint realistic details like chocolate chips and candy, and create pieces that look good enough to eat but are designed for permanent wall display.",
        },
      },
      {
        "@type": "Question",
        name: "Are art cookies edible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Art cookies designed for wall display are not edible — they're decorative sculptures made from spray foam and acrylic paint. The term 'art cookies' can also refer to edible decorated cookies, so context matters. Wall-mounted cookie art is purely decorative and designed to last for years.",
        },
      },
      {
        "@type": "Question",
        name: "What is a cookie canvas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cookie canvas is a term for cookie-shaped wall art that functions like a canvas — a sculptural piece that hangs on your wall. These oversized cookie sculptures serve as statement art pieces for kitchens, dining rooms, and creative spaces.",
        },
      },
      {
        "@type": "Question",
        name: "How much does cookie art cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Handmade cookie art wall sculptures typically range from $90 to $225 depending on size and complexity. This is significantly less than commercial food props which can cost $350+ and are much heavier. Handmade cookie art is lightweight, unique, and often includes free shipping.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Cookie Art? A Guide to Sugar Cookie Wall Sculptures & Art Cookies",
    description: "A comprehensive guide to cookie art, sugar cookie wall sculptures, and the cookie artists who create faux food wall art.",
    author: {
      "@type": "Person",
      name: "Erynn",
      jobTitle: "Cookie Artist",
      url: getAbsoluteUrl("/about/"),
    },
    about: [
      { "@type": "Thing", name: "cookie art" },
      { "@type": "Thing", name: "sugar cookie art" },
      { "@type": "Thing", name: "cookie artist" },
      { "@type": "Thing", name: "faux food wall art" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}

export function WhatIsCookieArtContent() {
  return (
    <>
      <p>
        If you've stumbled across the term <strong>cookie art</strong> and wondered what it means, you're not 
        alone. The phrase has multiple meanings — from the beautifully decorated edible sugar cookies you see 
        at weddings to something entirely different: <strong>handmade sugar cookie wall sculptures</strong> that 
        look deliciously real but are designed to hang on your wall forever.
      </p>

      <p>
        This guide explores the world of decorative cookie art, <strong>sugar cookie art</strong> for walls, 
        and the <strong>cookie artists</strong> who create these unique faux food sculptures. Whether you're 
        looking to understand what art cookies are, considering a cookie canvas for your kitchen, or curious 
        about commissioning a custom piece, you'll find everything you need to know here.
      </p>

      <h2>What Exactly is Cookie Art?</h2>

      <p>
        <strong>Cookie art</strong> is a broad term that can mean different things depending on context. In the 
        culinary world, it often refers to decorated edible cookies — intricate royal icing designs on sugar 
        cookies created for events, holidays, and special occasions.
      </p>

      <p>
        But there's another meaning that's been gaining popularity: <strong>cookie art as wall decor</strong>. 
        These are oversized, hyper-realistic sculptures that replicate the look of freshly baked cookies — 
        complete with craggy texture, glossy chocolate chips, and that irresistible golden-brown color. Unlike 
        their edible counterparts, these <strong>art cookies</strong> are made from durable materials like 
        spray foam and acrylic paint, designed to hang on your wall and spark conversations for years to come.
      </p>

      <p>
        At <Link href="/">JOIRUSH</Link>, cookie art means handmade <strong>sugar cookie wall sculptures</strong> — 
        decorative pieces that capture the nostalgic, joyful essence of a freshly baked cookie without the 
        calories, crumbs, or expiration date.
      </p>

      <h2>Sugar Cookie Art: From Edible to Decorative</h2>

      <p>
        The term <strong>sugar cookie art</strong> traditionally refers to decorated sugar cookies — the kind 
        you see on Instagram with impossibly perfect icing work. These edible creations are beautiful but 
        temporary; they're meant to be eaten (usually within a week or two).
      </p>

      <p>
        <strong>Sugar cookie wall sculptures</strong>, on the other hand, take the aesthetic of a perfect 
        sugar cookie and transform it into permanent wall decor. A cookie artist sculpts these pieces by hand, 
        creating realistic texture in spray foam, then painting them with acrylics to achieve that just-baked 
        look. The result? A <strong>cookie canvas</strong> that looks good enough to eat but will still look 
        fresh ten years from now.
      </p>

      <h3>Key Differences: Edible vs. Decorative Sugar Cookie Art</h3>

      <ul>
        <li><strong>Material:</strong> Edible sugar cookies are made from flour, sugar, and butter. Decorative 
        sugar cookie art uses spray foam and acrylic paint.</li>
        <li><strong>Lifespan:</strong> Edible cookies last days to weeks. Wall sculptures last years to decades.</li>
        <li><strong>Size:</strong> Edible sugar cookies are typically 3-6 inches. Cookie wall art ranges from 
        14-16+ inches for statement impact.</li>
        <li><strong>Purpose:</strong> Edible cookies are for consumption. Cookie art is for visual enjoyment 
        and home decor.</li>
      </ul>

      <h2>What Does a Cookie Artist Do?</h2>

      <p>
        A <strong>cookie artist</strong> who creates wall sculptures is part sculptor, part painter, and part 
        food illusionist. The process of making a single <Link href="/product/jumbo-chocolate-chip-cookie/">jumbo 
        chocolate chip cookie wall sculpture</Link> involves multiple days of careful work:
      </p>

      <ol>
        <li><strong>Sculpting:</strong> Building up spray foam layers to create that thick, craggy cookie 
        texture with realistic bubbles and ridges</li>
        <li><strong>Shaping:</strong> Carving and refining the edges to mimic the organic spread of a real 
        baked cookie</li>
        <li><strong>Painting:</strong> Applying multiple layers of acrylic paint to achieve the golden-brown 
        base, darker edges, and highlights that make it look fresh from the oven</li>
        <li><strong>Detailing:</strong> Positioning chocolate chips, candy pieces, or other toppings by hand 
        to create depth and realism</li>
        <li><strong>Sealing:</strong> Protecting the finished piece for durability</li>
        <li><strong>Mounting:</strong> Adding a built-in wall hanger so it's ready to hang</li>
      </ol>

      <p>
        Unlike mass-produced food props (which can cost $350+ and weigh 10+ pounds), handmade cookie art is 
        lightweight (2-4 lbs), affordable ($90-$225), and has the unique character that only comes from being 
        made by an actual artist's hands.
      </p>

      <h2>Art Cookies: Not Your Grandmother's Sugar Cookie</h2>

      <p>
        <strong>Art cookies</strong> — in the context of wall decor — are decorative sculptures that capture 
        the irresistible appeal of cookies as a permanent art form. They're not meant to be eaten (and trust 
        us, they're not tasty — spray foam doesn't pair well with milk).
      </p>

      <p>
        What makes art cookies special is how they transform a humble comfort food into gallery-worthy decor. 
        A <Link href="/product/cookie-ice-cream-sandwich/">cookie ice cream sandwich sculpture</Link> becomes 
        a statement piece. A <Link href="/product/jumbo-mm-cookie-set/">set of M&M cookies</Link> becomes a 
        colorful gallery wall. The familiar becomes extraordinary.
      </p>

      <h3>Popular Types of Art Cookies</h3>

      <ul>
        <li><strong>Classic Chocolate Chip:</strong> The iconic comfort cookie with glossy chips and golden dough</li>
        <li><strong>Candy Cookies:</strong> M&M-studded sculptures in rainbow or <Link href="/product/jumbo-pastel-mm-cookie/">pastel palettes</Link></li>
        <li><strong>Peanut Butter Cookies:</strong> Warm, nutty tones with criss-cross texture</li>
        <li><strong>Double Chocolate:</strong> Rich cocoa dough for dramatic, moody decor</li>
        <li><strong>Custom Flavors:</strong> <Link href="/custom/">Commission a cookie artist</Link> to create 
        any color or design you can imagine</li>
      </ul>

      <h2>What is a Cookie Canvas?</h2>

      <p>
        <strong>Cookie canvas</strong> is another way to describe cookie wall art — emphasizing that these 
        sculptures function like a canvas you'd hang on your wall. Just as you might display a painting or 
        print, a cookie canvas serves as a focal point for a room.
      </p>

      <p>
        The term captures the idea that these aren't just crafts or knick-knacks — they're legitimate art 
        pieces that happen to be shaped like desserts. A well-placed cookie canvas can:
      </p>

      <ul>
        <li>Add personality and conversation-starting appeal to kitchens</li>
        <li>Create a whimsical gallery wall in dining rooms</li>
        <li>Bring joy to home offices and creative spaces</li>
        <li>Serve as the perfect backdrop for content creators</li>
        <li>Express the owner's love of nostalgic, maximalist, or "dopamine decor"</li>
      </ul>

      <h2>Who Buys Cookie Art?</h2>

      <p>
        Cookie art collectors tend to be people who appreciate unique, handmade decor with personality. They include:
      </p>

      <ul>
        <li><strong>Maximalists and dopamine decor enthusiasts</strong> who want their spaces to spark joy</li>
        <li><strong>Foodies and bakers</strong> who love all things dessert</li>
        <li><strong>Content creators</strong> looking for eye-catching backdrops</li>
        <li><strong>Gift-givers</strong> searching for something unique and memorable</li>
        <li><strong>Nostalgia lovers</strong> who connect emotionally with the comfort-food aesthetic</li>
        <li><strong>Kitschy kitchen collectors</strong> who embrace playful, unconventional decor</li>
      </ul>

      <h2>How Much Does Cookie Art Cost?</h2>

      <p>
        Handmade <strong>sugar cookie wall sculptures</strong> from cookie artists like those at JOIRUSH 
        typically range from <strong>$90 to $225</strong>, depending on size and complexity:
      </p>

      <ul>
        <li>Single 14-inch cookies: $90-$115</li>
        <li>Jumbo 16-inch cookies: $100-$115</li>
        <li>Cookie pairs and sets: $175-$225</li>
        <li>Statement pieces (like ice cream sandwiches): $220</li>
      </ul>

      <p>
        Compare this to commercial fiberglass food props, which can run $350-$500+ and weigh 10+ pounds. 
        Handmade cookie art offers better value, lighter weight (2-4 lbs — hangs on a single nail), and 
        the unique character of being made by an actual artist.
      </p>

      <h2>Frequently Asked Questions About Cookie Art</h2>

      <h3>Is cookie art edible?</h3>
      <p>
        Cookie art designed for wall display is <strong>not edible</strong>. These are decorative sculptures 
        made from spray foam and acrylic paint. They're designed to look real but are purely for decoration. 
        (Don't worry — they look realistic enough that guests will ask!)
      </p>

      <h3>How long does cookie art last?</h3>
      <p>
        Properly made sugar cookie wall sculptures can last indefinitely. They don't expire, crumble, or 
        attract pests. The acrylic paint seal protects them from moisture and dust, so they'll look fresh 
        for years to come.
      </p>

      <h3>How do I hang cookie art?</h3>
      <p>
        Most handmade cookie art comes with a <strong>built-in wall hanger</strong> on the back. Because 
        they're lightweight (2-4 lbs), they hang easily on a standard picture hook or nail. See our complete 
        guide: <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">How to Hang Cookie Art</Link>.
      </p>

      <h3>Can I commission custom cookie art?</h3>
      <p>
        Yes! Many cookie artists accept <Link href="/custom/">custom commissions</Link>. You can request 
        specific colors, sizes, or "flavor" designs. Want a hot pink cookie to match your kitchen? A pastel 
        set for a nursery? It's all possible.
      </p>

      <h3>What's the difference between cookie art and food props?</h3>
      <p>
        Commercial food props are typically mass-produced from fiberglass, heavy (10+ lbs), and expensive 
        ($350+). Handmade cookie art is lighter, more affordable, and has the unique character of being 
        crafted by an individual artist. Each piece is slightly different, with real artistic variation.
      </p>

      <h2>Ready to Explore Cookie Art?</h2>

      <p>
        Whether you're drawn to the nostalgic charm of a <Link href="/product/jumbo-chocolate-chip-cookie/">classic 
        chocolate chip cookie</Link>, the colorful pop of <Link href="/product/hot-pink-mm-cookie/">candy cookie 
        art</Link>, or something completely custom, there's a sugar cookie wall sculpture waiting for your wall.
      </p>

      <p>
        Browse the full <Link href="/wall-art/">cookie art collection</Link> to find your flavor, or learn more 
        about <Link href="/about/">cookie artist Erynn</Link> and the JOIRUSH studio. Every piece ships free 
        within the U.S. in 14 days — because handmade cookie art worth waiting for.
      </p>
    </>
  );
}
