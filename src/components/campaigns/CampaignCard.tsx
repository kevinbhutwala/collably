import React from "react";
import Link from "next/link";
import { Campaign } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { formatCurrency } from "@/core/utils/formatters";
import { Users, Calendar, ArrowUpRight } from "lucide-react";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="group rounded-3xl bg-white border border-slate-200 hover:border-slate-300 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
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

        {/* Floating Tag */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="glow" size="sm">
            {campaign.category}
          </Badge>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30 font-bold">
            {formatCurrency(campaign.budget.perCreatorBudget)} / creator
          </span>
        </div>

        {/* Brand Details */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/40 flex items-center justify-center shrink-0 shadow-md">
            <BrandIcon name={campaign.brand.companyName} size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">{campaign.brand.companyName}</p>
            <p className="text-[10px] text-slate-300 font-mono">Verified Brand</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-accent transition-colors line-clamp-1">
          {campaign.title}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {campaign.tagline}
        </p>

        {/* Deliverables List */}
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

        {/* Meta */}
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

      {/* Action */}
      <div className="p-4 pt-0">
        <Link href={`/campaigns/${campaign.id}`} className="w-full">
          <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
            View Brief & Pitch
          </Button>
        </Link>
      </div>
    </div>
  );
}
