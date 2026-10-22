import Link from "next/link";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "What is the difference between a giant cookie prop and cookie wall art?",
    answer:
      "A giant cookie prop is usually built for one event, a photo backdrop, or a store display, so it is made to read well from a distance and get moved around. Cookie wall art is made to live on your wall at home for years, with close up texture, painted detail, and an attached hanger.",
  },
  {
    question: "Can a JOIRUSH cookie be used as a party prop?",
    answer:
      "Yes. Each piece weighs about 2 to 4 lbs, so you can lift it off the wall for a birthday table, a baby shower, or a photo shoot, then hang it back up afterward. It is decorative only and not edible.",
  },
  {
    question: "How big is a giant cookie for a wall?",
    answer:
      "Most JOIRUSH cookies are about 16 inches across, with a few 14 inch designs, matching pairs, and a larger ice cream sandwich statement piece. That size reads clearly across a kitchen without needing wall anchors.",
  },
  {
    question: "What are giant cookie sculptures made of?",
    answer:
      "JOIRUSH cookies are sculpted by hand from spray foam and painted with acrylics, which keeps them light enough to hang on a single nail while holding deep, craggy texture.",
  },
  {
    question: "Can I order a giant cookie in a custom flavor or size?",
    answer:
      "Yes. Send your colors, flavor idea, and wall measurements through the custom order form and cookie artist Erynn will quote a one of a kind piece.",
  },
];

export function GiantCookiePropSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function GiantCookiePropContent() {
  return (
    <>
      <p>
        Search for a <strong>giant cookie prop</strong> and most of what you find is built for a
        party: big, bold cookies meant for a dessert table, a photo booth, or a single weekend
        event. That is perfect if you need a backdrop for Saturday. If you want a giant cookie that
        stays on your kitchen wall and still makes guests do a double take a year from now, you are
        really shopping for <strong>cookie wall art</strong>. Here is how the two compare and how to
        pick.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>Party props are made for one event and distance viewing; wall art is made to live on your wall.</li>
          <li>JOIRUSH cookies are about 14 to 16 inches, weigh 2 to 4 lbs, and hang on one nail.</li>
          <li>A wall piece can still come down for a party or photo shoot and go right back up.</li>
          <li>Choose a prop for a one time backdrop, and wall art for a kitchen, coffee bar, playroom, or gift.</li>
        </ul>
      </div>

      <h2>What a Giant Cookie Prop Is Built For</h2>

      <p>
        Props are designed around an event. They need to look good from across a room or in a
        photo, survive being carried in and out of a venue, and sit on a table, an easel, or the
        floor. Many are made from wood, foam board, or carved foam with a simple painted finish,
        and the bigger ones are sized for stages and storefronts rather than a home wall. That is
        exactly what you want for a birthday backdrop or a themed shoot. It is not always what you
        want looking back at you over the coffee maker every morning.
      </p>

      <h2>What Makes Cookie Wall Art Different</h2>

      <p>
        Wall art is judged up close. Guests walk right up to it, so the texture has to hold up at
        arm&apos;s length. Every JOIRUSH piece is sculpted by hand from spray foam, then built up
        with layers of acrylic paint so the edges look craggy and golden and the chips look glossy
        and melted. You can see the process in{" "}
        <Link href="/blog/spray-foam-cookie-wall-art-how-theyre-made/">
          how spray foam cookie wall art is made
        </Link>
        .
      </p>

      <p>
        It also has to be easy to live with. Each cookie arrives with an attached hanger, weighs
        about 2 to 4 lbs, and goes up on a single nail or picture hook. No brackets, no anchors, no
        easel taking up floor space.
      </p>

      <h2>Side by Side</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Typical giant cookie party prop</th>
            <th>JOIRUSH cookie wall art</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Made for</td>
            <td>One event, photo backdrops, displays</td>
            <td>Years on a home wall</td>
          </tr>
          <tr>
            <td>Viewed from</td>
            <td>Across the room or through a camera</td>
            <td>Arm&apos;s length, every day</td>
          </tr>
          <tr>
            <td>Display</td>
            <td>Table, easel, stand, or floor</td>
            <td>Attached hanger, one nail</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>Varies widely by maker</td>
            <td>About 14 to 16 in, plus pairs</td>
          </tr>
          <tr>
            <td>Finish</td>
            <td>Varies, often simpler paint</td>
            <td>Hand sculpted texture, layered acrylic</td>
          </tr>
        </tbody>
      </table>

      <p>
        For exact sizes of every piece, see the{" "}
        <Link href="/blog/jumbo-cookie-wall-art-size-guide/">jumbo cookie wall art size guide</Link>.
      </p>

      <h2>When a Party Prop Is the Right Call</h2>

      <p>
        If you only need a giant cookie for one afternoon, a rented or budget prop makes sense. A
        milk and cookies birthday, a bakery themed baby shower, or a single photo session are all
        good reasons to buy something built for the event and pass it on afterward.
      </p>

      <h2>When Cookie Wall Art Is the Better Buy</h2>

      <p>
        Choose wall art when the cookie is meant to stay. It is the right fit for:
      </p>

      <ul>
        <li>A kitchen or coffee bar wall that needs one playful focal point.</li>
        <li>A playroom or kids&apos; room where a giant cookie feels like a storybook detail.</li>
        <li>A dopamine decor or maximalist room that already loves bold color.</li>
        <li>A gift for the baker or foodie who has every gadget already.</li>
      </ul>

      <p>
        And you do not have to give up the party use. Because each piece is light, plenty of
        collectors lift theirs off the wall for a birthday table or a photo, then hang it back up
        the same night.
      </p>

      <h2>Which Giant Cookie to Start With</h2>

      <p>
        The <Link href="/product/jumbo-chocolate-chip-cookie/">Jumbo Chocolate Chip Cookie</Link>{" "}
        is the classic, and the one most people picture when they hear giant cookie. For color, the{" "}
        <Link href="/product/hot-pink-mm-cookie/">Hot Pink M&amp;M Cookie</Link> brings candy shop
        energy, and the <Link href="/product/cookie-ice-cream-sandwich/">Jumbo Ice Cream Sandwich</Link>{" "}
        is the biggest statement piece in the shop. Want two that match? The{" "}
        <Link href="/product/jumbo-mm-cookie-set/">Jumbo M&amp;M Cookie Set</Link> hangs side by side
        on a wider wall.
      </p>

      <div className="callout">
        <p>
          <strong>Have a flavor or wall size in mind?</strong> Send your colors and measurements
          through a <Link href="/custom/">custom cookie art order</Link> for a one of a kind piece.
        </p>
      </div>

      <h2>Hang It and Enjoy It</h2>

      <p>
        Once your cookie arrives, our guide on{" "}
        <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">how to hang jumbo cookie wall art</Link>{" "}
        covers height, spacing, and wall types. Browse every flavor in the{" "}
        <Link href="/wall-art/">giant cookie wall art shop</Link> or the{" "}
        <Link href="/catalogue/">full catalogue</Link>. Every piece is handmade to order by cookie
        artist Erynn, ships in about 14 days, and ships free in the U.S.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
