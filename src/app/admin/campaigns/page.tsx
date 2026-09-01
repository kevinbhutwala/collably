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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Moderation Queue
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Campaign Approval &amp; Quality Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Review incoming brand campaign briefs, deliverables feasibility, and budget escrow deposits.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5">
          {campaigns.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0A0A0E] font-display">{c.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-xs text-[#7A7A8A] font-mono">
                  {c.category} • {c.deliverables.length} Deliverable Types • {c.acceptedCount}/{c.maxCreators} Creators
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Total Escrow</span>
                  <span className="text-[#0A0A0E] font-extrabold">{formatCurrency(c.budget.totalBudget)}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold uppercase">
                  {c.status}
                </span>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${c.id}`} target="_blank">
                    <button className="px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/10">
                      Inspect
                    </button>
                  </Link>
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10"
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
