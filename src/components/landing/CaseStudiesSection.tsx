import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, Lock, Zap, ArrowRight, DollarSign, Clock, FileCheck2 } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section className="py-24 border-t border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Collably Trust Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Collably protects both sides
          </h2>
          <p className="text-base text-slate-600">
            No more lost emails, late deliverables, or unpaid invoices. Milestone escrow guarantees fairness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Brands */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-card flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600">
                  <Lock className="w-6 h-6" />
                </div>
                <Badge variant="default" size="sm">Brand Protection</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Zero Upfront Release Risk
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Your campaign budget is safely locked in platform escrow. Creators only get paid after you inspect, review revisions, and formally sign off on the 4K deliverable.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Milestone release — pay only when requirements are met",
                  "Timecoded video review player with frame-accurate feedback",
                  "Guaranteed delivery turnaround with automatic escrow refund on default",
                  "Full commercial licensing and raw asset download rights",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">10% flat platform fee</span>
              <Link href="/app/brand/campaigns/create">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Create Campaign Brief
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: For Creators */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-card flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 text-brand-accent">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="glow" size="sm">Creator Guarantee</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Zero Invoicing & Instant Payouts
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Never work on unpaid promises or wait 90 days for client accounts payable. Funds are verified and locked before you begin production.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Verified escrow deposit confirmed before filming starts",
                  "Automated instant payout directly to your bank account",
                  "Protection against scope creep and infinite revision rounds",
                  "Fair dispute arbitration managed by Collably directors",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Creators keep 90% of earnings</span>
              <Link href="/creator/register">
                <Button variant="accent" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Apply as Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
