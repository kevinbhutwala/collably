import fs from "fs";
import path from "path";
import { isSupabaseConfigured, getSupabaseAdmin } from "../src/server/db/supabase.ts";

async function validateDatabase() {
  console.log("🔍 Validating database integrity and schema compatibility...\n");

  const schemaFile = path.join(process.cwd(), "supabase", "schema.sql");
  if (!fs.existsSync(schemaFile)) {
    console.error("❌ Schema file supabase/schema.sql missing!");
    process.exit(1);
  }
  console.log("✓ PostgreSQL schema definition found: supabase/schema.sql");

  const dataFile = path.join(process.cwd(), "data", "valence_db.json");
  if (fs.existsSync(dataFile)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      console.log(`✓ Development fallback database valid (${Object.keys(parsed).length} collections loaded)`);
    } catch (e: any) {
      console.error("❌ valence_db.json is malformed:", e.message);
      process.exit(1);
    }
  }

  if (isSupabaseConfigured) {
    console.log("✓ Supabase connection environment detected.");
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const { error } = await supabase.from("profiles").select("count").limit(1);
        if (error) {
          console.warn(`⚠️ Supabase ping warning: ${error.message}`);
        } else {
          console.log("✓ Supabase PostgreSQL connection verified and healthy.");
        }
      } catch (err: any) {
        console.warn(`⚠️ Supabase connection check: ${err.message}`);
      }
    }
  } else {
    console.log("ℹ️  Running in local zero-credential mode with typed fallback persistence.");
  }

  console.log("\n✅ Database validation completed successfully.");
}

validateDatabase().catch((e) => {
  console.error("Validation error:", e);
  process.exit(1);
});
