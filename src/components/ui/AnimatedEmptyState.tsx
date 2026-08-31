"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface AnimatedEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  secondaryText?: string;
  secondaryHref?: string;
  badgeText?: string;
}

export function AnimatedEmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  secondaryText,
  secondaryHref,
  badgeText = "Pipeline Ready",
}: AnimatedEmptyStateProps) {
  return (
    <div className="relative w-full rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 text-center overflow-hidden shadow-card">
      {/* Soft Ambient Mesh Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-radial from-orange-200/35 via-rose-100/20 to-transparent blur-[80px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Animated Floating Hologram Icon Stage */}
        <div className="relative flex items-center justify-center">
          {/* Animated Outer Concentric Pulse Rings */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full border border-dashed border-brand-accent/40 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-32 h-32 rounded-full border border-orange-300/30 pointer-events-none"
          />

          {/* Floating Central Holographic Bubble */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-brand-accent via-rose-500 to-amber-500 p-[1.5px] shadow-xl shadow-brand-accent/20 flex items-center justify-center"
          >
            <div className="w-full h-full bg-white rounded-[inherit] flex items-center justify-center text-brand-accent">
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Text Container */}
        <div className="space-y-2">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-mono font-bold text-brand-accent shadow-xs">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {actionText && actionHref && (
            <Link
              href={actionHref}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-accent/20 active:scale-95 transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {actionText && onActionClick && !actionHref && (
            <button
              onClick={onActionClick}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-accent/20 active:scale-95 transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center font-display"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
