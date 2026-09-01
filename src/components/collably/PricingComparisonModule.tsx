"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingComparisonModule() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Creator Starter",
      badge: "FREE FOREVER",
      description: "Everything you need to pitch brands, share your audited rate card, and receive escrow payments.",
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        "Audited 1-click Media Kit",
        "Unlimited brand campaign pitches",
        "100% Escrow payout guarantee",
        "4K Video revision player access",
        "Direct chat with brand marketers",
      ],
      ctaText: "Get Started Free",
      ctaHref: "/creator/register",
      popular: false,
    },
    {
      name: "Creator Pro",
      badge: "RECOMMENDED",
      description: "Advanced analytics, priority pitch indexation, and instantaneous 2-hour escrow release.",
      priceMonthly: 29,
      priceAnnual: 24,
      features: [
        "Everything in Creator Starter",
        "Instant 2-hour payout release",
        "Priority brief discovery queue",
        "Audience retention & demographic deep-dive",
        "Verified PRO checkmark on profile",
        "Custom domain for Media Kit",
      ],
      ctaText: "Upgrade to Pro",
      ctaHref: "/creator/register",
      popular: true,
    },
    {
      name: "Brand Enterprise",
      badge: "FOR GROWTH TEAMS",
      description: "Dedicated campaign manager, multi-creator milestone batching, and automated 1099 compliance.",
      priceMonthly: 199,
      priceAnnual: 159,
      features: [
        "Unlimited live campaign briefs",
        "Custom creator contract templates",
        "Automated tax & 1099 compliance",
        "Multi-seat team collaboration CRM",
        "Dedicated creative strategist",
        "Custom SLA & phone support",
      ],
      ctaText: "Book Growth Demo",
      ctaHref: "/brand/register",
      popular: false,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#08080C] text-white select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] text-[10px] font-mono font-bold uppercase tracking-wider">
            <span>TRANSPARENT VALUE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] font-display">
            Simple, honest pricing for <br />
            <span className="font-serif italic font-normal text-white/80">creators &amp; brands.</span>
          </h2>

          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl mx-auto">
            Zero hidden fees. Pay only for successful milestone completions or unlock pro tooling for high-volume workflows.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-sans">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all font-semibold",
                  billingCycle === "monthly"
                    ? "bg-white text-[#0A0A0E] shadow-xs"
                    : "text-white/60 hover:text-white"
                )}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all font-semibold flex items-center gap-1.5",
                  billingCycle === "annual"
                    ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-xs border border-white/40"
                    : "text-white/60 hover:text-white"
                )}
              >
                <span>Annual</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white text-[#0A0A0E] font-bold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={i}
                className={cn(
                  "rounded-3xl p-8 flex flex-col justify-between space-y-8 relative backdrop-blur-2xl transition-all duration-300",
                  plan.popular
                    ? "bg-[#101018] border-2 border-[#FFD21F]/60 shadow-[0_20px_60px_rgba(255,210,31,0.2)] lg:-translate-y-2"
                    : "bg-[#101018] border border-white/10 hover:border-white/20 shadow-xl"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-[10px] font-mono font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(255,210,31,0.6)] border border-white/40">
                    ★ MOST POPULAR
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10 font-bold uppercase">
                      {plan.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 font-display">
                    <span className="text-4xl sm:text-5xl font-black text-white numeric-tabular">
                      ${price}
                    </span>
                    <span className="text-xs text-white/50 font-sans">
                      {price === 0 ? "forever" : "/ month billed annually"}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <span className="text-[11px] font-mono uppercase text-white/40 font-bold block">
                      INCLUDED CAPABILITIES:
                    </span>
                    <ul className="space-y-2.5 text-xs text-white/80 font-sans">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#FFD21F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={plan.ctaHref} className="w-full block">
                    <button
                      className={cn(
                        "w-full py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-md",
                        plan.popular
                          ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40"
                          : "bg-white/10 hover:bg-white/15 border border-white/15 text-white"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
