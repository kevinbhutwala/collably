"use client";

import React from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Agency Financial &amp; GMV Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Quarterly revenue pacing, monthly platform GMV, and creator payout statements.
          </p>
        </div>

        <Button variant="secondary" size="md" leftIcon={<Download className="w-4 h-4" />} className="rounded-full font-display">
          Download Financial Audit PDF
        </Button>
      </div>

      <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6">
        <h3 className="text-base font-bold text-white font-display">Monthly Platform GMV &amp; Take-Rate Pacing</h3>

        <div className="divide-y divide-white/10 font-mono text-xs">
          {MOCK_ANALYTICS.monthlyRevenueSeries.map((m: { month: string; revenue: number; gmv: number }) => (
            <div key={m.month} className="py-3 flex items-center justify-between">
              <span className="font-bold text-white font-sans text-sm">{m.month} 2026</span>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-slate-400 block text-[10px]">Gross GMV</span>
                  <span className="text-slate-200 font-bold">{formatCurrency(m.gmv)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Agency Revenue (12%)</span>
                  <span className="text-emerald-400 font-bold text-sm">{formatCurrency(m.revenue)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
