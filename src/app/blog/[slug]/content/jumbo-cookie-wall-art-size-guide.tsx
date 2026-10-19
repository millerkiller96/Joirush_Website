import Link from "next/link";
import { products, getDisplayName, getSyncedPrice, formatPrice } from "@/data/products";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "How big is jumbo cookie wall art?",
    answer:
      "Most JOIRUSH jumbo cookie wall art pieces are about 16 inches across, roughly the size of a large dinner platter. A few designs are 14 inches, the sets come as two matching cookies, and the ice cream sandwich is a larger statement piece.",
  },
  {
    question: "What size cookie wall art should I get for a kitchen?",
    answer:
      "A single 16 inch cookie fills the space above a coffee bar, a breakfast nook, or a stretch of open wall between cabinets. For a small kitchen or a narrow wall, a 14 inch piece or the mini jumbo keeps the joke without crowding the room.",
  },
  {
    question: "How much does a giant cookie sculpture weigh?",
    answer:
      "Most pieces weigh 2 to 4 lbs because they are sculpted from spray foam, not resin or fiberglass. The ice cream sandwich statement piece is about 4 to 5 lbs. Every piece has an attached hanger and goes up on a single nail or picture hook.",
  },
  {
    question: "Can I use a giant cookie as a party or photo prop?",
    answer:
      "Yes. Because the sculptures are light, collectors take them down for a birthday table, a baby shower backdrop, or a photo shoot at home, then hang them back on the wall afterward. They are decorative art, not edible.",
  },
  {
    question: "Can I order a custom size?",
    answer:
      "Yes. If you have a specific wall or a gallery layout in mind, request a custom order with your measurements and colors and cookie artist Erynn will quote a one of a kind piece.",
  },
];

