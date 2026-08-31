import { getInitialSeedDatabase } from "../src/server/db/seed";
import { isSupabaseConfigured, getSupabaseAdmin } from "../src/server/db/supabase";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("🌱 Starting development database seeding...\n");

  if (process.env.NODE_ENV === "production") {
    console.error("🛑 ABORT: Seeding fake/mock development data into production environment is prohibited.");
    process.exit(1);
  }

  const initialData = getInitialSeedDatabase();

  if (isSupabaseConfigured) {
    const supabase = getSupabaseAdmin()!;
    console.log("Seeding Supabase remote PostgreSQL database...");

    for (const u of initialData.users) {
      await supabase.from("profiles").upsert({
        id: u.id,
        user_id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        avatar_url: u.avatarUrl,
        verified: u.verified,
      });
    }
    console.log(`✓ Seeded ${initialData.users.length} profiles to Supabase.`);
  } else {
    const dataDir = path.join(process.cwd(), "data");
    const dbFile = path.join(dataDir, "valence_db.json");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2), "utf-8");
    console.log(`✓ Seeded ${initialData.creators.length} creators, ${initialData.brands.length} brands, and ${initialData.campaigns.length} campaigns to local development database.`);
  }

  console.log("\n✅ Database seeding complete.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
