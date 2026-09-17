"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUIStore } from "@/stores/ui.store";
import { Conversation, ChatMessage } from "@/core/types";
import {
  MessageSquare,
  ShieldAlert,
  Search,
  AlertTriangle,
  Users,
  Send,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { formatDistanceToNow } from "date-fns";

export default function AdminCommunicationsPage() {
  const { addToast } = useUIStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [flaggedConvs, setFlaggedConvs] = useState<
    Array<{ conversation: Conversation; flagReason: string; flaggedMessage: ChatMessage }>
  >([]);
  const [stats, setStats] = useState({ totalConversations: 0, totalMessages: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "flagged">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Inspector state
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [convMessages, setConvMessages] = useState<ChatMessage[]>([]);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [adminNoticeText, setAdminNoticeText] = useState("");
  const [isSendingNotice, setIsSendingNotice] = useState(false);

  const fetchCommunications = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.recentConversations || []);
        setFlaggedConvs(data.flaggedConversations || []);
        setStats({
          totalConversations: data.totalConversations || 0,
          totalMessages: data.totalMessages || 0,
        });
      }
    } catch {
      addToast({ type: "error", title: "Error", message: "Failed to load communications telemetry." });
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchCommunications();
  }, [fetchCommunications]);

  const handleInspectConversation = async (conv: Conversation) => {
    setSelectedConv(conv);
    setIsInspectorOpen(true);
    try {
      const res = await fetch(`/api/messages?conversationId=${encodeURIComponent(conv.id)}`);
      if (res.ok) {
        const data = await res.json();
        setConvMessages(data.messages || []);
      }
    } catch {
      setConvMessages([]);
    }
  };

  const handleSendAdminNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConv || !adminNoticeText.trim() || isSendingNotice) return;

    setIsSendingNotice(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedConv.id,
          content: adminNoticeText.trim(),
          noticeType: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setConvMessages((prev) => [...prev, data.message]);
        setAdminNoticeText("");
        addToast({
          type: "success",
          title: "Platform Notice Issued",
          message: "Official compliance notice posted to conversation.",
        });
      } else {
        throw new Error("Failed to post notice");
      }
    } catch (err: any) {
      addToast({ type: "error", title: "Notice Error", message: err.message });
    } finally {
      setIsSendingNotice(false);
    }
  };

  const displayedConversations = (activeTab === "all"
    ? conversations
    : flaggedConvs.map((f) => f.conversation)
  ).filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchTitle = c.campaignTitle?.toLowerCase().includes(q);
    const matchUser = c.participants?.some((p) =>
      typeof (p as any) === "string" ? (p as any).toLowerCase().includes(q) : p.name?.toLowerCase().includes(q)
    );
    return matchTitle || matchUser;
  });

  return (
    <div className="space-y-7 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0A0A0E] dark:text-white">
              Platform Communications Supervision
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
              Live Monitor
            </span>
          </div>
          <p className="text-sm text-[#6A6A78] dark:text-[#A0A0B0] mt-1">
            Oversee direct brand-creator communications, identify off-platform circumvention attempts, and enforce compliance.
          </p>
        </div>

        <button
          onClick={fetchCommunications}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-bold transition-all text-[#0A0A0E] dark:text-white cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E14] border border-black/8 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6A6A78] dark:text-[#A0A0B0]">Total Conversations</span>
            <MessageSquare className="w-4 h-4 text-[#FFD21F]" />
          </div>
          <p className="text-3xl font-black mt-2 text-[#0A0A0E] dark:text-white font-mono">
            {stats.totalConversations}
          </p>
          <p className="text-[11px] text-[#8A8A9A] mt-1">Across all brand and creator channels</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E14] border border-black/8 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6A6A78] dark:text-[#A0A0B0]">Total Messages Logged</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black mt-2 text-[#0A0A0E] dark:text-white font-mono">
            {stats.totalMessages}
          </p>
          <p className="text-[11px] text-[#8A8A9A] mt-1">Historical messages stored in platform ledger</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E14] border border-black/8 dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6A6A78] dark:text-[#A0A0B0]">Circumvention Risks Flagged</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black mt-2 text-amber-600 dark:text-amber-400 font-mono">
            {flaggedConvs.length}
          </p>
          <p className="text-[11px] text-[#8A8A9A] mt-1">External wire, phone, or off-platform cues</p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 border-b sm:border-b-0 border-black/10 dark:border-white/10 pb-2 sm:pb-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0A0A0E] dark:bg-white text-white dark:text-[#0A0A0E]"
                : "bg-black/5 dark:bg-white/5 text-[#6A6A78] dark:text-[#A0A0B0] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            All Threads ({conversations.length})
          </button>
          <button
            onClick={() => setActiveTab("flagged")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "flagged"
                ? "bg-amber-500 text-black font-extrabold"
                : "bg-black/5 dark:bg-white/5 text-[#6A6A78] dark:text-[#A0A0B0] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Flagged for Review ({flaggedConvs.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8A9A]" />
          <input
            type="text"
            placeholder="Search by participant or campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#0A0A0E] dark:text-white focus:outline-hidden focus:border-[#FFD21F]"
          />
        </div>
      </div>

      {/* Conversations Table */}
      <div className="rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#0E0E14] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/8 dark:border-white/10 bg-black/2 dark:bg-white/2 text-[#6A6A78] dark:text-[#A0A0B0] font-mono uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Thread / Context</th>
                <th className="px-5 py-3.5">Participants</th>
                <th className="px-5 py-3.5">Last Exchange</th>
                <th className="px-5 py-3.5">Status / Flag</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/6 dark:divide-white/6">
              {displayedConversations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-[#8A8A9A]">
                    No conversations found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                displayedConversations.map((conv) => {
                  const flag = flaggedConvs.find((f) => f.conversation.id === conv.id);
                  return (
                    <tr key={conv.id} className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-[#0A0A0E] dark:text-white font-display">
                          {conv.campaignTitle || "Direct Negotiation"}
                        </div>
                        <div className="text-[11px] text-[#8A8A9A] font-mono mt-0.5">ID: {conv.id}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {conv.participants?.map((p, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-medium text-[#0A0A0E] dark:text-white"
                            >
                              {typeof p === "string" ? p : p.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#0A0A0E] dark:text-[#E0E0E0] truncate max-w-xs">
                          {conv.lastMessage?.content || "No messages"}
                        </div>
                        <div className="text-[10px] text-[#8A8A9A] font-mono mt-0.5">
                          {conv.updatedAt ? formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true }) : ""}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {flag ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{flag.flagReason}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Compliant</span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleInspectConversation(conv)}
                          className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#FFD21F] hover:text-[#0A0A0E] text-xs font-bold transition-all cursor-pointer"
                        >
                          Inspect Thread
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspector Modal */}
      {selectedConv && (
        <Modal
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
          title={`Thread Supervision: ${selectedConv.campaignTitle || "Direct Conversation"}`}
          description={`Inspecting communications between participants in channel ${selectedConv.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Thread Participants */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8A8A9A]" />
                <span className="font-semibold text-[#0A0A0E] dark:text-white">Participants:</span>
                {selectedConv.participants?.map((p, idx) => (
                  <span key={idx} className="font-mono text-[#0A0A0E] dark:text-[#E0E0E0]">
                    {typeof p === "string" ? p : `${p.name} (${p.role})`}
                    {idx < selectedConv.participants.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-mono text-[#8A8A9A]">Total: {convMessages.length} msgs</span>
            </div>

            {/* Message Stream */}
            <div className="max-h-80 overflow-y-auto space-y-3 p-3 rounded-xl border border-black/8 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#07070A]">
              {convMessages.length === 0 ? (
                <p className="text-center text-[#8A8A9A] py-8">No messages recorded in this conversation.</p>
              ) : (
                convMessages.map((m) => {
                  const isOfficial = m.senderId === "user-admin" || m.senderRole === "agency_admin";
                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border ${
                        isOfficial
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
                          : "bg-white dark:bg-[#121218] border-black/8 dark:border-white/8 text-[#0A0A0E] dark:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">{m.senderName}</span>
                          <span className="text-[10px] font-mono text-[#8A8A9A]">({m.senderRole})</span>
                          {isOfficial && (
                            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[9px] font-black">
                              OFFICIAL
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[#8A8A9A]">
                          {m.createdAt ? formatDistanceToNow(new Date(m.createdAt), { addSuffix: true }) : ""}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Official Platform Advisory Tool */}
            <form onSubmit={handleSendAdminNotice} className="pt-2 space-y-2">
              <label className="text-[11px] font-bold text-[#0A0A0E] dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Issue Official Platform Compliance Advisory</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={adminNoticeText}
                  onChange={(e) => setAdminNoticeText(e.target.value)}
                  placeholder="e.g. Warning: Off-platform payment negotiations violate Terms of Service..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-[#0A0A0E] dark:text-white focus:outline-hidden focus:border-[#FFD21F]"
                />
                <button
                  type="submit"
                  disabled={isSendingNotice || !adminNoticeText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD21F] to-[#FFC700] hover:brightness-105 text-[#0A0A0E] font-bold text-xs transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notice</span>
                </button>
              </div>
              <p className="text-[10px] text-[#8A8A9A]">
                This message will be injected into the channel with verified Trust & Safety credentials.
              </p>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
