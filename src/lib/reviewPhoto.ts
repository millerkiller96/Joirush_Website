/**
 * Review photo helpers (client side only).
 * A visitor picks one jpg, png or webp image. It is resized on the device to a
 * JPEG no wider than MAX_WIDTH at QUALITY, so even large phone photos upload fast.
 */
export const PHOTO_ACCEPT = "image/jpeg,image/png,image/webp";
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
/** Largest original file we accept. Most phone photos fit; the upload itself is far smaller after resizing. */
export const MAX_ORIGINAL_BYTES = 4 * 1024 * 1024;
/** Hard cap on the resized upload (data URL length). */
const MAX_OUTPUT_CHARS = 4 * 1024 * 1024;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1600;
const QUALITY = 0.7;

export type PhotoResult = { ok: true; dataUrl: string } | { ok: false; message: string };

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    img.src = url;
  });
}

export async function prepareReviewPhoto(file: File): Promise<PhotoResult> {
  const type = (file.type || "").toLowerCase();
  const byName = /\.(jpe?g|png|webp)$/i.test(file.name);
  if (!(ACCEPTED_TYPES.has(type) || (!type && byName))) {
    return { ok: false, message: "Please choose a JPG, PNG or WEBP photo." };
  }
  if (file.size > MAX_ORIGINAL_BYTES) {
    return { ok: false, message: "That photo is over 4 MB. Please choose a smaller one." };
  }
  try {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_WIDTH / img.naturalWidth, MAX_HEIGHT / img.naturalHeight);
    const width = Math.max(1, Math.round(img.naturalWidth * scale));
    const height = Math.max(1, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { ok: false, message: "Sorry, this browser could not read that photo." };
    // White background so transparent PNGs do not turn black as JPEG.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
    if (!dataUrl.startsWith("data:image/jpeg")) return { ok: false, message: "Sorry, this browser could not read that photo." };
    if (dataUrl.length > MAX_OUTPUT_CHARS) return { ok: false, message: "That photo is too large. Please choose a smaller one." };
    return { ok: true, dataUrl };
  } catch {
    return { ok: false, message: "Sorry, we could not open that photo. Please try another one." };
  }
}

/** Only show photos from https URLs (the Apps Script returns Google Drive image links). */
export function safePhotoUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const url = value.trim();
  if (!/^https:\/\/[^\s"'<>]+$/i.test(url) || url.length > 600) return undefined;
  return url;
}
