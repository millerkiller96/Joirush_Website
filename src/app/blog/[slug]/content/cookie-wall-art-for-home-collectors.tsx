import Link from "next/link";
import { getAbsoluteUrl } from "@/lib/seo";

export function CookieWallArtCollectorsSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is cookie wall art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cookie wall art refers to decorative wall sculptures that look like oversized, realistic cookies. Unlike edible cookies decorated with royal icing, cookie wall art is made from durable materials like spray foam and acrylic paint, designed to hang permanently on your wall as home decor.",
        },
      },
      {
        "@type": "Question",
        name: "Is cookie wall art the same as edible decorated cookies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Cookie wall art is faux food decor made from spray foam and acrylic paint — it's purely decorative and not edible. Edible decorated cookies use royal icing on real sugar cookies and are meant to be eaten. Cookie wall art lasts for years; edible cookies last days.",
        },
      },
      {
        "@type": "Question",
        name: "What are sugar cookie wall sculptures made of?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sugar cookie wall sculptures are typically handmade from spray foam that's carved and shaped to look like a real cookie, then painted with acrylic paints to achieve realistic colors and textures. They're lightweight (2-4 lbs), durable, and come with built-in wall hangers.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I hang cookie wall art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cookie wall art looks great in kitchens, dining rooms, breakfast nooks, playrooms, home offices, and creative spaces. They work as single statement pieces or grouped into gallery walls for maximalist dopamine decor.",
        },
      },
      {
        "@type": "Question",
        name: "How much does cookie wall art cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Handmade cookie wall art typically ranges from $90 to $225 depending on size and complexity. This is more affordable than commercial fiberglass food props ($350+) and includes the artistic character of being handmade by a real cookie artist.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cookie Wall Art for Home Collectors: Faux Sugar Cookie Sculptures That Last Forever",
    description: "A collector's guide to cookie wall art — faux sugar cookie wall sculptures that look real but aren't edible. Learn what makes these spray-foam cookie sculptures different from royal icing cookies.",
    author: {
      "@type": "Person",
      name: "Erynn",
      jobTitle: "Cookie Artist",
      url: getAbsoluteUrl("/about/"),
    },
    about: [
      { "@type": "Thing", name: "cookie wall art" },
      { "@type": "Thing", name: "sugar cookie wall sculpture" },
      { "@type": "Thing", name: "faux food decor" },
      { "@type": "Thing", name: "cookie art for collectors" },
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

export function CookieWallArtCollectorsContent() {
  return (
    <>
      <p>
        If you've searched for <strong>cookie wall art</strong> hoping to find decorative oversized cookies 
        for your kitchen or home, you've probably encountered a confusing mix of results: edible cookies with 
        intricate royal icing designs, canvas prints of cookies, and — what you're actually looking for — 
        <strong>faux sugar cookie wall sculptures</strong> that look real but are designed to hang on your wall forever.
      </p>

      <p>
        This guide is for collectors who want the <em>real</em> cookie wall art: handmade sculptures that 
        capture the irresistible texture of a freshly baked chocolate chip cookie, the colorful pop of M&M 
        candies, or the nostalgic warmth of homemade treats — without any of the crumbs, calories, or 
        expiration dates.
      </p>

      <h2>What is Cookie Wall Art? (Not Royal Icing Cookies)</h2>

      <p>
        Let's clear up the confusion right away. When most people search "cookie art," they get results 
        about <em>edible</em> decorated cookies — the beautiful sugar cookies decorated with royal icing 
        that you see at weddings, baby showers, and on baking Instagram accounts.
      </p>

      <p>
        <strong>Cookie wall art is different.</strong> It's a category of <strong>faux food decor</strong> — 
        three-dimensional wall sculptures that look like giant, realistic cookies but are made from durable 
        materials designed to hang on your wall as permanent art. Think of it like the difference between 
        a real apple and a ceramic apple sculpture: both look like apples, but one is for eating and one 
        is for decoration.
      </p>

      <h3>Cookie Wall Art vs. Edible Cookie Art: Key Differences</h3>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Cookie Wall Art (Faux Sculptures)</th>
            <th>Edible Cookie Art (Royal Icing)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Material</td>
            <td>Spray foam + acrylic paint</td>
            <td>Sugar cookie dough + royal icing</td>
          </tr>
          <tr>
            <td>Purpose</td>
            <td>Wall decor / home decoration</td>
            <td>Eating / events</td>
          </tr>
          <tr>
            <td>Lifespan</td>
            <td>Years to decades</td>
            <td>Days to weeks</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>14-16+ inches (jumbo statement pieces)</td>
            <td>3-6 inches typical</td>
          </tr>
          <tr>
            <td>Edible?</td>
            <td>No (decorative only)</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Hanging hardware</td>
            <td>Built-in wall hanger</td>
            <td>N/A (meant to be eaten)</td>
          </tr>
        </tbody>
      </table>

      <h2>What Are Sugar Cookie Wall Sculptures Made Of?</h2>

      <p>
        The best cookie wall art is handmade from <strong>spray foam</strong> — a lightweight, sculptable 
        material that allows artists to create the thick, craggy texture of a real baked cookie. Here's how 
        a <Link href="/about/">cookie artist</Link> like me creates a single piece:
      </p>

      <ol>
        <li><strong>Foam base:</strong> Layers of spray foam are built up to create the thick cookie shape</li>
        <li><strong>Sculpting:</strong> The foam is carved to create realistic ridges, bubbles, and that 
        organic "spread" of a real cookie</li>
        <li><strong>Acrylic painting:</strong> Multiple layers of paint create the golden-brown base, darker 
        edges, and realistic color variations</li>
        <li><strong>Detailing:</strong> Chocolate chips, candy pieces, or other toppings are individually 
        positioned and painted for depth</li>
        <li><strong>Sealing:</strong> A protective finish ensures durability</li>
        <li><strong>Wall hardware:</strong> A built-in hanger makes it ready to hang</li>
      </ol>

      <p>
        The result is a <strong>2-4 pound sculpture</strong> that hangs on a single nail — much lighter than 
        commercial fiberglass food props (which can weigh 10+ pounds and cost $350+).
      </p>

      <h2>Popular Cookie Wall Art Styles for Collectors</h2>

      <p>
        Whether you're building a <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/">dopamine 
        decor gallery wall</Link> or looking for a single statement piece, here are the most popular 
        cookie wall art styles:
      </p>

      <h3>Classic Chocolate Chip Cookie Wall Art</h3>

      <p>
        The <Link href="/product/jumbo-chocolate-chip-cookie/">jumbo chocolate chip cookie</Link> is the 
        quintessential cookie wall sculpture. Golden dough with glossy, melty-looking chocolate chips — 
        it's the ultimate comfort-food nostalgia on your wall. These work beautifully as solo statement 
        pieces or as the centerpiece of a cookie art collection.
      </p>

      <h3>M&M / Candy Cookie Wall Sculptures</h3>

      <p>
        For collectors who love color, <Link href="/product/jumbo-mm-cookie-set/">M&M cookie wall art</Link> 
        adds a playful, rainbow pop to any space. Available in classic rainbow colors or 
        <Link href="/product/jumbo-pastel-mm-cookie/">soft pastels</Link> for nurseries and softer aesthetics. 
        The <Link href="/product/hot-pink-mm-cookie/">hot pink M&M cookie</Link> is a popular choice for 
        maximalist spaces.
      </p>

      <h3>Cookie Pairs and Sets</h3>

      <p>
        Building a <Link href="/wall-art/">cookie wall art collection</Link>? Pairs and sets create visual 
        balance and fill larger wall spaces. Many collectors start with a single piece and add more over time, 
        creating a curated dessert gallery wall.
      </p>

      <h3>Statement Pieces: Cookie Ice Cream Sandwiches</h3>

      <p>
        For the collector who wants something extra, the <Link href="/product/cookie-ice-cream-sandwich/">cookie 
        ice cream sandwich sculpture</Link> combines two chocolate chip cookies with creamy "ice cream" filling. 
        It's a conversation starter that stops people mid-sentence.
      </p>

      <h2>Where to Display Cookie Wall Art</h2>

      <p>
        Cookie wall art is designed to bring joy wherever you hang it. Popular spots include:
      </p>

      <ul>
        <li><strong>Kitchen:</strong> Above the stove, near the pantry, or as the focal point of an eat-in area</li>
        <li><strong>Dining room:</strong> Creates a whimsical, food-themed atmosphere</li>
        <li><strong>Breakfast nook:</strong> Perfect for morning vibes</li>
        <li><strong>Home office:</strong> Adds personality and sparks joy during work hours</li>
        <li><strong>Playroom:</strong> Kid-friendly decor that won't get eaten</li>
        <li><strong>Photo walls at home:</strong> Eye-catching backdrop for family photos and entertaining</li>
        <li><strong>Content creator backdrops:</strong> Perfect for food, lifestyle, and dopamine decor content from home</li>
      </ul>

      <p>
        Need tips on placement? Check out our guide: <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">How 
        to Hang Cookie Wall Art</Link>.
      </p>

      <h2>Cookie Wall Art for Home Collectors: Pricing Guide</h2>

      <p>
        Handmade cookie wall art from artists like JOIRUSH typically ranges from <strong>$90 to $225</strong>:
      </p>

      <ul>
        <li><strong>Single 14-inch cookies:</strong> $90-$115</li>
        <li><strong>Jumbo 16-inch cookies:</strong> $100-$115</li>
        <li><strong>Cookie pairs and sets:</strong> $175-$225</li>
        <li><strong>Statement pieces (ice cream sandwiches):</strong> $220</li>
      </ul>

      <p>
        Compare this to commercial fiberglass food props used in restaurants and displays, which run 
        <strong>$350-$500+</strong> and are much heavier. Handmade cookie wall art offers better value, 
        lighter weight, and the unique character of being made by an individual artist.
      </p>

      <p>
        Most handmade cookie wall art includes <strong>free shipping</strong> within the U.S.
      </p>

      <h2>Why Collectors Choose Handmade Cookie Wall Art</h2>

      <p>
        What makes handmade sugar cookie wall sculptures different from mass-produced food props?
      </p>

      <ul>
        <li><strong>Artistic character:</strong> Each piece has subtle variations — no two are identical</li>
        <li><strong>Lightweight:</strong> 2-4 lbs vs. 10+ lbs for fiberglass props</li>
        <li><strong>Affordable:</strong> $90-$225 vs. $350+ for commercial props</li>
        <li><strong>Custom options:</strong> <Link href="/custom/">Commission custom colors and designs</Link></li>
        <li><strong>Made-to-order:</strong> Your piece is made fresh for you, not pulled from warehouse stock</li>
        <li><strong>Supporting artists:</strong> You're supporting an independent creator, not a factory</li>
      </ul>

      <h2>FAQ: Cookie Wall Art for Collectors</h2>

      <h3>Is cookie wall art edible?</h3>
      <p>
        No. Cookie wall art is made from spray foam and acrylic paint — it's purely decorative. The term 
        "cookie art" can also refer to edible decorated cookies, so context matters. If it's designed to 
        hang on your wall, it's not edible.
      </p>

      <h3>How do I hang cookie wall art?</h3>
      <p>
        Most handmade cookie wall art comes with a <strong>built-in wall hanger</strong>. Because they're 
        lightweight (2-4 lbs), they hang easily on a standard picture hook or nail. See our complete guide: 
        <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">How to Hang Cookie Art</Link>.
      </p>

      <h3>How do I clean cookie wall art?</h3>
      <p>
        Gently dust with a soft, dry cloth. Avoid water or cleaning sprays. The acrylic paint seal protects 
        against moisture and dust, so minimal maintenance is needed.
      </p>

      <h3>Can I commission custom cookie wall art?</h3>
      <p>
        Yes! Many cookie artists accept <Link href="/custom/">custom commissions</Link>. Request specific 
        colors, sizes, or "flavor" designs. Want a hot pink cookie to match your kitchen? A pastel set 
        for a nursery? It's all possible.
      </p>

      <h3>What's the difference between cookie wall art and canvas prints?</h3>
      <p>
        Canvas prints are flat, 2D images of cookies printed on fabric. Cookie wall art is a 3D sculpture 
        that looks realistic from any angle. The sculptural quality creates visual depth and the "is that 
        real?" reaction that flat prints can't achieve.
      </p>

      <h2>Start Your Cookie Wall Art Collection</h2>

      <p>
        Ready to add faux cookie decor to your home? Browse the full <Link href="/wall-art/">cookie wall 
        art collection</Link> or explore the <Link href="/catalogue/">complete catalogue</Link> to find 
        your first (or next) piece.
      </p>

      <p>
        Want something one-of-a-kind? <Link href="/custom/">Commission a custom sugar cookie wall sculpture</Link> 
        in any color or design you can imagine. Every piece is handmade in Daytona Beach, ships in 14 days, 
        with free U.S. shipping.
      </p>

      <p>
        Questions about cookie wall art? Learn more <Link href="/blog/what-is-cookie-art-sugar-cookie-wall-sculptures-explained/">about 
        what cookie art is</Link> or <Link href="/about/">meet the cookie artist</Link> behind JOIRUSH.
      </p>
    </>
  );
}
