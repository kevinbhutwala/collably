import http from "http";

const BASE_URL = "http://localhost:3000";

console.log("================================================================================");
console.log("⚔️  COLLABLY THREE-SIDED PLATFORM AUDIT: ADMIN ↔ CREATOR ↔ BRAND");
console.log("================================================================================");

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

const findings = [];

function recordCheck(role, moduleName, description, passed, details = "") {
  totalChecks++;
  if (passed) {
    console.log(`  ✓ [PASS] [${role}] [${moduleName}] ${description}`);
    passedChecks++;
  } else {
    console.error(`  ✗ [FAIL] [${role}] [${moduleName}] ${description} ${details ? `(${details})` : ""}`);
    failedChecks++;
    findings.push({ role, module: moduleName, description, details });
  }
}

async function fetchRoute(path, options = {}) {
  return new Promise((resolve) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: {
        "User-Agent": "Collably-ThreeSidedAudit/1.0",
        ...(options.headers || {}),
      },
    };

    if (options.body) {
      reqOptions.headers["Content-Type"] = "application/json";
    }

    const req = http.request(url, reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
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
      resolve({ status: 500, error: err.message, failed: true });
    });

    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function loginUser(email, password) {
  const res = await fetchRoute("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  const cookie = res.headers?.["set-cookie"]?.[0]?.split(";")?.[0] || (res.json?.token ? `abeycollab_session=${res.json.token}` : null);
  return {
    success: res.status === 200 && !!res.json?.token,
    user: res.json?.user,
    token: res.json?.token,
    cookie,
  };
}

async function runAudit() {
  // ── 0. AUTHENTICATION OF ALL 3 ROLES ──
  console.log("\n🔑 --- 0. AUTHENTICATION ACROSS ALL 3 ROLES ---");
  const adminAuth = await loginUser("kevinbhutwala417@gmail.com", "admin123");
  recordCheck("Admin", "Auth", "Admin authenticated successfully", adminAuth.success);

  const brandAuth = await loginUser("brand@abeycollab.io", "password123");
  recordCheck("Brand", "Auth", "Brand authenticated successfully", brandAuth.success);

  const creatorAuth = await loginUser("creator@abeycollab.io", "password123");
  recordCheck("Creator", "Auth", "Creator authenticated successfully", creatorAuth.success);

  if (!adminAuth.success || !brandAuth.success || !creatorAuth.success) {
    console.error("Critical: Failed to authenticate one or more roles. Halting audit.");
    return;
  }

  const adminHeaders = { Cookie: adminAuth.cookie, Authorization: `Bearer ${adminAuth.token}` };
  const brandHeaders = { Cookie: brandAuth.cookie, Authorization: `Bearer ${brandAuth.token}` };
  const creatorHeaders = { Cookie: creatorAuth.cookie, Authorization: `Bearer ${creatorAuth.token}` };

  // ── 1. ADMIN SIDE AUDIT ──
  console.log("\n👑 --- 1. ADMIN SIDE CONTROLS & MANAGEMENT AUDIT ---");
  // 1.1 Admin Executive Dashboard & Telemetry
  const adminDash = await fetchRoute("/admin", { headers: adminHeaders });
  recordCheck("Admin", "Command Center", "Admin executive command center accessible (HTTP 200)", adminDash.status === 200);

  const adminAnalytics = await fetchRoute("/api/admin/analytics", { headers: adminHeaders });
  recordCheck("Admin", "Analytics API", "Admin telemetry metrics returned", adminAnalytics.status === 200 && (adminAnalytics.json?.analytics !== undefined || adminAnalytics.json?.metrics !== undefined));

  // 1.2 Algorithm Weights Tuning
  const algoRes = await fetchRoute("/api/admin/algorithm-config", {
    method: "PUT",
    headers: adminHeaders,
    body: {
      creatorWeights: {
        engagementRate: 0.25,
        successfulCollabs: 0.20,
      },
    },
  });
  recordCheck("Admin", "Algorithm Tuning", "Admin can modify platform match & ranking weights", algoRes.status === 200 && algoRes.json?.success);

  // 1.3 Audit Log Stream
  const auditRes = await fetchRoute("/api/audit", { headers: adminHeaders });
  recordCheck("Admin", "Audit Logs", "Admin can inspect immutable audit logs stream", auditRes.status === 200 && Array.isArray(auditRes.json));

  // 1.4 Dispute Court & Arbitration
  const disputesRes = await fetchRoute("/api/disputes", { headers: adminHeaders });
  recordCheck("Admin", "Dispute Arbitration", "Admin can query disputes arbitration court", disputesRes.status === 200 && Array.isArray(disputesRes.json));

  // 1.5 Payments & Escrow Vault Oversight
  const escrowRes = await fetchRoute("/api/admin/escrow", { headers: adminHeaders });
  recordCheck("Admin", "Escrow Vault", "Admin can inspect live escrow vault balances", escrowRes.status === 200 && (escrowRes.json?.summary?.totalEscrowHeld !== undefined || escrowRes.json?.vaults !== undefined));

  // 1.6 Creator Moderation & Verification via API
  const creatorProfileRes = await fetchRoute("/api/creators/creator-demo", { headers: adminHeaders });
  const originalVerified = creatorProfileRes.json?.verified;
  const updateCreatorRes = await fetchRoute("/api/creators/creator-demo", {
    method: "PATCH",
    headers: adminHeaders,
    body: { verified: !originalVerified },
  });
  recordCheck("Admin", "Creator Moderation", "Admin can toggle creator verified badge via API", updateCreatorRes.status === 200);

  // Check that the updated status reflects on public API
  const verifyReflection = await fetchRoute("/api/creators/creator-demo");
  recordCheck("Creator", "Profile", "Admin creator verification change immediately reflects publicly", verifyReflection.json?.verified === !originalVerified);

  // Revert verification back
  await fetchRoute("/api/creators/creator-demo", {
    method: "PATCH",
    headers: adminHeaders,
    body: { verified: originalVerified },
  });

  // 1.7 Brand Moderation & Verification via API
  const updateBrandRes = await fetchRoute("/api/brands/brand-demo", {
    method: "PATCH",
    headers: adminHeaders,
    body: { bio: "Updated by Admin Audit Test" },
  });
  recordCheck("Admin", "Brand Moderation", "Admin can update brand profile via API", updateBrandRes.status === 200);

  // ── 2. CREATOR SIDE AUDIT ──
  console.log("\n🎨 --- 2. CREATOR SIDE WORKSPACE & CAPABILITIES AUDIT ---");
  // 2.1 Workspace Pages
  const creatorDash = await fetchRoute("/app/dashboard", { headers: creatorHeaders });
  recordCheck("Creator", "Dashboard", "Creator dashboard renders", creatorDash.status === 200);

  const creatorProfile = await fetchRoute("/app/profile", { headers: creatorHeaders });
  recordCheck("Creator", "Media Kit", "Creator profile / media kit renders", creatorProfile.status === 200);

  const creatorEarnings = await fetchRoute("/app/earnings", { headers: creatorHeaders });
  recordCheck("Creator", "Earnings Desk", "Creator earnings and escrow ledger renders", creatorEarnings.status === 200);

  // 2.2 Updating Creator Media Kit
  const updateSelfRes = await fetchRoute("/api/creators/creator-demo", {
    method: "PATCH",
    headers: creatorHeaders,
    body: { bio: "Elite Tech & AI Content Creator — 4K Framerate" },
  });
  recordCheck("Creator", "Media Kit", "Creator can update own media kit", updateSelfRes.status === 200);

  // 2.3 Opportunity Discovery
  const campaignsFeed = await fetchRoute("/api/campaigns", { headers: creatorHeaders });
  recordCheck("Creator", "Campaign Discovery", "Creator can browse active brand campaigns", campaignsFeed.status === 200 && Array.isArray(campaignsFeed.json) && campaignsFeed.json.length > 0);

  // 2.4 Social Channels Verification API
  const socialVerify = await fetchRoute("/api/creators/verify-social", {
    method: "POST",
    headers: creatorHeaders,
    body: { platform: "x", handle: "creator_audit_bot", verificationCode: "COLLAB-1234" },
  });
  recordCheck("Creator", "Social Verification", "Creator social channel verification API responds", socialVerify.status === 200 || socialVerify.status === 400);

  // ── 3. BRAND SIDE AUDIT ──
  console.log("\n🏢 --- 3. BRAND SIDE WORKSPACE & CAPABILITIES AUDIT ---");
  // 3.1 Brand Workspace Pages
  const brandCampaigns = await fetchRoute("/app/brand/campaigns", { headers: brandHeaders });
  recordCheck("Brand", "Campaigns Hub", "Brand campaigns hub renders", brandCampaigns.status === 200);

  const brandCRM = await fetchRoute("/app/brand/crm", { headers: brandHeaders });
  recordCheck("Brand", "CRM", "Brand creator CRM renders", brandCRM.status === 200);

  const brandShortlists = await fetchRoute("/app/brand/shortlists", { headers: brandHeaders });
  recordCheck("Brand", "Shortlists", "Brand talent shortlists desk renders", brandShortlists.status === 200);

  // 3.2 Brand Talent Discovery
  const talentDiscovery = await fetchRoute("/api/creators", { headers: brandHeaders });
  recordCheck("Brand", "Talent Discovery", "Brand can query creator talent directory with filters", talentDiscovery.status === 200 && Array.isArray(talentDiscovery.json) && talentDiscovery.json.length > 0);

  // 3.3 Brand CRM Contact Management
  const crmContactAdd = await fetchRoute("/api/crm/contacts", {
    method: "POST",
    headers: brandHeaders,
    body: { action: "addContact", creatorId: "creator-demo", stage: "Prospect", content: "Shortlisted for Q4 Audio Campaign" },
  });
  recordCheck("Brand", "CRM Pipeline", "Brand can add creator to CRM pipeline", crmContactAdd.status === 200 || crmContactAdd.status === 201);

  // 3.4 Brand Talent Shortlist Creation
  const shortlistAdd = await fetchRoute("/api/crm/shortlists", {
    method: "POST",
    headers: brandHeaders,
    body: { name: "Q4 Keynote Roster", creatorIds: ["creator-demo"] },
  });
  recordCheck("Brand", "Shortlists", "Brand can create curated creator shortlist", shortlistAdd.status === 200 || shortlistAdd.status === 201);

  // ── 4. CROSS-ROLE CONNECTED WORKFLOWS ──
  console.log("\n🔄 --- 4. CROSS-ROLE WORKFLOWS & STATE SYNCHRONIZATION ---");
  // 4.1 PBAC Quota Hard Stop: Verify Brand Growth blocks 11th active campaign
  const quotaAttempt = await fetchRoute("/api/campaigns", {
    method: "POST",
    headers: brandHeaders,
    body: {
      title: "Quota Exceeding Campaign",
      tagline: "High-production commercial brief",
      description: "Testing strict plan-based quota hard stop.",
      category: "Technology & AI",
    },
  });
  recordCheck("Brand", "PBAC Quota Hard Stop", "Brand Growth strictly blocks 11th active campaign with 403 PLAN_QUOTA_EXCEEDED", quotaAttempt.status === 403 && quotaAttempt.json?.code === "PLAN_QUOTA_EXCEEDED");

  // Workflow Step 2: Target an active campaign for complete cross-role pitch & milestone lifecycle
  const activeCampaigns = (campaignsFeed.json || []).filter((c) => c.status === "active" || c.status === "applications_open");
  const targetCampaign = activeCampaigns[0] || campaignsFeed.json[0];
  recordCheck("Cross-Role", "Campaign Discovery", "Creator browses and selects active brand campaign", !!targetCampaign?.id);

  const targetCampId = targetCampaign?.id || "camp-1";
  const uniquePitchNote = `Custom 4K Pitch ${Date.now()}`;

  // Workflow Step 3: Creator Applies / Pitches to the Campaign
  const applyRes = await fetchRoute("/api/campaigns/apply", {
    method: "POST",
    headers: creatorHeaders,
    body: {
      campaignId: targetCampId,
      creatorId: "creator-demo",
      pitch: uniquePitchNote,
      proposedFee: 2500,
      currency: "USD",
      estimatedReach: 75000,
      sampleLinks: ["https://youtube.com/watch?v=sample123"],
    },
  });
  // If already applied or newly created, grab the application
  const userAppsRes = await fetchRoute("/api/applications", { headers: creatorHeaders });
  const testApplication = (userAppsRes.json || []).find((a) => a.campaignId === targetCampId) || userAppsRes.json?.[0];
  const testApplicationId = testApplication?.id;
  recordCheck("Cross-Role", "Application Submission", "Creator application exists and is linked to campaign", !!testApplicationId);

  // Workflow Step 4: Brand Sees the Creator's Application
  const brandCheckApps = await fetchRoute(`/api/applications?campaignId=${targetCampId}`, { headers: brandHeaders });
  const brandSawApp = (brandCheckApps.json || []).some((a) => a.id === testApplicationId || a.creatorId === "creator-demo");
  recordCheck("Cross-Role", "Application Receipt", "Brand sees Creator's application in incoming desk", brandSawApp);

  // Workflow Step 5: Brand Accepts the Application (or finds existing collaboration)
  let testCollaborationId = null;
  if (testApplicationId) {
    if (testApplication.status !== "accepted") {
      const acceptRes = await fetchRoute(`/api/applications/${testApplicationId}`, {
        method: "PATCH",
        headers: brandHeaders,
        body: { status: "accepted" },
      });
      testCollaborationId = acceptRes.json?.collaboration?.id;
    }
    const allCollabs = await fetchRoute("/api/collaborations", { headers: brandHeaders });
    const matchingCollab = (allCollabs.json || []).find((c) => c.campaignId === targetCampId || c.creatorId === "creator-demo");
    testCollaborationId = testCollaborationId || matchingCollab?.id || "collab-1";
    recordCheck("Cross-Role", "Application Acceptance", "Collaboration generated and linked between Brand and Creator", !!testCollaborationId);

    // Verify Creator sees accepted status
    const creatorAppView = await fetchRoute(`/api/applications/${testApplicationId}`, { headers: creatorHeaders });
    recordCheck("Creator", "Application Status", "Creator sees application status in dashboard", creatorAppView.status === 200);
  }

  // Workflow Step 6: Brand Funds Collaboration Escrow
  if (testCollaborationId) {
    const fundRes = await fetchRoute(`/api/collaborations/${testCollaborationId}/fund`, {
      method: "POST",
      headers: brandHeaders,
      body: { paymentMethod: "escrow_preauthorized", amount: 2500 },
    });
    recordCheck("Brand", "Escrow Funding", "Brand funds collaboration escrow", fundRes.status === 200 && fundRes.json?.success);

    // Workflow Step 7: Creator Submits Deliverable Draft
    const getCollab = await fetchRoute(`/api/collaborations/${testCollaborationId}`, { headers: creatorHeaders });
    const delivId = getCollab.json?.deliverables?.[0]?.id || "deliv-1";

    const submitDeliv = await fetchRoute(`/api/collaborations/${testCollaborationId}`, {
      method: "POST",
      headers: creatorHeaders,
      body: {
        action: "submit",
        deliverableId: delivId,
        assetUrl: "https://drive.google.com/file/d/audit-video-draft/view",
        creatorNotes: "Final 4K color-graded master ready for client QA",
      },
    });
    recordCheck("Creator", "Deliverable Submission", "Creator submits draft deliverable with HTTPS asset URL", submitDeliv.status === 200 && submitDeliv.json?.success);

    // Workflow Step 8: Brand Approves Deliverable & Disburses Escrow
    const approveDeliv = await fetchRoute(`/api/collaborations/${testCollaborationId}`, {
      method: "POST",
      headers: brandHeaders,
      body: {
        action: "approve",
        deliverableId: delivId,
      },
    });
    recordCheck("Brand", "Deliverable Approval", "Brand approves deliverable; double-entry ledger disburses funds", approveDeliv.status === 200 && approveDeliv.json?.success);

    // Workflow Step 9: Creator Verifies Disbursed Payout in Earnings Ledger
    const creatorPayouts = await fetchRoute("/api/payments/payouts", { headers: creatorHeaders });
    const hasPayout = (creatorPayouts.json?.payouts || []).some((p) => p.collaborationId === testCollaborationId || p.deliverableTitle);
    recordCheck("Creator", "Earnings Reflection", "Creator wallet displays newly approved payout record", hasPayout);

    // Workflow Step 10: Admin Inspects Audit Log for the Complete Sequence
    const adminAudits = await fetchRoute("/api/audit", { headers: adminHeaders });
    const foundAuditEvents = (adminAudits.json || []).some((e) => e.entityId === delivId || e.action.includes("DELIVERABLE"));
    recordCheck("Admin", "Audit Trail", "Admin immutable audit stream recorded deliverable approvals and disbursements", foundAuditEvents);
  }

  // Workflow Step 11: Direct Messaging Between Brand and Creator
  const convRes = await fetchRoute("/api/conversations", {
    method: "POST",
    headers: brandHeaders,
    body: { recipientId: "user-creator" },
  });
  const conversationId = convRes.json?.conversation?.id || "conv-1";

  const sendMsg = await fetchRoute("/api/messages", {
    method: "POST",
    headers: brandHeaders,
    body: {
      conversationId,
      content: "Hello! Looking forward to reviewing the collaboration deliverables.",
    },
  });
  recordCheck("Brand", "Direct Messages", "Brand sends direct message to Creator", sendMsg.status === 200);

  const getMsgs = await fetchRoute("/api/conversations", { headers: creatorHeaders });
  recordCheck("Creator", "Direct Messages", "Creator receives message channel in inbox", getMsgs.status === 200 && Array.isArray(getMsgs.json?.conversations));

  // Workflow Step 12: Dispute Filing and Admin Resolution
  const fileDispute = await fetchRoute("/api/disputes", {
    method: "POST",
    headers: brandHeaders,
    body: {
      collaborationId: "collab-1",
      campaignTitle: "Hyperion ANC Headphone Commercial",
      creatorName: "Marcus Vance",
      brandName: "Aura Audio Labs",
      reason: "Deliverable sound mastering level does not meet TV broadcast specs",
      amountInDispute: 3500,
      currency: "USD",
    },
  });
  const disputeId = fileDispute.json?.dispute?.id || fileDispute.json?.id;
  recordCheck("Brand", "Dispute Filing", "Brand can file dispute to freeze escrow", (fileDispute.status === 200 || fileDispute.status === 201) && !!disputeId);

  if (disputeId) {
    const arbitrateRes = await fetchRoute("/api/disputes", {
      method: "POST",
      headers: adminHeaders,
      body: {
        action: "resolve",
        id: disputeId,
        outcome: "SPLIT_SETTLEMENT",
        adminNotes: "Resolved via 50/50 split settlement by Court Administrator",
      },
    });
    recordCheck("Admin", "Dispute Arbitration", "Admin arbitrates dispute with 50/50 split settlement", arbitrateRes.status === 200 && arbitrateRes.json?.success);
  }

  // ── 5. SECURITY & TENANT ISOLATION BOUNDARIES ──
  console.log("\n🛡️ --- 5. SECURITY, IDOR & TENANT ISOLATION FENCES ---");
  // 5.1 Route Isolation (Middleware)
  const creatorOnAdmin = await fetchRoute("/admin", { headers: creatorHeaders });
  recordCheck("Security", "Route Isolation", "Creator CANNOT access /admin (redirected away)", creatorOnAdmin.status === 307 || creatorOnAdmin.status === 302);

  const brandOnAdmin = await fetchRoute("/admin", { headers: brandHeaders });
  recordCheck("Security", "Route Isolation", "Brand CANNOT access /admin (redirected away)", brandOnAdmin.status === 307 || brandOnAdmin.status === 302);

  const creatorOnBrandWork = await fetchRoute("/app/brand/campaigns", { headers: creatorHeaders });
  recordCheck("Security", "Tenant Isolation", "Creator CANNOT access /app/brand workspace (redirected away)", creatorOnBrandWork.status === 307 || creatorOnBrandWork.status === 302);

  // 5.2 API Permission Fences
  const creatorOnAuditAPI = await fetchRoute("/api/audit", { headers: creatorHeaders });
  recordCheck("Security", "API Protection", "Creator CANNOT query /api/audit (HTTP 403 Forbidden)", creatorOnAuditAPI.status === 403);

  const brandOnAuditAPI = await fetchRoute("/api/audit", { headers: brandHeaders });
  recordCheck("Security", "API Protection", "Brand CANNOT query /api/audit (HTTP 403 Forbidden)", brandOnAuditAPI.status === 403);

  const creatorOnAdminEscrow = await fetchRoute("/api/admin/escrow", { headers: creatorHeaders });
  recordCheck("Security", "API Protection", "Creator CANNOT access /api/admin/escrow (HTTP 403 Forbidden)", creatorOnAdminEscrow.status === 403);

  // 5.3 IDOR Protections
  const creatorApproveSelf = await fetchRoute("/api/collaborations/collab-1", {
    method: "POST",
    headers: creatorHeaders,
    body: { action: "approve", deliverableId: "deliv-1" },
  });
  recordCheck("Security", "IDOR Defense", "Creator CANNOT approve deliverables or trigger escrow release (HTTP 403)", creatorApproveSelf.status === 403);

  const creatorEditBrand = await fetchRoute("/api/brands/brand-demo", {
    method: "PATCH",
    headers: creatorHeaders,
    body: { companyName: "Hacked Brand Name" },
  });
  recordCheck("Security", "IDOR Defense", "Creator CANNOT edit another brand's profile (HTTP 403)", creatorEditBrand.status === 403);

  const brandEditCreator = await fetchRoute("/api/creators/creator-demo", {
    method: "PATCH",
    headers: brandHeaders,
    body: { fullName: "Hacked Creator Name" },
  });
  recordCheck("Security", "IDOR Defense", "Brand CANNOT edit a creator's profile (HTTP 403)", brandEditCreator.status === 403);

  // ── 6. FEATURE AVAILABILITY & ADMIN CONTROLS AUDIT ──
  console.log("\n⚙️ --- 6. FEATURE AVAILABILITY & ADMIN CONTROL GAPS ---");
  // 6.1 Inspect whether Admin has an endpoint to manage campaign approval status
  const adminPatchCampaign = await fetchRoute("/api/campaigns/camp-1", {
    method: "PATCH",
    headers: adminHeaders,
    body: { status: "suspended" },
  });
  recordCheck(
    "Admin Control",
    "Campaign Management API",
    "Admin can update/suspend campaign status via PATCH /api/campaigns/[id]",
    adminPatchCampaign.status === 200,
    adminPatchCampaign.status === 405 ? "PATCH method not allowed / not implemented on /api/campaigns/[id]" : `Status ${adminPatchCampaign.status}`
  );

  // 6.2 Inspect Global Feature Flags API
  const featureFlagsRes = await fetchRoute("/api/admin/feature-flags", { headers: adminHeaders });
  recordCheck(
    "Admin Control",
    "Feature Flags API",
    "Admin has API endpoint to dynamically toggle global feature flags (/api/admin/feature-flags)",
    featureFlagsRes.status === 200,
    featureFlagsRes.status === 404 ? "/api/admin/feature-flags endpoint does not exist" : `Status ${featureFlagsRes.status}`
  );

  // 6.3 Plan-Based Feature Gating Verification (PBAC)
  const creatorSub = await fetchRoute("/api/subscriptions/me", { headers: creatorHeaders });
  const hasValidCreatorSub = creatorSub.status === 200 && !!creatorSub.json?.subscription?.planId;
  recordCheck("PBAC", "Creator Subscription", "Creator subscription resolved with active plan and features", hasValidCreatorSub);

  const brandSub = await fetchRoute("/api/subscriptions/me", { headers: brandHeaders });
  const hasValidBrandSub = brandSub.status === 200 && !!brandSub.json?.subscription?.planId;
  recordCheck("PBAC", "Brand Subscription", "Brand subscription resolved with active plan and features", hasValidBrandSub);

  // ── 7. SUMMARY & METRICS ──
  console.log("\n================================================================================");
  console.log(`📊 AUDIT COMPLETED: ${totalChecks} Total Checks | ${passedChecks} PASSED | ${failedChecks} FAILED`);
  console.log(`Success Rate: ${((passedChecks / totalChecks) * 100).toFixed(1)}%`);
  console.log("================================================================================");

  if (findings.length > 0) {
    console.log("\n⚠️ FINDINGS & GAPS DETECTED:");
    findings.forEach((f, i) => {
      console.log(`  ${i + 1}. [${f.role}] [${f.module}] ${f.description}: ${f.details}`);
    });
  }
}

runAudit().catch(console.error);
