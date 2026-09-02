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
        "p-5 sm:p-6 rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 relative group overflow-hidden text-[#0A0A0E]",
        className
      )}
    >
      {/* Subtle inner warm glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFD21F]/0 to-[#FFD21F]/0 group-hover:from-[#FFD21F]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#6A6A78] font-mono">
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-xl bg-[#F4F4F8] border border-black/6 shadow-2xs group-hover:scale-105 transition-transform">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-2 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display numeric-tabular">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shadow-2xs",
              trend === "up" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
              trend === "down" && "bg-red-50 text-red-700 border border-red-200",
              trend === "neutral" && "bg-[#F4F4F8] text-[#6A6A78] border border-black/8"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-[11px] text-[#7A7A8A] mt-2 font-sans relative z-10">{subtitle}</p>
      )}
    </div>
  );
}
