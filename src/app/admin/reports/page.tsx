"use client";

import React from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agency Financial & GMV Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Quarterly revenue pacing, monthly platform GMV, and creator payout statements.
          </p>
        </div>

        <Button variant="secondary" size="md" leftIcon={<Download className="w-4 h-4" />}>
          Download Financial Audit PDF
        </Button>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <h3 className="text-base font-bold text-slate-900">Monthly Platform GMV & Take-Rate Pacing</h3>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {MOCK_ANALYTICS.monthlyRevenueSeries.map((m: { month: string; revenue: number; gmv: number }) => (
            <div key={m.month} className="py-3 flex items-center justify-between">
              <span className="font-bold text-slate-900 font-sans text-sm">{m.month} 2026</span>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-slate-400 block text-[10px]">Gross GMV</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(m.gmv)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Agency Revenue (12%)</span>
                  <span className="text-emerald-600 font-bold text-sm">{formatCurrency(m.revenue)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
