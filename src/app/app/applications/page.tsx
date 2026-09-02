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
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {role === "brand" ? "Applications" : "My Pitches"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            {role === "brand"
              ? "Review creator proposals and approve deals into escrow."
              : "Track the status of your submitted campaign pitches."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-[#F5F5F9] rounded-full border border-black/8 text-xs font-semibold overflow-x-auto no-scrollbar">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full capitalize font-mono text-xs transition-all whitespace-nowrap shrink-0 ${
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

      {filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-6 space-y-2 shadow-xs">
          <p className="text-sm font-bold text-[#0A0A0E]">No applications found</p>
          <p className="text-xs text-[#6A6A78]">No items currently match the selected status filter.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="p-4 sm:p-6 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[#0A0A0E]"
            >
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
                    <SafeImage
                      src={app.brandLogo}
                      alt={app.brandName}
                      fallbackType="brand"
                      fallbackName={app.brandName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#0A0A0E] truncate font-display">{app.campaignTitle}</h3>
                    <p className="text-[11px] text-[#6A6A78] font-mono truncate">
                      {app.brandName} • {app.createdAt}
                    </p>
                  </div>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                    app.status === "accepted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-black/5 text-[#5A5A68]"
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs text-[#4A4A58] leading-relaxed">
                  <strong className="text-[#0A0A0E] block mb-0.5 text-[11px]">Pitch Note:</strong>
                  <p className="line-clamp-2">{app.pitch}</p>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 font-mono text-xs shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-black/6">
                <div>
                  <span className="text-[10px] text-[#7A7A8A] uppercase block">Proposed</span>
                  <span className="text-base font-extrabold text-[#0A0A0E] numeric-tabular">
                    {formatCurrency(app.proposedFee)}
                  </span>
                </div>

                {role === "brand" && app.status === "pending" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(app.id, "rejected")}
                      className="px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all border border-black/10"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app.id, "accepted")}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10"
                    >
                      Accept
                    </button>
                  </div>
                )}

                {app.status === "accepted" && (
                  <Link href="/app/collaborations">
                    <button className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1 border border-black/10">
                      <span>Workspace</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
