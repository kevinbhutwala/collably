"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

export function BrandMarquee() {
  const integrations = [
    { name: "YouTube Data API", role: "Audience & Video Sync" },
    { name: "Instagram Graph API", role: "Reels & Reach Verification" },
    { name: "TikTok for Developers", role: "Engagement Analytics" },
    { name: "X (Twitter) API", role: "Thread Reach & Impressions" },
    { name: "Stripe Connect", role: "Milestone Escrow & Payouts" },
    { name: "Resend", role: "Transactional Review Alerts" },
  ];

  return (
    <section className="py-10 border-y border-slate-200 bg-slate-50/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Cpu className="w-4 h-4 text-brand-accent" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Platform Infrastructure & Verified Integrations
              </p>
              <p className="text-xs text-slate-500">
                Direct API telemetry and escrow processing powering creator workflows.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-xs"
              >
                <span className="font-bold">{item.name}</span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  / {item.role}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/for-brands"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:text-orange-700 transition-colors shrink-0"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
