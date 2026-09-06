"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Zap, Trophy, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustIndicatorsBarProps {
  type: "creator" | "brand";
  id?: string;
  fallbackIndicators?: string[];
  className?: string;
}

export function TrustIndicatorsBar({
  type,
  id,
  fallbackIndicators,
  className,
}: TrustIndicatorsBarProps) {
  const [indicators, setIndicators] = useState<string[]>(
    fallbackIndicators ||
      (type === "creator"
        ? [
            "✓ Identity Verified",
            "✓ Social Verified",
            "✓ 97% Completion",
            "⚡ Responds within 4h",
            "🏆 12 Successful Collaborations",
          ]
        : [
            "✓ Verified Brand",
            "✓ Payment Verified",
            "⚡ Fast Approver",
            "🏆 24 Successful Campaigns",
          ])
  );

  useEffect(() => {
    if (id) {
      fetch(`/api/reputation?type=${type}&id=${encodeURIComponent(id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.reputation?.trustIndicators) {
            setIndicators(data.reputation.trustIndicators);
          }
        })
        .catch((err) => console.error("Trust indicators fetch error:", err));
    }
  }, [type, id]);

  const getIcon = (text: string) => {
    if (text.includes("⚡") || text.includes("Responds") || text.includes("Approver")) {
      return <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    }
    if (text.includes("🏆") || text.includes("Successful")) {
      return <Trophy className="w-3.5 h-3.5 text-[#A37F00] dark:text-[#FFD21F] shrink-0" />;
    }
    if (text.includes("Payment") || text.includes("Completion")) {
      return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />;
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 select-none font-sans", className)}>
      {indicators.map((ind, idx) => {
        const cleanText = ind.replace(/^[✓⚡🏆]\s*/, "");
        return (
          <div
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#1C1C28] border border-black/8 dark:border-white/10 shadow-2xs text-xs font-bold text-[#0A0A0E] dark:text-white transition-all hover:border-[#FFD21F]"
          >
            {getIcon(ind)}
            <span className="font-mono text-[11px]">{cleanText}</span>
          </div>
        );
      })}
    </div>
  );
}
