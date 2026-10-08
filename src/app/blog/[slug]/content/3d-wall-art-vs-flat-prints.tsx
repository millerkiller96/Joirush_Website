import Link from "next/link";
import { FaqJsonLd, FaqList, type Faq } from "./faq-helpers";

const faqs: Faq[] = [
  {
    question: "What is 3D wall art?",
    answer:
      "3D wall art is any piece that projects off the wall instead of lying flat: relief carvings, metal or clay sculptures, textured paintings, and dimensional objects like faux food sculpture. Its depth creates shadows that change with the light.",
  },
  {
    question: "Is 3D wall art better than a print?",
    answer:
      "Neither is better; they do different jobs. Prints are great for detailed images, matching sets, and tight budgets. 3D wall art adds texture, shadow, and presence, especially on a wall that needs a focal point.",
  },
  {
    question: "Where does sculptural wall decor look best?",
    answer:
      "On a wall that gets light from the side, such as next to a window, and where people can see it from more than one angle. Entryways, kitchens, breakfast nooks, and the middle of a gallery wall are all good spots.",
  },
  {
    question: "Is 3D wall art heavy?",
    answer:
      "It depends on the material. Stone and metal can be heavy, while foam pieces are light. JOIRUSH cookies are spray foam and acrylic, and most weigh 2 to 4 lbs with a built in hanger.",
  },
];

export function ThreeDWallArtSchema() {
  return <FaqJsonLd faqs={faqs} />;
}

export function ThreeDWallArtContent() {
  return (
    <>
      <p>
        Hang a print and a sculpture side by side and you will notice something within a day. The
        print looks the same at breakfast and at dinner. The sculpture keeps changing.
      </p>

      <p>
        That is the real difference between 3D wall art and flat art. Here is when each one shines,
        and how to use both on the same wall.
      </p>

      <div className="key-takeaways">
        <p>Key takeaways</p>
        <ul>
          <li>3D wall art adds shadow and texture that shift with the light.</li>
          <li>Prints win for detail, matching sets, and tight budgets.</li>
          <li>Sculptural pieces look best with side light and room to be seen from an angle.</li>
          <li>One dimensional piece in a gallery wall breaks up all those rectangles.</li>
        </ul>
      </div>

      <h2>What Counts as 3D Wall Art?</h2>

      <p>
        Anything that comes off the wall with intent. Carved wood, metal and clay relief, heavily
        textured paintings, woven hangings, and dimensional objects like faux food sculpture all
        fit.
      </p>

      <p>
        What they share is depth. Depth means shadow, and shadow means the piece looks a little
        different every hour.
      </p>

      <h2>Side by Side</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Flat print</th>
            <th>3D wall art</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Looks like</td>
            <td>The same all day</td>
            <td>Changes as light moves</td>
          </tr>
          <tr>
            <td>Best at</td>
            <td>Detailed images, color fields</td>
            <td>Texture, presence, surprise</td>
          </tr>
          <tr>
            <td>From the side</td>
            <td>Disappears</td>
            <td>Still reads clearly</td>
          </tr>
          <tr>
            <td>Good for</td>
            <td>Sets, hallways, tight budgets</td>
            <td>Focal walls, gallery walls, nooks</td>
          </tr>
        </tbody>
      </table>

      <h2>When a Print Is the Right Call</h2>

      <ul>
        <li>You want a detailed image, like a photo or an illustration.</li>
        <li>You are hanging a matching set in a row.</li>
        <li>The wall is in a tight hallway where people brush past.</li>
        <li>You want to cover a big area for less.</li>
      </ul>

      <h2>When Sculptural Decor Wins</h2>

      <ul>
        <li>A blank wall needs a focal point, not just a picture.</li>
        <li>People see the wall from an angle, like down a hallway or across a kitchen.</li>
        <li>The room gets nice side light from a window.</li>
        <li>You want guests to stop and look twice.</li>
      </ul>

      <aside className="pull-quote">
        A print looks the same at breakfast and at dinner. A sculpture keeps changing.
      </aside>

      <h2>How to Light 3D Art</h2>

      <p>
        Side light is your best friend. Light skimming across a textured surface makes every ridge
        cast a tiny shadow. Straight on light flattens it.
      </p>

      <p>
        A spot near a window, or a picture light angled from above, shows off texture beautifully.
        Our cookies are a good example: the craggy edges and glossy chips come alive when light
        hits them from the side.
      </p>

      <h2>Mixing 3D and Flat on One Wall</h2>

      <p>
        You do not have to choose. A gallery wall of prints with one dimensional piece in the
        middle feels richer than either alone.
      </p>

      <ul>
        <li>Put the 3D piece near the center so it anchors the group.</li>
        <li>Keep gaps between pieces even, so the mix still looks tidy.</li>
        <li>Repeat one color from the sculpture in a nearby print.</li>
      </ul>

      <p>
        The <Link href="/product/giant-double-chocolate-cookie/">double chocolate cookie</Link>{" "}
        is moody enough to sit with black and white photos. For a true statement, the{" "}
        <Link href="/product/cookie-ice-cream-sandwich/">ice cream sandwich</Link> can hold a wall
        on its own.
      </p>

      <div className="callout">
        <p>
          <strong>Good to know:</strong> every JOIRUSH piece is sculpted by hand from spray foam
          and painted with acrylics. Most weigh 2 to 4 lbs and have a built in hanger, so they go up
          as easily as a framed print. Curious how they are made? Read{" "}
          <Link href="/blog/spray-foam-cookie-wall-art-how-theyre-made/">the studio process</Link>.
        </p>
      </div>

      <h2>Caring for Dimensional Art</h2>

      <p>
        Dust is the main enemy. A soft, dry brush gets into the crevices without scratching
        anything. Keep pieces out of strong direct sun to protect painted
        colors.
      </p>

      <p>
        Want to see more dimensional pieces for the wall? Browse our{" "}
        <Link href="/oversized-food-wall-art/">sculptural decor and oversized food wall art</Link>{" "}
        collection.
      </p>

      <FaqList faqs={faqs} />
    </>
  );
}
