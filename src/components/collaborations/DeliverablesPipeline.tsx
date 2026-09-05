"use client";

import React, { useState } from "react";
import { Collaboration, CollaborationDeliverableItem, PlatformType } from "@/core/types";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { DeliverableReviewCard } from "@/components/collably/DeliverableReviewCard";
import { NegotiationTimeline } from "./NegotiationTimeline";
import { formatCurrency } from "@/core/utils/formatters";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { collaborationService } from "@/services/collaboration.service";
import {
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Clock,
  Send,
  AlertCircle,
  FileCheck2,
  Info,
  ShieldAlert,
  Lock,
  XCircle,
  AlertTriangle,
  UploadCloud,
  ArrowRight,
} from "lucide-react";

export function DeliverablesPipeline({ collaboration: initialCollab }: { collaboration: Collaboration }) {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [collab, setCollab] = useState<Collaboration>(initialCollab);
  const [activeTab, setActiveTab] = useState<"deliverables" | "review_card" | "post_proof" | "negotiation">("deliverables");

  const [deliverables, setDeliverables] = useState(initialCollab.deliverables || []);
  const [selectedDel, setSelectedDel] = useState<CollaborationDeliverableItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPostProofModalOpen, setIsPostProofModalOpen] = useState(false);

  // Form states for Deliverable Link submission
  const [assetUrl, setAssetUrl] = useState("https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing");
  const [notes, setNotes] = useState("Final cut color graded to brand specs. Music cleared for global commercial rights. Segment at 04:12.");
  const [urlError, setUrlError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post Proof States
  const [postUrl, setPostUrl] = useState(collab.verificationProof?.postUrl || "");
  const [postPlatform, setPostPlatform] = useState<PlatformType>("youtube");
  const [postScreenshotUrl, setPostScreenshotUrl] = useState(collab.verificationProof?.screenshotUrl || "");
  const [postNotes, setPostNotes] = useState("");
  const [isVerifyingPost, setIsVerifyingPost] = useState(false);

  // Cancellation States
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // Funding States
  const [isFunding, setIsFunding] = useState(false);

  // Review states
  const [revisionFeedback, setRevisionFeedback] = useState("");

  const isFunded = Boolean(collab.isFunded && collab.paymentStatus !== "payment_pending");
  const isOverdue = Boolean(collab.isOverdue || collab.paymentStatus === "overdue");
  const isDisputed = Boolean(collab.status === "disputed" || collab.paymentStatus === "disputed");
  const isCancelled = Boolean(collab.status === "cancelled" || collab.paymentStatus === "cancelled");
  const isCompleted = Boolean(collab.status === "completed" || collab.paymentStatus === "paid");

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setUrlError("Deliverable link is required.");
      return false;
    }
    if (!url.startsWith("https://")) {
      setUrlError("Deliverable link must be a secure link starting with https://");
      return false;
    }
    try {
      new URL(url);
      setUrlError("");
      return true;
    } catch {
      setUrlError("Please enter a valid HTTPS URL (e.g. Google Drive, Dropbox, Frame.io).");
      return false;
    }
  };

  // Upfront Escrow Funding
  const handleFundEscrow = async () => {
    setIsFunding(true);
    try {
      const res = await collaborationService.fundCollaboration(collab.id);
      setCollab((prev) => ({
        ...prev,
        isFunded: true,
        paymentStatus: "payment_secured",
        status: "payment_secured",
        escrowStatus: "held_in_escrow",
      }));
      setDeliverables((prev) =>
        prev.map((d) => (d.status === "draft" ? { ...d, status: "assigned" } : d))
      );
      addToast({
        type: "success",
        title: "Escrow Secured & Locked!",
        message: `Vault funded for ${formatCurrency(collab.totalAgreedBudget)}. Creator has been unblocked to begin work.`,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Funding Failed",
        message: err.message || "Failed to fund escrow vault.",
      });
    } finally {
      setIsFunding(false);
    }
  };

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDel) return;

    if (!isFunded) {
      addToast({
        type: "error",
        title: "Action Blocked: Unfunded Escrow",
        message: "You cannot submit deliverables until the brand has secured the escrow deposit.",
      });
      return;
    }

    if (!validateUrl(assetUrl)) {
      return;
    }

    setIsSubmitting(true);
    const submittedAt = new Date().toISOString();
    const slaDeadline = new Date(Date.now() + 120 * 60 * 60 * 1000).toISOString();

    try {
      await collaborationService.submitDeliverableDraft(collab.id, selectedDel.id, {
        assetUrl: assetUrl.trim(),
        notes: notes.trim(),
        mediaUrls: [assetUrl.trim()],
        creatorNotes: notes.trim(),
      });

      setDeliverables((prev) =>
        prev.map((d) =>
          d.id === selectedDel.id
            ? {
                ...d,
                status: "submitted",
                assetUrl: assetUrl.trim(),
                notes: notes.trim(),
                submittedAt,
                slaDeadline,
                submissions: [
                  ...d.submissions,
                  {
                    id: `sub-${Date.now()}`,
                    deliverableId: d.id,
                    version: d.submissions.length + 1,
                    submittedAt,
                    slaDeadline,
                    assetUrl: assetUrl.trim(),
                    notes: notes.trim(),
                    mediaUrls: [assetUrl.trim()],
                    creatorNotes: notes.trim(),
                    status: "submitted",
                  },
                ],
              }
            : d
        )
      );

      setCollab((prev) => ({
        ...prev,
        paymentStatus: "submitted_for_review",
        status: "submitted_for_review",
      }));

      setIsSubmitModalOpen(false);
      addToast({
        type: "success",
        title: "Deliverable Link Submitted",
        message: "Milestone status updated to SUBMITTED. The 120-hour review SLA timer has started.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Submission Failed",
        message: err.message || "Failed to submit deliverable link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveDeliverable = async (deliverableId: string) => {
    try {
      await collaborationService.approveDeliverable(collab.id, deliverableId);
      setDeliverables((prev) =>
        prev.map((d) => (d.id === deliverableId ? { ...d, status: "approved" } : d))
      );
      setCollab((prev) => ({
        ...prev,
        paymentStatus: "approved",
      }));
      setIsReviewModalOpen(false);
      addToast({
        type: "success",
        title: "Milestone Approved & Disbursed",
        message: "Escrow funds released directly to creator payout account.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Approval Failed",
        message: err.message || "Could not complete disbursement.",
      });
    }
  };

  const handleRequestRevision = async (deliverableId: string) => {
    const del = deliverables.find((d) => d.id === deliverableId);
    if (del && del.revisionCount >= del.maxRevisions) {
      addToast({
        type: "error",
        title: "Revision Limit Reached",
        message: `Maximum revisions (${del.maxRevisions}) reached. Please approve or open an arbitration dispute.`,
      });
      return;
    }

    try {
      await collaborationService.requestRevision(collab.id, deliverableId, revisionFeedback);
      setDeliverables((prev) =>
        prev.map((d) =>
          d.id === deliverableId ? { ...d, status: "revision_requested", revisionCount: d.revisionCount + 1 } : d
        )
      );
      setCollab((prev) => ({
        ...prev,
        paymentStatus: "revision_requested",
        status: "revision_requested",
      }));
      setIsDisputeModalOpen(false);
      setIsReviewModalOpen(false);
      addToast({
        type: "info",
        title: "Revision Requested",
        message: "Creator notified with your revision notes.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Revision Request Failed",
        message: err.message || "Could not send revision request.",
      });
    }
  };

  const handleRaiseDispute = async (deliverableId: string) => {
    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collaborationId: collab.id,
          campaignTitle: collab.campaignTitle,
          brandName: collab.brand?.companyName || "Brand",
          creatorName: collab.creator?.fullName || "Creator",
          creatorUserId: collab.creator?.userId || collab.creatorId,
          brandUserId: collab.brand?.userId || collab.brandId,
          reason: "Scope_Mismatch",
          description: revisionFeedback || "Deliverable failed to meet agreed project requirements",
          amountInDispute: collab.totalAgreedBudget,
        }),
      });
      if (!res.ok) throw new Error("Failed to file dispute");

      setCollab((prev) => ({
        ...prev,
        status: "disputed",
        paymentStatus: "disputed",
      }));
      setIsDisputeModalOpen(false);
      setIsReviewModalOpen(false);
      addToast({
        type: "warning",
        title: "Dispute Escalated",
        message: "Milestone escrow locked and submitted to AbeyCollab arbitration desk.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Dispute Error",
        message: err.message || "Failed to file dispute.",
      });
    }
  };

  // Submit Post Proof
  const handleSubmitPostProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postUrl.trim().startsWith("https://")) {
      addToast({ type: "error", title: "Invalid URL", message: "Post URL must start with https://" });
      return;
    }

    setIsVerifyingPost(true);
    try {
      const res = await collaborationService.submitPostProof(collab.id, {
        postUrl: postUrl.trim(),
        platform: postPlatform,
        screenshotUrl: postScreenshotUrl.trim() || undefined,
        notes: postNotes.trim() || undefined,
      });

      setCollab((prev) => ({
        ...prev,
        verificationProof: res.proof,
        paymentStatus: "posted",
        status: "posted",
      }));
      setIsPostProofModalOpen(false);
      addToast({
        type: "success",
        title: "Post Proof Verified!",
        message: "Public posting verified. Payout release triggered.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Verification Failed",
        message: err.message || "Could not verify live post.",
      });
    } finally {
      setIsVerifyingPost(false);
    }
  };

  // Stage-Aware Cancellation
  const handleCancelCollaboration = async () => {
    setIsCancelling(true);
    try {
      const res = await collaborationService.cancelCollaboration(
        collab.id,
        cancelReason || "Cancelled by participant"
      );

      setCollab((prev) => ({
        ...prev,
        status: "cancelled",
        paymentStatus: "cancelled",
        escrowStatus: "refunded",
        cancellationDetails: {
          cancelledBy: role,
          cancelledByRole: role as any,
          cancelledAt: new Date().toISOString(),
          stage: res.stage as any,
          reason: cancelReason,
          refundPercentToBrand: (res.refundAmountDollars / (collab.totalAgreedBudget || 1)) * 100,
          killFeePercentToCreator: (res.killFeeAmountDollars / (collab.totalAgreedBudget || 1)) * 100,
          refundAmountDollars: res.refundAmountDollars,
          killFeeAmountDollars: res.killFeeAmountDollars,
        },
      }));
      setIsCancelModalOpen(false);
      addToast({
        type: "info",
        title: "Collaboration Cancelled",
        message: `Settlement: $${res.refundAmountDollars.toFixed(2)} refunded to brand, $${res.killFeeAmountDollars.toFixed(2)} kill-fee paid to creator.`,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Cancellation Failed",
        message: err.message || "Could not cancel collaboration.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const getPlatformLabel = (url?: string) => {
    if (!url) return "External Link";
    const lower = url.toLowerCase();
    if (lower.includes("drive.google.com")) return "Google Drive";
    if (lower.includes("dropbox.com")) return "Dropbox";
    if (lower.includes("frame.io")) return "Frame.io";
    if (lower.includes("vimeo.com")) return "Vimeo";
    return "External Link";
  };

  // Calculate cancellation preview math
  const getCancellationPreview = () => {
    const total = collab.totalAgreedBudget || 3500;
    if (!isFunded) {
      return { refund: 0, killFee: 0, desc: "Unfunded: No funds have been deposited yet." };
    }
    if (collab.paymentStatus === "payment_secured") {
      return { refund: total, killFee: 0, desc: "Before work started: 100% Brand Refund ($" + total.toLocaleString() + "), 0% Creator Kill-Fee ($0)." };
    }
    if (isOverdue) {
      return { refund: total, killFee: 0, desc: "Deadline Missed: 100% Brand Refund ($" + total.toLocaleString() + "), 0% Creator Kill-Fee ($0)." };
    }
    if (collab.paymentStatus === "submitted_for_review" || collab.paymentStatus === "revision_requested") {
      return { refund: total * 0.5, killFee: total * 0.5, desc: "Content Submitted: 50% Brand Refund ($" + (total * 0.5).toLocaleString() + "), 50% Creator Kill-Fee ($" + (total * 0.5).toLocaleString() + ")." };
    }
    // Default work_in_progress
    return { refund: total * 0.7, killFee: total * 0.3, desc: "Work In Progress: 70% Brand Refund ($" + (total * 0.7).toLocaleString() + "), 30% Creator Kill-Fee ($" + (total * 0.3).toLocaleString() + ")." };
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E]">
      {/* ── 1. SECURITY & STATUS BANNERS ── */}

      {/* Unfunded Warning Banner */}
      {!isFunded && !isCancelled && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-900 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                <span>Escrow Vault Funding Pending</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-900 text-[10px] font-mono font-bold">48h SLA Active</span>
              </h4>
              <p className="text-xs text-amber-900/80 leading-relaxed max-w-2xl">
                {role === "creator"
                  ? "Brand has not yet deposited funds into the platform escrow vault. Creator production and submission controls are locked to protect you from unpaid work."
                  : "Creators cannot begin production until the escrow vault is funded upfront. Funds are held safely by the platform and only released upon your deliverable approval."}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {role === "brand" && (
              <button
                onClick={handleFundEscrow}
                disabled={isFunding}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs shadow-xs border border-black/10 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isFunding ? "Funding Vault..." : `Fund Escrow Vault (${formatCurrency(collab.totalAgreedBudget)})`}</span>
              </button>
            )}
            {role === "creator" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-900 text-xs font-mono font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Work Blocked Until Funded</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Overdue Alert Banner */}
      {isOverdue && !isCancelled && !isCompleted && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-700 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-red-950 flex items-center gap-2">
                <span>Deliverable Deadline Breached</span>
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-900 text-[10px] font-mono font-bold">Overdue Penalty Active</span>
              </h4>
              <p className="text-xs text-red-900/80 leading-relaxed max-w-2xl">
                The agreed submission deadline and grace period have expired without content submission.
                Brand is entitled to cancel with a 100% full refund or open formal arbitration.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {role === "brand" && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all"
              >
                Claim 100% Refund
              </button>
            )}
          </div>
        </div>
      )}

      {/* Disputed Freeze Banner */}
      {isDisputed && (
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
              <span>Arbitration Active — Escrow Vault Frozen</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-900 text-[10px] font-mono font-bold">Under Administrative Review</span>
            </h4>
            <p className="text-xs text-blue-900/80 leading-relaxed">
              Automated timers are halted. An AbeyCollab arbitration officer is reviewing submitted evidence to issue a binding financial settlement.
            </p>
          </div>
        </div>
      )}

      {/* Cancelled Banner */}
      {isCancelled && (
        <div className="p-4 sm:p-5 rounded-2xl bg-black/5 border border-black/10 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-[#8A8A9A] shrink-0" />
          <div className="space-y-0.5 flex-1">
            <h4 className="font-bold text-sm text-[#0A0A0E]">Collaboration Cancelled</h4>
            <p className="text-xs text-[#6A6A78]">
              {collab.cancellationDetails?.reason || "This collaboration was cancelled under platform terms."}
            </p>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0E]" /> Protected Escrow Workspace
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-xs font-mono text-[#6A6A78]">ID: {collab.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {collab.campaignTitle}
          </h2>
          <p className="text-xs text-[#6A6A78] font-mono">
            Partner: <strong className="text-[#0A0A0E] font-sans">{collab.creator.fullName}</strong> (@{collab.creator.handle})
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="text-right">
            <span className="text-xs text-[#6A6A78] block">Escrow Vault</span>
            <span className="text-lg font-extrabold text-[#0A0A0E]">
              {formatCurrency(collab.totalAgreedBudget)}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
            isFunded
              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
              : "bg-amber-50 text-amber-900 border-amber-300"
          }`}>
            {(collab.paymentStatus || collab.status).replace(/_/g, " ").toUpperCase()}
          </span>

          {!isCancelled && !isCompleted && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#8A8A9A] hover:text-red-600 transition-all text-xs"
              title="Cancel Collaboration"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-Workspace Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-black/8 pb-3 text-xs font-mono overflow-x-auto">
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === "deliverables"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          Deliverables ({deliverables.length})
        </button>
        <button
          onClick={() => setActiveTab("review_card")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === "review_card"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Deliverable Review Card</span>
        </button>
        <button
          onClick={() => setActiveTab("post_proof")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === "post_proof"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Post Proof &amp; Verification</span>
        </button>
        <button
          onClick={() => setActiveTab("negotiation")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
            activeTab === "negotiation"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Terms &amp; Negotiation</span>
        </button>
      </div>

      {/* Tab 1: Deliverables Pipeline List */}
      {activeTab === "deliverables" && (
        <div className="space-y-4 pt-2">
          <div className="divide-y divide-black/5">
            {deliverables.map((del) => {
              const isApproved = del.status === "approved";
              const isSubmitted = del.status === "submitted" || del.status === "under_review";
              const isRevision = del.status === "revision_requested";
              const currentAssetUrl =
                del.assetUrl || del.submissions?.[del.submissions.length - 1]?.assetUrl || del.submissions?.[0]?.mediaUrls?.[0];

              return (
                <div
                  key={del.id}
                  className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{del.title}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isApproved
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : isRevision
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : isSubmitted
                          ? "bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/50"
                          : "bg-black/5 text-[#5A5A68]"
                      }`}>
                        {del.status.replace(/_/g, " ").toUpperCase()}
                      </span>

                      {isSubmitted && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10px] font-mono font-bold">
                          <Clock className="w-3 h-3" />
                          120h SLA Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6A6A78] font-mono">
                      Format: {del.type} • Revisions: {del.revisionCount}/{del.maxRevisions}
                    </p>

                    {currentAssetUrl && (
                      <div className="flex items-center gap-2 text-xs pt-1 font-mono">
                        <span className="text-[#6A6A78]">Deliverable:</span>
                        <a
                          href={currentAssetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A0A0E] font-bold hover:underline flex items-center gap-1 bg-[#F8F8FC] px-2.5 py-1 rounded-md border border-black/5"
                        >
                          <span>Open in {getPlatformLabel(currentAssetUrl)} / New Tab</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-[#6A6A78] font-mono pt-1">
                      <span>Due: <strong className="text-[#0A0A0E]">{del.dueDate}</strong></span>
                      <span>•</span>
                      <span>Milestone Escrow: <strong className="text-[#0A0A0E] font-extrabold">{formatCurrency(del.payoutAmount)}</strong></span>
                    </div>
                  </div>

                  {/* Action Controls per role */}
                  <div className="flex items-center gap-3 shrink-0">
                    {role === "creator" && !isApproved && (
                      <button
                        onClick={() => {
                          if (!isFunded) {
                            addToast({
                              type: "error",
                              title: "Escrow Unfunded",
                              message: "Brand must fund escrow before deliverable submissions are allowed.",
                            });
                            return;
                          }
                          setSelectedDel(del);
                          if (currentAssetUrl) setAssetUrl(currentAssetUrl);
                          setIsSubmitModalOpen(true);
                        }}
                        disabled={!isFunded}
                        className={`px-4 py-2 rounded-full font-bold text-xs transition-all shadow-xs border flex items-center gap-1.5 ${
                          isFunded
                            ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] border-black/10 hover:shadow-sm"
                            : "bg-black/5 text-[#8A8A9A] border-black/5 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitted ? "Update Deliverable Link" : "Submit Deliverable Link"}</span>
                      </button>
                    )}

                    {role === "brand" && isSubmitted && (
                      <button
                        onClick={() => {
                          setSelectedDel(del);
                          setIsReviewModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold text-xs transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#0A0A0E]" />
                        <span>Review &amp; Approve</span>
                      </button>
                    )}

                    {isApproved && (
                      <div className="flex items-center gap-1.5 text-xs text-[#0A0A0E] font-mono font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Tranche Released</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Lightweight Deliverable Review Card */}
      {activeTab === "review_card" && (
        <div className="pt-2">
          <DeliverableReviewCard
            title={deliverables[0]?.title || `${collab.campaignTitle} - Milestone 1`}
            deliverableType={deliverables[0]?.type || "YouTube 60s Integration"}
            payoutAmount={deliverables[0]?.payoutAmount || 2500}
            creatorName={collab.creator.fullName}
            creatorHandle={collab.creator.handle}
            assetUrl={
              deliverables[0]?.assetUrl ||
              deliverables[0]?.submissions?.[0]?.assetUrl ||
              "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing"
            }
            notes={
              deliverables[0]?.notes ||
              deliverables[0]?.submissions?.[0]?.notes ||
              "Color graded to match brand specs. Commercial soundtrack cleared. Key integration hook at 04:12."
            }
            submittedAt={deliverables[0]?.submittedAt || deliverables[0]?.submissions?.[0]?.submittedAt}
            onApprove={() => handleApproveDeliverable(deliverables[0]?.id || "del-1")}
            onRequestRevision={(fb) => {
              setRevisionFeedback(fb);
              handleRequestRevision(deliverables[0]?.id || "del-1");
            }}
            onRaiseDispute={(reason) => {
              setRevisionFeedback(reason);
              handleRaiseDispute(deliverables[0]?.id || "del-1");
            }}
          />
        </div>
      )}

      {/* Tab 3: Post Proof Verification */}
      {activeTab === "post_proof" && (
        <div className="pt-2 space-y-4">
          <div className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#0A0A0E] flex items-center gap-2">
                <span>Public Post Verification</span>
                {collab.verificationProof?.status === "verified" ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                    VERIFIED LIVE
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px] font-mono font-bold border border-amber-200">
                    PENDING SUBMISSION
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#6A6A78]">
                Creator must submit the live post link and proof of publish to fulfill collaboration terms.
              </p>
            </div>

            {role === "creator" && (
              <button
                onClick={() => setIsPostProofModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold text-xs shadow-xs border border-black/10 hover:bg-[#FFE052] transition-all flex items-center gap-1.5 shrink-0"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{collab.verificationProof ? "Update Post Proof" : "Submit Live Post Proof"}</span>
              </button>
            )}
          </div>

          {collab.verificationProof && (
            <div className="p-5 rounded-2xl bg-white border border-black/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#6A6A78]">Live Verified Link</span>
                <span className="text-xs text-[#8A8A9A] font-mono">Published: {collab.verificationProof.publishedAt.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#0A0A0E] font-bold truncate max-w-md">
                  {collab.verificationProof.postUrl}
                </span>
                <a
                  href={collab.verificationProof.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#F8F8FC] border border-black/10 text-xs font-bold hover:underline flex items-center gap-1"
                >
                  <span>View Live Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Terms & Negotiation */}
      {activeTab === "negotiation" && (
        <div className="pt-2">
          <NegotiationTimeline currentFee={collab.totalAgreedBudget} />
        </div>
      )}

      {/* ── MODALS ── */}

      {/* Creator: Submit Deliverable Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Deliverable External Link"
        description="Share your cloud link (Google Drive, Dropbox, Frame.io) for brand review and escrow release."
      >
        <form onSubmit={handleSubmitContent} className="space-y-4 text-[#0A0A0E]">
          <div className="space-y-1.5">
            <Input
              label="Deliverable Link (Google Drive, Dropbox, Frame.io, etc.)"
              placeholder="https://drive.google.com/file/d/... or https://app.frame.io/..."
              value={assetUrl}
              onChange={(e) => {
                setAssetUrl(e.target.value);
                if (urlError) validateUrl(e.target.value);
              }}
              required
            />
            {urlError && (
              <p className="text-xs text-red-600 font-sans font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {urlError}
              </p>
            )}

            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/40 text-xs text-[#6A6A78]">
              <Info className="w-4 h-4 text-[#0A0A0E] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#0A0A0E]">Sharing Requirement:</strong> Make sure link sharing is set to &ldquo;Anyone with the link can view&rdquo;.
              </span>
            </div>
          </div>

          <Textarea
            label="Notes / Revision details (Optional)"
            placeholder="Include timestamps, color grade specs, commercial clearance, or edit notes for the brand team..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />

          <div className="p-3.5 rounded-xl bg-[#F8F8FC] border border-black/5 text-xs text-[#5A5A68] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
              <Clock className="w-3.5 h-3.5" />
              <span>120-Hour Review SLA Guarantee</span>
            </div>
            <p>
              Submitting updates this milestone to <strong>SUBMITTED</strong> and begins the 120-hour SLA review timer for the brand. If not reviewed within 120 hours, escrow funds auto-release.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-black text-xs transition-all shadow-xs border border-black/10 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#0A0A0E]" />
              <span>{isSubmitting ? "Submitting..." : "Submit Deliverable & Start 120h SLA"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Brand: Review Deliverable Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Submitted Milestone Deliverable"
        description="Inspect creator external link and release escrow or request changes."
      >
        <div className="space-y-6 text-[#0A0A0E]">
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6A6A78] uppercase font-mono font-bold">External Asset Link</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[10px] font-mono font-bold">
                <Clock className="w-3 h-3" /> 120h SLA Active
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-[#0A0A0E] font-mono font-bold truncate max-w-[280px]">
                {selectedDel?.assetUrl || assetUrl}
              </span>
              <a
                href={selectedDel?.assetUrl || assetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] text-xs font-bold shadow-xs hover:underline flex items-center gap-1.5 shrink-0"
              >
                <span>Open in {getPlatformLabel(selectedDel?.assetUrl || assetUrl)}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {(selectedDel?.notes || notes) && (
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#6A6A78] uppercase font-mono font-bold">Creator Notes</span>
              <div className="p-3.5 rounded-xl bg-white border border-black/10 text-xs text-[#2A2A38] leading-relaxed font-sans">
                {selectedDel?.notes || notes}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-3 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/10 flex items-center justify-center gap-1.5"
              onClick={() => {
                setIsReviewModalOpen(false);
                setIsDisputeModalOpen(true);
              }}
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Request Revision / Raise Dispute</span>
            </button>
            <button
              type="button"
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-black transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
              onClick={() => selectedDel && handleApproveDeliverable(selectedDel.id)}
            >
              <CheckCircle2 className="w-4 h-4 text-[#0A0A0E]" />
              <span>Approve &amp; Release Escrow</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Revision & Dispute Modal */}
      <Modal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        title="Revision or Formal Dispute"
        description="Enforces revision boundaries and dispute protection."
      >
        <div className="space-y-4 text-[#0A0A0E]">
          {selectedDel && (
            <div className="p-3 rounded-xl bg-[#F8F8FC] border border-black/5 text-xs font-mono flex items-center justify-between">
              <span>Revisions Used: <strong>{selectedDel.revisionCount} / {selectedDel.maxRevisions}</strong></span>
              {selectedDel.revisionCount >= selectedDel.maxRevisions ? (
                <span className="text-red-700 font-bold">Max Revisions Reached</span>
              ) : (
                <span className="text-emerald-700 font-bold">{selectedDel.maxRevisions - selectedDel.revisionCount} Remaining</span>
              )}
            </div>
          )}

          <Textarea
            label="Revision Notes or Dispute Statement"
            placeholder="Explain required changes or contractual dispute details..."
            value={revisionFeedback}
            onChange={(e) => setRevisionFeedback(e.target.value)}
            rows={4}
            required
          />

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => selectedDel && handleRaiseDispute(selectedDel.id)}
              className="px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200"
            >
              Raise Formal Dispute
            </button>
            <button
              type="button"
              disabled={Boolean(selectedDel && selectedDel.revisionCount >= selectedDel.maxRevisions)}
              onClick={() => selectedDel && handleRequestRevision(selectedDel.id)}
              className="flex-1 py-2.5 rounded-full bg-black text-white hover:bg-black/90 font-bold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selectedDel && selectedDel.revisionCount >= selectedDel.maxRevisions ? "Revision Limit Exceeded" : "Send Revision Request"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Creator: Submit Live Post Proof Modal */}
      <Modal
        isOpen={isPostProofModalOpen}
        onClose={() => setIsPostProofModalOpen(false)}
        title="Submit Live Post Proof"
        description="Verify public content publication to complete collaboration."
      >
        <form onSubmit={handleSubmitPostProof} className="space-y-4 text-[#0A0A0E]">
          <Input
            label="Live Post URL"
            placeholder="https://www.youtube.com/watch?v=... or https://instagram.com/p/..."
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-[#6A6A78]">Platform</label>
            <select
              value={postPlatform}
              onChange={(e) => setPostPlatform(e.target.value as PlatformType)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 text-xs font-sans text-[#0A0A0E]"
            >
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X / Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <Input
            label="Screenshot Proof URL (Optional)"
            placeholder="https://drive.google.com/... (screenshot of published post/metrics)"
            value={postScreenshotUrl}
            onChange={(e) => setPostScreenshotUrl(e.target.value)}
          />

          <Textarea
            label="Additional Notes (Optional)"
            placeholder="e.g. pinned comment added, affiliate link active in bio"
            value={postNotes}
            onChange={(e) => setPostNotes(e.target.value)}
            rows={2}
          />

          <button
            type="submit"
            disabled={isVerifyingPost}
            className="w-full py-3 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] font-black text-xs transition-all border border-black/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-[#0A0A0E]" />
            <span>{isVerifyingPost ? "Verifying Proof..." : "Submit & Verify Post Proof"}</span>
          </button>
        </form>
      </Modal>

      {/* Stage-Aware Cancellation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Stage-Aware Collaboration Cancellation"
        description="Platform rules automatically calculate fair refunds and creator kill-fees based on progress."
      >
        <div className="space-y-4 text-[#0A0A0E]">
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/10 space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#6A6A78] uppercase">Financial Settlement Preview</span>
            <p className="text-xs text-[#0A0A0E] font-bold leading-relaxed">
              {getCancellationPreview().desc}
            </p>
          </div>

          <Textarea
            label="Cancellation Reason"
            placeholder="Please provide a clear reason for cancelling this collaboration..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            rows={3}
            required
          />

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsCancelModalOpen(false)}
              className="px-4 py-2.5 rounded-full bg-black/5 text-[#0A0A0E] font-bold text-xs border border-black/10"
            >
              Back
            </button>
            <button
              type="button"
              disabled={isCancelling || !cancelReason.trim()}
              onClick={handleCancelCollaboration}
              className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all disabled:opacity-50"
            >
              {isCancelling ? "Processing Cancellation..." : "Confirm & Execute Settlement"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
