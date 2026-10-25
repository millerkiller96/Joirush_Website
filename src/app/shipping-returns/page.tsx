import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "JOIRUSH shipping info: every cookie is made to order and ships within 14 days from Daytona Beach, FL. Free U.S. shipping on all orders.",
  alternates: {
    canonical: `${siteUrl}/shipping-returns/`,
  },
  openGraph: {
    title: "Shipping & Returns | JOIRUSH",
    description:
      "JOIRUSH shipping info: every cookie is made to order and ships within 14 days from Daytona Beach, FL. Free U.S. shipping on all orders.",
    url: `${siteUrl}/shipping-returns/`,
    type: "website",
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <h1 className="font-display text-4xl text-chocolate md:text-5xl">
        Shipping & Returns
      </h1>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-chocolate">Shipping</h2>
        <ul className="mt-4 space-y-3 text-chocolate-mid">
          <li>
            <strong className="text-chocolate">Made to order:</strong> Every jumbo cookie wall sculpture is handmade just for you by cookie artist Erynn.
          </li>
          <li>
            <strong className="text-chocolate">Production time:</strong> Orders ship within 14 days from {site.shipsFrom}.
          </li>
          <li>
            <strong className="text-chocolate">Free U.S. shipping:</strong> All U.S. orders ship free. No codes, no minimums.
          </li>
          <li>
            <strong className="text-chocolate">International orders:</strong> For shipping outside the U.S., please reach out on the{" "}
            <Link href="/contact/" className="text-pink hover:underline">Contact page</Link> for a quote.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-chocolate">Returns</h2>
        <p className="mt-4 text-chocolate-mid">
          Because each piece is handmade to order, <strong className="text-chocolate">custom orders cannot be returned</strong>.
        </p>
        <p className="mt-3 text-chocolate-mid">
          If you have questions about your order or if something arrives damaged, please reach out on the{" "}
          <Link href="/contact/" className="text-pink hover:underline">Contact page</Link> and we will work with you.
        </p>
      </section>

      <section className="mt-10 rounded-2xl bg-cream p-6">
        <h2 className="font-display text-xl text-chocolate">Questions?</h2>
        <p className="mt-2 text-sm text-chocolate-mid">
          Visit the <Link href="/faq/" className="text-pink hover:underline">FAQ</Link> for more answers, or reach out on the{" "}
          <Link href="/contact/" className="text-pink hover:underline">Contact page</Link>.
        </p>
      </section>

      <div className="mt-10 text-center">
        <Link
          href="/catalogue/"
          className="inline-flex rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-emerald-700"
        >
          Shop Cookies
        </Link>
      </div>
    </div>
  );
}
