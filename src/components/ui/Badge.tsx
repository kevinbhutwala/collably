import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "purple" | "glow" | "carbon" | "micro" | "blue" | "gold";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 rounded-full gap-1 font-mono font-bold",
    md: "text-xs px-2.5 py-1 rounded-full gap-1.5 font-mono font-bold",
  };

  const variantStyles = {
    default: "bg-black/5 dark:bg-white/10 text-[#0A0A0E] dark:text-white border border-black/10 dark:border-white/15 shadow-xs",
    outline: "bg-black/[0.03] dark:bg-white/[0.04] text-[#5A5A68] dark:text-white/70 border border-black/10 dark:border-white/10",
    success: "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 dark:border-emerald-500/30",
    glow: "bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] border border-[#FFD21F]/40 shadow-[0_0_12px_rgba(255,210,31,0.35)]",
    gold: "bg-[#FFD21F] text-[#0A0A0E] font-bold border border-black/10 dark:border-white/40 shadow-[0_0_10px_rgba(255,210,31,0.3)]",
    blue: "bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] border border-[#FFD21F]/30",
    micro: "bg-[#FFD21F] text-[#0A0A0E] font-bold border border-[#FFE052]",
    carbon: "bg-[#0A0A0E] text-white dark:bg-white dark:text-[#0A0A0E] border border-black/10 dark:border-white font-bold",
    warning: "bg-amber-500/10 dark:bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/25 dark:border-amber-500/30",
    danger: "bg-red-500/10 dark:bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/25 dark:border-red-500/30",
    purple: "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/25 dark:border-indigo-500/30",
  };

  const dotStyles = {
    default: "bg-[#0A0A0E] dark:bg-white",
    outline: "bg-[#5A5A68] dark:bg-white/60",
    success: "bg-emerald-500 dark:bg-emerald-400",
    glow: "bg-[#FFD21F]",
    gold: "bg-[#0A0A0E]",
    blue: "bg-[#FFD21F]",
    micro: "bg-[#0A0A0E]",
    carbon: "bg-white dark:bg-[#0A0A0E]",
    warning: "bg-amber-500 dark:bg-amber-400",
    danger: "bg-red-500 dark:bg-red-400",
    purple: "bg-indigo-500 dark:bg-indigo-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotStyles[variant])} />}
      {children}
    </div>
  );
}
