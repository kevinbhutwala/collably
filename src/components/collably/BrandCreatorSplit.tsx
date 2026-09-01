"use client";

import React from "react";
import Link from "next/link";
import { Building2, Video, ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";

export function BrandCreatorSplit() {
  return (
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Workspaces</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            Built for both sides of the deal.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
            Whether you&apos;re deploying a targeted growth campaign or earning as an independent creator.
          </p>
        </div>

        {/* 2 Visual Split Cards (Section 20 & 21) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* FOR BRANDS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] hover:border-[#087F5B] shadow-fintech flex flex-col justify-between space-y-8 relative overflow-hidden group transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#F1F2EE] text-[#101310] font-mono text-xs font-bold border border-[#E2E6E1]">
                  FOR BRANDS &amp; AGENCIES
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101310] font-display">
                  Build campaigns without the chaos.
                </h3>
                <p className="text-sm text-[#626862] font-sans leading-relaxed">
                  Discover vetted creators, protect campaign budgets with pre-funded custody, and review 4K video drafts with frame-accurate timecodes.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#626862]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                  <span className="text-[#101310] font-semibold">100% Pre-Funded Milestone Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#087F5B]" />
                  <span className="text-[#101310] font-semibold">Natural Language Discovery &amp; Roster Management</span>
                </div>
              </div>
            </div>

            <Link
              href="/for-brands"
              className="w-full py-3.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold text-sm text-center shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Explore Collably for Brands</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FOR CREATORS */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] hover:border-[#087F5B] shadow-fintech flex flex-col justify-between space-y-8 relative overflow-hidden group transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                  <Video className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#EAF8F2] text-[#087F5B] font-mono text-xs font-bold border border-[#C3EBDA]">
                  FOR CREATORS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101310] font-display">
                  Get paid for creating great work.
                </h3>
                <p className="text-sm text-[#626862] font-sans leading-relaxed">
                  Never chase an invoice again. Every collaboration is pre-funded before filming starts, with 90% net earnings disbursed within 24 hours of approval.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#626862]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                  <span className="text-[#101310] font-semibold">Guaranteed Payout on Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#087F5B]" />
                  <span className="text-[#101310] font-semibold">Keep 90% Flat Net Earnings (10% Platform Fee)</span>
                </div>
              </div>
            </div>

            <Link
              href="/creator/register"
              className="w-full py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F4F6F3] border border-[#E2E6E1] text-[#101310] font-semibold text-sm text-center shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Join as a Founding Creator</span>
              <ArrowRight className="w-4 h-4 text-[#087F5B]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
