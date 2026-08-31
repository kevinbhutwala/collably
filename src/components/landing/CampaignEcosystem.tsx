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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Live Campaign Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Active briefs with milestone-locked budgets
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
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
              className="group rounded-3xl bg-white border border-slate-200 hover:border-slate-300 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <SafeImage
                  src={campaign.coverImage}
                  alt={campaign.title}
                  fallbackType="campaign"
                  fallbackName={campaign.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-white border border-white/80 relative shrink-0 shadow-sm">
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
                    <p className="text-xs font-bold text-white">{campaign.brand.companyName}</p>
                    <p className="text-[10px] text-slate-300 font-mono">Verified Brand</p>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-accent transition-colors line-clamp-1">
                  {campaign.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {campaign.tagline}
                </p>

                {/* Deliverables requirement pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {campaign.deliverables.map((del) => (
                    <span
                      key={del.id}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                    >
                      {del.count}x {del.type}
                    </span>
                  ))}
                </div>

                {/* Meta details */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
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
