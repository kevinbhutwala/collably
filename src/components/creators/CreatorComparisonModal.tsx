"use client";

import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { CheckCircle2, Star, ArrowUpRight, X } from "lucide-react";

export function CreatorComparisonModal({
  isOpen,
  onClose,
  creators,
  onRemoveCreator,
}: {
  isOpen: boolean;
  onClose: () => void;
  creators: CreatorProfile[];
  onRemoveCreator?: (id: string) => void;
}) {
  if (creators.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Creator Side-by-Side Comparison"
      description="Compare audience demographics, rate cards, and engagement authenticity across shortlisted creators."
      maxWidth="4xl"
    >
      <div className="space-y-6 overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[600px]">
          {creators.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 relative flex flex-col justify-between"
            >
              {onRemoveCreator && (
                <button
                  onClick={() => onRemoveCreator(c.id)}
                  className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 bg-white border border-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shrink-0">
                    <SafeImage
                      src={c.avatarUrl}
                      alt={c.fullName}
                      fallbackType="creator"
                      fallbackName={c.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1">
                      {c.fullName}
                      {c.verified && <CheckCircle2 className="w-3.5 h-3.5 fill-sky-500 text-white" />}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">@{c.handle}</p>
                  </div>
                </div>

                <Badge variant="glow" size="sm">
                  {c.primaryCategory}
                </Badge>

                {/* Metrics Table */}
                <div className="space-y-2.5 pt-2 border-t border-slate-200 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Total Reach</span>
                    <span className="font-bold text-slate-900">{formatNumber(c.totalFollowers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Engagement</span>
                    <span className="font-bold text-emerald-600">{c.avgEngagementRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Rating</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {c.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Completed Gigs</span>
                    <span className="font-bold text-slate-900">{c.completedCampaignsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Base Rate</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(c.startingPrice)}</span>
                  </div>
                </div>

                {/* Top Countries */}
                <div className="pt-2 border-t border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block mb-1">
                    Primary Demographics
                  </span>
                  <div className="space-y-1 font-mono text-[11px] text-slate-700">
                    {c.audience.topCountries.slice(0, 2).map((ct, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{ct.country}</span>
                        <span className="font-bold">{ct.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Link href={`/creators/${c.id}`} target="_blank" className="w-full block">
                  <Button variant="secondary" size="sm" className="w-full">
                    View Full Kit
                  </Button>
                </Link>
                <Link href="/app/brand/campaigns/create" className="w-full block">
                  <Button variant="accent" size="sm" className="w-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    Send Brief
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
