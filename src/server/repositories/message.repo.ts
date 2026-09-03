import { db } from "../db/database";
import { ChatMessage, Conversation } from "@/core/types";

export class MessageRepository {
  async getConversations(userId?: string): Promise<Conversation[]> {
    const state = db.getState();
    const all = state.conversations || [];
    if (!userId) return all;
    const userConvs = all.filter((c) =>
      c.participants.some((p) => (typeof p === "string" ? p === userId : p.userId === userId))
    );
    return userConvs.length > 0 ? userConvs : all;
  }

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const state = db.getState();
    return (state.messages || [])
      .filter((m) => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createConversation(data: Omit<Conversation, "id" | "unreadCount" | "updatedAt">): Promise<Conversation> {
    const id = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const conv: Conversation = {
      ...data,
      id,
      unreadCount: 0,
      updatedAt: now,
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
}

export const messageRepo = new MessageRepository();
