"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/core/types";
import { formatCurrency } from "@/core/utils/formatters";
import { PlusCircle } from "lucide-react";

export default function BrandCampaignsManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await campaignService.getCampaigns();
      setCampaigns(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Brand Hub
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Active Roster
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Brand Campaign Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Monitor applicant cohorts, escrow funding, and deliverable review pipelines.
          </p>
        </div>

        <Link href="/app/brand/campaigns/create">
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-[#0A0A0E]" />
            <span>Create New Brief</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] transition-all space-y-4 flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
                  {c.category}
                </span>
                <span className="text-[11px] font-mono text-[#0A0A0E] font-extrabold">
                  {formatCurrency(c.budget.totalBudget)} Pool
                </span>
              </div>

              <h3 className="font-bold text-base text-[#0A0A0E] line-clamp-1 font-display">{c.title}</h3>
              <p className="text-xs text-[#5A5A68] line-clamp-2 font-sans">{c.tagline}</p>

              <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Applicants:</span>
                  <span className="text-[#0A0A0E] font-bold">{c.applicantsCount} Creators</span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Approved Cohort:</span>
                  <span className="text-[#0A0A0E] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                    {c.acceptedCount}/{c.maxCreators}
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6A78]">
                  <span>Submission Due:</span>
                  <span className="text-[#0A0A0E] font-medium">{c.timeline.contentSubmissionDeadline}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Link href={`/campaigns/${c.id}`} className="flex-1">
                <button className="w-full py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/10">
                  Public View
                </button>
              </Link>
              <Link href="/app/applications" className="flex-1">
                <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10">
                  Review Apps
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
