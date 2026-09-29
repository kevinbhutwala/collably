"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { ChevronLeft, ChevronRight, Instagram, ShieldCheck, Star } from "lucide-react";

interface TicketTestimonial {
  id: string;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  image: string;
  quote: string;
  monthlyEarnings: string;
  gradientBg: string;
  brandPartners: string;
}

const TICKETS: TicketTestimonial[] = [
  {
    id: "naveli",
    name: "Naveli Khatri",
    handle: "@navelikhatri",
    followers: "206k Followers",
    niche: "Fashion & Lifestyle",
    image: "/creators/tanya-singh.jpg",
    quote:
      "AbeyCollab has revolutionized my content creation! As a fashion content Creator, I'm now earning 2-3L monthly by sharing product links on Instagram stories and posts. Monetizing 100% of my content has never been easier. The best part is AbeyCollab Engage - it automates comments and sends product links directly to my audience's DMs. Also, AbeyCollab has played a huge role in my social media growth. I highly recommend it!",
    monthlyEarnings: "₹2.5L / mo",
    gradientBg: "from-[#EA580C] via-[#F97316] to-[#FB923C]",
    brandPartners: "Snitch • Nykaa • Littlebox",
  },
  {
    id: "prarthana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    followers: "284k Followers",
    niche: "Styling & Contemporary Wear",
    image: "/creators/prarthana.jpg",
    quote:
      "Before AbeyCollab, chasing brands for payment 90 days after delivery was exhausting. With 100% Milestone Escrow, every single rupee is pre-funded before I record a reel. Once the brand signs off, payouts hit my bank account in 24 hours. It completely changed my business as a full-time creator.",
    monthlyEarnings: "₹3.2L / mo",
    gradientBg: "from-[#0F766E] via-[#0D9488] to-[#14B8A6]",
    brandPartners: "FabIndia • The Whole Truth • Boldfit",
  },
  {
    id: "kunal",
    name: "Kunal Rajput",
    handle: "@kunalrajputc",
    followers: "410k Followers",
    niche: "Fitness & Performance Athlete",
    image: "/creators/kunal-rajput.jpg",
    quote:
      "The pitch engine is seamless. I applied to open briefs from top nutrition brands and secured ₹1.8L in deals within my first two weeks. Transparent budgets with zero agency middlemen mean I keep 100% of my rate card.",
    monthlyEarnings: "₹4.0L / mo",
    gradientBg: "from-[#1E293B] via-[#0F766E] to-[#047857]",
    brandPartners: "Boldfit • MuscleBlaze • Optimum",
  },
  {
    id: "vasudha",
    name: "Vasudha Rai",
    handle: "@vasudha.rai",
    followers: "591k Followers",
    niche: "Clean Beauty & Wellness",
    image: "/creators/vasudha-rai.jpg",
    quote:
      "Replacing my static PDF media kit with AbeyCollab's live audited media kit doubled my inbound brand booking rate. Brands see my real engagement, audited reach, and 1-click escrow deposit upfront. It is the cleanest workflow in India.",
    monthlyEarnings: "₹3.8L / mo",
    gradientBg: "from-[#9A3412] via-[#C2410C] to-[#EA580C]",
    brandPartners: "Plum Goodness • DermaCo • Nykaa",
  },
];

export function WishlinkTicketStories() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTicket = () => {
    setCurrentIdx((prev) => (prev === 0 ? TICKETS.length - 1 : prev - 1));
  };

  const nextTicket = () => {
    setCurrentIdx((prev) => (prev + 1) % TICKETS.length);
  };

  const ticket = TICKETS[currentIdx];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden select-none font-sans border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>REAL CREATOR SUCCESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#0F172A] leading-tight">
            Loved by Creators, <br className="hidden sm:inline" />
            <span className="text-[#0F172A]">trusted by Brands</span>
          </h2>

          <p className="text-sm sm:text-base text-[#475569]">
            Real feedback from verified video creators monetizing their community through AbeyCollab.
          </p>
        </div>

        {/* ── THE ICONIC PERFORATED VIP TICKET CARD (Matching Sample Image 2) ── */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[32px] sm:rounded-[44px] bg-gradient-to-r ${ticket.gradientBg} shadow-2xl text-white relative overflow-hidden flex flex-col md:flex-row items-stretch`}
            >
              {/* ── LEFT TICKET STUB: Squircle Creator Portrait & Stats ── */}
              <div className="w-full md:w-[320px] p-6 sm:p-8 flex flex-col items-center justify-center text-center relative z-10 shrink-0">
                {/* Squircle Window with Creator's Photo & Yellow Ring (Matching Image 2) */}
                <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-[28px] overflow-hidden border-4 border-[#FACC15] shadow-lg relative bg-neutral-900 mb-4">
                  <SafeImage
                    src={ticket.image}
                    alt={ticket.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h4 className="text-lg sm:text-xl font-black font-display text-white tracking-tight">
                  {ticket.name}
                </h4>

                <div className="flex items-center gap-1.5 text-xs font-mono text-white/90 pt-1 font-semibold">
                  <Instagram className="w-3.5 h-3.5 text-[#FACC15]" />
                  <span>{ticket.handle}</span>
                  <span className="text-white/40">•</span>
                  <span>{ticket.followers}</span>
                </div>

                {/* Monthly Earnings Badge */}
                <div className="mt-3 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-mono font-bold text-white shadow-xs">
                  Escrow Verified: <span className="text-[#FACC15] font-black">{ticket.monthlyEarnings}</span>
                </div>
              </div>

              {/* ── CENTER PERFORATION: Punch Holes Divider (Matching Image 2) ── */}
              <div className="hidden md:flex flex-col items-center justify-between py-4 relative w-8 shrink-0">
                {/* Top Notch Cutout */}
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mt-7 shadow-inner" />

                {/* Vertical Dotted Punch Hole Line */}
                <div className="flex-1 flex flex-col justify-evenly items-center py-2">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-xs block"
                    />
                  ))}
                </div>

                {/* Bottom Notch Cutout */}
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mb-7 shadow-inner" />
              </div>

              {/* Horizontal Punch-hole divider for mobile view */}
              <div className="md:hidden flex items-center justify-between px-4 py-1 relative">
                <div className="h-6 w-6 rounded-full bg-[#FAF8F5] -ml-7" />
                <div className="flex-1 flex justify-evenly">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-white/80" />
                  ))}
                </div>
                <div className="h-6 w-6 rounded-full bg-[#FAF8F5] -mr-7" />
              </div>

              {/* ── RIGHT TICKET STUB: The Authentic Quote ── */}
              <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-left relative z-10">
                <blockquote className="text-sm sm:text-base lg:text-lg font-sans font-medium text-white/95 leading-relaxed drop-shadow-xs">
                  &ldquo;{ticket.quote}&rdquo;
                </blockquote>

                {/* Bottom Trust Tag */}
                <div className="pt-6 mt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
                    <span>Sponsored Deals: {ticket.brandPartners}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#FACC15]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Previous / Next Arrow Controls Below Ticket */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prevTicket}
              className="w-12 h-12 rounded-full border border-black/15 hover:border-black/30 bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous creator story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {TICKETS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIdx === idx
                      ? "w-8 h-2.5 bg-[#EA580C]"
                      : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"
                  }`}
                  aria-label={`Go to creator ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTicket}
              className="w-12 h-12 rounded-full border border-black/15 hover:border-black/30 bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Next creator story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
