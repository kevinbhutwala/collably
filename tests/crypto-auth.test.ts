import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from "../src/server/auth/crypto";

export function runCryptoAuthTests(): { total: number; passed: number; failed: number } {
  console.log("\n🔑 --- TEST SUITE: Cryptography, PBKDF2 & JWT Auth ---");
  let passed = 0;
  let total = 0;

  function assert(name: string, condition: boolean, details?: string) {
    total++;
    if (condition) {
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${details ? `(${details})` : ""}`);
    }
  }

  // 1. Password hashing format with salt and 210,000 iterations
  const password = "SuperSecurePassword2026!";
  const hash = hashPassword(password);
  assert("1. Hash contains salt:hash:iterations", hash.split(":").length === 3 && hash.includes("210000"));

  // 2. Correct password verification
  assert("2. Verify correct password against hash", verifyPassword(password, hash));

  // 3. Incorrect password rejection
  assert("3. Reject incorrect password", !verifyPassword("WrongPassword123", hash));

  // 4. Session token generation and verification
  const payload = { userId: "user-123", email: "creator@example.com", role: "creator" };
  const token = createSessionToken(payload);
  assert("4. Valid JWT format with 3 segments", token.split(".").length === 3);

  // 5. Decoded payload matches original
  const decoded = verifySessionToken(token);
  assert("5. Decoded JWT matches original user payload", decoded?.userId === "user-123" && decoded?.role === "creator");

  // 6. Reject tampered token signature
  const tamperedToken = token.slice(0, -4) + "AAAA";
  assert("6. Reject tampered JWT signature", verifySessionToken(tamperedToken) === null);

  return { total, passed, failed: total - passed };
}
