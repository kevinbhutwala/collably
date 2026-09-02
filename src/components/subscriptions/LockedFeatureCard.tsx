"use client";

import React from "react";
import { Lock, Sparkles, Check, ArrowRight, ShieldAlert } from "lucide-react";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { SubscriptionPlanId } from "@/core/types";
import { ALL_PLANS } from "@/core/constants";

interface LockedFeatureCardProps {
  title: string;
  description: string;
  requiredPlanId: SubscriptionPlanId;
  featureBenefits?: string[];
  compact?: boolean;
}

export function LockedFeatureCard({
  title,
  description,
  requiredPlanId,
  featureBenefits,
  compact = false,
}: LockedFeatureCardProps) {
  const { openUpgradeModal } = useSubscriptionStore();
  const plan = ALL_PLANS[requiredPlanId];

  const benefits = featureBenefits || plan?.featureBullets || [
    "Full access to advanced tooling & telemetry",
    "Priority support & higher quota limits",
    "Real-time synchronized pipeline updates",
  ];

  if (compact) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/20 border border-[#FFD21F]/40 flex items-center justify-center text-[#0A0A0E] shrink-0">
            <Lock className="w-5 h-5 text-[#0A0A0E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#0A0A0E] font-display">{title}</h4>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] uppercase">
                {plan?.name || "Pro Required"}
              </span>
            </div>
            <p className="text-xs text-[#6A6A78] mt-0.5">{description}</p>
          </div>
        </div>

        <button
          onClick={() => openUpgradeModal(requiredPlanId)}
          className="px-4 py-2 rounded-full bg-[#0A0A0E] hover:bg-[#1A1A24] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0 self-end sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
          <span>Upgrade to {plan?.name || "Unlock"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-b from-white to-[#FAF8F2] border-2 border-[#FFD21F]/40 p-8 sm:p-12 shadow-[0_12px_40px_rgba(255,210,31,0.12)] relative overflow-hidden select-none">
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD21F]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-black/10 mx-auto flex items-center justify-center text-[#0A0A0E] shadow-[0_8px_24px_rgba(255,210,31,0.4)]">
          <Lock className="w-8 h-8 text-[#0A0A0E]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>REQUIRES {plan?.name?.toUpperCase() || "HIGHER TIER"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed max-w-lg mx-auto font-sans">
            {description}
          </p>
        </div>

        {/* Included benefits */}
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-black/8 p-6 text-left space-y-3 shadow-xs">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6A6A78]">
            Included with {plan?.name}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {benefits.slice(0, 4).map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#2A2A38]">
                <div className="w-4 h-4 rounded-full bg-[#FFD21F]/25 text-[#0A0A0E] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#0A0A0E]" />
                </div>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openUpgradeModal(requiredPlanId)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,210,31,0.45)] border border-black/10 active:scale-98"
          >
            <Sparkles className="w-4 h-4 fill-[#0A0A0E] text-[#0A0A0E]" />
            <span>Upgrade to {plan?.name || "Unlock Now"}</span>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
          </button>
        </div>
      </div>
    </div>
  );
}
