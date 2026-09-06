import { NextRequest, NextResponse } from "next/server";
import { matchEngineService } from "@/server/services/match-engine.service";
import { db } from "@/server/db/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { campaignId, creatorId, queryText, limit } = body;

    // Mode 1: Natural Language Brief Search
    if (queryText) {
      const parsed = matchEngineService.parseBriefQuery(queryText);
      const results = matchEngineService.searchCreatorsWithParsedBrief(parsed, limit || 15);
      return NextResponse.json({
        success: true,
        mode: "natural_search",
        parsedBrief: parsed,
        results,
      });
    }

    // Mode 2: Specific Creator-Campaign Match Score
    if (campaignId && creatorId) {
      const state = db.getState();
      const creator = state.creators.find((c) => c.id === creatorId || c.userId === creatorId);
      const campaign = state.campaigns.find((c) => c.id === campaignId);

      if (!creator) {
        return NextResponse.json({ error: "Creator not found" }, { status: 404 });
      }
      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }

      const matchResult = matchEngineService.calculateMatch(creator, campaign);
      return NextResponse.json({
        success: true,
        mode: "direct_match",
        creator,
        campaign,
        matchResult,
      });
    }

    return NextResponse.json(
      { error: "Provide either queryText or (campaignId and creatorId)" },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("Match Engine API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to calculate match" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId");
    const creatorId = searchParams.get("creatorId");
    const query = searchParams.get("q");

    if (query) {
      const parsed = matchEngineService.parseBriefQuery(query);
      const results = matchEngineService.searchCreatorsWithParsedBrief(parsed, 15);
      return NextResponse.json({
        success: true,
        mode: "natural_search",
        parsedBrief: parsed,
        results,
      });
    }

    if (campaignId && creatorId) {
      const state = db.getState();
      const creator = state.creators.find((c) => c.id === creatorId || c.userId === creatorId);
      const campaign = state.campaigns.find((c) => c.id === campaignId);

      if (!creator || !campaign) {
        return NextResponse.json({ error: "Creator or Campaign not found" }, { status: 404 });
      }

      const matchResult = matchEngineService.calculateMatch(creator, campaign);
      return NextResponse.json({
        success: true,
        mode: "direct_match",
        creator,
        campaign,
        matchResult,
      });
    }

    return NextResponse.json(
      { error: "Provide either q query parameter or campaignId & creatorId" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error processing match" }, { status: 500 });
  }
}
