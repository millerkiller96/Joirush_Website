import Link from "next/link";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "How high should I hang art above a coffee bar?",
    answer:
      "Leave a comfortable gap above the tallest thing on the counter, usually the coffee maker or kettle, so steam and hands stay clear. Around 8 to 12 inches above the machine is a good place to start, then adjust so the art still feels connected to the counter.",
  },
  {
    question: "What can I put on the wall in a small kitchen?",
    answer:
      "Choose one confident piece instead of lots of little ones. A single round or vertical piece on a narrow wall, the end of a cabinet run, or beside a window adds personality without crowding the room.",
  },
  {
    question: "Should I decorate above kitchen cabinets?",
    answer:
      "If there is a gap between your cabinets and the ceiling, a few larger objects look better than many small ones, and they are easier to dust. Keep it simple and leave space between pieces.",
  },
  {
    question: "Where should I avoid hanging kitchen art?",
    answer:
      "Skip the wall right above the stove, the splash zone around the sink, and spots where an open cabinet or pantry door could knock it. Strong direct sun can also fade painted finishes over time.",
  },
];

export function KitchenWallDecorSpotsSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function KitchenWallDecorSpotsContent() {
  return (
    <>
      <p>
        Most kitchens have one big blank wall and about five awkward ones. The skinny strip next to
        the fridge. The gap over the coffee maker. That weird space above the cabinets.
      </p>

      <p>
        Those leftover spots are where kitchen wall decor does its best work. Here is what to hang
        in each one, and how to keep it practical in a room full of steam and splashes.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>Keep art away from the stove, the sink splash zone, and swinging doors.</li>
          <li>Small kitchens look better with one confident piece than with many small ones.</li>
          <li>Above a coffee bar, leave clearance for steam and reaching hands.</li>
          <li>Renters can get big impact from a single nail and a lightweight piece.</li>
        </ul>
      </div>

      <h2>The Coffee Bar</h2>

      <p>
        A coffee station is a little ritual, so the wall above it deserves a little joke. A cookie
        over the coffee maker makes everyone smile on the way to their first cup.
      </p>

      <p>
        Hang it high enough to clear the machine and any steam, roughly 8 to 12 inches above the
        tallest appliance. If you have a shelf for mugs, center the art over the whole setup
        rather than squeezing it between things.
      </p>

      <h2>The Breakfast Nook</h2>

      <p>
        This is the easiest spot in the kitchen. It works like a tiny dining room, so you can hang
        art lower than usual, at seated eye level, and it will feel cozy instead of floaty.
      </p>

      <p>
        One round piece centered over a small table looks great. Over a banquette, try a pair side
        by side.
      </p>

      <h2>The Skinny Wall</h2>

      <p>
        Between two windows, next to the fridge, beside a doorway: these narrow walls are perfect
        for one compact piece. A 14 inch round fills the space without crowding it.
      </p>

      <p>
        Our <Link href="/product/rainbow-candy-cookie/">rainbow candy cookie</Link> and the{" "}
        <Link href="/product/mini-jumbo-chocolate-chip-cookie/">mini jumbo chocolate chip</Link>{" "}
        are sized for exactly this kind of wall.
      </p>

      <aside className="pull-quote">
        The leftover spots in a kitchen are where wall decor does its best work.
      </aside>

      <h2>Above the Cabinets</h2>

      <p>
        If your cabinets stop short of the ceiling, that gap can look unfinished. The fix is fewer,
        bigger things. Two or three larger objects with space between them look calm. Ten small
        ones look like storage.
      </p>

      <p>
        Remember you will need to dust up there, so choose pieces you can lift down easily.
      </p>

      <h2>The End of the Cabinet Run</h2>

      <p>
        The wall where your cabinets stop is often the first thing you see from the doorway. That
        makes it a great home for a statement piece, something with enough size and color to hold
        its own next to all that cabinetry.
      </p>

      <h2>Small Kitchens</h2>

      <p>
        In a small kitchen, every bit of wall counts. A few tips:
      </p>

      <ul>
        <li>Pick one piece you love rather than a cluster of small frames.</li>
        <li>Use vertical space: hang a little higher on narrow walls to draw the eye up.</li>
        <li>Repeat one color from the art in a tea towel or bowl so it feels connected.</li>
        <li>Leave the counters as clear as you can, so the wall gets the attention.</li>
      </ul>

      <h2>Renters</h2>

      <p>
        You do not need a gallery wall to make a rental kitchen feel like yours. One lightweight
        piece and one small nail hole, which is easy to fill when you move out, can change the
        whole room. Check your lease first if you are unsure.
      </p>

      <div className="callout">
        <p>
          <strong>Good to know:</strong> every JOIRUSH cookie is handmade from spray foam and
          acrylic paint, has a built in hanger, and most weigh 2 to 4 lbs. They are decorative
          only, not edible. Here is{" "}
          <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/">how to hang one</Link> step by step.
        </p>
      </div>

      <h2>Spots to Skip</h2>

      <ul>
        <li>Directly above the stove, where heat and grease build up</li>
        <li>The splash zone around the sink</li>
        <li>Anywhere a cabinet or pantry door swings into the wall</li>
        <li>Walls that get hours of strong direct sun</li>
      </ul>

      <p>
        Ready to pick something? Our{" "}
        <Link href="/kitchen-wall-art/">kitchen wall art collection</Link> sorts every piece by
        kitchen style, from warm classics to candy brights, with sizing help for each kind of wall.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
