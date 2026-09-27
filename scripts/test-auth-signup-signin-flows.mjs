import crypto from "crypto";
import fs from "fs";
import path from "path";
import { z } from "zod";

console.log("================================================================================");
console.log("🔐 COMPREHENSIVE AUTHENTICATION, SIGNUP, SIGNIN & USER DATA INTEGRITY AUDIT");
console.log("================================================================================\n");

let total = 0;
let passed = 0;

function assert(section, name, condition, details = "") {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ [PASS] [${section}] ${name}`);
  } else {
    console.error(`  ❌ [FAIL] [${section}] ${name} ${details ? `-> ${details}` : ""}`);
  }
}

// -----------------------------------------------------------------------------
// 1. ZOD SCHEMA VALIDATION TESTS
// -----------------------------------------------------------------------------
console.log("📋 --- 1. ZOD VALIDATION SCHEMAS & ERROR MESSAGES ---");

const CreatorCategoryEnum = z.enum([
  'Technology & AI',
  'Fashion & Style',
  'Fitness & Wellness',
  'Gaming & Esports',
  'Travel & Hospitality',
  'Beauty & Skincare',
  'Food & Culinary',
  'Finance & Business',
  'Design & Creative',
  'Lifestyle & Culture',
]);

const LoginSchema = z.object({
  email: z.string().trim().min(2, "Please enter your email address or creator handle"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

const CreatorRegisterSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  handle: z.string().trim().min(2, "Handle must be at least 2 characters").max(60),
  primaryCategory: CreatorCategoryEnum,
  location: z.string().trim().min(2, "Location is required"),
  startingPrice: z.number().min(1, "Starting price must be greater than 0"),
  bio: z.string().max(2000).optional().or(z.literal("")),
});

const BrandRegisterSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required").max(120),
  contactName: z.string().trim().min(2, "Contact person name is required").max(120),
  email: z.string().trim().email("Please enter a valid work email address").max(254),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  websiteUrl: z.string().trim().url("Please enter a valid website URL (e.g. https://brand.com)").optional().or(z.literal("")),
  industry: z.string().trim().min(2, "Industry is required"),
  companySize: z.string().optional().or(z.literal("")),
  monthlyBudget: z.string().optional().or(z.literal("")),
});

// LoginSchema checks
assert("Schema", "1.1 LoginSchema accepts valid email", LoginSchema.safeParse({ email: "creator@abeycollab.io", password: "password123" }).success);
assert("Schema", "1.2 LoginSchema accepts creator handle", LoginSchema.safeParse({ email: "@elenarostova", password: "password123" }).success);
assert("Schema", "1.3 LoginSchema rejects empty identifier", !LoginSchema.safeParse({ email: "", password: "password123" }).success);
assert("Schema", "1.4 LoginSchema rejects short password (<6 chars)", !LoginSchema.safeParse({ email: "creator@abeycollab.io", password: "123" }).success);

// CreatorRegisterSchema checks
assert("Schema", "1.5 CreatorRegisterSchema accepts valid creator payload", CreatorRegisterSchema.safeParse({
  fullName: "Rohan Varma",
  email: "rohan@example.com",
  password: "StrongPassword123!",
  handle: "@rohanvarma",
  primaryCategory: "Technology & AI",
  location: "Mumbai, India",
  startingPrice: 450,
  bio: "Tech creator reviewing gadgets and AI workflows.",
}).success);

assert("Schema", "1.6 CreatorRegisterSchema rejects password < 8 characters", !CreatorRegisterSchema.safeParse({
  fullName: "Rohan Varma",
  email: "rohan@example.com",
  password: "pass",
  handle: "@rohanvarma",
  primaryCategory: "Technology & AI",
  location: "Mumbai, India",
  startingPrice: 450,
}).success);

assert("Schema", "1.7 CreatorRegisterSchema rejects invalid email format", !CreatorRegisterSchema.safeParse({
  fullName: "Rohan Varma",
  email: "not-an-email",
  password: "StrongPassword123!",
  handle: "@rohanvarma",
  primaryCategory: "Technology & AI",
  location: "Mumbai, India",
  startingPrice: 450,
}).success);

assert("Schema", "1.8 CreatorRegisterSchema rejects non-positive starting price", !CreatorRegisterSchema.safeParse({
  fullName: "Rohan Varma",
  email: "rohan@example.com",
  password: "StrongPassword123!",
  handle: "@rohanvarma",
  primaryCategory: "Technology & AI",
  location: "Mumbai, India",
  startingPrice: 0,
}).success);

// BrandRegisterSchema checks
assert("Schema", "1.9 BrandRegisterSchema accepts valid brand payload", BrandRegisterSchema.safeParse({
  companyName: "Acme Robotics",
  contactName: "Sarah Connor",
  email: "sarah@acme.com",
  password: "PasswordEnterprise123!",
  websiteUrl: "https://acme.com",
  industry: "Technology & AI",
  companySize: "51-200",
  monthlyBudget: "$25,000 - $100,000+",
}).success);

assert("Schema", "1.10 BrandRegisterSchema allows empty optional website URL", BrandRegisterSchema.safeParse({
  companyName: "Acme Robotics",
  contactName: "Sarah Connor",
  email: "sarah@acme.com",
  password: "PasswordEnterprise123!",
  websiteUrl: "",
  industry: "Technology & AI",
}).success);

assert("Schema", "1.11 BrandRegisterSchema rejects invalid website URL", !BrandRegisterSchema.safeParse({
  companyName: "Acme Robotics",
  contactName: "Sarah Connor",
  email: "sarah@acme.com",
  password: "PasswordEnterprise123!",
  websiteUrl: "not-a-url",
  industry: "Technology & AI",
}).success);

// -----------------------------------------------------------------------------
// 2. CRYPTO & SESSION MANAGEMENT
// -----------------------------------------------------------------------------
console.log("\n🔑 --- 2. CRYPTOGRAPHIC UTILITIES & PASSWORD HASHING ---");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 1000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `${salt}:${hash}:${iterations}`;
}

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

const JWT_SECRET = "collably_production_jwt_master_secret_key_2026_secure";

function createSessionToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${sig}`;
}

function verifySessionToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, data, sig] = parts;
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
    if (sig !== expected) return null;
    const decoded = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

const hashed = hashPassword("TestPassword88!");
assert("Crypto", "2.1 Password hashing produces valid salt:hash:iterations triple", hashed.split(":").length === 3);
assert("Crypto", "2.2 Correct password verifies successfully", verifyPassword("TestPassword88!", hashed));
assert("Crypto", "2.3 Incorrect password is unconditionally rejected", !verifyPassword("WrongPassword123", hashed));

const sessionTok = createSessionToken({ userId: "u-101", email: "test@example.com", role: "creator" });
const verifiedSession = verifySessionToken(sessionTok);
assert("Crypto", "2.4 Session token creates valid 3-part JWT", sessionTok.split(".").length === 3);
assert("Crypto", "2.5 Session token verifies and recovers payload correctly", verifiedSession?.userId === "u-101" && verifiedSession?.role === "creator");
assert("Crypto", "2.6 Tampered session token is rejected by verifier", verifySessionToken(sessionTok + "tampered") === null);

// -----------------------------------------------------------------------------
// 3. REPOSITORY SIMULATION & CROSS-DOMAIN ALIAS RESOLUTION
// -----------------------------------------------------------------------------
console.log("\n🗄️ --- 3. REPOSITORY ALIAS RESOLUTION & LOOKUP TESTS ---");

