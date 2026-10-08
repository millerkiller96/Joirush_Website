/**
 * Form delivery config (single source of truth for every form on the site).
 *
 * All forms post to Web3Forms. Each access key delivers to the inbox it is
 * registered to (both keys below deliver to joirushshop@gmail.com).
 *
 *   WEB3FORMS_CONTACT_KEY       Contact page, Leave a review, Giveaway popup
 *   WEB3FORMS_CUSTOM_ORDER_KEY  Custom order page
 *
 * To change a key, edit it here and rebuild. Web3Forms keys are designed to be
 * public (client side); a key can only deliver to its registered inbox.
 */
export const WEB3FORMS_CONTACT_KEY = "2f04a3cf-dcf6-4b78-a650-9db4474d1ff1";
export const WEB3FORMS_CUSTOM_ORDER_KEY = "42552a36-887e-4c70-8afe-3c5e691f82aa";

/** Which key each form uses. */
export const FORM_KEYS = {
  contact: WEB3FORMS_CONTACT_KEY,
  customOrder: WEB3FORMS_CUSTOM_ORDER_KEY,
  review: WEB3FORMS_CONTACT_KEY,
  giveaway: WEB3FORMS_CONTACT_KEY,
} as const;

export type FormName = keyof typeof FORM_KEYS;

/**
 * Google Apps Script web app bound to the "joirush email list" sheet (optional).
 * ONE URL for both features:
 *   POST {type:"giveaway"}  appends giveaway entries to the Giveaway tab
 *   POST {type:"review"}    appends reviews to the Reviews tab (owner ticks Approved)
 *   GET  ?action=approved   returns approved reviews (public fields only)
 * Paste the deployed web app URL (ends in /exec) here and rebuild. While empty,
 * forms only email through Web3Forms and the site shows its built in reviews.
 * Script source and deploy steps: docs-internal/giveaway-apps-script.gs
 */
export const GOOGLE_SCRIPT_URL: string =
  "https://script.google.com/macros/s/AKfycbzMYJfGSctybhdDNPdXcGJxH5yYUAYeHknw-mBHuEp_6ZTt6y4q-9Dgdvt9SpNa_ZAz/exec";

/** Where the owner approves reviews (linked in the "review waiting" email). */
export const REVIEWS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1edgaV7qX4pnE680bSXJeOLW0QM64Ky9xI0lWayfj8cc/edit";

/** Consent text shown under the giveaway email field and saved with each entry. */
export const GIVEAWAY_CONSENT_TEXT =
  "By entering, you agree to get emails from JOIRUSH about the giveaway and occasional cookie news. Unsubscribe anytime.";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type SubmitResult = { ok: true } | { ok: false; message: string };

type Web3FormsPayload = {
  subject: string;
  from_name: string;
  email?: string;
  name?: string;
  [field: string]: string | number | boolean | undefined;
};

/** A file sent to Web3Forms as a multipart attachment (Web3Forms Pro feature). */
export type Web3FormsAttachment = { field: string; file: Blob; filename: string };

/**
 * Low level Web3Forms POST used by every form helper below.
 * Without an attachment it posts JSON (as always). With one it posts multipart
 * form data so the file lands in the inbox as an email attachment.
 */
export async function submitWeb3Form(
  form: FormName,
  payload: Web3FormsPayload,
  attachment?: Web3FormsAttachment,
): Promise<SubmitResult> {
  // Drop empty optional fields so the email stays tidy.
  const body: Record<string, string | number | boolean> = { access_key: FORM_KEYS[form] };
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === "") continue;
    body[key] = value;
  }

  try {
    let response: Response;
    if (attachment) {
      const data = new FormData();
      for (const [key, value] of Object.entries(body)) data.append(key, String(value));
      data.append(attachment.field, attachment.file, attachment.filename);
      // No Content-Type header: the browser sets the multipart boundary itself.
      response = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
    } else {
      response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
    }
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.success) return { ok: true };
    return { ok: false, message: result.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

/* ======================================================================== */
/* Feature specific senders. The UI calls these as is.                      */
/* ======================================================================== */

export type ReviewSubmission = {
  name: string;
  email?: string;
  rating: number;
  review: string;
  /** Optional product the reviewer picked. Empty string when none was chosen. */
  product?: string;
  /** Optional photo, already resized on the device (JPEG data URL). */
  photo?: string;
};

/** Keepalive requests are capped at 64 KB by browsers, so big bodies (photos) skip it. */
const KEEPALIVE_MAX_BYTES = 60000;

/**
 * Fire and forget POST to the Google Apps Script web app.
 * `no-cors` + text/plain avoids a CORS preflight; the response is opaque and
 * any failure is swallowed so it can never block or break a visitor's submission.
 */
export function postToGoogleScript(payload: Record<string, unknown>) {
  if (!GOOGLE_SCRIPT_URL || typeof window === "undefined") return;
  try {
    const body = JSON.stringify({ ...payload, sourcePage: window.location.href });
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: body.length < KEEPALIVE_MAX_BYTES,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    }).catch(() => {});
  } catch {
    // Never let the sheet call affect the form.
  }
}

