import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

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
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required to send messages" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.conversationId || !body.content) {
      return NextResponse.json({ error: "Missing required message parameters (conversationId, content)" }, { status: 400 });
    }

    // Sender identity is strictly derived from verified session token
    const message = await messageRepo.createMessage({
      conversationId: body.conversationId,
      senderId: session.userId,
      senderRole: session.role,
      senderName: body.senderName || session.email.split("@")[0],
      senderAvatar: body.senderAvatar || "",
      content: body.content,
      attachments: body.attachments || [],
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 400 });
  }
}
