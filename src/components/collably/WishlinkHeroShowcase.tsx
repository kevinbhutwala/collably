"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Star,
  Lock,
  TrendingUp,
  Send,
  Layers,
  ChevronRight,
  Eye,
  Award,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export function WishlinkHeroShowcase() {
  const [activeTab, setActiveTab] = useState<"creator" | "brand">("creator");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isExpandedModal, setIsExpandedModal] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Sync video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Sync mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
  };

  // Track playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 10;
    setVideoProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // When expanding to modal, sync time and mute
  useEffect(() => {
    if (isExpandedModal && modalVideoRef.current && videoRef.current) {
      modalVideoRef.current.currentTime = videoRef.current.currentTime;
      modalVideoRef.current.muted = isMuted;
      modalVideoRef.current.play().catch(() => {});
    }
  }, [isExpandedModal, isMuted]);

  return (
    <>
      <section className="relative bg-gradient-to-b from-[#FAFAF8] via-white to-white text-[#0A0A0E] flex flex-col justify-start pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans select-none">
        {/* Soft Ambient Dynamic Backlight / Aura */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[550px] sm:w-[850px] lg:w-[1100px] h-[400px] sm:h-[550px] bg-gradient-to-b from-[#FFD21F]/20 via-[#FFE052]/10 to-transparent rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-0" />
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          {/* ══════════════════════════════════════════════════════════════════
              TOP BAR: ROLE SWITCHER & TRUST PILLS
              ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-black/6">
            {/* Left: Role Toggle Pill */}
            <div className="inline-flex p-1 rounded-full bg-[#F2F2F6] dark:bg-[#181822] border border-black/8 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("creator")}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "creator"
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                For Creators
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("brand")}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "brand"
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                For Brands
              </button>
            </div>

            {/* Right: Security & Partner Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-[#0A0A0E] tracking-tight">
                  100% ESCROW PROTECTED
                </span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-black/8 text-[#0A0A0E] text-[10px] sm:text-[11px] font-mono font-bold shadow-2xs">
                <Star className="w-3 h-3 fill-[#FFD21F] text-[#FFD21F]" />
                <span>4.8/5 Rating</span>
              </div>

              <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-black/8 text-[#0A0A0E] text-[10px] sm:text-[11px] font-mono font-bold shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#FFC700]" />
                <span>Meta Partner</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              HEADLINE & VALUE PROPOSITION
              ══════════════════════════════════════════════════════════════════ */}
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-3.5 transition-opacity duration-200">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[11px] sm:text-xs font-mono font-bold text-[#8F6600]">
                <Zap className="w-3 h-3 fill-[#FFD21F] text-[#8F6600]" />
                <span>
                  {activeTab === "creator"
                    ? "Direct Brand Deals • Auto-DM Tech • 24h Payouts"
                    : "Verified Roster • Zero Advance Risk • Milestone Escrow"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-black font-display tracking-tight text-[#0A0A0E] leading-[1.1] sm:leading-[1.08]">
                {activeTab === "creator" ? (
                  <>
                    Monetise your content with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#0A0A0E] underline decoration-[#FFD21F] decoration-4 sm:decoration-6 underline-offset-4 sm:underline-offset-6">
                      guaranteed escrow
                    </span>{" "}
                    payouts.
                  </>
                ) : (
                  <>
                    Scale high-ROI campaigns with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#0A0A0E] underline decoration-[#FFD21F] decoration-4 sm:decoration-6 underline-offset-4 sm:underline-offset-6">
                      India’s top creators
                    </span>{" "}
                    and zero risk.
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#5A5A68] max-w-xl mx-auto font-sans leading-relaxed">
                {activeTab === "creator"
                  ? "Connect with 250+ top brands, turn comments into sponsored sales with Meta Auto-DMs, and get 100% upfront locked payouts in under 24 hours."
                  : "Discover audited creators across tech, fashion, lifestyle & fitness. Lock campaign budgets safely in Razorpay Escrow—funds are released only upon your approval."}
              </p>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 pt-1 w-full max-w-md mx-auto sm:max-w-none">
              <Link
                href={activeTab === "creator" ? "/creator/register" : "/brand/register"}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-sm shadow-[0_4px_20px_rgba(255,210,31,0.45)] border border-black/10 transition-all flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer min-h-[46px]"
              >
                <span>{activeTab === "creator" ? "Join as Creator (Free)" : "Launch a Brand Campaign"}</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
              </Link>

              <Link
                href={activeTab === "creator" ? "/campaigns" : "/creators"}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-[#F6F6F9] text-[#0A0A0E] font-bold text-sm border border-black/12 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer min-h-[46px]"
              >
                <span>{activeTab === "creator" ? "Explore Live Briefs" : "Browse Creator Roster"}</span>
                <ChevronRight className="w-4 h-4 text-[#7A7A8A]" />
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 pt-2 text-[11px] sm:text-xs font-mono text-[#6A6A78]">
              <span className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Escrow Protection</span>
              </span>
              <span className="hidden sm:inline text-black/20">•</span>
              <span className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>24h Approval Guarantee</span>
              </span>
              <span className="hidden sm:inline text-black/20">•</span>
              <span className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>0% Chasing Invoices</span>
              </span>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              PRIMARY VISUAL ELEMENT: PREMIUM HERO VIDEO CHASSIS
              ══════════════════════════════════════════════════════════════════ */}
          <div className="w-full mt-6 sm:mt-9 lg:mt-10 relative">
            {/* Ambient Multi-Layer Glow Beneath Video */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-[#FFD21F]/25 via-[#FFE052]/15 to-emerald-500/10 rounded-3xl sm:rounded-[36px] blur-2xl sm:blur-3xl opacity-75 -z-10 pointer-events-none" />

            {/* The Main Video Browser Container */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-[#0E0E14] shadow-[0_20px_60px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-300">
              {/* Sleek Browser / OS Header Bar */}
              <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-[#161622] border-b border-white/8 select-none">
                {/* Window Traffic Light Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-black/10" />
                </div>

                {/* Center Omnibar with Verified Lock */}
                <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full bg-black/40 border border-white/8 text-[10px] sm:text-xs font-mono text-[#A0A0B2] max-w-[220px] sm:max-w-xs truncate">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">abeycollab.com/commerce-os</span>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="hidden sm:inline text-emerald-400 font-semibold">Live Engine</span>
                </div>

                {/* Right Status Badge */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FFD21F]/15 text-[#FFD21F] text-[10px] font-mono font-bold">
                    4K ULTRA HD
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Operational" />
                </div>
              </div>

              {/* Video Player Frame with Strict 16:9 Aspect Ratio */}
              <div className="relative w-full aspect-[16/9] bg-black overflow-hidden group">
                <video
                  ref={videoRef}
                  src="/reels/heroVideo.mp4"
                  poster="/reels/heroVideo-poster.png"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlay}
                  className="w-full h-full object-cover object-center cursor-pointer"
                />

                {/* Dynamic Subtle Vignette / Edge Shadow for cinematic depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Center Click-To-Play Indicator (Visible on pause or brief hover) */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl cursor-pointer z-20"
                    aria-label="Play Video"
                  >
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#FFD21F] fill-[#FFD21F] ml-1" />
                  </button>
                )}

                {/* ── Top Floating Video Badges ── */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 pointer-events-none z-10">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>CREATOR COMMERCE DEMO</span>
                  </span>
                </div>

                {/* ── Floating Controls Bar (Bottom) ── */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between gap-3 z-20 pointer-events-auto">
                  {/* Left: Interactive Controls Glass Pill */}
                  <div className="inline-flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-xl text-white">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all text-white cursor-pointer"
                      title={isPlaying ? "Pause video" : "Play video"}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD21F]" />
                      ) : (
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FFD21F] text-[#FFD21F]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all text-white cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold"
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
                          <span className="hidden sm:inline text-[11px] text-white/70">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                          <span className="hidden sm:inline text-[11px] text-emerald-400">Audio On</span>
                        </>
                      )}
                    </button>

                    <div className="hidden sm:block w-px h-3.5 bg-white/20" />

                    <button
                      type="button"
                      onClick={() => setIsExpandedModal(true)}
                      className="hidden sm:flex items-center gap-1 p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all text-white/80 hover:text-white cursor-pointer text-xs font-mono"
                      title="Enlarge Video"
                      aria-label="Enlarge Video"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right: Live Tag & Interactive Scrub Bar Pill */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-xl text-white text-xs font-mono">
                    <span className="hidden xs:inline text-[11px] text-white/70">10s Showcase</span>
                    <div className="w-16 sm:w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FFD21F] to-[#FFE052] transition-all duration-150"
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                RESPONSIVE FLOATING CONTEXTUAL BADGES
                Desktop: Gracefully hover outside the chassis corners
                Mobile/Tablet: Render neatly beneath the chassis in an aligned grid
                ══════════════════════════════════════════════════════════════════ */}
            {/* Desktop Floating Badge 1: Escrow Protection (Top-Left) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex absolute -top-5 -left-6 xl:-left-10 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] items-center gap-3 z-30"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold text-base shrink-0">
                💰
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-[#7A7A8A] font-bold uppercase tracking-wider">Escrow Vault</p>
                <p className="text-xs font-black text-[#0A0A0E]">₹1,25,000 Upfront Locked</p>
                <span className="text-[10px] font-sans text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Safe until approved
                </span>
              </div>
            </motion.div>

            {/* Desktop Floating Badge 2: Growth Metrics (Bottom-Right) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:flex absolute -bottom-6 -right-6 xl:-right-10 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] items-center gap-3 z-30"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-black text-sm shrink-0">
                <TrendingUp className="w-5 h-5 text-[#0A0A0E]" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-[#7A7A8A] font-bold uppercase tracking-wider">Verified Conversions</p>
                <p className="text-xs font-black text-[#0A0A0E]">+120% Engagement Lift</p>
                <span className="text-[10px] font-sans text-[#D97706] font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 50K direct link clicks
                </span>
              </div>
            </motion.div>

            {/* Desktop Floating Badge 3: Meta Auto-DM Speed (Top-Right) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden xl:flex absolute top-12 -right-8 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)] items-center gap-2.5 z-30"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                <Send className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left font-mono">
                <p className="text-[9px] text-[#7A7A8A] font-bold uppercase">AbeyCollab Engage</p>
                <p className="text-xs font-extrabold text-[#0A0A0E]">Auto-DM sent in 2.8s</p>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              MOBILE & TABLET STAT STRIP
              Gracefully displays the value props below the video on <= 1024px
              ══════════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6 lg:hidden">
            <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                💰
              </div>
              <div className="font-mono">
                <p className="text-[10px] text-[#7A7A8A] font-bold uppercase">Razorpay Escrow</p>
                <p className="text-xs font-black text-[#0A0A0E]">100% Funds Locked</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#FFD21F]/20 text-[#8F6600] flex items-center justify-center text-sm font-bold shrink-0">
                <TrendingUp className="w-4 h-4 text-[#8F6600]" />
              </div>
              <div className="font-mono">
                <p className="text-[10px] text-[#7A7A8A] font-bold uppercase">Real-Time Growth</p>
                <p className="text-xs font-black text-[#0A0A0E]">+120% Sales Lift</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                <Send className="w-4 h-4 text-blue-600" />
              </div>
              <div className="font-mono">
                <p className="text-[10px] text-[#7A7A8A] font-bold uppercase">Meta Graph Partner</p>
                <p className="text-xs font-black text-[#0A0A0E]">Auto-DM in 2.8s</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ENLARGED VIDEO MODAL (WHEN USER CLICKS MAXIMIZE)
          ══════════════════════════════════════════════════════════════════ */}
      <Modal
        isOpen={isExpandedModal}
        onClose={() => setIsExpandedModal(false)}
        title="AbeyCollab Creator Commerce Showcase"
        description="Full-resolution 4K demonstration of the AbeyCollab engine."
        maxWidth="4xl"
      >
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black mt-2">
          <video
            ref={modalVideoRef}
            src="/reels/heroVideo.mp4"
            poster="/reels/heroVideo-poster.png"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </Modal>

      {/* Role Selection Modal for Custom Entry */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Sign up for AbeyCollab"
        description="Choose your pathway to explore briefings or share your creator kit."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] select-none font-sans">
          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="p-4 rounded-2xl bg-[#FAF9F5] hover:bg-[#F2F1EC] border border-black/10 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFD21F] flex items-center justify-center font-bold text-sm">
                🎨
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0A0A0E] group-hover:text-[#D97706] transition-colors">
                  I am a Creator
                </h4>
                <p className="text-xs text-[#5A5A68]">Build verified media kit & get 24h escrow payouts.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A7A8A] group-hover:text-[#0A0A0E] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="p-4 rounded-2xl bg-[#FAF9F5] hover:bg-[#F2F1EC] border border-black/10 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0A0A0E] text-white flex items-center justify-center font-bold text-sm">
                🏢
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0A0A0E] group-hover:text-[#D97706] transition-colors">
                  I am a Brand
                </h4>
                <p className="text-xs text-[#5A5A68]">Hire verified creators with milestone protection.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A7A8A] group-hover:text-[#0A0A0E] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </Modal>
    </>
  );
}
