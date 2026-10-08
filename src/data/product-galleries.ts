/**
 * Product photo galleries, one entry per product slug.
 * Photos come from each product's Etsy listing (same order as on Etsy), resized to
 * 1600px max (01.webp), plus a 960px version (01-md.webp) for srcset and a 240px
 * thumbnail (01-th.webp). Files live in public/products/<slug>/.
 */
export type GalleryImage = {
  /** 1600px long edge WebP */
  src: string;
  /** 960px long edge WebP */
  md: string;
  /** 240px long edge WebP */
  thumb: string;
  width: number;
  height: number;
  /**
   * CSS object-position for the square crop on the product page, when the
   * cookie sits off center in the photo. Defaults to centered.
   */
  position?: string;
};

type GallerySource = {
  listingId: string;
  sizes: [number, number][];
  /** Square crop focus per photo number (1 based), e.g. { 2: "50% 100%" }. */
  focus?: Record<number, string>;
};

const sources: Record<string, GallerySource> = {
  "jumbo-chocolate-chip-cookie": { listingId: "1831819997", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "oversized-mini-cookie-pair": { listingId: "4452655428", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "jumbo-mm-cookie-set": { listingId: "4452651114", sizes: [[1200, 1600], [1200, 1600], [1200, 1600]] },
  "jumbo-white-chocolate-chip-cookie": { listingId: "4452647836", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "rainbow-candy-cookie": { listingId: "4452645632", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "mini-jumbo-chocolate-chip-cookie": { listingId: "4452643820", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "jumbo-pastel-mm-cookie": { listingId: "4452635945", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "jumbo-christmas-cookie": { listingId: "4438064219", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "giant-peanut-butter-cookie": { listingId: "1817504830", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "giant-double-chocolate-cookie": { listingId: "1817632262", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
  "cookie-ice-cream-sandwich": { listingId: "1892110346", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]], focus: { 2: "50% 100%", 5: "50% 100%", 6: "50% 100%" } },
  "jumbo-mm-cookie": { listingId: "1831839675", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1154, 1600]] },
  "hot-pink-mm-cookie": { listingId: "1831836105", sizes: [[1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600], [1200, 1600]] },
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function getGalleryImages(slug: string): GalleryImage[] {
  const source = sources[slug];
  if (!source) return [];
  return source.sizes.map(([width, height], index) => {
    const base = `/products/${slug}/${pad(index + 1)}`;
    const position = source.focus?.[index + 1];
    return { src: `${base}.webp`, md: `${base}-md.webp`, thumb: `${base}-th.webp`, width, height, ...(position ? { position } : {}) };
  });
}
/** Gallery for a product, falling back to its single main image when no Etsy photos exist. */
export function getProductGallery(slug: string, fallbackImage: string): GalleryImage[] {
  const images = getGalleryImages(slug);
  if (images.length > 0) return images;
  return [{ src: fallbackImage, md: fallbackImage, thumb: fallbackImage, width: 1200, height: 1600 }];
}
