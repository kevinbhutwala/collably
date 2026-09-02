import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://ldahukqddddeyaavhvss.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

let browserClient: SupabaseClient | null = null;

/**
 * Browser-safe Supabase client for client-side OAuth (Google, Apple, etc.)
 */
export function getBrowserSupabase(): SupabaseClient {
  if (typeof window === "undefined") {
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}
