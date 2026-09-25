import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { getAbsoluteUrl, getImageUrl } from "@/lib/seo";

const siteUrl = "https://joirush.com";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Cookie Artist Erynn",
  description:
    "Contact JOIRUSH cookie artist Erynn for questions about sugar cookie wall sculptures, custom cookie art commissions, wholesale inquiries, or just to say hi. Based in Daytona Beach, Florida.",
  keywords: [
    "contact joirush",
    "cookie artist contact",
    "custom cookie art inquiry",
    "sugar cookie art questions",
    "joirush email",
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us | Get in Touch with Cookie Artist Erynn | JOIRUSH",
    description:
      "Contact JOIRUSH cookie artist Erynn for questions about sugar cookie wall sculptures, custom cookie art, or wholesale inquiries.",
    type: "website",
    url: `${siteUrl}/contact`,
    images: [
      {
        url: getImageUrl("/images/brand/avatar.jpg"),
        width: 1200,
        height: 630,
        alt: "Contact JOIRUSH - cookie artist Erynn",
      },
    ],
  },
};

function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact JOIRUSH",
    description:
      "Contact cookie artist Erynn at JOIRUSH for questions about sugar cookie wall sculptures, custom cookie art, or wholesale inquiries.",
    url: getAbsoluteUrl("/contact/"),
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-pink">
            Get in Touch
          </p>
          <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-5 text-lg text-chocolate-mid">
            Have a question about cookie art? Thinking about a custom sugar cookie wall sculpture?
            Want to chat about wholesale or collaborations? I&apos;d love to hear from you!
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-display text-xl text-chocolate">Other Ways to Reach Me</h2>
              <ul className="mt-3 space-y-3 text-chocolate-mid">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pink">✉</span>
                  <span>
                    <strong>Etsy Messages:</strong>{" "}
                    <a
                      href={site.etsy}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink underline"
                    >
                      Send a message on Etsy
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-pink">📸</span>
                  <span>
                    <strong>Instagram DMs:</strong>{" "}
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink underline"
                    >
                      {site.instagramHandle}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl text-chocolate">Response Time</h2>
              <p className="mt-2 text-chocolate-mid">
                I typically respond within 24-48 hours. For custom orders or urgent inquiries,
                Etsy messages often get the fastest response.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl text-chocolate">Based In</h2>
              <p className="mt-2 text-chocolate-mid">
                {site.location} — All cookie art ships from Daytona Beach, FL with free U.S. shipping.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/custom/"
              className="inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream transition hover:bg-chocolate/90"
            >
              Looking for Custom Cookie Art?
            </Link>
          </div>
        </div>

        <ContactForm />
      </div>
    </>
  );
}
