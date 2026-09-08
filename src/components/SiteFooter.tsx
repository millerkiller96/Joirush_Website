import { Image } from "@/components/Image";
import Link from "next/link";
import { site } from "@/data/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-chocolate text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/avatar.jpg"
              alt="JOIRUSH - Cookie Art Studio by Cookie Artist Erynn"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <p className="font-display text-3xl">JOIRUSH</p>
          </div>
          <p className="mt-4 max-w-md text-cream/75">
            Cookie art studio by cookie artist {site.artist}. Handmade sugar cookie wall sculptures, art cookies, 
            faux food wall art, and custom pieces in {site.location}. Dessert dreams, retro vibes, and zero calories.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-pink-blush">Shop Cookie Art</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/wall-art/" className="hover:text-pink-blush">
              Cookie Art Collection
            </Link>
            <Link href="/catalogue/" className="hover:text-pink-blush">
              Full Catalogue
            </Link>
            <Link href="/custom/" className="hover:text-pink-blush">
              Custom Cookie Art
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-pink-blush">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/blog/" className="hover:text-pink-blush">
              Cookie Art Blog
            </Link>
            <Link href="/about/" className="hover:text-pink-blush">
              Meet Cookie Artist Erynn
            </Link>
            <a href={site.etsy} target="_blank" rel="noreferrer" className="hover:text-pink-blush">
              Etsy Shop
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`Follow ${site.instagramHandle} on Instagram`}
              className="rounded-full p-2 text-cream/70 transition hover:bg-white/10 hover:text-cream"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="text-center text-sm text-cream/55">
            Handmade cookie art with love · Sugar cookie wall sculptures ship in 14 days · Free U.S. shipping from Orlando, Florida · {site.name} © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
