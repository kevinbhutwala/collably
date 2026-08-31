import { db } from "../db/database";
import { ChatMessage, Conversation } from "@/core/types";

export class MessageRepository {
  async getConversations(userId: string): Promise<Conversation[]> {
    const state = db.getState();
    return (state.conversations || []).filter((c) =>
      c.participants.some((p) => p.userId === userId)
    );
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
      }
    });
    return message;
  }
}

export const messageRepo = new MessageRepository();
