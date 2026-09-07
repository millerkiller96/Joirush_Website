import type { Metadata } from "next";
import { CatalogueGrid } from "@/components/CatalogueGrid";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "The full JoiRush catalogue of handmade jumbo cookie wall art — classic chips, candy color, sets, and statement desserts.",
};

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">The shop</p>
      <h1 className="mt-3 font-display text-5xl text-chocolate md:text-6xl">Catalogue</h1>
      <p className="mt-4 max-w-2xl text-lg text-chocolate-mid">
        Every piece is hand-sculpted in Florida from wood, clay, and acrylic paint — lightweight
        enough to hang, loud enough to own the wall. Tap a piece to see details, then buy on Etsy
        with free U.S. shipping.
      </p>
      <div className="mt-10">
        <CatalogueGrid />
      </div>
    </div>
  );
}