export function CookieSizeGuideSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function CookieSizeGuideContent() {
  return (
    <>
      <p>
        The most common question collectors ask before buying <strong>jumbo cookie wall art</strong>{" "}
        is simple: how big is it, really? Photos make every giant cookie look either tiny or
        enormous. This guide gives you the real sizes of every JOIRUSH piece, how each one reads on
        a wall, and how to pick the right size for your room.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>Most JOIRUSH cookies are about 16 inches across, close to a large dinner platter.</li>
          <li>14 inch pieces and the mini jumbo suit small kitchens, narrow walls, and shelves.</li>
          <li>Sets give you two matching cookies for wider walls and gallery layouts.</li>
          <li>Most pieces weigh 2 to 4 lbs and hang on a single nail.</li>
        </ul>
      </div>

      <h2>Every JOIRUSH Cookie by Size</h2>

      <p>
        Here is the full collection with each piece&apos;s listed size and current price. Every
        piece is handmade to order, so expect small natural variation from cookie to cookie.
      </p>

      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.slug}>
              <td>
                <Link href={`/product/${product.slug}/`}>{getDisplayName(product)}</Link>
              </td>
              <td>{product.size}</td>
              <td>{formatPrice(getSyncedPrice(product.slug))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>How a 16 Inch Cookie Looks on a Wall</h2>

      <p>
        Sixteen inches is bigger than most people picture. It is wider than a standard sheet of
        paper is tall, and about the size of a large dinner platter. On a kitchen wall it reads as
        a clear focal point from across the room, which is exactly why guests reach out to touch
        it. Pieces like the{" "}
        <Link href="/product/jumbo-chocolate-chip-cookie/">Jumbo Chocolate Chip Cookie</Link> and
        the <Link href="/product/hot-pink-mm-cookie/">Hot Pink M&amp;M Cookie</Link> sit in this
        size.
      </p>

      <p>
        A good rule: leave at least a hand&apos;s width of open wall on every side so the cookie
        has room to breathe. Above a coffee bar or a small console, one 16 inch cookie is usually
        all the wall needs.
      </p>

      <h2>When a 14 Inch or Mini Jumbo Cookie Fits Better</h2>

      <p>
        Smaller pieces like the{" "}
        <Link href="/product/rainbow-candy-cookie/">Rainbow Candy Cookie</Link> and the{" "}
        <Link href="/product/mini-jumbo-chocolate-chip-cookie/">Mini Jumbo Chocolate Chip</Link>{" "}
        work well on narrow walls, between windows, above a light switch cluster, or leaning on a
        floating shelf. They are also the easiest way to start a collection and add bigger pieces
        later.
      </p>

      <h2>Pairs and Gallery Walls</h2>

      <p>
        For a wide wall, a pair often looks better than one big piece. The{" "}
        <Link href="/product/jumbo-mm-cookie-set/">Jumbo M&amp;M Cookie Set</Link> and the{" "}
        <Link href="/product/oversized-mini-cookie-pair/">Oversized Mini Cookie Pair</Link> come
        as two matching cookies you can hang side by side or offset at different heights. If you
        want to mix flavors, our{" "}
        <Link href="/blog/kitchen-dopamine-decor-dessert-gallery-wall/">
          dessert gallery wall guide
        </Link>{" "}
        shows how to space three or more pieces.
      </p>

      <h2>The Statement Piece</h2>

      <p>
        The <Link href="/product/cookie-ice-cream-sandwich/">Jumbo Ice Cream Sandwich</Link> is the
        largest piece in the shop and the one to choose when a wall needs a single bold anchor. It
        still weighs only about 4 to 5 lbs, so it hangs on standard picture hooks.
      </p>

      <h2>Size and Weight Compared to Other Giant Cookie Decor</h2>

      <p>
        When you shop for a <strong>giant cookie prop</strong> or oversized cookie statue, you will
        see a wide range: small foam cookies around 8 to 12 inches, party props from 10 to 18
        inches, and resin or fiberglass statues that can reach 28 inches and weigh 10 to 20 lbs.
        JOIRUSH sits in the sweet spot for a home wall: large enough to be the first thing people
        notice, light enough that you never need anchors.
      </p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Small foam cookie</th>
            <th>JOIRUSH jumbo cookie</th>
            <th>Resin or fiberglass statue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Typical size</td>
            <td>8 to 12 in</td>
            <td>14 to 16 in, plus sets</td>
            <td>Up to about 28 in</td>
          </tr>
          <tr>
            <td>Typical weight</td>
            <td>Under 1 lb</td>
            <td>2 to 4 lbs</td>
            <td>10 to 20 lbs</td>
          </tr>
          <tr>
            <td>Hanging</td>
            <td>Small nail or hook</td>
            <td>Attached hanger, one nail</td>
            <td>Brackets or anchors</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Shelves and tiny walls</td>
            <td>Kitchens, nooks, playrooms</td>
            <td>Large open spaces</td>
          </tr>
        </tbody>
      </table>

      <h2>Using Your Cookie as a Party or Photo Prop</h2>

      <p>
        Because every piece is light, a lot of collectors take theirs down for a birthday dessert
        table, a baby shower backdrop, or a photo shoot at home, then hang it back up afterward. A
        pair or a mix of flavors makes the best backdrop. Just remember it is art, not dessert.
      </p>

      <h2>Hanging Tips by Size</h2>

      <p>
        Every JOIRUSH cookie arrives with an attached hanger. Center 14 and 16 inch pieces at about
        eye level, and hang pairs a few inches apart so they read as a set. For heights, spacing,
        and wall types, see{" "}
        <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">how to hang jumbo cookie wall art</Link>
        .
      </p>

      <div className="callout">
        <p>
          <strong>Need an exact size?</strong> If you have a specific wall in mind, send your
          measurements through a{" "}
          <Link href="/custom/">custom cookie art order</Link> and get a one of a kind piece made
          to fit.
        </p>
      </div>

      <h2>Find Your Size</h2>

      <p>
        Browse every flavor in the{" "}
        <Link href="/wall-art/">giant cookie wall art shop</Link>, see what each piece is made of
        in{" "}
        <Link href="/blog/spray-foam-cookie-wall-art-how-theyre-made/">
          how spray foam cookie sculptures are made
        </Link>
        , or start with the classic{" "}
        <Link href="/product/jumbo-chocolate-chip-cookie/">Jumbo Chocolate Chip Cookie</Link>. Every
        piece ships free in the U.S. and is handmade to order in about 14 days.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
