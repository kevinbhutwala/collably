"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function BrandMarquee() {
  const highlights = [
    "Tech & SaaS",
    "Consumer Apps & Mobile",
    "Design & Creative Tools",
    "Health & Biohacking",
    "E-Commerce & DTC",
    "Fintech & Crypto",
    "Developer Ergonomics",
    "Modern Lifestyle",
  ];

  return (
    <section className="py-12 border-y border-slate-200 bg-slate-50/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Now Launching With Our Founding Cohort
              </p>
              <p className="text-xs text-slate-500">
                Curating forward-thinking brands and vetted top 5% creators across key verticals.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {highlights.map((niche, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs"
              >
                {niche}
              </span>
            ))}
          </div>

          <Link
            href="/creator/register"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent hover:text-orange-700 transition-colors shrink-0"
          >
            <span>Apply for Early Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
