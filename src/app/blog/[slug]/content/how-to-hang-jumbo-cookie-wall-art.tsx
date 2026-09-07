import Link from "next/link";
import { getAbsoluteUrl } from "@/lib/seo";

export function HowToHangSchema() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Hang Jumbo Cookie Wall Art",
    description: "Learn the best techniques for hanging oversized cookie sculptures safely and beautifully on your wall.",
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "5",
    },
    supply: [
      { "@type": "HowToSupply", name: "Picture hanging hook or nail" },
      { "@type": "HowToSupply", name: "Level" },
      { "@type": "HowToSupply", name: "Pencil" },
      { "@type": "HowToSupply", name: "Measuring tape" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Hammer" },
      { "@type": "HowToTool", name: "Stud finder (optional)" },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Your Location",
        text: "Select a wall that will showcase your jumbo cookie wall art. Consider lighting, visibility from different angles, and whether you want a single statement piece or part of a gallery wall.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Check the Weight",
        text: "Most jumbo cookies weigh 2-4 lbs. Use a picture hook rated for at least double the weight of your piece for security.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Mark the Position",
        text: "Hold your cookie against the wall or use painter's tape to mark where you want it. Use a level to ensure it's straight.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Find the Hanger Height",
        text: "Measure from the top of the cookie to where the built-in hanger sits on the back. Subtract this distance from your mark.",
        position: 4,
      },
      {
        "@type": "HowToStep",
        name: "Install the Hook",
        text: "Drive a picture hook or nail into the wall at your marked spot. For heavy pieces, locate a stud or use appropriate drywall anchors.",
        position: 5,
      },
      {
        "@type": "HowToStep",
        name: "Hang and Adjust",
        text: "Carefully hang your jumbo cookie on the hook. Use a level to make final adjustments. Step back and admire your new wall art!",
        position: 6,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How heavy is jumbo cookie wall art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most handmade jumbo cookie sculptures weigh between 2-4 pounds, making them lightweight compared to commercial fiberglass props that can weigh 10+ pounds. This makes them easy to hang with standard picture hooks.",
        },
      },
      {
        "@type": "Question",
        name: "What type of hook do I need for faux food wall art?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A standard picture hanging hook rated for 10-20 lbs works perfectly for most jumbo cookie wall art. For drywall without studs, use a hook with an anchor for extra security.",
        },
      },
      {
        "@type": "Question",
        name: "Can I hang cookie wall art in a kitchen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Kitchens are one of the most popular spots for cookie wall art. Just avoid hanging directly above the stove where heat and grease could affect the finish over time.",
        },
      },
      {
        "@type": "Question",
        name: "How do I create a gallery wall with multiple cookie sculptures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by laying out your pieces on the floor to find an arrangement you love. Use painter's tape to mark positions on the wall before committing. Space cookies 3-6 inches apart for visual cohesion.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export function HowToHangContent() {
  return (
    <>
      <p>
        So you've fallen in love with a piece of <strong>jumbo cookie wall art</strong> — a handmade, 
        oversized faux food sculpture that looks good enough to eat. Now comes the fun part: getting 
        it on your wall where everyone can admire it. Whether you're hanging a single statement piece 
        or creating an entire <strong>faux food wall art</strong> gallery, this guide has everything 
        you need.
      </p>

      <p>
        Unlike heavy commercial food props that can weigh 10+ pounds and require serious hardware, 
        handmade cookie sculptures from artists like those at <Link href="/wall-art/">JOIRUSH</Link> are 
        specifically designed to be lightweight and hangable — typically just 2-4 pounds. That means 
        no special anchors, no contractor visits, and no stress.
      </p>

      <h2>Before You Start: What You'll Need</h2>
      
      <p>
        Gathering your supplies first makes the whole process smoother. For most <strong>faux food 
        wall art</strong> installations, you'll need:
      </p>

      <ul>
        <li><strong>Picture hanging hook or nail</strong> — rated for at least 10-20 lbs</li>
        <li><strong>Hammer</strong> — for driving in the hook</li>
        <li><strong>Level</strong> — nobody wants a crooked cookie</li>
        <li><strong>Pencil</strong> — for marking your spot</li>
        <li><strong>Measuring tape</strong> — for precise placement</li>
        <li><strong>Stud finder</strong> (optional) — if you want extra security</li>
      </ul>

      <h2>Step 1: Choose the Perfect Location</h2>

      <p>
        The right spot can transform a great piece into a showstopper. When selecting where to hang 
        your <strong>jumbo cookie wall art</strong>, consider:
      </p>

      <ul>
        <li><strong>Lighting:</strong> Natural light brings out the realistic texture and paint details. 
        Avoid direct sunlight that could fade colors over time.</li>
        <li><strong>Visibility:</strong> Think about where you and your guests will see it most — 
        above a breakfast nook, in a hallway, or as a kitchen focal point.</li>
        <li><strong>Conversation factor:</strong> These pieces are meant to spark joy and start 
        conversations. Put them somewhere people will naturally gather.</li>
      </ul>

      <p>
        Popular spots for <strong>faux cookie sculptures</strong> include kitchens (of course), 
        dining rooms, breakfast nooks, content creator studios, and playrooms. 
        The <Link href="/product/jumbo-chocolate-chip-cookie/">classic chocolate chip cookie</Link> looks 
        stunning against white or light-colored walls, while colorful 
        <Link href="/product/hot-pink-mm-cookie/"> M&M cookie versions</Link> pop against neutral backgrounds.
      </p>

      <h2>Step 2: Check the Weight Rating</h2>

      <p>
        One of the biggest advantages of handmade <strong>cookie wall art</strong> over commercial 
        fiberglass props is the weight difference. A typical JOIRUSH jumbo cookie weighs around 
        2-3 pounds — light enough for a standard picture hook, sturdy enough to stay put.
      </p>

      <p>
        As a rule of thumb, use hardware rated for at least <strong>double</strong> the actual 
        weight of your piece. So for a 3-pound cookie, a 10-lb rated hook gives you plenty of 
        margin for safety.
      </p>

      <h2>Step 3: Mark Your Position</h2>

      <p>
        Before you put any holes in the wall, figure out exactly where you want your piece. Here's 
        the easiest method:
      </p>

      <ol>
        <li>Have someone hold the cookie against the wall while you step back and check the placement</li>
        <li>Use painter's tape to outline the position if you need to try different spots</li>
        <li>Once you've decided, make a light pencil mark at the top center of where the cookie sits</li>
        <li>Use a level against your mark to make sure it's straight</li>
      </ol>

      <p>
        <strong>Pro tip:</strong> For the most natural look, hang the center of your artwork at 
        eye level — about 57-60 inches from the floor. In kitchens, you might go slightly higher 
        to account for counters and cabinets.
      </p>

      <h2>Step 4: Find the Hanger Height</h2>

      <p>
        Every JOIRUSH cookie comes with a <strong>built-in wall hanger</strong> on the back. You 
        need to know how far down from the top of the piece that hanger sits:
      </p>

      <ol>
        <li>Turn your cookie over and find the hanger (usually a sawtooth hanger or D-ring)</li>
        <li>Measure from the very top of the cookie down to the hanger point</li>
        <li>Subtract that distance from your wall mark — that's where your hook goes</li>
      </ol>

      <p>
        For example, if your mark is at 60 inches and the hanger is 2 inches from the top, you'll 
        install your hook at 58 inches.
      </p>

      <h2>Step 5: Install the Hook</h2>

      <p>
        Now for the satisfying part — putting that hook in place:
      </p>

      <ol>
        <li>If you're near a stud, drive directly into it for maximum hold</li>
        <li>For drywall, angle your picture hook slightly upward as you hammer it in</li>
        <li>For heavier pieces or extra peace of mind, use a drywall anchor first</li>
        <li>Make sure the hook is level and secure before proceeding</li>
      </ol>

      <h2>Step 6: Hang and Admire</h2>

      <p>
        The moment of truth! Carefully lift your <strong>jumbo cookie sculpture</strong> and hang it 
        on the hook. Use your level one more time to check the positioning. Step back, take a 
        photo, and enjoy watching everyone do a double-take when they see it.
      </p>

      <h2>Creating a Gallery Wall with Multiple Cookies</h2>

      <p>
        One cookie is a statement. Multiple cookies? That's a <strong>dessert gallery wall</strong> — 
        and it's one of the most impactful ways to display your collection.
      </p>

      <p>
        Here's how to plan a cohesive arrangement:
      </p>

      <ol>
        <li><strong>Start on the floor:</strong> Lay your pieces out and experiment with different 
        arrangements. The <Link href="/product/jumbo-mm-cookie-set/">M&M cookie set</Link> is 
        specifically designed to be displayed as a pair.</li>
        <li><strong>Consider color flow:</strong> Mix classic cookies with colorful candy versions 
        for visual interest, or stick to a monochromatic theme.</li>
        <li><strong>Space them evenly:</strong> 3-6 inches between pieces creates cohesion without 
        crowding. Larger gaps (8-12 inches) work for a more relaxed, organic feel.</li>
        <li><strong>Use painter's tape:</strong> Cut out paper templates the size of each cookie and 
        tape them to the wall before committing to holes.</li>
      </ol>

      <h2>Special Considerations for Different Rooms</h2>

      <h3>Kitchens</h3>
      <p>
        Kitchens are the natural home for <strong>faux food wall art</strong>, but keep these tips 
        in mind:
      </p>
      <ul>
        <li>Avoid hanging directly above the stove — heat and grease can affect the finish</li>
        <li>Great spots: above the breakfast bar, beside the fridge, or on a blank wall visible 
        from the dining area</li>
        <li>The <Link href="/product/rainbow-candy-cookie/">rainbow candy cookie</Link> adds 
        perfect pop to white kitchen cabinets</li>
      </ul>

      <h3>Content Creator Studios</h3>
      <p>
        For photoshoot and video backdrops:
      </p>
      <ul>
        <li>Position where they'll appear in frame without being distracting</li>
        <li>Consider how lighting affects the painted surfaces on camera</li>
        <li>Bold pieces like the <Link href="/product/hot-pink-mm-cookie/">hot pink M&M cookie</Link> 
        photograph beautifully</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>How heavy is jumbo cookie wall art?</h3>
      <p>
        Most handmade <strong>jumbo cookie sculptures</strong> weigh between 2-4 pounds, making 
        them lightweight compared to commercial fiberglass props that can weigh 10+ pounds. This 
        makes them easy to hang with standard picture hooks — no professional installation needed.
      </p>

      <h3>What type of hook do I need for faux food wall art?</h3>
      <p>
        A standard picture hanging hook rated for 10-20 lbs works perfectly for most 
        <strong>jumbo cookie wall art</strong>. For drywall without studs, use a hook with a 
        built-in anchor for extra security. Command strips are not recommended for pieces over 
        2 pounds.
      </p>

      <h3>Can I hang cookie wall art in a kitchen?</h3>
      <p>
        Absolutely! Kitchens are one of the most popular spots for <strong>cookie wall art</strong>. 
        Just avoid hanging directly above the stove where heat and grease could affect the acrylic 
        paint finish over time. Above a breakfast nook or on a blank wall works perfectly.
      </p>

      <h3>How do I create a gallery wall with multiple cookie sculptures?</h3>
      <p>
        Start by laying out your pieces on the floor to find an arrangement you love. Use painter's 
        tape or paper templates to mark positions on the wall before committing. Space 
        <strong>faux cookie sculptures</strong> 3-6 inches apart for visual cohesion, and use a 
        level to keep everything straight.
      </p>

      <h2>Ready to Start Your Cookie Wall?</h2>

      <p>
        Now that you know exactly how to hang <strong>faux food wall art</strong>, all you need is 
        the perfect piece. Browse the full <Link href="/wall-art/">cookie wall art collection</Link> to 
        find your flavor, or <Link href="/custom/">request a custom piece</Link> in your favorite 
        colors, your favorite candy combinations, or a one-of-a-kind design. Every cookie ships 
        free within the US in 14 days — true handcraft artistry takes time. Ready to hang with the built-in hanger.
      </p>
    </>
  );
}
