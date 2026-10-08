"use client";

import { useEffect, useId, useRef, useState } from "react";
import { products } from "@/data/products";
import { getProductGallery } from "@/data/product-galleries";
import { asset } from "@/lib/paths";

export type CookieOption = {
  /** Product short name. This is the value sent with the review. */
  name: string;
  /** Small thumbnail of the first (hero) photo on the product page. */
  thumb: string;
};

/** One option per product in src/data/products.ts, with its hero photo thumbnail. */
export const cookieOptions: CookieOption[] = (() => {
  const seen = new Set<string>();
  const list: CookieOption[] = [];
  for (const product of products) {
    if (seen.has(product.shortName)) continue;
    seen.add(product.shortName);
    const hero = getProductGallery(product.slug, product.image)[0];
    list.push({ name: product.shortName, thumb: asset(hero.thumb) });
  }
  return list;
})();

const PLACEHOLDER = "Choose a cookie (optional)";

type CookiePickerProps = {
  value: string;
  onChange: (value: string) => void;
  /** Id of the visible label element. */
  labelId: string;
};

let preloaded = false;
function preloadThumbs() {
  if (preloaded || typeof window === "undefined") return;
  preloaded = true;
  for (const option of cookieOptions) {
    const img = new Image();
    img.decoding = "async";
    img.src = option.thumb;
  }
}

function Thumb({ src, className = "" }: { src?: string; className?: string }) {
  if (!src) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl bg-white text-chocolate/30 ${className}`}
        aria-hidden="true"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" strokeWidth={1.8} />
          <circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="9" r="1" fill="currentColor" stroke="none" />
          <circle cx="13" cy="14.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={48}
      height={48}
      decoding="async"
      className={`shrink-0 rounded-xl bg-white object-cover ${className}`}
    />
  );
}

/**
 * Select only combobox (WAI ARIA pattern) that shows a photo for each cookie.
 * Focus stays on the combobox; the active option is announced with aria-activedescendant.
 * The list expands inline (not floating), so it is never clipped by the review popup.
 */
export function CookiePicker({ value, onChange, labelId }: CookiePickerProps) {
  const uid = useId();
  const listId = `${uid}list`;
  const optionId = (index: number) => `${uid}opt${index}`;
  // Index 0 is the empty "no cookie" choice; products start at 1.
  const items: (CookieOption | null)[] = [null, ...cookieOptions];
  const selectedIndex = Math.max(0, items.findIndex((item) => (item ? item.name === value : value === "")));
  const selected = items[selectedIndex];

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selectedIndex);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", time: 0 });

  function openList(startIndex = selectedIndex) {
    preloadThumbs();
    setActive(startIndex);
    setOpen(true);
  }

  function closeList(refocus = true) {
    setOpen(false);
    if (refocus) comboRef.current?.focus();
  }

  function choose(index: number) {
    const item = items[index];
    onChange(item ? item.name : "");
    closeList();
  }

  // Close on click or tap outside.
  useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [open]);

  // When the list opens, bring it into view (inside the popup's own scroll).
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    list.scrollIntoView({ block: "nearest" });
  }, [open]);

  // Keep the active option visible inside the list without scrolling the page.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!list || !option) return;
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, active]);

  function typeahead(key: string) {
    const now = Date.now();
    const state = typed.current;
    state.text = now - state.time > 700 ? key : state.text + key;
    state.time = now;
    const query = state.text.toLowerCase();
    const start = open ? active : selectedIndex;
    const order = [...items.keys()].slice(1);
    const rotated = [...order.filter((i) => i > start), ...order.filter((i) => i <= start)];
    const match = (state.text.length > 1 ? order : rotated).find((i) => items[i]!.name.toLowerCase().startsWith(query));
    if (match === undefined) return;
    if (open) setActive(match);
    else onChange(items[match]!.name);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = items.length - 1;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (event.key === "Home") openList(0);
        else if (event.key === "End") openList(last);
        else openList();
        return;
      }
      if (event.key.length === 1 && /\S/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
        typeahead(event.key);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => Math.min(last, index + 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        if (event.altKey) {
          choose(active);
          return;
        }
        setActive((index) => Math.max(0, index - 1));
        return;
      case "Home":
        event.preventDefault();
        setActive(0);
        return;
      case "End":
        event.preventDefault();
        setActive(last);
        return;
      case "PageDown":
        event.preventDefault();
        setActive((index) => Math.min(last, index + 5));
        return;
      case "PageUp":
        event.preventDefault();
        setActive((index) => Math.max(0, index - 5));
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        return;
      case "Escape":
        // Close only the list, not the review popup around it.
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        closeList();
        return;
      case "Tab":
        setOpen(false);
        return;
      default:
        if (event.key.length === 1 && /\S/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
          typeahead(event.key);
        }
    }
  }

  return (
    <div ref={wrapperRef} className="relative" data-cookie-picker="">
      <div className="flex items-stretch gap-2">
        <div
          ref={comboRef}
          role="combobox"
          tabIndex={0}
          aria-labelledby={labelId}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-expanded={open}
          aria-activedescendant={open ? optionId(active) : undefined}
          onClick={() => (open ? closeList() : openList())}
          onKeyDown={handleKeyDown}
          onPointerEnter={preloadThumbs}
          onFocus={preloadThumbs}
          onBlur={(event) => {
            if (!wrapperRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
          }}
          data-cookie-picker-trigger=""
          className={`flex min-h-[3.5rem] w-full min-w-0 cursor-pointer select-none items-center gap-3 rounded-2xl border bg-cream px-3 py-2 outline-none ring-pink transition focus:ring-2 ${
            open ? "border-pink" : "border-chocolate/10"
          }`}
        >
          <Thumb src={selected?.thumb} className="h-10 w-10" />
          <span className={`min-w-0 flex-1 truncate ${selected ? "font-medium text-chocolate" : "text-chocolate-soft"}`}>
            {selected ? selected.name : PLACEHOLDER}
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-chocolate-soft transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
              comboRef.current?.focus();
            }}
            aria-label="Clear cookie choice"
            data-cookie-picker-clear=""
            className="flex w-12 shrink-0 items-center justify-center rounded-2xl border border-chocolate/10 bg-cream text-chocolate-soft outline-none ring-pink transition hover:text-chocolate focus-visible:ring-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        hidden={!open}
        onMouseDown={(event) => event.preventDefault()}
        data-cookie-picker-list=""
        className="mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-2xl border border-chocolate/10 bg-white p-1.5 shadow-card"
      >
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          const isActive = index === active;
          return (
            <li
              key={item ? item.name : "none"}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              data-index={index}
              onClick={() => choose(index)}
              onPointerMove={() => setActive(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 ${
                isActive ? "bg-cream ring-1 ring-pink/40" : ""
              }`}
            >
              {open && <Thumb src={item?.thumb} className="h-12 w-12" />}
              <span className={`min-w-0 flex-1 ${item ? "text-chocolate" : "text-chocolate-soft"}`}>
                {item ? item.name : "No cookie, skip this"}
              </span>
              {isSelected && (
                <svg className="h-5 w-5 shrink-0 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
