"use client";

import React, { useState, useEffect } from "react";
import { CreatorProfile } from "@/core/types";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2 } from "lucide-react";

export default function AdminCreatorsPage() {
  const { addToast } = useUIStore();
  const [creators, setCreators] = useState<CreatorProfile[]>(MOCK_CREATORS);
  const [loading, setLoading] = useState(true);

  const fetchCreators = async () => {
    try {
      const res = await fetch("/api/creators", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCreators(data);
        }
      }
    } catch {
      // Keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const toggleVerify = async (id: string, currentVerified: boolean) => {
    try {
      const nextVerified = !currentVerified;
      const res = await fetch(`/api/creators/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: nextVerified }),
      });

      if (res.ok) {
        setCreators((prev) =>
          prev.map((c) => (c.id === id ? { ...c, verified: nextVerified } : c))
        );
        addToast({
          type: "success",
          title: "Creator Verification Updated",
          message: `Creator is now ${nextVerified ? "Verified" : "Unverified"}.`,
        });
      } else {
        const err = await res.json();
        addToast({
          type: "error",
          title: "Update Failed",
          message: err.error || "Failed to update verification status.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Failed to update creator.",
      });
    }
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      <div className="pb-6 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Talent Moderation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Creator Talent Roster &amp; Moderation
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5 font-sans">
          Audit creator metrics, manage verified badges, and inspect engagement authenticity.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {creators.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#F5F5F9] dark:bg-[#181824] border border-black/8 dark:border-white/10 shrink-0">
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
                  <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white flex items-center gap-1.5 font-display">
                    {c.fullName}
                    {c.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                    @{c.handle} • {c.primaryCategory} • {formatNumber(c.totalFollowers || 50000)} Followers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    c.verified
                      ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                      : "bg-black/5 dark:bg-white/10 text-[#7A7A8A] dark:text-[#8E8EA4] border-black/10 dark:border-white/10"
                  }`}
                >
                  {c.verified ? "Verified" : "Unverified"}
                </span>
                <button
                  onClick={() => toggleVerify(c.id, !!c.verified)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    c.verified
                      ? "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[#0A0A0E] dark:text-white border-black/10 dark:border-white/10"
                      : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] border-black/10 shadow-xs"
                  }`}
                >
                  {c.verified ? "Revoke Badge" : "Grant Verified Badge"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
