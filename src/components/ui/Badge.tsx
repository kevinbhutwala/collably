import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "purple" | "glow";
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
    sm: "text-[11px] px-2 py-0.5 rounded-full gap-1 font-medium",
    md: "text-xs px-2.5 py-1 rounded-full gap-1.5 font-medium",
  };

  const variantStyles = {
    default: "bg-white/10 text-slate-200 border border-white/10",
    outline: "bg-white/[0.04] text-slate-300 border border-white/20",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    purple: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
    glow: "bg-pink-500/15 text-pink-300 border border-pink-500/30 font-semibold shadow-xs",
  };

  const dotStyles = {
    default: "bg-slate-400",
    outline: "bg-slate-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    danger: "bg-rose-400",
    purple: "bg-purple-400",
    glow: "bg-pink-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center select-none shadow-xs",
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
