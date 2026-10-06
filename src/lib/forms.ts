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

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type SubmitResult = { ok: true } | { ok: false; message: string };

type Web3FormsPayload = {
  subject: string;
  from_name: string;
  email?: string;
  name?: string;
  [field: string]: string | number | boolean | undefined;
};

/** Low level Web3Forms POST used by every form helper below. */
export async function submitWeb3Form(form: FormName, payload: Web3FormsPayload): Promise<SubmitResult> {
  // Drop empty optional fields so the email stays tidy.
  const body: Record<string, string | number | boolean> = { access_key: FORM_KEYS[form] };
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === "") continue;
    body[key] = value;
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.success) return { ok: true };
    return { ok: false, message: result.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

/* ------------------------------------------------------------------------ */
/* Feature specific senders. When a backend exists for reviews/giveaway,    */
/* only these two functions need to change; the UI calls them as is.        */
/* ------------------------------------------------------------------------ */

export type ReviewSubmission = {
  name: string;
  email?: string;
  rating: number;
  review: string;
  product?: string;
};

export function submitReviewForApproval(review: ReviewSubmission): Promise<SubmitResult> {
  return submitWeb3Form("review", {
    subject: "New review for approval",
    from_name: "JOIRUSH Reviews",
    name: review.name,
    email: review.email,
    rating: `${review.rating} out of 5 stars`,
    product: review.product,
    review: review.review,
    page: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

export function submitGiveawayEntry(email: string): Promise<SubmitResult> {
  return submitWeb3Form("giveaway", {
    subject: "Giveaway entry",
    from_name: "JOIRUSH Monthly Giveaway",
    email,
    message: `Monthly free cookie giveaway entry from ${email}. Winners are drawn on the 30th of every month.`,
    page: typeof window !== "undefined" ? window.location.href : undefined,
  });
}

/** Fire a GA4 event if gtag is loaded (no op otherwise). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
