"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  className?: string;
}

export function Avatar({ src, name, size = "md", verified = false, className }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const sizeMap = {
    xs: { dim: 24, text: "text-[10px]", cls: "w-6 h-6" },
    sm: { dim: 32, text: "text-xs", cls: "w-8 h-8" },
    md: { dim: 44, text: "text-sm", cls: "w-11 h-11" },
    lg: { dim: 64, text: "text-lg", cls: "w-16 h-16" },
    xl: { dim: 96, text: "text-2xl", cls: "w-24 h-24" },
  };

  const getInitials = (n: string) => {
    if (!n) return "CB";
    return n
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn("relative inline-block shrink-0", currentSize.cls, className)}>
      <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#120c16] flex items-center justify-center shadow-sm">
        {src && !hasError ? (
          <Image
            src={src}
            alt={name}
            width={currentSize.dim}
            height={currentSize.dim}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[hsl(327,100%,50%)]/20 to-[hsl(300,100%,42%)]/20 flex items-center justify-center">
            <span className={cn("font-bold text-[hsl(327,100%,55%)] font-mono", currentSize.text)}>
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 bg-[#0a070a] rounded-full p-0.5 text-sky-400 shadow-sm border border-white/10">
          <CheckCircle2 className="w-3.5 h-3.5 fill-sky-500 text-white" />
        </span>
      )}
    </div>
  );
}
