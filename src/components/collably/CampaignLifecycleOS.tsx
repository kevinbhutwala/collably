"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  UserCheck,
  Send,
  CheckCircle2,
  Video,
  Play,
  Check,
  CreditCard,
  Flag,
  Sparkles,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function CampaignLifecycleOS() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      id: "brief",
      label: "BRIEF CREATED",
      title: "Brand locks deliverables & budget",
      detail: "$28,500 contract terms and NDA automatically generated and escrow-funded.",
      icon: FileText,
      badge: "Pre-Funded Escrow",
    },
    {
      id: "select",
      label: "CREATORS SELECTED",
      title: "AI matches 10 top creators",
      detail: "Creators matched by 94%+ compatibility across audience, rate, and delivery speed.",
      icon: UserCheck,
      badge: "10 Matched",
    },
    {
      id: "invites",
      label: "INVITES DISPATCHED",
      title: "1-Click automated invites sent",
      detail: "Direct notifications delivered with clear milestone schedules and commercial rate cards.",
      icon: Send,
      badge: "Dispatched",
    },
    {
      id: "accepted",
      label: "CREATORS ACCEPTED",
      title: "Contracts executed digitally",
      detail: "All 10 creators digitally sign terms; shooting schedules locked in workspace calendar.",
      icon: CheckCircle2,
      badge: "100% Signed",
    },
    {
      id: "submitted",
      label: "CONTENT SUBMITTED",
      title: "4K Master cuts uploaded",
      detail: "Uncompressed footage transcoded with automated audio, frame index, and FTC tags.",
      icon: Video,
      badge: "4K Transcoded",
    },
    {
      id: "review",
      label: "CONTENT REVIEW",
      title: "Frame-accurate timecode notes",
      detail: "Brand team adds timestamped annotations directly to specific frames (e.g. 00:42 CTA).",
      icon: Play,
      badge: "Timecoded QA",
    },
    {
      id: "approved",
      label: "APPROVED",
      title: "1-Click commercial sign-off",
      detail: "Full commercial usage rights transferred automatically upon brand approval.",
      icon: Check,
      badge: "Signed Off",
    },
    {
      id: "paid",
      label: "PAYMENT RELEASED",
      title: "Instant automated Stripe payout",
      detail: "90% Net disbursed directly to creator bank accounts in <24 hours. Zero invoice waiting.",
      icon: CreditCard,
      badge: "Disbursed <24h",
    },
    {
      id: "complete",
      label: "CAMPAIGN COMPLETE",
      title: "Verified ROI & telemetry logged",
      detail: "4.8× verified ROI, conversions, and view telemetry recorded to brand analytics ledger.",
      icon: Flag,
      badge: "4.8× ROI",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <section className="py-24 sm:py-28 bg-slate-50/70 border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>08 • The Collably Operating System</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["automated", "campaign", "lifecycle", "collably"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            The automated campaign lifecycle.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["brief", "creation", "instant", "payouts"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Every phase of creator collaboration structured into an automated, error-free workflow.
          </ScrollRevealText>
        </div>

        {/* Operating System UI Stage */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-card p-6 sm:p-8 space-y-8">
          {/* Top Progress Track */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center justify-between min-w-[700px] gap-2">
              {stages.map((st, i) => {
                const Icon = st.icon;
                const isPassed = i <= activeStep;
                const isCurrent = i === activeStep;

                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                      isCurrent
                        ? "bg-orange-50 text-brand-accent scale-105"
                        : isPassed
                        ? "text-slate-900 hover:bg-slate-50"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors ${
                        isCurrent
                          ? "bg-gradient-to-tr from-brand-accent to-rose-500 text-white border-transparent shadow-md"
                          : isPassed
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold whitespace-nowrap">
                      {st.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active State Detailed Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-orange-400 font-bold">
                  <span>STAGE 0{activeStep + 1} OF 09</span>
                  <span>•</span>
                  <span>{stages[activeStep].label}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white">
                  {stages[activeStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {stages[activeStep].detail}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <span className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-emerald-400 shadow-inner">
                  {stages[activeStep].badge}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
