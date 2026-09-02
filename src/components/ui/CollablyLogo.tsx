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
  theme?: "dark" | "light"; // "dark" means dark text on light background; "light" means white text on dark background
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
        "relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-[0_2px_12px_rgba(255,210,31,0.25)]",
        "bg-gradient-to-br from-[#181820] to-[#08080C] border border-[#FFD21F]/50 text-white overflow-hidden",
        iconSizes[size]
      )}
    >
      {/* Collably Geometric Interlocking Flow Emblem with #FFD21F Core */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[68%] h-[68%]"
      >
        {/* Outer Collaboration Arc */}
        <path
          d="M45 19.5 C39 12.5 28 12 21 17.5 C13 23.5 13 36.5 21 42.5 C27.5 47.5 38 48 45 40.5"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Intersecting Dynamic Swoosh */}
        <path
          d="M26 24 C29 20 37 19.5 42 24.5 C47 29.5 46 37 40 40"
          stroke="#FFD21F"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Solar Yellow Collaboration Node */}
        <circle cx="43.5" cy="32" r="5" fill="#FFD21F" />
        <circle cx="43.5" cy="32" r="2.2" fill="#FFFFFF" />
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
              "font-extrabold font-display flex items-center tracking-tight leading-none",
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
              "text-[11px] font-medium tracking-tight mt-0.5 leading-none hidden sm:inline font-sans",
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
