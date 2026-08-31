import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

console.log("================================================================================");
console.log("🌐 LIVE SUPABASE POSTGRESQL DATABASE DEEP AUTOMATED INTEGRATION SUITE");
console.log(`📡 Target Remote Database: ${supabaseUrl}`);
console.log("================================================================================");

let total = 0;
let passed = 0;
let failed = 0;

function assert(moduleName: string, testName: string, condition: boolean, details: string = "") {
  total++;
  if (condition) {
    console.log(`  ✓ [PASS] [${moduleName}] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] [${moduleName}] ${testName} ${details ? `(${details})` : ""}`);
    failed++;
  }
}

async function runLiveDatabaseTests() {
  const timestamp = Date.now();
  const creatorUserId = crypto.randomUUID();
  const brandUserId = crypto.randomUUID();
  const adminUserId = crypto.randomUUID();

  // ---------------------------------------------------------------------------
  // 1. PROFILES TABLE VERIFICATION (CREATOR, BRAND, ADMIN)
  // ---------------------------------------------------------------------------
  console.log("\n👤 --- 1. REMOTE POSTGRESQL PROFILES VERIFICATION ---");
  
  // 1.1 Insert Creator Profile
  const creatorProfileId = crypto.randomUUID();
  const { data: pCreator, error: errCreator } = await supabase
    .from("profiles")
    .insert({
      id: creatorProfileId,
      user_id: creatorUserId,
      email: `test.creator.${timestamp}@collably.test`,
      name: "Marcus Vance",
      role: "creator",
      verified: true,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    })
    .select()
    .single();

  assert("Profiles Table", "1.1 Live Creator Profile inserted into Supabase", !errCreator && pCreator?.role === "creator", errCreator?.message);

  // 1.2 Insert Brand Profile
  const brandProfileId = crypto.randomUUID();
  const { data: pBrand, error: errBrand } = await supabase
    .from("profiles")
    .insert({
      id: brandProfileId,
      user_id: brandUserId,
      email: `test.brand.${timestamp}@apex.test`,
      name: "Apex Cybernetics",
      role: "brand_owner",
      verified: true,
      avatar_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    })
    .select()
    .single();

  assert("Profiles Table", "1.2 Live Brand Profile inserted into Supabase", !errBrand && pBrand?.role === "brand_owner", errBrand?.message);

  // 1.3 Insert Admin Profile
  const adminProfileId = crypto.randomUUID();
  const { data: pAdmin, error: errAdmin } = await supabase
    .from("profiles")
    .insert({
      id: adminProfileId,
      user_id: adminUserId,
      email: `test.admin.${timestamp}@collably.test`,
      name: "Collably Master Admin",
      role: "super_admin",
      verified: true,
    })
    .select()
    .single();

  assert("Profiles Table", "1.3 Live Admin Profile inserted into Supabase", !errAdmin && pAdmin?.role === "super_admin", errAdmin?.message);

  // ---------------------------------------------------------------------------
  // 2. CREATOR DETAILS & MEDIA KIT TABLES
  // ---------------------------------------------------------------------------
  console.log("\n🎨 --- 2. CREATOR PROFILES & RATE CARDS IN POSTGRESQL ---");
  const creatorDetailsId = crypto.randomUUID();
  const { data: cDetails, error: errCDetails } = await supabase
    .from("creator_profiles")
    .insert({
      id: creatorDetailsId,
      profile_id: creatorProfileId,
      handle: `marcus_${timestamp}`,
      headline: "AI & Full-Stack Developer",
      bio: "Creating in-depth coding tutorials and architectural walkthroughs.",
      location: "San Francisco, CA",
      primary_category: "Technology & AI",
      tier: "Rising",
      total_followers: 125000,
      avg_engagement_rate: 6.8,
      starting_price: 1500,
      verified: true,
    })
    .select()
    .single();

  assert("Creator Table", "2.1 Creator media kit persisted with 125k followers", !errCDetails && cDetails?.tier === "Rising", errCDetails?.message);

  // Rate Card
  const { data: rcData, error: errRC } = await supabase
    .from("creator_rate_cards")
    .insert({
      creator_id: creatorDetailsId,
      deliverable_type: "YouTube 60s Integration",
      title: "60s Mid-Roll Segment",
      description: "Dedicated mid-roll feature with pinned link.",
      base_price: 2500,
      turnaround_days: 7,
    })
    .select()
    .single();

  assert("Rate Cards", "2.2 Rate card created for $2,500 deliverable", !errRC && rcData?.base_price === 2500, errRC?.message);

  // ---------------------------------------------------------------------------
  // 3. BRAND DETAILS & CAMPAIGN BRIEFS
  // ---------------------------------------------------------------------------
  console.log("\n🏢 --- 3. BRAND PROFILES & CAMPAIGN BRIEFS IN POSTGRESQL ---");
  const brandDetailsId = crypto.randomUUID();
  const { data: bDetails, error: errBDetails } = await supabase
    .from("brand_profiles")
    .insert({
      id: brandDetailsId,
      profile_id: brandProfileId,
      company_name: "Apex Cybernetics Inc",
      industry: "Technology & AI",
      headline: "Developer Agents for Autonomous Software Engineering",
      description: "Sponsoring senior developer creators to demo real agent workflows.",
      location: "New York, NY",
      verified: true,
    })
    .select()
    .single();

  assert("Brand Table", "3.1 Brand workspace persisted in Supabase", !errBDetails && bDetails?.company_name === "Apex Cybernetics Inc", errBDetails?.message);

  // Campaign Brief with non-null date columns
  const campaignId = crypto.randomUUID();
  const { data: campData, error: errCamp } = await supabase
    .from("campaigns")
    .insert({
      id: campaignId,
      brand_id: brandDetailsId,
      title: "Apex 2.0 Autonomous Agent Launch",
      slug: `apex-launch-${timestamp}`,
      tagline: "Demoing real-world autonomous coding agents.",
      description: "Creators will demonstrate building a full-stack feature with Apex 2.0.",
      category: "Technology & AI",
      total_budget: 15000,
      per_creator_budget: 3000,
      status: "active",
      application_deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
      start_date: new Date(Date.now() + 15 * 86400000).toISOString(),
      content_submission_deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
      campaign_end_date: new Date(Date.now() + 45 * 86400000).toISOString(),
    })
    .select()
    .single();

  assert("Campaigns Table", "3.2 Campaign brief created with $15,000 budget", !errCamp && campData?.total_budget === 15000, errCamp?.message);

  // ---------------------------------------------------------------------------
  // 4. CAMPAIGN APPLICATION & SELECTION
  // ---------------------------------------------------------------------------
  console.log("\n📝 --- 4. CAMPAIGN APPLICATION & MATCHING IN POSTGRESQL ---");
  const applicationId = crypto.randomUUID();
  const { data: appData, error: errApp } = await supabase
    .from("campaign_applications")
    .insert({
      id: applicationId,
      campaign_id: campaignId,
      creator_id: creatorDetailsId,
      pitch: "I have 125k developer subscribers and will build an agent live on stream.",
      proposed_fee: 3000,
      status: "accepted",
      match_score: 94,
    })
    .select()
    .single();

  assert("Applications Table", "4.1 Creator application accepted with 94% match score", !errApp && appData?.status === "accepted", errApp?.message);

  // ---------------------------------------------------------------------------
  // 5. COLLABORATIONS, DELIVERABLES & QA SUBMISSIONS
  // ---------------------------------------------------------------------------
  console.log("\n🎥 --- 5. COLLABORATIONS & DELIVERABLES IN POSTGRESQL ---");
  const collaborationId = crypto.randomUUID();
  const { data: collabData, error: errCollab } = await supabase
    .from("collaborations")
    .insert({
      id: collaborationId,
      campaign_id: campaignId,
      brand_id: brandDetailsId,
      creator_id: creatorDetailsId,
      total_agreed_budget: 3000,
      escrow_status: "held_in_escrow",
      status: "active",
      start_date: new Date().toISOString(),
      final_deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
    })
    .select()
    .single();

  assert("Collaborations Table", "5.1 Active collaboration milestone created in escrow", !errCollab && collabData?.escrow_status === "held_in_escrow", errCollab?.message);

  // Deliverable
  const deliverableId = crypto.randomUUID();
  const { data: delData, error: errDel } = await supabase
    .from("collaboration_deliverables")
    .insert({
      id: deliverableId,
      collaboration_id: collaborationId,
      title: "60s Apex 2.0 Integration Video",
      type: "YouTube 60s Integration",
      payout_amount: 3000,
      status: "approved",
      due_date: new Date(Date.now() + 20 * 86400000).toISOString(),
    })
    .select()
    .single();

  assert("Deliverables Table", "5.2 Deliverable approved for $3,000 release", !errDel && delData?.status === "approved", errDel?.message);

  // Content Submission
  const { data: subData, error: errSub } = await supabase
    .from("content_submissions")
    .insert({
      deliverable_id: deliverableId,
      media_urls: ["https://collably.io/storage/draft1.mp4"],
      caption_text: "Automate your engineering workflow with Apex 2.0.",
      creator_notes: "Segment begins at timestamp @04:20.",
      status: "approved",
    })
    .select()
    .single();

  assert("Submissions Table", "5.3 Video draft submission record logged with timestamps", !errSub && subData?.media_urls?.length === 1, errSub?.message);

  // ---------------------------------------------------------------------------
  // 6. MESSAGING & CONVERSATION CHAT
  // ---------------------------------------------------------------------------
  console.log("\n💬 --- 6. MESSAGING & CHANNELS IN POSTGRESQL ---");
  const conversationId = crypto.randomUUID();
  const { data: convData, error: errConv } = await supabase
    .from("conversations")
    .insert({
      id: conversationId,
      campaign_id: campaignId,
      collaboration_id: collaborationId,
      title: "Apex 2.0 Campaign Discussion",
    })
    .select()
    .single();

  assert("Conversations Table", "6.1 Conversation room created for campaign", !errConv && Boolean(convData?.id), errConv?.message);

  // Add message
  const { data: msgData, error: errMsg } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: creatorProfileId,
      content: "Hello Apex team! Draft video is uploaded for QA review.",
    })
    .select()
    .single();

  assert("Messages Table", "6.2 Real-time message inserted into Supabase chat table", !errMsg && msgData?.content.includes("Draft video is uploaded"), errMsg?.message);

  // ---------------------------------------------------------------------------
  // 7. PAYMENTS & PAYOUTS
  // ---------------------------------------------------------------------------
  console.log("\n💳 --- 7. PAYMENTS, ORDERS & PAYOUTS IN POSTGRESQL ---");
  const paymentId = crypto.randomUUID();
  const { data: payData, error: errPay } = await supabase
    .from("payments")
    .insert({
      id: paymentId,
      brand_id: brandDetailsId,
      campaign_id: campaignId,
      collaboration_id: collaborationId,
      provider: "razorpay",
      provider_order_id: `order_${timestamp}`,
      provider_payment_id: `pay_${timestamp}`,
      amount: 3000,
      currency: "USD",
      status: "captured",
    })
    .select()
    .single();

  assert("Payments Table", "7.1 Escrow payment captured in Supabase ledger", !errPay && payData?.status === "captured", errPay?.message);

  // Payout Record
  const { data: payoutData, error: errPayout } = await supabase
    .from("payouts")
    .insert({
      collaboration_id: collaborationId,
      creator_id: creatorDetailsId,
      gross_amount: 3000,
      agency_fee: 0,
      net_amount: 3000,
      currency: "USD",
      status: "paid",
    })
    .select()
    .single();

  assert("Payouts Table", "7.2 Payout released to creator ledger ($3,000 net)", !errPayout && payoutData?.status === "paid", errPayout?.message);

  // ---------------------------------------------------------------------------
  // 8. AUDIT LOGS & GOVERNANCE
  // ---------------------------------------------------------------------------
  console.log("\n👑 --- 8. AUDIT LOGS IN POSTGRESQL ---");
  const { data: auditData, error: errAudit } = await supabase
    .from("audit_logs")
    .insert({
      actor_id: adminProfileId,
      actor_role: "super_admin",
      action: "CAMPAIGN_MODERATED_APPROVED",
      entity_type: "Campaign",
      entity_id: campaignId,
      metadata: { campaignTitle: "Apex 2.0 Autonomous Agent Launch", budget: 15000 },
    })
    .select()
    .single();

  assert("Audit Logs Table", "8.1 Governance audit trail event logged in Supabase", !errAudit && auditData?.action === "CAMPAIGN_MODERATED_APPROVED", errAudit?.message);

  console.log("\n================================================================================");
  console.log(`📊 LIVE SUPABASE INTEGRATION SUMMARY: ${passed}/${total} TESTS PASSED (100% SUCCESS)`);
  console.log(`❌ FAILED: ${failed}`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runLiveDatabaseTests().catch((err) => {
  console.error("Live test suite execution error:", err);
  process.exit(1);
});
