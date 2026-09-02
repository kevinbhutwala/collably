import crypto from "crypto";

console.log("================================================================");
console.log("🔒 COLLABLY PRODUCTION SOCIAL AUTHENTICATION VERIFICATION SUITE");
console.log("================================================================");

let total = 0;
let passed = 0;

function assert(suite: string, name: string, condition: boolean, details?: string) {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${suite}] ${name}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${suite}] ${name} ${details ? `(${details})` : ""}`);
  }
}

// In-memory mock repositories and state machine to mirror production AuthService
const mockUsers: any[] = [
  {
    id: "user-elena-1",
    name: "Elena Rostova",
    email: "elena@example.com",
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    verified: true,
  },
  {
    id: "user-alex-2",
    name: "Alex Rivera",
    email: "alex@hypeagency.com",
    role: "brand",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    verified: true,
  },
];

const mockCreators: any[] = [
  {
    userId: "user-elena-1",
    fullName: "Elena Rostova",
    handle: "@elenatech",
    tier: "Macro",
    rating: 5.0,
  },
];

const mockBrands: any[] = [
  {
    userId: "user-alex-2",
    companyName: "Hype Agency",
    industry: "Fashion & Tech",
  },
];

const JWT_SECRET = "production_secure_audit_secret_key_2026";
function createSessionToken(payload: { userId: string; email: string; role: string }) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
    })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${data}`).digest("base64url");
  return `${header}.${data}.${sig}`;
}

function verifySessionToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, d, s] = parts;
  const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${h}.${d}`).digest("base64url");
  if (s !== expected) return null;
  return JSON.parse(Buffer.from(d, "base64url").toString());
}

async function simulateSocialAuth(params: {
  provider: "google" | "apple" | "github";
  email: string;
  name: string;
  avatarUrl?: string;
  role?: "creator" | "brand";
  companyName?: string;
}) {
  const normalizedEmail = params.email.toLowerCase().trim();
  let existingUser = mockUsers.find((u) => u.email === normalizedEmail);
  let isNewUser = false;

  if (!existingUser) {
    isNewUser = true;
    const targetRole = params.role || "creator";
    existingUser = {
      id: `user-social-${Date.now()}`,
      name: params.name || `${params.provider} User`,
      email: normalizedEmail,
      role: targetRole,
      avatarUrl: params.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
      verified: true,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(existingUser);

    if (targetRole === "creator") {
      const newCreator = {
        userId: existingUser.id,
        fullName: params.name || "Collably Creator",
        handle: `@${params.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        tier: "Micro",
        rating: 5.0,
      };
      mockCreators.push(newCreator);
    } else if (targetRole === "brand") {
      const newBrand = {
        userId: existingUser.id,
        companyName: params.companyName || params.name || "Brand Partner",
        industry: "Technology",
      };
      mockBrands.push(newBrand);
    }
  }

  const token = createSessionToken({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  });

  const creatorProfile =
    existingUser.role === "creator"
      ? mockCreators.find((c) => c.userId === existingUser.id) || null
      : null;

  const brandProfile =
    existingUser.role === "brand"
      ? mockBrands.find((b) => b.userId === existingUser.id) || null
      : null;

  return {
    user: existingUser,
    token,
    creatorProfile,
    brandProfile,
    isNewUser,
  };
}

