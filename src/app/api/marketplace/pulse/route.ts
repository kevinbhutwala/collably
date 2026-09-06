import { NextRequest, NextResponse } from "next/server";
import { marketPulseService } from "@/server/services/market-pulse.service";
import { verifySessionToken } from "@/server/auth/crypto";
import { db } from "@/server/db/database";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let creatorId = searchParams.get("creatorId");

    if (!creatorId) {
      const token =
        req.cookies.get("abeycollab_session")?.value ||
        req.cookies.get("collably_session")?.value ||
        req.headers.get("authorization")?.replace("Bearer ", "");

      if (token) {
        const payload = verifySessionToken(token);
        if (payload?.userId) {
          const state = db.getState();
          const creator = state.creators.find((c) => c.userId === payload.userId);
          if (creator) {
            creatorId = creator.id;
          }
        }
      }
    }

    // Default to first creator in database if no authenticated creator
    if (!creatorId) {
      const state = db.getState();
      creatorId = state.creators[0]?.id || "creator-demo";
    }

    const pulse = marketPulseService.getCreatorMarketPulse(creatorId);

    return NextResponse.json({
      success: true,
      pulse,
    });
  } catch (err: any) {
    console.error("Market Pulse API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch market pulse" }, { status: 500 });
  }
}
