import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { SecurityService } from "@/server/services/security.service";
import { calculateTotalFollowers, calculateAvgEngagementRate, getCreatorTier } from "@/core/utils/social";

import { userRepo } from "@/server/repositories/user.repo";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rawId = params.id;
    const decodedId = decodeURIComponent(rawId);
    const creator =
      creatorRepo.getById(decodedId) ||
      creatorRepo.getById(rawId) ||
      creatorRepo.getByUserId(decodedId) ||
      creatorRepo.getByUserId(rawId);

    if (!creator) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }
    return NextResponse.json(creator);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const decodedId = decodeURIComponent(params.id);
    let existing =
      creatorRepo.getById(decodedId) ||
      creatorRepo.getById(params.id) ||
      creatorRepo.getByUserId(decodedId) ||
      creatorRepo.getByUserId(params.id);

    if (!existing && session.userId) {
      existing = creatorRepo.getByUserId(session.userId) || creatorRepo.getById(session.userId);
    }
    if (!existing && session.email) {
      existing = creatorRepo.getById(session.email);
    }

    const updates = await req.json();

    if (!existing) {
      const userRecord = userRepo.findById(session.userId) || userRepo.findByEmail(session.email);
      const name = userRecord?.name || session.email.split("@")[0] || "Creator";
      existing = creatorRepo.createCreator({
        userId: session.userId,
        email: session.email,
        fullName: name,
        handle: name.toLowerCase().replace(/[^a-zA-Z0-9_]/g, ""),
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

    // 2. IDOR Prevention: User must own the profile or be super_admin
    const isOwner =
      existing.userId === session.userId ||
      existing.id === session.userId ||
      (existing.email && existing.email.toLowerCase() === session.email.toLowerCase());
    const isAdmin = session.role === "super_admin" || session.role === "agency_admin";
    if (!isOwner && !isAdmin) {
      if (!existing.userId) {
        existing.userId = session.userId;
      } else {
        return NextResponse.json({ error: "Forbidden: You cannot modify another creator's profile" }, { status: 403 });
      }
    }

    // Auto-recalculate metrics if social accounts changed
    if (updates.socialAccounts && Array.isArray(updates.socialAccounts)) {
      updates.totalFollowers = calculateTotalFollowers(updates.socialAccounts);
      updates.avgEngagementRate = calculateAvgEngagementRate(updates.socialAccounts);
      updates.tier = getCreatorTier(updates.totalFollowers);
      updates.profileCompleteness = Math.min(100, 50 + updates.socialAccounts.length * 10);
    }

    const updated = creatorRepo.updateCreator(existing.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update creator" }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update creator" }, { status: 500 });
  }
}
