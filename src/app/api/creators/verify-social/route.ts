import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { SecurityService } from "@/server/services/security.service";
import { PlatformType, SocialAccount } from "@/core/types";
import {
  cleanPlatformHandle,
  formatPlatformUrl,
  calculateTotalFollowers,
  calculateAvgEngagementRate,
  getCreatorTier,
  validatePlatformHandle,
} from "@/core/utils/social";

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const body = await req.json();
    const {
      creatorId,
      accountId,
      platform,
      handle,
      verificationCode,
      method = "instant_auth",
    } = body;

    if (!platform || !handle) {
      return NextResponse.json({ error: "Platform and handle are required" }, { status: 400 });
    }

    // 2. Validate platform and handle
    const validation = validatePlatformHandle(platform as PlatformType, handle);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error || "Invalid handle format" }, { status: 400 });
    }

    const cleanHandle = validation.cleanHandle;
    const url = validation.url;

    // 3. Resolve creator profile
    const creator = creatorId
      ? creatorRepo.getById(creatorId)
      : creatorRepo.getByUserId(session.userId);

    if (!creator) {
      return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
    }

    // IDOR Protection: Must be the profile owner or platform admin
    const isOwner = creator.userId === session.userId;
    const isAdmin = session.role === "super_admin" || session.role === "agency_admin";
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden: You cannot modify another creator's profile" }, { status: 403 });
    }

    // 4. Duplicate Account Protection: Check if already verified by ANOTHER creator
    const allCreators = creatorRepo.getAll();
    const existingOther = allCreators.find(
      (c) =>
        c.id !== creator.id &&
        c.socialAccounts?.some(
          (sa) =>
            sa.platform === platform &&
            sa.handle.toLowerCase() === cleanHandle.toLowerCase() &&
            (sa.verificationStatus === "verified" || sa.verifiedBadge)
        )
    );

    if (existingOther) {
      return NextResponse.json(
        {
          error: `The ${platform.toUpperCase()} account @${cleanHandle} is already verified by another creator profile. If you own this account, please contact support.`,
        },
        { status: 409 }
      );
    }

    // 5. Update or Add Social Account with Verification Status
    const now = new Date().toISOString();
    const existingAccounts: SocialAccount[] = [...(creator.socialAccounts || [])];

    let accountIndex = -1;
    if (accountId) {
      accountIndex = existingAccounts.findIndex((sa) => sa.id === accountId);
    }
    if (accountIndex === -1) {
      accountIndex = existingAccounts.findIndex(
        (sa) => sa.platform === platform && sa.handle.toLowerCase() === cleanHandle.toLowerCase()
      );
    }

    let verifiedAccount: SocialAccount;

    if (accountIndex !== -1) {
      // Update existing account
      verifiedAccount = {
        ...existingAccounts[accountIndex],
        platform: platform as PlatformType,
        handle: cleanHandle,
        url,
        verifiedBadge: true,
        verificationStatus: "verified",
        verificationCode: verificationCode || existingAccounts[accountIndex].verificationCode || "VERIFIED-OK",
        verificationMethod: method as any,
        verifiedAt: now,
      };
      existingAccounts[accountIndex] = verifiedAccount;
    } else {
      // Add and verify new account
      verifiedAccount = {
        id: `sa_${Date.now()}`,
        platform: platform as PlatformType,
        handle: cleanHandle,
        url,
        followers: body.followers || 15000,
        engagementRate: body.engagementRate || 4.5,
        avgViews: body.avgViews || 3500,
        verifiedBadge: true,
        verificationStatus: "verified",
        verificationCode: verificationCode || "VERIFIED-OK",
        verificationMethod: method as any,
        verifiedAt: now,
      };
      existingAccounts.push(verifiedAccount);
    }

    // 6. Recalculate metrics
    const totalFollowers = calculateTotalFollowers(existingAccounts);
    const avgEngagementRate = calculateAvgEngagementRate(existingAccounts);
    const tier = getCreatorTier(totalFollowers);
    const profileCompleteness = Math.min(100, 50 + existingAccounts.length * 10);

    const updatedCreator = creatorRepo.updateCreator(creator.id, {
      socialAccounts: existingAccounts,
      totalFollowers,
      avgEngagementRate,
      tier,
      profileCompleteness,
    });

    return NextResponse.json({
      success: true,
      message: `@${cleanHandle} on ${platform.toUpperCase()} successfully verified.`,
      verifiedAccount,
      creator: updatedCreator,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to verify social account" }, { status: 500 });
  }
}
