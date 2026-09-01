"use client";

import React, { useState } from "react";
import { Lock, Video, CheckCircle2, Wallet, ShieldCheck, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function VisualEscrowMotion() {
  const [currentStep, setCurrentStep] = useState(2);
  const [released, setReleased] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Funds Secured",
      badge: "100% Pre-Funded",
      icon: Lock,
      desc: "Campaign budget pre-funded in segregated custody via Stripe Connect.",
      amount: "₹24,500 Secured",
    },
    {
      num: "02",
      title: "Creator Films 4K",
      badge: "In Production",
      icon: Video,
      desc: "Creator shoots and submits frame-accurate 4K video draft.",
      amount: "Cut v2 Uploaded",
    },
    {
      num: "03",
      title: "1-Click Sign-Off",
      badge: "Brand Approval",
      icon: CheckCircle2,
      desc: "Brand inspects timecoded annotations and approves the deliverable.",
      amount: "Ready for Release",
    },
    {
      num: "04",
      title: "Direct Payout",
      badge: "<24h Transfer",
      icon: Wallet,
      desc: "Automated disbursement direct to creator bank account in <24h.",
      amount: "₹22,050 Net Paid",
    },
  ];

  const handleRelease = () => {
    setReleased(true);
    setCurrentStep(3);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#087F5B", "#075E45", "#4EC296", "#EAF8F2", "#101310"],
      });
    } catch {}
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Milestone Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            Guaranteed payouts. Zero friction.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
            How protected milestone payments flow seamlessly from brief deposit to creator disbursement.
          </p>
        </div>

        {/* 4 Visual Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = currentStep === idx;
            const isCompleted = currentStep > idx || released;

            return (
              <div
                key={s.num}
                onClick={() => setCurrentStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden ${
                  isCurrent
                    ? "bg-[#FFFFFF] border-[#087F5B] shadow-fintech scale-[1.01]"
                    : isCompleted
                    ? "bg-[#FCFCFA] border-[#C3EBDA] shadow-xs"
                    : "bg-[#FFFFFF] border-[#E2E6E1] hover:bg-[#F6F7F3]"
                }`}
              >
                {/* Top Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isCurrent || isCompleted ? "text-[#087F5B]" : "text-[#8A908B]"}`}>
                    STAGE {s.num}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${
                    isCompleted || isCurrent
                      ? "bg-[#EAF8F2] text-[#087F5B] border-[#C3EBDA]"
                      : "bg-[#F1F2EE] text-[#626862] border-[#E2E6E1]"
                  }`}>
                    {s.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#101310] font-sans">{s.title}</h4>
                    <p className="text-xs text-[#626862] font-sans mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Amount Pill */}
                <div className="pt-2 border-t border-[#E2E6E1] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8A908B] text-[10px]">TELEMETRY:</span>
                  <span className="font-bold text-[#101310]">{s.amount}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Action Trigger */}
        <div className="max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono text-[#8A908B] block font-semibold">CAMPAIGN MILESTONE DEMO</span>
            <span className="text-sm font-bold text-[#101310] font-sans">
              {released ? "✓ ₹22,050 Disbursed to Creator (Stripe Connect)" : "Test instant milestone payment release:"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRelease}
            className="px-5 py-2.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] text-white font-semibold text-xs font-sans shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            {released ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Released</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate 1-Click Release</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
