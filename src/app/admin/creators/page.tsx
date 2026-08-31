"use client";

import React, { useState } from "react";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2 } from "lucide-react";

export default function AdminCreatorsPage() {
  const { addToast } = useUIStore();
  const [creators, setCreators] = useState(MOCK_CREATORS);

  const toggleVerify = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
    addToast({
      type: "success",
      title: "Creator Verification Updated",
      message: "Creator verification status saved.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Creator Talent Roster & Moderation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Audit creator metrics, manage verified badges, and inspect engagement authenticity.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="divide-y divide-slate-100">
          {creators.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <SafeImage
                    src={c.avatarUrl}
                    alt={c.fullName}
                    fallbackType="creator"
                    fallbackName={c.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {c.fullName}
                    {c.verified && <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    @{c.handle} • {c.primaryCategory} • {c.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Followers</span>
                  <span className="text-slate-900 font-bold">{formatNumber(c.totalFollowers)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Engagement</span>
                  <span className="text-emerald-600 font-bold">{c.avgEngagementRate}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Base Rate</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(c.startingPrice)}</span>
                </div>
                <Button
                  variant={c.verified ? "secondary" : "accent"}
                  size="sm"
                  onClick={() => toggleVerify(c.id)}
                >
                  {c.verified ? "Revoke" : "Verify Badge"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
