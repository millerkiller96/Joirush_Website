/**
 * Review photo helpers (client side only).
 *
 * A visitor can attach ONE photo to a review. Before anything is sent, the
 * photo is shrunk to a small JPEG (max 1200px wide, quality 0.7) so the
 * payload to Web3Forms and the Google Apps Script stays small.
 */
export const REVIEW_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const REVIEW_PHOTO_ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
export const REVIEW_PHOTO_MAX_BYTES = 4 * 1024 * 1024; // about 4 MB, before shrinking
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1600;
const JPEG_QUALITY = 0.7;

export type PreparedPhoto = {
  /** Shrunk JPEG, used as the Web3Forms email attachment. */
  blob: Blob;
  /** Same JPEG as a base64 data URL, sent to the Google Apps Script and used for the preview. */
  dataUrl: string;
  width: number;
  height: number;
};

export type PhotoCheck = { ok: true } | { ok: false; message: string };

function typeOf(file: File): string {
  if (file.type) return file.type.toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "";
}

export function checkReviewPhoto(file: File): PhotoCheck {
  if (!(REVIEW_PHOTO_TYPES as readonly string[]).includes(typeOf(file))) {
    return { ok: false, message: "Please choose a JPG, PNG or WEBP photo." };
  }
  if (file.size > REVIEW_PHOTO_MAX_BYTES) {
    return { ok: false, message: "That photo is over 4 MB. Please choose a smaller one." };
  }
  return { ok: true };
}

type Drawable = { source: CanvasImageSource; width: number; height: number; done: () => void };

async function decode(file: File): Promise<Drawable> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      return { source: bitmap, width: bitmap.width, height: bitmap.height, done: () => bitmap.close() };
    } catch {
      // Fall through to the <img> path (older Safari).
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("decode failed"));
      image.src = url;
    });
    return { source: img, width: img.naturalWidth, height: img.naturalHeight, done: () => URL.revokeObjectURL(url) };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function toDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Shrinks the chosen photo to a small JPEG. Throws if the browser cannot read it. */
export async function prepareReviewPhoto(file: File): Promise<PreparedPhoto> {
  const image = await decode(file);
  try {
    if (!image.width || !image.height) throw new Error("empty image");
    const scale = Math.min(1, MAX_WIDTH / image.width, MAX_HEIGHT / image.height);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.fillStyle = "#ffffff"; // transparent PNG areas become white, not black
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image.source, 0, 0, width, height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("encode failed"))), "image/jpeg", JPEG_QUALITY),
    );
    const dataUrl = await toDataUrl(blob);
    return { blob, dataUrl, width, height };
  } finally {
    image.done();
  }
}

const PHOTO_HOSTS = /(^|\.)(drive\.google\.com|googleusercontent\.com|joirush\.com)$/i;

/**
 * Only shows photos from places the owner controls (Google Drive via the sheet
 * script, or files in this site). Drive share links are turned into a direct
 * image link. Anything else returns undefined.
 */
export function safeReviewPhotoUrl(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!value) return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:" || !PHOTO_HOSTS.test(url.hostname)) return undefined;
  if (/^drive\.google\.com$/i.test(url.hostname)) {
    const id = url.pathname.match(/\/d\/([\w-]{10,})/)?.[1] ?? url.searchParams.get("id");
    if (!id || !/^[\w-]{10,}$/.test(id)) return undefined;
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  }
  return url.toString();
}