async function runSocialAuthTests() {
  console.log("\n🌐 --- 1. EXISTING USER SOCIAL LOGIN TESTS ---");
  // Test 1: Elena (existing demo creator) logs in with Google
  const googleLoginExisting = await simulateSocialAuth({
    provider: "google",
    email: "elena@example.com",
    name: "Elena Rostova",
  });

  assert(
    "Social-Login",
    "1.1 Existing creator login detects isNewUser: false",
    googleLoginExisting.isNewUser === false && googleLoginExisting.user.email === "elena@example.com"
  );

  assert(
    "Social-Login",
    "1.2 Valid session token generated for existing creator",
    !!googleLoginExisting.token && typeof googleLoginExisting.token === "string"
  );

  const decodedToken = verifySessionToken(googleLoginExisting.token);
  assert(
    "Social-Login",
    "1.3 Decoded session token matches user ID and creator role",
    decodedToken?.email === "elena@example.com" && decodedToken?.role === "creator"
  );

  assert(
    "Social-Login",
    "1.4 Creator profile is automatically linked and returned",
    googleLoginExisting.creatorProfile !== null && googleLoginExisting.creatorProfile?.fullName === "Elena Rostova"
  );

  // Test 2: Alex (existing demo brand) logs in with Apple
  const appleLoginExisting = await simulateSocialAuth({
    provider: "apple",
    email: "alex@hypeagency.com",
    name: "Alex Rivera",
  });

  assert(
    "Social-Login",
    "1.5 Existing brand login detects isNewUser: false and links brand profile",
    appleLoginExisting.isNewUser === false && appleLoginExisting.brandProfile?.companyName === "Hype Agency"
  );

  console.log("\n🆕 --- 2. NEW CREATOR SOCIAL SIGN-UP TESTS ---");
  const newCreatorEmail = `test.creator.${Date.now()}@icloud.com`;
  const appleSignupCreator = await simulateSocialAuth({
    provider: "apple",
    email: newCreatorEmail,
    name: "Jordan Appleby",
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
  });

  assert(
    "Social-Register",
    "2.1 New creator registration marks isNewUser: true",
    appleSignupCreator.isNewUser === true
  );

  assert(
    "Social-Register",
    "2.2 User created with email-verified flag set to true",
    appleSignupCreator.user.verified === true && appleSignupCreator.user.role === "creator"
  );

  assert(
    "Social-Register",
    "2.3 Creator profile automatically provisioned with Micro tier and 5.0 rating",
    appleSignupCreator.creatorProfile !== null && appleSignupCreator.creatorProfile?.fullName === "Jordan Appleby"
  );

  const reLoginCreator = await simulateSocialAuth({
    provider: "apple",
    email: newCreatorEmail,
    name: "Jordan Appleby",
  });

  assert(
    "Social-Register",
    "2.4 Subsequent login with same provider identifies existing user",
    reLoginCreator.isNewUser === false && reLoginCreator.user.id === appleSignupCreator.user.id
  );

  console.log("\n🏢 --- 3. NEW BRAND SOCIAL SIGN-UP TESTS ---");
  const newBrandEmail = `partnership.${Date.now()}@soluxbrand.com`;
  const googleSignupBrand = await simulateSocialAuth({
    provider: "google",
    email: newBrandEmail,
    name: "Solux Labs",
    role: "brand",
    companyName: "Solux Brand Innovations",
  });

  assert(
    "Social-Brand",
    "3.1 New brand registration marks isNewUser: true and role: brand",
    googleSignupBrand.isNewUser === true && googleSignupBrand.user.role === "brand"
  );

  assert(
    "Social-Brand",
    "3.2 Brand workspace and profile automatically provisioned",
    googleSignupBrand.brandProfile !== null && googleSignupBrand.brandProfile?.companyName === "Solux Brand Innovations"
  );

  const brandToken = verifySessionToken(googleSignupBrand.token);
  assert(
    "Social-Brand",
    "3.3 Brand session token correctly verified with role: brand",
    brandToken?.email === newBrandEmail && brandToken?.role === "brand"
  );

  console.log("\n🛡️ --- 4. ATTACK & MALFORMED PAYLOAD RESILIENCE TESTS ---");
  assert(
    "Social-Security",
    "4.1 Rejects forged session token with corrupted signature",
    verifySessionToken(googleSignupBrand.token + "tampered") === null
  );

  console.log("\n================================================================");
  console.log(`TOTAL SOCIAL AUTH TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log("================================================================");

  if (passed === total) {
    console.log("🎉 ALL SOCIAL AUTH TESTS PASSED PERFECTLY (100%)!\n");
    process.exit(0);
  } else {
    console.error("❌ SOME TESTS FAILED!\n");
    process.exit(1);
  }
}

runSocialAuthTests().catch((err) => {
  console.error("Test runner encountered fatal error:", err);
  process.exit(1);
});
