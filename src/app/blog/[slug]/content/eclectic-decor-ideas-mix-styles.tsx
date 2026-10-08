import Link from "next/link";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "What is eclectic decor?",
    answer:
      "Eclectic decor mixes furniture, art, and objects from different eras and styles in one room. What keeps it from looking random is a common thread, usually a shared color, material, or shape that repeats around the space.",
  },
  {
    question: "How many styles can I mix in one room?",
    answer:
      "Two or three is plenty. Let one style lead and make up most of the room, then bring in one or two others as accents. More than that tends to feel like a showroom with no point of view.",
  },
  {
    question: "Is eclectic decor the same as maximalism?",
    answer:
      "No. Eclectic is about mixing styles, while maximalism is about volume: more color, pattern, and stuff. An eclectic room can be quite calm, and a maximalist room can stick to one style.",
  },
  {
    question: "How do I start an eclectic room on a budget?",
    answer:
      "Keep the big pieces simple and neutral, then build character with thrifted finds, family hand me downs, and one or two pieces of art you really love. Eclectic rooms are meant to come together over time.",
  },
];

export function EclecticDecorSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function EclecticDecorContent() {
  return (
    <>
      <p>
        A good eclectic room looks like it was collected by a person, not ordered from one catalog.
        There is a midcentury chair next to a carved antique table, a modern print over a vintage
        dresser, and somehow it all works.
      </p>

      <p>
        That &quot;somehow&quot; is actually a few simple habits. Here they are.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>Let one style lead and keep the others as supporting players.</li>
          <li>Pick a common thread: a color, a wood tone, a metal, or a shape.</li>
          <li>Give every odd piece a buddy so it never looks lost.</li>
          <li>A gallery wall is the easiest place to practice mixing.</li>
        </ul>
      </div>

      <h2>Start With a Lead Style</h2>

      <p>
        Eclectic does not mean equal parts of everything. Pick the style you feel most at home in
        and let it take up most of the room. Maybe that is modern, maybe farmhouse, maybe
        midcentury.
      </p>

      <p>
        Then invite one or two guests. A traditional rug in a modern room. A sleek lamp in a cottage
        living room. The contrast is the fun part, but only if there is a clear host.
      </p>

      <h2>Find Your Common Thread</h2>

      <p>
        This is the secret ingredient. Choose one thing that repeats across all your different
        pieces:
      </p>

      <ul>
        <li><strong>Color:</strong> two or three hues that show up in the rug, the art, and the pillows</li>
        <li><strong>Material:</strong> warm wood, brass, or rattan in several spots</li>
        <li><strong>Shape:</strong> lots of curves, or lots of clean straight lines</li>
      </ul>

      <p>
        When a vintage chair and a brand new sofa share a color, your eye reads them as a pair
        instead of strangers.
      </p>

      <aside className="pull-quote">
        Eclectic does not mean equal parts of everything. It means a clear host and a few
        interesting guests.
      </aside>

      <h2>Give Every Odd Piece a Buddy</h2>

      <p>
        One lonely Victorian chair in a modern room looks like a mistake. Add a second traditional
        touch, like a framed botanical print or a carved mirror, and suddenly it looks intentional.
      </p>

      <p>
        The same goes for anything playful. A single{" "}
        <Link href="/product/jumbo-mm-cookie/">jumbo M&amp;M cookie</Link> on the wall reads as a
        bold choice when its candy colors echo a striped pillow or a colorful vase nearby.
      </p>

      <h2>Mix Eras, Then Check the Scale</h2>

      <p>
        Mixing old and new is the heart of eclectic decor. Just watch the proportions. A low,
        sleek sofa next to a very tall wingback chair can feel lopsided, even if both are lovely.
      </p>

      <p>
        Try to keep neighboring pieces at a similar visual weight. Bigger pieces want bigger
        partners.
      </p>

      <h2>Practice on a Gallery Wall</h2>

      <p>
        Walls are the low risk place to experiment. Mix oil paintings with posters, plates with
        mirrors, and flat art with one dimensional piece. Varied frames are welcome here.
      </p>

      <p>
        A sculptural object breaks up all those rectangles. Our cookies are handmade from spray
        foam and acrylic and most weigh 2 to 4 lbs, so one slots into a gallery wall on a single
        nail.
      </p>

      <div className="callout">
        <p>
          <strong>Layout tip:</strong> lay everything out on the floor first, biggest piece in the
          middle, and keep roughly the same gap between frames. Take a photo, then hang.
        </p>
      </div>

      <h2>Leave Some Breathing Room</h2>

      <p>
        Eclectic rooms can tip into clutter fast. Leave a few empty surfaces and a bit of blank
        wall. The pieces you love will stand out more, not less.
      </p>

      <p>
        If you want to turn the volume all the way up, that is where{" "}
        <Link href="/blog/maximalist-decor-ideas/">maximalist decor</Link> comes in. Our main
        guide covers how the two styles overlap and how to layer color and pattern with
        confidence.
      </p>

      <h2>Eclectic Pairings That Almost Always Work</h2>

      <ul>
        <li>Modern sofa with a vintage rug</li>
        <li>Antique dining table with simple modern chairs</li>
        <li>Rustic wood with glossy lacquer or brass</li>
        <li>Serious art next to something that makes you laugh</li>
      </ul>

      <p>
        That last one matters more than people think. A little humor, like a{" "}
        <Link href="/colorful-wall-art/">colorful cookie sculpture</Link> beside a moody landscape
        painting, keeps an eclectic room from feeling too precious.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
