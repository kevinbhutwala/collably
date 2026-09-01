"use client";

import React from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8 text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Telemetry Reports
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Agency Financial &amp; GMV Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Quarterly revenue pacing, monthly platform GMV, and creator payout statements.
          </p>
        </div>

        <Button variant="secondary" size="md" leftIcon={<Download className="w-4 h-4" />} className="rounded-[9px]">
          Download Financial Audit PDF
        </Button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#111111] font-display">Monthly Platform GMV &amp; Take-Rate Pacing</h3>

        <div className="divide-y divide-[#E7E7E4] font-mono text-xs">
          {MOCK_ANALYTICS.monthlyRevenueSeries.map((m: { month: string; revenue: number; gmv: number }) => (
            <div key={m.month} className="py-3 flex items-center justify-between">
              <span className="font-bold text-[#111111] font-sans text-sm">{m.month} 2026</span>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Gross GMV</span>
                  <span className="text-[#111111] font-bold">{formatCurrency(m.gmv)}</span>
                </div>
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Agency Revenue (12%)</span>
                  <span className="text-[#111111] font-extrabold text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
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
