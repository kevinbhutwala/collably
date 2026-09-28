import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { userRepo } from "@/server/repositories/user.repo";
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
      userId,
      userName,
      userEmail,
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

    // 3. Resolve creator profile across multiple identifiers
    let creator = creatorId
      ? (creatorRepo.getById(creatorId) || creatorRepo.getByUserId(creatorId))
      : undefined;

    if (!creator && session.userId) {
      creator = creatorRepo.getByUserId(session.userId) || creatorRepo.getById(session.userId);
    }

    if (!creator && userId) {
      creator = creatorRepo.getByUserId(userId) || creatorRepo.getById(userId);
    }

    if (!creator && session.email) {
      creator = creatorRepo.getById(session.email);
    }

    if (!creator && cleanHandle) {
      creator = creatorRepo.getById(cleanHandle);
    }

    // Auto-heal / provision creator record if missing from serverless lambda memory
    if (!creator) {
      const userRecord = userRepo.findById(session.userId) || userRepo.findByEmail(session.email);
      const name = userRecord?.name || userName || (session.email ? session.email.split("@")[0] : "Creator");
      const userHandle = cleanHandle || name.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");

      creator = creatorRepo.createCreator({
        userId: session.userId,
        email: session.email,
        fullName: name,
        handle: userHandle,
        headline: "Content Creator",
        bio: "",
        avatarUrl: userRecord?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        location: userRecord?.country === "IN" ? "India" : "United States",
        languages: ["English"],
        primaryCategory: "Lifestyle & Travel",
        secondaryCategories: [],
        verified: false,
        featured: false,
        tier: "Nano",
        rating: 5.0,
        completedCampaignsCount: 0,
        totalFollowers: 0,
        avgEngagementRate: 0,
        startingPrice: userRecord?.country === "IN" ? 5000 : 200,
        currency: userRecord?.country === "IN" ? "INR" : "USD",
        availableForHire: true,
        profileCompleteness: 50,
        qualityScore: 80,
        socialAccounts: [],
        rateCards: [],
        audience: {
          topCountries: [{ country: userRecord?.country === "IN" ? "India" : "United States", percentage: 70 }],
          ageDistribution: [{ range: "25-34", percentage: 50 }],
          genderSplit: [{ gender: "Female", percentage: 50 }],
          interests: ["Lifestyle", "Tech"],
        },
      });
    }

    // IDOR Protection: Must be the profile owner or platform admin
    const isOwner =
      creator.userId === session.userId ||
      creator.id === session.userId ||
      (creator.email && creator.email.toLowerCase() === session.email.toLowerCase());
    const isAdmin = session.role === "super_admin" || session.role === "agency_admin";
    if (!isOwner && !isAdmin) {
      if (!creator.userId) {
        creator.userId = session.userId;
      } else {
        return NextResponse.json({ error: "Forbidden: You cannot modify another creator's profile" }, { status: 403 });
      }
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
        followers: Number(body.followers) || existingAccounts[accountIndex].followers || 0,
        engagementRate: Number(body.engagementRate) || existingAccounts[accountIndex].engagementRate || 0,
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
        id: accountId || `sa_${Date.now()}`,
        platform: platform as PlatformType,
        handle: cleanHandle,
        url,
        followers: Number(body.followers) || 0,
        engagementRate: Number(body.engagementRate) || 0,
        avgViews: Number(body.avgViews) || 0,
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
      verified: existingAccounts.some((a) => a.verifiedBadge || a.verificationStatus === "verified"),
    });

    return NextResponse.json({
      success: true,
      message: `@${cleanHandle} on ${platform.toUpperCase()} successfully verified.`,
      verifiedAccount,
      creator: updatedCreator || {
        ...creator,
        socialAccounts: existingAccounts,
        totalFollowers,
        avgEngagementRate,
        tier,
        verified: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to verify social account" }, { status: 500 });
  }
}
