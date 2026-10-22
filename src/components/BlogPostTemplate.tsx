import Link from "next/link";
import { Image } from "@/components/Image";

export type BlogLinkItem = {
  href: string;
  label: string;
};

export type BlogImageBlock = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: BlogLinkItem[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type HowToStepItem = {
  name: string;
  text: string;
};

export type BlogPostStructuredData = {
  lead: string;
  quickFactsTitle: string;
  quickFacts: string[];
  section1: BlogSection;
  image1: BlogImageBlock;
  section2: BlogSection;
  image2: BlogImageBlock;
  section3: BlogSection;
  faqs: BlogFaq[];
  howTo?: {
    name: string;
    description: string;
    steps: HowToStepItem[];
  };
};

export function renderBlogSchema(data: BlogPostStructuredData) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = data.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: data.howTo.name,
        description: data.howTo.description,
        totalTime: "PT10M",
        step: data.howTo.steps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  return (
    <>
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

function SectionBlock({ section }: { section: BlogSection }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl text-chocolate md:text-3xl">
        {section.heading}
      </h2>
      {section.paragraphs.map((p, idx) => (
        <p key={idx} className="mt-3 text-chocolate-mid">
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-chocolate-mid">
          {section.bullets.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      )}
      {section.links && section.links.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
          {section.links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-full bg-pink/10 px-3.5 py-1.5 text-pink hover:bg-pink/20"
            >
              {link.label} →
            </Link>
          ))}
        </p>
      )}
    </section>
  );
}

function InlineFigure({ image }: { image: BlogImageBlock }) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl bg-cream-deep shadow-soft">
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={600}
        className="h-64 w-full object-cover sm:h-80"
      />
      <figcaption className="px-4 py-3 text-center text-sm text-chocolate-soft">
        {image.caption}
      </figcaption>
    </figure>
  );
}

export function renderBlogContent(data: BlogPostStructuredData) {
  return (
    <>
      <p className="text-xl text-chocolate-mid">{data.lead}</p>

      <div className="my-6 rounded-2xl bg-cream-deep p-5">
        <p className="font-display text-lg text-chocolate">{data.quickFactsTitle}</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-chocolate-mid">
          {data.quickFacts.map((fact, idx) => (
            <li key={idx}>{fact}</li>
          ))}
        </ul>
      </div>

      <SectionBlock section={data.section1} />

      <InlineFigure image={data.image1} />

      <SectionBlock section={data.section2} />

      <InlineFigure image={data.image2} />

      <SectionBlock section={data.section3} />

      <h2 className="mt-10 font-display text-2xl text-chocolate md:text-3xl">
        Quick Questions
      </h2>
      <div className="mt-4 space-y-4">
        {data.faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-chocolate/10 bg-white p-5"
          >
            <h3 className="font-display text-lg text-chocolate">{faq.question}</h3>
            <p className="mt-2 text-chocolate-mid">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
