import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db/database";
import { verifySessionToken } from "@/server/auth/crypto";
import { userRepo } from "@/server/repositories/user.repo";
import { DEFAULT_ALGORITHM_CONFIG } from "@/server/db/seed";
import { AlgorithmWeightsConfig } from "@/core/types";

function checkAdminAuth(req: NextRequest): boolean {
  const token =
    req.cookies.get("abeycollab_session")?.value ||
    req.cookies.get("collably_session")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return false;
  const payload = verifySessionToken(token);
  if (!payload) return false;

  const user = userRepo.findById(payload.userId);
  if (!user) return false;

  return (
    user.role === "agency_admin" ||
    user.role === "agency_owner" ||
    user.role === "super_admin"
  );
}

export async function GET(req: NextRequest) {
  try {
    const isAdmin = checkAdminAuth(req);
    // Allow reading config for UI display, or require admin for mutations
    const state = db.getState();
    const config = state.algorithmConfig || DEFAULT_ALGORITHM_CONFIG;
    const suspiciousActivities = state.suspiciousActivities || [];

    return NextResponse.json({
      success: true,
      config,
      suspiciousActivities: isAdmin ? suspiciousActivities : [],
      isAdmin,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch config" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const isAdmin = checkAdminAuth(req);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 403 });
    }

    const body = await req.json();
    const updatedConfig: AlgorithmWeightsConfig = {
      id: "algo-config-current",
      creatorWeights: {
        ...DEFAULT_ALGORITHM_CONFIG.creatorWeights,
        ...(body.creatorWeights || {}),
      },
      campaignWeights: {
        ...DEFAULT_ALGORITHM_CONFIG.campaignWeights,
        ...(body.campaignWeights || {}),
      },
      risingCriteria: {
        ...DEFAULT_ALGORITHM_CONFIG.risingCriteria,
        ...(body.risingCriteria || {}),
      },
      badgeThresholds: {
        ...DEFAULT_ALGORITHM_CONFIG.badgeThresholds,
        ...(body.badgeThresholds || {}),
      },
      updatedAt: new Date().toISOString(),
    };

    db.updateState((s) => {
      s.algorithmConfig = updatedConfig;
    });

    return NextResponse.json({
      success: true,
      message: "Algorithm configuration updated successfully",
      config: updatedConfig,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update configuration" }, { status: 500 });
  }
}
