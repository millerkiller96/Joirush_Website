import { execFileSync } from "node:child_process";

/**
 * Build time helper for sitemap lastmod values.
 *
 * Returns the date of the most recent git commit that touched any of the given
 * paths (relative to the repo root). Returns undefined when git is unavailable,
 * the history is shallow (dates would be wrong), or no commit touches the paths,
 * so the sitemap simply omits lastmod instead of guessing.
 */

const cache = new Map<string, Date | undefined>();
let historyUsable: boolean | undefined;

function git(args: string[]): string {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function hasUsableHistory(): boolean {
  if (historyUsable !== undefined) return historyUsable;
  try {
    historyUsable = git(["rev-parse", "--is-shallow-repository"]) === "false";
  } catch {
    historyUsable = false;
  }
  return historyUsable;
}

export function getGitLastModified(paths: string[]): Date | undefined {
  const key = paths.join("\n");
  if (cache.has(key)) return cache.get(key);

  let result: Date | undefined;
  if (hasUsableHistory()) {
    try {
      const output = git(["log", "-1", "--format=%cI", "--", ...paths]);
      if (output) {
        const date = new Date(output);
        if (!Number.isNaN(date.getTime())) result = date;
      }
    } catch {
      result = undefined;
    }
  }

  cache.set(key, result);
  return result;
}
