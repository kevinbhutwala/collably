"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

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
    <section className="py-20 sm:py-28 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden text-[#101010] select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-semibold text-[#101010] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Questions &amp; Answers</span>
          </div>
          <h2 className="section-headline text-center">
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
                className="rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-[#F4F4F0] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#101010] font-sans">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0 text-[#101010]">
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-[#101010]" /> : <Plus className="w-3.5 h-3.5 text-[#626262]" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#626262] leading-relaxed border-t border-[#E7E7E4] pt-3 font-sans">
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
