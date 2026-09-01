"use client";

import React from "react";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";
import { formatCurrency } from "@/core/utils/formatters";

export default function AdminCollaborationsPage() {
  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Operations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Deliverable Timelines &amp; Dispute Operations
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Monitor all active collaboration milestones across creators and brand marketing teams.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 font-mono text-xs">
          {MOCK_COLLABORATIONS.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-sans font-display">{c.campaignTitle}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-[#5A5A68] font-sans">
                  Creator: <strong className="text-[#0A0A0E]">{c.creator.fullName}</strong> • Deliverable: {c.deliverables[0]?.title}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Escrow</span>
                  <span className="text-[#0A0A0E] font-extrabold">{formatCurrency(c.totalAgreedBudget)}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold uppercase">
                  {c.deliverables[0]?.status}
                </span>
                <span className="text-[#7A7A8A]">Due: {c.deliverables[0]?.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
