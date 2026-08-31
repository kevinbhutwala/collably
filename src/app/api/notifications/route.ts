import { NextRequest, NextResponse } from "next/server";
import { notificationService } from "@/server/services/notification.service";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const { searchParams } = new URL(req.url);
    const userId = session?.userId || searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ notifications: [] });
    }

    const notifications = await notificationService.getNotifications(userId);
    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch notifications" }, { status: 500 });
  }
}
