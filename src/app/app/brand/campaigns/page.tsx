"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/core/utils/formatters";
import { PlusCircle, Users, ArrowUpRight, ShieldCheck } from "lucide-react";

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Brand Hub
            </span>
            <span className="text-zinc-600">•</span>
            <Badge variant="glow" size="sm">Active Roster</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Brand Campaign Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Monitor applicant cohorts, escrow funding, and deliverable review pipelines.
          </p>
        </div>

        <Link href="/app/brand/campaigns/create">
          <Button variant="accent" size="md" rightIcon={<PlusCircle className="w-4 h-4" />}>
            Create New Brief
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="glow" size="sm">{c.category}</Badge>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {formatCurrency(c.budget.totalBudget)} Pool
                </span>
              </div>

              <h3 className="font-bold text-base text-white line-clamp-1">{c.title}</h3>
              <p className="text-xs text-zinc-400 line-clamp-2">{c.tagline}</p>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Applicants:</span>
                  <span className="text-white font-bold">{c.applicantsCount} Creators</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Approved Cohort:</span>
                  <span className="text-emerald-400 font-bold">{c.acceptedCount}/{c.maxCreators}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Submission Due:</span>
                  <span className="text-zinc-200">{c.timeline.contentSubmissionDeadline}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Link href={`/campaigns/${c.id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  Public View
                </Button>
              </Link>
              <Link href="/app/applications" className="flex-1">
                <Button variant="accent" size="sm" className="w-full">
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
