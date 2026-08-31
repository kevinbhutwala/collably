"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the milestone escrow protection work?",
      a: "When a brand confirms a creator collaboration or launches a campaign brief, the agreed budget is deposited into Collably Escrow. The funds remain securely locked and are only released to the creator once the brand reviews, provides timecoded feedback, and formally approves the completed deliverable in the workspace.",
    },
    {
      q: "How are creators vetted before being approved?",
      a: "Our talent team reviews every creator application for authentic audience demographics, consistent engagement rates across YouTube, Instagram, and TikTok, past brand reliability, and brand safety standards. Only creators meeting our quality benchmarks receive verified discovery status.",
    },
    {
      q: "What is the fee structure on Collably?",
      a: "Collably charges a transparent 10% platform commission on funded deals. Creators keep 90% of their earnings with zero hidden withdrawal markups. There are no monthly subscription fees required to browse creators or publish a campaign brief.",
    },
    {
      q: "When and how do creators receive payouts?",
      a: "As soon as a brand approves the final video deliverable, funds in escrow are immediately unlocked. Creators receive automated direct payouts via Stripe Connect or direct bank transfer, completely eliminating traditional 60 to 90-day invoice delays.",
    },
    {
      q: "What happens if there is a dispute or missed deadline?",
      a: "If a creator misses an agreed production milestone or submits content that materially breaches the accepted brief specifications, our dispute arbitration team steps in within 4 hours. If an unresolvable default occurs, the brand's escrow deposit is refunded in full.",
    },
    {
      q: "Who owns the intellectual property and commercial usage rights?",
      a: "Standard contracts on Collably grant the brand full organic usage rights and digital advertising permissions for the agreed campaign window, while creators retain organic portfolio display rights. Custom licensing terms can also be specified directly within each campaign brief.",
    },
    {
      q: "What social platforms and deliverable formats are supported?",
      a: "Collably natively supports YouTube (60s integrations, dedicated reviews, Shorts), Instagram (Reels, Story sets, carousels), TikTok (organic UGC & Spark ads), and X / Twitter (deep-dive threads and sponsored posts).",
    },
    {
      q: "Can brands collaborate directly or request managed agency support?",
      a: "Both! Brands can run self-serve collaborations using our automated campaign wizard and workspace, or partner with our dedicated talent strategy team for managed creator roster curation and end-to-end campaign production.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Clear, honest answers about escrow security, payouts, creator vetting, and platform terms.
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
