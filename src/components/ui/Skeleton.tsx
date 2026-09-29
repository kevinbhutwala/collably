"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "rounded" | "pill";
  shimmer?: boolean;
}

export function Skeleton({
  className,
  variant = "rounded",
  shimmer = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black/[0.06] dark:bg-white/[0.08]",
        variant === "circular" && "rounded-full",
        variant === "rounded" && "rounded-2xl",
        variant === "pill" && "rounded-full",
        variant === "rectangular" && "rounded-none",
        shimmer &&
          "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/40 dark:after:via-white/10 after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 2,
  className,
  lastLineWidth = "60%",
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3.5 w-full rounded-md"
          style={i === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-10 h-10 rounded-2xl",
    lg: "w-14 h-14 rounded-2xl",
    xl: "w-20 h-20 rounded-full",
  }[size];

  return <Skeleton variant="circular" className={cn(sizeClasses, className)} />;
}

export function SkeletonButton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={cn("h-10 w-28 rounded-full", className)} />;
}
