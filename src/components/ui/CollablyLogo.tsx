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
  subtext = "Creator Commerce & Escrow",
  showTag = false,
}: CollablyLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-9 h-9 rounded-xl",
    lg: "w-11 h-11 rounded-xl",
    xl: "w-14 h-14 rounded-2xl",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-xl tracking-tight",
    xl: "text-2xl tracking-tighter",
  };

  const logoIcon = (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-102 shadow-xs",
        "bg-[#111111] text-white",
        iconSizes[size]
      )}
    >
      {/* Collably Geometric C / Flow Emblem with #B7FF3C Micro Accent Dot */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/2 h-1/2"
      >
        <path
          d="M17 8C15.5 6 13.5 5 11 5C7.13401 5 4 8.13401 4 12C4 15.866 7.13401 19 11 19C13.5 19 15.5 18 17 16"
          stroke="#FAFAF8"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="12" r="2.25" fill="#B7FF3C" />
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
              "font-extrabold text-[#111111] leading-none font-display flex items-center tracking-tight",
              textSizes[size]
            )}
          >
            Collably
          </span>
          {showTag && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-[#B7FF3C] text-[#111111] font-bold tracking-wider leading-none">
              PRO
            </span>
          )}
        </div>
        {subtext && variant !== "minimal" && (
          <span className="text-[11px] text-[#6B6B6B] font-medium tracking-tight mt-0.5 leading-none hidden sm:inline font-sans">
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
