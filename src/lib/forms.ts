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

/** Optional file sent with a Web3Forms submission (Web3Forms reads one file named "attachment"). */
export type Web3FormsAttachment = { blob: Blob; filename: string };

type SendOutcome = SubmitResult & { network?: boolean };

/** Low level Web3Forms POST used by every form helper below. */
export async function submitWeb3Form(
  form: FormName,
  payload: Web3FormsPayload,
  attachment?: Web3FormsAttachment,
): Promise<SubmitResult> {
  const result = await sendWeb3Form(form, payload, attachment);
  return result.ok ? { ok: true } : { ok: false, message: result.message };
}

async function sendWeb3Form(form: FormName, payload: Web3FormsPayload, attachment?: Web3FormsAttachment): Promise<SendOutcome> {
  // Drop empty optional fields so the email stays tidy.
  const body: Record<string, string | number | boolean> = { access_key: FORM_KEYS[form] };
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === "") continue;
    body[key] = value;
  }

  let init: RequestInit;
  if (attachment) {
    // Attachments must go as multipart/form-data. Do not set Content-Type; the browser adds the boundary.
    const data = new FormData();
    for (const [key, value] of Object.entries(body)) data.append(key, String(value));
    data.append("attachment", attachment.blob, attachment.filename);
    init = { method: "POST", headers: { Accept: "application/json" }, body: data };
  } else {
    init = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, init);
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.success) return { ok: true };
    return { ok: false, message: result.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, network: true, message: "Network error. Please check your connection and try again." };
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
  product?: string;
  /** Optional photo, already shrunk to a small JPEG by src/lib/reviewPhoto.ts. */
  photo?: { blob: Blob; dataUrl: string };
};

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
      // Browsers cap keepalive bodies at 64 KB, so a review with a photo is sent without it.
      keepalive: body.length < 60000,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    }).catch(() => {});
  } catch {
    // Never let the sheet call affect the form.
  }
}

export async function submitReviewForApproval(review: ReviewSubmission): Promise<SubmitResult> {
  const hasPhoto = Boolean(review.photo);
  postToGoogleScript({
    type: "review",
    name: review.name,
    // Named reviewerEmail so an older giveaway only script can never log it as a giveaway entry.
    reviewerEmail: review.email ?? "",
    rating: review.rating,
    review: review.review,
    product: review.product ?? "",
    hasPhoto,
    // Base64 JPEG data URL. The sheet script saves it to Google Drive and links it in the Photo column.
    photo: review.photo?.dataUrl ?? "",
  });

  const fields: Web3FormsPayload = {
    subject: `New ${review.rating} star review waiting for approval${hasPhoto ? " (with photo)" : ""}`,
    from_name: "JOIRUSH Reviews",
    name: review.name,
    email: review.email,
    rating: `${review.rating} out of 5 stars`,
    product: review.product,
    review: review.review,
    photo: hasPhoto
      ? "Yes. The photo is attached to this email and is also saved in the Photo column of the Reviews tab."
      : undefined,
    how_to_approve: GOOGLE_SCRIPT_URL
      ? `Open the Reviews tab and tick Approved to publish it: ${REVIEWS_SHEET_URL}`
      : "Add it to src/data/approved-reviews.json to publish it.",
    page: typeof window !== "undefined" ? window.location.href : undefined,
  };

  if (!review.photo) return submitWeb3Form("review", fields);

  const withFile = await sendWeb3Form("review", fields, { blob: review.photo.blob, filename: "review-photo.jpg" });
  if (withFile.ok) return { ok: true };
  // Attachments need a Web3Forms paid plan. If the file was refused, still deliver the review text.
  return submitWeb3Form("review", {
    ...fields,
    photo:
      "Yes, but it could not be attached to this email. It is saved in the Photo column of the Reviews tab (needs the updated sheet script).",
  });
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
