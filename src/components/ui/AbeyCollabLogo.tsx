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
  theme?: "dark" | "light" | "auto"; // "dark" = dark text on light background; "light" = white text on dark background; "auto" = responsive
}

/**
 * AbeyCollab Handshake "A" Emblem
 * An interlocking geometric "A" where the Creator Solar Gold arm
 * clasps in a stylized partnership handshake with the Brand Platinum White arm.
 */
export function AbeyCollabSymbol({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 select-none overflow-hidden rounded-xl bg-[#181b22] border border-[#FFD21F]/35 shadow-[0_2px_12px_rgba(255,210,31,0.22)] transition-all duration-300",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="AbeyCollab Emblem"
    >
      {/* Ambient solar gold glow */}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FFD21F]/25 blur-sm pointer-events-none" />

      {/* Handshake "A" emblem asset */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/branding/abeycollab-icon-square.png"
        alt="AbeyCollab"
        width={size}
        height={size}
        className="w-full h-full object-cover select-none"
        loading="eager"
      />
    </div>
  );
}

export function AbeyCollabLogo({
  variant = "full",
  size = "md",
  className,
  href = "/",
  subtext = "CREATOR COLLABORATION PLATFORM",
  showTag = false,
  theme = "auto",
}: AbeyCollabLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl",
    xl: "w-16 h-16 rounded-3xl",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tight",
    xl: "text-3xl tracking-tighter",
  };

  const textColor =
    theme === "light"
      ? "text-white"
      : theme === "dark"
      ? "text-[#0A0A0E]"
      : "text-[#0A0A0E] dark:text-white";

  const subtextColor =
    theme === "light"
      ? "text-white/65"
      : theme === "dark"
      ? "text-[#6A6A78]"
      : "text-[#6A6A78] dark:text-[#A0A0B4]";

  const logoIcon = (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_2px_14px_rgba(255,210,31,0.28)]",
        "bg-[#181b22] border border-[#FFD21F]/40 text-white overflow-hidden",
        iconSizes[size]
      )}
    >
      {/* Specular Ambient Glow */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFD21F]/25 blur-md pointer-events-none" />

      {/* Handshake A Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/branding/abeycollab-icon-square.png"
        alt="AbeyCollab"
        className="w-full h-full object-cover select-none"
        loading="eager"
      />
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
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={cn(
              "font-black font-display tracking-tight leading-none transition-colors",
              textColor,
              textSizes[size]
            )}
          >
            Abey
            <span className="relative inline-block text-[#FFD21F] ml-[1px]">
              Collab
              <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#FFD21F] rounded-full shadow-[0_0_8px_rgba(255,210,31,0.6)]" />
            </span>
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
              "text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase mt-1.5 leading-none hidden sm:inline select-none transition-colors",
              subtextColor
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
