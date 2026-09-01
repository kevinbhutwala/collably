"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does milestone payment protection work?",
      a: "Brands deposit campaign funds into milestone custody via Stripe Connect before filming begins. Payouts are automatically released to the creator within 24 hours of deliverable approval.",
    },
    {
      q: "What are the platform fees?",
      a: "Collably charges a flat 10% platform fee on completed collaborations. There are zero monthly subscription paywalls or listing fees. Creators keep 90% of their gross contract earnings.",
    },
    {
      q: "How fast are creator payouts processed?",
      a: "Instantaneous. When the brand approves a video deliverable in the review player, payouts disburse directly to the creator's connected bank account in <24 hours.",
    },
    {
      q: "How are revisions and brief guidelines handled?",
      a: "Brands drop frame-accurate timecoded annotations directly on 4K video drafts. Creators receive timestamped revision notes with structured turn-around windows.",
    },
    {
      q: "How is commercial licensing and digital usage transferred?",
      a: "Standardized commercial rights (organic social, paid digital ad whitelisting, or buyout) transfer automatically to the brand upon milestone approval and payment release.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden text-white select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)]">
            <HelpCircle className="w-3.5 h-3.5 text-gold" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Frequently asked questions.
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#120c16] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-slate-300">
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-pink-400" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-3 font-sans">
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
