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
  Clock,
  FileCheck2,
  MessageSquare,
  Upload,
  AlertCircle,
  Play,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Scale,
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

    addToast({
      type: "success",
      title: "Deliverable Draft Submitted",
      message: "Notification dispatched to brand marketing director.",
    });
    setIsSubmitModalOpen(false);
  };

  const handleApproveDeliverable = (delId: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === delId ? { ...d, status: "approved" } : d))
    );
    addToast({
      type: "success",
      title: "Deliverable Approved!",
      message: "Escrow milestone tranche released directly to creator balance.",
    });
    setIsReviewModalOpen(false);
  };

  const handleRequestRevision = (delId: string) => {
    if (!revisionFeedback) return;
    setDeliverables((prev) =>
      prev.map((d) => (d.id === delId ? { ...d, status: "revision_requested" } : d))
    );
    addToast({
      type: "warning",
      title: "Revision Requested",
      message: "Feedback sent to the creator.",
    });
    setIsReviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Collaboration Info Card */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-brand-accent">
                Active Milestone Escrow
              </span>
              <span className="text-slate-300">•</span>
              <Badge variant="glow" size="sm">
                {collaboration.brand.companyName}
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {collaboration.campaignTitle}
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Partner: <strong className="text-slate-800 font-sans">{collaboration.creator.fullName}</strong> (@{collaboration.creator.handle})
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Escrow</span>
              <span className="text-lg font-extrabold text-emerald-600">
                {formatCurrency(collaboration.totalAgreedBudget)}
              </span>
            </div>
            <Badge variant="success" size="md" dot>
              {collaboration.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Sub-Workspace Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs font-mono">
          <button
            onClick={() => setActiveTab("deliverables")}
            className={`px-4 py-2 rounded-xl font-sans font-bold transition-all ${
              activeTab === "deliverables"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            Deliverables & Milestones ({deliverables.length})
          </button>
          <button
            onClick={() => setActiveTab("video_review")}
            className={`px-4 py-2 rounded-xl font-sans font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "video_review"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-brand-accent" />
            <span>Timecoded Video Review</span>
          </button>
          <button
            onClick={() => setActiveTab("negotiation")}
            className={`px-4 py-2 rounded-xl font-sans font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "negotiation"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terms & Negotiation</span>
          </button>
        </div>

        {/* Tab 1: Deliverables Pipeline List */}
        {activeTab === "deliverables" && (
          <div className="space-y-4 pt-2">
            <div className="divide-y divide-slate-100">
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
                        <h4 className="font-bold text-sm text-slate-900">{del.title}</h4>
                        <Badge variant={isApproved ? "success" : isRevision ? "warning" : "default"} size="sm">
                          {del.status.replace(/_/g, " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 font-mono">Format: {del.type} • Max {del.maxRevisions} Revisions</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono pt-1">
                        <span>Due: <strong className="text-slate-700">{del.dueDate}</strong></span>
                        <span>•</span>
                        <span>Milestone Escrow: <strong className="text-emerald-600">{formatCurrency(del.payoutAmount)}</strong></span>
                      </div>
                    </div>

                    {/* Action Controls per role */}
                    <div className="flex items-center gap-3 shrink-0">
                      {role === "creator" && !isApproved && (
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => {
                            setSelectedDel(del);
                            setIsSubmitModalOpen(true);
                          }}
                          leftIcon={<Upload className="w-3.5 h-3.5" />}
                        >
                          {isSubmitted ? "Re-upload Draft" : "Submit Draft Video"}
                        </Button>
                      )}

                      {role === "brand" && isSubmitted && (
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => {
                            setSelectedDel(del);
                            setIsReviewModalOpen(true);
                          }}
                          leftIcon={<Play className="w-3.5 h-3.5" />}
                        >
                          Inspect & Approve
                        </Button>
                      )}

                      {isApproved && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-mono font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
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
      </div>

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
            <Button variant="accent" size="lg" type="submit" className="w-full">
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
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">
              Submitted Draft Link
            </span>
            <a
              href={submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-accent hover:underline flex items-center gap-1 font-mono font-bold"
            >
              {submissionUrl} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
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
              className="flex-1"
              onClick={() => selectedDel && handleRequestRevision(selectedDel.id)}
            >
              Request Revision
            </Button>
            <Button
              variant="accent"
              size="md"
              className="flex-1"
              onClick={() => selectedDel && handleApproveDeliverable(selectedDel.id)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Approve & Release Funds
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
