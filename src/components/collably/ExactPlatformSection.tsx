"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Sparkles, Handshake, ShieldCheck, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExactPlatformSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { id: "DISCOVER", title: "DISCOVER", desc: "Find the right creators", icon: Search },
    { id: "MATCH", title: "MATCH", desc: "AI-powered recommendations", icon: Sparkles },
    { id: "COLLABORATE", title: "COLLABORATE", desc: "Plan and create together", icon: Handshake },
    { id: "PAY", title: "PAY", desc: "Secure milestone payments", icon: ShieldCheck },
    { id: "MEASURE", title: "MEASURE", desc: "Track performance & ROI", icon: BarChart3 },
  ];

  return (
    <section className="py-20 sm:py-28 bg-texture-paper-white border-y border-black/10 text-[#0A0A0E] select-none relative overflow-hidden">
      {/* Subtle background ambient gold flare on light paper */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#FFD21F]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Rounded Capsule Card with Light Surface */}
        <div className="rounded-[2.5rem] bg-[#FFFFFF] border border-black/10 p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* ══════════════════════════════════════════════════════════════════════
                LEFT: EDITORIAL STATEMENT & NAVIGATION
                ══════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-4 space-y-6">
              {/* Pagination & Arrows */}
              <div className="flex items-center gap-4 text-xs font-mono text-[#626262]">
                <span className="font-bold text-[#101010]">01 / 07</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="p-1 rounded-full hover:bg-black/5 text-[#101010] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="p-1 rounded-full hover:bg-black/5 text-[#101010] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bold Editorial Headline */}
              <div className="space-y-1">
                <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black uppercase tracking-tight text-[#101010] leading-[1.02] font-display">
                  BUILT FOR <br />
                  <span className="font-serif italic font-normal text-[#626262]">CREATORS.</span>
                </h2>
                <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black uppercase tracking-tight text-[#101010] leading-[1.02] font-display">
                  MADE FOR <br />
                  <span className="font-serif italic font-normal text-[#626262]">BRANDS.</span>
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed max-w-sm">
                Collably brings together creators and brands with a seamless, transparent, and secure platform — from discovery to payment.
              </p>

              {/* CTA Link */}
              <div className="pt-2">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#101010] hover:text-[#0A0A0E] transition-colors font-sans group"
                >
                  <span>Explore the Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                CENTER: CHROMATIC LIQUID GLASS + SPLIT PORTRAIT COMPOSITION
                ══════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Layered Split Images Container */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl flex">
                {/* Left Side: Female Portrait with Warm Orange Backdrop */}
                <div className="w-1/2 h-full relative overflow-hidden bg-gradient-to-br from-amber-500 to-[#FFD21F]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=85"
                    alt="Female Creator"
                    className="w-full h-full object-cover object-center filter contrast-110"
                  />
                  <div className="absolute inset-0 bg-[#FFD21F]/10 pointer-events-none" />
                </div>

                {/* Right Side: Male Creator with Cap */}
                <div className="w-1/2 h-full relative overflow-hidden bg-slate-900 border-l border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=85"
                    alt="Male Creator"
                    className="w-full h-full object-cover object-center filter contrast-115 brightness-95"
                  />
                  <div className="absolute inset-0 bg-[#FFD21F]/10 pointer-events-none" />
                </div>

                {/* 3D Glass Chrome Fluid Reflection Circle Overlay */}
                <div className="absolute inset-0 pointer-events-none border-2 border-white/40 rounded-3xl" />
              </div>

              {/* Handwritten Script Overlay: "Better Together" */}
              <div className="absolute -bottom-2 sm:bottom-4 -left-4 sm:left-2 z-20 pointer-events-none transform -rotate-12 select-none">
                <span className="font-serif italic font-normal text-3xl sm:text-5xl text-[#FFD21F] drop-shadow-[0_4px_12px_rgba(255,210,31,0.6)] tracking-wide">
                  Better Together
                </span>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                RIGHT: INTERACTIVE STEP CARDS LIST
                ══════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-3 space-y-3 font-sans">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isActive = activeStep === idx;

                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center gap-3.5 group",
                      isActive
                        ? "bg-[#FFFFFF] border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.3)] translate-x-1"
                        : "bg-[#FFFFFF]/60 hover:bg-[#FFFFFF] border-black/5 hover:border-black/10"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isActive ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-sm" : "bg-[#EFEFEF] text-[#101010] group-hover:bg-[#E2E2E2]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-[#101010]">
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-[#626262] font-sans truncate">
                        {s.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
