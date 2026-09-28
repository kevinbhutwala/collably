const BASE_URL = "http://localhost:3000";

console.log("================================================================================");
console.log("🔒 ABEYCOLLAB COMPLETE FORGOT & RESET PASSWORD FLOW VERIFICATION");
console.log("================================================================================");

let total = 0;
let passed = 0;

function assert(moduleName, testName, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${moduleName}] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${moduleName}] ${testName} ${details ? `(${details})` : ""}`);
  }
}

async function run() {
  const ts = Date.now();
  const creatorEmail = `creator.flow.${ts}@abeycollab.test`;
  const brandEmail = `brand.flow.${ts}@abeycollab.test`;
  const adminEmail = `admin@abeycollab.io`; // canonical admin

  const initialPassword = "InitialPassword123!";
  const newPassword = "NewSecretPassword2026!";
  const adminInitialPassword = "admin123";

  console.log("\n👤 --- 1. SETUP ACCOUNTS & VERIFY INITIAL CREDENTIALS ---");

  // Register Creator
  const resRegCreator = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "E2E Creator",
      email: creatorEmail,
      password: initialPassword,
      role: "creator",
      handle: `e2ecreator${ts}`,
    }),
  });
  const dataRegCreator = await resRegCreator.json();
  assert("Setup", "1.1 Creator registered", resRegCreator.ok && Boolean(dataRegCreator.user?.id));

  // Register Brand
  const resRegBrand = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "E2E Brand",
      email: brandEmail,
      password: initialPassword,
      role: "brand",
      companyName: "E2E Brand Corp",
    }),
  });
  const dataRegBrand = await resRegBrand.json();
  assert("Setup", "1.2 Brand registered", resRegBrand.ok && Boolean(dataRegBrand.user?.id));

  // Initial logins verify
  const resLogCr1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: creatorEmail, password: initialPassword }),
  });
  assert("Auth", "1.3 Creator initial login works", resLogCr1.status === 200);

  const resLogBr1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: brandEmail, password: initialPassword }),
  });
  assert("Auth", "1.4 Brand initial login works", resLogBr1.status === 200);

  const resLogAd1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminInitialPassword }),
  });
  assert("Auth", "1.5 Admin initial login works", resLogAd1.status === 200);

  console.log("\n🛡️ --- 2. FORGOT PASSWORD API & ANTI-ENUMERATION ---");
  const resForgotUnknown = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "phantom.unknown.user@abeycollab.test" }),
  });
  const dataForgotUnknown = await resForgotUnknown.json();
  assert("AntiEnum", "2.1 Non-existent user returns generic 200", resForgotUnknown.status === 200 && dataForgotUnknown.message.includes("If an account exists"));
  assert("AntiEnum", "2.2 Non-existent user does NOT receive reset token", !dataForgotUnknown._debugResetToken);

  const resForgotCreator = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: creatorEmail }),
  });
  const dataForgotCreator = await resForgotCreator.json();
  assert("AntiEnum", "2.3 Registered creator returns exact same generic 200", resForgotCreator.status === 200 && dataForgotCreator.message.includes("If an account exists"));
  const creatorRawToken = dataForgotCreator._debugResetToken;
  assert("Token", "2.4 Creator received valid 64-char hex reset token", Boolean(creatorRawToken && creatorRawToken.length === 64));

  console.log("\n🔍 --- 3. TOKEN VALIDATION EDGE CASES (GET /api/auth/reset-password) ---");
  // 3.1 Legitimate token
  const resValGood = await fetch(`${BASE_URL}/api/auth/reset-password?token=${creatorRawToken}`);
  const dataValGood = await resValGood.json();
  assert("TokenValidation", "3.1 Valid token returns valid: true", resValGood.status === 200 && dataValGood.valid === true);

  // 3.2 Tampered token
  const tamperedRaw = creatorRawToken.slice(0, -4) + "ffff";
  const resValTamp = await fetch(`${BASE_URL}/api/auth/reset-password?token=${tamperedRaw}`);
  const dataValTamp = await resValTamp.json();
  assert("TokenValidation", "3.2 Tampered token returns 400 invalid_token", resValTamp.status === 400 && dataValTamp.reason === "invalid_token");

  // 3.3 Missing token
  const resValMissing = await fetch(`${BASE_URL}/api/auth/reset-password?token=`);
  assert("TokenValidation", "3.3 Missing token returns 400", resValMissing.status === 400);

  console.log("\n🔐 --- 4. PASSWORD VALIDATION & SAME-PASSWORD REJECTION ---");
  // 4.1 Passwords do not match
  const resMismatch = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: creatorRawToken,
      password: "GoodPassword123!",
      confirmPassword: "MismatchPassword123!",
    }),
  });
  assert("PasswordValidation", "4.1 Rejects password mismatch with 400", resMismatch.status === 400);

  // 4.2 Too short (< 8 chars)
  const resShort = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: creatorRawToken,
      password: "short",
      confirmPassword: "short",
    }),
  });
  assert("PasswordValidation", "4.2 Rejects password < 8 characters with 400", resShort.status === 400);

  // 4.3 Same as old password
  const resSame = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: creatorRawToken,
      password: initialPassword,
      confirmPassword: initialPassword,
    }),
  });
  const dataSame = await resSame.json();
  assert("PasswordValidation", "4.3 Prevents reusing same existing password", resSame.status === 400 && dataSame.error.includes("cannot be the same"));

  console.log("\n🚀 --- 5. END-TO-END SUCCESSFUL PASSWORD RESET (CREATOR) ---");
  const resResetCr = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: creatorRawToken,
      password: newPassword,
      confirmPassword: newPassword,
    }),
  });
  const dataResetCr = await resResetCr.json();
  assert("Reset-Creator", "5.1 Password updated successfully", resResetCr.status === 200 && dataResetCr.success === true);

  // Replay attack: try using the exact same token again
  const resReplay = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: creatorRawToken,
      password: "AnotherNewPassword999!",
      confirmPassword: "AnotherNewPassword999!",
    }),
  });
  const dataReplay = await resReplay.json();
  assert("Reset-Creator", "5.2 Replay attack blocked (already used)", resReplay.status === 400 && dataReplay.error.includes("already been used"));

  // Check GET returns already_used
  const resValConsumed = await fetch(`${BASE_URL}/api/auth/reset-password?token=${creatorRawToken}`);
  const dataValConsumed = await resValConsumed.json();
  assert("Reset-Creator", "5.3 Pre-validation returns already_used", resValConsumed.status === 400 && dataValConsumed.reason === "already_used");

  // Login with OLD password must fail
  const resOldLoginCr = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: creatorEmail, password: initialPassword }),
  });
  assert("Reset-Creator", "5.4 Old password NO LONGER WORKS (401)", resOldLoginCr.status === 401);

  // Login with NEW password must succeed
  const resNewLoginCr = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: creatorEmail, password: newPassword }),
  });
  const dataNewLoginCr = await resNewLoginCr.json();
  assert("Reset-Creator", "5.5 New password logs in successfully", resNewLoginCr.status === 200 && Boolean(dataNewLoginCr.user?.id));

  console.log("\n🚀 --- 6. END-TO-END PASSWORD RESET FOR BRAND ---");
  const resForgotBrand = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: brandEmail }),
  });
  const dataForgotBrand = await resForgotBrand.json();
  const brandRawToken = dataForgotBrand._debugResetToken;
  assert("Reset-Brand", "6.1 Brand reset token generated", Boolean(brandRawToken));

  const resResetBr = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: brandRawToken,
      password: newPassword,
      confirmPassword: newPassword,
    }),
  });
  assert("Reset-Brand", "6.2 Brand password reset succeeds", resResetBr.status === 200);

  const resOldLoginBr = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: brandEmail, password: initialPassword }),
  });
  assert("Reset-Brand", "6.3 Brand old password NO LONGER WORKS (401)", resOldLoginBr.status === 401);

  const resNewLoginBr = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: brandEmail, password: newPassword }),
  });
  assert("Reset-Brand", "6.4 Brand new password logs in successfully", resNewLoginBr.status === 200);

  console.log("\n🚀 --- 7. END-TO-END PASSWORD RESET FOR ADMIN ---");
  const resForgotAdmin = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail }),
  });
  const dataForgotAdmin = await resForgotAdmin.json();
  const adminRawToken = dataForgotAdmin._debugResetToken;
  assert("Reset-Admin", "7.1 Admin reset token generated", Boolean(adminRawToken));

  const resResetAd = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: adminRawToken,
      password: newPassword,
      confirmPassword: newPassword,
    }),
  });
  assert("Reset-Admin", "7.2 Admin password reset succeeds", resResetAd.status === 200);

  const resOldLoginAd = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminInitialPassword }),
  });
  assert("Reset-Admin", "7.3 Admin old password NO LONGER WORKS (401)", resOldLoginAd.status === 401);

  const resNewLoginAd = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: newPassword }),
  });
  assert("Reset-Admin", "7.4 Admin new password logs in successfully", resNewLoginAd.status === 200);

  console.log("\n🔄 --- 8. MULTIPLE RESET LINK REQUESTS (OLD LINK INVALIDATION) ---");
  const multiEmail = `multi.${ts}@abeycollab.test`;
  await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Multi Test",
      email: multiEmail,
      password: initialPassword,
      role: "creator",
    }),
  });

  // Request 1
  const resM1 = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: multiEmail }),
  });
  const dataM1 = await resM1.json();
  const token1 = dataM1._debugResetToken;

  // Request 2 (should revoke token 1)
  const resM2 = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: multiEmail }),
  });
  const dataM2 = await resM2.json();
  const token2 = dataM2._debugResetToken;

  // token 1 should now be revoked (already_used / invalid)
  const resCheckT1 = await fetch(`${BASE_URL}/api/auth/reset-password?token=${token1}`);
  assert("MultiRequest", "8.1 Older reset link is invalidated", resCheckT1.status === 400);

  // token 2 should be valid
  const resCheckT2 = await fetch(`${BASE_URL}/api/auth/reset-password?token=${token2}`);
  const dataCheckT2 = await resCheckT2.json();
  assert("MultiRequest", "8.2 Newer reset link is valid", resCheckT2.status === 200 && dataCheckT2.valid === true);

  console.log("\n================================================================================");
  console.log(`🏁 FULL SYSTEM INTEGRATION VERIFICATION: ${passed}/${total} assertions passed (${Math.round((passed / total) * 100)}%)`);
  console.log("================================================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
