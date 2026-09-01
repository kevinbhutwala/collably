"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <div className="relative w-full rounded-3xl bg-white border border-black/8 p-8 sm:p-12 text-center overflow-hidden shadow-xs text-[#0A0A0E]">
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Hologram Icon Stage */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 rounded-full border border-dashed border-black/10 pointer-events-none"
          />

          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F8F8FC] border border-black/8 shadow-xs flex items-center justify-center text-[#0A0A0E]"
          >
            {icon}
          </motion.div>
        </div>

        {/* Text Container */}
        <div className="space-y-2">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-[11px] font-mono font-bold text-[#0A0A0E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
              <span>{badgeText}</span>
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {actionText && actionHref && (
            <Link
              href={actionHref}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-display border border-black/10"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </Link>
          )}

          {actionText && onActionClick && !actionHref && (
            <button
              onClick={onActionClick}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-display border border-black/10"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
            </button>
          )}

          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center font-display border border-black/8"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
