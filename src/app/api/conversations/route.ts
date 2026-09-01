import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const { searchParams } = new URL(req.url);
    const userId = session?.userId || searchParams.get("userId") || undefined;

    const conversations = await messageRepo.getConversations(userId);
    return NextResponse.json({ conversations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch conversations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    const body = await req.json();

    const participants = Array.isArray(body.participants) ? [...body.participants] : [];
    if (session?.userId && !participants.includes(session.userId)) {
      participants.push(session.userId);
    }

    const conv = await messageRepo.createConversation({
      campaignId: body.campaignId,
      campaignTitle: body.campaignTitle || "Campaign Chat",
      participants,
    });
    return NextResponse.json({ success: true, conversation: conv });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create conversation" }, { status: 400 });
  }
}
