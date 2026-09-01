"use client";

import React, { useState } from "react";
import { Collaboration, CollaborationDeliverableItem } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { TimecodedReviewPlayer } from "./TimecodedReviewPlayer";
import { NegotiationTimeline } from "./NegotiationTimeline";
import { formatCurrency } from "@/core/utils/formatters";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  CheckCircle2,
  Upload,
  Play,
  ExternalLink,
  ShieldCheck,
  Video,
  DollarSign,
} from "lucide-react";

export function DeliverablesPipeline({ collaboration }: { collaboration: Collaboration }) {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState<"deliverables" | "video_review" | "negotiation">("deliverables");

  const [deliverables, setDeliverables] = useState(collaboration.deliverables);
  const [selectedDel, setSelectedDel] = useState<CollaborationDeliverableItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [submissionUrl, setSubmissionUrl] = useState("https://vimeo.com/preview/draft-v2-4k");
  const [caption, setCaption] = useState("Excited to partner with @Linear for their new developer AI release! Link in bio to try it free. #ad #LinearPartner");
  const [notes, setNotes] = useState("Color graded to match Linear brand guidelines. Custom music track cleared for commercial use.");
  const [revisionFeedback, setRevisionFeedback] = useState("");

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDel) return;

    setDeliverables((prev) =>
      prev.map((d) =>
        d.id === selectedDel.id
          ? {
              ...d,
              status: "submitted",
              submissions: [
                ...d.submissions,
                {
                  id: `sub-${Date.now()}`,
                  deliverableId: d.id,
                  version: d.submissions.length + 1,
                  submittedAt: new Date().toISOString(),
                  mediaUrls: [submissionUrl],
                  captionText: caption,
                  creatorNotes: notes,
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
      title: "Content Draft Submitted",
      message: "The brand has been notified to review your draft in the 4K review player.",
    });
  };

  const handleApproveDeliverable = (deliverableId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === deliverableId ? { ...d, status: "approved" } : d))
    );
    setIsReviewModalOpen(false);
    addToast({
      type: "success",
      title: "Milestone Approved & Disbursed",
      message: "Escrow funds released directly to creator payout account.",
    });
  };

  const handleRequestRevision = (deliverableId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === deliverableId ? { ...d, status: "revision_requested" } : d))
    );
    setIsReviewModalOpen(false);
    addToast({
      type: "info",
      title: "Revision Requested",
      message: "Creator notified with your timecoded feedback.",
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6 text-white">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[hsl(327,100%,55%)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Escrow Milestone Pipeline
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-slate-400">ID: {collaboration.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">
            {collaboration.campaignTitle}
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Partner: <strong className="text-white font-sans">{collaboration.creator.fullName}</strong> (@{collaboration.creator.handle})
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Total Escrow</span>
            <span className="text-lg font-extrabold text-emerald-400">
              {formatCurrency(collaboration.totalAgreedBudget)}
            </span>
          </div>
          <Badge variant="success" size="md" dot>
            {collaboration.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Sub-Workspace Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`px-4 py-2 rounded-full font-sans font-bold transition-all ${
            activeTab === "deliverables"
              ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25"
              : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
          }`}
        >
          Deliverables &amp; Milestones ({deliverables.length})
        </button>
        <button
          onClick={() => setActiveTab("video_review")}
          className={`px-4 py-2 rounded-full font-sans font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "video_review"
              ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25"
              : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
          }`}
        >
          <Video className="w-3.5 h-3.5 text-pink-300" />
          <span>Timecoded Video Review</span>
        </button>
        <button
          onClick={() => setActiveTab("negotiation")}
          className={`px-4 py-2 rounded-full font-sans font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "negotiation"
              ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25"
              : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Terms &amp; Negotiation</span>
        </button>
      </div>

      {/* Tab 1: Deliverables Pipeline List */}
      {activeTab === "deliverables" && (
        <div className="space-y-4 pt-2">
          <div className="divide-y divide-white/10">
            {deliverables.map((del) => {
              const isApproved = del.status === "approved";
              const isSubmitted = del.status === "submitted";
              const isRevision = del.status === "revision_requested";

              return (
                <div
                  key={del.id}
                  className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white font-display">{del.title}</h4>
                      <Badge variant={isApproved ? "success" : isRevision ? "warning" : "default"} size="sm">
                        {del.status.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">Format: {del.type} • Max {del.maxRevisions} Revisions</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                      <span>Due: <strong className="text-white">{del.dueDate}</strong></span>
                      <span>•</span>
                      <span>Milestone Escrow: <strong className="text-emerald-400">{formatCurrency(del.payoutAmount)}</strong></span>
                    </div>
                  </div>

                  {/* Action Controls per role */}
                  <div className="flex items-center gap-3 shrink-0">
                    {role === "creator" && !isApproved && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedDel(del);
                          setIsSubmitModalOpen(true);
                        }}
                        leftIcon={<Upload className="w-3.5 h-3.5" />}
                        className="rounded-full"
                      >
                        {isSubmitted ? "Re-upload Draft" : "Submit Draft Video"}
                      </Button>
                    )}

                    {role === "brand" && isSubmitted && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedDel(del);
                          setIsReviewModalOpen(true);
                        }}
                        leftIcon={<Play className="w-3.5 h-3.5" />}
                        className="rounded-full"
                      >
                        Inspect &amp; Approve
                      </Button>
                    )}

                    {isApproved && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
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

      {/* Tab 2: Video Review Player */}
      {activeTab === "video_review" && (
        <div className="pt-2">
          <TimecodedReviewPlayer
            videoTitle={`${collaboration.campaignTitle} - Rough Cut v2`}
            onApprove={() => handleApproveDeliverable(deliverables[0]?.id || "del-1")}
            onRequestRevision={(fb) => {
              setRevisionFeedback(fb);
              handleRequestRevision(deliverables[0]?.id || "del-1");
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

      {/* Submit Draft Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Content for Brand Review"
        description="Upload your draft video link, proposed caption, and creator notes."
      >
        <form onSubmit={handleSubmitContent} className="space-y-4">
          <Input
            label="Video Preview / Cloud Link (Vimeo, Google Drive, Frame.io)"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
            required
          />
          <Textarea
            label="Post Caption & Tracking Hashtags"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            required
          />
          <Textarea
            label="Creator Notes for Brand Team"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
          />
          <div className="pt-2">
            <Button variant="primary" size="lg" type="submit" className="w-full rounded-full font-display font-bold">
              Submit Draft for Approval
            </Button>
          </div>
        </form>
      </Modal>

      {/* Brand Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Review Submitted Content Draft"
        description="Inspect video preview and release escrow tranche upon approval."
      >
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">
              Submitted Draft Link
            </span>
            <a
              href={submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[hsl(327,100%,55%)] hover:underline flex items-center gap-1 font-mono font-bold"
            >
              {submissionUrl} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-200">
              Request Specific Timestamped Revision
            </label>
            <Textarea
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              placeholder="e.g. Please adjust the CTA at 0:45 to mention the 20% discount code clearly..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1 rounded-full font-display"
              onClick={() => selectedDel && handleRequestRevision(selectedDel.id)}
            >
              Request Revision
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 rounded-full font-display font-bold"
              onClick={() => selectedDel && handleApproveDeliverable(selectedDel.id)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Approve &amp; Release Funds
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
