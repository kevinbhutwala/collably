"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does milestone payment protection work?",
      a: "When a campaign brief is confirmed, 100% of agreed milestone funds are pre-funded into segregated custody via Stripe Connect. Funds remain locked until the brand reviews and approves the video deliverable. Once approved, payout disburses to the creator in <24 hours.",
    },
    {
      q: "What are the platform fees and creator take-rates?",
      a: "Collably charges a flat 10% platform fee on completed collaborations. There are zero monthly subscription fees or listing paywalls. Creators keep 90% of their gross earnings.",
    },
    {
      q: "How fast are creator payouts disbursed upon approval?",
      a: "Instantaneous. As soon as the brand approves the submitted deliverable in the review player, the automated payout pipeline triggers direct transfer to the creator's connected bank account.",
    },
    {
      q: "How are video revisions and feedback handled?",
      a: "Brands use the frame-accurate 4K review player to drop timestamped annotations directly onto video cuts. Creators receive clear, structured change requests with turnaround windows.",
    },
    {
      q: "How are commercial licensing and digital usage rights transferred?",
      a: "Standardized commercial usage terms (organic social, paid digital ad whitelisting, or buyout) transfer automatically to the brand upon milestone approval and payment release.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07070B] border-t border-white/10 relative overflow-hidden text-white select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
            <span>Questions &amp; Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-center">
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
                className="rounded-2xl bg-[#0E0C15]/90 border border-white/10 overflow-hidden shadow-xl transition-all backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-sans">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                      <div className="p-5 pt-0 text-xs sm:text-sm text-white/60 leading-relaxed font-sans border-t border-white/5">
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
