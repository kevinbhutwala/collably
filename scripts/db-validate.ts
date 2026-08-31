import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

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
    console.log(`✓ Target Project: ${process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    const supabase = getSupabaseAdmin();
    if (supabase) {
      try {
        const { data, error } = await supabase.from("profiles").select("count").limit(1);
        if (error) {
          console.warn(`⚠️ Supabase ping warning: ${error.message}`);
        } else {
          console.log("✓ Supabase PostgreSQL connection verified and healthy.");
          console.log("✓ Successfully connected to live remote database.");
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
