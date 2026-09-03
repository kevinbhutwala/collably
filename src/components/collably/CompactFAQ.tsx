"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function CompactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does 100% escrow protection work?",
      a: "Milestone funds are deposited upfront into segregated custody via Stripe Connect, and released to the creator within 24 hours only after the brand approves the final video deliverable.",
    },
    {
      q: "What is Collably's platform fee?",
      a: "Collably charges a flat 10% platform fee on completed milestones. There are zero listing fees or hidden subscription requirements to pitch.",
    },
    {
      q: "How are video revisions handled?",
      a: "Marketers use our 4K frame-accurate video review player to leave timestamped comments directly on video cuts for fast, clear turnaround.",
    },
    {
      q: "How quickly do creators get paid?",
      a: "Payouts are automated and arrive directly in the creator's connected bank account in less than 24 hours (or 2 hours on Pro).",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none relative overflow-hidden border-t border-black/5 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-[0.16em] text-[#6A6A78] dark:text-[#8E8EA4] uppercase block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0E] dark:text-white font-display">
            Frequently asked questions.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 select-none hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white font-sans">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F4F4F8] dark:bg-[#1C1C28] flex items-center justify-center shrink-0 text-[#0A0A0E] dark:text-[#FFD21F]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
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
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA8] leading-relaxed font-sans border-t border-black/5 dark:border-white/10">
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
