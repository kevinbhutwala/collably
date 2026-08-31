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
    default: "bg-slate-100 text-slate-800 border border-slate-200",
    outline: "bg-white text-slate-700 border border-slate-300",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    danger: "bg-rose-50 text-rose-700 border border-rose-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    glow: "bg-orange-50 text-orange-600 border border-orange-200 font-semibold",
  };

  const dotStyles = {
    default: "bg-slate-500",
    outline: "bg-slate-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    purple: "bg-purple-500",
    glow: "bg-orange-500",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center select-none shadow-sm",
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
