import { NextRequest, NextResponse } from "next/server";
import { paymentGuardian } from "@/server/services/payment-guardian.service";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized cron trigger" }, { status: 401 });
    }

    const report = await paymentGuardian.runWatchdog();
    return NextResponse.json({
      success: true,
      job: "payment_guardian_watchdog",
      report,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
