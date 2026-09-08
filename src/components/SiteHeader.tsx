"use client";

import { Image } from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "/wall-art/", label: "Cookie Wall Art" },
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/blog/", label: "Blog" },
  { href: "/custom/", label: "Custom" },
  { href: "/about/", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-chocolate/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/avatar.jpg"
            alt="JOIRUSH"
            width={44}
            height={44}
            className="rounded-full border-2 border-pink object-cover"
            priority
          />
          <span className="font-display text-2xl font-semibold tracking-tight text-chocolate">
            JOIRUSH
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide ${
                  active ? "text-pink" : "text-chocolate-mid hover:text-chocolate"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.etsy}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-etsy px-4 py-2 text-sm font-medium text-white transition hover:bg-etsy-dark"
          >
            Shop Etsy
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`Follow ${site.instagramHandle} on Instagram`}
            className="rounded-full p-2 text-chocolate-mid transition hover:bg-pink/10 hover:text-pink"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={site.instagramAlt}
            target="_blank"
            rel="noreferrer"
            aria-label={`Follow ${site.instagramAltHandle} on Instagram`}
            className="rounded-full p-2 text-chocolate-mid transition hover:bg-pink/10 hover:text-pink"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <button
          type="button"
          className="rounded-full border border-chocolate/15 px-3 py-1.5 text-sm font-medium lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-chocolate/10 bg-cream px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-chocolate"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.etsy}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full bg-etsy px-4 py-2 text-center text-sm font-medium text-white"
            >
              Shop Etsy
            </a>
            <div className="mt-4 flex items-center justify-center gap-4">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow ${site.instagramHandle} on Instagram`}
                className="rounded-full p-2 text-chocolate-mid transition hover:text-pink"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href={site.instagramAlt}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow ${site.instagramAltHandle} on Instagram`}
                className="rounded-full p-2 text-chocolate-mid transition hover:text-pink"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
