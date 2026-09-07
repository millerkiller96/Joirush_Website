import { Image } from "@/components/Image";
import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-chocolate text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/avatar.jpg"
              alt=""
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <p className="font-display text-3xl">JOIRUSH</p>
          </div>
          <p className="mt-4 max-w-md text-cream/75">
            {site.tagline}. Handmade jumbo cookies, Y2K accessories, and custom pieces by {site.artist} in{" "}
            {site.location}. Dessert dreams, retro vibes, and zero calories.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pink-blush">Shop</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/wall-art/" className="hover:text-pink-blush">
              Cookie Wall Art
            </Link>
            <Link href="/catalogue/" className="hover:text-pink-blush">
              Full Catalogue
            </Link>
            <Link href="/for/bakeries-cafes/" className="hover:text-pink-blush">
              Bakeries & Cafés
            </Link>
            <Link href="/custom/" className="hover:text-pink-blush">
              Custom Orders
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pink-blush">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/blog/" className="hover:text-pink-blush">
              Blog
            </Link>
            <Link href="/about/" className="hover:text-pink-blush">
              About Erynn
            </Link>
            <a href={site.etsy} target="_blank" rel="noreferrer" className="hover:text-pink-blush">
              Etsy Shop
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-blush">
              {site.instagramHandle}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-cream/55 md:px-8">
        Handmade everything with love · Ships from Florida · {site.name} © 2026
      </div>
    </footer>
  );
}
