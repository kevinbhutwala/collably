/**
 * Live Production Sanity Test Suite
 * Target: https://abeycollab-alpha.vercel.app
 */

const BASE_URL = process.env.LIVE_URL || "https://abeycollab-alpha.vercel.app";

console.log("\n================================================================================");
console.log("🚀 EXECUTING LIVE PRODUCTION SANITY TEST ON VERCEL DEPLOYMENT");
console.log(`📡 Production Target URL: ${BASE_URL}`);
console.log("================================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
    failed++;
  }
}

async function runSanitySuite() {
  // 1. Health & Service Diagnostics
  console.log("🩺 --- 1. LIVE HEALTH & SERVICE TELEMETRY ---");
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, `Health check returned HTTP 200 (Got ${healthRes.status})`);
    assert(healthData.status === "ok", `Platform status is ok (Got "${healthData.status}")`);
    assert(healthData.environment === "production", `Environment is production (Got "${healthData.environment}")`);
    assert(healthData.services?.database?.includes("healthy"), `Database is healthy: ${healthData.services?.database}`);
    assert(healthData.services?.paymentGateway?.includes("Razorpay"), `Payment gateway is active: ${healthData.services?.paymentGateway}`);
    console.log(`    ↳ Response Time: ${healthData.responseTimeMs}ms`);
  } catch (err) {
    assert(false, `Health check failed with error: ${err.message}`);
  }

  // 2. Public Frontend Route Pre-render Check
  console.log("\n🌐 --- 2. PUBLIC FRONTEND ROUTES VERIFICATION ---");
  const routes = [
    { path: "/", name: "Landing Page" },
    { path: "/campaigns", name: "Campaign Discovery" },
    { path: "/creators", name: "Creator Discovery" },
    { path: "/pricing", name: "Pricing & Plans" },
    { path: "/login", name: "Login Portal" },
    { path: "/register", name: "Registration Portal" },
  ];

  for (const r of routes) {
    try {
      const res = await fetch(`${BASE_URL}${r.path}`);
      assert(res.status === 200, `${r.name} (${r.path}) loaded with HTTP 200 OK`);
    } catch (err) {
      assert(false, `${r.name} (${r.path}) failed to load: ${err.message}`);
    }
  }

  // 3. Creator & Campaign Data Discovery APIs
  console.log("\n📦 --- 3. PRODUCTION DATA RETRIEVAL APIS ---");
  try {
    const campaignsRes = await fetch(`${BASE_URL}/api/campaigns`);
    const campaignsData = await campaignsRes.json();
    assert(campaignsRes.status === 200, "Campaigns API returned HTTP 200");
    const campaigns = Array.isArray(campaignsData) ? campaignsData : (campaignsData.campaigns || campaignsData.data || []);
    assert(campaigns.length > 0, `Campaign discovery populated (${campaigns.length} campaigns available)`);
  } catch (err) {
    assert(false, `Campaigns API failed: ${err.message}`);
  }

  try {
    const creatorsRes = await fetch(`${BASE_URL}/api/creators`);
    const creatorsData = await creatorsRes.json();
    assert(creatorsRes.status === 200, "Creators API returned HTTP 200");
    const creators = Array.isArray(creatorsData) ? creatorsData : (creatorsData.creators || creatorsData.data || []);
    assert(creators.length > 0, `Creator discovery populated (${creators.length} verified creators available)`);
  } catch (err) {
    assert(false, `Creators API failed: ${err.message}`);
  }

  // 4. Live Authentication Flow
  console.log("\n🔐 --- 4. LIVE AUTHENTICATION & SESSION ISSUANCE ---");
  let authToken = null;
  let userSession = null;

  const testAccounts = [
    { email: "kevinbhutwala417@gmail.com", password: "admin123", role: "agency_admin" },
    { email: "brand@abeycollab.io", password: "password123", role: "brand" },
    { email: "creator@abeycollab.io", password: "password123", role: "creator" }
  ];

  for (const acc of testAccounts) {
    try {
      const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: acc.email, password: acc.password })
      });
      const loginData = await loginRes.json();
      assert(loginRes.status === 200, `Login for ${acc.role} (${acc.email}) succeeded with HTTP 200`);
      assert(Boolean(loginData.token || loginData.user), `JWT session issued for ${acc.email}`);
      if (!authToken && loginData.token && acc.role === "agency_admin") {
        authToken = loginData.token;
        userSession = loginData.user;
      }
    } catch (err) {
      assert(false, `Login for ${acc.email} failed: ${err.message}`);
    }
  }

  // 5. Protected Endpoint Access with Session
  console.log("\n🛡️ --- 5. PROTECTED SESSION & IDENTITY VERIFICATION ---");
  if (authToken) {
    try {
      const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const meData = await meRes.json();
      assert(meRes.status === 200, "Protected /api/auth/me endpoint accessed with live JWT");
      assert(Boolean(meData.user), `Authenticated user profile resolved (${meData.user?.email})`);
    } catch (err) {
      assert(false, `Protected /api/auth/me failed: ${err.message}`);
    }
  } else {
    assert(false, "Skipping protected API check: No auth token obtained");
  }

  // 6. Live Payment Gateway Order Generation (Live Razorpay)
  console.log("\n💳 --- 6. LIVE PAYMENT GATEWAY INITIALIZATION ---");
  try {
    const orderPayload = {
      brandId: "brand-1",
      amount: 500, // ₹500
      currency: "INR",
      collaborationId: "collab_live_sanity_test",
      notes: { purpose: "Live production sanity order check" }
    };
    const orderRes = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(orderPayload)
    });
    const orderData = await orderRes.json();
    assert(orderRes.status === 200, `Live Order Creation returned HTTP 200 (Got ${orderRes.status})`);
    const paymentObj = orderData.payment || orderData;
    const orderId = paymentObj.orderId || paymentObj.gatewayOrderId || paymentObj.id;
    assert(Boolean(orderId), `Live Razorpay Order ID created on production servers: ${orderId}`);
    assert((paymentObj.amount === 500 || paymentObj.amount === 50000), `Order amount confirmed at ₹500`);
    console.log(`    ↳ Gateway: Razorpay Live | Order: ${orderId} | Status: ${paymentObj.status || "created"}`);
  } catch (err) {
    assert(false, `Live Payment Order Creation failed: ${err.message}`);
  }

  // 7. Subscription Plans Endpoint
  console.log("\n💎 --- 7. SUBSCRIPTIONS & PBAC PLANS ---");
  try {
    const plansRes = await fetch(`${BASE_URL}/api/subscriptions/plans`);
    const plansData = await plansRes.json();
    assert(plansRes.status === 200, "Subscriptions Plans API returned HTTP 200");
    const allPlans = plansData.allPlans || plansData.plans || plansData;
    const planCount = Object.keys(allPlans).length;
    assert(planCount >= 6, `All 6 Creator & Brand subscription plans available (${planCount} plans)`);
  } catch (err) {
    assert(false, `Subscriptions Plans API failed: ${err.message}`);
  }

  // Summary
  console.log("\n================================================================================");
  console.log(`📊 LIVE PRODUCTION SANITY SUMMARY: ${passed}/${passed + failed} CHECKS PASSED (${((passed / (passed + failed)) * 100).toFixed(1)}%)`);
  if (failed === 0) {
    console.log("🎉 ALL LIVE PRODUCTION JOURNEYS AND APIS ARE FULLY FUNCTIONAL AND HEALTHY!");
  } else {
    console.error(`❌ ${failed} checks failed.`);
  }
  console.log("================================================================================\n");
}

runSanitySuite();
