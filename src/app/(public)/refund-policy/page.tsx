"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escrow &amp; Dispute Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Escrow, Cancellation &amp; Refund Policy
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Clear, transparent protection for both brands and creators.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-8 font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">1. How Collably Escrow Protects Payments</h2>
            <p>
              When a brand funds a collaboration or accepts a creator brief, funds are placed into segregated platform escrow. Funds are never released to the creator upfront without verified deliverable submission and brand approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">2. Full Refund Conditions for Brands</h2>
            <p>A brand is entitled to a <strong className="text-white">100% full refund of the escrow deposit</strong> under any of the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong className="text-white">Creator Cancellation / Default:</strong> The creator fails to submit the required milestone draft by the agreed delivery deadline without mutual written extension.</li>
              <li><strong className="text-white">Material Specification Breach:</strong> The submitted deliverable fails to follow explicit, agreed brief requirements (e.g. wrong product shown, missing required discount code, unedited raw audio).</li>
              <li><strong className="text-white">Brand Safety Infraction:</strong> The creator publishes content containing hate speech, illegal claims, or undisclosed non-consensual alterations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">3. Creator Protection Against Non-Payment</h2>
            <p>
              Creators are protected against arbitrary cancellations once production has commenced:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong className="text-white">7-Day Review SLA:</strong> Brands have 7 calendar days to review submitted deliverables. If no feedback or dispute is logged within 7 days, escrow is automatically approved and released.</li>
              <li><strong className="text-white">Scope Creep Shield:</strong> Brands cannot demand net-new deliverables or major concept pivots outside the original brief without an agreed budget addendum.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">4. Dispute Arbitration Workflow (&lt; 4 Hour Response)</h2>
            <p>
              Either party may open a dispute ticket directly inside the Collaboration Workspace. Collably talent directors review the chat log, timecoded video timeline, and original brief within 4 hours to issue a binding determination (release, revision mandate, or full escrow refund).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">5. Refund Processing Time</h2>
            <p>
              Approved refunds are credited back to the brand&apos;s original payment method (Stripe / Razorpay) within <strong className="text-white">3 to 5 business days</strong> depending on your issuing bank.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
