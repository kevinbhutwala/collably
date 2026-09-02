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
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Brand Hub
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Campaigns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Manage open briefs, applicants, and deliverables.
          </p>
        </div>

        <Link href="/app/brand/campaigns/create">
          <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 self-start sm:self-center">
            <PlusCircle className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>New Brief</span>
          </button>
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-6 space-y-2 shadow-xs">
          <p className="text-sm font-bold text-[#0A0A0E]">No campaigns created yet</p>
          <p className="text-xs text-[#6A6A78]">Create your first campaign brief to start receiving pitches.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] transition-all space-y-3.5 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
                    {c.category}
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0E] font-bold">
                    {formatCurrency(c.budget.totalBudget)}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#0A0A0E] line-clamp-1 font-display">{c.title}</h3>
                <p className="text-xs text-[#5A5A68] line-clamp-2">{c.tagline}</p>

                <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-[#6A6A78]">
                    <span>Applicants:</span>
                    <span className="text-[#0A0A0E] font-bold">{c.applicantsCount}</span>
                  </div>
                  <div className="flex justify-between text-[#6A6A78]">
                    <span>Cohort:</span>
                    <span className="text-[#0A0A0E] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                      {c.acceptedCount}/{c.maxCreators}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6A6A78]">
                    <span>Due:</span>
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
                    Review ({c.applicantsCount})
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
