"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";

export default function AdminCampaignsQueuePage() {
  const { addToast } = useUIStore();
  const [campaigns] = useState(MOCK_CAMPAIGNS);

  const handleApprove = (id: string) => {
    addToast({
      type: "success",
      title: "Campaign Approved",
      message: "Campaign brief approved and broadcasted to creator discovery index.",
    });
  };

  return (
    <div className="space-y-8 text-white select-none">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Moderation Queue
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Campaign Approval &amp; Quality Queue
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Review incoming brand campaign briefs, deliverables feasibility, and budget escrow deposits.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="divide-y divide-white/10">
          {campaigns.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white font-display">{c.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80 font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-xs text-white/50 font-mono">
                  {c.category} • {c.deliverables.length} Deliverable Types • {c.acceptedCount}/{c.maxCreators} Creators
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">Total Escrow</span>
                  <span className="text-white font-extrabold">{formatCurrency(c.budget.totalBudget)}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  {c.status}
                </span>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${c.id}`} target="_blank">
                    <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
                      Inspect
                    </button>
                  </Link>
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-md"
                  >
                    Approve Brief
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
