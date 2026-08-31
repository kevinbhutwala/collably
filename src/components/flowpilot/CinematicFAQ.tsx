"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function CinematicFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does FlowPilot prevent AI hallucinations during high-ticket sales?",
      a: "FlowPilot enforces a deterministic RAG (Retrieval-Augmented Generation) pipeline backed by your uploaded product catalogs, strict pricing rules, and compliance boundaries. If a customer asks a question outside the vetted knowledge base, FlowPilot intelligently bridges to a human sales representative rather than guessing.",
    },
    {
      q: "Which channels does FlowPilot integrate with natively?",
      a: "FlowPilot connects directly to the official WhatsApp Business Cloud API, Instagram Graph API, Website Live Chat (embeddable widget & headless API), SMS (Twilio), and Facebook Messenger. All incoming conversations are unified into a single real-time stream.",
    },
    {
      q: "How does the calendar and payment booking flow work?",
      a: "FlowPilot performs live two-way free/busy checks against Google Calendar, Outlook, Cal.com, or Calendly. It proposes available times, lets the customer confirm with a single click, and can optionally dispatch a Stripe checkout session for upfront consultation deposits.",
    },
    {
      q: "How long does onboarding and prompt customization take?",
      a: "Initial setup takes approximately 15 minutes. You connect your messaging channels and CRM (HubSpot/Salesforce), upload your FAQ/objection docs, set your calendar rules, and FlowPilot generates your custom AI sales persona ready for staging testing.",
    },
    {
      q: "Can human sales reps intervene in active conversations?",
      a: "Yes. The FlowPilot dashboard provides real-time co-pilot capabilities. A human rep can jump into any live chat instantly or receive automated push alerts whenever a high-value enterprise lead is detected.",
    },
    {
      q: "Is FlowPilot compliant with HIPAA, GDPR, and SOC2 standards?",
      a: "Yes. All data in transit is encrypted using TLS 1.3 and stored with AES-256 encryption. We sign enterprise Business Associate Agreements (BAA) for healthcare providers and Data Processing Agreements (DPA) compliant with GDPR and CCPA.",
    },
  ];

  return (
    <section className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-brand-accent" />
            <span>Architecture &amp; Operational FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Frequently asked questions.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Everything you need to know about deployment, compliance, and autonomous conversions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-slate-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
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
