"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
    <div className="space-y-8 text-[#111111]">
      <div className="pb-6 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            Moderation Queue
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Campaign Approval &amp; Quality Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
          Review incoming brand campaign briefs, deliverables feasibility, and budget escrow deposits.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="divide-y divide-[#E7E7E4]">
          {campaigns.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#111111] font-display">{c.title}</span>
                  <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
                    {c.brand.companyName}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B] font-mono">
                  {c.category} • {c.deliverables.length} Deliverable Types • {c.acceptedCount}/{c.maxCreators} Creators
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Total Escrow</span>
                  <span className="text-[#111111] font-extrabold">{formatCurrency(c.budget.totalBudget)}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
                  {c.status.toUpperCase()}
                </span>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${c.id}`} target="_blank">
                    <Button variant="secondary" size="sm" className="rounded-[9px]">
                      Inspect
                    </Button>
                  </Link>
                  <Button variant="primary" size="sm" onClick={() => handleApprove(c.id)} className="rounded-[9px]">
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
