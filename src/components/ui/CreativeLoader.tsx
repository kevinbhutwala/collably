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

const WORKFLOW_STEPS = [
  "Synchronizing milestone escrow vaults...",
  "Auditing verified creator telemetry...",
  "Calibrating 4K ProRes deliverable rails...",
  "Securing cryptographic session tokens...",
  "Initializing high-impact brief matching...",
];

export function CreativeLoader({
  label,
  subtext,
  size = "md",
  className = "",
  showProgress = true,
}: CreativeLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94; // Hold near completion until unmounted
        return prev + Math.floor(Math.random() * 10) + 4;
      });
    }, 350);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const isFullscreen = size === "fullscreen";

  const containerSizes = {
    sm: "py-6 gap-3",
    md: "py-10 gap-4",
    lg: "py-16 gap-6",
    fullscreen: "min-h-screen fixed inset-0 z-50 bg-[#F8F8FB]/95 backdrop-blur-2xl flex flex-col justify-center items-center p-6",
  };

  const orbSizes = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    fullscreen: "w-24 h-24 sm:w-28 sm:h-28",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center select-none font-sans text-center ${containerSizes[size]} ${className}`}
    >
      {/* Background Soft Solar Aura (for fullscreen or large) */}
      {(isFullscreen || size === "lg") && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD21F]/25 via-[#FFAE00]/15 to-transparent blur-3xl pointer-events-none"
        />
      )}

      {/* ── Kinetic Dual-Orbit Engine ── */}
      <div className={`relative flex items-center justify-center ${orbSizes[size]}`}>
        {/* Outer Kinetic Track (Clockwise Rotation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-[#FFD21F]/60 p-1"
        >
          {/* Orbiting Satellite Particle 1 */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFAE00] shadow-[0_0_12px_#FFD21F] -top-1.5 left-1/2 -translate-x-1/2 absolute"
          />
        </motion.div>

        {/* Counter-Clockwise Outer Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2.5 rounded-full border border-black/8"
        >
          {/* Orbiting Dark Obsidian Node */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#0A0A0E] -bottom-1 left-1/2 -translate-x-1/2 absolute shadow-xs" />
        </motion.div>

        {/* Pulsing Central Glass Emblem */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 0 20px rgba(255, 210, 31, 0.35)",
              "0 0 40px rgba(255, 210, 31, 0.7)",
              "0 0 20px rgba(255, 210, 31, 0.35)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0E0E14] via-[#161620] to-[#0A0A0E] border border-[#FFD21F]/60 flex items-center justify-center relative z-10 shadow-xl overflow-hidden p-2.5"
        >
          {/* Glowing Center Synergy SVG Mark */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="loaderGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF280" />
                <stop offset="40%" stopColor="#FFD21F" />
                <stop offset="100%" stopColor="#FFAE00" />
              </linearGradient>
            </defs>

            {/* Creator Arc */}
            <path
              d="M34 14C30 9 22.5 8.5 16.5 13C9.5 18.5 9.5 31.5 16.5 37C22.5 41.5 30 41 34 36"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Brand Arc */}
            <path
              d="M20 20C22.5 16.5 28.5 16 33.5 20.5C38.5 25 38.5 33 33.5 37.5C28.5 42 22.5 41.5 20 38"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pulse Center Node */}
            <circle cx="34" cy="27" r="3.5" fill="url(#loaderGoldGrad)" />
            <circle cx="34" cy="27" r="1.5" fill="#0A0A0E" />
          </svg>

          {/* Internal Specular Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* ── Status Messages & Dynamic Typography ── */}
      <div className="space-y-2 relative z-10 max-w-sm px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-ping" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A0A0E]">
            {label || "Collably Engine Active"}
          </span>
        </div>

        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm font-semibold text-[#5A5A68] font-sans"
            >
              {subtext || WORKFLOW_STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Shimmer Progress Bar with Glowing Pulse Tip */}
        {showProgress && (
          <div className="w-48 sm:w-56 h-1.5 rounded-full bg-[#EAEAEF] overflow-hidden mx-auto mt-3 relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFAE00] relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            >
              {/* Glowing leading light */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full shadow-[0_0_8px_#FFFFFF]" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
