"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

export function StreamlinedPricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Creator Starter",
      badge: "FREE FOREVER",
      price: "$0",
      period: "forever",
      desc: "For creators building their media kit and pitching brands.",
      features: [
        "Audited 1-click Media Kit",
        "Direct brand pitch inbox",
        "100% Escrow payout guarantee",
        "4K Video review player",
      ],
      ctaText: "Get Started Free",
      ctaHref: "/creator/register",
      popular: false,
    },
    {
      name: "Creator Pro",
      badge: "MOST POPULAR",
      price: isAnnual ? "$24" : "$29",
      period: "/month",
      desc: "For full-time creators scaling brand partnerships.",
      features: [
        "Priority pitch recommendation",
        "Instant 2-hour payout release",
        "Deep audience analytics & demographic data",
        "Verified Pro Creator checkmark",
      ],
      ctaText: "Upgrade to Pro",
      ctaHref: "/creator/register",
      popular: true,
    },
    {
      name: "Brand Growth",
      badge: "FOR BRANDS",
      price: isAnnual ? "$159" : "$199",
      period: "/month",
      desc: "For marketing teams running multi-creator campaigns.",
      features: [
        "Unlimited active campaign briefs",
        "AI creator matching & scoring",
        "Automated contract & 1099 compliance",
        "Multi-seat team CRM workspace",
      ],
      ctaText: "Launch Campaigns",
      ctaHref: "/brand/register",
      popular: false,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white text-[#0A0A0E] select-none relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Toggle */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] text-[#6A6A78] uppercase block">
            TRANSPARENT VALUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A0A0E] font-display">
            Simple, honest <br className="sm:hidden" />
            <span className="font-serif italic font-normal text-[#5A5A68] lowercase">pricing</span>
          </h2>

          {/* Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-[#F4F4F8] border border-black/6 text-xs font-sans">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3.5 py-1.5 rounded-full transition-all font-bold ${
                  !isAnnual ? "bg-[#0A0A0E] text-white shadow-xs" : "text-[#6A6A78] hover:text-[#0A0A0E]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3.5 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  isAnnual ? "bg-[#0A0A0E] text-white shadow-xs" : "text-[#6A6A78] hover:text-[#0A0A0E]"
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards with 3D Tilt & Cursor Reflection Sheen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <InteractiveTiltCard
              key={tier.name}
              maxTilt={7}
              glowColor="rgba(255, 210, 31, 0.22)"
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? "bg-gradient-to-b from-[#FFFDF5] to-white border-2 border-[#FFD21F] shadow-[0_12px_40px_rgba(255,210,31,0.18)]"
                  : "bg-white border border-black/8 shadow-sm hover:border-black/15"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs flex items-center gap-1 z-30">
                  <Sparkles className="w-3 h-3" />
                  <span>RECOMMENDED</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0A0A0E]">{tier.name}</h3>
                  <p className="text-xs text-[#6A6A78] font-sans mt-1">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 font-mono pt-2">
                  <span className="text-4xl font-black text-[#0A0A0E] font-display">{tier.price}</span>
                  <span className="text-xs text-[#6A6A78] font-sans">{tier.period}</span>
                </div>

                <div className="pt-3 border-t border-black/6 space-y-2.5">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#4A4A58] font-sans">
                      <div className="w-4 h-4 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#0A0A0E]" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link href={tier.ctaHref}>
                  <button
                    className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 ${
                      tier.popular
                        ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_16px_rgba(255,210,31,0.4)]"
                        : "bg-[#F4F4F8] hover:bg-[#0A0A0E] hover:text-white text-[#0A0A0E]"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </InteractiveTiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
