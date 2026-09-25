import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { verified, role } = body;

    let targetUser = userRepo.findById(id);

    // If not found directly by user id, check if it's a creator or brand id
    if (!targetUser) {
      const creator = creatorRepo.getById(id) || creatorRepo.getByUserId(id);
      if (creator && creator.userId) {
        targetUser = userRepo.findById(creator.userId);
      }
    }

    if (targetUser) {
      const updates: any = {};
      if (typeof verified === "boolean") updates.verified = verified;
      if (role) updates.role = role;

      userRepo.updateUser(targetUser.id, updates);
    }

    // Also update matching creator or brand if applicable
    const creator = creatorRepo.getById(id) || (targetUser ? creatorRepo.getByUserId(targetUser.id) : undefined);
    if (creator && typeof verified === "boolean") {
      creatorRepo.updateCreator(creator.id, { verified });
    }

    const brand = brandRepo.getById(id) || (targetUser ? brandRepo.getByUserId(targetUser.id) : undefined);
    if (brand && typeof verified === "boolean") {
      brandRepo.updateBrand(brand.id, { verified });
    }

    // Log admin audit action
    auditRepo.logEvent({
      action: "ADMIN_USER_STATUS_CHANGE",
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      entityType: "PlatformSettings",
      entityId: id,
      entityName: targetUser?.name || id,
      metadata: {
        verified,
        role,
        updatedBy: session.email,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${id} updated successfully`,
      verified,
    });
  } catch (err: any) {
    console.error("User update error:", err);
    return NextResponse.json({ error: err.message || "Failed to update user" }, { status: 500 });
  }
}
