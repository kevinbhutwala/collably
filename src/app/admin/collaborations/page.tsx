"use client";

import React from "react";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";
import { formatCurrency } from "@/core/utils/formatters";

export default function AdminCollaborationsPage() {
  return (
    <div className="space-y-8 text-white select-none">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Operations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Deliverable Timelines &amp; Dispute Operations
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Monitor all active collaboration milestones across creators and brand marketing teams.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="divide-y divide-white/10 font-mono text-xs">
          {MOCK_COLLABORATIONS.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white font-sans font-display">{c.campaignTitle}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80 font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-white/50 font-sans">
                  Creator: <strong className="text-white">{c.creator.fullName}</strong> • Deliverable: {c.deliverables[0]?.title}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-white/40 block text-[10px]">Escrow</span>
                  <span className="text-white font-extrabold">{formatCurrency(c.totalAgreedBudget)}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  {c.deliverables[0]?.status}
                </span>
                <span className="text-white/40">Due: {c.deliverables[0]?.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
