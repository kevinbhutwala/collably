"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  Instagram,
  ShieldCheck,
  Star,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
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
  const isAnimatingRef = useRef(false);

  // Sync ref with state for synchronous wheel event cancellation
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Navigate forward / backward
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, TICKETS.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Update index based on scroll position entering from above or below
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When user is well above the section, reset to first card
      if (rect.top > windowHeight * 0.7) {
        if (currentIndexRef.current !== 0) {
          currentIndexRef.current = 0;
          setCurrentIndex(0);
        }
      }
      // When user is well below the section, keep at last card
      else if (rect.bottom < windowHeight * 0.3) {
        if (currentIndexRef.current !== TICKETS.length - 1) {
          currentIndexRef.current = TICKETS.length - 1;
          setCurrentIndex(TICKETS.length - 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Scroll & Gesture Interception Lock
  useEffect(() => {
    let animTimeout: NodeJS.Timeout | null = null;
    let touchStartY = 0;

    const setCooldown = () => {
      isAnimatingRef.current = true;
      if (animTimeout) clearTimeout(animTimeout);
      animTimeout = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 500);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is active when in viewport
      const isInView = rect.top <= 80 && rect.bottom >= windowHeight - 80;
      if (!isInView) return;

      const delta = e.deltaY;
      // Filter out micro trackpad noise
      if (Math.abs(delta) < 14) return;

      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;
      const cur = currentIndexRef.current;

      // ── DOWNWARD SCROLL ──
      if (isScrollingDown) {
        if (cur < TICKETS.length - 1) {
          // LOCK PAGE SCROLL until all cards fly forward!
          e.preventDefault();
          if (!isAnimatingRef.current) {
            setCooldown();
            if (Math.abs(rect.top) > 8) {
              sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setCurrentIndex(cur + 1);
          }
        }
        // If cur === TICKETS.length - 1, we do NOT preventDefault.
        // All cards finished animating, so normal page scroll continues down!
      }

      // ── UPWARD SCROLL ──
      if (isScrollingUp) {
        if (cur > 0) {
          // LOCK PAGE SCROLL until all cards fly back!
          e.preventDefault();
          if (!isAnimatingRef.current) {
            setCooldown();
            if (Math.abs(rect.top) > 8) {
              sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setCurrentIndex(cur - 1);
          }
        }
        // If cur === 0, we do NOT preventDefault.
        // All cards flew back, so normal page scroll continues up!
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInView = rect.top <= 80 && rect.bottom >= windowHeight - 80;
      if (!isInView) return;

      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY; // diff > 0 => swiping UP (scrolling DOWN)

      if (Math.abs(diff) < 25) return;

      const isSwipingUp = diff > 0;
      const isSwipingDown = diff < 0;
      const cur = currentIndexRef.current;

      if (isSwipingUp && cur < TICKETS.length - 1) {
        if (e.cancelable) e.preventDefault();
        if (!isAnimatingRef.current) {
          setCooldown();
          touchStartY = currentY;
          setCurrentIndex(cur + 1);
        }
      } else if (isSwipingDown && cur > 0) {
        if (e.cancelable) e.preventDefault();
        if (!isAnimatingRef.current) {
          setCooldown();
          touchStartY = currentY;
          setCurrentIndex(cur - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInView = rect.top <= 80 && rect.bottom >= windowHeight - 80;
      if (!isInView) return;

      const cur = currentIndexRef.current;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (cur < TICKETS.length - 1) {
          e.preventDefault();
          setCurrentIndex(cur + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (cur > 0) {
          e.preventDefault();
          setCurrentIndex(cur - 1);
        }
      }
    };

    // Attach non-passive wheel listener directly to window to intercept scroll
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animTimeout) clearTimeout(animTimeout);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const progressPercent = ((currentIndex + 1) / TICKETS.length) * 100;
  const isAllFlown = currentIndex === TICKETS.length - 1;
  const isAtStart = currentIndex === 0;

  return (
    <section
      id="ticket-stories"
      ref={sectionRef}
      className="relative min-h-[720px] lg:min-h-screen py-10 sm:py-16 bg-[#FAF8F5] font-sans border-t border-black/[0.06] select-none flex flex-col items-center justify-center overflow-hidden"
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

          <p className="text-xs sm:text-sm text-[#475569]">
            Real feedback from verified video creators monetizing their community through AbeyCollab.
          </p>

          {/* Interactive Scroll Lock Status Pill */}
          <div className="pt-2 flex items-center justify-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all duration-300 shadow-xs ${
                isAllFlown
                  ? "bg-emerald-600 text-white border border-emerald-500"
                  : "bg-white/95 text-[#0F766E] border border-black/10"
              }`}
            >
              {isAllFlown ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>All cards viewed (4/4) • Scroll down to continue</span>
                  <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
                </>
              ) : isAtStart ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Scroll down to fly cards forward (1/4)</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#0F766E] animate-bounce" />
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>
                    Card {currentIndex + 1} of 4 • Scroll down to advance • Scroll up to fly back
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── 3D CARD STACK VIEWPORT ── */}
        <div
          className="relative w-full max-w-4xl h-[440px] sm:h-[400px] md:h-[350px] flex items-center justify-center relative z-20"
          style={{ perspective: 1200 }}
        >
          {TICKETS.map((ticket, index) => {
            const isCurrent = index === currentIndex;
            const isPast = index < currentIndex;
            const isUpcoming = index > currentIndex;
            const pastDepth = currentIndex - index;
            const upcomingDepth = index - currentIndex;

            // Target animation parameters based on relationship to current card
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
              // Flown in previously: stacked behind with subtle upward offset & tilt
              targetY = -pastDepth * 16;
              targetScale = Math.max(0.86, 1.0 - pastDepth * 0.05);
              targetRotateX = pastDepth * 2;
              targetRotateZ = (index % 2 === 0 ? -1.5 : 1.5) * pastDepth;
              targetOpacity = Math.max(0.25, 1.0 - pastDepth * 0.28);
              targetZIndex = 30 - pastDepth;
            } else if (isUpcoming) {
              // Waiting below: tilted back in 3D perspective
              targetY = 460 + (upcomingDepth - 1) * 40;
              targetScale = 0.86;
              targetRotateX = 18;
              targetRotateZ = index % 2 === 0 ? -3 : 3;
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
                  stiffness: 240,
                  damping: 26,
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
                  className={`w-full max-w-4xl rounded-[32px] sm:rounded-[44px] bg-gradient-to-r ${ticket.gradientBg} shadow-[0_30px_70px_-20px_rgba(15,118,110,0.45),0_15px_30px_rgba(0,0,0,0.3)] text-white relative overflow-hidden flex flex-col md:flex-row items-stretch border border-white/25`}
                >
                  {/* Subtle 3D Holographic Sheen Layer */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.22)_0%,transparent_60%)] pointer-events-none" />

                  {/* ── LEFT TICKET STUB: 3D Squircle Creator Portrait & Stats ── */}
                  <div className="w-full md:w-[320px] p-6 sm:p-8 flex flex-col items-center justify-center text-center relative z-10 shrink-0">
                    {/* Squircle Window with Creator's Photo & 3D Mint Ring */}
                    <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-[28px] overflow-hidden border-4 border-[#34D399] shadow-[0_0_25px_rgba(52,211,153,0.45)] ring-2 ring-white/40 relative bg-neutral-900 mb-4 transform hover:scale-105 transition-transform duration-300">
                      <SafeImage
                        src={ticket.image}
                        alt={ticket.name}
                        fill
                        className={`object-cover ${ticket.imagePosition || "object-center"}`}
                        priority={index === 0}
                      />
                    </div>

                    <h4 className="text-lg sm:text-xl font-black font-display text-white tracking-tight">
                      {ticket.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/90 pt-1 font-semibold">
                      <Instagram className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>{ticket.handle}</span>
                      <span className="text-white/40">•</span>
                      <span>{ticket.followers}</span>
                    </div>

                    {/* Monthly Earnings Badge */}
                    <div className="mt-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-mono font-bold text-white shadow-xs">
                      Escrow Verified: <span className="text-[#34D399] font-black">{ticket.monthlyEarnings}</span>
                    </div>
                  </div>

                  {/* ── CENTER PERFORATION: 3D Punch Holes Divider ── */}
                  <div className="hidden md:flex flex-col items-center justify-between py-4 relative w-8 shrink-0">
                    {/* Top Notch Cutout */}
                    <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mt-7 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]" />

                    {/* Vertical Dotted Punch Hole Line */}
                    <div className="flex-1 flex flex-col justify-evenly items-center py-2">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] block"
                        />
                      ))}
                    </div>

                    {/* Bottom Notch Cutout */}
                    <div className="w-6 h-6 rounded-full bg-[#FAF8F5] -mb-7 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />
                  </div>

                  {/* Horizontal Punch-hole divider for mobile view */}
                  <div className="md:hidden flex items-center justify-between px-4 py-1 relative">
                    <div className="h-6 w-6 rounded-full bg-[#FAF8F5] -ml-7 shadow-inner" />
                    <div className="flex-1 flex justify-evenly">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-white/80" />
                      ))}
                    </div>
                    <div className="h-6 w-6 rounded-full bg-[#FAF8F5] -mr-7 shadow-inner" />
                  </div>

                  {/* ── RIGHT TICKET STUB: The Authentic Quote ── */}
                  <div className="flex-1 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-left relative z-10">
                    <blockquote className="text-sm sm:text-base lg:text-lg font-sans font-medium text-white/95 leading-relaxed drop-shadow-xs">
                      &ldquo;{ticket.quote}&rdquo;
                    </blockquote>

                    {/* Bottom Trust Tag */}
                    <div className="pt-6 mt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/85">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#34D399]" />
                        <span>Sponsored Deals: {ticket.brandPartners}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[#34D399]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
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
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4 relative z-20 w-full max-w-xl">
          {/* Creator Selector Pills + Prev/Next Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <button
              onClick={goToPrev}
              disabled={isAtStart}
              aria-label="Previous card"
              className={`p-2 rounded-full border transition-all ${
                isAtStart
                  ? "opacity-35 cursor-not-allowed bg-black/5 border-black/10 text-neutral-400"
                  : "bg-white hover:bg-emerald-50 text-[#0F766E] border-black/10 shadow-xs hover:scale-105 active:scale-95"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {TICKETS.map((ticket, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={ticket.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
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
              onClick={goToNext}
              disabled={isAllFlown}
              aria-label="Next card"
              className={`p-2 rounded-full border transition-all ${
                isAllFlown
                  ? "opacity-35 cursor-not-allowed bg-black/5 border-black/10 text-neutral-400"
                  : "bg-white hover:bg-emerald-50 text-[#0F766E] border-black/10 shadow-xs hover:scale-105 active:scale-95"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dual Progress Bar Line */}
          <div className="w-56 sm:w-72 h-1.5 bg-black/10 rounded-full overflow-hidden relative">
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
