export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
