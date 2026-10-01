'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  ArrowDown,
} from 'lucide-react';

export function WishlinkHeroShowcase() {
  const [activeTab, setActiveTab] = useState<'creator' | 'brand'>('brand');
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const brandPartners = ['Snitch', 'Plum', 'DermaCo', 'Boldfit', 'FabIndia', 'Littlebox'];

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#0F172A] pt-16 sm:pt-24 pb-16 sm:pb-24 select-none"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/65 to-[#0F172A]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.94)_85%)] opacity-85 pointer-events-none" />
      </div>

      {/* ── Seamless Bottom Gradient Blend into Canvas ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#0F172A]/70 to-[#FAF8F5] pointer-events-none z-10" />

      {/* ── Main Hero Content ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Role Switcher Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex p-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-xl mb-5 sm:mb-6 shadow-lg"
        >
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`px-5 sm:px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'brand'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md ring-1 ring-emerald-400/40'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span>For Brands</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`px-5 sm:px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'creator'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md ring-1 ring-emerald-400/40'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <span>For Creators</span>
          </button>
        </motion.div>

        {/* Dynamic & Impactful Headline */}
        <motion.div
          key={`headline-${activeTab}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none w-full px-2"
        >
          <h1 className="text-[2.2rem] min-[360px]:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black tracking-tight text-white leading-[1.08] max-w-4xl mx-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)] break-words">
            {activeTab === 'brand' ? (
              <>
                Scale campaigns with{' '}
                <span className="text-emerald-400">verified creators.</span>
              </>
            ) : (
              <>
                Direct brand deals.{' '}
                <span className="text-emerald-400">Guaranteed 24h escrow.</span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Clean, Persuasive Value Statement */}
        <motion.p
          key={`sub-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-neutral-200/90 font-sans font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-3"
        >
          {activeTab === 'brand'
            ? 'Connect with audited creators, lock campaign budgets in milestone escrow, and track verified deliverable performance.'
            : 'Access pre-funded briefs from 250+ top brands. Your fee is locked in escrow before you produce, with automated payouts in 24 hours.'}
        </motion.p>

        {/* Focused Conversion Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none"
        >
          <Link
            href={activeTab === 'creator' ? '/register?role=creator' : '/register?role=brand'}
            className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer text-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{activeTab === 'creator' ? 'Join as Creator' : 'Launch Campaign'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={activeTab === 'creator' ? '/campaigns' : '/creators'}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 border font-sans font-medium text-xs tracking-wider uppercase transition-all duration-300 bg-white/10 hover:bg-white/15 backdrop-blur-xl rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center text-center whitespace-nowrap text-white border-white/20 hover:border-emerald-400/60 hover:text-emerald-300"
          >
            {activeTab === 'creator' ? 'Explore Open Briefs' : 'Browse Creators'}
          </Link>
        </motion.div>

        {/* Sleek Brand Partner Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/10 w-full max-w-3xl flex flex-col items-center gap-2.5"
        >
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-white/50">
            Trusted by creators collaborating with
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 text-xs sm:text-sm font-display font-bold text-white/80 tracking-widest uppercase">
            {brandPartners.map((brand, i) => (
              <React.Fragment key={brand}>
                <span className="hover:text-white transition-colors">{brand}</span>
                {i < brandPartners.length - 1 && (
                  <span className="text-white/25 select-none hidden min-[380px]:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Discreet Corner Sound Toggle */}
      <button
        type="button"
        onClick={toggleVideoSound}
        className="absolute bottom-6 right-6 z-30 group flex items-center gap-2 px-3.5 py-2 border border-white/15 hover:border-white/35 text-white/80 hover:text-white transition-all duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md cursor-pointer shadow-lg"
        title={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
        aria-label={isVideoMuted ? 'Turn Sound On' : 'Turn Sound Off'}
      >
        {isVideoMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
        )}
        <span className="text-[10px] font-mono tracking-wider font-medium uppercase">
          {isVideoMuted ? 'Mute' : 'Audio On'}
        </span>
      </button>

      {/* Bottom Subtle Scroll Indicator */}
      <a
        href="#brands-showcase"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors py-1.5 sm:py-2 px-3.5 sm:px-4 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md"
      >
        <span>Explore Platform</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}
