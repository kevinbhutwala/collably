"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Send,
  FileCheck2,
  Wallet,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

export function HowItWorks() {
  const [activeTrack, setActiveTrack] = useState<string>("brand");

  const brandSteps = [
    {
      step: "01",
      icon: Search,
      title: "Launch Brief or Discover Vetted Creators",
      description:
        "Define your campaign requirements with our 7-step wizard or use AI discovery to find creators with verified audience demographics that match your target customers.",
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Lock Budget in Secure Escrow",
      description:
        "Protect your marketing budget. Funds are held safely in Collably escrow and only released milestone by milestone once you review and approve the submitted content.",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "Review Deliverables & Revisions",
      description:
        "Manage 4K video drafts, scripts, and tracking links in one structured workspace. Request granular time-stamped revisions or approve with 1-click.",
    },
    {
      step: "04",
      icon: Wallet,
      title: "Track Live ROI & Performance",
      description:
        "Monitor live engagement, impressions, affiliate conversions, and cost-per-acquisition (CPA) on an executive analytics dashboard.",
    },
  ];

  const creatorSteps = [
    {
      step: "01",
      icon: Sparkles,
      title: "Build Your Verified Media Kit",
      description:
        "Sync your Instagram, YouTube, and TikTok analytics. Showcase verified engagement, past brand testimonials, and set your own custom rate cards.",
    },
    {
      step: "02",
      icon: Send,
      title: "Discover Campaigns & Pitch Directly",
      description:
        "Browse high-budget campaigns from premium tech, fashion, and wellness brands. Pitch creative angles with our AI proposal enhancer or receive direct invitations.",
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "Submit Content in Workspace",
      description:
        "Upload drafts, high-res videos, and captions into the collaboration portal. Keep all feedback, brand approvals, and deadlines in one central timeline.",
    },
    {
      step: "04",
      icon: Wallet,
      title: "Instant Guaranteed Payouts",
      description:
        "Zero chasing invoices. Because brands pre-fund escrow, your payout is automatically released via Stripe Direct or Wire as soon as the deliverable is approved.",
    },
  ];

  const steps = activeTrack === "brand" ? brandSteps : creatorSteps;

  return (
    <section className="py-24 border-t border-white/10 bg-[#0a070a] relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Structured Collaboration Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            How Collably powers seamless collaborations
          </h2>
          <p className="text-base text-slate-300 font-sans">
            Engineered to remove friction, protect payments, and eliminate back-and-forth email chaos.
          </p>

          {/* Persona Track Switcher */}
          <div className="flex justify-center pt-6">
            <Tabs
              variant="segments"
              activeTab={activeTrack}
              onChange={setActiveTrack}
              tabs={[
                { id: "brand", label: "For Brands & Marketers", icon: <Building2 className="w-4 h-4" /> },
                { id: "creator", label: "For Creators & Influencers", icon: <Users className="w-4 h-4" /> },
              ]}
            />
          </div>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card hover:border-pink-500/40 hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-[hsl(327,100%,55%)] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-extrabold text-white/20">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2.5 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span>Fully automated &amp; audited</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
