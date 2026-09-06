import { NextRequest, NextResponse } from "next/server";
import { marketPulseService } from "@/server/services/market-pulse.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;

    const intelligence = marketPulseService.getBrandMarketIntelligence(category);

    return NextResponse.json({
      success: true,
      intelligence,
    });
  } catch (err: any) {
    console.error("Brand Intelligence API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch brand intelligence" }, { status: 500 });
  }
}
