import crypto from "crypto";

const JWT_SECRET = process.env.AUTH_SECRET || "valence_super_secret_jwt_encryption_key_2026";

/**
 * Hash password using standard PBKDF2 with salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, originalHash] = storedHash.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}

/**
 * Create HMAC-SHA256 signed session token
 */
export function createSessionToken(payload: { userId: string; email: string; role: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");

  return `${header}.${data}.${signature}`;
}

/**
 * Verify and decode session token
 */
export function verifySessionToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, data, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${data}`)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
