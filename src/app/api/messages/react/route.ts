import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();

    const { messageId, emoji } = body;
    if (!messageId || !emoji) {
      return NextResponse.json({ error: "messageId and emoji are required" }, { status: 400 });
    }

    const userId = session?.userId || body.userId || "user-creator";
    const updatedMessage = await messageRepo.toggleReaction(messageId, emoji, userId);

    if (!updatedMessage) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to toggle reaction" }, { status: 500 });
  }
}
