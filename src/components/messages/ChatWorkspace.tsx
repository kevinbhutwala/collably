"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import { messageService } from "@/services/message.service";
import { ChatMessage, Conversation } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { Send, MessageSquare, Inbox } from "lucide-react";

export function ChatWorkspace() {
  const { user, role } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        const convs = await messageService.getConversations(user?.id);
        setConversations(convs || []);
        if (convs && convs.length > 0) {
          setActiveConvId(convs[0].id);
          const msgs = await messageService.getMessages(convs[0].id);
          setMessagesMap({ [convs[0].id]: msgs || [] });
        }
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, [user?.id]);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const currentMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "user-temp",
      senderName: user?.name || "Collaborator",
      senderAvatar:
        user?.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      senderRole: role,
      content: inputText,
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "user-temp"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
    setInputText("");

    try {
      await messageService.sendMessage(
        activeConvId,
        user?.id || "user-temp",
        role,
        user?.name || "Collaborator",
        user?.avatarUrl || "",
        newMsg.content
      );
    } catch {
      // Message already reflected in local state
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 text-[#111111]">
        <div className="w-8 h-8 rounded-full border-2 border-[#111111] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-[#6B6B6B]">Connecting to secure messaging channel...</p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <AnimatedEmptyState
        icon={<Inbox className="w-8 h-8 text-[#111111]" />}
        badgeText="Real-Time Messenger"
        title="Your Inbox is Ready"
        description="Direct messages, frame-by-frame deliverable reviews, and brand collaboration negotiations will appear here once you apply to briefs or hire creators."
        actionText={role === "creator" ? "Browse Brand Briefs" : "Browse Creator Roster"}
        actionHref={role === "creator" ? "/campaigns" : "/app/brand/creators"}
        secondaryText="View Dashboard"
        secondaryHref="/app/dashboard"
      />
    );
  }

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs overflow-hidden h-[720px] grid grid-cols-1 lg:grid-cols-12 text-[#111111]">
      {/* Left Conversations Sidebar */}
      <div className="lg:col-span-4 border-r border-[#E7E7E4] bg-[#FAFAF8] flex flex-col h-full">
        <div className="p-4 border-b border-[#E7E7E4]">
          <h3 className="font-bold text-sm text-[#111111]">Campaign Conversations</h3>
          <p className="text-[11px] text-[#6B6B6B] font-mono">Real-time creator &amp; brand direct messaging</p>
        </div>

        <div className="divide-y divide-[#E7E7E4] overflow-y-auto flex-1">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={async () => {
                  setActiveConvId(conv.id);
                  if (!messagesMap[conv.id]) {
                    const msgs = await messageService.getMessages(conv.id);
                    setMessagesMap((prev) => ({ ...prev, [conv.id]: msgs || [] }));
                  }
                }}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                  isSelected ? "bg-[#FFFFFF] border-l-4 border-[#111111] shadow-xs" : "hover:bg-[#FFFFFF]"
                }`}
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAF8] shrink-0 border border-[#E7E7E4]">
                  <Image
                    src={
                      role === "creator"
                        ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80"
                        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    }
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-bold text-[#111111] truncate">
                      {conv.campaignTitle}
                    </h4>
                    <span className="text-[10px] text-[#6B6B6B] font-mono">10:42 AM</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] truncate font-medium">
                    {conv.lastMessage?.content || "No messages yet"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="lg:col-span-8 flex flex-col h-full bg-[#FFFFFF]">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#E7E7E4] flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-bold text-sm text-[#111111]">
                {activeConversation?.campaignTitle || "Campaign Channel"}
              </h3>
              <p className="text-[11px] text-[#6B6B6B] font-mono">
                Escrow Protected • 100% Encrypted
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
            LIVE SYNC
          </span>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAFAF8]">
          {currentMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div className="space-y-2">
                <MessageSquare className="w-8 h-8 text-[#6B6B6B] mx-auto" />
                <p className="text-xs text-[#6B6B6B] font-medium">
                  Start the conversation by typing your message below.
                </p>
              </div>
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {!isMe && (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[#E7E7E4]">
                      <Image
                        src={
                          msg.senderAvatar ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                        }
                        alt={msg.senderName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl p-3.5 space-y-1 ${
                      isMe
                        ? "bg-[#111111] text-[#FAFAF8] rounded-br-none shadow-xs"
                        : "bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] rounded-bl-none shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] font-mono">
                      <span className={isMe ? "text-[#B7FF3C] font-bold" : "text-[#111111] font-bold"}>
                        {msg.senderName}
                      </span>
                      <span className={isMe ? "text-white/70" : "text-[#6B6B6B]"}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3.5 border-t border-[#E7E7E4] flex items-center gap-2 bg-[#FFFFFF]">
          <input
            type="text"
            placeholder="Type your message or revision note..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#111111] transition-all font-sans"
          />
          <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5 text-[#B7FF3C]" />} className="rounded-[9px]">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
