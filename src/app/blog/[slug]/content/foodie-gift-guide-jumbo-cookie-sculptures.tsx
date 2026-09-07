import Link from "next/link";
import { getAbsoluteUrl, getImageUrl } from "@/lib/seo";

export function FoodieGiftGuideSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a unique gift for a food lover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Handmade jumbo cookie wall art is a unique foodie gift that lasts forever (unlike real cookies). These realistic faux food sculptures are conversation starters that celebrate the recipient's love of food without adding calories or clutter to the kitchen.",
        },
      },
      {
        "@type": "Question",
        name: "How much do jumbo cookie sculptures cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Handmade jumbo cookie wall art from JOIRUSH ranges from $90-$225, with single cookies starting at $90 and sets or statement pieces at the higher end. All pieces include free US shipping.",
        },
      },
      {
        "@type": "Question",
        name: "Do cookie sculptures ship safely?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Each cookie sculpture is carefully packaged to arrive safely. They're made from durable materials (wood, clay, and acrylic paint) designed to withstand shipping and last for years on display.",
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

export function FoodieGiftGuideContent() {
  return (
    <>
      <p>
        We all have that person in our lives — the one who photographs every meal, who has 
        opinions about the best local bakery, who watches food documentaries like other people 
        watch crime dramas. Finding gifts for them isn't hard; finding <em>memorable</em> gifts 
        is the challenge. Another cookbook? They have seventeen. A fancy ingredient? Used once 
        and forgotten.
      </p>

      <p>
        Here's a better idea: <strong>jumbo cookie wall art</strong>. A handmade, oversized 
        faux food sculpture that celebrates their passion without adding to the kitchen gadget 
        drawer. Something they'll see every day and smile about. Something that screams "someone 
        really <em>gets</em> me."
      </p>

      <p>
        This guide breaks down the best cookie sculptures for every type of foodie in your life, 
        from the minimalist to the maximalist, from the baker to the business owner.
      </p>

      <h2>Why Cookie Sculptures Make Perfect Foodie Gifts</h2>

      <p>
        Before we dive into specific recommendations, let's talk about why 
        <strong>faux food wall art</strong> hits different as a gift:
      </p>

      <ul>
        <li><strong>Permanent:</strong> Unlike actual food gifts, these last forever</li>
        <li><strong>Surprising:</strong> Nobody expects to unwrap a giant cookie</li>
        <li><strong>Personal:</strong> You can match the piece to their personality and space</li>
        <li><strong>Conversation-starting:</strong> Every guest will ask about it</li>
        <li><strong>Zero calories:</strong> All the dessert vibes, none of the guilt</li>
      </ul>

      <p>
        Plus, handmade pieces from artists like those at <Link href="/wall-art/">JOIRUSH</Link> aren't 
        mass-produced. Each sculpture is individually crafted, which makes the gift feel even more 
        special.
      </p>

      <h2>The Best Cookie for Every Type of Foodie</h2>

      <h3>For the Classic Comfort Food Lover</h3>
      
      <p>
        <strong>The pick:</strong> <Link href="/product/jumbo-chocolate-chip-cookie/">Jumbo 
        Chocolate Chip Cookie</Link> ($100)
      </p>

      <p>
        Some people don't need the latest food trend — they want the classics done perfectly. 
        For the foodie who appreciates a well-made grilled cheese, who still thinks their 
        grandmother's recipes are unbeatable, the <strong>chocolate chip cookie wall art</strong> is 
        the right choice.
      </p>

      <p>
        This is the piece that started JOIRUSH, and it remains the most popular for good reason. 
        Golden brown base, glossy chips, realistic texture that makes people do a double-take. 
        It's nostalgia incarnate.
      </p>

      <h3>For the Bold, Maximalist Foodie</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/hot-pink-mm-cookie/">Hot Pink M&M Cookie</Link> ($115)
      </p>

      <p>
        For the friend whose kitchen is already a riot of color, whose Instagram is a parade 
        of rainbow lattes and unicorn toast, who believes more is more — go bold. The 
        <strong>hot pink jumbo cookie</strong> with candy pieces and dark chocolate chunks is 
        unapologetically extra.
      </p>

      <p>
        This is the cookie for someone who wants their wall art to be as loud as their personality. 
        It photographs beautifully (perfect for content creators) and sparks joy from across the room.
      </p>

      <h3>For the Couple or Best Friend Duo</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/jumbo-mm-cookie-set/">Jumbo M&M Cookie 
        Wall Art Set</Link> ($225)
      </p>

      <p>
        Two 16-inch cookies designed to be displayed together — perfect for gifting to a couple 
        who love to cook together, roommates decorating a shared space, or best friends who 
        want matching apartment energy.
      </p>

      <p>
        The set also works beautifully split as a pair of coordinated gifts. Each person gets 
        one cookie; together they have a matching set.
      </p>

      <h3>For the Budget-Conscious Gift Giver</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/rainbow-candy-cookie/">Rainbow Candy 
        Cookie</Link> ($90)
      </p>

      <p>
        Big impact, smaller price tag. This 14-inch candy cookie brings all the dopamine decor 
        energy at an entry-level price point. The jewel-bright chips against the beige dough 
        make it pop on any wall.
      </p>

      <p>
        It's proof that you don't need to spend $200+ to give a memorable, handmade gift that 
        will last years.
      </p>

      <h3>For the Ultimate Dessert Lover</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/cookie-ice-cream-sandwich/">Jumbo Cookie 
        Ice Cream Sandwich</Link> ($220)
      </p>

      <p>
        Go big or go home. For the foodie who takes dessert seriously — who has opinions about 
        ice cream textures and brownie density — the <strong>ice cream sandwich wall art</strong> is 
        the ultimate statement piece.
      </p>

      <p>
        Two realistic cookie layers hugging a thick vanilla middle. It's bigger, bolder, and 
        makes people stop mid-sentence when they see it. This is the "wow" gift.
      </p>

      <h3>For the Subtle Sophisticate</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/jumbo-white-chocolate-chip-cookie/">White 
        Chocolate Chip Cookie</Link> ($115)
      </p>

      <p>
        Not everyone wants bright colors and candy pieces. For the foodie with a more refined 
        aesthetic — think neutral kitchens, linen textures, quiet luxury vibes — the white 
        chocolate chip version offers the same playful concept in a softer palette.
      </p>

      <p>
        Golden dough, creamy white chips, that characteristic just-baked glow. It's whimsical 
        without being loud.
      </p>

      <h3>For the Chocolate Obsessive</h3>

      <p>
        <strong>The pick:</strong> <Link href="/product/giant-double-chocolate-cookie/">Giant 
        Double Chocolate Chip Cookie</Link> ($110)
      </p>

      <p>
        We all know someone who orders the chocolate option every time. Who thinks there's no 
        such thing as too much chocolate. The <strong>double chocolate cookie sculpture</strong> was 
        made for them — darker dough, glossy chips, extra-rich everything.
      </p>

      <h3>For the Bakery or Café Owner</h3>

      <p>
        <strong>The pick:</strong> <Link href="/custom/">Custom piece</Link> in their brand colors
      </p>

      <p>
        Know someone opening a bakery, running a café, or launching a food business? A custom 
        cookie in their brand colors or featuring their signature flavors makes for an 
        unforgettable grand opening or anniversary gift.
      </p>

      <p>
        See more about commercial pieces at the <Link href="/for/bakeries-cafes/">bakeries and 
        cafés hub</Link>.
      </p>

      <h2>What's Included With Each Cookie</h2>

      <p>
        Every <Link href="/wall-art/">JOIRUSH cookie sculpture</Link> comes ready to display:
      </p>

      <ul>
        <li>Built-in wall hanger — no additional hardware needed</li>
        <li>Careful packaging designed for safe shipping</li>
        <li>Free shipping within the United States</li>
        <li>Lightweight construction (2-4 lbs typically)</li>
        <li>Durable materials built to last: wood, clay, and acrylic paint</li>
      </ul>

      <h2>How to Present It</h2>

      <p>
        Half the fun of a great gift is the reveal. A few ideas for maximum impact:
      </p>

      <ul>
        <li><strong>Already hung:</strong> If you have access to their space, hang it before they 
        arrive. Let them discover it.</li>
        <li><strong>Video unwrap:</strong> Have them film themselves opening it. The double-take 
        reaction is priceless.</li>
        <li><strong>Pair with actual cookies:</strong> Include a box of their favorite cookies. 
        "Here's a snack for now, and one that lasts forever."</li>
        <li><strong>Theme the card:</strong> "Something sweet that won't go stale" or "Zero 
        calories, infinite joy"</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is a unique gift for a food lover?</h3>
      <p>
        Handmade <strong>jumbo cookie wall art</strong> is a unique foodie gift that lasts forever 
        (unlike real cookies). These realistic <strong>faux food sculptures</strong> are 
        conversation starters that celebrate the recipient's love of food without adding calories 
        or clutter to the kitchen. They're the kind of gift people don't know they want until 
        they see it.
      </p>

      <h3>How much do jumbo cookie sculptures cost?</h3>
      <p>
        Handmade <strong>jumbo cookie wall art</strong> from JOIRUSH ranges from $90-$225:
      </p>
      <ul>
        <li>Single cookies: $90-$115</li>
        <li>Cookie sets: $175-$225</li>
        <li>Statement pieces (ice cream sandwich): $220</li>
      </ul>
      <p>
        All pieces include free US shipping. <Link href="/custom/">Custom pieces</Link> are priced 
        based on size and complexity.
      </p>

      <h3>Do cookie sculptures ship safely?</h3>
      <p>
        Yes! Each <strong>cookie sculpture</strong> is carefully packaged to arrive safely. 
        They're made from durable materials (wood, clay, and acrylic paint) designed to withstand 
        shipping and last for years on display. JOIRUSH ships from Florida with free US shipping.
      </p>

      <h3>Can I get a custom cookie made?</h3>
      <p>
        Absolutely! <Link href="/custom/">Request a custom piece</Link> in specific colors, flavors, 
        or sizes. Custom cookies are perfect for matching someone's kitchen aesthetic or brand 
        colors. Erynn typically replies within a few hours.
      </p>

      <h2>Order Timing for Gifts</h2>

      <p>
        Since each cookie is handmade to order, plan ahead:
      </p>

      <ul>
        <li><strong>Holiday gifts:</strong> Order at least 2-3 weeks before the date</li>
        <li><strong>Custom pieces:</strong> Allow 3-4 weeks for creation and shipping</li>
        <li><strong>In-stock pieces:</strong> Usually ship within a week</li>
      </ul>

      <p>
        For urgent needs, reach out through the <Link href="/custom/">custom order form</Link> or 
        message directly on Etsy to discuss rush options.
      </p>

      <h2>Ready to Find the Perfect Cookie?</h2>

      <p>
        Browse the full collection of <Link href="/wall-art/">handmade jumbo cookie wall 
        art</Link> to find the right piece for your favorite foodie. Or 
        <Link href="/custom/"> request something custom</Link> — a specific flavor, color palette, 
        or size that's perfectly matched to who they are. Every sculpture ships free within the 
        US, gift-ready and built to last.
      </p>
    </>
  );
}
