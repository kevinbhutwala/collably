import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);

    // Admin role verification
    if (session && session.role !== "agency_admin" && session.role !== "super_admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const overview = await messageRepo.getAdminSupervisionOverview();
    return NextResponse.json({ success: true, ...overview });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch communications overview" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);

    if (session && session.role !== "agency_admin" && session.role !== "super_admin") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { conversationId, content, noticeType } = body;

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Missing conversationId or content" }, { status: 400 });
    }

    const message = await messageRepo.createMessage({
      conversationId,
      senderId: "user-admin",
      senderRole: "agency_admin",
      senderName: "AbeyCollab Trust & Safety",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      content: noticeType ? `🛡️ [OFFICIAL PLATFORM NOTICE]: ${content}` : content,
      attachments: [],
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to issue administrative notice" }, { status: 500 });
  }
}