/** Turns a data URL into a Blob for the email attachment. */
function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const [meta, base64] = dataUrl.split(",");
    const type = /data:([^;]+);base64/.exec(meta)?.[1] || "image/jpeg";
    const bytes = atob(base64);
    const buffer = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) buffer[i] = bytes.charCodeAt(i);
    return new Blob([buffer], { type });
  } catch {
    return null;
  }
}

function photoFilename(name: string) {
  const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 30) || "customer";
  return `joirush_review_photo_${safe}.jpg`;
}

/**
 * Sends a review for approval.
 *  1. Web3Forms emails it to the shop inbox. With a photo it goes as a file attachment;
 *     if Web3Forms refuses the attachment (attachments need a paid plan), the review is
 *     resent as text only so it is never lost.
 *  2. The Apps Script saves it to the Reviews tab. The photo travels as a base64 data URL
 *     in `photo`; the script stores it in Google Drive and puts the link in the Photo column.
 *     `photoInInbox` tells the script whether the email already carried the photo, so it can
 *     email the photo itself when it did not. An older script just ignores these fields.
 */
export async function submitReviewForApproval(review: ReviewSubmission): Promise<SubmitResult> {
  const product = (review.product ?? "").trim();
  const photoBlob = review.photo ? dataUrlToBlob(review.photo) : null;
  const hasPhoto = Boolean(review.photo && photoBlob);
  const howToApprove = GOOGLE_SCRIPT_URL
    ? `Open the Reviews tab and tick Approved to publish it: ${REVIEWS_SHEET_URL}`
    : "Add it to src/data/approved-reviews.json to publish it.";
  const fields: Web3FormsPayload = {
    subject: `New ${review.rating} star review waiting for approval${hasPhoto ? " (with photo)" : ""}`,
    from_name: "JOIRUSH Reviews",
    name: review.name,
    email: review.email,
    rating: `${review.rating} out of 5 stars`,
    product: product || "Not chosen",
    review: review.review,
    how_to_approve: howToApprove,
    page: typeof window !== "undefined" ? window.location.href : undefined,
  };

  let result: SubmitResult;
  let photoInInbox = false;
  if (hasPhoto && photoBlob) {
    result = await submitWeb3Form(
      "review",
      { ...fields, photo: "Attached to this email. It is also saved in the Photo column of the Reviews tab." },
      { field: "attachment", file: photoBlob, filename: photoFilename(review.name) },
    );
    photoInInbox = result.ok;
    if (!result.ok) {
      result = await submitWeb3Form("review", {
        ...fields,
        photo: "The customer added a photo. It is saved in the Photo column of the Reviews tab.",
      });
    }
  } else {
    result = await submitWeb3Form("review", fields);
  }

  postToGoogleScript({
    type: "review",
    name: review.name,
    // Named reviewerEmail so an older giveaway only script can never log it as a giveaway entry.
    reviewerEmail: review.email ?? "",
    rating: review.rating,
    review: review.review,
    product,
    hasPhoto,
    photo: hasPhoto ? review.photo : "",
    photoInInbox,
  });
  return result;
}

export function submitGiveawayEntry(email: string): Promise<SubmitResult> {
  postToGoogleScript({
    type: "giveaway",
    email,
    consent: GIVEAWAY_CONSENT_TEXT,
    source: "joirush.com giveaway popup",
  });
  return submitWeb3Form("giveaway", {
    subject: "Giveaway entry",
    from_name: "JOIRUSH Monthly Giveaway",
    email,
    message: `Monthly free cookie giveaway entry from ${email}. Winners are drawn on the 30th of every month.`,
    consent: GIVEAWAY_CONSENT_TEXT,
    page: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

/** Fire a GA4 event if gtag is loaded (no op otherwise). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
