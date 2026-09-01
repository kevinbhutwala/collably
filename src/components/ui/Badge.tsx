import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "purple" | "glow" | "carbon" | "micro" | "blue";
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
    glow: "bg-[#2A5CFF]/20 text-[#2A5CFF] border border-[#2A5CFF]/40 shadow-[0_0_10px_rgba(42,92,255,0.3)]",
    blue: "bg-[#2A5CFF]/20 text-white border border-[#2A5CFF]/40",
    micro: "bg-[#B7FF3C] text-[#07070B] border border-[#9EE61C]",
    carbon: "bg-white text-[#07070B] border border-white font-bold",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    danger: "bg-red-500/15 text-red-400 border border-red-500/30",
    purple: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
  };

  const dotStyles = {
    default: "bg-white",
    outline: "bg-white/60",
    success: "bg-emerald-400",
    glow: "bg-[#2A5CFF]",
    blue: "bg-[#2A5CFF]",
    micro: "bg-[#07070B]",
    carbon: "bg-[#07070B]",
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
