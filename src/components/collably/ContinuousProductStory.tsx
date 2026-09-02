"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import {
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Video,
  Play,
  ShieldCheck,
  Zap,
  Users,
  Check,
  FileCheck2,
  DollarSign,
  BarChart3,
  Layers,
  ChevronRight,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNum: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  mockupType: "discover" | "match" | "collaborate" | "review" | "approve" | "pay" | "grow";
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "step-discover",
    stepNum: "01",
    title: "Discover Audited Talent",
    category: "DISCOVERY ENGINE",
    tagline: "Filter creators by verified reach, engagement rate, and 4K production capabilities.",
    description:
      "Skip unvetted influencer DM spam. Search our live creator catalog with real-time engagement telemetry, audience geography breakdown, and fixed rate cards.",
    keyBenefits: [
      "Audited engagement rates (no bot traffic or vanity metrics)",
      "Tier-1 geography filtering (US, UK, EU, Global)",
      "Pre-negotiated rate cards with guaranteed turnaround SLA",
    ],
    mockupType: "discover",
  },
  {
    id: "step-match",
    stepNum: "02",
    title: "AI Audience Matchmaking",
    category: "AFFINITY SCORING",
    tagline: "Calculate algorithmic affinity between brand brief and creator viewership.",
    description:
      "Our matching engine analyzes past brand sponsors, audience comment sentiment, and category relevance to rank high-converting creator fits instantly.",
    keyBenefits: [
      "Deep semantic analysis of creator content portfolio",
      "Audience demographic overlap calculation",
      "Category relevance and brand fit scoring",
    ],
    mockupType: "match",
  },
  {
    id: "step-collaborate",
    stepNum: "03",
    title: "Funded Milestone Escrow",
    category: "SECURE CONTRACTING",
    tagline: "Pre-fund campaign budget into Stripe Connect milestone custody.",
    description:
      "Both parties sign automated digital contracts. The brand budget is locked in platform custody before the creator records a single frame, eliminating non-payment anxiety.",
    keyBenefits: [
      "100% pre-funded budget guarantees creator compensation",
      "Clear milestone breakdown (Script → Rough Cut → Final 4K)",
      "Zero invoice chasing or 90-day Net-terms delays",
    ],
    mockupType: "collaborate",
  },
  {
    id: "step-review",
    stepNum: "04",
    title: "4K Frame-Accurate Review",
    category: "QA STUDIO",
    tagline: "Leave timestamped feedback on ProRes cuts with precision playhead scrubbing.",
    description:
      "No more messy email chains with conflicting feedback. Review 4K video drafts directly inside the timecoded player and mark required revisions with exact frame stamps.",
    keyBenefits: [
      "Direct timecode annotations (e.g. 00:14 'Raise audio gain')",
      "Side-by-side revision comparisons",
      "Built-in revision caps to prevent scope creep",
    ],
    mockupType: "review",
  },
  {
    id: "step-approve",
    stepNum: "05",
    title: "1-Click Commercial Sign-off",
    category: "IP CLEARANCE",
    tagline: "Approve deliverables with instant commercial rights transfer.",
    description:
      "Once the deliverable meets brand guidelines, click Approve. Perpetual commercial licensing and raw 4K ProRes master assets are automatically unlocked for download.",
    keyBenefits: [
      "Perpetual commercial and whitelisting usage rights",
      "High-speed uncompressed ProRes and clean audio stem downloads",
      "Cryptographically signed delivery certificate",
    ],
    mockupType: "approve",
  },
  {
    id: "step-pay",
    stepNum: "06",
    title: "Automated Instant Payout",
    category: "FINANCIAL LEDGER",
    tagline: "Milestone funds release immediately into creator Stripe Connect bank accounts.",
    description:
      "Upon sign-off, escrow funds disburse automatically. Creators receive their 90% net earnings with transparent fee breakdown and automated tax receipts.",
    keyBenefits: [
      "Direct bank deposit via Stripe Connect Express upon approval",
      "Transparent 10% platform fee with zero hidden deductions",
      "Automated 1099/tax receipt generation",
    ],
    mockupType: "pay",
  },
  {
    id: "step-grow",
    stepNum: "07",
    title: "Attribution & Scaling",
    category: "GROWTH TELEMETRY",
    tagline: "Track conversion attribution and re-book top performers with 1 click.",
    description:
      "Monitor verified click-through rates, CPMs, and team conversions across your creator drops. Build private talent shortlists and scale recurring creator retainers.",
    keyBenefits: [
      "Real-time tracking pixel and discount link attribution",
      "Campaign performance dashboard with creator comparison",
      "1-Click creator re-booking and automated monthly retainers",
    ],
    mockupType: "grow",
  },
];


