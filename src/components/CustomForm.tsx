"use client";

import { useState } from "react";
import { site } from "@/data/site";

const types = ["Cookie wall art", "Y2K jewelry", "Custom sneakers", "Something else sweet"];

export function CustomForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(types[0]);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const brief = [
      `Custom JoiRush request from ${name || "a new collector"}`,
      email ? `Email: ${email}` : "",
      `Project: ${type}`,
      "",
      notes || "I'd love a custom piece.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }

    setSent(true);
    window.open(site.etsy, "_blank", "noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">What are we cooking up?</span>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
        >
          {types.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Flavor, size, or vibe</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
          placeholder="A 16-inch pastel cookie for my kitchen, or a Tamagotchi-style choker in hot pink..."
        />
      </label>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-pink px-6 py-3 font-medium text-white transition hover:bg-pink-hot"
      >
        Copy brief and open Etsy
      </button>
      <p className="mt-3 text-sm text-chocolate-soft">
        Erynn typically replies within a few hours on Etsy.{" "}
        {sent && copied
          ? "Your brief is copied — paste it into a shop message."
          : sent
            ? "Etsy should be open in a new tab. Paste your notes into a shop message."
            : "We’ll copy your notes so you can paste them in."}{" "}
        You can also DM {site.instagramHandle}.
      </p>
    </form>
  );
}
