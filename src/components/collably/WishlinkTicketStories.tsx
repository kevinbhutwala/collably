"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  Instagram,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface TicketTestimonial {
  id: string;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  image: string;
  imagePosition?: string;
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
    imagePosition: "object-bottom",
    quote:
      "AbeyCollab has revolutionized my content creation! As a fashion content creator, I'm now earning ₹2-3L monthly by sharing product links on Instagram stories and posts. Monetizing 100% of my content has never been easier. The best part is AbeyCollab Engage - it automates comments and sends product links directly to my audience's DMs in 3 seconds.",
    monthlyEarnings: "₹2.5L / mo",
    gradientBg: "from-[#0F172A] via-[#0F766E] to-[#047857]",
    brandPartners: "Snitch • Nykaa • Littlebox",
  },
  {
    id: "prarthana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    followers: "284k Followers",
    niche: "Styling & Contemporary Wear",
    image: "/creators/prarthana.jpg",
    imagePosition: "object-top",
    quote:
      "Before AbeyCollab, chasing brands for payment 90 days after delivery was exhausting. With 100% Milestone Escrow, every single rupee is pre-funded before I record a reel. Once the brand signs off, payouts hit my bank account in 24 hours. It completely changed my business as a full-time creator.",
    monthlyEarnings: "₹3.2L / mo",
    gradientBg: "from-[#047857] via-[#0D9488] to-[#0F766E]",
    brandPartners: "FabIndia • The Whole Truth • Boldfit",
  },
  {
    id: "kunal",
    name: "Kunal Rajput",
    handle: "@kunalrajputc",
    followers: "410k Followers",
    niche: "Fitness & Performance Athlete",
    image: "/creators/kunal-rajput.jpg",
    imagePosition: "object-center",
    quote:
      "The pitch engine is seamless. I applied to open briefs from top nutrition brands and secured ₹1.8L in deals within my first two weeks. Transparent budgets with zero agency middlemen mean I keep 100% of my rate card without any surprise deductions.",
    monthlyEarnings: "₹4.0L / mo",
    gradientBg: "from-[#0F172A] via-[#1E293B] to-[#0F766E]",
    brandPartners: "Boldfit • MuscleBlaze • Optimum",
  },
  {
    id: "prajakta",
    name: "Prajakta Koli",
    handle: "@mostlysane",
    followers: "7.4M Followers",
    niche: "Entertainment & Lifestyle",
    image: "/creators/prajakta-koli.png",
    imagePosition: "object-top",
    quote:
      "Replacing my static PDF media kit with AbeyCollab's live audited storefront doubled my inbound brand conversion rate. Brands see live verified engagement, audited audience demographics, and pre-fund escrow upfront. It is the cleanest and most professional creator platform in India.",
    monthlyEarnings: "₹4.8L / mo",
    gradientBg: "from-[#022C22] via-[#0F766E] to-[#047857]",
    brandPartners: "Plum Goodness • DermaCo • Nykaa",
  },
];

