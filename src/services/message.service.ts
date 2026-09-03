import { ChatMessage, Conversation, UserRole } from "../core/types";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/mock/messages.mock";

class MessageService {
  async getConversations(userId?: string): Promise<Conversation[]> {
    try {
      const url = userId ? `/api/conversations?userId=${encodeURIComponent(userId)}` : `/api/conversations`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.conversations)) {
          return data.conversations;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch conversations from API, using fallback:", err);
    }
    return MOCK_CONVERSATIONS;
  }

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    try {
      const res = await fetch(`/api/messages?conversationId=${encodeURIComponent(conversationId)}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          return data.messages;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch messages from API, using fallback:", err);
    }
    return MOCK_MESSAGES[conversationId] || [];
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    senderRole: UserRole,
    senderName: string,
    senderAvatar: string,
    content: string,
    attachments?: Array<{ type: "image" | "video" | "file"; url: string; name: string; size?: string }>
  ): Promise<ChatMessage> {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          senderId,
          senderRole,
          senderName,
          senderAvatar,
          content,
          attachments,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.message;
      }
    } catch (err) {
      console.warn("Failed to send message via API, returning local object:", err);
    }

    const fallbackMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderRole,
      senderName,
      senderAvatar,
      content,
      attachments,
      readBy: [senderId],
      reactions: [],
      createdAt: new Date().toISOString(),
    };
    return fallbackMsg;
  }

  async createConversation(params: {
    campaignId?: string;
    campaignTitle?: string;
    recipientId?: string;
    recipientName?: string;
    recipientRole?: UserRole;
    recipientAvatar?: string;
    initialMessage?: string;
    senderId?: string;
    senderRole?: UserRole;
  }): Promise<Conversation | null> {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        return data.conversation;
      }
    } catch (err) {
      console.error("Failed to create conversation via API:", err);
    }
    return null;
  }

  async markAsRead(conversationId: string, userId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      return res.ok;
    } catch (err) {
      console.warn("Failed to mark conversation read:", err);
      return false;
    }
  }

  async toggleReaction(messageId: string, emoji: string, userId: string): Promise<ChatMessage | null> {
    try {
      const res = await fetch("/api/messages/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, emoji, userId }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.message;
      }
    } catch (err) {
      console.warn("Failed to toggle reaction via API:", err);
    }
    return null;
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch (err) {
      console.error("Failed to delete conversation via API:", err);
      return false;
    }
  }
}

export const messageService = new MessageService();
