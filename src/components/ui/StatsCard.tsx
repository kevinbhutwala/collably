import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend = "up",
  subtitle,
  icon,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 relative group overflow-hidden text-[#0B0A14] dark:text-[#F4F4F8] flex flex-col justify-between min-h-[164px]",
        className
      )}
    >
      {/* Subtle inner emerald glow on hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500/0 to-transparent group-hover:from-emerald-500/5 transition-all duration-500 pointer-events-none" />

      {/* Top Header: Title & Icon */}
      <div>
        <div className="flex items-start justify-between relative z-10 gap-2 min-h-[32px]">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] font-mono leading-snug line-clamp-2">
            {title}
          </p>
          {icon && (
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#F4F4F8] dark:bg-[#181824] border border-black/6 dark:border-white/10 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* Primary Metric Number: Full width, NEVER truncated */}
        <div className="mt-2.5 sm:mt-3 relative z-10">
          <h3
            className={cn(
              "font-black text-[#0B0A14] dark:text-white tracking-tight font-display numeric-tabular leading-none whitespace-nowrap",
              typeof value === "string" && value.length > 12
                ? "text-xl sm:text-2xl"
                : typeof value === "string" && value.length > 8
                ? "text-2xl sm:text-3xl"
                : "text-2xl sm:text-3xl lg:text-[32px]"
            )}
          >
            {value}
          </h3>
        </div>
      </div>

      {/* Footer Info: Badge and/or Subtitle */}
      <div className="mt-3.5 pt-2.5 border-t border-black/5 dark:border-white/5 flex flex-col gap-1.5 relative z-10">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {change && (
            <div
              className={cn(
                "inline-flex items-center text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full font-mono shadow-2xs shrink-0",
                trend === "up" && "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800",
                trend === "down" && "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200/80 dark:border-red-800",
                trend === "neutral" && "bg-[#F4F4F8] dark:bg-[#181824] text-[#6A6A78] dark:text-[#8E8EA4] border border-black/8 dark:border-white/10"
              )}
            >
              {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5 shrink-0" />}
              {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5 shrink-0" />}
              <span>{change}</span>
            </div>
          )}

          {subtitle && (
            <p className="text-[10px] sm:text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-sans leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
