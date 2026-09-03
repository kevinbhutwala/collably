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

    if (!body.conversationId || !body.content) {
      return NextResponse.json({ error: "Missing required message parameters (conversationId, content)" }, { status: 400 });
    }

    if (!session && !body.senderId) {
      return NextResponse.json({ error: "Authentication required to send messages" }, { status: 401 });
    }

    const senderId = session?.userId || body.senderId;
    const senderRole = session?.role || body.senderRole || "creator";
    const senderName = body.senderName || (session?.email ? session.email.split("@")[0] : "Collaborator");
    const senderAvatar = body.senderAvatar || (senderRole === "creator" ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80");

    const message = await messageRepo.createMessage({
      conversationId: body.conversationId,
      senderId,
      senderRole,
      senderName,
      senderAvatar,
      content: body.content,
      attachments: body.attachments || [],
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 400 });
  }
}
