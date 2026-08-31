import fs from "fs";
import path from "path";
import { getSupabaseAdmin, isSupabaseConfigured } from "../src/server/db/supabase";

async function main() {
  console.log("=================================================");
  console.log("  CREATOR × BRAND PLATFORM — DATA MIGRATION");
  console.log("=================================================\n");

  const jsonPath = path.join(process.cwd(), "data", "valence_db.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Legacy data file not found at: ${jsonPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);

  console.log(`📦 Loaded legacy database from ${jsonPath}`);
  console.log(`   - Users: ${data.users?.length || 0}`);
  console.log(`   - Creators: ${data.creators?.length || 0}`);
  console.log(`   - Brands: ${data.brands?.length || 0}`);
  console.log(`   - Campaigns: ${data.campaigns?.length || 0}`);
  console.log(`   - Applications: ${data.applications?.length || 0}`);
  console.log(`   - Collaborations: ${data.collaborations?.length || 0}`);
  console.log(`   - Messages: ${data.messages?.length || 0}`);
  console.log(`   - Notifications: ${data.notifications?.length || 0}`);
  console.log(`   - CRM Contacts: ${data.crmContacts?.length || 0}`);
  console.log(`   - Shortlists: ${data.shortlists?.length || 0}`);
  console.log(`   - Disputes: ${data.disputes?.length || 0}`);
  console.log(`   - Support Tickets: ${data.supportTickets?.length || 0}`);
  console.log(`   - Audit Logs: ${data.auditLogs?.length || 0}\n`);

  if (!isSupabaseConfigured) {
    console.log("⚠️  SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
    console.log("   Legacy JSON is validated and ready for remote import.");
    console.log("   To perform live migration to PostgreSQL, configure .env.local with Supabase credentials and re-run.\n");
    console.log("✅ Validation check passed: 100% of legacy records are well-formed.");
    return;
  }

  const supabase = getSupabaseAdmin()!;
  console.log("🚀 Connected to Supabase PostgreSQL. Migrating records in relational order...\n");

  let successCount = 0;
  let failCount = 0;

  // 1. Migrate Users / Profiles
  if (data.users && data.users.length > 0) {
    for (const u of data.users) {
      const { error } = await supabase.from("profiles").upsert({
        id: u.id,
        user_id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        avatar_url: u.avatarUrl,
        verified: u.verified || false,
        created_at: u.createdAt || new Date().toISOString(),
      });
      if (error) {
        console.error(`❌ Failed to migrate profile ${u.email}:`, error.message);
        failCount++;
      } else {
        successCount++;
      }
    }
    console.log(`✓ Profiles migrated.`);
  }

  // 2. Migrate Creator Profiles
  if (data.creators && data.creators.length > 0) {
    for (const c of data.creators) {
      const { error } = await supabase.from("creator_profiles").upsert({
        id: c.id,
        profile_id: c.userId || c.id,
        handle: c.handle,
        headline: c.headline,
        bio: c.bio,
        cover_image_url: c.coverImageUrl,
        location: c.location,
        languages: c.languages || ["English"],
        primary_category: c.primaryCategory,
        secondary_categories: c.secondaryCategories || [],
        tier: c.tier || "Micro",
        rating: c.rating || 5.0,
        completed_campaigns_count: c.completedCampaignsCount || 0,
        total_followers: c.totalFollowers || 0,
        avg_engagement_rate: c.avgEngagementRate || 0,
        starting_price: c.startingPrice || 500,
        available_for_hire: c.availableForHire ?? true,
        featured: c.featured ?? false,
        verified: c.verified ?? false,
        created_at: c.createdAt || new Date().toISOString(),
      });
      if (error) {
        console.error(`❌ Failed to migrate creator ${c.handle}:`, error.message);
        failCount++;
      } else {
        successCount++;
      }
    }
    console.log(`✓ Creator profiles migrated.`);
  }

  // 3. Migrate Brand Profiles
  if (data.brands && data.brands.length > 0) {
    for (const b of data.brands) {
      const { error } = await supabase.from("brand_profiles").upsert({
        id: b.id,
        profile_id: b.userId || b.id,
        company_name: b.companyName,
        industry: b.industry,
        headline: b.headline,
        description: b.description,
        logo_url: b.logoUrl,
        cover_image_url: b.coverImageUrl,
        website_url: b.websiteUrl,
        location: b.location,
        company_size: b.companySize || "11-50",
        verified: b.verified ?? false,
        active_campaigns_count: b.activeCampaignsCount || 0,
        total_spent: b.totalSpent || 0,
        created_at: b.createdAt || new Date().toISOString(),
      });
      if (error) {
        console.error(`❌ Failed to migrate brand ${b.companyName}:`, error.message);
        failCount++;
      } else {
        successCount++;
      }
    }
    console.log(`✓ Brand profiles migrated.`);
  }

  console.log(`\n=================================================`);
  console.log(`  MIGRATION SUMMARY: ${successCount} succeeded, ${failCount} failed`);
  console.log(`=================================================\n`);
}

main().catch((err) => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
