import { NextRequest, NextResponse } from "next/server";
import { exchangeRateService } from "@/server/services/exchange-rate.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const base = (searchParams.get("base") || "USD").toUpperCase();

    // Fetch live rates or retrieve cached rates
    const snapshot = await exchangeRateService.fetchLiveRates();
    const rates = base === "USD" ? snapshot.rates : exchangeRateService.getAllRates(base);

    return NextResponse.json({
      success: true,
      base,
      rates,
      timestamp: snapshot.timestamp,
      provider: snapshot.provider,
      isStale: snapshot.isStale,
    });
  } catch (error: any) {
    console.error("FX rates fetch error:", error);
    // Graceful fallback to snapshot
    const fallback = exchangeRateService.getSnapshot();
    return NextResponse.json({
      success: true,
      base: "USD",
      rates: fallback.rates,
      timestamp: fallback.timestamp,
      provider: fallback.provider,
      isStale: true,
    });
  }
}