export function ContinuousProductStory() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIdx];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFC] text-[#0A0A0E] select-none border-t border-black/8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
            <span>THE COLLABLY END-TO-END OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] tracking-tight font-display">
            How Top Brands &amp; Creators{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F]">
              Collaborate.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#5A5A68] leading-relaxed">
            One continuous, friction-free pipeline replacing chaotic spreadsheets, unpaid invoices, and messy email revisions.
          </p>
        </div>

        {/* 7-Step Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none justify-start lg:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
          {WORKFLOW_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIdx(idx)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-2 border ${
                activeStepIdx === idx
                  ? "bg-[#0A0A0E] text-white border-[#0A0A0E] shadow-xs"
                  : "bg-white border-black/8 text-[#6A6A78] hover:text-[#0A0A0E] hover:border-black/20"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] ${
                  activeStepIdx === idx ? "bg-[#FFD21F] text-[#0A0A0E]" : "bg-[#F4F4F8] text-[#6A6A78]"
                }`}
              >
                {step.stepNum}
              </span>
              <span>{step.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Stage: Left Editorial Narrative + Right Interactive Product Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[11px] font-mono font-extrabold uppercase">
                <span>{activeStep.stepNum} • {activeStep.category}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0E] font-display tracking-tight">
                {activeStep.title}
              </h3>
              <p className="text-sm font-semibold text-[#8A7000] font-sans">
                {activeStep.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed font-sans">
                {activeStep.description}
              </p>
            </div>

            {/* Key Benefits Checklist */}
            <div className="space-y-2.5 pt-2">
              {activeStep.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#2A2A38]">
                  <div className="w-4 h-4 rounded-full bg-[#FFD21F]/30 text-[#0A0A0E] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#0A0A0E]" />
                  </div>
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Step Controller Action */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveStepIdx((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
                className="px-6 py-3 rounded-full bg-[#0A0A0E] hover:bg-[#20202B] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs hover-lift"
              >
                <span>
                  {activeStepIdx === WORKFLOW_STEPS.length - 1 ? "Replay OS Flow" : "Next Step"}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href="/app/brand/campaigns/create"
                className="text-xs font-bold text-[#0A0A0E] hover:text-[#8A7000] transition-colors font-mono"
              >
                Try this in Workspace →
              </Link>
            </div>
          </div>

          {/* Right Stage: Interactive Realistic Working Product Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border-2 border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-4 sm:p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-between">
              {/* Top Window Chrome */}
              <div className="flex items-center justify-between pb-4 border-b border-black/6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[10px] sm:text-[11px] font-mono text-[#7A7A8A] truncate max-w-[140px] sm:max-w-none">
                    Collably Workspace
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] font-mono text-[9px] sm:text-[10px] font-bold">
                  PRODUCT PREVIEW
                </span>
              </div>


              {/* Dynamic Product UI Rendering based on Active Step */}
              <div className="py-5 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* Step 1: Discover Mockup */}
                  {activeStep.mockupType === "discover" && (
                    <motion.div
                      key="discover-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 p-3 rounded-2xl bg-[#F8F8FC] border border-black/6">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#7A7A8A] shrink-0" />
                          <span className="text-xs font-medium text-[#0A0A0E] truncate">
                            &ldquo;AI tools, RED 8K, Tier-1 US&rdquo;
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0 self-start xs:self-center">
                          Matched Creators
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-display">Elena Rostova</span>
                            <span className="text-[10px] font-mono font-extrabold text-[#0A0A0E] bg-[#FFD21F] px-1.5 py-0.5 rounded">
                              Elite
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5A5A68]">485K Followers • AI & Tech</p>
                          <div className="w-full h-1.5 rounded-full bg-emerald-500" />
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-display">Marcus Vance</span>
                            <span className="text-[10px] font-mono font-extrabold text-[#0A0A0E] bg-black/10 px-1.5 py-0.5 rounded">
                              Verified
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5A5A68]">310K Followers • Design</p>
                          <div className="w-full h-1.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Match Mockup */}
                  {activeStep.mockupType === "match" && (

                    <motion.div
                      key="match-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 rounded-2xl bg-[#FFFDF5] border-2 border-[#FFD21F] space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#FFD21F] flex items-center justify-center text-xs font-bold">
                            AI
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#0A0A0E]">AI Match Analysis</h4>
                            <p className="text-[10px] text-[#7A7A8A]">Your Campaign × Elena Rostova</p>
                          </div>
                        </div>
                        <span className="text-sm font-black font-display text-[#0A0A0E]">Strong Match</span>
                      </div>

                      <div className="space-y-2 font-mono text-[11px]">
                        <div className="flex justify-between text-[#5A5A68]">
                          <span>Audience Category Overlap:</span>
                          <strong className="text-[#0A0A0E]">Developer & Tech Focused</strong>
                        </div>
                        <div className="flex justify-between text-[#5A5A68]">
                          <span>Engagement Quality:</span>
                          <strong className="text-emerald-600">Above Category Average</strong>
                        </div>
                        <div className="flex justify-between text-[#5A5A68]">
                          <span>Commercial Rights:</span>
                          <strong className="text-[#0A0A0E]">Full Perpetual Included</strong>
                        </div>
                      </div>
                    </motion.div>
                  )}


                  {/* Step 3: Collaborate & Escrow Mockup */}
                  {activeStep.mockupType === "collaborate" && (
                    <motion.div
                      key="collab-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-[#7A7A8A] font-bold block">
                            PRE-FUNDED ESCROW VAULT
                          </span>
                          <span className="text-2xl font-black font-display text-[#0A0A0E]">$3,500.00</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> SECURED
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-black/8 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span>Milestone 1: 4K Master Video Integration</span>
                          <span className="text-emerald-600">Active Stage</span>
                        </div>
                        <p className="text-[11px] text-[#6A6A78]">Funds held safely in Stripe custody until QA approval.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Video Review Mockup */}
                  {activeStep.mockupType === "review" && (
                    <motion.div
                      key="review-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-black/10">
                        <SafeImage
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"
                          alt="Video cut"
                          width={600}
                          height={340}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute bottom-2 left-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md flex items-center justify-between text-white text-[11px] font-mono">
                          <div className="flex items-center gap-2">
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>00:14 / 01:00</span>
                          </div>
                          <span className="text-[#FFD21F] font-bold">Annotation at 00:14</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/40 text-xs flex items-center justify-between">
                        <span className="text-[#3A3A48]">&ldquo;Move brand title 20px higher in frame.&rdquo;</span>
                        <span className="font-mono text-[10px] text-amber-700 font-bold">Revision Logged</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Approve Mockup */}
                  {activeStep.mockupType === "approve" && (
                    <motion.div
                      key="approve-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-500/40 text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold font-display text-emerald-950">Deliverable Approved</h4>
                        <p className="text-xs text-emerald-800">Commercial IP License Transferred to Brand</p>
                      </div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white border border-emerald-300 text-[10px] font-mono text-emerald-900 font-bold">
                        Approval Certificate Issued
                      </span>
                    </motion.div>
                  )}

                  {/* Step 6: Pay Mockup */}
                  {activeStep.mockupType === "pay" && (
                    <motion.div
                      key="pay-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/50 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#7A7A8A]">Gross Escrow Milestone</span>
                          <span className="font-bold text-[#0A0A0E]">$3,500.00</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#7A7A8A]">Platform QA &amp; Escrow Fee (10%)</span>
                          <span className="text-rose-600 font-bold">-$350.00</span>
                        </div>
                        <div className="pt-2 border-t border-black/8 flex items-center justify-between font-mono">
                          <strong className="text-[#0A0A0E] font-display text-sm">Net Creator Payout</strong>
                          <strong className="text-emerald-600 font-display text-lg">$3,150.00</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                        <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Disbursed directly to Stripe Connect bank account upon sign-off.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 7: Grow Mockup */}
                  {activeStep.mockupType === "grow" && (
                    <motion.div
                      key="grow-mock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-3 gap-2 text-center font-mono">
                        <div className="p-3 rounded-xl bg-[#F8F8FC] border border-black/6">
                          <span className="text-[9px] uppercase text-[#7A7A8A] block">Reach</span>
                          <span className="text-sm font-black text-[#0A0A0E]">Growing</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F8F8FC] border border-black/6">
                          <span className="text-[9px] uppercase text-[#7A7A8A] block">Conversions</span>
                          <span className="text-sm font-black text-emerald-600">Tracked</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/40">
                          <span className="text-[9px] uppercase text-[#7A7A8A] block">Campaign ROI</span>
                          <span className="text-sm font-black text-[#0A0A0E]">Measured</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-black/8 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0A0A0E]">Re-book for Next Quarter</span>
                        <button className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold text-[11px]">
                          1-Click Rehire
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom Telemetry Proof Strip */}
              <div className="pt-4 border-t border-black/6 flex items-center justify-between text-xs font-mono text-[#6A6A78]">
                <span>Automated SLA Enforced</span>
                <span className="text-[#0A0A0E] font-bold">100% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
