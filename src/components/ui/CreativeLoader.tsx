"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

interface CreativeLoaderProps {
  label?: string;
  subtext?: string;
  size?: "sm" | "md" | "lg" | "fullscreen";
  className?: string;
  showProgress?: boolean;
}

const DYNAMIC_STATUSES = [
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
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % DYNAMIC_STATUSES.length);
    }, 2200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return 92; // hold near 100% until unmounted
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 400);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const isFullscreen = size === "fullscreen";

  const containerSizes = {
    sm: "py-6 gap-3",
    md: "py-10 gap-4",
    lg: "py-16 gap-6",
    fullscreen: "min-h-screen fixed inset-0 z-50 bg-white/95 backdrop-blur-2xl flex-col justify-center items-center p-6",
  };

  const orbSizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    fullscreen: "w-20 h-20 sm:w-24 sm:h-24",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center select-none font-sans text-center ${containerSizes[size]} ${className}`}
    >
      {/* Background Ambient Solar Flare (for fullscreen/large) */}
      {(isFullscreen || size === "lg") && (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#FFD21F]/30 via-[#FFAE00]/15 to-transparent blur-3xl pointer-events-none"
        />
      )}

      {/* ── Solar Vault Orbital Engine ── */}
      <div className={`relative flex items-center justify-center ${orbSizes[size]}`}>
        {/* Outer Orbital Track 1 (Clockwise Rotation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-[#FFD21F]/40 p-1"
        >
          {/* Orbiting Satellite Particle 1 */}
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFAE00] shadow-[0_0_10px_#FFD21F] -top-1.5 left-1/2 -translate-x-1/2 absolute"
          />
        </motion.div>

        {/* Outer Orbital Track 2 (Counter-Clockwise Rotation) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2.5 rounded-full border border-[#0A0A0E]/10"
        >
          {/* Orbiting Satellite Particle 2 */}
          <div className="w-2 h-2 rounded-full bg-[#0A0A0E] -bottom-1 left-1/2 -translate-x-1/2 absolute shadow-xs" />
        </motion.div>

        {/* Pulsing Luminous Gold Core Badge */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 0 20px rgba(255, 210, 31, 0.35)",
              "0 0 35px rgba(255, 210, 31, 0.7)",
              "0 0 20px rgba(255, 210, 31, 0.35)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-2xl bg-gradient-to-br from-[#FFD21F] via-[#FFE052] to-[#FFC700] border border-black/10 flex items-center justify-center text-[#0A0A0E] relative z-10 shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-1/2 h-1/2 fill-[#0A0A0E] text-[#0A0A0E]" />
          </motion.div>

          {/* Internal Solar Specular Reflection */}
          <div className="absolute top-1 left-1 right-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* ── Status Messages & Dynamic Typography ── */}
      <div className="space-y-2 relative z-10 max-w-sm px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF5] border border-[#FFD21F]/50 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-ping" />
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#0A0A0E]">
            {label || "Collably Engine Active"}
          </span>
        </div>

        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm font-medium text-[#5A5A68] font-sans"
            >
              {subtext || DYNAMIC_STATUSES[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar with Solar Flare Tip */}
        {showProgress && (
          <div className="w-48 sm:w-56 h-1.5 rounded-full bg-[#F0F0F5] border border-black/5 overflow-hidden mx-auto mt-3 relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFAE00] relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            >
              {/* Glowing tip light */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#FFFFFF]" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
