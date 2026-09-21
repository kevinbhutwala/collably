"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Campaign } from "@/core/types";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";

export default function AdminCampaignsQueuePage() {
  const { addToast } = useUIStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(Array.isArray(data) ? data : []);
      }
    } catch {
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
        addToast({
          type: "success",
          title: `Campaign ${newStatus === "active" ? "Approved" : "Status Updated"}`,
          message: `Campaign brief status is now ${newStatus}.`,
        });
      } else {
        const data = await res.json();
        addToast({
          type: "error",
          title: "Update Failed",
          message: data.error || "Failed to update campaign status.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Failed to communicate with API.",
      });
    }
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      <div className="pb-6 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Moderation Queue
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Campaign Approval &amp; Quality Queue
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5 font-sans">
          Review incoming brand campaign briefs, deliverables feasibility, and budget escrow deposits.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-[#7A7A8A]">Loading campaign queue...</div>
        ) : campaigns.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-[#7A7A8A]">No campaigns submitted yet.</div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {campaigns.map((c) => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0A0A0E] dark:text-white font-display">{c.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-[#EAEAEF] font-mono text-[10px] font-bold">
                    {c.brand?.companyName || "Brand Partner"}
                  </span>
                </div>
                <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                  {c.category} • {c.deliverables?.length || 1} Deliverable Types • {c.acceptedCount || 0}/{c.maxCreators || 5} Creators
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#7A7A8A] dark:text-[#8E8EA4] block text-[10px]">Total Escrow</span>
                  <span className="text-[#0A0A0E] dark:text-white font-extrabold">{formatCurrency(c.budget?.totalBudget || 5000)}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
                  {c.status}
                </span>
                <div className="flex gap-2">
                  <Link href={`/campaigns/${c.id}`} target="_blank">
                    <button className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[#0A0A0E] dark:text-white text-xs font-bold transition-all border border-black/10 dark:border-white/10">
                      Inspect
                    </button>
                  </Link>
                  {c.status !== "active" ? (
                    <button
                      onClick={() => handleUpdateStatus(c.id, "active")}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10"
                    >
                      Approve Brief
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(c.id, "suspended")}
                      className="px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all border border-rose-500/20"
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
