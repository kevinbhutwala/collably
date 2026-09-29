"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function CompactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does payment protection work?",
      a: "When a brand starts a project, they deposit 100% of the payment safely into Razorpay Escrow. Creators can begin work knowing their payout is already secured, and funds are automatically released within 24 hours of deliverable approval.",
    },
    {
      q: "What is AbeyCollab's fee?",
      a: "AbeyCollab is free to join with no monthly subscription fees for Starter creators. A transparent 10% fee applies only on successfully completed brand deals.",
    },
    {
      q: "How do revisions and feedback work?",
      a: "Creators submit deliverables directly within the campaign workspace. Brands leave frame-by-frame timestamps and notes, keeping communication clear and turnaround times fast.",
    },
    {
      q: "How quickly do creators receive their money?",
      a: "As soon as the brand signs off on final assets, funds are transferred via IMPS/NEFT directly into the creator's verified bank account in under 24 hours (or 2 hours with Creator Pro).",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFD] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none relative overflow-hidden border-t border-black/[0.06] dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-2"
        >
          <span className="text-[11px] font-mono font-bold tracking-[0.18em] text-[#6A6A78] dark:text-[#8E8EA4] uppercase block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0E] dark:text-white font-display">
            Frequently asked questions.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/[0.08] dark:border-white/10 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all hover:border-black/15"
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA8] leading-relaxed font-sans border-t border-black/[0.06] dark:border-white/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
