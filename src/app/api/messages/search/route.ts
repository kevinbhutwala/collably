import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const conversationId = searchParams.get("conversationId") || undefined;
    const userId = session?.userId || searchParams.get("userId") || undefined;

    if (!query.trim()) {
      return NextResponse.json({ messages: [], total: 0 });
    }

    const messages = await messageRepo.searchMessages(query, userId, conversationId);
    return NextResponse.json({ messages, total: messages.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to search messages" }, { status: 500 });
  }
}
