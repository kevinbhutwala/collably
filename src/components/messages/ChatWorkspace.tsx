"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/mock/messages.mock";
import { ChatMessage, Conversation } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Send, Paperclip } from "lucide-react";

export function ChatWorkspace() {
  const { user, role } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const currentMessages = messagesMap[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "user-1",
      senderName: user?.name || "Elena Rostova",
      senderAvatar: user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      senderRole: role,
      content: inputText,
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "user-1"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
    setInputText("");
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-card overflow-hidden h-[750px] grid grid-cols-1 lg:grid-cols-12">
      {/* Left Conversations Sidebar */}
      <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50/50 flex flex-col h-full">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-bold text-sm text-slate-900">Campaign Conversations</h3>
          <p className="text-[11px] text-slate-500">Real-time creator & brand direct messaging</p>
        </div>

        <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                  isSelected ? "bg-white shadow-sm border-l-4 border-brand-accent" : "hover:bg-white/80"
                }`}
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
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
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {conv.campaignTitle}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">10:42 AM</span>
                  </div>
                  <p className="text-xs text-slate-600 truncate">{conv.lastMessage?.content || "No messages yet"}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="lg:col-span-8 flex flex-col h-full bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {activeConversation?.campaignTitle}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Participants: Linear Dynamics, Elena Rostova, Agency Supervisor
              </p>
            </div>
          </div>

          <Badge variant="glow" size="sm">
            Milestone Escrow Active
          </Badge>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
          {currentMessages.map((msg) => {
            const isMe = msg.senderRole === role;
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-sm">
                  <Image src={msg.senderAvatar} alt={msg.senderName} fill className="object-cover" />
                </div>

                <div className="space-y-1">
                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 font-mono ${isMe ? "justify-end" : ""}`}>
                    <span className="font-bold text-slate-700 font-sans">{msg.senderName}</span>
                    <span>•</span>
                    <span>Just now</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? "bg-slate-900 text-white rounded-tr-none shadow-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message or attach deliverable draft..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 shadow-sm"
          />

          <Button variant="accent" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
