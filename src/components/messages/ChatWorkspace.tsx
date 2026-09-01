"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import { messageService } from "@/services/message.service";
import { ChatMessage, Conversation } from "@/core/types";
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
  const activePartner = activeConversation?.participants?.find((p) => p.userId !== user?.id) || activeConversation?.participants?.[0];
  const currentMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    const senderRole = role || "creator";
    const senderName = user?.name || (role === "creator" ? "Elena Rostova" : "Linear Dynamics");
    const senderAvatar = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "user-temp",
      senderName,
      senderAvatar,
      senderRole,
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
        newMsg.senderId,
        newMsg.senderRole,
        newMsg.senderName,
        newMsg.senderAvatar,
        newMsg.content
      );
    } catch (err) {
      console.error("Failed to persist message:", err);
    }
  };

  const handleSelectConv = async (convId: string) => {
    setActiveConvId(convId);
    if (!messagesMap[convId]) {
      const msgs = await messageService.getMessages(convId);
      setMessagesMap((prev) => ({ ...prev, [convId]: msgs || [] }));
    }
  };

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center rounded-3xl bg-[#0E0C15]/90 border border-white/10 text-white">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A5CFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-[#0E0C15]/90 border border-white/10 space-y-3 text-white">
        <Inbox className="w-10 h-10 text-white/30 mx-auto" />
        <h3 className="text-base font-bold font-display">No Conversations Started</h3>
        <p className="text-xs text-white/50 max-w-sm mx-auto">
          Direct messaging opens automatically once an application is pitched or a milestone collaboration begins.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden h-[680px] text-white select-none">
      {/* Left Conversations Sidebar */}
      <div className="md:col-span-4 border-r border-white/10 flex flex-col h-full bg-[#07070B]/50">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FFD21F]" />
            <span className="font-bold text-xs uppercase font-mono tracking-wider text-white">
              Channels ({conversations.length})
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {conversations.map((conv) => {
            const partner = conv.participants?.find((p) => p.userId !== user?.id) || conv.participants?.[0];
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                  isActive ? "bg-white/[0.08] border-l-2 border-[#FFD21F]" : "hover:bg-white/[0.04]"
                }`}
              >
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white/10 shrink-0">
                  <Image
                    src={
                      partner?.avatarUrl ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    }
                    alt={partner?.name || "Partner"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-xs text-white truncate font-sans">
                      {partner?.name || conv.campaignTitle}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 shrink-0">
                      {conv.lastMessage?.createdAt ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Now"}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 truncate font-sans">
                    {conv.lastMessage?.content || conv.campaignTitle || "Tap to chat..."}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Message Pane */}
      <div className="md:col-span-8 flex flex-col h-full">
        {activeConversation ? (
          <>
            {/* Thread Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-2xl overflow-hidden bg-white/10 shrink-0">
                  <Image
                    src={
                      activePartner?.avatarUrl ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    }
                    alt={activePartner?.name || "Partner"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-sans">
                    {activePartner?.name || activeConversation.campaignTitle}
                  </h4>
                  <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {activeConversation.campaignTitle || "Live Channel"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {currentMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-white/40 text-xs">
                  Say hello to initiate collaboration review notes.
                </div>
              ) : (
                currentMessages.map((m) => {
                  const isMine = m.senderId === user?.id || m.senderRole === role;
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-white/40">
                          {m.senderName}
                        </span>
                        <span className="text-[9px] font-mono text-white/30">
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                          isMine
                            ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-medium shadow-[0_0_15px_rgba(255,210,31,0.35)]"
                            : "bg-white/[0.06] border border-white/10 text-white"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message or timestamped note..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD21F]/50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-[0_0_15px_rgba(255,210,31,0.4)] border border-white/40 flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </button>
            </form>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-white/40 text-xs">
            Select a conversation to view chat history.
          </div>
        )}
      </div>
    </div>
  );
}
