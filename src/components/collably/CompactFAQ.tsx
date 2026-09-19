"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function CompactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does payment protection work?",
      a: "When a brand starts a project, they set aside the fee safely with AbeyCollab. The creator knows the money is waiting, and the brand only releases it once they review and approve the final work.",
    },
    {
      q: "What is AbeyCollab's fee?",
      a: "AbeyCollab charges a simple 10% fee on completed projects. There are no fees to sign up, no hidden charges, and creators keep 90% of what they earn.",
    },
    {
      q: "How do revisions and feedback work?",
      a: "Creators share draft links directly in the project space. Brands can leave notes, point out specific moments in the video, and request small tweaks easily.",
    },
    {
      q: "How quickly do creators receive their money?",
      a: "Once the brand approves the final post, payment is sent directly to the creator's bank account within 24 hours (or in as little as 2 hours on Creator Pro).",
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
