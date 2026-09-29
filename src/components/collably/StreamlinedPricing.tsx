"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

export function StreamlinedPricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Creator Starter",
      badge: "FREE FOREVER",
      price: "₹0",
      period: "forever",
      desc: "For creators building their media kit and pitching brands.",
      features: [
        "Audited 1-click Media Kit",
        "Direct brand pitch inbox",
        "100% Escrow payout guarantee",
        "4K Video review player",
      ],
      ctaText: "Get Started Free",
      ctaHref: "/register?role=creator",
      popular: false,
    },
    {
      name: "Creator Pro",
      badge: "MOST POPULAR",
      price: isAnnual ? "₹1,999" : "₹2,499",
      period: "/month",
      desc: "For full-time creators scaling brand partnerships.",
      features: [
        "Priority pitch recommendation",
        "Instant payout on milestone approval",
        "Deep audience analytics & demographic data",
        "Verified Pro Creator checkmark",
      ],
      ctaText: "Upgrade to Pro",
      ctaHref: "/register?role=creator",
      popular: true,
    },
    {
      name: "Brand Growth",
      badge: "FOR BRANDS",
      price: isAnnual ? "₹12,999" : "₹15,999",
      period: "/month",
      desc: "For marketing teams running multi-creator campaigns.",
      features: [
        "Unlimited active campaign briefs",
        "Verified creator matching & audience scoring",
        "Automated contract & 1099 compliance",
        "Multi-seat team CRM workspace",
      ],
      ctaText: "Launch Campaigns",
      ctaHref: "/register?role=brand",
      popular: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#0B0A14] text-[#0B0A14] dark:text-[#F8FAFC] select-none relative overflow-hidden border-t border-black/[0.06] dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] text-[#64748B] dark:text-[#94A3B8] uppercase block">
            TRANSPARENT VALUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0B0A14] dark:text-white font-display">
            Simple, honest{" "}
            <span className="font-serif italic font-normal text-[#545266] dark:text-[#94A3B8] lowercase">pricing</span>
          </h2>

          {/* Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-[#F1F5F9] dark:bg-[#1A172E] border border-black/8 dark:border-white/10 text-xs font-sans shadow-2xs">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold ${
                  !isAnnual
                    ? "bg-[#7C3AED] text-white shadow-xs"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0B0A14] dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-[#7C3AED] text-white shadow-xs"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:text-[#0B0A14] dark:hover:text-white"
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              <InteractiveTiltCard
                maxTilt={6}
                glowColor="rgba(124, 58, 237, 0.25)"
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between w-full transition-all relative ${
                  tier.popular
                    ? "bg-white dark:bg-[#121020] border-2 border-[#7C3AED] shadow-[0_16px_48px_rgba(124,58,237,0.22)]"
                    : "bg-white dark:bg-[#121020] border border-black/[0.08] dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.07)] hover:border-black/15"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7C3AED] text-white font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs flex items-center gap-1 z-30">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-[#0B0A14] dark:text-white">{tier.name}</h3>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-sans mt-1">{tier.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1 font-mono pt-2">
                    <span suppressHydrationWarning className="text-4xl font-black text-[#0B0A14] dark:text-white font-display">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-sans">{tier.period}</span>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 space-y-2.5">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#474554] dark:text-[#CBD5E1] font-sans">
                        <div className="w-4 h-4 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] dark:text-[#C084FC] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#7C3AED] dark:text-[#C084FC]" />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={tier.ctaHref}
                  className={`mt-6 w-full py-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-sm ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#C084FC] hover:from-[#6D28D9] hover:to-[#A855F7] text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)]"
                      : "bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-[#1A172E] dark:hover:bg-[#252042] text-[#0B0A14] dark:text-white border border-black/10 dark:border-white/10 font-bold shadow-2xs hover:border-black/20"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </InteractiveTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
