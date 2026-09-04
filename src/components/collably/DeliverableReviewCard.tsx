"use client";

import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileCheck2,
  FolderLock,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Info,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";

export interface DeliverableReviewCardProps {
  title?: string;
  deliverableType?: string;
  payoutAmount?: number;
  creatorName?: string;
  creatorHandle?: string;
  creatorAvatar?: string;
  assetUrl?: string;
  notes?: string;
  submittedAt?: string;
  slaDeadline?: string;
  initialStatus?: "submitted" | "approved" | "revision_requested";
  onApprove?: () => void;
  onRequestRevision?: (feedback: string) => void;
  onRaiseDispute?: (reason: string) => void;
  isInteractiveDemo?: boolean;
}

export function DeliverableReviewCard({
  title = "Dedicated 4K Technical Integration Segment",
  deliverableType = "YouTube 60s Integration",
  payoutAmount = 2500,
  creatorName = "Elena Rostova",
  creatorHandle = "elenatech",
  creatorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  assetUrl = "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing",
  notes = "Color graded to Linear brand guidelines. Rough cut audio mixed at -14 LUFS. Primary product onboarding b-roll starts at 04:12.",
  submittedAt,
  slaDeadline,
  initialStatus = "submitted",
  onApprove,
  onRequestRevision,
  onRaiseDispute,
  isInteractiveDemo = false,
}: DeliverableReviewCardProps) {
  const [status, setStatus] = useState<"submitted" | "approved" | "revision_requested">(initialStatus);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [timeLeft, setTimeLeft] = useState({ hours: 119, minutes: 48, seconds: 12 });

  useEffect(() => {
    // 120-hour SLA countdown timer simulation
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApprove = () => {
    setStatus("approved");
    if (onApprove) onApprove();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#FFD21F", "#0A0A0E", "#087F5B", "#FFE052"],
    });
  };

  const handleConfirmRevision = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("revision_requested");
    setIsRevisionModalOpen(false);
    if (onRequestRevision) onRequestRevision(revisionFeedback);
  };

  const handleConfirmDispute = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("revision_requested");
    setIsDisputeModalOpen(false);
    if (onRaiseDispute) onRaiseDispute(disputeReason);
  };

  const getPlatformLabel = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes("drive.google.com")) return "Google Drive";
    if (lower.includes("dropbox.com")) return "Dropbox";
    if (lower.includes("frame.io")) return "Frame.io";
    if (lower.includes("vimeo.com")) return "Vimeo";
    if (lower.includes("notion.site") || lower.includes("notion.so")) return "Notion";
    return "External Link";
  };

  const platformName = getPlatformLabel(assetUrl);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-hidden text-[#0A0A0E] dark:text-[#F4F4F8]">
      {/* Top Banner with Escrow Guarantee & Status */}
      <div className="bg-[#FAF9F5] dark:bg-[#181824] px-6 py-4 border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
            <ShieldCheck className="w-4 h-4 text-[#0A0A0E] dark:text-[#FFD21F]" />
            100% Pre-Funded Escrow
          </span>
          <span className="text-[#8A8A9A]">•</span>
          <span className="text-xs font-mono text-[#6A6A78] dark:text-[#A0A0B4]">
            Payout: <strong className="text-[#0A0A0E] dark:text-white font-sans">${payoutAmount.toLocaleString()}</strong>
          </span>
        </div>

        {/* Status Badge */}
        <div>
          {status === "approved" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              APPROVED &amp; DISBURSED
            </span>
          ) : status === "revision_requested" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              REVISION REQUESTED
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/60 text-[#0A0A0E] dark:text-[#FFD21F] text-xs font-mono font-bold animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              SUBMITTED FOR REVIEW
            </span>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Deliverable Meta Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6A6A78] dark:text-[#A0A0B4] font-bold">
                {deliverableType}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-[#5A5A68] dark:text-[#9A9AB0] flex items-center gap-2 pt-1">
              <span>Submitted by <strong className="text-[#0A0A0E] dark:text-white">{creatorName}</strong> (@{creatorHandle})</span>
              <span className="text-[#8A8A9A]">•</span>
              <span>{submittedAt ? new Date(submittedAt).toLocaleDateString() : "Draft v1"}</span>
            </p>
          </div>

          {/* 120-Hour SLA Review Timer Badge */}
          {status === "submitted" && (
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3.5 sm:min-w-[240px] text-right space-y-1">
              <div className="flex items-center justify-end gap-1.5 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                <Clock className="w-4 h-4 animate-spin-slow" />
                <span>120h Review SLA</span>
              </div>
              <div className="text-lg font-black font-mono text-[#0A0A0E] dark:text-white">
                {timeLeft.hours}h {timeLeft.minutes.toString().padStart(2, "0")}m {timeLeft.seconds.toString().padStart(2, "0")}s
              </div>
              <p className="text-[10px] text-[#6A6A78] dark:text-[#9A9AB0]">
                Auto-release in 5 days if unreviewed
              </p>
            </div>
          )}
        </div>

        {/* Primary Asset External Link Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/8 dark:border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#6A6A78] dark:text-[#A0A0B4] flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
                Deliverable External Source ({platformName})
              </span>
              <p className="text-xs text-[#0A0A0E] dark:text-white font-mono break-all font-semibold">
                {assetUrl}
              </p>
            </div>

            {/* Prominent Open External Button */}
            <a
              href={assetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold shadow-sm transition-all border border-black/10 shrink-0 group"
            >
              <span>Open in {platformName} / New Tab</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#0A0A0E]" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#6A6A78] dark:text-[#8E8EA4] bg-white dark:bg-[#12121A] p-3 rounded-xl border border-black/5 dark:border-white/5">
            <Info className="w-4 h-4 shrink-0 text-[#FFD21F]" />
            <span>Link sharing verified: &quot;Anyone with the link can view&quot; active. Inspect footage, high-res masters, or project timeline directly.</span>
          </div>
        </div>

        {/* Creator Notes / Revision Details */}
        {notes && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#6A6A78] dark:text-[#A0A0B4] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
              Creator Notes &amp; Revision Details
            </h4>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#181826] border border-black/8 dark:border-white/10 text-xs sm:text-sm text-[#2A2A38] dark:text-[#D4D4E0] leading-relaxed font-sans">
              &ldquo;{notes}&rdquo;
            </div>
          </div>
        )}

        {/* Action Controls for Brand / Reviewer */}
        <div className="pt-3 border-t border-black/8 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6A6A78] dark:text-[#9A9AB0] flex items-center gap-2">
            <FolderLock className="w-4 h-4 text-emerald-600" />
            <span>Escrow vault holds <strong className="text-[#0A0A0E] dark:text-white font-sans">${payoutAmount.toLocaleString()}</strong> in FDIC-insured trust</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {status === "approved" ? (
              <div className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tranche Released to Creator Payout</span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(true)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#F8F8FC] hover:bg-[#EFEFF6] dark:bg-white/10 dark:hover:bg-white/15 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all border border-black/10 dark:border-white/10 flex items-center justify-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Request Revision / Raise Dispute</span>
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-black text-xs transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0A0A0E]" />
                  <span>Approve &amp; Release Escrow</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Revision / Dispute Modal */}
      <Modal
        isOpen={isRevisionModalOpen}
        onClose={() => setIsRevisionModalOpen(false)}
        title="Request Deliverable Revision"
        description="Detail what changes are requested before milestone release."
      >
        <form onSubmit={handleConfirmRevision} className="space-y-4 text-[#0A0A0E]">
          <Textarea
            label="Specific Edits or Revision Notes"
            placeholder="e.g. Please increase volume on vocal hook and emphasize the CTA link clearly..."
            value={revisionFeedback}
            onChange={(e) => setRevisionFeedback(e.target.value)}
            rows={4}
            required
          />
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRevisionModalOpen(false);
                setIsDisputeModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200"
            >
              Escalate to Admin Dispute
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-black text-white hover:bg-black/90 font-bold text-xs transition-all"
            >
              Send Revision Request to Creator
            </button>
          </div>
        </form>
      </Modal>

      {/* Admin Dispute Modal */}
      <Modal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        title="Raise Milestone Dispute"
        description="Freeze escrow tranche and submit case to Collably arbitration desk."
      >
        <form onSubmit={handleConfirmDispute} className="space-y-4 text-[#0A0A0E]">
          <Textarea
            label="Reason for Formal Dispute"
            placeholder="Explain contract terms breach or unresolved deliverable failure..."
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            rows={4}
            required
          />
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all"
            >
              Submit Dispute &amp; Lock Milestone Escrow
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
