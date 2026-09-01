import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, Lock, Zap, ArrowRight } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#0a070a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>The Collably Trust Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            How Collably protects both sides
          </h2>
          <p className="text-base text-slate-300 font-sans">
            No more lost emails, late deliverables, or unpaid invoices. Milestone escrow guarantees fairness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Brands */}
          <div className="rounded-3xl bg-[#120c16] border border-white/10 p-8 shadow-card hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-purple-300">
                  <Lock className="w-6 h-6" />
                </div>
                <Badge variant="default" size="sm">Brand Protection</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Zero Upfront Release Risk
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                  Your campaign budget is safely locked in platform escrow. Creators only get paid after you inspect, review revisions, and formally sign off on the 4K deliverable.
                </p>
              </div>

              <div className="space-y-3 pt-2 font-sans">
                {[
                  "Milestone release — pay only when requirements are met",
                  "Timecoded video review player with frame-accurate feedback",
                  "Guaranteed delivery turnaround with automatic escrow refund on default",
                  "Full commercial licensing and raw asset download rights",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">10% flat platform fee</span>
              <Link href="/app/brand/campaigns/create">
                <Button variant="primary" size="sm" className="rounded-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Post a Brief
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: For Creators */}
          <div className="rounded-3xl bg-[#120c16] border border-white/10 p-8 shadow-card hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-[hsl(327,100%,55%)]">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="glow" size="sm">Creator Protection</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Guaranteed Automatic Payouts
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                  Never work for brands that fail to pay. Escrow is pre-funded and locked before you record a single frame. Funds disburse instantly upon approval.
                </p>
              </div>

              <div className="space-y-3 pt-2 font-sans">
                {[
                  "Pre-funded escrow ensures 100% payout certainty",
                  "Direct Stripe Connect bank transfers with zero hidden deductions",
                  "Built-in contract generation with clear revision limits",
                  "4-hour response dispute team for fair mediation",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Keep 90% of earnings</span>
              <Link href="/creator/register">
                <Button variant="primary" size="sm" className="rounded-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Join Roster
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
