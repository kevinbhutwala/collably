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
  theme?: "dark" | "light" | "auto";
}

/**
 * AbeyCollab Logo — uses the official uploaded brand logo image.
 * Icon variant: square logo crop; Full/default variant: full logo with wordmark.
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
        "relative flex items-center justify-center shrink-0 select-none overflow-hidden rounded-xl transition-all duration-300",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="AbeyCollab Emblem"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
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
  subtext,
  showTag = false,
  theme = "auto",
}: AbeyCollabLogoProps) {
  const iconSizes = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  const fullLogoHeights = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
    xl: "h-18",
  };

  // Icon-only variant: show just a square crop of the logo
  const logoIcon = (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105",
        iconSizes[size]
      )}
      style={{ aspectRatio: "1" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
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

  // Full variant: show the full logo image (includes wordmark)
  const fullLogo = (
    <div className={cn("relative inline-flex items-center shrink-0 overflow-hidden select-none group", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.jpg"
        alt="AbeyCollab — Creator Collaboration Platform"
        className={cn("object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]", fullLogoHeights[size])}
        loading="eager"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="AbeyCollab Home" className="inline-flex">
        {fullLogo}
      </Link>
    );
  }

  return fullLogo;
}

// Backwards-compatible aliases
export const CollablyLogo = AbeyCollabLogo;
export const ValenceLogo = AbeyCollabLogo;
export const NexusLogo = AbeyCollabLogo;
export default AbeyCollabLogo;
