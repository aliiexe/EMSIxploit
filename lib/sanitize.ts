/**
 * Input sanitization for security (XSS, injection, path traversal).
 * Use for all user-supplied data before display, storage, or use in HTML/files.
 */

/** Strip HTML tags and control characters, trim, optionally cap length. */
export function sanitizeString(
  input: unknown,
  maxLength?: number
): string {
  if (input == null || typeof input !== "string") return "";
  let s = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // control chars
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .trim();
  if (typeof maxLength === "number" && maxLength > 0 && s.length > maxLength) {
    s = s.slice(0, maxLength);
  }
  return s;
}

/** Escape for safe use inside HTML text / attributes. */
export function escapeHtml(raw: unknown): string {
  if (raw == null) return "";
  const s = String(raw);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Safe slug: only [a-zA-Z0-9-_]. Returns null if invalid (e.g. path traversal). */
const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;

export function sanitizeSlug(slug: unknown): string | null {
  if (slug == null || typeof slug !== "string") return null;
  const s = slug.trim();
  if (s === "" || s.includes("..") || s.includes("/") || s.includes("\\")) return null;
  return SLUG_REGEX.test(s) ? s : null;
}

/** Sanitize search query: trim, limit length, no control chars. */
export function sanitizeSearchQuery(input: unknown, maxLength = 200): string {
  return sanitizeString(input, maxLength);
}
