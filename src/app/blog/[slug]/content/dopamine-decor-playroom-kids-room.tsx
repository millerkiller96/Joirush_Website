import Link from "next/link";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "What is a dopamine decor playroom?",
    answer:
      "It is a playroom designed around color, shapes, and objects that make kids (and grownups) happy, balanced with enough calm and storage that the room still feels restful and easy to tidy.",
  },
  {
    question: "What colors work best in a playroom?",
    answer:
      "Pick two or three main colors plus a neutral. Mustard with navy, mint with cherry red, or a soft pastel mix all work well. Keep the bright colors on smaller things and let the walls or floor be calmer.",
  },
  {
    question: "How do I keep a colorful playroom from feeling chaotic?",
    answer:
      "Give toys a home behind doors or in lidded bins, leave one wall fairly quiet, and limit open shelves to a few favorite things. Color looks joyful when it has some space around it.",
  },
  {
    question: "Is faux food art safe for a kids' room?",
    answer:
      "Treat it like any other wall art. JOIRUSH cookies are decorative only, not toys and not edible, so hang them securely on the wall above little hands rather than on a low shelf.",
  },
];

export function DopaminePlayroomSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function DopaminePlayroomContent() {
  return (
    <>
      <p>
        If any room in the house is allowed to be happy and loud, it is the playroom. Kids love
        color, and honestly, so do the grownups who spend half their weekends in there.
      </p>

      <p>
        The goal is a room that feels like a treat, not a toy aisle that exploded. Here is how to
        get the fun of dopamine decor with a room you can still tidy in ten minutes.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>Choose two or three colors plus a neutral, and repeat them.</li>
          <li>Put the boldest color on things you can change easily.</li>
          <li>Closed storage keeps the joy and hides the mess.</li>
          <li>Pick wall art that will still make sense when your kid is ten.</li>
        </ul>
      </div>

      <h2>Pick a Small Palette</h2>

      <p>
        Rainbow everything sounds fun, but it gets noisy fast. Instead, choose two or three colors
        and one calm neutral. Mustard and navy. Mint and cherry red. Lavender, blush, and butter
        yellow.
      </p>

      <p>
        Then repeat those colors on purpose: the rug, the bins, a lampshade, the art.
      </p>

      <h2>Make One Wall the Star</h2>

      <p>
        You do not need to decorate every surface. Choose one feature wall for a mural, a bold
        wallpaper, or a cluster of happy art, and let the other walls rest.
      </p>

      <p>
        A cheerful food piece is a great centerpiece here. Our{" "}
        <Link href="/product/giant-peanut-butter-cookie/">peanut butter cookie</Link> has candy
        confetti on warm dough, and the{" "}
        <Link href="/product/jumbo-pastel-mm-cookie/">pastel M&amp;M cookie</Link> brings softer
        color for younger kids&apos; rooms.
      </p>

      <aside className="pull-quote">
        A playroom should feel like a treat, not a toy aisle that exploded.
      </aside>

      <h2>Storage That Doubles as Decor</h2>

      <p>
        Toys are the real clutter, so the storage matters as much as the paint. Colorful lockers,
        lidded baskets, and cabinets with doors keep things out of sight while still adding color.
      </p>

      <p>
        Keep open shelves for a few favorite books and toys, and rotate them every few weeks. It
        feels new to kids and keeps the shelves from overflowing.
      </p>

      <h2>Add Soft Texture</h2>

      <p>
        A washable rug, floor cushions, and a cozy reading corner make the room comfortable for
        long play sessions. Texture also softens all that color so it feels warm instead of sharp.
      </p>

      <h2>Choose Art That Grows Up</h2>

      <p>
        Cartoon prints can feel babyish in a couple of years. Art with playful subjects that adults
        also enjoy lasts much longer. Food, animals, bold shapes, and big color all age well.
      </p>

      <p>
        A giant cookie is a good example. It is silly enough for a five year old and still fun in a
        teen&apos;s room, or moved to the kitchen later.
      </p>

      <div className="callout">
        <p>
          <strong>Safety note:</strong> our cookies are handmade from spray foam and acrylic paint.
          They are decorative only, not toys and not edible. Each has a built in hanger and most
          weigh 2 to 4 lbs, so hang them securely on the wall, above little hands.
        </p>
      </div>

      <h2>Light It Warmly</h2>

      <p>
        A harsh ceiling light flattens color. Add a lamp with a warm bulb near the reading corner,
        and a dimmer if you can. Bright rooms feel happier when the light is soft.
      </p>

      <h2>Keep One Calm Zone</h2>

      <p>
        Even the most colorful playroom needs a quiet spot where kids can wind down. A beanbag and a
        basket of books is plenty. Keep the palette softer there.
      </p>

      <p>
        For ideas beyond the playroom, from the kitchen to the home office, read our main guide to{" "}
        <Link href="/blog/dopamine-decor-ideas/">dopamine decor ideas</Link>.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
