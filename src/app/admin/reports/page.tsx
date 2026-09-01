"use client";

import React from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { Download } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Telemetry Reports
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Agency Financial &amp; GMV Reports
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Quarterly revenue pacing, monthly platform GMV, and creator payout statements.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/15">
          <Download className="w-4 h-4 text-[#FFD21F]" />
          <span>Download Financial Audit PDF</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <h3 className="text-base font-bold text-white font-display">Monthly Platform GMV &amp; Take-Rate Pacing</h3>

        <div className="divide-y divide-white/10 font-mono text-xs">
          {MOCK_ANALYTICS.monthlyRevenueSeries.map((m: { month: string; revenue: number; gmv: number }) => (
            <div key={m.month} className="py-3 flex items-center justify-between">
              <span className="font-bold text-white font-sans text-sm">{m.month} 2026</span>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-white/40 block text-[10px]">Gross GMV</span>
                  <span className="text-white font-bold">{formatCurrency(m.gmv)}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Agency Revenue (12%)</span>
                  <span className="text-emerald-400 font-extrabold text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {formatCurrency(m.revenue)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
