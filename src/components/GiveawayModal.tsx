"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { submitGiveawayEntry, trackEvent } from "@/lib/forms";

/**
 * Monthly giveaway popup for new visitors.
 * Shows once, after 30 seconds on the site (time accumulates across pages in
 * the same tab session). Never shown again after it has been displayed.
 * Waits while another modal (e.g. the Buy Now upsell) is open or while the
 * visitor is typing in a form field.
 */
const SEEN_KEY = "joirush_giveaway_seen";
const START_KEY = "joirush_giveaway_session_start";
const DELAY_MS = 30_000;
const RECHECK_MS = 2_000;
const FIELD_SELECTOR = "input, textarea, select, [contenteditable='true']";

type Status = "idle" | "submitting" | "success" | "error";

function storageGet(store: "local" | "session", key: string) {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function storageSet(store: "local" | "session", key: string, value: string) {
  try {
    (store === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {}
}

function isBusy(dialog: HTMLElement | null) {
  const active = document.activeElement as HTMLElement | null;
  if (active && active.matches(FIELD_SELECTOR) && !dialog?.contains(active)) return true;
  const otherModal = Array.from(document.querySelectorAll<HTMLElement>('[aria-modal="true"]')).some(
    (el) => el !== dialog,
  );
  return otherModal;
}

export function GiveawayModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Schedule the popup for first time visitors only.
  useEffect(() => {
    if (storageGet("local", SEEN_KEY)) return;
    if (pathname?.startsWith("/admin")) return;

    let start = Number(storageGet("session", START_KEY));
    if (!start) {
      start = Date.now();
      storageSet("session", START_KEY, String(start));
    }

    let timer: number;
    const tryOpen = () => {
      if (storageGet("local", SEEN_KEY)) return;
      if (document.hidden || isBusy(dialogRef.current)) {
        timer = window.setTimeout(tryOpen, RECHECK_MS);
        return;
      }
      lastFocused.current = document.activeElement as HTMLElement | null;
      storageSet("local", SEEN_KEY, new Date().toISOString());
      setOpen(true);
      trackEvent("giveaway_popup_view");
    };
    timer = window.setTimeout(tryOpen, Math.max(0, DELAY_MS - (Date.now() - start)));
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  // Focus management, Esc to close, focus trap, scroll lock.
  useEffect(() => {
    if (!open) return;
    // Desktop: jump straight to the email field. Mobile: focus the dialog itself so the keyboard
    // does not pop up before the visitor has read the offer.
    const focusTimer = window.setTimeout(() => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      (desktop ? inputRef.current : dialogRef.current)?.focus();
    }, 50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (botcheck) return;
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitGiveawayEntry(email.trim());
    if (result.ok) {
      storageSet("local", SEEN_KEY, `entered ${new Date().toISOString()}`);
      trackEvent("giveaway_signup", { method: "popup", page_path: pathname });
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-chocolate/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      data-giveaway-backdrop=""
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="giveaway-title"
        aria-describedby="giveaway-desc"
        data-giveaway-modal=""
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-[2rem] bg-cream-paper p-6 pb-8 shadow-lift outline-none sm:rounded-[2rem] sm:p-8"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="absolute right-4 top-4 rounded-full p-2 text-chocolate-soft transition hover:bg-cream-deep hover:text-chocolate focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          aria-label="Close giveaway popup"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="candy-dot mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-blush text-4xl" aria-hidden="true">
          🍪
        </div>

        {status === "success" ? (
          <div className="mt-5 text-center" role="status">
            <h2 id="giveaway-title" className="font-display text-3xl text-chocolate">
              You&apos;re entered!
            </h2>
            <p id="giveaway-desc" className="mt-3 text-chocolate-mid">
              Good luck! Winners are drawn on the 30th of every month, and we&apos;ll email you either way to
              let you know whether or not you won.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-full bg-chocolate px-6 py-3 font-medium text-cream transition hover:bg-chocolate/90"
            >
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-pink">
              Monthly giveaway
            </p>
            <h2 id="giveaway-title" className="mt-2 text-center font-display text-3xl leading-tight text-chocolate sm:text-4xl">
              Want to win a free cookie?
            </h2>
            <p id="giveaway-desc" className="mt-3 text-center text-chocolate-mid">
              Every month we give away a handmade JOIRUSH cookie. Enter your email for a chance to win.
              Winners are drawn on the 30th of every month.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              {status === "error" && (
                <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
                  {errorMessage}
                </div>
              )}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                checked={botcheck}
                onChange={(event) => setBotcheck(event.target.checked)}
              />
              <label htmlFor="giveaway-email" className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                id="giveaway-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-chocolate/10 bg-white px-5 py-3.5 text-base outline-none ring-pink focus:ring-2"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-3 w-full rounded-full bg-pink px-6 py-3.5 text-base font-semibold text-white transition hover:bg-pink-hot disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Entering..." : "Enter the giveaway"}
              </button>
              <p className="mt-3 text-center text-xs text-chocolate-soft">
                One entry per email. We only use it for the giveaway. No spam.
              </p>
            </form>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full text-center text-sm text-chocolate-soft underline underline-offset-4 hover:text-chocolate"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
