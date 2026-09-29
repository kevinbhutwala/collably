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
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#12121A] text-[#0B0A14] dark:text-[#F4F4F8] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-[#0B0A14] dark:text-accent shrink-0">
            <Lock className="w-5 h-5 text-[#0B0A14] dark:text-accent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display">{title}</h4>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary text-[#0B0A14] uppercase">
                {plan?.name || "Pro Required"}
              </span>
            </div>
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] mt-0.5">{description}</p>
          </div>
        </div>

        <button
          onClick={() => openUpgradeModal(requiredPlanId)}
          className="px-4 py-2 rounded-full bg-primary hover:bg-accent text-[#0B0A14] text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs border border-black/10 shrink-0 self-end sm:self-center active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#0B0A14] text-[#0B0A14]" />
          <span>Upgrade to {plan?.name || "Unlock"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-b from-white to-[#FAF8F2] dark:from-[#181826] dark:to-[#101018] border-2 border-primary/40 p-8 sm:p-12 shadow-[0_12px_40px_rgba(var(--theme-primary-rgb),0.12)] relative overflow-hidden select-none text-[#0B0A14] dark:text-white">
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#FFAE00] border border-black/10 mx-auto flex items-center justify-center text-[#0B0A14] shadow-[0_8px_24px_rgba(var(--theme-primary-rgb),0.4)]">
          <Lock className="w-8 h-8 text-[#0B0A14]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-mono font-bold text-[#0B0A14] dark:text-accent">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0B0A14] dark:text-accent" />
            <span>REQUIRES {plan?.name?.toUpperCase() || "HIGHER TIER"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0A14] dark:text-white tracking-tight font-display">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed max-w-lg mx-auto font-sans">
            {description}
          </p>
        </div>

        {/* Included benefits */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xs rounded-2xl border border-black/8 dark:border-white/10 p-6 text-left space-y-3 shadow-xs">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4]">
            Included with {plan?.name}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {benefits.slice(0, 4).map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#2A2A38] dark:text-[#D0D0E0]">
                <div className="w-4 h-4 rounded-full bg-primary/25 dark:bg-primary/20 text-[#0B0A14] dark:text-accent flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#0B0A14] dark:text-accent" />
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
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-[#0B0A14] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(var(--theme-primary-rgb),0.45)] border border-black/10 active:scale-98"
          >
            <Sparkles className="w-4 h-4 fill-[#0B0A14] text-[#0B0A14]" />
            <span>Upgrade to {plan?.name || "Unlock Now"}</span>
            <ArrowRight className="w-4 h-4 text-[#0B0A14]" />
          </button>
        </div>
      </div>
    </div>
  );
}
