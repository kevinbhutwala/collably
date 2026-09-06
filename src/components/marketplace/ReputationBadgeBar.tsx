"use client";

import React, { useState } from "react";
import { ReputationBadge } from "@/core/types";

interface ReputationBadgeBarProps {
  badges: ReputationBadge[];
  maxVisible?: number;
  className?: string;
  size?: "sm" | "md";
}

export function ReputationBadgeBar({
  badges,
  maxVisible = 3,
  className = "",
  size = "sm",
}: ReputationBadgeBarProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (!badges || badges.length === 0) return null;

  const visibleBadges = badges.slice(0, maxVisible);
  const overflowCount = badges.length - maxVisible;

  const isSmall = size === "sm";

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visibleBadges.map((badge) => (
        <div
          key={badge.id}
          className="relative inline-flex items-center"
          onMouseEnter={() => setActiveTooltip(badge.id)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <span
            className={`inline-flex items-center gap-1 rounded-full font-medium transition-transform hover:scale-105 ${
              isSmall ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
            } ${badge.colorTheme.bg} ${badge.colorTheme.border} border ${badge.colorTheme.text}`}
          >
            <span className="text-[12px]">{badge.icon}</span>
            <span>{badge.label}</span>
          </span>

          {/* Interactive Tooltip */}
          {activeTooltip === badge.id && (
            <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl border border-white/15 bg-[#0E0E14] p-2.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-1.5 font-semibold text-white text-xs">
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-300">
                {badge.description}
              </p>
              {badge.qualificationProof && (
                <div className="mt-1.5 rounded-md bg-white/5 px-2 py-1 text-[10px] font-mono text-[#FFD21F]">
                  Proof: {badge.qualificationProof}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {overflowCount > 0 && (
        <span
          className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 font-medium text-neutral-400 ${
            isSmall ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
          }`}
          title={`${overflowCount} more badges`}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
}
