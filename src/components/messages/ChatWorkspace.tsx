"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { messageService } from "@/services/message.service";
import { ChatMessage, Conversation, UserRole } from "@/core/types";
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
  Plus,
  Trash2,
  Smile,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

// Standard emoji reactions available on messages
const QUICK_EMOJIS = ["👍", "❤️", "🔥", "🚀", "👏"];

// Helper for user initials avatar
function AvatarFallback({ name, className }: { name: string; className?: string }) {
  const initials = (name || "U")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#FFD21F] text-[#0A0A0E] font-bold text-xs rounded-2xl shrink-0 select-none",
        className
      )}
    >
      {initials}
    </div>
  );
}

interface RecipientOption {
  userId: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  subtitle: string;
}

export function ChatWorkspace() {
  const { user, role } = useAuthStore();

  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "brands" | "creators">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // Partner typing indicator state
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  // Staged attachment (prior to sending)
  const [stagedAttachment, setStagedAttachment] = useState<{
    type: "image" | "video" | "file";
    url: string;
    name: string;
    size: string;
  } | null>(null);

  // Attachment preview lightbox modal
  const [previewMedia, setPreviewMedia] = useState<{
    type: "image" | "video";
    url: string;
    name: string;
  } | null>(null);

  // "New Conversation" modal state
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [availableRecipients, setAvailableRecipients] = useState<RecipientOption[]>([]);
  const [recipientSearch, setRecipientSearch] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientOption | null>(null);
  const [newChatTopic, setNewChatTopic] = useState("");
  const [newChatInitialMessage, setNewChatInitialMessage] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // Active message actions popup
  const [activeReactionMenuMsgId, setActiveReactionMenuMsgId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (smooth = false) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesMap, activeConvId, isPartnerTyping]);

  // Initial fetch of conversations
  const loadConversations = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const convs = await messageService.getConversations(user?.id);
      setConversations(convs || []);

      if (convs && convs.length > 0) {
        setActiveConvId((current) => {
          if (current && convs.some((c) => c.id === current)) return current;
          return convs[0].id;
        });
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load messages for the active conversation
  const loadActiveMessages = useCallback(async (convId: string, silent = false) => {
    if (!convId) return;
    try {
      const msgs = await messageService.getMessages(convId);
      setMessagesMap((prev) => ({ ...prev, [convId]: msgs || [] }));
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  }, []);

  useEffect(() => {
    if (activeConvId) {
      loadActiveMessages(activeConvId);
      // Mark as read
      if (user?.id) {
        messageService.markAsRead(activeConvId, user.id);
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConvId ? { ...c, unreadCount: 0 } : c))
        );
      }
    }
  }, [activeConvId, loadActiveMessages, user?.id]);

  // Live polling synchronization every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadConversations(true);
      if (activeConvId) {
        loadActiveMessages(activeConvId, true);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeConvId, loadConversations, loadActiveMessages]);

  // Fetch recipients for "New Conversation" modal
  useEffect(() => {
    if (!isNewChatModalOpen) return;
    const fetchRecipients = async () => {
      try {
        const [creatorsRes, brandsRes] = await Promise.all([
          fetch("/api/creators").catch(() => null),
          fetch("/api/brands").catch(() => null),
        ]);

        const recipients: RecipientOption[] = [
          {
            userId: "user-admin",
            name: "AbeyCollab Concierge & Escrow Desk",
            role: "agency_admin",
            avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
            subtitle: "Official Platform Support & Dispute Assistance",
          },
        ];

        if (creatorsRes && creatorsRes.ok) {
          const creators = await creatorsRes.json();
          if (Array.isArray(creators)) {
            creators.forEach((c: any) => {
              if (c.userId !== user?.id) {
                recipients.push({
                  userId: c.userId || c.id,
                  name: c.fullName || c.name || "Creator",
                  role: "creator",
                  avatarUrl: c.avatarUrl || "",
                  subtitle: `${c.primaryCategory || c.niche || "Creator"} • ${c.totalFollowers ? `${(c.totalFollowers / 1000).toFixed(0)}K Reach` : "Verified Talent"}`,
                });
              }
            });
          }
        }

        if (brandsRes && brandsRes.ok) {
          const brands = await brandsRes.json();
          if (Array.isArray(brands)) {
            brands.forEach((b: any) => {
              if (b.userId !== user?.id) {
                recipients.push({
                  userId: b.userId || b.id,
                  name: b.companyName || b.name || "Brand",
                  role: "brand",
                  avatarUrl: b.logoUrl || "",
                  subtitle: `${b.industry || "Brand"} • Verified Escrow Partner`,
                });
              }
            });
          }
        }

        setAvailableRecipients(recipients);
      } catch (err) {
        console.error("Failed to load recipients:", err);
      }
    };
    fetchRecipients();
  }, [isNewChatModalOpen, user?.id]);

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const activePartner =
    activeConversation?.participants?.find((p) =>
      typeof p === "string" ? p !== user?.id : p.userId !== user?.id
    ) || activeConversation?.participants?.[0];

  const partnerName =
    typeof activePartner === "object" ? activePartner?.name : "Collaboration Partner";
  const partnerRole = typeof activePartner === "object" ? activePartner?.role : "brand";
  const partnerAvatar =
    typeof activePartner === "object" && activePartner?.avatarUrl ? activePartner.avatarUrl : "";

  const currentMessages = messagesMap[activeConvId] || [];

  // Switch active conversation
  const handleSelectConv = async (convId: string) => {
    setActiveConvId(convId);
    setMobileView("chat");
    if (user?.id) {
      messageService.markAsRead(convId, user.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
      );
    }
  };

  // Delete / Archive conversation
  const handleDeleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await messageService.deleteConversation(convId);
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (activeConvId === convId) {
        const remaining = conversations.filter((c) => c.id !== convId);
        setActiveConvId(remaining.length > 0 ? remaining[0].id : "");
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  // Trigger simulated smart partner response
  const triggerSimulatedPartnerReply = (sentContent: string, currentConvId: string) => {
    if (!partnerName || partnerName.includes("Me")) return;

    setTimeout(() => {
      setIsPartnerTyping(true);
      scrollToBottom(true);

      setTimeout(async () => {
        setIsPartnerTyping(false);

        // Context-aware response generation
        let replyContent = "Sounds great! Looking forward to aligning on the next milestone deliverable.";
        const lower = sentContent.toLowerCase();

        if (lower.includes("script") || lower.includes("draft") || lower.includes("cut") || lower.includes("video")) {
          replyContent = `Thanks for sharing! Our team is reviewing the cut now. We'll leave any timestamped notes directly in the 4K QA player within 24 hours.`;
        } else if (lower.includes("escrow") || lower.includes("pay") || lower.includes("rate") || lower.includes("budget")) {
          replyContent = `The milestone escrow funds are 100% pre-funded and held in the platform vault. Payout disburses immediately upon deliverable sign-off.`;
        } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
          replyContent = `Hello! Excited to collaborate with you on this brief. What timeline are you thinking for the initial rough cut?`;
        } else if (lower.includes("shared:") || stagedAttachment) {
          replyContent = `Received the file! Downloading the asset now to verify resolution and specs.`;
        }

        const partnerMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId: currentConvId,
          senderId: typeof activePartner === "object" ? activePartner.userId : "partner",
          senderName: partnerName,
          senderAvatar: partnerAvatar,
          senderRole: partnerRole as any,
          content: replyContent,
          attachments: [],
          reactions: [],
          readBy: [],
          createdAt: new Date().toISOString(),
        };

        setMessagesMap((prev) => ({
          ...prev,
          [currentConvId]: [...(prev[currentConvId] || []), partnerMsg],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.id === currentConvId
              ? {
                  ...c,
                  lastMessage: { content: replyContent, senderName: partnerName, createdAt: partnerMsg.createdAt },
                  updatedAt: partnerMsg.createdAt,
                }
              : c
          )
        );

        // Persist partner response
        await messageService.sendMessage(
          currentConvId,
          partnerMsg.senderId,
          partnerMsg.senderRole,
          partnerMsg.senderName,
          partnerMsg.senderAvatar,
          partnerMsg.content,
          []
        );
      }, 2500);
    }, 1200);
  };

  // Send message handler
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const messageContent = inputText.trim();
    if ((!messageContent && !stagedAttachment) || !activeConvId) return;

    const senderName = user?.name || (role === "brand" ? "Brand Partner" : "Elena Rostova");
    const senderAvatar = user?.avatarUrl || (role === "brand" ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80");
    const senderRole = role || "creator";

    const currentStaged = stagedAttachment ? [{ ...stagedAttachment }] : [];
    const finalContent = messageContent || (stagedAttachment ? `Shared attachment: ${stagedAttachment.name}` : "");

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user?.id || "user-current",
      senderName,
      senderAvatar,
      senderRole,
      content: finalContent,
      attachments: currentStaged,
      reactions: [],
      createdAt: new Date().toISOString(),
      readBy: [user?.id || "user-current"],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg],
    }));

    setInputText("");
    setStagedAttachment(null);

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: { content: finalContent, senderName, createdAt: newMsg.createdAt },
              updatedAt: newMsg.createdAt,
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

      // Trigger realistic smart auto-reply
      triggerSimulatedPartnerReply(finalContent, activeConvId);
    } catch (err) {
      console.error("Failed to persist message:", err);
    }
  };

  // Toggle emoji reactions
  const handleToggleReaction = async (messageId: string, emoji: string) => {
    const currentUserId = user?.id || "user-current";
    setActiveReactionMenuMsgId(null);

    // Optimistic UI update
    setMessagesMap((prev) => {
      const msgs = prev[activeConvId] || [];
      const updated = msgs.map((m) => {
        if (m.id !== messageId) return m;

        const reactions = m.reactions ? [...m.reactions] : [];
        const existing = reactions.find((r) => r.emoji === emoji);

        if (existing) {
          if (existing.users.includes(currentUserId)) {
            existing.users = existing.users.filter((u) => u !== currentUserId);
            existing.count = existing.users.length;
          } else {
            existing.users.push(currentUserId);
            existing.count = existing.users.length;
          }
        } else {
          reactions.push({ emoji, count: 1, users: [currentUserId] });
        }

        return {
          ...m,
          reactions: reactions.filter((r) => r.count > 0),
        };
      });

      return { ...prev, [activeConvId]: updated };
    });

    try {
      await messageService.toggleReaction(messageId, emoji, currentUserId);
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
    }
  };

  // Stage local file upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.includes("video") || file.name.endsWith(".mp4") || file.name.endsWith(".mov");
    const isImage = file.type.includes("image") || file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg");

    const staged = {
      type: (isVideo ? "video" : isImage ? "image" : "file") as "image" | "video" | "file",
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };

    setStagedAttachment(staged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Create new conversation via modal
  const handleCreateNewConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipient) return;

    setIsCreatingChat(true);
    try {
      const newConv = await messageService.createConversation({
        recipientId: selectedRecipient.userId,
        recipientName: selectedRecipient.name,
        recipientRole: selectedRecipient.role,
        recipientAvatar: selectedRecipient.avatarUrl,
        campaignTitle: newChatTopic.trim() || (selectedRecipient.role === "brand" ? "Campaign Collaboration" : "Direct Brief Proposal"),
        initialMessage: newChatInitialMessage.trim() || undefined,
        senderId: user?.id,
        senderRole: role || "creator",
      });

      if (newConv) {
        setConversations((prev) => [newConv, ...prev]);
        setActiveConvId(newConv.id);
        if (newChatInitialMessage.trim()) {
          const initialMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            conversationId: newConv.id,
            senderId: user?.id || "user-current",
            senderName: user?.name || "Me",
            senderAvatar: user?.avatarUrl || "",
            senderRole: role || "creator",
            content: newChatInitialMessage.trim(),
            attachments: [],
            reactions: [],
            createdAt: new Date().toISOString(),
            readBy: [user?.id || "user-current"],
          };
          setMessagesMap((prev) => ({ ...prev, [newConv.id]: [initialMsg] }));
        }

        setIsNewChatModalOpen(false);
        setSelectedRecipient(null);
        setNewChatTopic("");
        setNewChatInitialMessage("");
        setMobileView("chat");
      }
    } catch (err) {
      console.error("Failed to create conversation:", err);
    } finally {
      setIsCreatingChat(false);
    }
  };

  // Filter conversations based on search and active tab
  const filteredConversations = conversations.filter((c) => {
    const partner =
      c.participants?.find((p) =>
        typeof p === "string" ? p !== user?.id : p.userId !== user?.id
      ) || c.participants?.[0];

    const pName = typeof partner === "object" ? partner?.name : "";
    const pRole = typeof partner === "object" ? partner?.role : "";

    // Tab filtering
    if (activeTab === "unread" && (!c.unreadCount || c.unreadCount === 0)) return false;
    if (activeTab === "brands" && pRole !== "brand") return false;
    if (activeTab === "creators" && pRole !== "creator") return false;

    // Search filtering
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.campaignTitle.toLowerCase().includes(q) ||
      pName.toLowerCase().includes(q) ||
      (c.lastMessage?.content && c.lastMessage.content.toLowerCase().includes(q))
    );
  });

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center rounded-3xl bg-white border border-black/8 text-[#0A0A0E] shadow-xs space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-[#FFD21F] border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-[#0A0A0E] font-display">Syncing Live Message Channels...</p>
        <p className="text-[11px] text-[#7A7A8A]">Connecting to encrypted collaboration threads...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-white border border-black/8 shadow-xs overflow-hidden h-full w-full text-[#0A0A0E] flex flex-col select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden h-full">

        {/* ══════════════════════════════════════════════════════════════════════
            LEFT COLUMN: DYNAMIC CHAT LIST & CONTROLS
            ══════════════════════════════════════════════════════════════════════ */}
        <div
          className={`md:col-span-4 border-r border-black/8 flex flex-col h-full bg-[#FAFAFC] overflow-hidden ${
            mobileView === "chat" ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Header Strip */}
          <div className="p-4 border-b border-black/8 dark:border-white/10 space-y-3 bg-white dark:bg-[#12121A] shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#FFD21F] flex items-center justify-center shadow-2xs">
                  <MessageSquare className="w-4 h-4 text-[#0A0A0E]" />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm text-[#0A0A0E] dark:text-white font-display tracking-tight leading-none">
                    Messages
                  </h2>
                  <span className="text-[10px] font-mono text-[#7A7A8A]">
                    {conversations.length} Active Channels
                  </span>
                </div>
              </div>

              {/* Action: New Conversation */}
              <button
                onClick={() => setIsNewChatModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs shadow-2xs border border-black/10 transition-all hover-lift active:scale-95"
                title="Start a new message thread"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Filter Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A7A8A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search messages, creators, briefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-2xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#7A7A8A] hover:text-[#0A0A0E]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-0.5">
              {[
                { id: "all", label: "All" },
                { id: "unread", label: "Unread" },
                { id: "brands", label: "Brands" },
                { id: "creators", label: "Creators" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all shrink-0 select-none",
                    activeTab === tab.id
                      ? "bg-[#0A0A0E] dark:bg-[#222234] text-white dark:text-[#FFD21F] border border-transparent dark:border-[#FFD21F]/40 shadow-2xs font-bold"
                      : "bg-[#F0F0F4] dark:bg-[#14141E] hover:bg-[#EAEAEF] dark:hover:bg-[#1E1E2C] text-[#6A6A78] dark:text-[#8E8EA4]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/5 dark:divide-white/5">
            {conversations.length === 0 ? (
              <div className="p-8 text-center space-y-3 text-[#7A7A8A]">
                <Inbox className="w-8 h-8 mx-auto text-[#C0C0CC]" />
                <div>
                  <p className="text-xs font-bold text-[#0A0A0E] dark:text-[#F4F4F8]">No conversations yet</p>
                  <p className="text-[11px] mt-1 leading-relaxed text-[#7A7A8A]">
                    Click &ldquo;New Chat&rdquo; to start messaging any creator, brand, or platform support.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewChatModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] text-xs font-bold shadow-2xs"
                >
                  Start Conversation
                </button>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-[#7A7A8A]">
                <p className="text-xs font-semibold">No channels match &ldquo;{searchQuery || activeTab}&rdquo;</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="text-xs text-[#0A0A0E] dark:text-[#FFD21F] underline font-bold"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const partner =
                  conv.participants?.find((p) =>
                    typeof p === "string" ? p !== user?.id : p.userId !== user?.id
                  ) || conv.participants?.[0];

                const pName = typeof partner === "object" ? partner?.name : "Collaborator";
                const pAvatar = typeof partner === "object" && partner?.avatarUrl ? partner.avatarUrl : "";
                const pRole = typeof partner === "object" ? partner?.role : "brand";
                const isActive = conv.id === activeConvId;

                return (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConv(conv.id)}
                    className={cn(
                      "w-full p-4 text-left flex items-start gap-3 transition-all cursor-pointer group relative",
                      isActive
                        ? "bg-white dark:bg-[#1C1C2C] border-l-3 border-[#FFD21F] shadow-xs"
                        : "hover:bg-white/70 dark:hover:bg-white/5"
                    )}
                  >
                    {/* Avatar with Online Presence Dot */}
                    <div className="relative w-10 h-10 shrink-0">
                      {pAvatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pAvatar} alt={pName} className="w-10 h-10 rounded-2xl object-cover border border-black/8" />
                      ) : (
                        <AvatarFallback name={pName} className="w-10 h-10" />
                      )}
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>

                    {/* Chat Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-bold text-xs text-[#0A0A0E] dark:text-[#F4F4F8] truncate font-display">{pName}</span>
                          <span
                            className={cn(
                              "text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0",
                              pRole === "brand"
                                ? "bg-purple-100 text-purple-700"
                                : pRole === "agency_admin"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
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

                      <p className="text-[11px] font-semibold text-[#5A5A68] truncate mb-1">
                        {conv.campaignTitle}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-[#8A8A9A] truncate">
                          {conv.lastMessage?.content || "Tap to open channel..."}
                        </p>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {conv.unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-extrabold font-mono shadow-2xs">
                              {conv.unreadCount}
                            </span>
                          )}

                          {/* Quick Delete Option on Hover */}
                          <button
                            onClick={(e) => handleDeleteConversation(conv.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded-md text-[#A0A0B0] hover:text-rose-600 transition-opacity"
                            title="Delete channel"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            RIGHT COLUMN: ACTIVE CHAT PANE & COMPOSER
            ══════════════════════════════════════════════════════════════════════ */}
        <div
          className={`md:col-span-8 flex flex-col h-full bg-white relative overflow-hidden ${
            mobileView === "list" ? "hidden md:flex" : "flex"
          }`}
        >
          {activeConversation ? (
            <>
              {/* Header Bar */}
              <div className="px-4 sm:px-6 py-3 border-b border-black/8 flex items-center justify-between bg-[#FAFAFC] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
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
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-[#0A0A0E] dark:text-white truncate font-display">{partnerName}</h3>
                      <span
                        className={cn(
                          "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0",
                          partnerRole === "brand"
                            ? "bg-purple-100 text-purple-700"
                            : partnerRole === "agency_admin"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {partnerRole === "agency_admin" ? "Admin" : partnerRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#6A6A78]">
                      <span className="truncate">{activeConversation.campaignTitle}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Escrow Protected</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Top Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeConversation.campaignId) {
                        window.open(`/campaigns/${activeConversation.campaignId}`, "_blank");
                      }
                    }}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#F4F4F8] border border-black/8 text-xs font-semibold text-[#5A5A68] hover:text-[#0A0A0E] transition-colors"
                  >
                    <span>Brief</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-white"
              >
                {currentMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-[#9A9AA8]">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F8FC] border border-black/8 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#FFD21F]" />
                    </div>
                    <p className="text-xs font-bold text-[#0A0A0E]">Conversation Initiated</p>
                    <p className="text-[11px] max-w-xs text-[#7A7A8A]">
                      Send your initial brief, schedule requirements, or question to start collaborating.
                    </p>
                  </div>
                ) : (
                  currentMessages.map((m) => {
                    const isMine = m.senderId === user?.id || m.senderId === "user-current";
                    const isReactionMenuOpen = activeReactionMenuMsgId === m.id;

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col group relative ${isMine ? "items-end" : "items-start"}`}
                      >
                        {/* Sender Label & Timestamp */}
                        <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono text-[#8A8A9A]">
                          <span className="font-bold text-[#4A4A58]">{m.senderName}</span>
                          <span>•</span>
                          <span>
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Bubble Container with Hover Reaction Bar */}
                        <div className="relative group/bubble max-w-sm sm:max-w-md">
                          {/* Floating Reaction Bar */}
                          <div
                            className={cn(
                              "absolute -top-7 z-20 bg-white border border-black/10 rounded-full px-1.5 py-0.5 shadow-md flex items-center gap-1 transition-opacity",
                              isMine ? "right-0" : "left-0",
                              isReactionMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 group-hover/bubble:opacity-100"
                            )}
                          >
                            {QUICK_EMOJIS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleToggleReaction(m.id, emoji)}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#F4F4F8] hover:scale-125 transition-transform text-xs"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={cn(
                              "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs transition-all",
                              isMine
                                ? "bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] font-medium border border-black/10 rounded-tr-sm"
                                : "bg-[#F5F5F9] border border-black/6 text-[#0A0A0E] rounded-tl-sm"
                            )}
                          >
                            <p className="whitespace-pre-wrap break-words">{m.content}</p>

                            {/* Render Attachments */}
                            {m.attachments && m.attachments.length > 0 && (
                              <div className="mt-2.5 pt-2 border-t border-black/10 space-y-2">
                                {m.attachments.map((att, i) => (
                                  <div
                                    key={i}
                                    className="p-2.5 rounded-xl bg-white/90 border border-black/10 flex items-center justify-between gap-2 text-xs shadow-2xs"
                                  >
                                    <div
                                      onClick={() => {
                                        if (att.type === "image" || att.type === "video") {
                                          setPreviewMedia({ type: att.type, url: att.url, name: att.name });
                                        }
                                      }}
                                      className="flex items-center gap-2 overflow-hidden cursor-pointer hover:underline"
                                    >
                                      {att.type === "video" ? (
                                        <div className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                          <Play className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                      ) : att.type === "image" ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={att.url} alt={att.name} className="w-6 h-6 rounded-lg object-cover border border-black/10 shrink-0" />
                                      ) : (
                                        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                          <FileText className="w-3.5 h-3.5" />
                                        </div>
                                      )}
                                      <span className="font-bold text-[#0A0A0E] truncate">{att.name}</span>
                                      {att.size && <span className="text-[10px] text-[#7A7A8A]">({att.size})</span>}
                                    </div>

                                    <a
                                      href={att.url}
                                      download={att.name}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 rounded-lg hover:bg-black/10 text-[#0A0A0E] shrink-0"
                                      title="Download attachment"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Read Receipt */}
                            {isMine && (
                              <div className="flex justify-end items-center gap-1 mt-1 text-[10px] font-mono text-[#0A0A0E]/50">
                                <span>Sent</span>
                                <CheckCheck className="w-3.5 h-3.5 text-[#0A0A0E]/70" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reaction Pill Counters Below Bubble */}
                        {m.reactions && m.reactions.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 mt-1.5 px-1">
                            {m.reactions.map((r) => {
                              const userReacted = r.users.includes(user?.id || "user-current");
                              return (
                                <button
                                  key={r.emoji}
                                  onClick={() => handleToggleReaction(m.id, r.emoji)}
                                  className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 border transition-all shadow-2xs",
                                    userReacted
                                      ? "bg-[#FFD21F]/30 border-[#FFD21F] text-[#0A0A0E]"
                                      : "bg-white border-black/8 text-[#5A5A68] hover:bg-[#F8F8FC]"
                                  )}
                                >
                                  <span>{r.emoji}</span>
                                  <span>{r.count}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}

                {/* Animated Partner Typing Indicator */}
                {isPartnerTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#7A7A8A] font-medium animate-pulse py-1">
                    <div className="flex items-center gap-1 bg-[#F5F5F9] px-3 py-2 rounded-2xl border border-black/6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A9A] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A9A] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A8A9A] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] font-bold text-[#0A0A0E] ml-1.5 font-display">{partnerName} is typing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Composer Box */}
              <div className="border-t border-black/8 bg-white p-3 sm:p-4 shrink-0 space-y-2">
                {/* Staged Attachment Preview Pill */}
                {stagedAttachment && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#FFD21F]/60 text-xs font-mono shadow-2xs animate-fadeIn">
                    {stagedAttachment.type === "video" ? (
                      <Play className="w-3.5 h-3.5 text-red-600" />
                    ) : stagedAttachment.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={stagedAttachment.url} alt="" className="w-4 h-4 rounded object-cover" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    <span className="font-bold text-[#0A0A0E] max-w-xs truncate">{stagedAttachment.name}</span>
                    <span className="text-[#888898]">({stagedAttachment.size})</span>
                    <button
                      type="button"
                      onClick={() => setStagedAttachment(null)}
                      className="p-0.5 hover:bg-black/10 rounded-full text-[#6A6A78]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,video/*,application/pdf"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-full hover:bg-[#F4F4F8] text-[#6A6A78] hover:text-[#0A0A0E] transition-colors shrink-0"
                    title="Attach image, video or deliverable"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder={`Message ${partnerName}... (Press Enter to send)`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-[#F8F8FC] border border-black/8 rounded-full px-4 py-2.5 text-sm font-medium text-[#0A0A0E] placeholder:text-[#9A9AA8] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 transition-all shadow-2xs"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() && !stagedAttachment}
                    className="p-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFE052] hover:from-[#FFE052] hover:to-[#FFD21F] border border-black/10 text-[#0A0A0E] transition-all disabled:opacity-30 shrink-0 shadow-xs hover-lift active:scale-95"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Blank state when no conversation is selected */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-[#8A8A9A]">
              <div className="w-14 h-14 rounded-3xl bg-[#FAF9F5] border border-[#FFD21F]/40 flex items-center justify-center shadow-xs">
                <MessageSquare className="w-7 h-7 text-[#FFD21F]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-[#0A0A0E] dark:text-white font-display">
                  {conversations.length === 0 ? "No Active Channels" : "Select a Channel"}
                </h3>
                <p className="text-xs max-w-sm leading-relaxed text-[#6A6A78]">
                  {conversations.length === 0
                    ? "Start a direct conversation with any creator or brand on the platform."
                    : "Choose a collaboration from the left to view messages and deliverable drafts."}
                </p>
              </div>
              <button
                onClick={() => setIsNewChatModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] font-bold text-xs shadow-xs border border-black/10 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start New Conversation</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: START NEW CONVERSATION
          ══════════════════════════════════════════════════════════════════════ */}
      <Modal
        isOpen={isNewChatModalOpen}
        onClose={() => {
          setIsNewChatModalOpen(false);
          setSelectedRecipient(null);
        }}
        title="Start New Conversation"
        description="Initiate a direct messaging thread with verified creators or brand partners."
        maxWidth="md"
      >
        <form onSubmit={handleCreateNewConversation} className="space-y-4 text-[#0A0A0E]">
          {/* Recipient Search & Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold font-mono uppercase text-[#5A5A68]">
              Select Partner / Recipient
            </label>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A7A8A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by creator name, niche, or brand..."
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F]"
              />
            </div>

            {/* Recipient Radio Card List */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 border border-black/8 rounded-2xl p-2 bg-[#FAFAFC]">
              {availableRecipients
                .filter((r) => {
                  if (!recipientSearch) return true;
                  const q = recipientSearch.toLowerCase();
                  return r.name.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q);
                })
                .map((rec) => {
                  const isSelected = selectedRecipient?.userId === rec.userId;
                  return (
                    <div
                      key={rec.userId}
                      onClick={() => setSelectedRecipient(rec)}
                      className={cn(
                        "p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                        isSelected
                          ? "bg-[#FFD21F]/20 border-[#FFD21F] shadow-2xs font-bold"
                          : "bg-white border-black/5 hover:border-black/15"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {rec.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={rec.avatarUrl} alt={rec.name} className="w-8 h-8 rounded-xl object-cover border border-black/8 shrink-0" />
                        ) : (
                          <AvatarFallback name={rec.name} className="w-8 h-8" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0A0A0E] truncate">{rec.name}</p>
                          <p className="text-[10px] text-[#7A7A8A] truncate">{rec.subtitle}</p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0",
                          rec.role === "brand"
                            ? "bg-purple-100 text-purple-700"
                            : rec.role === "agency_admin"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        )}
                      >
                        {rec.role === "agency_admin" ? "Concierge" : rec.role}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Topic / Campaign Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold font-mono uppercase text-[#5A5A68]">
              Topic / Campaign Subject
            </label>
            <input
              type="text"
              placeholder="e.g. 4K Product Showcase Reel Integration"
              value={newChatTopic}
              onChange={(e) => setNewChatTopic(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F]"
            />
          </div>

          {/* Opening Message */}
          <div className="space-y-1">
            <label className="text-xs font-bold font-mono uppercase text-[#5A5A68]">
              Opening Message
            </label>
            <textarea
              rows={3}
              placeholder="Type your introductory note or collaboration inquiry..."
              value={newChatInitialMessage}
              onChange={(e) => setNewChatInitialMessage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F8F8FC] border border-black/8 text-xs font-medium text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] resize-none"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={!selectedRecipient || isCreatingChat}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-extrabold text-xs shadow-xs border border-black/10 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {isCreatingChat ? (
              <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Open Channel &amp; Send</span>
              </>
            )}
          </button>
        </form>
      </Modal>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: ATTACHMENT LIGHTBOX PREVIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {previewMedia && (
        <div
          onClick={() => setPreviewMedia(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {previewMedia.type === "video" ? (
              <video
                src={previewMedia.url}
                controls
                autoPlay
                className="w-full max-h-[75vh] object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewMedia.url}
                alt={previewMedia.name}
                className="w-full max-h-[75vh] object-contain mx-auto"
              />
            )}

            <div className="p-4 bg-zinc-900 flex items-center justify-between text-white text-xs font-mono">
              <span className="truncate">{previewMedia.name}</span>
              <a
                href={previewMedia.url}
                download={previewMedia.name}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
