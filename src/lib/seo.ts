const repo = "Joirush_Website";
const isGithubPages = process.env.GITHUB_PAGES === "true";

export const siteUrl = isGithubPages
  ? `https://millerkiller96.github.io/${repo}`
  : "https://joirush.com";

export const basePath = isGithubPages ? `/${repo}` : "";

export function getAbsoluteUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const trailingPath = cleanPath.endsWith("/") || cleanPath === "/" ? cleanPath : `${cleanPath}/`;
  return `${siteUrl}${trailingPath}`;
}

export function getImageUrl(imagePath: string): string {
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${siteUrl}${basePath}${cleanPath}`;
}
