import { NextRequest, NextResponse } from "next/server";
import { eligibilityService } from "@/server/services/eligibility.service";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();
    const {
      direction = "creator_to_campaign",
      campaignId,
      creatorId,
      brandId,
      proposedFee,
      totalAgreedBudget,
      deliverableType,
    } = body;

    if (direction === "creator_to_campaign") {
      if (!campaignId) {
        return NextResponse.json({ error: "Missing campaignId" }, { status: 400 });
      }

      const campaign = await campaignRepo.findById(campaignId);
      if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
      }

      const targetCreatorId =
        creatorId ||
        (session ? creatorRepo.getByUserId(session.userId)?.id : undefined) ||
        creatorRepo.getAll()[0]?.id;

      const creator = targetCreatorId ? await creatorRepo.findById(targetCreatorId) : null;
      if (!creator) {
        return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
      }

      const report = eligibilityService.verifyCreatorForCampaign(creator, campaign, {
        proposedFee: Number(proposedFee) || undefined,
      });

      return NextResponse.json(report);
    } else {
      // brand_to_creator
      if (!creatorId) {
        return NextResponse.json({ error: "Missing creatorId" }, { status: 400 });
      }

      const creator = await creatorRepo.findById(creatorId);
      if (!creator) {
        return NextResponse.json({ error: "Creator not found" }, { status: 404 });
      }

      const targetBrandId =
        brandId ||
        (session ? brandRepo.getByUserId(session.userId)?.id : undefined) ||
        brandRepo.getAll()[0]?.id;

      const brand = targetBrandId ? await brandRepo.findById(targetBrandId) : null;
      if (!brand) {
        return NextResponse.json({ error: "Brand profile not found" }, { status: 404 });
      }

      const report = eligibilityService.verifyBrandForCreator(brand, creator, {
        totalAgreedBudget: Number(totalAgreedBudget) || undefined,
        deliverableType,
      });

      return NextResponse.json(report);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to run eligibility verification";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
