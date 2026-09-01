import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "purple" | "glow" | "carbon" | "micro";
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
    sm: "text-[10px] px-2 py-0.5 rounded-md gap-1 font-mono font-bold",
    md: "text-xs px-2.5 py-1 rounded-md gap-1.5 font-mono font-bold",
  };

  const variantStyles = {
    default: "bg-[#FFFFFF] text-[#111111] border border-[#E7E7E4] shadow-xs",
    outline: "bg-[#FAFAF8] text-[#6B6B6B] border border-[#E7E7E4]",
    success: "bg-[#B7FF3C] text-[#111111] border border-[#9EE61C]",
    glow: "bg-[#B7FF3C] text-[#111111] border border-[#9EE61C] shadow-xs",
    micro: "bg-[#B7FF3C] text-[#111111] border border-[#9EE61C]",
    carbon: "bg-[#111111] text-[#FAFAF8] border border-[#111111]",
    warning: "bg-[#FEF9C3] text-[#713F12] border border-[#FEF08A]",
    danger: "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]",
    purple: "bg-[#111111] text-[#B7FF3C] border border-[#111111]",
  };

  const dotStyles = {
    default: "bg-[#111111]",
    outline: "bg-[#6B6B6B]",
    success: "bg-[#111111]",
    glow: "bg-[#111111]",
    micro: "bg-[#111111]",
    carbon: "bg-[#B7FF3C]",
    warning: "bg-[#854D0E]",
    danger: "bg-[#B91C1C]",
    purple: "bg-[#B7FF3C]",
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
