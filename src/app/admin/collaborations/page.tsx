"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { formatCurrency } from "@/core/utils/formatters";
import { Collaboration } from "@/core/types";
import { useUIStore } from "@/stores/ui.store";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Zap,
  Scale,
  XCircle,
  CheckCircle2,
  Filter,
} from "lucide-react";

export default function AdminCollaborationsPage() {
  const { addToast } = useUIStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "attention" | "funded" | "unfunded">("all");

  // Watchdog state
  const [isRunningWatchdog, setIsRunningWatchdog] = useState(false);

  // Cancellation modal state
  const [selectedCollab, setSelectedCollab] = useState<Collaboration | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const fetchCollabs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collaborations", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCollaborations(data);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  const handleRunWatchdog = async () => {
    setIsRunningWatchdog(true);
    try {
      const res = await fetch("/api/cron/sla-release");
      const data = await res.json();
      if (res.ok) {
        addToast({
          type: "success",
          title: "SLA Watchdog Executed",
          message: `Processed ${data.processedCount || 0} collaborations. ${data.releasedCount || 0} overdue deliverables auto-approved.`,
        });
        fetchCollabs();
      } else {
        addToast({
          type: "error",
          title: "Watchdog Execution Failed",
          message: data.error || "Failed to trigger SLA auto-release job.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Failed to reach SLA worker endpoint.",
      });
    } finally {
      setIsRunningWatchdog(false);
    }
  };

  const handleExecuteCancel = async () => {
    if (!selectedCollab) return;
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/collaborations/${selectedCollab.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason || "Administrative cancellation" }),
      });
      const data = await res.json();
      if (res.ok) {
        addToast({
          type: "success",
          title: "Collaboration Cancelled",
          message: `Refund of $${data.refundAmountDollars} issued to brand. Kill-fee of $${data.killFeeAmountDollars} allocated.`,
        });
        setIsCancelModalOpen(false);
        fetchCollabs();
      } else {
        addToast({
          type: "error",
          title: "Cancellation Failed",
          message: data.error || "Failed to cancel collaboration.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Could not communicate with cancellation API.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredCollabs = useMemo(() => {
    return collaborations.filter((c) => {
      const isFunded = c.isFunded && c.paymentStatus !== "payment_pending";
      const isOverdue = c.isOverdue || c.paymentStatus === "overdue";
      const isDisputed = c.status === "disputed" || c.paymentStatus === "disputed";

      if (filter === "attention") return isOverdue || isDisputed || (!isFunded && c.status !== "cancelled");
      if (filter === "funded") return isFunded;
      if (filter === "unfunded") return !isFunded;
      return true;
    });
  }, [collaborations, filter]);

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* ── Header & Operational Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#F4F4F8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Platform Observability
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-[10px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
              Escrow &amp; SLA Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Collaboration Pipelines &amp; Protection Watchdog
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA6] mt-0.5">
            Real-time oversight of escrow-funded vs. unfunded campaigns, overdue deadlines, and review SLA timers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCollabs}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleRunWatchdog}
            disabled={isRunningWatchdog}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Zap className={`w-3.5 h-3.5 text-[#FFD21F] ${isRunningWatchdog ? "animate-bounce" : ""}`} />
            {isRunningWatchdog ? "Running..." : "Run 120h Watchdog"}
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
              : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          All ({collaborations.length})
        </button>
        <button
          onClick={() => setFilter("attention")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "attention"
              ? "bg-amber-500 text-black font-bold shadow-xs"
              : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          Requires Attention
        </button>
        <button
          onClick={() => setFilter("funded")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "funded"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          Escrow Secured
        </button>
        <button
          onClick={() => setFilter("unfunded")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === "unfunded"
              ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
              : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
          }`}
        >
          Unfunded
        </button>
      </div>

      {/* ── Collaboration Oversight Table ── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
          {filteredCollabs.length === 0 ? (
            <div className="py-12 text-center text-[#8A8A9A] dark:text-[#7A7A8A] font-sans">
              <p>No collaborations matching current filter.</p>
            </div>
          ) : (
            filteredCollabs.map((c) => {
              const isFunded = c.isFunded && c.paymentStatus !== "payment_pending";
              const isOverdue = c.isOverdue || c.paymentStatus === "overdue";
              const isDisputed = c.status === "disputed" || c.paymentStatus === "disputed";

              return (
                <div key={c.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 font-sans">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0A0A0E] dark:text-white font-display">
                        {c.campaignTitle}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-[#F4F4F8] font-mono text-[10px] font-bold">
                        {c.brand?.companyName || "Brand Partner"}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          isFunded
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/50"
                            : "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/50"
                        }`}
                      >
                        {isFunded ? "ESCROW SECURED" : "UNFUNDED"}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700/50 text-[10px] font-mono font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> OVERDUE
                        </span>
                      )}
                      {isDisputed && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Scale className="w-3 h-3" /> DISPUTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6]">
                      Creator: <strong className="text-[#0A0A0E] dark:text-[#F4F4F8]">{c.creator?.fullName}</strong> • Collab ID: <span className="font-mono">{c.id}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 font-mono">
                    <div>
                      <span className="text-[#7A7A8A] dark:text-[#8E8E9F] block text-[10px]">Agreed Budget</span>
                      <span className="text-[#0A0A0E] dark:text-white font-extrabold">{formatCurrency(c.totalAgreedBudget, c.currency)}</span>
                    </div>
                    <div>
                      <span className="text-[#7A7A8A] dark:text-[#8E8E9F] block text-[10px]">Lifecycle Stage</span>
                      <span className="text-[#0A0A0E] dark:text-[#F4F4F8] font-bold">{(c.paymentStatus || c.status).replace(/_/g, " ").toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/app/collaborations/${c.id}`}
                        className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-semibold text-[#0A0A0E] dark:text-white transition-all flex items-center gap-1 font-sans"
                        title="Open Dedicated Workspace"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Workspace
                      </Link>

                      {c.status !== "completed" && c.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            setSelectedCollab(c);
                            setIsCancelModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-medium transition-all font-sans"
                          title="Admin Force Cancel & Refund"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Cancel & Refund Modal ── */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Admin Emergency Cancellation"
      >
        <div className="space-y-4 font-sans text-[#0A0A0E] dark:text-[#F4F4F8]">
          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6]">
            Executing an administrative cancellation will apply fair-stage kill fees based on deliverable progress.
          </p>
          {selectedCollab && (
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-1 text-xs font-mono">
              <div>Campaign: <strong>{selectedCollab.campaignTitle}</strong></div>
              <div>Agreed Budget: <strong>{formatCurrency(selectedCollab.totalAgreedBudget, selectedCollab.currency)}</strong></div>
              <div>Stage: <strong>{selectedCollab.status}</strong></div>
            </div>
          )}
          <Textarea
            label="Administrative Reason (Required for Audit Log)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Explain why this collaboration is being administratively cancelled..."
            rows={3}
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Close
            </button>
            <button
              onClick={handleExecuteCancel}
              disabled={isCancelling || !cancelReason.trim()}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {isCancelling ? "Processing..." : "Confirm Force Cancel"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
