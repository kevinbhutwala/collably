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
            "w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-amber-100 via-orange-50 to-slate-100 text-slate-800 border border-slate-200 select-none",
            fallbackClassName || className
          )}
        >
          {initials ? (
            <span className="font-extrabold text-sm sm:text-base tracking-tight font-mono text-brand-accent">
              {initials}
            </span>
          ) : (
            <User className="w-6 h-6 text-slate-400" />
          )}
        </div>
      );
    }

    if (fallbackType === "brand") {
      return (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-white select-none border border-slate-700",
            fallbackClassName || className
          )}
        >
          {initials ? (
            <span className="font-extrabold text-xs sm:text-sm tracking-tight font-mono text-white">
              {initials}
            </span>
          ) : (
            <Building2 className="w-5 h-5 text-sky-400" />
          )}
        </div>
      );
    }

    if (fallbackType === "campaign") {
      return (
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-orange-50 to-slate-200 text-slate-700 select-none p-4 text-center border border-slate-200",
            fallbackClassName || className
          )}
        >
          <Sparkles className="w-8 h-8 text-brand-accent mb-2" />
          {fallbackName && (
            <span className="font-bold text-xs text-slate-800 line-clamp-1">{fallbackName}</span>
          )}
          <span className="text-[10px] text-slate-500 font-mono">NEXUS Campaign Asset</span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 border border-slate-200",
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