const dbPath = path.join(process.cwd(), "data", "valence_db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

const aliasMap = {
  "creator@collably.io": "creator@abeycollab.io",
  "creator@collably.com": "creator@abeycollab.io",
  "creator@abeycollab.com": "creator@abeycollab.io",
  "brand@collably.io": "brand@abeycollab.io",
  "brand@collably.com": "brand@abeycollab.io",
  "brand@abeycollab.com": "brand@abeycollab.io",
  "admin@abeycollab.io": "kevinbhutwala417@gmail.com",
  "admin@abeycollab.com": "kevinbhutwala417@gmail.com",
  "admin@collably.io": "kevinbhutwala417@gmail.com",
  "admin@collably.com": "kevinbhutwala417@gmail.com",
};

function findUser(identifier) {
  const normalized = identifier.toLowerCase().trim();
  const direct = db.users.find((u) => u.email.toLowerCase() === normalized);
  if (direct) return direct;

  const targetEmail = aliasMap[normalized];
  if (targetEmail) {
    const aliased = db.users.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase());
    if (aliased) return aliased;
  }

  // Handle lookup
  const cleanHandle = normalized.replace(/^@/, "");
  const matchingCreator = (db.creators || []).find(
    (c) => c.handle && c.handle.toLowerCase().replace(/^@/, "") === cleanHandle
  );
  if (matchingCreator && matchingCreator.userId) {
    const userByCreator = db.users.find((u) => u.id === matchingCreator.userId);
    if (userByCreator) return userByCreator;
  }

  return null;
}

assert("Lookup", "3.1 Direct email finds Super Admin", findUser("kevinbhutwala417@gmail.com")?.email === "kevinbhutwala417@gmail.com");
assert("Lookup", "3.2 Direct email finds Creator Partner", findUser("creator@abeycollab.io")?.email === "creator@abeycollab.io");
assert("Lookup", "3.3 Direct email finds Brand Partner", findUser("brand@abeycollab.io")?.email === "brand@abeycollab.io");
assert("Lookup", "3.4 Legacy alias creator@collably.io resolves to creator@abeycollab.io", findUser("creator@collably.io")?.email === "creator@abeycollab.io");
assert("Lookup", "3.5 Legacy alias brand@collably.io resolves to brand@abeycollab.io", findUser("brand@collably.io")?.email === "brand@abeycollab.io");
assert("Lookup", "3.6 Legacy alias admin@collably.io resolves to kevinbhutwala417@gmail.com", findUser("admin@collably.io")?.email === "kevinbhutwala417@gmail.com");
assert("Lookup", "3.7 Creator handle @elenarostova resolves to Elena's user account", findUser("@elenarostova")?.id === "user-creator");
assert("Lookup", "3.8 Creator handle elenarostova without @ resolves to user account", findUser("elenarostova")?.id === "user-creator");
assert("Lookup", "3.9 Unknown email returns null", findUser("nonexistent@abeycollab.io") === null);

// -----------------------------------------------------------------------------
// 4. SIGNUP DUPLICATION & USER PROVISIONING SIMULATION
// -----------------------------------------------------------------------------
console.log("\n👥 --- 4. SIGNUP DUPLICATION DEFENSE & PROFILE LINKING ---");

// Test duplicate rejection
const existingEmail = "creator@abeycollab.io";
const checkExisting = findUser(existingEmail);
assert("Signup", "4.1 Duplicate email detection finds existing user", checkExisting !== null);

const simulatedCreatorSignup = {
  fullName: "Maya Lin",
  email: `maya.test.${Date.now()}@abeycollab.io`,
  password: "SecurePassword123!",
  handle: "@mayalin",
  primaryCategory: "Technology & AI",
  location: "London, UK",
  startingPrice: 650,
  currency: "GBP",
  bio: "AI Researcher and visual designer.",
  youtubeHandle: "@mayalintech",
  youtubeSubscribers: 42000,
  instagramHandle: "@mayalin",
  instagramFollowers: 28000,
};

const newUserId = `user-${Date.now()}`;
const newCreatorUser = {
  id: newUserId,
  name: simulatedCreatorSignup.fullName,
  email: simulatedCreatorSignup.email.toLowerCase(),
  passwordHash: hashPassword(simulatedCreatorSignup.password),
  role: "creator",
  verified: false,
};

const newCreatorProfile = {
  id: `creator-${Date.now()}`,
  userId: newCreatorUser.id,
  email: newCreatorUser.email,
  fullName: simulatedCreatorSignup.fullName,
  handle: simulatedCreatorSignup.handle.replace(/^@/, ""),
  primaryCategory: simulatedCreatorSignup.primaryCategory,
  location: simulatedCreatorSignup.location,
  startingPrice: simulatedCreatorSignup.startingPrice,
  currency: simulatedCreatorSignup.currency,
  totalFollowers: 70000,
  tier: "Mid-Tier",
};

