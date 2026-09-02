import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";
import { z } from "zod";

const applySchema = z.object({
  campaignId: z.string().min(1),
  pitch: z.string().min(10),
  proposedFee: z.number().positive(),
  sampleLinks: z.array(z.string()).optional(),
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

    const creator = creatorRepo.getByUserId(session.userId) || creatorRepo.getById(body.creatorId || "");

    const app = campaignRepo.createApplication({
      ...body,
      creatorId: creator?.id || "creator-1",
      creator: creator || { fullName: session.email.split("@")[0] },
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

