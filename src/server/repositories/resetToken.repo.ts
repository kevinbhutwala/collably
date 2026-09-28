import crypto from "crypto";
import { db } from "../db/database";
import { PasswordResetTokenEntity } from "../db/schema";

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3; // max 3 requests per hour per email
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

/**
 * Generates a cryptographically secure random token and its SHA-256 hash.
 * Only the hash is stored; the raw token goes in the reset URL.
 */
export function generateResetToken(): { raw: string; hash: string } {
  const raw = crypto.randomBytes(32).toString("hex"); // 256 bits of entropy
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

/**
 * Hash a raw token for lookup (same as above but for verification path).
 */
export function hashToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export class PasswordResetTokenRepository {
  private tokens(): PasswordResetTokenEntity[] {
    return db.getState().passwordResetTokens ?? [];
  }

  /**
   * Check if the email has hit the rate limit.
   * Max 3 reset emails per hour per email address.
   */
  isRateLimited(email: string): boolean {
    const normalized = email.toLowerCase().trim();
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    const recent = this.tokens().filter(
      (t) => t.email.toLowerCase() === normalized && t.createdAt >= windowStart
    );
    return recent.length >= RATE_LIMIT_MAX;
  }

  /**
   * Invalidate all existing (unused, non-expired) tokens for this email
   * so older links sent before a new request cannot be reused.
   */
  invalidateAllForEmail(email: string): void {
    const normalized = email.toLowerCase().trim();
    const now = new Date().toISOString();
    db.updateState((state) => {
      if (!state.passwordResetTokens) return;
      state.passwordResetTokens = state.passwordResetTokens.map((t) =>
        t.email.toLowerCase() === normalized && !t.usedAt
          ? { ...t, usedAt: now } // mark as used so old links are dead
          : t
      );
    });
  }

  /**
   * Create and persist a new reset token record for this user/email.
   * Returns the tokenHash (stored) and raw token (sent in URL).
   */
  create(userId: string, email: string): { raw: string; hash: string } {
    const { raw, hash } = generateResetToken();
    const now = new Date();
    const record: PasswordResetTokenEntity = {
      tokenHash: hash,
      userId,
      email: email.toLowerCase().trim(),
      expiresAt: new Date(now.getTime() + TOKEN_EXPIRY_MS).toISOString(),
      createdAt: now.toISOString(),
    };
    db.updateState((state) => {
      state.passwordResetTokens = state.passwordResetTokens ?? [];
      state.passwordResetTokens.push(record);
    });
    return { raw, hash };
  }

  /**
   * Find a token record by its SHA-256 hash.
   */
  findByHash(hash: string): PasswordResetTokenEntity | undefined {
    return this.tokens().find((t) => t.tokenHash === hash);
  }

  /**
   * Validate a raw token string.
   * Returns the token record if valid, or a descriptive error string.
   */
  validate(rawToken: string): { valid: true; record: PasswordResetTokenEntity } | { valid: false; reason: string } {
    if (!rawToken || rawToken.length < 32) {
      return { valid: false, reason: "invalid_token" };
    }
    const hash = hashToken(rawToken);
    const record = this.findByHash(hash);
    if (!record) {
      return { valid: false, reason: "invalid_token" };
    }
    if (record.usedAt) {
      return { valid: false, reason: "already_used" };
    }
    if (new Date(record.expiresAt) < new Date()) {
      return { valid: false, reason: "expired" };
    }
    return { valid: true, record };
  }

  /**
   * Mark a token as used. Call immediately after a successful password reset.
   */
  consume(tokenHash: string): void {
    const now = new Date().toISOString();
    db.updateState((state) => {
      if (!state.passwordResetTokens) return;
      const idx = state.passwordResetTokens.findIndex((t) => t.tokenHash === tokenHash);
      if (idx !== -1) {
        state.passwordResetTokens[idx] = {
          ...state.passwordResetTokens[idx],
          usedAt: now,
        };
      }
    });
  }

  /**
   * Purge tokens older than 24 hours (housekeeping — run periodically).
   */
  purgeExpired(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    db.updateState((state) => {
      state.passwordResetTokens = (state.passwordResetTokens ?? []).filter(
        (t) => t.createdAt > cutoff
      );
    });
  }
}

export const resetTokenRepo = new PasswordResetTokenRepository();
