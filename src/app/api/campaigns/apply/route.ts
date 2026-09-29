import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";
import { z } from "zod";

const applySchema = z.object({
  campaignId: z.string().min(1),
  campaignTitle: z.string().optional(),
  brandId: z.string().optional(),
  brandName: z.string().optional(),
  pitch: z.string().min(5),
  proposedFee: z.number().positive(),
  sampleLinks: z.array(z.string()).optional(),
  portfolioSamples: z.array(z.string()).optional(),
  creatorId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required to apply" }, { status: 401 });
    }

    // 2. Enforce creator permission
    if (!SecurityService.hasPermission(session.role, "application.create")) {
      return NextResponse.json({ error: "Forbidden: Only creators can apply to campaign briefs" }, { status: 403 });
    }

    // 3. Enforce monthly application quota
    const { subscriptionService } = await import("@/server/services/subscription.service");
    const quota = await subscriptionService.checkApplicationQuota(session.userId);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: `Monthly application limit reached for ${quota.planName} (${quota.current}/${quota.limit} applications this month). Upgrade to Creator Pro for unlimited campaign pitches.`,
          code: "PLAN_QUOTA_EXCEEDED",
          limit: quota.limit,
          current: quota.current,
          planName: quota.planName,
          planId: quota.planId,
          requiredPlan: "creator_pro",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = applySchema.parse(body);

    const campaign = await campaignRepo.findById(parsed.campaignId);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    const creator = creatorRepo.getByUserId(session.userId) || creatorRepo.getById(parsed.creatorId || "");
    if (!creator) {
      return NextResponse.json(
        {
          error: "PROFILE_REQUIRED",
          message: "You must create your creator profile before applying to campaigns.",
          code: "CREATOR_PROFILE_NOT_FOUND",
        },
        { status: 422 }
      );
    }

    // 4. Enforce Strict Profile Completeness & Social Channel Verification
    const { checkCreatorProfileStatus } = await import("@/core/utils/profileCompleteness");
    const profileStatus = checkCreatorProfileStatus(creator);
    if (!profileStatus.canApplyToCampaigns) {
      return NextResponse.json(
        {
          error: "PROFILE_INCOMPLETE",
          headline: profileStatus.headline,
          message: profileStatus.summary,
          missingRequirements: profileStatus.missingRequirements,
          unverifiedSocials: profileStatus.unverifiedSocials,
          code: "PROFILE_INCOMPLETE_OR_UNVERIFIED",
        },
        { status: 422 }
      );
    }

    // 5. Enforce Bidirectional Pre-flight Eligibility Check
    const { eligibilityService } = await import("@/server/services/eligibility.service");
    const eligibility = eligibilityService.verifyCreatorForCampaign(creator, campaign, {
      proposedFee: parsed.proposedFee,
    });

    if (!eligibility.eligible) {
      return NextResponse.json(
        {
          error: eligibility.headline,
          message: eligibility.summary,
          code: "PREFLIGHT_ELIGIBILITY_FAILED",
          report: eligibility,
        },
        { status: 422 }
      );
    }

    const app = campaignRepo.createApplication({
      ...parsed,
      sampleLinks: parsed.sampleLinks || parsed.portfolioSamples || [],
      creatorId: creator?.id || "creator-1",
      creator: creator || ({ fullName: session.email.split("@")[0] } as any),
    });

    // Record usage
    await subscriptionService.recordUsage(session.userId, "applicationsThisMonth", 1);

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: creator?.fullName || session.email,
      actorRole: session.role,
      action: "CAMPAIGN_APPLICATION_SUBMITTED",
      entityType: "Campaign",
      entityId: parsed.campaignId,
      entityName: parsed.pitch.slice(0, 50),
    });

    return NextResponse.json(app, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit application" }, { status: 400 });
  }
}

