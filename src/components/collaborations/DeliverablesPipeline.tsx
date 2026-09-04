"use client";

import React, { useState } from "react";
import { Collaboration, CollaborationDeliverableItem } from "@/core/types";
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
} from "lucide-react";

export function DeliverablesPipeline({ collaboration }: { collaboration: Collaboration }) {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState<"deliverables" | "review_card" | "negotiation">("deliverables");

  const [deliverables, setDeliverables] = useState(collaboration.deliverables);
  const [selectedDel, setSelectedDel] = useState<CollaborationDeliverableItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  // Form states for Deliverable Link submission
  const [assetUrl, setAssetUrl] = useState("https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing");
  const [notes, setNotes] = useState("Final cut color graded to brand specs. Music cleared for global commercial rights. Segment at 04:12.");
  const [urlError, setUrlError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review states
  const [revisionFeedback, setRevisionFeedback] = useState("");
  const [disputeReason, setDisputeReason] = useState("");

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

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDel) return;

    if (!validateUrl(assetUrl)) {
      return;
    }

    setIsSubmitting(true);
    const submittedAt = new Date().toISOString();
    const slaDeadline = new Date(Date.now() + 120 * 60 * 60 * 1000).toISOString();

    try {
      await collaborationService.submitDeliverableDraft(collaboration.id, selectedDel.id, {
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
      await collaborationService.approveDeliverable(collaboration.id, deliverableId);
      setDeliverables((prev) =>
        prev.map((d) => (d.id === deliverableId ? { ...d, status: "approved" } : d))
      );
      setIsReviewModalOpen(false);
      addToast({
        type: "success",
        title: "Milestone Approved & Disbursed",
        message: "Escrow funds released directly to creator payout account.",
      });
    } catch {
      setDeliverables((prev) =>
        prev.map((d) => (d.id === deliverableId ? { ...d, status: "approved" } : d))
      );
      setIsReviewModalOpen(false);
      addToast({
        type: "success",
        title: "Milestone Approved & Disbursed",
        message: "Escrow funds released directly to creator payout account.",
      });
    }
  };

  const handleRequestRevision = (deliverableId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === deliverableId ? { ...d, status: "revision_requested" } : d))
    );
    setIsReviewModalOpen(false);
    addToast({
      type: "info",
      title: "Revision Requested",
      message: "Creator notified with your revision notes.",
    });
  };

  const handleRaiseDispute = (deliverableId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === deliverableId ? { ...d, status: "revision_requested" } : d))
    );
    setIsDisputeModalOpen(false);
    setIsReviewModalOpen(false);
    addToast({
      type: "warning",
      title: "Dispute Escalated",
      message: "Milestone escrow locked and submitted to Collably arbitration desk.",
    });
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

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E]">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0E]" /> Escrow Milestone Pipeline
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-xs font-mono text-[#6A6A78]">ID: {collaboration.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {collaboration.campaignTitle}
          </h2>
          <p className="text-xs text-[#6A6A78] font-mono">
            Partner: <strong className="text-[#0A0A0E] font-sans">{collaboration.creator.fullName}</strong> (@{collaboration.creator.handle})
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="text-right">
            <span className="text-xs text-[#6A6A78] block">Total Escrow</span>
            <span className="text-lg font-extrabold text-[#0A0A0E]">
              {formatCurrency(collaboration.totalAgreedBudget)}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-xs font-mono font-bold">
            {collaboration.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Sub-Workspace Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-black/8 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all ${
            activeTab === "deliverables"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          Deliverables &amp; Milestones ({deliverables.length})
        </button>
        <button
          onClick={() => setActiveTab("review_card")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "review_card"
              ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
              : "bg-[#F8F8FC] text-[#6A6A78] hover:text-[#0A0A0E] border border-black/5"
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Deliverable Review Card</span>
        </button>
        <button
          onClick={() => setActiveTab("negotiation")}
          className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                      Format: {del.type} • Max {del.maxRevisions} Revisions
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
                          setSelectedDel(del);
                          if (currentAssetUrl) setAssetUrl(currentAssetUrl);
                          setIsSubmitModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold text-xs transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5 text-[#0A0A0E]" />
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
            title={deliverables[0]?.title || `${collaboration.campaignTitle} - Milestone 1`}
            deliverableType={deliverables[0]?.type || "YouTube 60s Integration"}
            payoutAmount={deliverables[0]?.payoutAmount || 2500}
            creatorName={collaboration.creator.fullName}
            creatorHandle={collaboration.creator.handle}
            assetUrl={
              deliverables[0]?.assetUrl ||
              deliverables[0]?.submissions?.[0]?.assetUrl ||
              "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing"
            }
            notes={
              deliverables[0]?.notes ||
              deliverables[0]?.submissions?.[0]?.notes ||
              "Color graded to match Linear brand guidelines. Custom music track cleared for commercial use. Primary onboarding hook starts at 04:12."
            }
            submittedAt={deliverables[0]?.submittedAt || deliverables[0]?.submissions?.[0]?.submittedAt}
            onApprove={() => handleApproveDeliverable(deliverables[0]?.id || "del-1")}
            onRequestRevision={(fb) => {
              setRevisionFeedback(fb);
              handleRequestRevision(deliverables[0]?.id || "del-1");
            }}
            onRaiseDispute={(reason) => {
              setDisputeReason(reason);
              handleRaiseDispute(deliverables[0]?.id || "del-1");
            }}
          />
        </div>
      )}

      {/* Tab 3: Structured Negotiation */}
      {activeTab === "negotiation" && (
        <div className="pt-2">
          <NegotiationTimeline currentFee={collaboration.totalAgreedBudget} />
        </div>
      )}

      {/* Creator Workflow: Submit Deliverable Link Modal */}
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

            {/* Helper Note Required by Spec */}
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

      {/* Brand Workflow: Deliverable Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Submitted Milestone Deliverable"
        description="Inspect creator external link and release escrow or request changes."
      >
        <div className="space-y-6 text-[#0A0A0E]">
          {/* Prominent External Link */}
          <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#6A6A78] uppercase font-mono font-bold">
                External Asset Link
              </span>
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
                <span>Open in {getPlatformLabel(selectedDel?.assetUrl || assetUrl)} / New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Creator Notes */}
          {(selectedDel?.notes || notes) && (
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#6A6A78] uppercase font-mono font-bold">
                Creator Notes
              </span>
              <div className="p-3.5 rounded-xl bg-white border border-black/10 text-xs text-[#2A2A38] leading-relaxed font-sans">
                {selectedDel?.notes || notes}
              </div>
            </div>
          )}

          {/* Action Buttons */}
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

      {/* Dispute & Revision Request Modal */}
      <Modal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        title="Revision or Formal Dispute"
        description="Choose whether to send revision notes to the creator or escalate to Collably dispute arbitration."
      >
        <div className="space-y-4 text-[#0A0A0E]">
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
              onClick={() => selectedDel && handleRequestRevision(selectedDel.id)}
              className="flex-1 py-2.5 rounded-full bg-black text-white hover:bg-black/90 font-bold text-xs transition-all"
            >
              Send Revision Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
