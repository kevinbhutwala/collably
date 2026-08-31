"use client";

import React from "react";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/core/utils/formatters";

export default function AdminCollaborationsPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Deliverable Timelines & Dispute Operations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Monitor all active collaboration milestones across creators and brand marketing teams.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="divide-y divide-slate-100 font-mono text-xs">
          {MOCK_COLLABORATIONS.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 font-sans">{c.campaignTitle}</h4>
                  <Badge variant="glow" size="sm">{c.brand.companyName}</Badge>
                </div>
                <p className="text-slate-600 font-sans">
                  Creator: <strong className="text-slate-900">{c.creator.fullName}</strong> • Deliverable: {c.deliverables[0]?.title}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">Escrow</span>
                  <span className="text-emerald-600 font-bold">{formatCurrency(c.totalAgreedBudget)}</span>
                </div>
                <Badge variant="glow" size="sm">
                  {c.deliverables[0]?.status.toUpperCase()}
                </Badge>
                <span className="text-slate-500">Due: {c.deliverables[0]?.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
