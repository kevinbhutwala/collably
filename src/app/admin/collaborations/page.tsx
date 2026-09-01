"use client";

import React from "react";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/core/utils/formatters";

export default function AdminCollaborationsPage() {
  return (
    <div className="space-y-8 text-[#111111]">
      <div className="pb-6 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            Active Operations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Deliverable Timelines &amp; Dispute Operations
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
          Monitor all active collaboration milestones across creators and brand marketing teams.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="divide-y divide-[#E7E7E4] font-mono text-xs">
          {MOCK_COLLABORATIONS.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#111111] font-sans font-display">{c.campaignTitle}</h4>
                  <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-[#6B6B6B] font-sans">
                  Creator: <strong className="text-[#111111]">{c.creator.fullName}</strong> • Deliverable: {c.deliverables[0]?.title}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Escrow</span>
                  <span className="text-[#111111] font-extrabold">{formatCurrency(c.totalAgreedBudget)}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
                  {c.deliverables[0]?.status.toUpperCase()}
                </span>
                <span className="text-[#6B6B6B]">Due: {c.deliverables[0]?.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
