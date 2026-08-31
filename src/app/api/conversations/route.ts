import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const { searchParams } = new URL(req.url);
    const userId = session?.userId || searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ conversations: [] });
    }

    const conversations = await messageRepo.getConversations(userId);
    return NextResponse.json({ conversations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch conversations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const conv = await messageRepo.createConversation({
      campaignId: body.campaignId,
      campaignTitle: body.campaignTitle || "Campaign Chat",
      participants: body.participants || [],
    });
    return NextResponse.json({ success: true, conversation: conv });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create conversation" }, { status: 400 });
  }
}
