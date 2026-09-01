"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
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
        "Dedicated Talent Concierge & Campaign QA",
        "Custom DPA, Invoicing & Net-30 Terms",
        "Unlimited Team Workspace Seats",
        "Custom Whitelist & Dark-Posting Rights Engine",
        "Dedicated Account Executive & 1h Emergency SLA",
      ],
    },
  ];

  const comparisonRows = [
    { feature: "Milestone Escrow Protection", starter: true, pro: true, enterprise: true },
    { feature: "4K Frame-Accurate Video Review", starter: true, pro: true, enterprise: true },
    { feature: "Direct Messaging & Attachments", starter: true, pro: true, enterprise: true },
    { feature: "AI Matching & Recommendation Engine", starter: false, pro: true, enterprise: true },
    { feature: "Creator CRM & Shortlist Tool", starter: false, pro: true, enterprise: true },
    { feature: "Team Collaboration Seats", starter: "1 Seat", pro: "5 Seats", enterprise: "Unlimited" },
    { feature: "Platform Take-Rate", starter: "10%", pro: "7%", enterprise: "5%" },
    { feature: "Dispute Arbitration SLA", starter: "24 Hours", pro: "4 Hours", enterprise: "1 Hour" },
    { feature: "White-Glove Campaign Management", starter: false, pro: false, enterprise: true },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#101010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#101010] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#101010]" />
            <span>03 • Transparent Economics</span>
          </div>

          <h2 className="section-headline">
            Simple pricing. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#626262]">
              Aligned with your growth.
            </span>
          </h2>

          <p className="editorial-body mx-auto text-center">
            No hidden platform retainers. Keep 90% to 95% of your campaign capital going directly to creative production.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs font-sans text-xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all font-semibold select-none",
                  billingCycle === "monthly"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                )}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "px-4 py-1.5 rounded-full transition-all font-semibold flex items-center gap-1.5 select-none",
                  billingCycle === "annual"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                )}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#B7FF3C] text-[#101010] text-[10px] font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => {
            const price = billingCycle === "annual" ? p.priceAnnual : p.priceMonthly;

            return (
              <div
                key={idx}
                className={cn(
                  "rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative",
                  p.popular
                    ? "bg-[#FFFFFF] border-2 border-[#101010] shadow-editorial-lg ring-4 ring-[#101010]/5 lg:-translate-y-2"
                    : "bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial hover:border-[#101010]"
                )}
              >
                {/* Popular Pill */}
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#101010] text-[#B7FF3C] text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    ★ {p.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#101010]">{p.name}</h3>
                      <p className="text-xs text-[#626262] mt-1 font-sans">{p.description}</p>
                    </div>
                    {!p.popular && (
                      <span className="px-2.5 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold text-[#626262]">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 font-display">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#101010] tracking-tight numeric-tabular">
                      ${price}
                    </span>
                    <span className="text-xs font-mono text-[#626262]">/month {billingCycle === "annual" && price > 0 && "(billed annually)"}</span>
                  </div>

                  {/* Features List */}
                  <div className="pt-2 border-t border-[#E7E7E4] space-y-3 font-sans text-xs">
                    {p.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#101010]" />
                        </div>
                        <span className={cn("text-[#101010]", fi === 0 && "font-semibold")}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <Link
                    href={p.ctaHref}
                    className={cn(
                      "w-full py-3.5 rounded-[9px] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all font-sans",
                      p.popular
                        ? "bg-[#101010] hover:bg-[#262626] text-[#FAFAF8] shadow-xs"
                        : "bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010]"
                    )}
                  >
                    <span>{p.ctaText}</span>
                    <ArrowRight className={cn("w-4 h-4", p.popular ? "text-[#B7FF3C]" : "text-[#101010]")} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial overflow-hidden">
          <div className="p-6 border-b border-[#E7E7E4] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-[#101010]">Full Feature Matrix</h3>
              <p className="text-xs text-[#626262] font-sans">Compare detailed plan limits, arbitration SLAs, and platform take-rates.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#101010] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#101010]" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#FAFAF8] border-b border-[#E7E7E4] text-[#626262] font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-semibold">Feature / Capability</th>
                  <th className="py-4 px-6 font-semibold text-center">Starter</th>
                  <th className="py-4 px-6 font-semibold text-center text-[#101010]">Growth Pro</th>
                  <th className="py-4 px-6 font-semibold text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7E4] text-[#101010]">
                {comparisonRows.map((r, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="py-4 px-6 font-medium text-[#101010]">{r.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof r.starter === "boolean" ? (
                        r.starter ? <Check className="w-4 h-4 text-[#101010] mx-auto" /> : <span className="text-[#8A8A8A]">—</span>
                      ) : (
                        <span className="font-mono font-bold">{r.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-[#FAFAF8]/50 font-semibold">
                      {typeof r.pro === "boolean" ? (
                        r.pro ? <Check className="w-4 h-4 text-[#101010] mx-auto" /> : <span className="text-[#8A8A8A]">—</span>
                      ) : (
                        <span className="font-mono font-bold text-[#101010]">{r.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof r.enterprise === "boolean" ? (
                        r.enterprise ? <Check className="w-4 h-4 text-[#101010] mx-auto" /> : <span className="text-[#8A8A8A]">—</span>
                      ) : (
                        <span className="font-mono font-bold">{r.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
