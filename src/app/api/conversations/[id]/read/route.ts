import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = SecurityService.getSession(req);
    const conversationId = params.id;
    const body = await req.json().catch(() => ({}));
    const userId = session?.userId || body.userId || "user-creator";

    await messageRepo.markConversationAsRead(conversationId, userId);
    return NextResponse.json({ success: true, conversationId, readBy: userId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to mark as read" }, { status: 500 });
  }
}
