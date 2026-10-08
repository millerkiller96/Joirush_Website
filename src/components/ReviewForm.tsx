"use client";

import { useId, useRef, useState } from "react";
import { submitReviewForApproval, trackEvent } from "@/lib/forms";
import { PHOTO_ACCEPT, prepareReviewPhoto } from "@/lib/reviewPhoto";
import { StarIcon } from "@/components/ReviewStars";
import { CookiePicker, cookieOptions } from "@/components/CookiePicker";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-chocolate/10 bg-cream px-4 py-3 outline-none ring-pink focus:ring-2";

const ratingWords = ["", "Not for me", "It was okay", "Good", "Great", "Love it!"];

/** The real product names (one per product in src/data/products.ts). */
export const reviewProductOptions = cookieOptions.map((option) => option.name);

type ReviewFormProps = {
  onDone?: () => void;
  /** Product to preselect (for example on a product page). The reviewer can change or clear it. */
  defaultProduct?: string;
  /** Focus the first field when the form mounts (used by the popup). */
  autoFocus?: boolean;
};

export function ReviewForm({ onDone, defaultProduct = "", autoFocus = false }: ReviewFormProps) {
  const uid = useId();
  const titleId = `${uid}title`;
  const photoInputId = `${uid}photo`;
  const productLabelId = `${uid}product`;
  const initialProduct = reviewProductOptions.includes(defaultProduct) ? defaultProduct : "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [product, setProduct] = useState(initialProduct);
  const [review, setReview] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotoError("");
    setPhotoBusy(true);
    const result = await prepareReviewPhoto(file);
    setPhotoBusy(false);
    if (result.ok) setPhoto(result.dataUrl);
    else setPhotoError(result.message);
  }

  function removePhoto() {
    setPhoto("");
    setPhotoError("");
    photoInputRef.current?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (botcheck) return;
    if (photoBusy) return;
    if (!rating) {
      setStatus("error");
      setErrorMessage("Please choose a star rating.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitReviewForApproval({ name, email, rating, review, product, photo: photo || undefined });
    if (result.ok) {
      trackEvent("review_submit", { rating, has_photo: Boolean(photo), has_product: Boolean(product) });
      setStatus("success");
      setName("");
      setEmail("");
      setRating(0);
      setProduct(initialProduct);
      setReview("");
      setPhoto("");
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
      <h3 id={titleId} className="font-display text-2xl text-chocolate">
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
                name="review-rating"
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
            autoFocus={autoFocus}
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

      <div className="mt-4 block text-sm">
        <span id={productLabelId} className="mb-2 block font-medium">
          Which cookie did you buy?
        </span>
        <CookiePicker value={product} onChange={setProduct} labelId={productLabelId} />
        <input type="hidden" name="product" value={product} data-review-product="" />
      </div>

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

      <div className="mt-4 text-sm">
        <span className="mb-2 block font-medium">Add a photo (optional)</span>
        <p className="mb-3 text-chocolate-soft">Show us your cookie on the wall. JPG, PNG or WEBP, up to 4 MB.</p>
        <input
          id={photoInputId}
          ref={photoInputRef}
          type="file"
          name="photo"
          accept={PHOTO_ACCEPT}
          onChange={handlePhotoChange}
          disabled={photoBusy}
          aria-label="Add a photo (optional)"
          className="peer sr-only"
          data-review-photo-input=""
        />
        {photo ? (
          <div className="flex items-center gap-4 rounded-2xl border border-chocolate/10 bg-cream p-3" data-review-photo-preview="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="Your photo preview" className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <span className="text-chocolate-mid">Photo added</span>
              <button
                type="button"
                onClick={removePhoto}
                className="rounded-full border border-chocolate/15 bg-white px-4 py-2 text-sm font-medium text-chocolate transition hover:bg-cream-deep"
              >
                Remove photo
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={photoInputId}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-chocolate/15 bg-cream px-4 py-5 text-chocolate-mid transition hover:border-pink hover:text-chocolate peer-focus-visible:ring-2 peer-focus-visible:ring-pink"
          >
            <svg className="h-5 w-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h1.5l1.5-2h8l1.5 2H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3.5" strokeWidth={2} />
            </svg>
            <span className="font-medium">{photoBusy ? "Getting your photo ready..." : "Choose a photo"}</span>
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
