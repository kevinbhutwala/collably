"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CreativeLoaderProps {
  label?: string;
  subtext?: string;
  size?: "sm" | "md" | "lg" | "fullscreen";
  className?: string;
  showProgress?: boolean;
}

const TELEMETRY_PHRASES = [
  "Synchronizing Escrow Milestones...",
  "Verifying Creator & Brand Channels...",
  "Calibrating 4K Review Rails...",
  "Securing Cryptographic Ledger...",
  "Establishing Instant Payout Rail...",
];

export function CreativeLoader({
  label,
  subtext,
  size = "md",
  className = "",
  showProgress = true,
}: CreativeLoaderProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % TELEMETRY_PHRASES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const isFullscreen = size === "fullscreen";

  // Micro loader variant (for buttons and inline widgets)
  if (size === "sm") {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Micro Orbit Track */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-2 border-dashed border-[#FFD21F]/80 border-t-transparent"
          />
          {/* Center Deal Node */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] shadow-[0_0_6px_#FFD21F]" />
        </div>
        {label && (
          <span className="text-xs font-mono font-medium text-[#0A0A0E] dark:text-[#F4F4F8] tracking-tight">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Medium / Large / Fullscreen variant
  return (
    <div
      className={
        isFullscreen
          ? `fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-white/75 dark:bg-[#07070B]/85 backdrop-blur-2xl select-none overflow-hidden transition-colors ${className}`
          : `flex flex-col items-center justify-center select-none py-10 px-4 text-center ${className}`
      }
      role="status"
      aria-live="polite"
    >
      {/* ── 1. Top Horizon Laser Ray (Fullscreen mode) ── */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-transparent overflow-hidden pointer-events-none z-50">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFD21F] to-transparent shadow-[0_0_12px_#FFD21F]"
          />
        </div>
      )}

      {/* ── 2. Ambient Floating Halo / Particle Aura ── */}
      <div className="relative flex items-center justify-center">
        {/* Soft Golden Solar Aura */}
        <motion.div
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFD21F]/20 via-[#FFAE00]/10 to-transparent blur-3xl pointer-events-none"
        />

        {/* Outer Counter-Rotating Ambient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-10 rounded-full border border-black/5 dark:border-white/5 pointer-events-none"
        >
          {/* Floating stardust nodes */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]/70 shadow-[0_0_8px_#FFD21F] absolute top-2 left-1/4" />
          <div className="w-1 h-1 rounded-full bg-white/60 dark:bg-white/40 absolute bottom-4 right-1/4" />
        </motion.div>

        {/* Middle Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.45, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full border border-[#FFD21F]/40 pointer-events-none"
        />

        {/* ── 3. Central Glassmorphic Nexus Core ── */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 10px 30px -10px rgba(255, 210, 31, 0.25)",
              "0 20px 45px -10px rgba(255, 210, 31, 0.45)",
              "0 10px 30px -10px rgba(255, 210, 31, 0.25)",
            ],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`relative z-10 flex items-center justify-center rounded-3xl bg-gradient-to-b from-[#181824] via-[#101018] to-[#0A0A0E] border border-[#FFD21F]/40 shadow-2xl p-4 sm:p-5 ${
            size === "lg" || isFullscreen ? "w-24 h-24 sm:w-28 sm:h-28" : "w-20 h-20"
          }`}
        >
          {/* Internal Specular Glass Highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-3xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

          {/* Bespoke Kinetic Abey Nexus SVG with Self-Drawing Motion */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10"
          >
            <defs>
              <linearGradient id="creativeLoaderGold" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="50%" stopColor="#FFD21F" />
                <stop offset="100%" stopColor="#FF9800" />
              </linearGradient>

              <linearGradient id="creativeLoaderBrand" x1="16" y1="18" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              <radialGradient id="creativeCorePulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="60%" stopColor="#FFD21F" />
                <stop offset="100%" stopColor="#E6A800" />
              </radialGradient>
            </defs>

            {/* Creator Solar Arch (Self-Drawing Kinetic Motion) */}
            <motion.path
              d="M 12 37.5 L 21.8 12.2 C 22.7 9.8 25.3 9.8 26.2 12.2 L 36 37.5"
              stroke="url(#creativeLoaderGold)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.1, pathOffset: 0 }}
              animate={{
                pathLength: [0.2, 1, 0.2],
                pathOffset: [0, 0.5, 1],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Brand Synergy Interlocking Loop */}
            <motion.path
              d="M 16.5 28.5 C 16.5 22.5 23 21 27.5 23.5 C 32 26 33.5 31.5 29.5 34 C 25.5 36.5 19.5 33 19.5 27 C 19.5 22.5 25.5 20.5 31.5 24"
              stroke="url(#creativeLoaderBrand)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.1, pathOffset: 0 }}
              animate={{
                pathLength: [0.3, 1, 0.3],
                pathOffset: [1, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Pulsing Escrow Deal Core Node */}
            <motion.circle
              cx="24.5"
              cy="27.5"
              r="3.5"
              fill="url(#creativeCorePulse)"
              animate={{
                scale: [1, 1.35, 1],
                filter: [
                  "drop-shadow(0 0 2px #FFD21F)",
                  "drop-shadow(0 0 6px #FFD21F)",
                  "drop-shadow(0 0 2px #FFD21F)",
                ],
              }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <circle cx="24.5" cy="27.5" r="1.4" fill="#0A0A0E" />
          </svg>
        </motion.div>
      </div>

      {/* ── 4. Creative Telemetry HUD & Status ── */}
      <div className="relative z-10 space-y-3.5 max-w-sm px-4 pt-6">
        {/* Brand System Chip with Dynamic Equalizer Bars */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#12121A]/90 border border-black/8 dark:border-white/10 shadow-xs backdrop-blur-md">
          {/* Dynamic Audio/Collaboration Equalizer Bars */}
          <div className="flex items-center gap-0.5 h-3">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  height: ["30%", "100%", "40%"],
                }}
                transition={{
                  duration: 0.8 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-0.5 rounded-full bg-[#FFD21F]"
              />
            ))}
          </div>

          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#0A0A0E] dark:text-white">
            {label || "ABEYCOLLAB // NEXUS 2.0"}
          </span>
        </div>

        {/* Phase Subtitle with AnimatePresence slide */}
        <div className="h-5 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phaseIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="text-xs sm:text-sm font-medium text-[#5A5A68] dark:text-[#9A9AB0] font-sans truncate"
            >
              {subtext || TELEMETRY_PHRASES[phaseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Continuous Fluid Shimmer Track (No fake stuck percentages) */}
        {showProgress && (
          <div className="w-44 sm:w-52 h-1 rounded-full bg-black/8 dark:bg-white/10 overflow-hidden mx-auto relative">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="w-1/2 h-full rounded-full bg-gradient-to-r from-transparent via-[#FFD21F] to-transparent shadow-[0_0_8px_#FFD21F]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
