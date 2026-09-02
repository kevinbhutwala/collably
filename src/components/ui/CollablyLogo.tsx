"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CollablyLogoProps {
  variant?: "full" | "icon" | "badge" | "minimal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
  subtext?: string;
  showTag?: boolean;
  theme?: "dark" | "light"; // "dark" = dark text on light background; "light" = white text on dark background
}

export function CollablyLogo({
  variant = "full",
  size = "md",
  className,
  href = "/",
  subtext = "Creator Commerce",
  showTag = false,
  theme = "dark",
}: CollablyLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-9 h-9 rounded-2xl",
    lg: "w-11 h-11 rounded-2xl",
    xl: "w-14 h-14 rounded-3xl",
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
        "relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_2px_12px_rgba(255,210,31,0.3)]",
        "bg-gradient-to-br from-[#0E0E14] via-[#161620] to-[#0A0A0E] border border-[#FFD21F]/40 text-white overflow-hidden",
        iconSizes[size]
      )}
    >
      {/* Specular Ambient Glow */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFD21F]/20 blur-md pointer-events-none" />

      {/* Collably Geometric Partnership Synergy Emblem */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%] relative z-10"
      >
        <defs>
          <linearGradient id="collablyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF280" />
            <stop offset="40%" stopColor="#FFD21F" />
            <stop offset="100%" stopColor="#FFAE00" />
          </linearGradient>
        </defs>

        {/* Creator Partnership Arc */}
        <path
          d="M34 14C30 9 22.5 8.5 16.5 13C9.5 18.5 9.5 31.5 16.5 37C22.5 41.5 30 41 34 36"
          stroke="url(#collablyGoldGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Brand Synergy Arc */}
        <path
          d="M20 20C22.5 16.5 28.5 16 33.5 20.5C38.5 25 38.5 33 33.5 37.5C28.5 42 22.5 41.5 20 38"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Escrow Hub Pulse Core */}
        <circle cx="34" cy="27" r="3.5" fill="url(#collablyGoldGrad)" />
        <circle cx="34" cy="27" r="1.5" fill="#0A0A0E" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    if (href) {
      return (
        <Link href={href} className={cn("inline-flex group", className)}>
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
            Collably
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
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export const ValenceLogo = CollablyLogo;
export const NexusLogo = CollablyLogo;
