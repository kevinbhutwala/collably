"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { User, Building2, Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackType?: "creator" | "brand" | "campaign" | "general";
  fallbackName?: string;
  fallbackClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackType = "general",
  fallbackName,
  className,
  fallbackClassName,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // If no source or error occurred, render themed dummy placeholder
  if (!src || error) {
    const initials = fallbackName
      ? fallbackName
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : null;

    if (fallbackType === "creator") {
      return (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,.88),transparent_28%),linear-gradient(145deg,#F7E4A5_0%,#E9C96C_43%,#735916_100%)] text-[#352A09] border border-black/10 select-none",
            fallbackClassName || className
          )}
        >
          {initials ? (
            <span className="font-extrabold text-sm sm:text-base tracking-tight font-mono text-brand-accent">
              {initials}
            </span>
          ) : (
            <User className="w-6 h-6 text-[#675214]/70" />
          )}
        </div>
      );
    }

    if (fallbackType === "brand") {
      return (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#24242E] via-[#101016] to-[#050507] text-white select-none border border-white/10",
            fallbackClassName || className
          )}
        >
          {initials ? (
            <span className="font-extrabold text-xs sm:text-sm tracking-tight font-mono text-white">
              {initials}
            </span>
          ) : (
            <Building2 className="w-5 h-5 text-[#FFD21F]" />
          )}
        </div>
      );
    }

    if (fallbackType === "campaign") {
      return (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9E5] via-[#F8E4A4] to-[#D6AD35] text-[#4A3908] select-none p-4 text-center border border-black/10",
            fallbackClassName || className
          )}
        >
          <Sparkles className="w-8 h-8 text-[#8A6500] mb-2" />
          {fallbackName && (
            <span className="font-bold text-xs text-[#4A3908] line-clamp-1">{fallbackName}</span>
          )}
          <span className="text-[10px] text-slate-500 font-mono">AbeyCollab Campaign Asset</span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center bg-[#F4F4F8] text-[#8A8A98] border border-black/8",
          fallbackClassName || className
        )}
      >
        <ImageIcon className="w-6 h-6" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Asset preview"}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