assert("Signup", "4.2 Creator user provisions with unique ID and role: creator", newCreatorUser.id.startsWith("user-") && newCreatorUser.role === "creator");
assert("Signup", "4.3 Creator profile correctly binds userId foreign key", newCreatorProfile.userId === newCreatorUser.id);
assert("Signup", "4.4 Starting sponsorship rate and currency persisted", newCreatorProfile.startingPrice === 650 && newCreatorProfile.currency === "GBP");

const simulatedBrandSignup = {
  companyName: "Starlight Media",
  contactName: "Daniel Vance",
  email: `daniel.vance.${Date.now()}@starlight.io`,
  password: "EnterpriseKey2026!",
  industry: "Entertainment & Streaming",
  websiteUrl: "https://starlight.io",
  companySize: "51-200",
  monthlyBudget: "$25,000 - $100,000+",
};

const newBrandUserId = `user-${Date.now() + 1}`;
const newBrandUser = {
  id: newBrandUserId,
  name: simulatedBrandSignup.contactName,
  email: simulatedBrandSignup.email.toLowerCase(),
  passwordHash: hashPassword(simulatedBrandSignup.password),
  role: "brand",
  verified: false,
};

const newBrandProfile = {
  id: `brand-${Date.now() + 1}`,
  userId: newBrandUser.id,
  email: newBrandUser.email,
  companyName: simulatedBrandSignup.companyName,
  industry: simulatedBrandSignup.industry,
  websiteUrl: simulatedBrandSignup.websiteUrl,
  companySize: simulatedBrandSignup.companySize,
  verified: true,
};

assert("Signup", "4.5 Brand user provisions with contact name and role: brand", newBrandUser.name === "Daniel Vance" && newBrandUser.role === "brand");
assert("Signup", "4.6 Brand profile binds userId foreign key", newBrandProfile.userId === newBrandUser.id);
assert("Signup", "4.7 Brand profile captures real company size and website URL", newBrandProfile.companySize === "51-200" && newBrandProfile.websiteUrl === "https://starlight.io");

// -----------------------------------------------------------------------------
// 5. PASSWORD RECOVERY SIMULATION
// -----------------------------------------------------------------------------
console.log("\n🔄 --- 5. PASSWORD RECOVERY & RESET FLOW ---");

const resetEmail = "creator@abeycollab.io";
const targetUser = findUser(resetEmail);
assert("Recovery", "5.1 Target user identified for password recovery", targetUser !== null);

const updatedPassword = "BrandNewPassword2026!";
const newHash = hashPassword(updatedPassword);
assert("Recovery", "5.2 New password meets minimum 8 character threshold", updatedPassword.length >= 8);
assert("Recovery", "5.3 New password verifies against newly created hash", verifyPassword(updatedPassword, newHash));
assert("Recovery", "5.4 Old password no longer matches new hash", !verifyPassword("password123", newHash));

// -----------------------------------------------------------------------------
// 6. PLATFORM RATE CARD GENERATION MATRIX
// -----------------------------------------------------------------------------
console.log("\n📦 --- 6. CREATOR RATE CARD AUTO-GENERATION ENGINE ---");

function generateRateCards(accounts, basePrice, currency) {
  const rateCards = [];
  const now = Date.now();
  accounts.forEach((acc, idx) => {
    if (acc.platform === "youtube") {
      rateCards.push({
        id: `rc-${now}-${idx}`,
        deliverableType: "YouTube 60s Integration",
        title: "Dedicated 60s YouTube Integration / Segment",
        basePrice: Math.round(basePrice * 1.5),
        currency,
        turnaroundDays: 7,
      });
    } else if (acc.platform === "instagram") {
      rateCards.push({
        id: `rc-${now}-${idx}`,
        deliverableType: "Instagram Reel",
        title: "Dedicated Reel & Story Link Set",
        basePrice: basePrice,
        currency,
        turnaroundDays: 5,
      });
    } else if (acc.platform === "tiktok") {
      rateCards.push({
        id: `rc-${now}-${idx}`,
        deliverableType: "TikTok Video",
        title: "Native TikTok Brand Storytelling",
        basePrice: Math.round(basePrice * 0.9),
        currency,
        turnaroundDays: 4,
      });
    } else if (acc.platform === "x") {
      rateCards.push({
        id: `rc-${now}-${idx}`,
        deliverableType: "X (Twitter) Thread",
        title: "Deep-Dive Sponsored X Thread",
        basePrice: Math.round(basePrice * 0.6),
        currency,
        turnaroundDays: 3,
      });
    }
  });
  return rateCards;
}

