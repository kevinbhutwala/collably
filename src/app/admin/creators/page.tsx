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
    <div className="space-y-8 text-white select-none">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Talent Moderation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Creator Talent Roster &amp; Moderation
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Audit creator metrics, manage verified badges, and inspect engagement authenticity.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="divide-y divide-white/10">
          {creators.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
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
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-display">
                    {c.fullName}
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-white/50 font-mono">
                    @{c.handle} • {c.primaryCategory} • {c.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">Followers</span>
                  <span className="text-white font-bold">{formatNumber(c.totalFollowers)}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Engagement</span>
                  <span className="text-[#B7FF3C] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                    {c.avgEngagementRate}%
                  </span>
                </div>
                <button
                  onClick={() => toggleVerify(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all ${
                    c.verified
                      ? "bg-white/10 text-white/60 hover:text-white"
                      : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-md"
                  }`}
                >
                  {c.verified ? "Revoke Verification" : "Approve & Verify"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
