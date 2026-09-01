"use client";

import React, { useState } from "react";
import { MOCK_CREATORS } from "@/mock/creators.mock";
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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Talent Moderation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Creator Talent Roster &amp; Moderation
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Audit creator metrics, manage verified badges, and inspect engagement authenticity.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5">
          {creators.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
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
                  <h3 className="font-bold text-sm text-[#0A0A0E] flex items-center gap-1.5 font-display">
                    {c.fullName}
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </h3>
                  <p className="text-xs text-[#7A7A8A] font-mono">
                    @{c.handle} • {c.primaryCategory} • {c.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Followers</span>
                  <span className="text-[#0A0A0E] font-bold">{formatNumber(c.totalFollowers)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Engagement</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {c.avgEngagementRate}%
                  </span>
                </div>
                <button
                  onClick={() => toggleVerify(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
                    c.verified
                      ? "bg-black/5 text-[#5A5A68] hover:text-[#0A0A0E] border-black/10"
                      : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-xs border-black/10"
                  }`}
                >
                  {c.verified ? "Revoke Badge" : "Grant Verified"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
