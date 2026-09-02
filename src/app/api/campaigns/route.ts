import { NextRequest, NextResponse } from "next/server";
import { campaignRepo } from "@/server/repositories/campaign.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";
import { z } from "zod";

const createCampaignSchema = z.object({
  title: z.string().min(3),
  tagline: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(1),
  brandId: z.string().optional(),
  budget: z.object({
    totalBudget: z.number().positive(),
    perCreatorBudget: z.number().positive(),
    currency: z.literal("USD").or(z.literal("INR")).default("USD"),
    paymentTerms: z.string().default("100_escrow_on_approval"),
  }).optional(),
  maxCreators: z.number().int().positive().default(5),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") as any || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;

    const campaigns = campaignRepo.getAll({
      category,
      status,
      searchQuery,
    });

    return NextResponse.json(campaigns);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required to create campaigns" }, { status: 401 });
    }

    // 2. Enforce brand role
    if (!SecurityService.hasPermission(session.role, "campaign.create")) {
      return NextResponse.json({ error: "Forbidden: Only brands or admins can create campaigns" }, { status: 403 });
    }

    // 3. Enforce subscription plan campaign quota
    const { subscriptionService } = await import("@/server/services/subscription.service");
    const brand = brandRepo.getByUserId(session.userId);
    const existingCampaigns = brand ? campaignRepo.getByBrandId(brand.id) : [];
    const activeCampaignsCount = existingCampaigns.filter((c: any) => c.status === "active" || c.status === "applications_open").length;


    const quota = await subscriptionService.checkCampaignQuota(session.userId, activeCampaignsCount);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: `Campaign limit reached for ${quota.planName} (${quota.current}/${quota.limit} active campaigns). Please upgrade your plan to launch more campaigns.`,
          code: "PLAN_QUOTA_EXCEEDED",
          limit: quota.limit,
          current: quota.current,
          planName: quota.planName,
          planId: quota.planId,
          requiredPlan: quota.limit === 2 ? "brand_growth" : "brand_enterprise",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = createCampaignSchema.parse(body);

    const targetBrand = brand || brandRepo.getById(parsed.brandId || "");

    const newCampaign = campaignRepo.createCampaign({
      ...body,
      brandId: targetBrand?.id || "brand-1",
      brand: targetBrand || { companyName: session.email.split("@")[0] },
    });

    // Record usage
    await subscriptionService.recordUsage(session.userId, "activeCampaignsCount", 1);

    // Record audit event
    auditRepo.logEvent({
      actorId: session.userId,
      actorName: targetBrand?.companyName || session.email,
      actorRole: session.role,
      action: "CAMPAIGN_CREATED",
      entityType: "Campaign",
      entityId: newCampaign.id,
      entityName: newCampaign.title,
      metadata: { budget: newCampaign.budget?.totalBudget },
    });

    return NextResponse.json(newCampaign, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create campaign" }, { status: 400 });
  }
}

