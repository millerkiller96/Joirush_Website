"use client";

import { Image } from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/wall-art/", label: "Cookie Wall Art" },
  { href: "/catalogue/", label: "Catalogue" },
  { href: "/for/bakeries-cafes/", label: "Bakeries & Cafés" },
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
            className="rounded-full bg-chocolate px-4 py-2 text-sm font-medium text-cream transition hover:bg-pink"
          >
            Shop Etsy
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
              className="mt-2 rounded-full bg-chocolate px-4 py-2 text-center text-sm font-medium text-cream"
            >
              Shop Etsy
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
