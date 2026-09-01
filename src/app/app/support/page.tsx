"use client";

import React, { useState, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { SupportTicket, DisputeRecord } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  HelpCircle,
  ShieldAlert,
  Plus,
} from "lucide-react";

export default function SupportAndDisputePage() {
  const { user, role } = useAuthStore();
  const { addToast } = useUIStore();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [disputes, setDisputes] = useState<DisputeRecord[]>([]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);

  // Ticket Form
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState<SupportTicket["category"]>("Billing");
  const [ticketPriority, setTicketPriority] = useState<SupportTicket["priority"]>("Medium");
  const [ticketMessage, setTicketMessage] = useState("");

  // Dispute Form
  const [disputeCampaign, setDisputeCampaign] = useState("AI-Powered Sprint Workflows Launch");
  const [disputeReason, setDisputeReason] = useState<DisputeRecord["reason"]>("Scope_Mismatch");
  const [disputeAmount, setDisputeAmount] = useState(3500);
  const [disputeDesc, setDisputeDesc] = useState("");
  const [disputeEvidence, setDisputeEvidence] = useState("https://vimeo.com/preview/evidence-draft");

  useEffect(() => {
    const fetch = async () => {
      const tkts = await disputeService.getTickets();
      setTickets(tkts);
      const disps = await disputeService.getDisputes();
      setDisputes(disps);
    };
    fetch();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await disputeService.createTicket({
      userId: user?.id || "user-1",
      userName: user?.name || "Participant",
      userRole: role,
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      initialMessage: ticketMessage,
    });
    setTickets((prev) => [created, ...prev]);
    setIsTicketModalOpen(false);
    setTicketSubject("");
    setTicketMessage("");
    addToast({
      type: "success",
      title: "Support Ticket Logged",
      message: `Ticket #${created.id} submitted to operations desk.`,
    });
  };

  const handleFileDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await disputeService.createDispute({
      collaborationId: `collab-${Date.now()}`,
      campaignTitle: disputeCampaign,
      raisedByRole: role,
      raisedByName: user?.name || "Participant",
      respondentRole: role === "brand" ? "creator" : "brand",
      respondentName: role === "brand" ? "Elena Rostova" : "Linear Dynamics",
      reason: disputeReason,
      amountInDispute: disputeAmount,
      description: disputeDesc,
      evidenceMediaUrls: [disputeEvidence],
    });
    setDisputes((prev) => [created, ...prev]);
    setIsDisputeModalOpen(false);
    setDisputeDesc("");
    addToast({
      type: "warning",
      title: "Arbitration Case Opened",
      message: "Escrow release frozen pending supervisor determination (<4 hr SLA).",
    });
  };

  return (
    <div className="space-y-8 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Assistance &amp; Mediation
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              24/7 Operations Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Support Center &amp; Dispute Resolution
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Submit operational inquiries, report campaign deliverable disputes, and track resolution arbitration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsDisputeModalOpen(true)}
            leftIcon={<ShieldAlert className="w-4 h-4 text-amber-500" />}
            className="rounded-[9px]"
          >
            File Milestone Dispute
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsTicketModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4 text-[#B7FF3C]" />}
            className="rounded-[9px]"
          >
            Open Support Ticket
          </Button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Support Tickets */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2 font-display">
              <HelpCircle className="w-5 h-5 text-[#111111]" />
              <span>My Support Inquiries ({tickets.length})</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
              Active Desk
            </span>
          </div>

          <div className="divide-y divide-[#E7E7E4] space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#111111] font-display">{t.subject}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    t.status === "Resolved" ? "bg-[#B7FF3C] text-[#111111]" : "bg-[#FAFAF8] text-[#6B6B6B] border border-[#E7E7E4]"
                  }`}>
                    {t.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
                  {t.messages[t.messages.length - 1]?.content}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-[#6B6B6B] font-mono">
                  <span>Category: {t.category}</span>
                  <span>•</span>
                  <span>Priority: {t.priority}</span>
                  <span>•</span>
                  <span>Updated: {t.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Disputes & Escrow Mediation */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2 font-display">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Milestone Arbitration Queue ({disputes.length})</span>
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
              Escrow Protected
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {disputes.map((d) => (
              <div key={d.id} className="p-5 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#111111] font-sans">{d.campaignTitle}</h4>
                  <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[10px] font-mono font-bold">
                    {d.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B] font-sans leading-relaxed">{d.description}</p>
                {d.adminArbitrationNotes && (
                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-[11px] font-sans">
                    <strong>Admin Arbitration Note:</strong> {d.adminArbitrationNotes}
                  </div>
                )}
                <div className="flex justify-between text-[#6B6B6B] pt-2 border-t border-[#E7E7E4]">
                  <span>Disputed Amount: <strong className="text-[#111111]">${d.amountInDispute}</strong></span>
                  <span>Reason: {d.reason.replace(/_/g, " ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Ticket Modal */}
      <Modal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        title="Open Support Ticket"
        description="Our dedicated agency partner operations team will assist with billing, technical, or campaign questions."
        maxWidth="md"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4 text-[#111111]">
          <Input
            label="Inquiry Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            placeholder="e.g. Question regarding W-9 tax submission"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#111111]">Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value as any)}
                className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Billing">Billing &amp; Payouts</option>
                <option value="Campaign_Help">Campaign Brief Help</option>
                <option value="Account_Verification">Account Verification</option>
                <option value="Technical">Technical Bug</option>
              </select>
            </div>
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#111111]">Priority</label>
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value as any)}
                className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          <Textarea
            label="Detailed Description"
            value={ticketMessage}
            onChange={(e) => setTicketMessage(e.target.value)}
            placeholder="Describe your issue with relevant URLs or campaign titles..."
            rows={4}
            required
          />
          <Button variant="primary" size="md" type="submit" className="w-full rounded-[9px]">
            Submit Ticket
          </Button>
        </form>
      </Modal>

      {/* File Dispute Modal */}
      <Modal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        title="File Milestone Escrow Dispute"
        description="Formal arbitration freezes escrow release and assigns an agency supervisor to mediate evidence."
        maxWidth="lg"
      >
        <form onSubmit={handleFileDispute} className="space-y-4 text-[#111111]">
          <Input
            label="Campaign Brief Title"
            value={disputeCampaign}
            onChange={(e) => setDisputeCampaign(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#111111]">Dispute Reason</label>
              <select
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value as any)}
                className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
              >
                <option value="Scope_Mismatch">Scope &amp; Guidelines Mismatch</option>
                <option value="Quality_Standards">Quality Standards Violation</option>
                <option value="Missed_Deadline">Missed Submission Deadline</option>
                <option value="Usage_Rights_Violation">Usage Rights Violation</option>
              </select>
            </div>
            <Input
              label="Disputed Escrow Amount ($ USD)"
              type="number"
              value={disputeAmount}
              onChange={(e) => setDisputeAmount(parseInt(e.target.value) || 0)}
              required
            />
          </div>
          <Textarea
            label="Detailed Evidence & Statement"
            value={disputeDesc}
            onChange={(e) => setDisputeDesc(e.target.value)}
            placeholder="Describe the discrepancy with timestamp references or contract terms..."
            rows={4}
            required
          />
          <Input
            label="Supporting Evidence URL / Video Link"
            value={disputeEvidence}
            onChange={(e) => setDisputeEvidence(e.target.value)}
            required
          />
          <Button variant="primary" size="md" type="submit" className="w-full rounded-[9px]">
            Submit Dispute &amp; Request Mediation
          </Button>
        </form>
      </Modal>
    </div>
  );
}
