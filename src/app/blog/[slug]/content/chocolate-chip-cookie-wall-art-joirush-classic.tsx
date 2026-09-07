import Link from "next/link";
import { getAbsoluteUrl, getImageUrl } from "@/lib/seo";

export function ChocolateChipStorySchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who makes JOIRUSH cookie wall art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JOIRUSH cookie wall art is handmade by Erynn, a mixed media artist based in Orlando, Florida. Each piece is individually sculpted, painted, and finished by hand in her studio.",
        },
      },
      {
        "@type": "Question",
        name: "What are JOIRUSH cookies made of?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JOIRUSH cookie sculptures are made from wood, clay, and acrylic paint. The wood provides a sturdy, lightweight base, clay creates the realistic texture, and acrylic paint adds the lifelike coloring and glossy chip details.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to make a jumbo cookie sculpture?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each handmade cookie sculpture takes several days to complete, including building the base, sculpting the texture, multiple layers of painting, and finish work. The process can't be rushed because each layer needs to dry properly.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export function ChocolateChipStoryContent() {
  return (
    <>
      <p>
        Every cookie tells a story. Not just the ones fresh from the oven, but the ones that 
        hang on walls — permanent reminders of comfort, creativity, and the universal language 
        of dessert. The <Link href="/product/jumbo-chocolate-chip-cookie/">JOIRUSH Jumbo 
        Chocolate Chip Cookie</Link> has its own origin story, and it's the one that launched 
        an entire line of <strong>handmade cookie wall art</strong>.
      </p>

      <p>
        This is how a mixed media artist in Orlando turned a love of nostalgia into 
        <strong>chocolate chip cookie wall art</strong> that hangs in kitchens, bakeries, and 
        content studios across the country.
      </p>

      <h2>Where It Started</h2>

      <p>
        Erynn didn't set out to become a <strong>faux cookie sculpture</strong> artist. Like 
        many creative journeys, JOIRUSH started somewhere adjacent — with Y2K-inspired jewelry, 
        Tamagotchi chokers, and custom accessories that celebrated all things nostalgic and fun.
      </p>

      <p>
        The leap to oversized dessert sculptures came from a question: what if that same playful, 
        nostalgia-drenched energy could live on a wall? What if you could capture the feeling of 
        walking into a bakery — that hit of warmth and sweetness — in a piece of permanent art?
      </p>

      <p>
        The first attempt was a chocolate chip cookie. Of course it was. The chocolate chip 
        cookie is the default, the classic, the one everyone pictures when someone says "cookie." 
        Getting it right would prove the concept.
      </p>

      <h2>The Challenge of Realism</h2>

      <p>
        Making a cookie <em>look</em> like a cookie is harder than it sounds. Real cookies have 
        texture — bubbles, cracks, craggy edges where the dough spread unevenly. They have 
        variation in color from the golden centers to the slightly darker rims. The chips aren't 
        uniform; they're scattered, some buried, some proudly on top, some cracked to show the 
        chocolate inside.
      </p>

      <p>
        Early experiments focused on capturing these details:
      </p>

      <ul>
        <li><strong>The base:</strong> Wood provides a sturdy, lightweight foundation that won't 
        warp or sag over time</li>
        <li><strong>The texture:</strong> Clay sculpted by hand to mimic the organic, uneven 
        surface of real baked dough</li>
        <li><strong>The color:</strong> Multiple layers of acrylic paint, building up the 
        golden-brown gradients that make cookies look freshly baked</li>
        <li><strong>The chips:</strong> Each one placed and painted individually, with varying 
        degrees of "melt" and gloss</li>
      </ul>

      <p>
        The goal was never hyperrealism for its own sake — it was to trigger that emotional 
        response. The double-take. The "wait, is that real?" moment followed by a smile. 
        <strong>Faux food wall art</strong> that makes you feel something.
      </p>

      <h2>The Materials Behind the Magic</h2>

      <p>
        Every JOIRUSH <strong>cookie sculpture</strong> uses the same core materials, chosen 
        for both aesthetics and durability:
      </p>

      <h3>Wood</h3>
      <p>
        The foundation. Wood keeps the piece lightweight (most jumbo cookies weigh just 2-3 
        pounds) while providing stability. It won't crack, warp, or degrade over time like 
        some alternative materials.
      </p>

      <h3>Clay</h3>
      <p>
        The texture layer. Hand-sculpted clay creates the distinctive surface — the bubbles, 
        the ridges, the craggy edges that make each cookie unique. This is where the "handmade" 
        part really shows. No two cookies are identical because no two sculpting sessions 
        are identical.
      </p>

      <h3>Acrylic Paint</h3>
      <p>
        The color and finish. Acrylics allow for layered applications that build depth — 
        starting with base tones and gradually adding the highlights and shadows that make 
        the cookie read as three-dimensional. The chips get special attention: a base layer, 
        color variation, then a gloss coat to mimic melted chocolate.
      </p>

      <h2>Why the Classic Chocolate Chip?</h2>

      <p>
        Of all the cookies in the world, why lead with chocolate chip? A few reasons:
      </p>

      <p>
        <strong>Universal appeal.</strong> Everyone knows this cookie. It transcends age, 
        background, and dietary preferences (as wall art, at least). When someone sees a 
        <strong>chocolate chip cookie wall art</strong> piece, they immediately know what 
        it is. No explanation needed.
      </p>

      <p>
        <strong>Emotional resonance.</strong> Chocolate chip cookies carry associations — 
        childhood, home, comfort, celebration. They're the cookie your mom made, the cookie 
        at the school bake sale, the cookie warm from the oven on a Sunday afternoon. That 
        emotional weight transfers to the art.
      </p>

      <p>
        <strong>Visual interest.</strong> The contrast between golden dough and dark chips 
        creates natural visual appeal. The scattered chip placement adds organic variety. 
        It's inherently interesting to look at.
      </p>

      <h2>From One to Many</h2>

      <p>
        The success of that first chocolate chip cookie opened doors. Once the technique was 
        proven, the question became: what else?
      </p>

      <p>
        Candy cookies came next — the <Link href="/product/jumbo-mm-cookie/">M&M cookie</Link>, 
        the <Link href="/product/rainbow-candy-cookie/">rainbow candy version</Link>, eventually 
        the <Link href="/product/hot-pink-mm-cookie/">hot pink statement piece</Link>. Each 
        required adapting the technique for new challenges: smooth candy surfaces versus 
        glossy chips, bright colors versus warm browns.
      </p>

      <p>
        Sets emerged from customer requests. People wanted pairs — for symmetry, for gallery 
        walls, for gifting as couples. The 
        <Link href="/product/jumbo-mm-cookie-set/"> M&M cookie set</Link> and 
        <Link href="/product/oversized-mini-cookie-pair/"> mini cookie pair</Link> became 
        bestsellers.
      </p>

      <p>
        And then the ice cream sandwich happened. The 
        <Link href="/product/cookie-ice-cream-sandwich/"> jumbo cookie ice cream sandwich</Link> was 
        the most ambitious piece yet: two cookie layers, a thick vanilla middle, all the 
        texture challenges doubled. It became the ultimate statement piece in the collection.
      </p>

      <h2>The Process Today</h2>

      <p>
        Five years and 80+ sales later, Erynn still makes every piece by hand in Orlando, 
        Florida. The process hasn't changed much:
      </p>

      <ol>
        <li><strong>Cut and shape the wood base</strong> — sized for the specific cookie design</li>
        <li><strong>Sculpt the clay texture</strong> — this is the most time-intensive step</li>
        <li><strong>Base coat painting</strong> — establishing the primary color</li>
        <li><strong>Detail painting</strong> — building up the gradients and variations</li>
        <li><strong>Chip or candy placement</strong> — each one positioned and painted individually</li>
        <li><strong>Finish and seal</strong> — protecting the surface for longevity</li>
        <li><strong>Attach hanger</strong> — built-in for easy wall mounting</li>
      </ol>

      <p>
        The whole process takes several days. There's no way to rush it; each layer needs to 
        dry properly before the next. That's why these pieces are handmade to order rather 
        than mass-produced.
      </p>

      <h2>Who Buys Cookie Wall Art?</h2>

      <p>
        Over 80 sales and 31 five-star reviews reveal some patterns. The people hanging 
        <strong>jumbo cookie wall art</strong> in their spaces include:
      </p>

      <ul>
        <li><strong>Kitchen maximalists</strong> — people who want their kitchen to be as 
        personality-filled as the rest of their home</li>
        <li><strong>Bakery and café owners</strong> — looking for 
        <Link href="/for/bakeries-cafes/"> commercial-quality decor</Link> that's lighter and 
        more affordable than traditional food props</li>
        <li><strong>Content creators</strong> — building distinctive backdrops for photos 
        and videos</li>
        <li><strong>Gift givers</strong> — searching for unforgettable 
        <Link href="/blog/foodie-gift-guide-jumbo-cookie-sculptures/"> gifts for food lovers</Link></li>
        <li><strong>Dopamine decor enthusiasts</strong> — embracing the 
        <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/"> gallery wall trend</Link> with 
        pieces that spark genuine joy</li>
      </ul>

      <h2>The Classic Lives On</h2>

      <p>
        Despite all the variations that followed — the candy cookies, the seasonal pieces, 
        the statement sculptures — the original 
        <Link href="/product/jumbo-chocolate-chip-cookie/"> Jumbo Chocolate Chip Cookie</Link> remains 
        the heart of JOIRUSH. It's still the bestseller. Still the first piece many collectors 
        buy. Still the one that makes people stop and stare.
      </p>

      <p>
        There's something about that golden-brown classic that just works. Maybe it's the 
        nostalgia. Maybe it's the universal appeal. Or maybe it's just that chocolate chip 
        cookies — real or sculpted — are simply perfect.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Who makes JOIRUSH cookie wall art?</h3>
      <p>
        JOIRUSH <strong>cookie wall art</strong> is handmade by Erynn, a mixed media artist 
        based in Orlando, Florida. Each piece is individually sculpted, painted, and finished 
        by hand in her studio. With over 80 sales and 31 five-star reviews on Etsy, she's 
        built a reputation for realistic, high-quality <strong>faux food sculptures</strong>.
      </p>

      <h3>What are JOIRUSH cookies made of?</h3>
      <p>
        JOIRUSH <strong>cookie sculptures</strong> are made from wood, clay, and acrylic paint. 
        The wood provides a sturdy, lightweight base. Clay creates the realistic sculpted 
        texture. Acrylic paint adds the lifelike coloring, gradients, and glossy chip details 
        that make each piece look good enough to eat.
      </p>

      <h3>How long does it take to make a jumbo cookie sculpture?</h3>
      <p>
        Each <strong>handmade cookie sculpture</strong> takes several days to complete. The 
        process includes building the wood base, sculpting the clay texture, applying multiple 
        layers of paint, adding individual chips, and finishing with protective sealant. The 
        process can't be rushed because each layer needs to dry properly before the next.
      </p>

      <h3>Where is JOIRUSH located?</h3>
      <p>
        JOIRUSH is based in Orlando, Florida, with pieces shipping from Daytona Beach, FL. 
        All orders include free shipping within the United States.
      </p>

      <h2>Start Your Collection</h2>

      <p>
        Whether you're looking for your first piece of <strong>faux food wall art</strong> or 
        adding to an existing gallery, the classic chocolate chip cookie is the perfect 
        starting point. Browse the full <Link href="/wall-art/">cookie wall art collection</Link>, or 
        <Link href="/custom/"> request a custom piece</Link> in your ideal size, color, or flavor. 
        Every sculpture ships free within the US, ready to hang and ready to spark conversations.
      </p>
    </>
  );
}
