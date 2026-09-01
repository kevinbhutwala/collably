"use client";

import React, { useState } from "react";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber } from "@/core/utils/formatters";
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
    <div className="space-y-8 text-[#111111]">
      <div className="pb-6 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            Talent Moderation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Creator Talent Roster &amp; Moderation
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
          Audit creator metrics, manage verified badges, and inspect engagement authenticity.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="divide-y divide-[#E7E7E4]">
          {creators.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E7E7E4] shrink-0">
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
                  <h3 className="font-bold text-sm text-[#111111] flex items-center gap-1.5 font-display">
                    {c.fullName}
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-[#111111]" />}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-mono">
                    @{c.handle} • {c.primaryCategory} • {c.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Followers</span>
                  <span className="text-[#111111] font-bold">{formatNumber(c.totalFollowers)}</span>
                </div>
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Engagement</span>
                  <span className="text-[#111111] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                    {c.avgEngagementRate}%
                  </span>
                </div>
                <Button
                  variant={c.verified ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => toggleVerify(c.id)}
                  className="rounded-[9px]"
                >
                  {c.verified ? "Revoke" : "Verify Creator"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
