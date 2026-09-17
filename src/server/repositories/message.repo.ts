import { db } from "../db/database";
import { ChatMessage, Conversation } from "@/core/types";

export class MessageRepository {
  async getConversations(userId?: string): Promise<Conversation[]> {
    const state = db.getState();
    const all = state.conversations || [];
    if (!userId || userId === "user-admin") {
      return [...all].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }

    const userConvs = all.filter((c) =>
      c.participants.some((p: any) => (typeof p === "string" ? p === userId : (p.userId === userId || p.id === userId)))
    );

    // Sort: pinned for this user first, then by updatedAt descending
    return userConvs.sort((a, b) => {
      const aPinned = a.pinnedBy?.includes(userId) ? 1 : 0;
      const bPinned = b.pinnedBy?.includes(userId) ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const state = db.getState();
    return (state.messages || [])
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async findDirectConversation(
    userId1: string,
    userId2: string,
    campaignId?: string
  ): Promise<Conversation | null> {
    const state = db.getState();
    const all = state.conversations || [];

    const found = all.find((c) => {
      const pIds = c.participants.map((p: any) => (typeof p === "string" ? p : (p.userId || p.id)));
      const hasBoth = pIds.includes(userId1) && pIds.includes(userId2);
      if (!hasBoth) return false;
      if (campaignId) return c.campaignId === campaignId;
      return true;
    });

    return found || null;
  }

  async createConversation(data: Omit<Conversation, "id" | "unreadCount" | "updatedAt">): Promise<Conversation> {
    const id = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const conv: Conversation = {
      ...data,
      id,
      unreadCount: 0,
      updatedAt: now,
      pinnedBy: data.pinnedBy || [],
      mutedBy: data.mutedBy || [],
      archivedBy: data.archivedBy || [],
    };
    db.updateState((s) => {
      s.conversations = s.conversations || [];
      s.conversations.unshift(conv);
    });
    return conv;
  }

  async createMessage(data: Omit<ChatMessage, "id" | "createdAt" | "readBy">): Promise<ChatMessage> {
    const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const message: ChatMessage = {
      ...data,
      id,
      readBy: [data.senderId],
      reactions: [],
      createdAt: now,
    };
    db.updateState((s) => {
      s.messages = s.messages || [];
      s.messages.push(message);

      s.conversations = s.conversations || [];
      const conv = s.conversations.find((c) => c.id === data.conversationId);
      if (conv) {
        conv.updatedAt = now;
        conv.lastMessage = {
          content: data.content,
          senderName: data.senderName,
          createdAt: now,
        };
        // Increment unread count for other participants
        conv.unreadCount = (conv.unreadCount || 0) + 1;
      }
    });
    return message;
  }

  async togglePinConversation(conversationId: string, userId: string): Promise<boolean> {
    let isPinned = false;
    db.updateState((s) => {
      s.conversations = s.conversations || [];
      const conv = s.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.pinnedBy = conv.pinnedBy || [];
        if (conv.pinnedBy.includes(userId)) {
          conv.pinnedBy = conv.pinnedBy.filter((id) => id !== userId);
          isPinned = false;
        } else {
          conv.pinnedBy.push(userId);
          isPinned = true;
        }
      }
    });
    return isPinned;
  }

  async toggleMuteConversation(conversationId: string, userId: string): Promise<boolean> {
    let isMuted = false;
    db.updateState((s) => {
      s.conversations = s.conversations || [];
      const conv = s.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.mutedBy = conv.mutedBy || [];
        if (conv.mutedBy.includes(userId)) {
          conv.mutedBy = conv.mutedBy.filter((id) => id !== userId);
          isMuted = false;
        } else {
          conv.mutedBy.push(userId);
          isMuted = true;
        }
      }
    });
    return isMuted;
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<boolean> {
    db.updateState((s) => {
      s.conversations = s.conversations || [];
      const conv = s.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.unreadCount = 0;
      }

      s.messages = s.messages || [];
      for (const msg of s.messages) {
        if (msg.conversationId === conversationId) {
          if (!msg.readBy) msg.readBy = [];
          if (!msg.readBy.includes(userId)) {
            msg.readBy.push(userId);
          }
        }
      }
    });
    return true;
  }

  async toggleReaction(messageId: string, emoji: string, userId: string): Promise<ChatMessage | null> {
    let updatedMsg: ChatMessage | null = null;
    db.updateState((s) => {
      s.messages = s.messages || [];
      const msg = s.messages.find((m) => m.id === messageId);
      if (!msg) return;

      if (!msg.reactions) msg.reactions = [];

      const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
      if (existingReaction) {
        if (existingReaction.users.includes(userId)) {
          // Remove user reaction
          existingReaction.users = existingReaction.users.filter((u) => u !== userId);
          existingReaction.count = existingReaction.users.length;
          if (existingReaction.count === 0) {
            msg.reactions = msg.reactions.filter((r) => r.emoji !== emoji);
          }
        } else {
          // Add user to existing reaction
          existingReaction.users.push(userId);
          existingReaction.count = existingReaction.users.length;
        }
      } else {
        // New reaction
        msg.reactions.push({
          emoji,
          count: 1,
          users: [userId],
        });
      }
      updatedMsg = { ...msg };
    });
    return updatedMsg;
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    db.updateState((s) => {
      s.conversations = (s.conversations || []).filter((c) => c.id !== conversationId);
      s.messages = (s.messages || []).filter((m) => m.conversationId !== conversationId);
    });
    return true;
  }

  async searchMessages(query: string, userId?: string, conversationId?: string): Promise<ChatMessage[]> {
    const state = db.getState();
    const q = query.toLowerCase().trim();
    if (!q) return [];

    let candidateMessages = state.messages || [];

    if (userId && userId !== "user-admin") {
      const userConvs = await this.getConversations(userId);
      const allowedIds = new Set(userConvs.map((c) => c.id));
      if (conversationId && !allowedIds.has(conversationId)) {
        return [];
      }
      candidateMessages = candidateMessages.filter((m) => allowedIds.has(m.conversationId));
    }

    if (conversationId) {
      candidateMessages = candidateMessages.filter((m) => m.conversationId === conversationId);
    }

    return candidateMessages.filter((m) => m.content.toLowerCase().includes(q));
  }

  async getAdminSupervisionOverview(): Promise<{
    totalConversations: number;
    totalMessages: number;
    flaggedConversations: Array<{
      conversation: Conversation;
      flagReason: string;
      flaggedMessage: ChatMessage;
    }>;
    recentConversations: Conversation[];
  }> {
    const state = db.getState();
    const convs = state.conversations || [];
    const msgs = state.messages || [];

    // Safety circumvention regex patterns: phone numbers, off-platform payment, external chat handles
    const SUSPICIOUS_PATTERNS = [
      { regex: /\b(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/i, reason: "Phone number detected (potential off-platform bypass)" },
      { regex: /\b(whatsapp|telegram|signal|cashapp|venmo|zelle|paypal|wire transfer)\b/i, reason: "External payment/chat channel reference" },
      { regex: /\b[a-zA-Z0-9._%+-]+@(?!abeycollab\.(io|app|com))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/i, reason: "External personal email bypass" },
    ];

    const flagged: Array<{ conversation: Conversation; flagReason: string; flaggedMessage: ChatMessage }> = [];

    for (const msg of msgs) {
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.regex.test(msg.content)) {
          const c = convs.find((conv) => conv.id === msg.conversationId);
          if (c && !flagged.some((f) => f.conversation.id === c.id)) {
            flagged.push({
              conversation: c,
              flagReason: pattern.reason,
              flaggedMessage: msg,
            });
          }
          break;
        }
      }
    }

    return {
      totalConversations: convs.length,
      totalMessages: msgs.length,
      flaggedConversations: flagged,
      recentConversations: [...convs]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 20),
    };
  }
}

export const messageRepo = new MessageRepository();
