import { NextRequest, NextResponse } from "next/server";
import { trendingService } from "@/server/services/trending.service";
import { db } from "@/server/db/database";
import { TimeframeWindow, LeaderboardEntry, PlatformType } from "@/core/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
    const platform = searchParams.get("platform") as PlatformType || undefined;
    const followerTier = searchParams.get("tier") || undefined;
    const timeframe = (searchParams.get("timeframe") as TimeframeWindow) || "7d";
    const limit = parseInt(searchParams.get("limit") || "25", 10);

    const state = db.getState();
    let creators = state.creators || [];

    // Filter by Category
    if (category && category !== "All") {
      creators = creators.filter(
        (c) => c.primaryCategory === category || c.secondaryCategories?.includes(category as any)
      );
    }

    // Filter by Location
    if (location && location !== "All") {
      creators = creators.filter((c) =>
        c.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by Platform
    if (platform) {
      creators = creators.filter((c) =>
        (c.socialAccounts || []).some((s) => s.platform === platform)
      );
    }

    // Filter by Follower Tier
    if (followerTier && followerTier !== "All") {
      creators = creators.filter((c) => {
        const f = c.totalFollowers;
        if (followerTier === "Nano") return f < 10000;
        if (followerTier === "Micro") return f >= 10000 && f < 50000;
        if (followerTier === "Mid-Tier") return f >= 50000 && f < 250000;
        if (followerTier === "Macro") return f >= 250000 && f < 1000000;
        if (followerTier === "Elite") return f >= 1000000;
        return true;
      });
    }

    // Score and rank remaining creators
    const scoredList = creators.map((creator) => {
      const trendingScore = trendingService.calculateCreatorScore(creator, timeframe);
      return {
        creator,
        trendingScore: trendingScore.overallScore,
        engagementRate: creator.avgEngagementRate,
        completedDeals: creator.completedCampaignsCount || 0,
        rating: creator.rating || 4.8,
        badges: trendingScore.badges,
        growthRate: Number((trendingScore.recentMetrics.views7d * 0.4 + creator.avgEngagementRate * 2.1).toFixed(1)),
      };
    });

    // Sort by Trending Score descending
    scoredList.sort((a, b) => b.trendingScore - a.trendingScore);

    // Assign 1-indexed ranks
    const leaderboard: LeaderboardEntry[] = scoredList.slice(0, limit).map((item, idx) => ({
      rank: idx + 1,
      ...item,
    }));

    return NextResponse.json({
      success: true,
      timeframe,
      filters: { category, location, platform, followerTier },
      totalFound: scoredList.length,
      leaderboard,
    });
  } catch (err: any) {
    console.error("Leaderboards API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch leaderboard" }, { status: 500 });
  }
}
