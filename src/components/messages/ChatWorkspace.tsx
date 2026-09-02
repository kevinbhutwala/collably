"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { messageService } from "@/services/message.service";
import { ChatMessage, Conversation } from "@/core/types";
import {
  Send,
  MessageSquare,
  Inbox,
  Search,
  Paperclip,
  CheckCheck,
  ArrowLeft,
  FileText,
  Play,
  Download,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Avatar initials fallback when no photo is available
function AvatarFallback({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#FFD21F] text-[#0A0A0E] font-bold text-xs rounded-2xl",
        className
      )}
    >
      {initials}
    </div>
  );
}

export function ChatWorkspace() {
  const { user, role } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesMap, activeConvId]);

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
  const activePartner =
    activeConversation?.participants?.find((p) =>
      typeof p === "string" ? p !== user?.id : p.userId !== user?.id
    ) || activeConversation?.participants?.[0];

  const partnerName =
    typeof activePartner === "object" ? activePartner?.name : "Collaboration Partner";
  const partnerRole = typeof activePartner === "object" ? activePartner?.role : "brand";
  const partnerAvatar =
    typeof activePartner === "object" && activePartner?.avatarUrl
      ? activePartner.avatarUrl
      : "";

  const currentMessages = messagesMap[activeConvId] || [];

  const handleSelectConv = async (convId: string) => {
    setActiveConvId(convId);
    setMobileView("chat");
    if (!messagesMap[convId]) {
      const msgs = await messageService.getMessages(convId);
      setMessagesMap((prev) => ({ ...prev, [convId]: msgs || [] }));
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const messageContent = inputText.trim();
    if (!messageContent || !activeConvId) return;

    const senderName = user?.name || "Me";
    const senderAvatar = user?.avatarUrl || "";
    const senderRole = role || "creator";

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "unknown",
      senderName,
      senderAvatar,
      senderRole,
      content: messageContent,
      attachments: [],
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "unknown"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
    setInputText("");

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, lastMessage: { content: messageContent, senderName, createdAt: newMsg.createdAt } }
          : c
      )
    );

    try {
      await messageService.sendMessage(
        activeConvId,
        newMsg.senderId,
        newMsg.senderRole,
        newMsg.senderName,
        newMsg.senderAvatar,
        newMsg.content,
        newMsg.attachments
      );
    } catch (err) {
      console.error("Failed to persist message:", err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeConvId) return;

    const attachment = {
      type: (
        file.type.includes("video") ? "video" : file.type.includes("image") ? "image" : "file"
      ) as "image" | "video" | "file",
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };

    const senderName = user?.name || "Me";
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "unknown",
      senderName,
      senderAvatar: user?.avatarUrl || "",
      senderRole: role || "creator",
      content: `Shared: ${file.name}`,
      attachments: [attachment],
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "unknown"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, lastMessage: { content: `Shared: ${file.name}`, senderName, createdAt: newMsg.createdAt } }
          : c
      )
    );
  };

  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.campaignTitle.toLowerCase().includes(q) ||
      c.participants.some((p) =>
        typeof p === "object" ? p.name.toLowerCase().includes(q) : false
      )
    );
  });

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center rounded-3xl bg-white border border-black/8 text-[#0A0A0E] shadow-xs space-y-3">
        <div className="w-7 h-7 rounded-full border-2 border-[#FFD21F] border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-[#5A5A68]">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-white border border-black/8 shadow-xs overflow-hidden h-full w-full text-[#0A0A0E] flex flex-col select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden h-full">

        {/* ── LEFT: CONVERSATION LIST ── */}
        <div
          className={`md:col-span-4 border-r border-black/8 flex flex-col h-full bg-[#FAFAFC] overflow-hidden ${
            mobileView === "chat" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header + Search */}
          <div className="p-4 border-b border-black/8 space-y-3 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FFD21F]/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </div>
              <h2 className="font-extrabold text-xs uppercase tracking-wider text-[#0A0A0E]">
                Messages
              </h2>
              <span className="ml-auto text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/6 text-[#5A5A68]">
                {conversations.length}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A7A8A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 rounded-2xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A7A8A] hover:text-[#0A0A0E]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/5">
            {conversations.length === 0 ? (
              <div className="p-8 text-center space-y-3 text-[#7A7A8A]">
                <Inbox className="w-8 h-8 mx-auto text-[#C0C0CC]" />
                <div>
                  <p className="text-xs font-bold text-[#0A0A0E]">No conversations yet</p>
                  <p className="text-[11px] mt-1 leading-relaxed text-[#7A7A8A]">
                    Conversations open automatically when a campaign collaboration begins.
                  </p>
                </div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-[#7A7A8A]">
                <p className="text-xs font-semibold">No matches found</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#0A0A0E] underline font-bold"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const partner =
                  conv.participants?.find((p) =>
                    typeof p === "string" ? p !== user?.id : p.userId !== user?.id
                  ) || conv.participants?.[0];
                const pName = typeof partner === "object" ? partner?.name : "Partner";
                const pAvatar =
                  typeof partner === "object" && partner?.avatarUrl ? partner.avatarUrl : "";
                const pRole = typeof partner === "object" ? partner?.role : "brand";
                const isActive = conv.id === activeConvId;

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={cn(
                      "w-full p-4 text-left flex items-start gap-3 transition-all",
                      isActive
                        ? "bg-white border-l-2 border-[#FFD21F]"
                        : "hover:bg-black/[0.02]"
                    )}
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      {pAvatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pAvatar} alt={pName} className="w-10 h-10 rounded-2xl object-cover border border-black/8" />
                      ) : (
                        <AvatarFallback name={pName} className="w-10 h-10" />
                      )}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-xs text-[#0A0A0E] truncate">{pName}</span>
                          <span
                            className={cn(
                              "text-[9px] font-bold px-1.5 py-px rounded-full uppercase shrink-0",
                              pRole === "brand"
                                ? "bg-purple-100 text-purple-700"
                                : pRole === "agency_admin"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                            )}
                          >
                            {pRole === "agency_admin" ? "Admin" : pRole}
                          </span>
                        </div>
                        {conv.lastMessage?.createdAt && (
                          <span className="text-[10px] font-mono text-[#9A9AA8] shrink-0">
                            {new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-[#5A5A68] truncate mb-0.5">
                        {conv.campaignTitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-[#8A8A9A] truncate">
                          {conv.lastMessage?.content || "Tap to open..."}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 ml-2">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT: CHAT PANE ── */}
        <div
          className={`md:col-span-8 flex flex-col h-full bg-white relative overflow-hidden ${
            mobileView === "list" ? "hidden md:flex" : "flex"
          }`}
        >
          {activeConversation ? (
            <>
              {/* Chat header */}
              <div className="px-4 py-3 border-b border-black/8 flex items-center gap-3 bg-[#FAFAFC] shrink-0">
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden p-2 rounded-xl bg-white border border-black/8 hover:bg-black/5 text-[#0A0A0E]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="relative w-9 h-9 shrink-0">
                  {partnerAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={partnerAvatar} alt={partnerName} className="w-9 h-9 rounded-xl object-cover border border-black/8" />
                  ) : (
                    <AvatarFallback name={partnerName} className="w-9 h-9" />
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[#0A0A0E] truncate">{partnerName}</h3>
                    <span
                      className={cn(
                        "text-[9px] font-bold px-1.5 py-px rounded-full uppercase shrink-0",
                        partnerRole === "brand"
                          ? "bg-purple-100 text-purple-700"
                          : partnerRole === "agency_admin"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {partnerRole === "agency_admin" ? "Admin" : partnerRole}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6A6A78] truncate font-medium">
                    {activeConversation.campaignTitle}
                  </p>
                </div>
              </div>

              {/* Messages scroll area */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 space-y-4 bg-white"
              >
                {currentMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-[#9A9AA8]">
                    <MessageSquare className="w-8 h-8 text-[#C8C8D4]" />
                    <p className="text-xs font-semibold text-[#5A5A68]">No messages yet</p>
                    <p className="text-[11px]">Start the conversation below.</p>
                  </div>
                ) : (
                  currentMessages.map((m) => {
                    const isMine = m.senderId === user?.id;
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                      >
                        {/* Sender + time */}
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className="text-[11px] font-bold text-[#5A5A68]">{m.senderName}</span>
                          <span className="text-[10px] font-mono text-[#9A9AA8]">
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Bubble */}
                        <div
                          className={cn(
                            "max-w-sm sm:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs",
                            isMine
                              ? "bg-[#FFD21F] text-[#0A0A0E] font-medium border border-black/8 rounded-tr-sm"
                              : "bg-[#F5F5F9] border border-black/6 text-[#0A0A0E] rounded-tl-sm"
                          )}
                        >
                          <p>{m.content}</p>

                          {/* Attachments */}
                          {m.attachments && m.attachments.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-black/10 space-y-2">
                              {m.attachments.map((att, i) => (
                                <div
                                  key={i}
                                  className="p-2.5 rounded-xl bg-white/80 border border-black/10 flex items-center justify-between gap-2 text-xs"
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    {att.type === "video" ? (
                                      <Play className="w-4 h-4 shrink-0 text-[#0A0A0E]" />
                                    ) : (
                                      <FileText className="w-4 h-4 shrink-0 text-[#0A0A0E]" />
                                    )}
                                    <span className="font-bold text-[#0A0A0E] truncate">{att.name}</span>
                                  </div>
                                  <a
                                    href={att.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg hover:bg-black/10 text-[#0A0A0E] shrink-0"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Read receipt */}
                          {isMine && (
                            <div className="flex justify-end mt-1">
                              <CheckCheck className="w-3.5 h-3.5 text-[#0A0A0E]/50" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Composer */}
              <form
                onSubmit={handleSendMessage}
                className="px-4 py-3 border-t border-black/8 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,application/pdf"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-full hover:bg-black/5 text-[#6A6A78] hover:text-[#0A0A0E] transition-colors shrink-0"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-[#F8F8FC] border border-black/8 rounded-full px-4 py-2.5 text-sm font-medium text-[#0A0A0E] placeholder:text-[#9A9AA8] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] border border-black/10 text-[#0A0A0E] transition-all disabled:opacity-30 shrink-0 shadow-xs"
                  title="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* No conversation selected */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-[#8A8A9A]">
              <MessageSquare className="w-10 h-10 text-[#C8C8D4]" />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#0A0A0E]">
                  {conversations.length === 0 ? "No conversations yet" : "Select a conversation"}
                </h3>
                <p className="text-xs max-w-xs leading-relaxed">
                  {conversations.length === 0
                    ? "Conversations open automatically when a campaign collaboration begins."
                    : "Choose a conversation from the left to start messaging."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
