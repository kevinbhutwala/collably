import crypto from "crypto";

/** Production must never use a repository-known signing secret. */
function getJwtSecret(): string {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.NODE_ENV !== "production") return "collably_local_development_secret_only";
  throw new Error("AUTH_SECRET must be configured in production");
}

const PBKDF2_ITERATIONS = 210000; // OWASP recommended rounds for SHA-512

/**
 * Hash password using standard PBKDF2 with salt and 210,000 iterations
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, "sha512").toString("hex");
  return `${salt}:${hash}:${PBKDF2_ITERATIONS}`;
}

/**
 * Verify password against stored salt:hash with timing-safe comparison
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const parts = storedHash.split(":");
  const salt = parts[0];
  const originalHash = parts[1];
  const iterations = parts.length > 2 ? parseInt(parts[2], 10) : 1000; // Backward compatible

  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");

  try {
    const hashBuf = Buffer.from(hash, "hex");
    const origBuf = Buffer.from(originalHash, "hex");
    if (hashBuf.length !== origBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, origBuf);
  } catch {
    return false;
  }
}

/**
 * Create HMAC-SHA256 signed session token
 */
export function createSessionToken(payload: { userId: string; email: string; role: string }): string {
  const jwtSecret = getJwtSecret();
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", jwtSecret)
    .update(`${header}.${data}`)
    .digest("base64url");

  return `${header}.${data}.${signature}`;
}

/**
 * Verify and decode session token
 */
export function verifySessionToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const jwtSecret = getJwtSecret();
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, data, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", jwtSecret)
      .update(`${header}.${data}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature, "utf-8");
    const expBuf = Buffer.from(expectedSignature, "utf-8");
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

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
