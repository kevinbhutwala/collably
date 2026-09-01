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
    default: "bg-white/10 text-white border border-white/15 shadow-xs",
    outline: "bg-white/[0.04] text-white/70 border border-white/10",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    glow: "bg-[#FFD21F]/20 text-[#FFD21F] border border-[#FFD21F]/40 shadow-[0_0_12px_rgba(255,210,31,0.35)]",
    gold: "bg-[#FFD21F] text-[#0A0A0E] font-bold border border-white/40 shadow-[0_0_10px_rgba(255,210,31,0.3)]",
    blue: "bg-[#FFD21F]/15 text-[#FFD21F] border border-[#FFD21F]/30",
    micro: "bg-[#FFD21F] text-[#0A0A0E] font-bold border border-[#FFE052]",
    carbon: "bg-white text-[#0A0A0E] border border-white font-bold",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    danger: "bg-red-500/15 text-red-400 border border-red-500/30",
    purple: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
  };

  const dotStyles = {
    default: "bg-white",
    outline: "bg-white/60",
    success: "bg-emerald-400",
    glow: "bg-[#FFD21F]",
    gold: "bg-[#0A0A0E]",
    blue: "bg-[#FFD21F]",
    micro: "bg-[#0A0A0E]",
    carbon: "bg-[#0A0A0E]",
    warning: "bg-amber-400",
    danger: "bg-red-400",
    purple: "bg-indigo-400",
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