export function WishlinkTicketStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, TICKETS.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation when section is focused or in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch handlers for horizontal swipe (never blocks vertical scrolling!)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    // Only trigger if horizontal swipe is clearly dominant over vertical scroll
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const progressPercent = ((currentIndex + 1) / TICKETS.length) * 100;
  const isAtEnd = currentIndex === TICKETS.length - 1;
  const isAtStart = currentIndex === 0;

  return (
    <section
      id="ticket-stories"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative py-12 sm:py-20 lg:py-28 bg-[#FAF8F5] font-sans border-t border-black/[0.06] select-none flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Soft Background Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-100/35 via-teal-100/25 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2 relative z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#0F766E] text-[11px] font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>REAL CREATOR SUCCESS STORIES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#0F172A] leading-tight">
            Loved by Creators, <br className="hidden sm:inline" />
            <span className="text-[#0F172A]">trusted by Brands</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto">
            Real feedback from verified video creators monetizing their community through AbeyCollab.
          </p>

          {/* Interactive Card Navigator Pill */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all duration-300 shadow-xs bg-white/95 text-[#0F766E] border border-black/10">
              <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
              <span>
                Story {currentIndex + 1} of {TICKETS.length} • Swipe or tap to explore
              </span>
            </div>
          </div>
        </div>

        {/* ── 3D CARD STACK VIEWPORT ── */}
        <div
          className="relative w-full max-w-4xl min-h-[380px] sm:min-h-[360px] md:h-[360px] lg:h-[350px] flex items-center justify-center relative z-20"
          style={{ perspective: 1200 }}
        >
          {TICKETS.map((ticket, index) => {
            const isCurrent = index === currentIndex;
            const isPast = index < currentIndex;
            const isUpcoming = index > currentIndex;
            const pastDepth = currentIndex - index;
            const upcomingDepth = index - currentIndex;

            let targetY = 0;
            let targetScale = 1.0;
            let targetRotateX = 0;
            let targetRotateZ = 0;
            let targetOpacity = 1;
            let targetZIndex = 30;

            if (isCurrent) {
              targetY = 0;
              targetScale = 1.0;
              targetRotateX = 0;
              targetRotateZ = 0;
              targetOpacity = 1;
              targetZIndex = 30;
            } else if (isPast) {
              targetY = -pastDepth * 14;
              targetScale = Math.max(0.88, 1.0 - pastDepth * 0.04);
              targetRotateX = pastDepth * 2;
              targetRotateZ = (index % 2 === 0 ? -1.5 : 1.5) * pastDepth;
              targetOpacity = Math.max(0.2, 1.0 - pastDepth * 0.3);
              targetZIndex = 30 - pastDepth;
            } else if (isUpcoming) {
              targetY = 260 + (upcomingDepth - 1) * 30;
              targetScale = 0.9;
              targetRotateX = 14;
              targetRotateZ = index % 2 === 0 ? -2 : 2;
              targetOpacity = 0;
              targetZIndex = 10 - upcomingDepth;
            }

            return (
              <motion.div
                key={ticket.id}
                animate={{
                  y: targetY,
                  scale: targetScale,
                  rotateX: targetRotateX,
                  rotateZ: targetRotateZ,
                  opacity: targetOpacity,
                  zIndex: targetZIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.6,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className={`absolute inset-0 w-full flex items-center justify-center ${
                  isCurrent ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <div
                  className={`w-full max-w-4xl rounded-[24px] sm:rounded-[32px] md:rounded-[44px] bg-gradient-to-r ${ticket.gradientBg} shadow-[0_25px_60px_-15px_rgba(15,118,110,0.4),0_12px_28px_rgba(0,0,0,0.25)] text-white relative overflow-hidden flex flex-col md:flex-row items-stretch border border-white/25`}
                >
                  {/* Subtle 3D Holographic Sheen Layer */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.22)_0%,transparent_60%)] pointer-events-none" />

                  {/* ── MOBILE HEADER / DESKTOP LEFT STUB ── */}
                  <div className="w-full md:w-[280px] lg:w-[320px] p-4 sm:p-5 md:p-8 flex flex-row md:flex-col items-center md:justify-center text-left md:text-center relative z-10 shrink-0 gap-3.5 sm:gap-4 md:gap-0">
                    {/* Squircle Window with Creator's Photo */}
                    <div className="w-14 h-14 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 md:w-32 md:h-40 lg:w-36 lg:h-44 rounded-2xl md:rounded-[28px] overflow-hidden border-2 sm:border-3 md:border-4 border-[#34D399] shadow-[0_0_20px_rgba(52,211,153,0.4)] ring-2 ring-white/40 relative bg-neutral-900 md:mb-4 shrink-0 transform hover:scale-105 transition-transform duration-300">
                      <SafeImage
                        src={ticket.image}
                        alt={ticket.name}
                        fill
                        className={`object-cover ${ticket.imagePosition || "object-center"}`}
                        priority={index === 0}
                      />
                    </div>

                    {/* Creator Identity & Earnings */}
                    <div className="flex-1 md:flex-initial min-w-0">
                      <h4 className="text-base sm:text-lg md:text-xl font-black font-display text-white tracking-tight truncate md:whitespace-normal">
                        {ticket.name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-white/90 pt-0.5 md:pt-1 font-semibold">
                        <Instagram className="w-3 h-3 text-[#34D399] shrink-0" />
                        <span className="truncate">{ticket.handle}</span>
                        <span className="text-white/40">•</span>
                        <span className="shrink-0">{ticket.followers}</span>
                      </div>

                      {/* Monthly Earnings Badge */}
                      <div className="mt-1.5 md:mt-3 inline-block px-3 sm:px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] sm:text-[11px] font-mono font-bold text-white shadow-xs">
                        Escrow: <span className="text-[#34D399] font-black">{ticket.monthlyEarnings}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── DESKTOP CENTER PERFORATION: 3D Punch Holes Divider ── */}
                  <div className="hidden md:flex flex-col items-center justify-between py-4 relative w-8 shrink-0">
                    <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mt-7 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]" />
                    <div className="flex-1 flex flex-col justify-evenly items-center py-2">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] block"
                        />
                      ))}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mb-7 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />
                  </div>

                  {/* ── MOBILE HORIZONTAL PERFORATION DIVIDER ── */}
                  <div className="md:hidden flex items-center justify-between px-3 relative my-0.5">
                    <div className="h-5 w-5 rounded-full bg-[#FAF8F5] -ml-6 shadow-inner shrink-0" />
                    <div className="flex-1 flex justify-evenly mx-2 overflow-hidden">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/70 mx-1 shrink-0" />
                      ))}
                    </div>
                    <div className="h-5 w-5 rounded-full bg-[#FAF8F5] -mr-6 shadow-inner shrink-0" />
                  </div>

                  {/* ── RIGHT TICKET STUB: Authentic Quote & Badges ── */}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center text-left relative z-10 min-w-0">
                    <blockquote className="text-xs sm:text-sm md:text-base lg:text-base font-sans font-medium text-white/95 leading-relaxed drop-shadow-xs line-clamp-4 md:line-clamp-none">
                      &ldquo;{ticket.quote}&rdquo;
                    </blockquote>

                    {/* Bottom Trust Tag */}
                    <div className="pt-3 sm:pt-4 md:pt-6 mt-2 sm:mt-3 md:mt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-white/85">
                      <div className="flex items-center gap-1.5 truncate max-w-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                        <span className="truncate">Deals: {ticket.brandPartners}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#34D399] shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── BOTTOM CONTROLS: Interactive Creator Tabs & Dual Progress Bar ── */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center gap-3 sm:gap-4 relative z-20 w-full max-w-xl">
          {/* Creator Selector Pills + Prev/Next Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-center">
            <button
              type="button"
              onClick={goToPrev}
              disabled={isAtStart}
              aria-label="Previous card"
              className={`p-2 rounded-full border transition-all ${
                isAtStart
                  ? "opacity-35 cursor-not-allowed bg-black/5 border-black/10 text-neutral-400"
                  : "bg-white hover:bg-emerald-50 text-[#0F766E] border-black/10 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {TICKETS.map((ticket, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#0F766E] text-white shadow-md scale-105"
                      : "bg-white/80 hover:bg-white text-neutral-600 border border-black/10 hover:border-black/20"
                  }`}
                >
                  {idx + 1}. {ticket.name.split(" ")[0]}
                </button>
              );
            })}

            <button
              type="button"
              onClick={goToNext}
              disabled={isAtEnd}
              aria-label="Next card"
              className={`p-2 rounded-full border transition-all ${
                isAtEnd
                  ? "opacity-35 cursor-not-allowed bg-black/5 border-black/10 text-neutral-400"
                  : "bg-white hover:bg-emerald-50 text-[#0F766E] border-black/10 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dual Progress Bar Line */}
          <div className="w-48 sm:w-64 md:w-72 h-1.5 bg-black/10 rounded-full overflow-hidden relative">
            <motion.div
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full bg-gradient-to-r from-[#0F766E] to-[#34D399] rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
