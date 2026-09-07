import type { Metadata } from "next";
import { CustomForm } from "@/components/CustomForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Commission a custom JoiRush cookie, Y2K choker, or pair of sneakers. Erynn typically replies within a few hours.",
};

export default function CustomPage() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">Made to order</p>
        <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">
          Custom orders? Absolutely.
        </h1>
        <p className="mt-5 text-lg text-chocolate-mid">
          Got a flavor or aesthetic in mind? Erynn will cook up something unforgettable — a cookie
          in your bakery&apos;s colors, a Tamagotchi choker, custom sneakers, or a dessert you
          haven&apos;t seen sculpted yet.
        </p>
        <ul className="mt-8 space-y-3 text-chocolate-mid">
          <li>Mixed media wall art, jewelry, and sneakers</li>
          <li>Typically replies within a few hours</li>
          <li>Handmade in Florida, shipped with care</li>
          <li>Because each piece is made to order, returns are not accepted</li>
        </ul>
        <p className="mt-8 text-sm text-chocolate-soft">
          Prefer to skip the form? Message the shop on{" "}
          <a href={site.etsy} className="text-pink underline" target="_blank" rel="noreferrer">
            Etsy
          </a>{" "}
          or Instagram {site.instagramHandle}.
        </p>
      </div>
      <CustomForm />
    </div>
  );
}
