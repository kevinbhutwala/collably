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
      setApplications(data || []);
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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {role === "brand" ? "Campaign Applications & Proposals" : "My Pitched Proposals"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            {role === "brand"
              ? "Review creator proposals, evaluate AI match scores, and accept deals into escrow."
              : "Track your active campaign applications and accepted deliverables."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F5F9] rounded-full border border-black/8 text-xs font-semibold">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full capitalize font-mono text-xs transition-all ${
                filter === tab
                  ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-xs border border-black/10"
                  : "text-[#6A6A78] hover:text-[#0A0A0E]"
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
            className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-[#0A0A0E]"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
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
                  <h3 className="font-bold text-base text-[#0A0A0E] font-display">{app.campaignTitle}</h3>
                  <p className="text-xs text-[#6A6A78] font-mono">
                    Brand: {app.brandName} • Applied on {app.createdAt}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  app.status === "accepted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-black/5 text-[#5A5A68]"
                }`}>
                  {app.status}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs text-[#4A4A58] leading-relaxed font-sans">
                <strong className="text-[#0A0A0E] block mb-1 font-display">Proposal Pitch:</strong>
                {app.pitch}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 font-mono text-xs shrink-0">
              <div>
                <span className="text-[10px] text-[#7A7A8A] uppercase block">Proposed Fee</span>
                <span className="text-lg font-extrabold text-[#0A0A0E] numeric-tabular">
                  {formatCurrency(app.proposedFee)}
                </span>
              </div>

              {role === "brand" && app.status === "pending" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(app.id, "rejected")}
                    className="px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all border border-black/10"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app.id, "accepted")}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10"
                  >
                    Accept &amp; Lock Escrow
                  </button>
                </div>
              )}

              {app.status === "accepted" && (
                <Link href="/app/collaborations">
                  <button className="px-4 py-2 rounded-full bg-black/5 hover:bg-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 border border-black/10">
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
