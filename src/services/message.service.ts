import { ChatMessage, Conversation, UserRole } from "../core/types";

class MessageService {
  async getConversations(userId?: string): Promise<Conversation[]> {
    try {
      const url = userId ? `/api/conversations?userId=${encodeURIComponent(userId)}` : `/api/conversations`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.conversations || [];
      }
    } catch (err) {
      console.warn("Failed to fetch conversations from API:", err);
    }
    return [];
  }

  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    try {
      const res = await fetch(`/api/messages?conversationId=${encodeURIComponent(conversationId)}`);
      if (res.ok) {
        const data = await res.json();
        return data.messages || [];
      }
    } catch (err) {
      console.warn("Failed to fetch messages from API:", err);
    }
    return [];
  }

  async sendMessage(
    conversationId: string,
    senderId: string,
    senderRole: UserRole,
    senderName: string,
    senderAvatar: string,
    content: string
  ): Promise<ChatMessage> {
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
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to send message");
    }

    const data = await res.json();
    return data.message;
  }
}

export const messageService = new MessageService();
