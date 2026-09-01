"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#111111] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Escrow &amp; Dispute Terms</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-display">
            Escrow, Cancellation &amp; Refund Policy
          </h1>
          <p className="text-sm text-[#6B6B6B] font-mono">
            Clear, transparent protection for both brands and creators.
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E7E7E4] pt-8 font-sans font-medium">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">1. How Collably Escrow Protects Payments</h2>
            <p>
              When a brand funds a collaboration or accepts a creator brief, funds are placed into segregated platform escrow. Funds are never released to the creator upfront without verified deliverable submission and brand approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">2. Full Refund Conditions for Brands</h2>
            <p>A brand is entitled to a <strong className="text-[#111111]">100% full refund of the escrow deposit</strong> under any of the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">Creator Cancellation / Default:</strong> The creator fails to submit the required milestone draft by the agreed delivery deadline without mutual written extension.</li>
              <li><strong className="text-[#111111]">Material Specification Breach:</strong> The submitted deliverable fails to follow explicit, agreed brief requirements (e.g. wrong product shown, missing required discount code, unedited raw audio).</li>
              <li><strong className="text-[#111111]">Brand Safety Infraction:</strong> The creator publishes content containing hate speech, illegal claims, or undisclosed non-consensual alterations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">3. Creator Protection Against Non-Payment</h2>
            <p>
              Creators are protected against arbitrary cancellations once production has commenced:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">7-Day Review SLA:</strong> Brands have 7 calendar days to review submitted deliverables. If no feedback or dispute is logged within 7 days, escrow is automatically approved and released.</li>
              <li><strong className="text-[#111111]">Scope Creep Shield:</strong> Brands cannot demand net-new deliverables or major concept pivots outside the original brief without an agreed budget addendum.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">4. Dispute Arbitration Workflow (&lt; 4 Hour Response)</h2>
            <p>
              Either party may open a dispute ticket directly inside the Collaboration Workspace. Collably talent directors review the chat log, timecoded video timeline, and original brief within 4 hours to issue a binding determination (release, revision mandate, or full escrow refund).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">5. Refund Processing Time</h2>
            <p>
              Approved refunds are credited back to the brand&apos;s original payment method (Stripe / Razorpay) within <strong className="text-[#111111]">3 to 5 business days</strong> depending on your issuing bank.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