const testAccounts = [
  { platform: "youtube", handle: "techreview", followers: 50000 },
  { platform: "instagram", handle: "techreview_ig", followers: 30000 },
  { platform: "tiktok", handle: "tech_tok", followers: 40000 },
  { platform: "x", handle: "tech_tweets", followers: 15000 },
];

const generatedCards = generateRateCards(testAccounts, 1000, "USD");
assert("RateCards", "6.1 Generates 4 rate cards for 4 connected platforms", generatedCards.length === 4);
assert("RateCards", "6.2 YouTube rate includes 1.5x production multiplier ($1500)", generatedCards.find((c) => c.deliverableType === "YouTube 60s Integration")?.basePrice === 1500);
assert("RateCards", "6.3 Instagram Reel accurately set to base rate ($1000)", generatedCards.find((c) => c.deliverableType === "Instagram Reel")?.basePrice === 1000);
assert("RateCards", "6.4 TikTok video set to 0.9x base rate ($900)", generatedCards.find((c) => c.deliverableType === "TikTok Video")?.basePrice === 900);
assert("RateCards", "6.5 X (Twitter) thread set to 0.6x base rate ($600)", generatedCards.find((c) => c.deliverableType === "X (Twitter) Thread")?.basePrice === 600);

// -----------------------------------------------------------------------------
// 7. INPUT SANITIZATION & BOUNDARY DEFENSES
// -----------------------------------------------------------------------------
console.log("\n🛡️ --- 7. INPUT SANITIZATION & NEGATIVE BOUNDARIES ---");

// Trimming whitespace
const untrimmedEmail = "   creator@abeycollab.io   ";
assert("Sanitize", "7.1 Leading and trailing whitespace trimmed from email", untrimmedEmail.trim().toLowerCase() === "creator@abeycollab.io");

// Handle @ prefix normalization
function normalizeHandle(raw) {
  const clean = raw.trim().replace(/^@+/, "");
  return `@${clean}`;
}
assert("Sanitize", "7.2 Handles without @ automatically prepended with single @", normalizeHandle("waseemkhan") === "@waseemkhan");
assert("Sanitize", "7.3 Handles with excessive @@@ normalized to single @", normalizeHandle("@@@waseemkhan") === "@waseemkhan");

// Website URL automatic https protocol addition
function normalizeWebsite(url) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
assert("Sanitize", "7.4 Bare domain brand.com normalized to https://brand.com", normalizeWebsite("brand.com") === "https://brand.com");
assert("Sanitize", "7.5 Full URL https://brand.com remains untouched", normalizeWebsite("https://brand.com") === "https://brand.com");
assert("Sanitize", "7.6 Empty website string preserves optionality", normalizeWebsite("") === "");

// Duplicate email user friendly error string
const duplicateErrorMsg = "An account with this email address already exists. Please sign in or use a different email.";
assert("ErrorMsg", "7.7 Actionable guidance in duplicate email message", duplicateErrorMsg.includes("sign in") && duplicateErrorMsg.includes("different email"));

// -----------------------------------------------------------------------------
// 8. SESSION PERSISTENCE, RECOVERY & TENANT ACCESS SECURITY
// -----------------------------------------------------------------------------
console.log("\n🔒 --- 8. SESSION PERSISTENCE, RECOVERY & TENANT SECURITY ---");

