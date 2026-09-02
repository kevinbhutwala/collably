"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { messageService } from "@/services/message.service";
import { ChatMessage, Conversation } from "@/core/types";
import { formatCurrency } from "@/core/utils/formatters";
import {
  Send,
  MessageSquare,
  Inbox,
  Search,
  Phone,
  Video,
  Paperclip,
  Smile,
  CheckCheck,
  ArrowLeft,
  FileText,
  Play,
  ShieldCheck,
  Sparkles,
  Info,
  X,
  Mic,
  CornerDownRight,
  Download,
  Layers,
  Clock,
  BadgeDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWorkspace() {
  const { user, role } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "escrow">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [callModal, setCallModal] = useState<"video" | "audio" | null>(null);
  const [reactionPopoverMsgId, setReactionPopoverMsgId] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, string[]>>({});
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesMap, activeConvId, isTyping]);

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

  // Audio recording simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecordingAudio) {
      interval = setInterval(() => {
        setAudioTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setAudioTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingAudio]);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const activePartner =
    activeConversation?.participants?.find((p) => (typeof p === "string" ? p !== user?.id : p.userId !== user?.id)) ||
    activeConversation?.participants?.[0];

  const partnerName = typeof activePartner === "object" ? activePartner?.name : "Collaboration Partner";
  const partnerRole = typeof activePartner === "object" ? activePartner?.role : "brand";
  const partnerAvatar =
    typeof activePartner === "object" && activePartner?.avatarUrl
      ? activePartner.avatarUrl
      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";

  const currentMessages = messagesMap[activeConvId] || [];

  const handleSelectConv = async (convId: string) => {
    setActiveConvId(convId);
    setMobileView("chat");
    if (!messagesMap[convId]) {
      const msgs = await messageService.getMessages(convId);
      setMessagesMap((prev) => ({ ...prev, [convId]: msgs || [] }));
    }
  };

  const handleSendMessage = async (textToSend?: string, attachments?: ChatMessage["attachments"]) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent && (!attachments || attachments.length === 0)) return;
    if (!activeConvId) return;

    const senderRole = role || "creator";
    const senderName = user?.name || (role === "creator" ? "Elena Rostova" : "Linear Dynamics");
    const senderAvatar =
      user?.avatarUrl ||
      (role === "creator"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80");

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "user-c1",
      senderName,
      senderAvatar,
      senderRole,
      content: messageContent,
      attachments: attachments || [],
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "user-c1"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));

    setInputText("");

    // Update conversation lastMessage
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: {
                content: messageContent,
                senderName,
                createdAt: newMsg.createdAt,
              },
            }
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

    // Trigger Smart Simulated Reply for interactive realism
    triggerSmartReply(messageContent);
  };

  const triggerSmartReply = (userMsg: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyContent = "Got it! Thanks for the update. Reviewing right now in the workspace.";

      const lower = userMsg.toLowerCase();
      if (lower.includes("video") || lower.includes("draft") || lower.includes("cut") || lower.includes("deliverable")) {
        replyContent = "The 4K video deliverable playback looks ultra sharp! We are doing a quick pass on color grading and audio levels.";
      } else if (lower.includes("payout") || lower.includes("escrow") || lower.includes("invoice") || lower.includes("tranche")) {
        replyContent = "Escrow funds are 100% secured and verified. Once deliverable sign-off is logged, the payout tranche releases instantly.";
      } else if (lower.includes("call") || lower.includes("meeting") || lower.includes("kickoff") || lower.includes("sync")) {
        replyContent = "Sounds great! Let's do a 15-min sync. Feel free to launch the video call directly in this room anytime.";
      } else if (lower.includes("script") || lower.includes("brief") || lower.includes("concept")) {
        replyContent = "The concept direction is approved! You have full creative freedom on the framing and product demonstration.";
      }

      const botReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        conversationId: activeConvId,
        senderId: typeof activePartner === "object" ? activePartner?.userId : "partner-1",
        senderName: partnerName,
        senderAvatar: partnerAvatar,
        senderRole: partnerRole,
        content: replyContent,
        createdAt: new Date().toISOString(),
        readBy: [],
      };

      setMessagesMap((prev) => ({
        ...prev,
        [activeConvId]: [...(prev[activeConvId] || []), botReply],
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? {
                ...c,
                lastMessage: {
                  content: replyContent,
                  senderName: partnerName,
                  createdAt: botReply.createdAt,
                },
              }
            : c
        )
      );
    }, 1600);
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    setReactions((prev) => {
      const existing = prev[msgId] || [];
      const updated = existing.includes(emoji) ? existing.filter((e) => e !== emoji) : [...existing, emoji];
      return { ...prev, [msgId]: updated };
    });
    setReactionPopoverMsgId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const mockAttachment = {
      type: (file.type.includes("video") ? "video" : file.type.includes("image") ? "image" : "file") as "image" | "video" | "file",
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };

    handleSendMessage(`Shared file: ${file.name}`, [mockAttachment]);
  };

  // Filtered Channels
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.campaignTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.participants.some((p) =>
        typeof p === "object" ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
      );

    if (!matchesSearch) return false;

    if (activeTab === "active") return c.unreadCount && c.unreadCount > 0;
    if (activeTab === "escrow") return c.campaignTitle.toLowerCase().includes("launch") || c.campaignTitle.toLowerCase().includes("escrow");
    return true;
  });

  const unreadCountTotal = conversations.filter((c) => c.unreadCount && c.unreadCount > 0).length;
  const escrowCountTotal = conversations.filter((c) => c.campaignTitle.toLowerCase().includes("launch") || c.campaignTitle.toLowerCase().includes("escrow")).length;

  const quickChips = [
    "📹 Video draft V2 uploaded for QA review",
    "✓ Deliverable approved, releasing escrow tranche",
    "⚡ Pinned campaign link in YouTube description",
    "🤝 Let's schedule a 10-min campaign sync",
  ];

  if (isLoading) {
    return (
      <div className="h-[640px] flex flex-col items-center justify-center rounded-3xl bg-white border border-black/8 text-[#0A0A0E] shadow-xs space-y-3 font-sans">
        <div className="w-8 h-8 rounded-full border-3 border-[#FFD21F] border-t-transparent animate-spin" />
        <p className="text-xs font-semibold text-[#5A5A68]">Loading channels &amp; message vaults...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-white border border-black/8 shadow-xs overflow-hidden h-[calc(100vh-10rem)] min-h-[580px] lg:h-[740px] text-[#0A0A0E] select-none flex flex-col font-sans">
      {/* ── VIDEO / AUDIO CALL MODAL SIMULATOR ── */}
      {callModal && (
        <div className="absolute inset-0 z-50 bg-[#0A0A0E]/95 backdrop-blur-md flex flex-col items-center justify-between p-8 text-white animate-fade-in">
          <div className="text-center space-y-2 pt-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#FFD21F]">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-ping" />
              {callModal === "video" ? "4K Studio Video Call" : "Encrypted Voice Sync"}
            </span>
            <h3 className="text-2xl font-bold font-display">{partnerName}</h3>
            <p className="text-xs text-white/60">{activeConversation?.campaignTitle}</p>
          </div>

          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#FFD21F] shadow-2xl shadow-[#FFD21F]/20 animate-pulse">
            <Image src={partnerAvatar} alt={partnerName} fill className="object-cover" />
          </div>

          <div className="space-y-4 text-center">
            <p className="text-xs text-white/50">End-to-End Encrypted Room • Low-Latency WebRTC</p>
            <button
              onClick={() => setCallModal(null)}
              className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-all"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN 2-PANE CHAT GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
        {/* ── LEFT CHANNELS SIDEBAR (Cols 1-4) ── */}
        <div
          className={`md:col-span-4 border-r border-black/8 flex flex-col h-full bg-[#FAFAFC] ${
            mobileView === "chat" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Top Search & Redesigned Segmented Filter Tabs */}
          <div className="p-4 border-b border-black/8 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#FFD21F]/20 flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0A0A0E]" />
                </div>
                <h2 className="font-extrabold text-xs uppercase tracking-wider text-[#0A0A0E]">
                  Channels ({conversations.length})
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/30">
                LIVE ESCROW
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A7A8A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search creator, brand, brief..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-2 rounded-2xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all shadow-2xs"
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

            {/* Redesigned Clean Segmented Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F0F0F4] rounded-2xl border border-black/6">
              <button
                onClick={() => setActiveTab("all")}
                className={cn(
                  "flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5",
                  activeTab === "all"
                    ? "bg-white text-[#0A0A0E] shadow-[0_2px_6px_rgba(0,0,0,0.06)] border border-black/8"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                )}
              >
                <span>All</span>
                <span className={cn("text-[10px] font-mono px-1.5 py-0.2 rounded-full", activeTab === "all" ? "bg-[#0A0A0E] text-white" : "bg-black/5 text-[#6A6A78]")}>
                  {conversations.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("active")}
                className={cn(
                  "flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5",
                  activeTab === "active"
                    ? "bg-white text-[#0A0A0E] shadow-[0_2px_6px_rgba(0,0,0,0.06)] border border-black/8"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                )}
              >
                <span>Unread</span>
                {unreadCountTotal > 0 && (
                  <span className={cn("text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold", activeTab === "active" ? "bg-[#FFD21F] text-[#0A0A0E]" : "bg-[#FFD21F]/30 text-[#0A0A0E]")}>
                    {unreadCountTotal}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("escrow")}
                className={cn(
                  "flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5",
                  activeTab === "escrow"
                    ? "bg-white text-[#0A0A0E] shadow-[0_2px_6px_rgba(0,0,0,0.06)] border border-black/8"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                )}
              >
                <span>Escrow</span>
                <span className={cn("text-[10px] font-mono px-1.5 py-0.2 rounded-full", activeTab === "escrow" ? "bg-[#0A0A0E] text-white" : "bg-black/5 text-[#6A6A78]")}>
                  {escrowCountTotal || 2}
                </span>
              </button>
            </div>
          </div>

          {/* Conversation Channel List */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/5">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-[#7A7A8A]">
                <Inbox className="w-8 h-8 mx-auto text-[#8A8A9A]" />
                <p className="text-xs font-semibold">No channels match filter</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="text-xs text-[#0A0A0E] underline font-bold"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const partner =
                  conv.participants?.find((p) => (typeof p === "string" ? p !== user?.id : p.userId !== user?.id)) ||
                  conv.participants?.[0];
                const pName = typeof partner === "object" ? partner?.name : "Partner";
                const pAvatar =
                  typeof partner === "object" && partner?.avatarUrl
                    ? partner.avatarUrl
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";
                const pRole = typeof partner === "object" ? partner?.role : "brand";
                const isActive = conv.id === activeConvId;

                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-all ${
                      isActive
                        ? "bg-white border-l-4 border-[#FFD21F] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
                        : "hover:bg-black/[0.02]"
                    }`}
                  >
                    {/* Avatar & Online Dot */}
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-black/5 shrink-0 border border-black/10">
                      <Image src={pAvatar} alt={pName} fill className="object-cover" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-xs text-[#0A0A0E] truncate">{pName}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shrink-0 ${
                              pRole === "brand"
                                ? "bg-purple-100 text-purple-800"
                                : pRole === "agency_admin"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {pRole === "agency_admin" ? "Concierge" : pRole}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#7A7A8A] shrink-0">
                          {conv.lastMessage?.createdAt
                            ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Now"}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-[#5A5A68] truncate mb-0.5">{conv.campaignTitle}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#7A7A8A] truncate">
                          {conv.lastMessage?.content || "Tap to chat..."}
                        </p>
                        {conv.unreadCount && conv.unreadCount > 0 ? (
                          <span className="w-4 h-4 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 ml-2">
                            {conv.unreadCount}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT CHAT MESSAGE PANE (Cols 5-12) ── */}
        <div
          className={`md:col-span-8 flex flex-col h-full bg-white relative ${
            mobileView === "list" ? "hidden md:flex" : "flex"
          }`}
        >
          {activeConversation ? (
            <>
              {/* ── THREAD TOP HEADER ── */}
              <div className="p-3.5 sm:p-4 border-b border-black/8 flex items-center justify-between bg-[#FAFAFC]">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden p-2 rounded-xl bg-white border border-black/8 hover:bg-black/5 text-[#0A0A0E]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-black/5 shrink-0 border border-black/10">
                    <Image src={partnerAvatar} alt={partnerName} fill className="object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-[#0A0A0E] truncate">{partnerName}</h3>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                          partnerRole === "brand"
                            ? "bg-purple-100 text-purple-800"
                            : partnerRole === "agency_admin"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {partnerRole === "agency_admin" ? "VIP Desk" : partnerRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5A5A68] truncate font-medium">
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Now
                      </span>
                      <span>•</span>
                      <span className="truncate">{activeConversation.campaignTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-1 text-[#5A5A68]">
                  <button
                    onClick={() => setCallModal("audio")}
                    title="Start Voice Sync"
                    className="p-2.5 rounded-xl hover:bg-black/5 hover:text-[#0A0A0E] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCallModal("video")}
                    title="Start 4K Studio Video Call"
                    className="p-2.5 rounded-xl hover:bg-black/5 hover:text-[#0A0A0E] transition-colors"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowInfoDrawer(!showInfoDrawer)}
                    title="Brief & Escrow Details"
                    className={`p-2.5 rounded-xl transition-colors ${
                      showInfoDrawer ? "bg-black/10 text-[#0A0A0E]" : "hover:bg-black/5 hover:text-[#0A0A0E]"
                    }`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── MESSAGES SCROLL CONTAINER ── */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FFFFFF]">
                {/* Channel Security Banner */}
                <div className="p-3.5 rounded-2xl bg-[#FAFAFC] border border-black/6 flex items-center justify-between text-xs text-[#5A5A68]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Milestone Escrow Active: All agreements &amp; payments logged on audit trail.</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-black/10 text-[#0A0A0E]">
                    100% PROTECTED
                  </span>
                </div>

                {currentMessages.map((m) => {
                  const isMine = m.senderId === user?.id || m.senderRole === role;
                  const currentReactions = reactions[m.id] || [];

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col group relative ${isMine ? "items-end" : "items-start"}`}
                    >
                      {/* Sender Name & Time Header */}
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-xs font-bold text-[#5A5A68]">{m.senderName}</span>
                        <span className="text-[10px] font-mono text-[#8A8A9A]">
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      {/* Chat Bubble Container */}
                      <div className="relative max-w-lg">
                        <div
                          className={`p-4 rounded-3xl text-xs sm:text-sm font-sans leading-relaxed shadow-2xs ${
                            isMine
                              ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-medium border border-black/10 rounded-tr-xs"
                              : "bg-[#F8F8FC] border border-black/8 text-[#0A0A0E] rounded-tl-xs"
                          }`}
                        >
                          <p>{m.content}</p>

                          {/* Media Attachments Preview if present */}
                          {m.attachments && m.attachments.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-black/10 space-y-2">
                              {m.attachments.map((att, attIdx) => (
                                <div
                                  key={attIdx}
                                  className="p-2.5 rounded-2xl bg-white/80 border border-black/10 flex items-center justify-between gap-2 text-xs"
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    {att.type === "video" ? (
                                      <Play className="w-4 h-4 text-[#0A0A0E] shrink-0" />
                                    ) : (
                                      <FileText className="w-4 h-4 text-[#0A0A0E] shrink-0" />
                                    )}
                                    <span className="font-bold text-[#0A0A0E] truncate">{att.name || "Deliverable-Asset"}</span>
                                  </div>
                                  <a
                                    href={att.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-xl hover:bg-black/10 text-[#0A0A0E]"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Read Receipts Status */}
                          {isMine && (
                            <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-[#0A0A0E]/70 font-mono">
                              <CheckCheck className="w-3.5 h-3.5 text-[#0A0A0E]" />
                            </div>
                          )}
                        </div>

                        {/* Reaction Trigger Button on Hover */}
                        <div
                          className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${
                            isMine ? "-left-16" : "-right-16"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setReactionPopoverMsgId(reactionPopoverMsgId === m.id ? null : m.id)
                            }
                            className="p-1.5 rounded-full bg-white border border-black/10 shadow-xs hover:bg-[#F8F8FC] text-xs"
                          >
                            <Smile className="w-3.5 h-3.5 text-[#5A5A68]" />
                          </button>
                        </div>

                        {/* Reaction Popover Bar */}
                        {reactionPopoverMsgId === m.id && (
                          <div
                            className={`absolute bottom-full mb-1 z-30 bg-white rounded-full border border-black/10 shadow-lg p-1 flex items-center gap-1 ${
                              isMine ? "right-0" : "left-0"
                            }`}
                          >
                            {["👍", "❤️", "🚀", "🔥", "✨", "👏"].map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleAddReaction(m.id, emoji)}
                                className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-sm transition-transform hover:scale-125"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Displayed Active Reactions Pills */}
                        {currentReactions.length > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            {currentReactions.map((emoji, eIdx) => (
                              <span
                                key={eIdx}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-black/10 text-xs shadow-xs font-medium"
                              >
                                <span>{emoji}</span>
                                <span className="text-[10px] font-mono font-bold text-[#5A5A68]">1</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Live Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5A68] animate-fade-in">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-black/10">
                      <Image src={partnerAvatar} alt={partnerName} fill className="object-cover" />
                    </div>
                    <div className="px-3 py-2 rounded-2xl bg-[#F8F8FC] border border-black/8 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0E] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0E] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0E] animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span>{partnerName} is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ── QUICK ACTION PROMPTS BAR ── */}
              <div className="px-4 py-2 bg-[#FAFAFC] border-t border-black/6 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
                <span className="text-[#8A8A9A] shrink-0 font-bold text-[11px]">Quick:</span>
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FFD21F]/20 border border-black/8 text-[#0A0A0E] font-medium whitespace-nowrap transition-colors shadow-2xs"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* ── AUDIO RECORDING BAR SIMULATOR ── */}
              {isRecordingAudio && (
                <div className="p-3 bg-red-50 border-t border-red-200 flex items-center justify-between text-xs text-red-700 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="font-semibold">Recording Voice Memo: {audioTimer}s (High-Fidelity Audio)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsRecordingAudio(false)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsRecordingAudio(false);
                        handleSendMessage(`🎙️ Voice Memo (${audioTimer}s attachment)`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-bold shadow-xs"
                    >
                      Send Audio
                    </button>
                  </div>
                </div>
              )}

              {/* ── BOTTOM INPUT COMPOSER ── */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 sm:p-4 border-t border-black/8 bg-white flex items-center gap-2 sm:gap-3"
              >
                {/* File Attachment Hidden Input */}
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
                  title="Upload Video Deliverable / File"
                  className="p-2.5 rounded-full hover:bg-black/5 text-[#5A5A68] hover:text-[#0A0A0E] transition-colors shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsRecordingAudio(!isRecordingAudio)}
                  title="Record Voice Memo"
                  className={`p-2.5 rounded-full transition-colors shrink-0 ${
                    isRecordingAudio ? "bg-red-100 text-red-600" : "hover:bg-black/5 text-[#5A5A68]"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  placeholder="Type your message, timestamped notes, or brief updates..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-[#F8F8FC] border border-black/10 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 flex items-center gap-1.5 disabled:opacity-40 transition-all shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-[#0A0A0E]" />
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 text-[#7A7A8A]">
              <MessageSquare className="w-12 h-12 text-[#8A8A9A]" />
              <h3 className="font-bold text-sm text-[#0A0A0E]">Select a channel from the left</h3>
              <p className="text-xs max-w-xs font-medium">
                Initiate encrypted communication regarding campaign deliverables, creative briefs, or escrow tranches.
              </p>
            </div>
          )}

          {/* ── RIGHT SLIDEOVER INFO DRAWER (CAMPAIGN & ESCROW DETAILS) ── */}
          {showInfoDrawer && activeConversation && (
            <div className="absolute top-0 right-0 bottom-0 w-80 bg-white border-l border-black/10 shadow-2xl p-6 flex flex-col justify-between z-20 animate-fade-in">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-black/8">
                  <h4 className="font-bold font-display text-sm text-[#0A0A0E]">Brief &amp; Escrow Telemetry</h4>
                  <button
                    onClick={() => setShowInfoDrawer(false)}
                    className="p-1.5 rounded-xl hover:bg-black/5 text-[#5A5A68]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FAFAFC] border border-black/8 space-y-2">
                    <span className="text-[10px] font-mono text-[#5A5A68] uppercase font-bold">Active Campaign</span>
                    <p className="font-bold text-xs text-[#0A0A0E]">{activeConversation.campaignTitle}</p>
                    <Link
                      href="/app/collaborations"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A0A0E] underline pt-1"
                    >
                      <span>Open in 4K QA Player</span>
                      <CornerDownRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFD21F]/15 border border-[#FFD21F]/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5A5A68] font-medium">Escrow Vault:</span>
                      <span className="font-black text-[#0A0A0E] text-sm font-mono">{formatCurrency(4500)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5A5A68] font-medium">Status:</span>
                      <span className="font-bold text-emerald-700">100% PRE-FUNDED</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-extrabold text-[#0A0A0E] uppercase tracking-wider text-[10px]">
                    Channel Participants
                  </span>
                  <div className="space-y-2">
                    {activeConversation.participants?.map((p, idx) => {
                      const pObj = typeof p === "object" ? p : { name: "Participant", role: "brand", avatarUrl: "" };
                      return (
                        <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#F8F8FC] border border-black/5">
                          <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-black/10">
                            {pObj.avatarUrl ? (
                              <Image src={pObj.avatarUrl} alt={pObj.name} fill className="object-cover" />
                            ) : null}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-bold text-xs text-[#0A0A0E] truncate">{pObj.name}</p>
                            <span className="text-[10px] text-[#5A5A68] uppercase font-semibold">{pObj.role}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/8">
                <Link
                  href="/app/collaborations"
                  className="w-full py-3 rounded-full bg-[#0A0A0E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#1A1A24] transition-colors"
                >
                  <span>Go to Video Review Studio</span>
                  <Play className="w-3.5 h-3.5 text-[#FFD21F]" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
