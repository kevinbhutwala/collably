"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { CampaignApplication } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ApplicationsManagementPage() {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [applications, setApplications] = useState<CampaignApplication[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  useEffect(() => {
    const fetch = async () => {
      const data = await applicationService.getApplications();
      setApplications(data);
    };
    fetch();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: "accepted" | "rejected") => {
    await applicationService.updateApplicationStatus(id, newStatus);
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    addToast({
      type: newStatus === "accepted" ? "success" : "info",
      title: newStatus === "accepted" ? "Creator Accepted" : "Proposal Rejected",
      message:
        newStatus === "accepted"
          ? "Deliverable pipeline generated and escrow allocated."
          : "Application moved to archived queue.",
    });
  };

  const filtered =
    filter === "all"
      ? applications
      : applications.filter((a) => a.status === filter);

  return (
    <div className="space-y-8 text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {role === "brand" ? "Campaign Applications & Proposals" : "My Pitched Proposals"}
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            {role === "brand"
              ? "Review creator proposals, evaluate AI match scores, and accept deals into escrow."
              : "Track your active campaign applications and accepted deliverables."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-full border border-white/10 text-xs font-semibold">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full capitalize font-mono text-xs transition-all ${
                filter === tab
                  ? "bg-[#2A5CFF] text-white shadow-[0_0_12px_rgba(42,92,255,0.4)] font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <SafeImage
                    src={app.brandLogo}
                    alt={app.brandName}
                    fallbackType="brand"
                    fallbackName={app.brandName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white font-display">{app.campaignTitle}</h3>
                  <p className="text-xs text-white/50 font-mono">
                    Brand: {app.brandName} • Applied on {app.createdAt}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  app.status === "accepted" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/60"
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/70 leading-relaxed font-sans">
                <strong className="text-white block mb-1 font-display">Proposal Pitch:</strong>
                {app.pitch}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 font-mono text-xs shrink-0">
              <div>
                <span className="text-[10px] text-white/40 uppercase block">Proposed Fee</span>
                <span className="text-lg font-extrabold text-white numeric-tabular">
                  {formatCurrency(app.proposedFee)}
                </span>
              </div>

              {role === "brand" && app.status === "pending" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(app.id, "rejected")}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, "accepted")}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(42,92,255,0.4)]"
                  >
                    Accept &amp; Lock Escrow
                  </button>
                </div>
              )}

              {app.status === "accepted" && (
                <Link href="/app/collaborations">
                  <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#FFD21F] hover:to-[#FFD21F] hover:text-black text-white font-semibold text-xs transition-all flex items-center gap-1.5">
                    <span>Open Deliverable Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
