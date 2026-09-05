"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AbeyCollabLogoProps {
  variant?: "full" | "icon" | "badge" | "minimal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  subtext?: string;
  showTag?: boolean;
  theme?: "dark" | "light"; // "dark" = dark text on light background; "light" = white text on dark background
}

/**
 * AbeyCollab Nexus Symbol
 * An interlocking dynamic "A" where Creator energy (Solar Yellow arch)
 * clasps with Brand precision (Brilliant White dialogue loop) around
 * the central Deal Core node.
 */
export function AbeyCollabSymbol({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <defs>
        {/* Creator Solar Energy Gradient */}
        <linearGradient id="abeySolarGradient" x1="12" y1="10" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="45%" stopColor="#FFD21F" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>

        {/* Brand Synergy Brilliant White Gradient */}
        <linearGradient id="abeyBrandGradient" x1="16" y1="18" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Core Deal Vault Radial Glow */}
        <radialGradient id="abeyCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="60%" stopColor="#FFD21F" />
          <stop offset="100%" stopColor="#E6A800" />
        </radialGradient>
      </defs>

      {/* ── 1. The Dynamic "A" Arch (Creator Energy & Pillar) ── */}
      {/* Sweeps up from bottom-left (12, 38) over the apex (24, 9.5) and down to (36, 38) */}
      <path
        d="M 12 37.5 L 21.8 12.2 C 22.7 9.8 25.3 9.8 26.2 12.2 L 36 37.5"
        stroke="url(#abeySolarGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── 2. The Interlocking Collaboration Loop (Brand Synergy & Dialogue Bridge) ── */}
      {/* Forms the interlocking crossbar and wraps seamlessly through the center */}
      <path
        d="M 16.5 28.5 C 16.5 22.5 23 21 27.5 23.5 C 32 26 33.5 31.5 29.5 34 C 25.5 36.5 19.5 33 19.5 27 C 19.5 22.5 25.5 20.5 31.5 24"
        stroke="url(#abeyBrandGradient)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── 3. The Central Deal Core (Escrow Vault & Agreement Node) ── */}
      <circle cx="24.5" cy="27.5" r="3.2" fill="url(#abeyCoreGlow)" />
      <circle cx="24.5" cy="27.5" r="1.3" fill="#0A0A0E" />
    </svg>
  );
}

export function AbeyCollabLogo({
  variant = "full",
  size = "md",
  className,
  href = "/",
  subtext = "Creator & Brand Commerce",
  showTag = false,
  theme = "dark",
}: AbeyCollabLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-9 h-9 rounded-2xl",
    lg: "w-11 h-11 rounded-2xl",
    xl: "w-14 h-14 rounded-3xl",
  };

  const symbolPixelSizes = {
    sm: 22,
    md: 26,
    lg: 32,
    xl: 40,
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-xl tracking-tight",
    xl: "text-2xl tracking-tighter",
  };

  const isLight = theme === "light";

  const logoIcon = (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_2px_14px_rgba(255,210,31,0.28)]",
        "bg-gradient-to-br from-[#121218] via-[#181822] to-[#0A0A0E] border border-[#FFD21F]/40 text-white overflow-hidden",
        iconSizes[size]
      )}
    >
      {/* Specular Ambient Glow */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFD21F]/20 blur-md pointer-events-none" />

      {/* Bespoke AbeyCollab Emblem */}
      <AbeyCollabSymbol size={symbolPixelSizes[size]} className="relative z-10" />
    </div>
  );

  if (variant === "icon") {
    if (href) {
      return (
        <Link href={href} className={cn("inline-flex group", className)} aria-label="AbeyCollab Home">
          {logoIcon}
        </Link>
      );
    }
    return logoIcon;
  }

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none group", className)}>
      {logoIcon}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-black font-display flex items-center tracking-tight leading-none",
              isLight ? "text-white" : "text-[#0A0A0E]",
              textSizes[size]
            )}
          >
            AbeyCollab
          </span>
          {showTag && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-extrabold tracking-wider leading-none shadow-[0_0_10px_rgba(255,210,31,0.4)]">
              PRO
            </span>
          )}
        </div>
        {subtext && variant !== "minimal" && (
          <span
            className={cn(
              "text-[11px] font-semibold tracking-tight mt-0.5 leading-none hidden sm:inline font-sans",
              isLight ? "text-white/60" : "text-[#6A6A78]"
            )}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} aria-label="AbeyCollab Home">{content}</Link>;
  }

  return content;
}

// Backwards-compatible aliases
export const CollablyLogo = AbeyCollabLogo;
export const ValenceLogo = AbeyCollabLogo;
export const NexusLogo = AbeyCollabLogo;
export default AbeyCollabLogo;
