import { NextRequest, NextResponse } from "next/server";
import { notificationService } from "@/server/services/notification.service";
import { SecurityService } from "@/server/services/security.service";

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();
    const userId = session?.userId || body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    if (body.all) {
      await notificationService.markAllAsRead(userId);
    } else if (body.id) {
      await notificationService.markAsRead(body.id, userId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to mark notifications read" }, { status: 400 });
  }
}
