import http from "http";

console.log("================================================================================");
console.log("⚡ COLLABLY AUTOMATED LIVE SYSTEM & ROUTE VERIFICATION SUITE");
console.log("================================================================================");

const BASE_URL = "http://localhost:3000";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(moduleName, testName, condition, details = "") {
  totalTests++;
  if (condition) {
    console.log(`  ✓ [PASS] [${moduleName}] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ [FAIL] [${moduleName}] ${testName} ${details ? `(${details})` : ""}`);
    failedTests++;
  }
}

async function fetchRoute(path, options = {}) {
  return new Promise((resolve) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: {
        "User-Agent": "Collably-AutoTester/1.0",
        ...(options.headers || {}),
      },
    };

    if (options.body) {
      reqOptions.headers["Content-Type"] = "application/json";
    }

    const req = http.request(url, reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data,
          json,
        });
      });
    });

    req.on("error", (err) => {
      resolve({ status: 500, error: `${err.code ? `[${err.code}] ` : ""}${err.message}`, failed: true, errorCode: err.code });
    });

    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runAutoTests() {
  // ── SECTION 1: PUBLIC & MARKETING ROUTES ──
  console.log("\n🌐 --- 1. PUBLIC MARKETING & ONBOARDING ROUTES ---");
  const publicRoutes = [
    { path: "/", name: "Landing Page (White & Solar Yellow)" },
    { path: "/about", name: "About Page" },
    { path: "/services", name: "Managed Agency Services" },
    { path: "/brands", name: "Brand Directory" },
    { path: "/creators", name: "Creator Discovery Roster" },
    { path: "/campaigns", name: "Live Campaign Briefs" },
    { path: "/pricing", name: "Pricing & 10% Escrow Fee" },
    { path: "/case-studies", name: "Case Studies" },
    { path: "/contact", name: "Contact & Strategy Inquiry" },
    { path: "/privacy", name: "Privacy Policy" },
    { path: "/terms", name: "Terms of Service" },
    { path: "/refund-policy", name: "Milestone Refund Policy" },
    { path: "/dpa", name: "Data Processing Agreement" },
    { path: "/for-brands", name: "For Brands Portal" },
    { path: "/creator/onboarding", name: "Creator 9-Step Onboarding Wizard" },
    { path: "/brand/onboarding", name: "Brand 5-Step Setup Wizard" },
    { path: "/login", name: "Unified Auth Login Page" },
    { path: "/creator/register", name: "Creator Registration Portal" },
    { path: "/brand/register", name: "Brand Registration Portal" },
  ];

  for (const route of publicRoutes) {
    const res = await fetchRoute(route.path);
    assert("Public Routes", `${route.name} (${route.path}) returned HTTP ${res.status}`, res.status === 200 && !res.failed, res.error);
  }

  // ── SECTION 2: GUEST RBAC ISOLATION CHECKS ──
  console.log("\n🛡️ --- 2. GUEST RBAC ISOLATION & REDIRECT GATES ---");
  const guestDashboard = await fetchRoute("/app/dashboard");
  assert("RBAC Isolation", "Unauthenticated /app/dashboard redirects to login (HTTP 307)", guestDashboard.status === 307);
  const guestAdmin = await fetchRoute("/admin");
  assert("RBAC Isolation", "Unauthenticated /admin redirects to login (HTTP 307)", guestAdmin.status === 307);

  // ── SECTION 3: AUTHENTICATED CREATOR WORKSPACES ──
  console.log("\n💼 --- 3. AUTHENTICATED CREATOR WORKSPACE APPS ---");
  const creatorLogin = await fetchRoute("/api/auth/login", {
    method: "POST",
    body: { email: "creator@abeycollab.io", password: "password123" },
  });
  const creatorCookie = creatorLogin.headers?.["set-cookie"]?.[0]?.split(";")?.[0] || `abeycollab_session=${creatorLogin.json?.token}`;
  assert("Auth Service", "Creator login succeeded (HTTP 200)", creatorLogin.status === 200 && !!creatorLogin.json?.token);

  const creatorRoutes = [
    { path: "/app/dashboard", name: "Creator Operations Dashboard" },
    { path: "/app/messages", name: "Direct Messages & Threaded Channels" },
    { path: "/app/collaborations", name: "4K Frame QA & Collaboration Studio" },
    { path: "/app/campaigns", name: "Brand Campaign Management" },
    { path: "/app/applications", name: "Pitch Applications Desk" },
    { path: "/app/analytics", name: "Performance & ROAS Attribution" },
    { path: "/app/earnings", name: "Escrow Ledger & Payout Disbursements" },
    { path: "/app/profile", name: "Creator Media Kit Editor" },
    { path: "/app/settings", name: "Account & Payout Security Settings" },
    { path: "/app/support", name: "Concierge Support Desk" },
    { path: "/app/trending", name: "Dedicated Trending Creators Hub" },
    { path: "/app/growth", name: "Creator Growth Center" },
  ];

  for (const route of creatorRoutes) {
    const res = await fetchRoute(route.path, { headers: { Cookie: creatorCookie } });
    assert("Creator Workspace", `${route.name} (${route.path}) returned HTTP ${res.status}`, res.status === 200);
  }

  // ── SECTION 4: AUTHENTICATED BRAND WORKSPACES ──
  console.log("\n🏢 --- 4. AUTHENTICATED BRAND WORKSPACE APPS ---");
  const brandLogin = await fetchRoute("/api/auth/login", {
    method: "POST",
    body: { email: "brand@abeycollab.io", password: "password123" },
  });
  const brandCookie = brandLogin.headers?.["set-cookie"]?.[0]?.split(";")?.[0] || `abeycollab_session=${brandLogin.json?.token}`;
  assert("Auth Service", "Brand login succeeded (HTTP 200)", brandLogin.status === 200 && !!brandLogin.json?.token);

  const brandRoutes = [
    { path: "/app/brand/campaigns", name: "Brand Campaigns Overview" },
    { path: "/app/brand/campaigns/create", name: "7-Step AI Campaign Wizard" },
    { path: "/app/brand/creators", name: "Creator Discovery Directory" },
    { path: "/app/brand/crm", name: "Creator Relationship CRM" },
    { path: "/app/brand/shortlists", name: "Curated Talent Shortlists" },
    { path: "/app/brand/analytics", name: "Campaign ROI Telemetry" },
  ];

  for (const route of brandRoutes) {
    const res = await fetchRoute(route.path, { headers: { Cookie: brandCookie } });
    assert("Brand Workspace", `${route.name} (${route.path}) returned HTTP ${res.status}`, res.status === 200);
  }

  // ── SECTION 5: ADMIN GOVERNANCE & SUPERVISION SUITE ──
  console.log("\n👑 --- 5. ADMIN GOVERNANCE & SUPERVISION MODULES ---");
  const adminLogin = await fetchRoute("/api/auth/login", {
    method: "POST",
    body: { email: "kevinbhutwala417@gmail.com", password: "admin123" },
  });
  const adminCookie = adminLogin.headers?.["set-cookie"]?.[0]?.split(";")?.[0] || `abeycollab_session=${adminLogin.json?.token}`;
  assert("Auth Service", "Admin login succeeded (HTTP 200)", adminLogin.status === 200 && !!adminLogin.json?.token);

  const adminRoutes = [
    { path: "/admin", name: "Admin Executive Command Center" },
    { path: "/admin/audit", name: "Immutable Audit Log Stream" },
    { path: "/admin/brands", name: "Brand Partner Approvals" },
    { path: "/admin/campaigns", name: "Campaign Brief Moderation" },
    { path: "/admin/collaborations", name: "Milestone Oversight" },
    { path: "/admin/creators", name: "Creator Verification Queue" },
    { path: "/admin/disputes", name: "24h Dispute Arbitration Court" },
    { path: "/admin/payments", name: "Stripe & Razorpay Vault Ledger" },
    { path: "/admin/reports", name: "Revenue & Platform Telemetry" },
    { path: "/admin/settings", name: "Global Security Controls" },
  ];

  for (const route of adminRoutes) {
    const res = await fetchRoute(route.path, { headers: { Cookie: adminCookie } });
    assert("Admin Suite", `${route.name} (${route.path}) returned HTTP ${res.status}`, res.status === 200);
  }

  // ── SECTION 4: LIVE BACKEND API ENDPOINTS ──
  console.log("\n🔌 --- 4. BACKEND API ENDPOINTS & DATA PIPELINES ---");

  // Health API
  const healthRes = await fetchRoute("/api/health");
  assert("Health API", "GET /api/health returns HTTP 200 & healthy status", healthRes.status === 200 && healthRes.json?.status === "ok");

  // Conversations API
  const convRes = await fetchRoute("/api/conversations");
  assert("Messages API", "GET /api/conversations returns active channels", convRes.status === 200 && Array.isArray(convRes.json?.conversations) && convRes.json.conversations.length >= 2);

  // Messages in Thread API
  const msgRes = await fetchRoute("/api/messages?conversationId=conv-1");
  assert("Messages API", "GET /api/messages?conversationId=conv-1 returns thread messages", msgRes.status === 200 && Array.isArray(msgRes.json?.messages) && msgRes.json.messages.length >= 2);

  // Send Message via API
  const postMsgRes = await fetchRoute("/api/messages", {
    method: "POST",
    body: {
      conversationId: "conv-1",
      senderId: "test-auto-user",
      senderRole: "creator",
      senderName: "Automated QA Robot",
      content: "Automated verification heartbeat check.",
    },
  });
  assert("Messages API", "POST /api/messages persists new message to channel", postMsgRes.status === 200 && postMsgRes.json?.success === true);

  // Campaigns API
  const campRes = await fetchRoute("/api/campaigns");
  assert("Campaigns API", "GET /api/campaigns returns curated brief roster", campRes.status === 200 && Array.isArray(campRes.json?.campaigns || campRes.json));

  // Creators API
  const creatRes = await fetchRoute("/api/creators");
  assert("Creators API", "GET /api/creators returns verified creator talent", creatRes.status === 200 && Array.isArray(creatRes.json?.creators || creatRes.json));

  // Brands API
  const brandRes = await fetchRoute("/api/brands");
  assert("Brands API", "GET /api/brands returns registered enterprise sponsors", brandRes.status === 200 && Array.isArray(brandRes.json?.brands || brandRes.json));

  // Collaborations API
  const collabRes = await fetchRoute("/api/collaborations");
  assert("Collaborations API", "GET /api/collaborations returns milestone pipeline", collabRes.status === 200 && Array.isArray(collabRes.json?.collaborations || collabRes.json));

  // ── FINAL SUMMARY ──
  console.log("\n================================================================================");
  console.log(`📊 FINAL RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${((passedTests / totalTests) * 100).toFixed(1)}% SUCCESS RATE)`);
  console.log(`❌ FAILED: ${failedTests}`);
  console.log("================================================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAutoTests();
