"use client";

import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Contact form is not configured. Please try again later.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          phone: phone || undefined,
          subject: subject || "New Contact Form Submission",
          message,
          from_name: "JOIRUSH Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink/10">
            <svg
              className="h-8 w-8 text-pink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-chocolate">Message Sent!</h3>
          <p className="mt-2 text-chocolate-mid">
            Thanks for reaching out! I&apos;ll get back to you as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream transition hover:bg-chocolate/90"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-card md:p-8">
      {status === "error" && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">
            Name <span className="text-pink">*</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">
            Email <span className="text-pink">*</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="you@email.com"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Phone (optional)</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="(555) 123-4567"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Subject (optional)</span>
          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
            placeholder="What's this about?"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">
          Message <span className="text-pink">*</span>
        </span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={5}
          className="w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2"
          placeholder="Tell me what's on your mind..."
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-pink px-6 py-3 font-medium text-white transition hover:bg-pink-hot disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p className="mt-3 text-center text-sm text-chocolate-soft">
        I typically reply within 24-48 hours.
      </p>
    </form>
  );
}
