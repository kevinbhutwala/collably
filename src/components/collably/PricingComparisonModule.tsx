"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingComparisonModule() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Starter",
      badge: "Self-Serve",
      priceMonthly: 0,
      priceAnnual: 0,
      description: "For emerging creators and indie brands launching milestone partnerships.",
      ctaText: "Start Free",
      ctaHref: "/creator/register",
      popular: false,
      features: [
        "10% Flat Take-Rate (No monthly fees)",
        "Automated Escrow Milestone Protection",
        "4K Timecoded Video Review Player",
        "Unlimited Creator Discoveries",
        "Direct In-App Messaging & File Sharing",
        "Standard Email Support (24h SLA)",
      ],
    },
    {
      name: "Growth Pro",
      badge: "Most Popular",
      priceMonthly: 99,
      priceAnnual: 79,
      description: "For scaling brands and established creator rosters seeking predictive AI matching.",
      ctaText: "Get Growth Pro",
      ctaHref: "/brand/register",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Reduced 7% Milestone Platform Take-Rate",
        "AI Creator Brief & Pitch Matching (98% match)",
        "Creator CRM & Side-by-Side Shortlists",
        "Up to 5 Team Workspace Seats",
        "Exportable PDF Contracts & Usage Rights",
        "Priority 4-Hour Dispute Arbitration",
      ],
    },
    {
      name: "Enterprise Scale",
      badge: "Managed Agency",
      priceMonthly: 399,
      priceAnnual: 319,
      description: "For agencies and high-volume marketing teams managing 50+ monthly creator deals.",
      ctaText: "Talk to Enterprise",
      ctaHref: "/contact",
      popular: false,
      features: [
        "Everything in Growth Pro, plus:",
        "Reduced 5% Milestone Platform Take-Rate",
        "Dedicated Account Executive & Talent Strategist",
        "Custom Automated Invoicing & Stripe Rails",
        "Unlimited Workspace Seats & Permissions",
        "Custom Security SLA & White-Label Reporting",
        "Instant Human Mediation & Escrow Arbitration",
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07070B] text-white select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
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
                    ? "bg-white text-[#07070B] shadow-xs"
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
                    ? "bg-[#2A5CFF] text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                )}
              >
                <span>Annual</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white text-[#07070B] font-bold">
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
                    ? "bg-[#0F0D1B] border-2 border-blue-500/60 shadow-[0_20px_60px_rgba(42,92,255,0.25)] lg:-translate-y-2"
                    : "bg-[#0E0C15]/90 border border-white/10 hover:border-white/20 shadow-xl"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#2A5CFF] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(42,92,255,0.6)]">
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
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
                        "w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md",
                        plan.popular
                          ? "bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white shadow-[0_0_20px_rgba(42,92,255,0.4)]"
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
