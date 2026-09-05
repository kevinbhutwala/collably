import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.cookies.get("valence_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const user = userRepo.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const creatorProfile = user.role === "creator" ? creatorRepo.getByUserId(user.id) : null;
    const brandProfile = user.role === "brand" ? brandRepo.getByUserId(user.id) : null;
    const subscription = await subscriptionService.getUserSubscription(user.id, user.role);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        verified: user.verified,
      },
      creatorProfile,
      brandProfile,
      subscription,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

