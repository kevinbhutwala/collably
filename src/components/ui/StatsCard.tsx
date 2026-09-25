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
        "p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 relative group overflow-hidden text-[#0A0A0E] dark:text-[#F4F4F8]",
        className
      )}
    >
      {/* Subtle inner warm glow on hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFD21F]/0 to-[#FFD21F]/0 group-hover:from-[#FFD21F]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      <div className="flex items-center justify-between relative z-10 gap-2">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] font-mono truncate">
          {title}
        </p>
        {icon && (
          <div className="p-1.5 sm:p-2 rounded-xl bg-[#F4F4F8] dark:bg-[#181824] border border-black/6 dark:border-white/10 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2.5 sm:mt-3.5 flex flex-wrap items-baseline justify-between gap-1.5 sm:gap-2 relative z-10">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display numeric-tabular truncate max-w-full">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shadow-2xs shrink-0",
              trend === "up" && "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
              trend === "down" && "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800",
              trend === "neutral" && "bg-[#F4F4F8] dark:bg-[#181824] text-[#6A6A78] dark:text-[#8E8EA4] border border-black/8 dark:border-white/10"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] mt-2 font-sans relative z-10">{subtitle}</p>
      )}
    </div>
  );
}
