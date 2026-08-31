import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const campaign = campaignRepo.getById(params.id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }
    return NextResponse.json(campaign);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
