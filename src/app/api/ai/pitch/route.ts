import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/server/services/ai.service";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { z } from "zod";

const pitchSchema = z.object({
  creatorId: z.string().min(1),
  campaignId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = pitchSchema.parse(body);

    const creator = await creatorRepo.findById(parsed.creatorId);
    if (!creator) return NextResponse.json({ error: "Creator not found" }, { status: 404 });

    const campaign = await campaignRepo.findById(parsed.campaignId);
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });

    const pitch = await aiService.generateCreatorPitch(creator, campaign);
    return NextResponse.json({ pitch });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate AI pitch" }, { status: 400 });
  }
}
