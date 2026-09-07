import type { NextConfig } from "next";

const repo = "Joirush_Website";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
