import React from "react";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";

export function StatsSection() {
  const stats = [
    { label: "Platform GMV Processed", value: formatCurrency(MOCK_ANALYTICS.totalGMV) },
    { label: "Verified Top Creators", value: "1,400+" },
    { label: "Average Brand ROI", value: "4.8x" },
    { label: "Audited Reach Delivered", value: formatNumber(MOCK_ANALYTICS.impressionsDelivered) },
  ];

  return (
    <section className="py-20 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-mono tracking-tight">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
