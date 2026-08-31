import { NextRequest, NextResponse } from "next/server";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { SecurityService } from "@/server/services/security.service";
import { calculateTotalFollowers, calculateAvgEngagementRate, getCreatorTier } from "@/core/utils/social";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const creator = creatorRepo.getById(params.id);
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

    const existing = creatorRepo.getById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    // 2. IDOR Prevention: User must own the profile or be super_admin
    const isOwner = existing.userId === session.userId;
    const isAdmin = session.role === "super_admin" || session.role === "agency_admin";
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden: You cannot modify another creator's profile" }, { status: 403 });
    }

    const updates = await req.json();

    // Auto-recalculate metrics if social accounts changed
    if (updates.socialAccounts && Array.isArray(updates.socialAccounts)) {
      updates.totalFollowers = calculateTotalFollowers(updates.socialAccounts);
      updates.avgEngagementRate = calculateAvgEngagementRate(updates.socialAccounts);
      updates.tier = getCreatorTier(updates.totalFollowers);
      updates.profileCompleteness = Math.min(100, 50 + updates.socialAccounts.length * 10);
    }

    const updated = creatorRepo.updateCreator(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update creator" }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update creator" }, { status: 500 });
  }
}
