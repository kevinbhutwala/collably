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
        "p-6 rounded-3xl bg-[#120c16] border border-white/10 hover:border-[hsl(327,100%,50%)]/40 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden text-white",
        className
      )}
    >
      {/* Subtle Corner Glow Accent */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[radial-gradient(closest-side,hsl(327_100%_46%/0.25),transparent)] rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between relative z-10">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          {title}
        </p>
        {icon && (
          <div className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[hsl(327,100%,55%)] shadow-xs transition-all duration-200 group-hover:scale-105">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
          {value}
        </h3>

        {change && (
          <div
            className={cn(
              "inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-lg font-mono shadow-xs",
              trend === "up" && "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
              trend === "down" && "bg-rose-500/15 text-rose-300 border border-rose-500/30",
              trend === "neutral" && "bg-white/10 text-slate-300 border border-white/10"
            )}
          >
            {trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend === "down" && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-400 font-sans relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
}
