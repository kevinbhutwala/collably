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
      <div className="space-y-6 overflow-x-auto text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[600px]">
          {creators.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-white/[0.04] border border-white/10 space-y-4 relative flex flex-col justify-between"
            >
              {onRemoveCreator && (
                <button
                  onClick={() => onRemoveCreator(c.id)}
                  className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white bg-white/10 border border-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/[0.05] border border-white/10 shrink-0">
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
                    <h4 className="font-bold text-sm text-white flex items-center gap-1 font-display">
                      {c.fullName}
                      {c.verified && <CheckCircle2 className="w-3.5 h-3.5 fill-sky-400 text-[#0a070a]" />}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">@{c.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="glow" size="sm">{c.primaryCategory}</Badge>
                  <span className="text-xs font-mono text-gold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {c.rating}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reach:</span>
                    <span className="font-bold text-white">{formatNumber(c.totalFollowers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Eng. Rate:</span>
                    <span className="font-bold text-emerald-400">{c.avgEngagementRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Starting Price:</span>
                    <span className="font-bold text-[hsl(327,100%,55%)]">{formatCurrency(c.startingPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Completed:</span>
                    <span className="font-bold text-white">{c.completedCampaignsCount || 0} Deals</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/creators/${c.id}`}>
                  <Button variant="primary" size="sm" className="w-full rounded-full font-display font-bold" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    View Media Kit
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
