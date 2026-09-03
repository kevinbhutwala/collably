import { NextRequest, NextResponse } from "next/server";
import { slaAutoReleaseWorker } from "@/server/services/sla-worker.service";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // Verify cron authorization header if secret configured
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
    }

    const result = await slaAutoReleaseWorker.runAutoReleaseJob();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "SLA worker execution failed" },
      { status: 500 }
    );
  }
}
