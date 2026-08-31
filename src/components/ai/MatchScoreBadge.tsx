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
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : isGood
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-slate-100 text-slate-700 border-slate-200";

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
