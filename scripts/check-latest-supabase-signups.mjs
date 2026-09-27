import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ldahukqddddeyaavhvss.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkYWh1a3FkZGRkZXlhYXZodnNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODE5MTI0NSwiZXhwIjoyMTAzNzY3MjQ1fQ.p0MhqWSRzUuSMzX01A-qmi0J4ExiDkcQs1HGQo75r2s";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function run() {
  // 1. Fetch latest auth users
  const { data: authData, error: authErr } = await supabase.auth.admin.listUsers({ perPage: 20, page: 1 });
  if (authErr) {
    console.log('Auth API error:', authErr.message);
  } else {
    const sorted = (authData?.users || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    console.log('\n=== Latest 8 Supabase Auth Users (production) ===');
    sorted.slice(0, 8).forEach((u, i) => {
      const meta = u.user_metadata || {};
      console.log(`${i + 1}. ${meta.name || meta.full_name || '(no name)'} | ${u.email} | role: ${meta.role || 'unknown'} | signed up: ${u.created_at}`);
    });
  }

  // 2. Fetch latest profiles
  const { data: profiles, error: profErr } = await supabase
    .from('profiles')
    .select('id, name, email, role, created_at, avatar_url, gender')
    .order('created_at', { ascending: false })
    .limit(8);

  if (profErr) {
    console.log('\nProfiles table error:', profErr.message);
  } else {
    console.log('\n=== Latest 8 Supabase Profiles ===');
    (profiles || []).forEach((p, i) => {
      console.log(`${i + 1}. ${p.name || '(no name)'} | ${p.email} | role: ${p.role} | gender: ${p.gender || 'n/a'} | signed up: ${p.created_at}`);
    });
  }
}

run().catch(console.error);
