import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { siteUrl, getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jumbo Cookie Wall Art FAQ",
  description:
    "Common questions about JOIRUSH jumbo cookie wall art: materials, weight, hanging, shipping, custom orders, and the 10% off 4 or more cookies deal.",
  alternates: {
    canonical: `${siteUrl}/faq/`,
  },
  openGraph: {
    title: "Jumbo Cookie Wall Art FAQ | JOIRUSH",
    description:
      "Common questions about JOIRUSH jumbo cookie wall art: materials, weight, hanging, shipping, custom orders, and more.",
    url: `${siteUrl}/faq/`,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is jumbo cookie wall art?",
    answer:
      "Jumbo cookie wall art refers to decorative sugar cookie wall sculptures: handmade faux food wall art that looks like oversized, realistic cookies. Unlike edible royal icing sugar cookies, these pieces are crafted from spray foam and acrylic paint by cookie artist Erynn and designed to hang permanently on your wall.",
  },
  {
    question: "Are these cookies edible?",
    answer:
      "No. JOIRUSH cookie sculptures are decorative wall art made from spray foam and acrylic paint. They look like real cookies but are designed for permanent display, not eating. They will look just as delicious years from now.",
  },
  {
    question: "What are the sculptures made of?",
    answer:
      "Each piece is handmade from spray foam that is sculpted to look like a real baked cookie, then painted with acrylics to achieve realistic colors and textures. They are lightweight (2 to 4 lbs), durable, and come with attached wall hangers.",
  },
  {
    question: "How much do they weigh?",
    answer:
      "Cookie wall sculptures weigh 2 to 4 lbs depending on size. That is light enough to hang on a single nail. No anchors or heavy duty mounting required.",
  },
  {
    question: "How do I hang cookie wall art?",
    answer:
      "Every piece includes an attached wall hanger on the back. Because they are lightweight (2 to 4 lbs), they hang easily on a single nail or picture hook. No special hardware needed.",
  },
  {
    question: "How long does shipping take?",
    answer:
      `Every cookie sculpture is handmade to order and ships within 14 days from ${site.shipsFrom}. U.S. shipping is always free.`,
  },
  {
    question: "Do you offer custom orders?",
    answer:
      "Yes! Visit the custom orders page to commission sugar cookie wall sculptures in specific colors, sizes, or flavors. Cookie artist Erynn loves creating one of a kind art cookies.",
  },
  {
    question: "Where does cookie wall art look best?",
    answer:
      "Most people hang theirs in the kitchen, a breakfast nook, a coffee bar, or a playroom. A single classic cookie makes playful kitchen wall art, and the candy colored pieces fit right into dopamine decor, maximalist, and whimsical rooms.",
  },
  {
    question: "How big is jumbo cookie wall art?",
    answer:
      "Most pieces are about 16 inches across, roughly the size of a large dinner platter. A few designs are 14 inches, the sets come as two matching cookies, and the ice cream sandwich is a larger statement piece.",
  },
  {
    question: "What is the buy 4 or more deal?",
    answer:
      "Buy 4 or more cookies (in any mix of flavors) and get 10% off each cookie. Orders of 1 to 3 cookies are full price. This is a great way to build a gallery wall and save.",
  },
];

function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd />
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <h1 className="font-display text-4xl text-chocolate md:text-5xl">
          Jumbo Cookie Wall Art FAQ
        </h1>
        <p className="mt-4 text-lg text-chocolate-mid">
          Everything you need to know about JOIRUSH jumbo cookie wall art, from what they are made of to how to hang them.
        </p>

        <dl className="mt-10 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl bg-cream p-6">
              <dt className="font-display text-lg text-chocolate">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-chocolate-mid">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-12 rounded-2xl border border-chocolate/10 bg-white p-6">
          <h2 className="font-display text-xl text-chocolate">Helpful Guides</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/catalogue/" className="text-pink hover:underline">
                Browse All Cookies
              </Link>
            </li>
            <li>
              <Link href="/custom/" className="text-pink hover:underline">
                Request a Custom Piece
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-hang-jumbo-cookie-wall-art/" className="text-pink hover:underline">
                How to Hang Jumbo Cookie Wall Art
              </Link>
            </li>
            <li>
              <Link href="/blog/jumbo-cookie-wall-art-size-guide/" className="text-pink hover:underline">
                Jumbo Cookie Wall Art Size Guide
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/catalogue/"
            className="inline-flex rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-emerald-700"
          >
            Get Your Own Jumbo Cookie Now
          </Link>
        </div>
      </div>
    </>
  );
}
