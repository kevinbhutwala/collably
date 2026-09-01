"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does milestone payment protection work on Collably?",
      a: "When a brand approves a creator proposal or campaign brief, 100% of the agreed milestone funds are deposited into segregated holding via Stripe Connect or Razorpay. The funds remain locked until the brand reviews and approves the submitted deliverable in the Collably Video Player. Once approved, payout is automatically disbursed to the creator.",
    },
    {
      q: "What are the platform fees and creator take-rates?",
      a: "Collably charges a flat 10% platform fee on completed campaigns. There are zero monthly subscription paywalls or hidden listing fees. Creators keep 90% of their gross contract earnings, with automated fee reconciliation displayed transparently before contract signing.",
    },
    {
      q: "How does Collably handle tax compliance (W-9, W-8BEN, 1099-K, TDS 194R)?",
      a: "For US creators, Collably collects W-9 forms and issues automated 1099-K filings at year-end. For international creators, W-8BEN forms are verified for cross-border tax treaty compliance. For Indian campaigns, TDS Section 194R (10% on creator benefits/monetary payouts) is calculated and reported automatically.",
    },
    {
      q: "How fast are creator payouts processed upon deliverable approval?",
      a: "Instantaneous. As soon as the brand clicks 'Approve Deliverable', our payment state machine triggers automated payout disbursement via Stripe Direct or instant bank ACH/NEFT. Funds typically land in the creator’s bank account within 24 hours.",
    },
    {
      q: "What happens if a deliverable does not meet the brief guidelines?",
      a: "Brands use the 4K Video Review Player to leave frame-accurate timecoded annotations. Creators receive structured change requests with a 48-hour turn-around window. If a mutual impasse occurs, Collably’s 24/7 arbitration team reviews the recorded brief scope with a guaranteed < 4-hour SLA.",
    },
    {
      q: "How are commercial IP licensing and digital ad usage rights handled?",
      a: "Every brief on Collably specifies standardized commercial usage terms (e.g., 30-day organic social, 90-day paid digital ad whitelisting, or full buyout). Commercial rights transfer automatically to the brand upon milestone approval and payment release.",
    },
    {
      q: "What video formats and resolutions does the review player support?",
      a: "The Collably Video Player supports up to 4K UHD at 60fps (MP4, MOV, ProRes). Uploaded files are automatically transcoded for smooth, frame-accurate scrubbing across desktop and mobile devices.",
    },
    {
      q: "Can talent agencies manage multiple creators under one agency account?",
      a: "Yes. Collably provides full Agency Roster Management. Talent managers can onboard multiple creator profiles, manage rate cards, review inbound brand briefs, negotiate contracts, and route earnings into centralized agency banking.",
    },
  ];

  return (
    <section className="py-28 bg-transparent border-b border-white/10 relative overflow-hidden text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)]">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            <span>Operational &amp; Legal FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Frequently asked questions.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Everything you need to know about milestone protection, tax compliance, and automated payouts.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#120c16] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-base font-bold text-white tracking-tight font-display">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-slate-300 shadow-xs">
                    {isOpen ? <Minus className="w-4 h-4 text-pink-400" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
