import { ChatMessage, Conversation, UserRole } from "../core/types";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/mock/messages.mock";

class MessageService {
  async getConversations(userId?: string): Promise<Conversation[]> {
    try {
      const url = userId ? `/api/conversations?userId=${encodeURIComponent(userId)}` : `/api/conversations`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.conversations && data.conversations.length > 0) {
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
      const res = await fetch(`/api/messages?conversationId=${encodeURIComponent(conversationId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
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
      createdAt: new Date().toISOString(),
    };
    return fallbackMsg;
  }
}

export const messageService = new MessageService();
