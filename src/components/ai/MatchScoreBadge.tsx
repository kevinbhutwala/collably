import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MatchScoreBadge({
  score,
  size = "md",
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const isExcellent = score >= 85;
  const isGood = score >= 70 && score < 85;

  const colorStyles = isExcellent
    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60"
    : isGood
    ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60"
    : "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2 font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-mono font-bold border shadow-sm select-none",
        sizeStyles[size],
        colorStyles,
        className
      )}
    >
      <Sparkles className="w-3.5 h-3.5" />
      <span>{score}% AI Match</span>
    </div>
  );
}
