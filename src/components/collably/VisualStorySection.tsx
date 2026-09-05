"use client";

import React from "react";
import { Sparkles, Video, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

export function VisualStorySection() {
  const steps = [
    {
      num: "01",
      badge: "INSTANT MATCH",
      title: "AI-Powered Matching",
      description: "Post a campaign brief or search 50,000+ vetted creators. Get matched by audience data, engagement, and verified rates in under 60 seconds.",
      icon: Sparkles,
      accent: "bg-[#FFD21F]/20 text-[#0A0A0E] border-[#FFD21F]/40",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    },
    {
      num: "02",
      badge: "COLLABORATION OS",
      title: "4K Frame-Accurate Review",
      description: "Review video cuts with timeline timestamp annotations, direct revision requests, and automated contract license generation.",
      icon: Video,
      accent: "bg-blue-500/10 text-blue-800 border-blue-500/20",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    },
    {
      num: "03",
      badge: "GUARANTEED ESCROW",
      title: "100% Protected Payouts",
      description: "Campaign milestone funds are secured upfront in segregated escrow and automatically released within 24 hours of deliverable approval.",
      icon: ShieldCheck,
      accent: "bg-emerald-500/10 text-emerald-800 border-emerald-500/20",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
  ];

  const metrics = [
    { value: "4.8×", label: "Average Brand ROI" },
    { value: "<24h", label: "Automated Payouts" },
    { value: "50,000+", label: "Verified Creators" },
    { value: "100%", label: "Escrow Protection" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAFAFC] text-[#0A0A0E] select-none relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] text-[#6A6A78] uppercase block">
            HOW ABEYCOLLAB WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A0A0E] font-display">
            Frictionless collaboration <br className="sm:hidden" />
            <span className="font-serif italic font-normal text-[#5A5A68] lowercase">from brief to payout</span>
          </h2>
        </div>

        {/* 3 Visual Step Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <InteractiveTiltCard
                key={step.num}
                maxTilt={7}
                glowColor="rgba(255, 210, 31, 0.2)"
                className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 space-y-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#0A0A0E] font-mono">
                      {step.num}
                    </span>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${step.accent}`}>
                      {step.badge}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-[#F4F4F8] border border-black/6 flex items-center justify-center text-[#0A0A0E]">
                    <Icon className="w-5 h-5 text-[#0A0A0E]" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#0A0A0E]">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/6">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#087F5B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Built-in &amp; Automated</span>
                  </div>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>

        {/* 4 Proof Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-black/8 shadow-xs text-center font-mono">
          {metrics.map((m) => (
            <div key={m.label} className="p-3">
              <span className="text-2xl sm:text-3xl font-black text-[#0A0A0E] font-display block">
                {m.value}
              </span>
              <span className="text-xs text-[#6A6A78] font-sans mt-1 block font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
