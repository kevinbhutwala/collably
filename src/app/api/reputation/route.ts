import { NextRequest, NextResponse } from "next/server";
import { reputationService } from "@/server/services/reputation.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "creator";
    const id = searchParams.get("id") || "";

    if (type === "brand") {
      const data = reputationService.getBrandReputation(id);
      return NextResponse.json({ success: true, type: "brand", reputation: data });
    }

    const data = reputationService.getCreatorReputation(id);
    return NextResponse.json({ success: true, type: "creator", reputation: data });
  } catch (err: any) {
    console.error("Reputation API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch reputation" }, { status: 500 });
  }
}
