import { NextResponse } from "next/server";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/server/db/supabase";
import { db } from "@/server/db/database";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "healthy (local typed fallback)";

  if (isSupabaseConfigured) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("profiles").select("count").limit(1);
      if (error) console.error("Database health check error:", error.message);
      dbStatus = error ? "degraded" : "healthy (Supabase PostgreSQL)";
    }
  } else {
    try {
      const state = db.getState();
      if (!state) dbStatus = "uninitialized";
    } catch {
      dbStatus = "error";
    }
  }

  const responseTimeMs = Date.now() - startTime;

  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      services: {
        database: dbStatus,
        paymentGateway: process.env.RAZORPAY_KEY_ID ? "configured (Razorpay)" : "fallback (sandbox mode)",
        emailService: process.env.RESEND_API_KEY ? "configured (Resend)" : "fallback (local simulation)",
        aiEngine: process.env.AI_API_KEY || process.env.OPENAI_API_KEY ? "configured (OpenAI/Gemini)" : "fallback (heuristic)",
      },
      responseTimeMs,
    },
    { status: 200 }
  );
}
