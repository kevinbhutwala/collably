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
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);

  const handleApprove = (id: string) => {
    addToast({
      type: "success",
      title: "Campaign Approved",
      message: "Campaign brief approved and broadcasted to creator discovery index.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Campaign Approval & Quality Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Review incoming brand campaign briefs, deliverables feasibility, and budget escrow deposits.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="divide-y divide-slate-100">
          {campaigns.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{c.title}</span>
                  <Badge variant="glow" size="sm">{c.brand.companyName}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {c.category} • {c.deliverables.length} Deliverable Types • {c.acceptedCount}/{c.maxCreators} Creators
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Escrow</span>
                  <span className="text-emerald-600 font-bold">{formatCurrency(c.budget.totalBudget)}</span>
                </div>
                <Badge variant="success" size="sm" dot>
                  {c.status.toUpperCase()}
                </Badge>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${c.id}`} target="_blank">
                    <Button variant="secondary" size="sm">
                      Inspect
                    </Button>
                  </Link>
                  <Button variant="accent" size="sm" onClick={() => handleApprove(c.id)}>
                    Approve Brief
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
