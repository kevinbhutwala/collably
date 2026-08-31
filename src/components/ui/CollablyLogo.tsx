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
}

export function CollablyLogo({
  variant = "full",
  size = "md",
  className,
  href = "/",
  subtext = "Creator × Brand Collaboration Platform",
  showTag = false,
}: CollablyLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-10 h-10 rounded-2xl",
    lg: "w-12 h-12 rounded-2xl",
    xl: "w-16 h-16 rounded-3xl",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-xl tracking-tight",
    xl: "text-3xl tracking-tighter",
  };

  const logoIcon = (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-accent/25 transition-all duration-300 shadow-md shadow-brand-accent/15",
        "bg-gradient-to-tr from-brand-accent via-rose-500 to-amber-400 p-[1.5px]",
        iconSizes[size]
      )}
    >
      <div className="w-full h-full bg-[#0B0F19] rounded-[inherit] flex items-center justify-center relative overflow-hidden">
        {/* Ambient warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-amber-500/10 pointer-events-none" />

        {/* Collably Interlocking 'C' Collaborative Emblem */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 relative z-10"
        >
          {/* Outer collaborative loop */}
          <path
            d="M24 10C22.2 7.5 19.3 6 16 6C10.48 6 6 10.48 6 16C6 21.52 10.48 26 16 26C19.3 26 22.2 24.5 24 22"
            stroke="url(#collablyGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Inner spark node */}
          <circle cx="16" cy="16" r="3.2" fill="#FFFFFF" />
          <circle cx="23" cy="10" r="2" fill="#FF4D00" />
          <circle cx="23" cy="22" r="2" fill="#F59E0B" />

          <defs>
            <linearGradient id="collablyGrad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D00" />
              <stop offset="0.5" stopColor="#F43F5E" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
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
              "font-black text-slate-900 leading-none font-sans flex items-center tracking-tight",
              textSizes[size]
            )}
          >
            Collably
          </span>
          {showTag && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-brand-accent/10 text-brand-accent border border-brand-accent/20 font-bold tracking-wider leading-none">
              PRO
            </span>
          )}
        </div>
        {subtext && variant !== "minimal" && (
          <span className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5 leading-none hidden sm:inline font-sans">
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
