import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
    }

    const messages = await messageRepo.getMessages(conversationId);
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();

    const senderId = session?.userId || body.senderId;
    if (!senderId || !body.conversationId || !body.content) {
      return NextResponse.json({ error: "Missing required message parameters" }, { status: 400 });
    }

    const message = await messageRepo.createMessage({
      conversationId: body.conversationId,
      senderId,
      senderRole: body.senderRole || session?.role || "creator",
      senderName: body.senderName || "User",
      senderAvatar: body.senderAvatar || "",
      content: body.content,
      attachments: body.attachments || [],
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 400 });
  }
}
