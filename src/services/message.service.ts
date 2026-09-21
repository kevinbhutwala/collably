import { ChatMessage, Conversation, UserRole } from "../core/types";

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
    return [];
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
    return [];
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

  async togglePin(conversationId: string, userId: string): Promise<{ isPinned: boolean }> {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/manage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pin", userId }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Failed to toggle pin:", err);
    }
    return { isPinned: false };
  }

  async toggleMute(conversationId: string, userId: string): Promise<{ isMuted: boolean }> {
    try {
      const res = await fetch(`/api/conversations/${conversationId}/manage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mute", userId }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("Failed to toggle mute:", err);
    }
    return { isMuted: false };
  }

  async searchMessages(query: string, conversationId?: string, userId?: string): Promise<ChatMessage[]> {
    try {
      const params = new URLSearchParams({ q: query });
      if (conversationId) params.set("conversationId", conversationId);
      if (userId) params.set("userId", userId);
      const res = await fetch(`/api/messages/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return data.messages || [];
      }
    } catch (err) {
      console.warn("Failed to search messages:", err);
    }
    return [];
  }

  async findOrCreateDirect(params: {
    recipientId: string;
    recipientName?: string;
    recipientRole?: UserRole;
    recipientAvatar?: string;
    campaignId?: string;
    campaignTitle?: string;
    senderId?: string;
    senderRole?: UserRole;
  }): Promise<Conversation | null> {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          findOrCreate: true,
          ...params,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.conversation;
      }
    } catch (err) {
      console.error("Failed to find or create direct conversation:", err);
    }
    return null;
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
