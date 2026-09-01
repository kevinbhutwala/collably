"use client";

import React from "react";
import { Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export function BrandMarquee() {
  const integrations = [
    { name: "YouTube Data API", role: "Audience & Video Sync" },
    { name: "Instagram Graph API", role: "Reels & Reach Verification" },
    { name: "TikTok for Developers", role: "Engagement Analytics" },
    { name: "X (Twitter) API", role: "Thread Reach & Impressions" },
    { name: "Stripe Connect", role: "Milestone Custody & Payouts" },
    { name: "Resend", role: "Transactional Review Alerts" },
  ];

  return (
    <section className="py-10 border-y border-[#E2E6E1] bg-[#F6F7F3] overflow-hidden text-[#101310]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Label */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] text-[#087F5B] flex items-center justify-center shrink-0 shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#101310] font-mono">
                Platform Infrastructure &amp; Verified APIs
              </p>
              <p className="text-xs text-[#626862] font-sans">
                Direct telemetry and payment rails powering creator collaboration.
              </p>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E6E1] text-xs font-medium text-[#626862] shadow-xs select-none hover:border-[#087F5B] transition-colors"
              >
                <span className="font-bold text-[#101310] font-sans">{item.name}</span>
                <span className="text-[10px] text-[#087F5B] font-mono hidden sm:inline">
                  / {item.role}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/for-brands"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#087F5B] hover:text-[#075E45] transition-colors shrink-0 font-mono"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
