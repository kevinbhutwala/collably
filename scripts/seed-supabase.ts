import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to seed Supabase.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// OWASP 210,000 PBKDF2 hash
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 210000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `${salt}:${hash}:${iterations}`;
}

async function main() {
  console.log("🌱 Seeding live Supabase PostgreSQL database...\n");
  console.log(`✓ Project: ${supabaseUrl}`);

  const defaultHash = hashPassword("password123");
  const adminHash = hashPassword("admin123");

  const users = [
    {
      id: "a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d",
      user_id: "a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d",
      name: "Collably Admin",
      email: "admin@collably.io",
      role: "super_admin",
      verified: true,
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    },
    {
      id: "b2c3d4e5-f6a1-4b2c-9d3e-4f5a6b7c8d9e",
      user_id: "b2c3d4e5-f6a1-4b2c-9d3e-4f5a6b7c8d9e",
      name: "Marcus Vance",
      email: "marcus@collably.io",
      role: "creator",
      verified: true,
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    },
    {
      id: "c3d4e5f6-a1b2-4c3d-ae4f-5a6b7c8d9e0f",
      user_id: "c3d4e5f6-a1b2-4c3d-ae4f-5a6b7c8d9e0f",
      name: "Apex Cybernetics",
      email: "sponsor@apex.io",
      role: "brand_owner",
      verified: true,
      avatar_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    },
  ];

  for (const u of users) {
    const { error } = await supabase.from("profiles").upsert(u, { onConflict: "email" });
    if (error) {
      console.warn(`⚠️ Error seeding profile ${u.email}:`, error.message);
    } else {
      console.log(`✓ Seeded profile: ${u.email} (${u.role})`);
    }
  }

  console.log("\n✅ Supabase database successfully seeded with initial admin & demo profiles!");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
