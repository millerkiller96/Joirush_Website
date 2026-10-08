"use client";

import { useId, useRef, useState } from "react";
import { products } from "@/data/products";
import { submitReviewForApproval, trackEvent } from "@/lib/forms";
import { REVIEW_PHOTO_ACCEPT, checkReviewPhoto, prepareReviewPhoto, type PreparedPhoto } from "@/lib/reviewPhoto";
import { StarIcon } from "@/components/ReviewStars";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2";

const ratingWords = ["", "Not for me", "It was okay", "Good", "Great", "Love it!"];

const productOptions = Array.from(new Set(products.map((product) => product.shortName))).concat([
  "Custom piece",
  "Something else",
]);

export function ReviewForm({ onDone, autoFocusTitle = false }: { onDone?: () => void; autoFocusTitle?: boolean }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const photoInputId = `${uid}-photo`;
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [product, setProduct] = useState("");
  const [review, setReview] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState("");

  function clearPhoto() {
    setPhoto(null);
    setPhotoError("");
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    const check = checkReviewPhoto(file);
    if (!check.ok) {
      setPhoto(null);
      setPhotoError(check.message);
      event.target.value = "";
      return;
    }
    setPhotoBusy(true);
    try {
      setPhoto(await prepareReviewPhoto(file));
    } catch {
      setPhoto(null);
      setPhotoError("We could not read that photo. Please try a different JPG, PNG or WEBP.");
      event.target.value = "";
    } finally {
      setPhotoBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (botcheck) return;
    if (!rating) {
      setStatus("error");
      setErrorMessage("Please choose a star rating.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitReviewForApproval({
      name,
      email,
      rating,
      review,
      product,
      photo: photo ? { blob: photo.blob, dataUrl: photo.dataUrl } : undefined,
    });
    if (result.ok) {
      trackEvent("review_submit", { rating, has_photo: Boolean(photo) });
      setStatus("success");
      setName("");
      setEmail("");
      setRating(0);
      setProduct("");
      setReview("");
      clearPhoto();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] bg-white p-6 text-center shadow-card md:p-8" role="status">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink/10">
          <svg className="h-7 w-7 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-chocolate">Thank you for the love!</h3>
        <p className="mx-auto mt-2 max-w-md text-chocolate-mid">
          Your review was sent for approval. Once it is approved, it will show up here on the site.
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-6 rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-cream transition hover:bg-chocolate/90"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 text-left shadow-card md:p-8" aria-labelledby={titleId}>
      <h3 id={titleId} tabIndex={autoFocusTitle ? -1 : undefined} data-review-form-title="" className="font-display text-2xl text-chocolate outline-none">
        Leave a review
      </h3>
      <p className="mt-1 text-sm text-chocolate-soft">
        Own a JOIRUSH cookie? Tell other collectors what you think. Reviews are checked before they go live.
      </p>

      {status === "error" && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">
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

      <fieldset className="mt-5">
        <legend className="mb-2 block text-sm font-medium">
          Your rating <span className="text-pink">*</span>
        </legend>
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className="cursor-pointer rounded-lg p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink"
              onMouseEnter={() => setHover(value)}
            >
              <input
                type="radio"
                name={`${uid}-rating`}
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                className="sr-only"
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
              />
              <StarIcon className={`h-8 w-8 ${value <= shown ? "text-caramel" : "text-chocolate/20"}`} filled={value <= shown} />
            </label>
          ))}
          <span className="ml-2 text-sm text-chocolate-soft" aria-live="polite">
            {ratingWords[shown]}
          </span>
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">
            Name <span className="text-pink">*</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="given-name"
            maxLength={60}
            className={fieldClass}
            placeholder="First name is perfect"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Email (optional, never shown)</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={fieldClass}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Which piece? (optional)</span>
        <select value={product} onChange={(event) => setProduct(event.target.value)} className={fieldClass}>
          <option value="">Choose a cookie</option>
          {productOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">
          Your review <span className="text-pink">*</span>
        </span>
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          required
          minLength={10}
          maxLength={1200}
          rows={4}
          className={fieldClass}
          placeholder="How does it look on your wall? Was it a gift?"
        />
      </label>

      <div className="mt-4 text-sm" data-review-photo-field="">
        <span className="mb-2 block font-medium">Add a photo of your cookie on the wall (optional)</span>
        {photo ? (
          <div className="flex items-center gap-4 rounded-2xl border border-chocolate/10 bg-cream p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.dataUrl}
              alt="Preview of the photo you chose"
              className="h-20 w-20 flex-none rounded-xl object-cover shadow-card"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-chocolate">Photo ready to send</p>
              <p className="text-xs text-chocolate-soft">It is only shown on the site after we approve your review.</p>
            </div>
            <button
              type="button"
              onClick={clearPhoto}
              className="flex-none rounded-full border border-chocolate/15 bg-white px-4 py-2 text-xs font-medium text-chocolate transition hover:bg-cream-deep"
            >
              Remove photo
            </button>
          </div>
        ) : (
          <label
            htmlFor={photoInputId}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-chocolate/25 bg-cream px-4 py-4 transition hover:border-pink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-pink/10 text-pink" aria-hidden="true">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8a2 2 0 012-2h1.4l1.1-1.6A1 1 0 019.4 4h5.2a1 1 0 01.9.4L16.6 6H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
                <circle cx="12" cy="12.5" r="3.5" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-chocolate">{photoBusy ? "Getting your photo ready..." : "Choose a photo"}</span>
              <span className="block text-xs text-chocolate-soft">JPG, PNG or WEBP, up to 4 MB. Show us where it hangs!</span>
            </span>
            <input
              ref={photoInputRef}
              id={photoInputId}
              type="file"
              name="photo"
              accept={REVIEW_PHOTO_ACCEPT}
              onChange={handlePhotoChange}
              disabled={photoBusy}
              className="sr-only"
            />
          </label>
        )}
        {photoError && (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {photoError}
          </p>
        )}
      </div>

      <button
        type="submit"
        data-sticky-buy-avoid=""
        disabled={status === "submitting" || photoBusy}
        className="mt-6 w-full rounded-full bg-pink px-6 py-3 font-medium text-white transition hover:bg-pink-hot disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit review"}
      </button>
    </form>
  );
}
