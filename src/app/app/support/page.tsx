"use client";

import React, { useState, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { SupportTicket, DisputeRecord } from "@/core/types";
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
      setTickets(tkts || []);
      const disps = await disputeService.getDisputes();
      setDisputes(disps || []);
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
    <div className="space-y-6 text-[#0A0A0E] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operations Desk
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Help &amp; Arbitration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Support &amp; Disputes
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Get assistance from our team or resolve project milestones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDisputeModalOpen(true)}
            className="px-3.5 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5 border border-black/10 shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>Open Dispute</span>
          </button>

          <button
            onClick={() => setIsTicketModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Support Tickets */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <h3 className="text-base font-bold text-[#0A0A0E] flex items-center gap-2 font-display">
              <HelpCircle className="w-5 h-5 text-[#0A0A0E]" />
              <span>My Support Inquiries ({tickets.length})</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#0A0A0E] text-[10px] font-mono font-bold">
              Active Desk
            </span>
          </div>

          <div className="divide-y divide-black/5 space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-sans">{t.subject}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    t.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-black/5 text-[#5A5A68]"
                  }`}>
                    {t.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
                  {t.messages[t.messages.length - 1]?.content}
                </p>
                <div className="flex items-center gap-4 text-[10px] text-[#7A7A8A] font-mono">
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
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <h3 className="text-base font-bold text-[#0A0A0E] flex items-center gap-2 font-display">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>Milestone Arbitration Queue ({disputes.length})</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
              Escrow Protected
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {disputes.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-sans">{d.campaignTitle}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold">
                    {d.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#5A5A68] font-sans leading-relaxed">{d.description}</p>
                {d.adminArbitrationNotes && (
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-[#0A0A0E] text-[11px] font-sans shadow-2xs">
                    <strong className="text-[#0A0A0E]">Admin Arbitration Note:</strong> {d.adminArbitrationNotes}
                  </div>
                )}
                <div className="flex justify-between text-[#6A6A78] pt-2 border-t border-black/5">
                  <span>Disputed Amount: <strong className="text-[#0A0A0E]">${d.amountInDispute}</strong></span>
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
        <form onSubmit={handleCreateTicket} className="space-y-4 text-[#0A0A0E]">
          <Input
            label="Inquiry Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            placeholder="e.g. Question regarding W-9 tax submission"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#0A0A0E]">Category</label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value as any)}
                className="w-full bg-[#F8F8FC] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#0A0A0E] focus:outline-none"
              >
                <option value="Billing">Billing &amp; Payouts</option>
                <option value="Campaign_Help">Campaign Brief Help</option>
                <option value="Account_Verification">Account Verification</option>
                <option value="Technical">Technical Bug</option>
              </select>
            </div>
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#0A0A0E]">Priority</label>
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value as any)}
                className="w-full bg-[#F8F8FC] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#0A0A0E] focus:outline-none"
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
          <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10">
            Submit Ticket
          </button>
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
        <form onSubmit={handleFileDispute} className="space-y-4 text-[#0A0A0E]">
          <Input
            label="Campaign Brief Title"
            value={disputeCampaign}
            onChange={(e) => setDisputeCampaign(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left font-sans">
              <label className="text-xs font-semibold text-[#0A0A0E]">Dispute Reason</label>
              <select
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value as any)}
                className="w-full bg-[#F8F8FC] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#0A0A0E] focus:outline-none"
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
          <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10">
            Submit Dispute &amp; Request Mediation
          </button>
        </form>
      </Modal>
    </div>
  );
}