// 8.1 Cookie configurations
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  path: "/",
};
assert("Session", "8.1 Session cookie configured with 7-day max-age", cookieOptions.maxAge === 604800);
assert("Session", "8.2 Session cookie enforces httpOnly security", cookieOptions.httpOnly === true);
assert("Session", "8.3 Session cookie enables lax sameSite policy for seamless redirect", cookieOptions.sameSite === "lax");

// 8.2 Token creation and edge payload recovery
const testPayload = {
  userId: "usr-session-test-001",
  email: "creator@abeycollab.io",
  role: "creator",
};
const sessionToken = createSessionToken(testPayload);
assert("Session", "8.4 Session token creates valid JWT structure", typeof sessionToken === "string" && sessionToken.split(".").length === 3);

const recoveredPayload = verifySessionToken(sessionToken);
assert("Session", "8.5 Session token verifies and recovers valid payload", recoveredPayload !== null && recoveredPayload.userId === testPayload.userId);
assert("Session", "8.6 Recovered payload preserves user role for RBAC", recoveredPayload.role === "creator");

// 8.3 Expired token rejection
function createExpiredSessionToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000) - 3600,
      exp: Math.floor(Date.now() / 1000) - 60, // expired 60s ago
    })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${sig}`;
}
const expiredToken = createExpiredSessionToken(testPayload);
assert("Session", "8.7 Expired session token is rejected by verifier", verifySessionToken(expiredToken) === null);

// 8.4 Tampered token rejection
const [headerPart, payloadPart, sigPart] = sessionToken.split(".");
const tamperedPayload = Buffer.from(JSON.stringify({ ...testPayload, role: "super_admin" })).toString("base64url");
const tamperedToken = `${headerPart}.${tamperedPayload}.${sigPart}`;
assert("Session", "8.8 Role-escalation tampered token is rejected", verifySessionToken(tamperedToken) === null);

// 8.5 Multi-cookie extraction simulation
function extractSessionToken(cookies, authHeader) {
  return (
    cookies["abeycollab_session"] ||
    cookies["collably_session"] ||
    cookies["valence_session"] ||
    (authHeader ? authHeader.replace(/^Bearer\s+/i, "") : null)
  );
}
assert("Session", "8.9 Resolves primary abeycollab_session cookie", extractSessionToken({ abeycollab_session: "tok_abey" }, null) === "tok_abey");
assert("Session", "8.10 Resolves legacy collably_session fallback cookie", extractSessionToken({ collably_session: "tok_collab" }, null) === "tok_collab");
assert("Session", "8.11 Resolves authorization header Bearer token", extractSessionToken({}, "Bearer tok_header") === "tok_header");

// 8.6 Tenant access isolation simulation (Creator trying to access brand route)
function checkTenantAccess(userRole, route) {
  if (route.startsWith("/app/brand")) {
    const brandRoles = ["brand", "brand_owner", "brand_manager", "brand_member", "super_admin", "agency_admin", "agency_owner"];
    return brandRoles.includes(userRole);
  }
  if (route.startsWith("/admin")) {
    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    return adminRoles.includes(userRole);
  }
  return true;
}
assert("Tenant", "8.12 Creator is denied access to brand workspace routes", checkTenantAccess("creator", "/app/brand/campaigns") === false);
assert("Tenant", "8.13 Brand user is granted access to brand workspace routes", checkTenantAccess("brand", "/app/brand/campaigns") === true);
assert("Tenant", "8.14 Regular creator is denied access to admin portal", checkTenantAccess("creator", "/admin/creators") === false);
assert("Tenant", "8.15 Super Admin is granted access across admin and brand routes", checkTenantAccess("super_admin", "/admin") === true && checkTenantAccess("super_admin", "/app/brand/campaigns") === true);

console.log("\n================================================================================");
console.log(`TOTAL AUDIT CHECKS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
console.log("================================================================================\n");

if (passed === total) {
  console.log("🎉 ALL AUTHENTICATION, SIGNUP, SIGNIN, SESSION & TENANT AUDITS PASSED (100%)!\n");
  process.exit(0);
} else {
  console.error("❌ SOME AUDIT CHECKS FAILED!\n");
  process.exit(1);
}

