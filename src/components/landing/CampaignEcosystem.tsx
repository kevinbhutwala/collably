"use client";

import React from "react";
import Link from "next/link";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { ArrowUpRight, Users, Calendar, Sparkles } from "lucide-react";

export function CampaignEcosystem() {
  return (
    <section className="py-24 bg-transparent border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Live Campaign Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
              Active briefs with milestone-locked budgets
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              Browse premier brand briefs open for applications. Clear guidelines, transparent budgets, zero ambiguity.
            </p>
          </div>

          <Link href="/campaigns">
            <Button variant="outline" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              View All Campaigns
            </Button>
          </Link>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CAMPAIGNS.slice(0, 3).map((campaign) => (
            <div
              key={campaign.id}
              className="group rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full bg-white/[0.04] overflow-hidden">
                <SafeImage
                  src={campaign.coverImage}
                  alt={campaign.title}
                  fallbackType="campaign"
                  fallbackName={campaign.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c16] via-black/40 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <Badge variant="glow" size="sm">
                    {campaign.category}
                  </Badge>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 font-bold">
                    {formatCurrency(campaign.budget.perCreatorBudget)} / creator
                  </span>
                </div>

                {/* Brand Logo & Name overlay */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/10 border border-white/20 relative shrink-0 shadow-sm">
                    <SafeImage
                      src={campaign.brand.logoUrl}
                      alt={campaign.brand.companyName}
                      fallbackType="brand"
                      fallbackName={campaign.brand.companyName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-display">{campaign.brand.companyName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Verified Brand</p>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-base text-white group-hover:text-[hsl(327,100%,55%)] transition-colors line-clamp-1 font-display">
                  {campaign.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  {campaign.tagline}
                </p>

                {/* Deliverables requirement pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {campaign.deliverables.map((del) => (
                    <span
                      key={del.id}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-medium font-mono"
                    >
                      {del.count}x {del.type}
                    </span>
                  ))}
                </div>

                {/* Meta details */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {campaign.acceptedCount}/{campaign.maxCreators} Creators
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due {campaign.timeline.contentSubmissionDeadline}</span>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 pt-0">
                <Link href={`/campaigns/${campaign.id}`} className="w-full">
                  <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    View Brief & Apply
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
