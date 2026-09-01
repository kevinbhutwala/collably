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
    <div className="relative w-full rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 sm:p-12 text-center overflow-hidden shadow-xs text-[#111111]">
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Hologram Icon Stage */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full border border-dashed border-[#E7E7E4] pointer-events-none"
          />

          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] shadow-xs flex items-center justify-center text-[#111111]"
          >
            {icon}
          </motion.div>
        </div>

        {/* Text Container */}
        <div className="space-y-2">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[11px] font-mono font-bold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
              <span>{badgeText}</span>
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight font-display">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {actionText && actionHref && (
            <Link
              href={actionHref}
              className="w-full sm:w-auto px-6 py-2.5 rounded-[9px] bg-[#111111] hover:bg-[#222222] text-[#FAFAF8] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 text-[#B7FF3C]" />
            </Link>
          )}

          {actionText && onActionClick && !actionHref && (
            <button
              onClick={onActionClick}
              className="w-full sm:w-auto px-6 py-2.5 rounded-[9px] bg-[#111111] hover:bg-[#222222] text-[#FAFAF8] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 text-[#B7FF3C]" />
            </button>
          )}

          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto px-5 py-2.5 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] text-[#111111] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center font-display border border-[#E7E7E4]"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
