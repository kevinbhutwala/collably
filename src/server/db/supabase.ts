import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));

let _supabaseClient: SupabaseClient | null = null;
let _supabaseAdminClient: SupabaseClient | null = null;

/**
 * Get standard client (for public/anon operations)
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_supabaseClient) {
    _supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return _supabaseClient;
}

/**
 * Get server-side admin client (bypasses RLS for secure backend services)
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!_supabaseAdminClient) {
    _supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return _supabaseAdminClient;
}
