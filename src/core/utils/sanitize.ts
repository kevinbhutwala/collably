/**
 * XSS & Dangerous Payload Sanitization Engine (Phase 6 Core)
 * Sanitizes test briefs, creator profiles, pitches, and comments.
 */

export function sanitizeText(input: string | null | undefined): string {
  if (!input) return "";

  return String(input)
    // Escape HTML tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    // Remove javascript: pseudoprotocol
    .replace(/javascript:/gi, "")
    // Remove inline event handlers
    .replace(/on\w+\s*=/gi, "");
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  const result: Record<string, any> = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = sanitizeText(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
