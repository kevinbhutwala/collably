'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Volume2,
  VolumeX,
  ArrowDown,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export function WishlinkHeroShowcase() {
  const [activeTab, setActiveTab] = useState<'creator' | 'brand'>('creator');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-[94vh] w-full flex items-center justify-center overflow-hidden bg-[#08080A] pt-20 sm:pt-28 pb-20 sm:pb-24 select-none"
    >
      {/* ── Background Cinematic Video Loop ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src="/reels/heroVideo.mp4"
          poster="/reels/heroVideo-poster.png"
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="w-full h-full object-cover opacity-85 transition-opacity duration-1000"
        />
        {/* Balanced Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-[#08080A]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,10,0.4)_0%,rgba(8,8,10,0.92)_85%)] opacity-85 pointer-events-none" />
      </div>

      {/* ── Seamless Bottom Gradient Blend into Canvas ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#08080A]/70 to-[#FBFBFD] pointer-events-none z-10" />

      {/* ── Main Hero Content ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Status & Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-white/20 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-neutral-200 tracking-wide drop-shadow-sm">
            Available for Creators &amp; Brands · 100% Escrow Protected
          </span>
        </motion.div>

        {/* Role Switcher Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl mb-4 sm:mb-6 shadow-lg"
        >
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`px-5 sm:px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'creator'
                ? 'bg-[#FFD21F] text-[#0A0A0E] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            For Creators
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`px-5 sm:px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-[#FFD21F] text-[#0A0A0E] shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            For Brands
          </button>
        </motion.div>

        {/* Hero Title with Directorial Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none my-1 sm:my-2 w-full px-2"
        >
          <h1 className="text-[2.2rem] min-[380px]:text-[2.6rem] min-[480px]:text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] font-display font-black tracking-tight sm:tracking-normal text-white uppercase leading-[0.95] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            ABEYCOLLAB
          </h1>
        </motion.div>

        {/* Editorial Subtitle with Stylized Delimiters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-3 text-xs sm:text-base md:text-xl font-display font-semibold tracking-wide uppercase text-neutral-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl mx-auto"
        >
          <span className="whitespace-nowrap">{activeTab === 'creator' ? 'Direct Brand Deals' : 'Audited Creators'}</span>
          <span className="text-[#FFD21F] font-light hidden min-[360px]:inline">/</span>
          <span className="text-white whitespace-nowrap">Meta Auto-DMs</span>
          <span className="text-[#FFD21F] font-light hidden min-[360px]:inline">/</span>
          <span className="text-[#FFD21F] whitespace-nowrap">24h Escrow Payouts</span>
        </motion.div>

        {/* Punchy Concise Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-neutral-300 font-display font-light tracking-wide max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4"
        >
          {activeTab === 'creator'
            ? 'Monetise your content. Guaranteed escrow payouts.'
            : 'Scale high-ROI campaigns with India’s top verified creators.'}
        </motion.p>

        {/* Magnetic Hero CTA Actions + Sound Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-5 sm:mt-8 w-full max-w-xs sm:max-w-none"
        >
          <Link
            href={activeTab === 'creator' ? '/register?role=creator' : '/register?role=brand'}
            className="group relative w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3.5 bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-full shadow-[0_10px_30px_rgba(255,210,31,0.25)] hover:shadow-[0_15px_40px_rgba(255,210,31,0.4)] hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            <Play className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110 shrink-0" />
            <span className="whitespace-nowrap">{activeTab === 'creator' ? 'Join as Creator (Free)' : 'Launch Campaign'}</span>
          </Link>

          <Link
            href={activeTab === 'creator' ? '/campaigns' : '/creators'}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-3.5 border border-white/20 hover:border-[#FFD21F]/60 text-white hover:text-[#FFD21F] font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl rounded-full shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center text-center whitespace-nowrap"
          >
            {activeTab === 'creator' ? 'Explore Briefs' : 'Browse Creators'}
          </Link>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleVideoSound}
            className="group flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 border border-white/20 hover:border-white/40 text-neutral-300 hover:text-white transition-all duration-200 rounded-full bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-xl cursor-pointer self-center sm:self-auto"
            title={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            aria-label={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isVideoMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            ) : (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#FFD21F]" />
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#FFD21F] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#FFD21F] animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-[#FFD21F] animate-pulse delay-150" />
                </span>
              </div>
            )}
            <span className="text-[10px] sm:text-[11px] font-mono font-medium">
              {isVideoMuted ? 'MUTE' : 'AUDIO ON'}
            </span>
          </button>
        </motion.div>

        {/* Micro Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-7 text-[10px] sm:text-xs font-mono text-neutral-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
        >
          <span className="flex items-center gap-1.5 font-bold text-neutral-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Escrow Protection</span>
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="flex items-center gap-1.5 font-bold text-neutral-100">
            <Zap className="w-3.5 h-3.5 text-[#FFD21F]" />
            <span>24h Approval Guarantee</span>
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="flex items-center gap-1.5 font-bold text-neutral-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>0% Chasing Invoices</span>
          </span>
        </motion.div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <a
        href="#pillars"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
      >
        <span>Explore Platform</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
