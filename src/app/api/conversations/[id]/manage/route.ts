import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();
    const conversationId = params.id;
    const userId = session?.userId || body.userId;

    if (!conversationId) {
      return NextResponse.json({ error: "Missing conversation ID" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    const { action } = body;

    if (action === "pin") {
      const isPinned = await messageRepo.togglePinConversation(conversationId, userId);
      return NextResponse.json({ success: true, isPinned, action: "pin" });
    }

    if (action === "mute") {
      const isMuted = await messageRepo.toggleMuteConversation(conversationId, userId);
      return NextResponse.json({ success: true, isMuted, action: "mute" });
    }

    return NextResponse.json({ error: "Invalid management action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to manage conversation" }, { status: 500 });
  }
}
