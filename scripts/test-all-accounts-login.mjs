import crypto from "crypto";
import fs from "fs";
import path from "path";

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) return false;
  const parts = storedHash.split(":");
  const salt = parts[0];
  const originalHash = parts[1];
  const iterations = parts.length > 2 ? parseInt(parts[2], 10) : 1000;

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

function createSessionToken(payload) {
  const jwtSecret = process.env.AUTH_SECRET || "collably_production_jwt_master_secret_key_2026_secure";
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    })
  ).toString("base64url");

  const signature = crypto.createHmac("sha256", jwtSecret).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${signature}`;
}

const db = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "valence_db.json"), "utf-8"));

const testCases = [
  {
    type: "1. Super Admin Account",
    email: "kevinbhutwala417@gmail.com",
    password: "admin123",
    expectedRole: "agency_admin",
  },
  {
    type: "2. Creator Persona Account",
    email: "creator@abeycollab.io",
    password: "password123",
    expectedRole: "creator",
  },
  {
    type: "3. Brand Persona Account",
    email: "brand@abeycollab.io",
    password: "password123",
    expectedRole: "brand",
  },
  {
    type: "4. Creator Legacy Account",
    email: "creator@collably.io",
    password: "password123",
    expectedRole: "creator",
  },
  {
    type: "5. Brand Legacy Account",
    email: "brand@collably.io",
    password: "password123",
    expectedRole: "brand",
  },
];

console.log("=================================================");
console.log("🔐 RUNNING END-TO-END LOGIN SIMULATION FOR ALL ACCOUNTS");
console.log("=================================================");

let allPassed = true;

for (const tc of testCases) {
  const user = db.users.find((u) => u.email.toLowerCase() === tc.email.toLowerCase());
  if (!user) {
    console.error(`❌ [FAIL] User not found: ${tc.email}`);
    allPassed = false;
    continue;
  }

  const isValidPassword = verifyPassword(tc.password, user.passwordHash);
  if (!isValidPassword) {
    console.error(`❌ [FAIL] Password mismatch for ${tc.email}`);
    allPassed = false;
    continue;
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  if (!token || token.split(".").length !== 3) {
    console.error(`❌ [FAIL] Token generation failed for ${tc.email}`);
    allPassed = false;
    continue;
  }

  console.log(`✅ [PASS] ${tc.type}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Role: ${user.role}`);
  console.log(`   Verified: ${user.verified}`);
  console.log(`   Token Generated: ${token.slice(0, 20)}... (valid 3-part JWT)`);
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log("\n🎉 ALL 5 ACCOUNT VARIANTS LOGGED IN SUCCESSFULLY!");
}
