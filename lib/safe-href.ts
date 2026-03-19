/**
 * Href checks for client navigation and public search index — blocks open redirects & script URLs.
 */

const DANGEROUS_PROTOCOLS = /^(javascript|data|vbscript):/i;

export function isSafePublicPath(href: string): boolean {
  if (typeof href !== "string" || href.length > 2048) return false;
  const h = href.trim();
  if (!h.startsWith("/")) return false;
  if (h.startsWith("//")) return false;
  if (h.includes("..") || h.includes("\\")) return false;
  if (h.toLowerCase().startsWith("/api")) return false;
  if (h.startsWith("/_")) return false;
  return true;
}

/** Safe for router.push / window.location (internal paths only from search). */
export function isSafeClientNavHref(href: string): boolean {
  if (typeof href !== "string" || href.length > 2048) return false;
  const h = href.trim();
  if (DANGEROUS_PROTOCOLS.test(h)) return false;
  if (h.startsWith("/")) return isSafePublicPath(h);
  try {
    const u = new URL(h);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
