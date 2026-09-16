import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/database";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";
import { FeatureFlagConfig } from "@/core/types";

export const dynamic = "force-dynamic";

const DEFAULT_FEATURE_FLAGS: FeatureFlagConfig = {
  ai_matching: true,
  ai_assistant: false,
  payments_escrow: true,
  creator_verification: true,
  timecoded_video_review: true,
  dispute_management: true,
  advanced_analytics: true,
};

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const flags = db.getState().featureFlags || DEFAULT_FEATURE_FLAGS;
    return NextResponse.json({ success: true, flags });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch feature flags" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Only administrators can modify global feature flags" }, { status: 403 });
    }

    const updates = await req.json();
    let updatedFlags: FeatureFlagConfig = DEFAULT_FEATURE_FLAGS;

    db.updateState((state) => {
      const current = state.featureFlags || DEFAULT_FEATURE_FLAGS;
      state.featureFlags = {
        ...current,
        ...updates,
      };
      updatedFlags = state.featureFlags || DEFAULT_FEATURE_FLAGS;
    });

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      action: "FEATURE_FLAGS_UPDATED",
      entityType: "PlatformSettings",
      entityId: "global_feature_flags",
      entityName: "Global Feature Flags",
      metadata: { updates, newFlags: updatedFlags },
    });

    return NextResponse.json({ success: true, flags: updatedFlags });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update feature flags" }, { status: 500 });
  }
}
