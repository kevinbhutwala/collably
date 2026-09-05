import { NextRequest, NextResponse } from "next/server";
import { messageRepo } from "@/server/repositories/message.repo";
import { SecurityService } from "@/server/services/security.service";
import { db } from "@/server/db/database";

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

    const state = db.getState();
    const currentUserId = session?.userId || body.senderId || "user-creator";
    const currentUser = (state.users || []).find((u) => u.id === currentUserId);
    const currentCreator = (state.creators || []).find((c) => c.userId === currentUserId);
    const currentBrand = (state.brands || []).find((b) => b.userId === currentUserId);

    const senderParticipant = {
      userId: currentUserId,
      name: currentUser?.name || currentCreator?.fullName || currentBrand?.companyName || "Me",
      role: session?.role || body.senderRole || (currentBrand ? "brand" : "creator"),
      avatarUrl: currentUser?.avatarUrl || currentCreator?.avatarUrl || currentBrand?.logoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    };

    let participants: any[] = [];
    if (Array.isArray(body.participants) && body.participants.length > 0) {
      participants = [...body.participants];
      if (!participants.some((p: any) => (typeof p === "string" ? p === currentUserId : p.userId === currentUserId))) {
        participants.push(senderParticipant);
      }
    } else if (body.recipient) {
      participants = [senderParticipant, body.recipient];
    } else if (body.recipientId) {
      const recUser = (state.users || []).find((u) => u.id === body.recipientId);
      const recCreator = (state.creators || []).find((c) => c.id === body.recipientId || c.userId === body.recipientId);
      const recBrand = (state.brands || []).find((b) => b.id === body.recipientId || b.userId === body.recipientId);

      const recipientParticipant = {
        userId: body.recipientId,
        name: recUser?.name || recCreator?.fullName || recBrand?.companyName || body.recipientName || "Collaborator",
        role: recUser?.role || (recBrand ? "brand" : "creator"),
        avatarUrl: recUser?.avatarUrl || recCreator?.avatarUrl || recBrand?.logoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      };
      participants = [senderParticipant, recipientParticipant];
    } else {
      // Default to connecting with AbeyCollab Concierge
      participants = [
        senderParticipant,
        {
          userId: "user-admin",
          name: "AbeyCollab Concierge Desk",
          role: "agency_admin",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
        },
      ];
    }

    const conv = await messageRepo.createConversation({
      campaignId: body.campaignId || undefined,
      campaignTitle: body.campaignTitle || (body.campaignId ? "Campaign Brief" : "Direct Collaboration"),
      participants,
    });

    // Optional initial message
    if (body.initialMessage) {
      await messageRepo.createMessage({
        conversationId: conv.id,
        senderId: currentUserId,
        senderRole: senderParticipant.role as any,
        senderName: senderParticipant.name,
        senderAvatar: senderParticipant.avatarUrl,
        content: body.initialMessage,
        attachments: body.attachments || [],
      });
    }

    return NextResponse.json({ success: true, conversation: conv });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create conversation" }, { status: 400 });
  }
}
