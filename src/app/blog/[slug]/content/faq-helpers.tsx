export type Faq = { question: string; answer: string };

/** FAQPage JSON-LD for a post's FAQ section. */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/** Visible FAQ block, matching the JSON-LD above. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </>
  );
}
