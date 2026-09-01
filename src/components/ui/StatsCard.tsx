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
        "p-5 sm:p-6 rounded-3xl bg-[#0E0C15]/90 border border-white/10 hover:border-white/25 shadow-2xl backdrop-blur-xl transition-all duration-300 relative group overflow-hidden text-white",
        className
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 font-mono">
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white shadow-xs group-hover:scale-105 transition-transform">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-2 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display numeric-tabular">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shadow-xs",
              trend === "up" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
              trend === "down" && "bg-red-500/20 text-red-400 border border-red-500/30",
              trend === "neutral" && "bg-white/10 text-white/70 border border-white/10"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-white/50 font-normal font-sans relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
}
