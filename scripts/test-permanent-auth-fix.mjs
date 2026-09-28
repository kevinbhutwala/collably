import { createClient } from "@supabase/supabase-js";

const BASE_URL = "http://localhost:3000";

const supabaseUrl = "https://ldahukqddddeyaavhvss.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYWh1a3FkZGRkZXlhYXZodnNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODE5MTI0NSwiZXhwIjoyMTAzNzY3MjQ1fQ.p0MhqWSRzUuSMzX01A-qmi0J4ExiDkcQs1HGQo75r2s";
const supabase = createClient(supabaseUrl, serviceKey);

console.log("================================================================================");
console.log("🔒 VERIFYING PERMANENT CLOUD AUTH & PERSISTENCE FIX");
console.log("================================================================================");

let total = 0;
let passed = 0;

function assert(group, testName, condition, details = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${group}] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${group}] ${testName} ${details ? `(${details})` : ""}`);
  }
}

async function run() {
  const ts = Date.now();
  const testEmail = `permanent.user.${ts}@abeycollab.test`;
  const initialPassword = "StrongInitialPass123!";
  const newPassword = "StrongUpdatedPass456!";

  console.log("\n1️⃣ --- REGISTER USER VIA /api/auth/register ---");
  const resReg = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Permanent Test User",
      email: testEmail,
      password: initialPassword,
      role: "creator",
      handle: `permuser${ts}`,
    }),
  });
  const dataReg = await resReg.json();
  assert("Registration", "1.1 Registration API returns 200 OK", resReg.status === 200);
  assert("Registration", "1.2 User object returned with ID", Boolean(dataReg.user?.id));

  console.log("\n2️⃣ --- VERIFY USER IS PERMANENTLY IN SUPABASE AUTH & PROFILES ---");
  // Check Supabase Auth
  const { data: supaUsers } = await supabase.auth.admin.listUsers();
  const foundInAuth = supaUsers?.users.find((u) => u.email?.toLowerCase() === testEmail.toLowerCase());
  assert("SupabaseAuth", "2.1 User exists in cloud Supabase Auth (auth.users)", Boolean(foundInAuth));
  assert("SupabaseAuth", "2.2 Email is automatically confirmed in cloud", foundInAuth?.email_confirmed_at !== null);

  // Check Supabase profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", testEmail.toLowerCase())
    .maybeSingle();
  assert("SupabaseProfile", "2.3 Profile row exists in Supabase profiles table", Boolean(profile));
  assert("SupabaseProfile", "2.4 Profile role correctly set in Supabase", profile?.role === "creator");

  console.log("\n3️⃣ --- SIMULATE SESSION END & SIGN IN AGAIN ---");
  // Sign in with correct password
  const resLogin1 = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: initialPassword }),
  });
  const dataLogin1 = await resLogin1.json();
  assert("Login", "3.1 Signs in successfully with email and password", resLogin1.status === 200);
  assert("Login", "3.2 Session token issued", Boolean(dataLogin1.token));
  assert("Login", "3.3 Profile data hydrated from Supabase", dataLogin1.user?.email === testEmail);

  // Sign in with WRONG password
  const resLoginWrong = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: "IncorrectPassword999!" }),
  });
  assert("Login", "3.4 Rejects incorrect password with 401", resLoginWrong.status === 401);

  console.log("\n4️⃣ --- FORGOT PASSWORD & PASSWORD RESET CLOUD SYNC ---");
  // Request reset token
  const resForgot = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail }),
  });
  const dataForgot = await resForgot.json();
  assert("ForgotPassword", "4.1 Forgot password returns 200 generic message", resForgot.status === 200);
  const resetToken = dataForgot._debugResetToken;
  assert("ForgotPassword", "4.2 Reset token generated for user", Boolean(resetToken));

  // Reset password
  const resReset = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: resetToken,
      password: newPassword,
      confirmPassword: newPassword,
    }),
  });
  const dataReset = await resReset.json();
  assert("ResetPassword", "4.3 Password reset returns 200 OK", resReset.status === 200 && dataReset.success === true);

  console.log("\n5️⃣ --- VERIFY CREDENTIALS AFTER PASSWORD RESET ---");
  // Old password should fail
  const resOldPass = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: initialPassword }),
  });
  assert("PostReset", "5.1 Old password fails to log in (401)", resOldPass.status === 401);

  // New password should succeed
  const resNewPass = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: newPassword }),
  });
  const dataNewPass = await resNewPass.json();
  assert("PostReset", "5.2 New password signs in successfully (200)", resNewPass.status === 200 && Boolean(dataNewPass.token));

  // Verify Supabase Auth directly accepts the new password
  const { data: supaDirectSignIn, error: supaDirectErr } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: newPassword,
  });
  assert("PostReset", "5.3 Cloud Supabase Auth directly accepts the new password", Boolean(supaDirectSignIn?.user) && !supaDirectErr);

  console.log("\n================================================================================");
  console.log(`🏁 PERMANENT AUTH FIX VERIFICATION: ${passed}/${total} assertions passed (${Math.round((passed / total) * 100)}%)`);
  console.log("================================================================================");

  // Clean up test user in Supabase
  if (foundInAuth) {
    await supabase.auth.admin.deleteUser(foundInAuth.id);
    await supabase.from("profiles").delete().eq("email", testEmail);
  }

  if (passed !== total) {
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
