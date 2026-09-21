export const siteUrl = "https://joirush.com";

export function getAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const trailingPath = cleanPath.endsWith("/") || cleanPath === "/" ? cleanPath : `${cleanPath}/`;
  return `${siteUrl}${trailingPath}`;
}

export function getImageUrl(imagePath: string): string {
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${siteUrl}${cleanPath}`;
}
