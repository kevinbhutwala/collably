"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/core/utils/formatters";
import { PlusCircle } from "lucide-react";

export default function BrandCampaignsManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await campaignService.getCampaigns();
      setCampaigns(data);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Brand Hub
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Active Roster
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Brand Campaign Management
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Monitor applicant cohorts, escrow funding, and deliverable review pipelines.
          </p>
        </div>

        <Link href="/app/brand/campaigns/create">
          <Button variant="primary" size="md" rightIcon={<PlusCircle className="w-4 h-4 text-[#B7FF3C]" />} className="rounded-[9px]">
            Create New Brief
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] transition-all space-y-4 flex flex-col justify-between shadow-xs hover:shadow-editorial"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
                  {c.category}
                </span>
                <span className="text-[11px] font-mono text-[#111111] font-bold">
                  {formatCurrency(c.budget.totalBudget)} Pool
                </span>
              </div>

              <h3 className="font-bold text-base text-[#111111] line-clamp-1 font-display">{c.title}</h3>
              <p className="text-xs text-[#6B6B6B] line-clamp-2 font-sans font-medium">{c.tagline}</p>

              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Applicants:</span>
                  <span className="text-[#111111] font-bold">{c.applicantsCount} Creators</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Approved Cohort:</span>
                  <span className="text-[#111111] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                    {c.acceptedCount}/{c.maxCreators}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Submission Due:</span>
                  <span className="text-[#111111]">{c.timeline.contentSubmissionDeadline}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Link href={`/campaigns/${c.id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full rounded-[9px]">
                  Public View
                </Button>
              </Link>
              <Link href="/app/applications" className="flex-1">
                <Button variant="primary" size="sm" className="w-full rounded-[9px]">
                  Review Apps
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
