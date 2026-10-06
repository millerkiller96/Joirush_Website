"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { submitWeb3Form, trackEvent } from "@/lib/forms";

type FormStatus = "idle" | "submitting" | "success" | "error";

const sizes = [
  "14 inch",
  "16 inch",
  "Pair or set",
  "Statement piece (like the ice cream sandwich)",
  "Not sure yet",
];

const budgets = ["$90 to $150", "$150 to $225", "$225 and up", "Not sure yet"];

const fieldClass =
  "w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2";

const emptyForm = {
  name: "",
  email: "",
  piece: "",
  size: sizes[1],
  colors: "",
  budget: budgets[0],
  deadline: "",
  reference: "",
  message: "",
  botcheck: false,
};

export function CustomForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.botcheck) return;
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitWeb3Form("customOrder", {
      subject: `Custom order request from ${form.name}`,
      from_name: "JOIRUSH Custom Order Form",
      name: form.name,
      email: form.email,
      "What they want made": form.piece,
      Size: form.size,
      "Colors / flavor": form.colors,
      Budget: form.budget,
      "Needed by": form.deadline,
      "Reference image link": form.reference,
      message: form.message || "(no extra message)",
    });

    if (result.ok) {
      trackEvent("custom_order_submit", { size: form.size, budget: form.budget });
      setStatus("success");
      setForm(emptyForm);
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-8" role="status">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink/10">
            <svg className="h-8 w-8 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-chocolate">Request sent!</h3>
          <p className="mt-2 max-w-sm text-chocolate-mid">
            Thank you! Your custom order details are on their way. Expect a reply by email, usually
            within a day, with ideas, a price, and timing.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream transition hover:bg-chocolate/90"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-white p-6 shadow-card md:p-8"
      aria-labelledby="custom-order-form-title"
    >
      <h2 id="custom-order-form-title" className="font-display text-2xl text-chocolate">
        Request a custom piece
      </h2>
      <p className="mt-1 text-sm text-chocolate-soft">
        Fields marked <span className="text-pink">*</span> are required.
      </p>

      {status === "error" && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Honeypot for bots; real visitors never see this. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        checked={form.botcheck}
        onChange={(event) => update("botcheck", event.target.checked)}
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">
            Name <span className="text-pink">*</span>
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">
            Email <span className="text-pink">*</span>
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">
          What would you like made? <span className="text-pink">*</span>
        </span>
        <input
          type="text"
          value={form.piece}
          onChange={(event) => update("piece", event.target.value)}
          required
          className={fieldClass}
          placeholder="A jumbo cookie in my kitchen colors, a cookie pair for a gift..."
        />
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Size</span>
          <select value={form.size} onChange={(event) => update("size", event.target.value)} className={fieldClass}>
            {sizes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Budget</span>
          <select value={form.budget} onChange={(event) => update("budget", event.target.value)} className={fieldClass}>
            {budgets.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Colors or flavor</span>
        <input
          type="text"
          value={form.colors}
          onChange={(event) => update("colors", event.target.value)}
          className={fieldClass}
          placeholder="Hot pink M&Ms, sage green frosting, peanut butter..."
        />
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Needed by (optional)</span>
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Reference image link (optional)</span>
          <input
            type="url"
            value={form.reference}
            onChange={(event) => update("reference", event.target.value)}
            className={fieldClass}
            placeholder="https://..."
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-chocolate-soft">
        Handmade pieces take about {site.shippingTime} to make and ship, so plan a little ahead for gifts.
      </p>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Anything else? (optional)</span>
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          rows={4}
          className={fieldClass}
          placeholder="Where it will hang, who it is for, any details you love..."
        />
      </label>

      <button
        type="submit"
        data-sticky-buy-avoid=""
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-pink px-6 py-3 font-medium text-white transition hover:bg-pink-hot disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send custom order request"}
      </button>
      <p className="mt-3 text-center text-sm text-chocolate-soft">
        Your request goes straight to Erynn&apos;s inbox. You can also DM {site.instagramHandle} on Instagram.
      </p>
    </form>
  );
}
