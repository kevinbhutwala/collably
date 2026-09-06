import { NextRequest, NextResponse } from "next/server";
import { trendingService } from "@/server/services/trending.service";
import { TrendingFeedType, TimeframeWindow } from "@/core/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const feed = (searchParams.get("feed") as TrendingFeedType) || "trending_now";
    const timeframe = (searchParams.get("timeframe") as TimeframeWindow) || "7d";
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const data = trendingService.getTrendingFeed(feed, timeframe, limit);

    return NextResponse.json({
      success: true,
      feed,
      timeframe,
      ...data,
    });
  } catch (err: any) {
    console.error("Trending API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch trending feed" }, { status: 500 });
  }
}
