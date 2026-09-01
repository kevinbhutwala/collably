"use client";

import React from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { Download } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Telemetry Reports
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Agency Financial &amp; GMV Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Quarterly revenue pacing, monthly platform GMV, and creator payout statements.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center gap-1.5 border border-black/10">
          <Download className="w-4 h-4 text-[#0A0A0E]" />
          <span>Download Financial Audit PDF</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#0A0A0E] font-display">Monthly Platform GMV &amp; Take-Rate Pacing</h3>

        <div className="divide-y divide-black/5 font-mono text-xs">
          {MOCK_ANALYTICS.monthlyRevenueSeries.map((m: { month: string; revenue: number; gmv: number }) => (
            <div key={m.month} className="py-3 flex items-center justify-between">
              <span className="font-bold text-[#0A0A0E] font-sans text-sm">{m.month} 2026</span>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Gross GMV</span>
                  <span className="text-[#0A0A0E] font-bold">{formatCurrency(m.gmv)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Agency Revenue (12%)</span>
                  <span className="text-emerald-700 font-extrabold text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
