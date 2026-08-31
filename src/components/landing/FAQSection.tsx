"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the escrow payment protection work?",
      a: "When a brand approves a creator application or launches a brief, the agreed fee is deposited into NEXUS Escrow. The funds are held safely and only disbursed in agreed tranches once the brand reviews and approves the deliverable in the workspace.",
    },
    {
      q: "How are creators vetted before being admitted?",
      a: "Our agency team audits every creator profile for authentic audience distribution, historical engagement consistency, brand safety, and delivery punctuality. Only creators in the top 5% of verified performance receive the verified checkmark.",
    },
    {
      q: "Can we use NEXUS as a Self-Serve SaaS or a Full-Service Agency?",
      a: "Both! Brands can use our Self-Serve SaaS tools to directly discover, negotiate, and collaborate with creators, or engage our dedicated Full-Service Agency tier where our talent strategists handle everything end-to-end.",
    },
    {
      q: "How does NEXUS integrate with mobile apps?",
      a: "NEXUS is built with a strictly decoupled core architecture (separate domain types, Zod schemas, state stores, and service layer) designed to power both this Next.js web application and future React Native iOS & Android apps via the exact same backend API.",
    },
    {
      q: "What deliverable formats are supported?",
      a: "Everything from YouTube 60s integrations and dedicated 4K videos, to Instagram Reels, TikToks, UGC ad formats, X (Twitter) threads, newsletter inclusions, and live keynote appearances.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about our creator-brand collaboration engine.
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
