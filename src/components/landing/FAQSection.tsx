"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the milestone escrow mechanism work legally?",
      a: "Collably utilizes a compliant marketplace funds flow powered by Stripe Connect and verified payment rails. When a brand approves a collaboration or posts a campaign brief, funds are pre-authorized and locked in segregated escrow. Funds are legally and programmatically released to the creator's payout account only upon explicit deliverable approval or upon expiry of the 7-day review window.",
    },
    {
      q: "How does Collably handle tax compliance (W-9, W-8BEN, 1099-K, and TDS 194R)?",
      a: "For US creators earning over applicable thresholds, Collably collects digital W-9 forms and issues standard 1099-K reporting via Stripe Express. Non-US creators provide W-8BEN certifications. For Indian creator transactions via Razorpay Route, Section 194R TDS withholding statements and GST invoices are automatically generated.",
    },
    {
      q: "What is the exact fee structure on Collably?",
      a: "Collably charges a transparent 10% platform commission on funded deals. Creators keep 90% of their gross earnings with zero hidden withdrawal markups. There are no monthly subscription paywalls required to browse creators or post a brief.",
    },
    {
      q: "When and how fast do creators receive payouts?",
      a: "The moment a brand approves the deliverable in the workspace, escrow automatically unlocks. Payouts are transferred directly to the creator's connected bank account via Stripe Direct or instant local wire within 24 hours, completely eliminating 60 to 90-day invoice chasing.",
    },
    {
      q: "What happens if a creator misses a deadline or submits sub-par work?",
      a: "If a creator fails to submit drafts by the agreed milestone deadline or fails to follow explicit brief specifications, our dispute arbitration team steps in within 4 hours. If an uncured default occurs, 100% of the brand's escrow deposit is refunded.",
    },
    {
      q: "How are creators vetted before receiving the verified checkmark?",
      a: "Our talent curators audit applicant profiles across YouTube, Instagram, TikTok, and X. We inspect authentic 90-day engagement consistency, audience geography distribution, historical sponsor retention, and brand safety standards.",
    },
    {
      q: "Who owns intellectual property and paid advertising usage rights?",
      a: "Standard Collably contracts grant the brand worldwide organic digital distribution rights and paid whitelisting permissions for the agreed campaign window. Creators retain non-commercial portfolio and case study display rights. Custom licensing terms can be added directly to any brief.",
    },
    {
      q: "Can brands collaborate directly or request full-service managed agency support?",
      a: "Both models are supported. Startups and growth teams can use our self-serve campaign wizard, CRM shortlists, and timecoded video review tools directly. Enterprise brands can engage our dedicated Managed Talent Director tier for end-to-end roster curation and production QA.",
    },
    {
      q: "What deliverable video formats and resolutions are supported?",
      a: "Our native timecoded review player accepts 4K 60fps MP4/MOV uploads up to 5GB per asset. Supported formats include YouTube 60s integrations, YouTube Shorts, Instagram Reels, TikTok UGC video ads, and X threads.",
    },
    {
      q: "How do I sign in or manage multiple creator channels?",
      a: "Creators can connect their YouTube, Instagram, TikTok, X, and LinkedIn profiles from registration or inside their private Media Kit manager (/app/profile). Combined reach and average engagement are recalculated dynamically.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50 border-t border-slate-200" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Honest & Detailed Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about escrow legality, taxes, vetting, payouts, and IP terms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-brand-accent transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-brand-accent"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
