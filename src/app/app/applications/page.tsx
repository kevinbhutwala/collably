"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { CampaignApplication } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { ArrowRight, Clock, CheckCircle2, XCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApplicationsManagementPage() {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const { currency: displayCurrency, convertAndFormat } = useGlobalCurrency();
  const [applications, setApplications] = useState<CampaignApplication[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  useEffect(() => {
    const fetch = async () => {
      const data = await applicationService.getApplications();
      let combined = Array.isArray(data) ? [...data] : [];
      if (typeof window !== "undefined") {
        try {
          const cachedRaw = localStorage.getItem("valence_client_applications");
          if (cachedRaw) {
            const cached: CampaignApplication[] = JSON.parse(cachedRaw);
            for (const c of cached) {
              const existingIdx = combined.findIndex((a) => a.id === c.id);
              if (existingIdx === -1) {
                combined.unshift(c);
              } else if (c.status && c.status !== combined[existingIdx].status) {
                combined[existingIdx].status = c.status;
              }
            }
          }
        } catch {}
      }
      setApplications(combined);
    };
    fetch();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: "accepted" | "rejected") => {
    try {
      await applicationService.updateApplicationStatus(id, newStatus);
    } catch {}
    setApplications((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("valence_client_applications", JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
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

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const acceptedCount = applications.filter((a) => a.status === "accepted").length;
  const rejectedCount = applications.filter((a) => a.status === "rejected").length;

  const tabs = [
    { key: "all" as const, label: "All Applications", count: applications.length, icon: Layers },
    { key: "pending" as const, label: "Under Review", count: pendingCount, icon: Clock },
    { key: "accepted" as const, label: "Accepted & Active", count: acceptedCount, icon: CheckCircle2 },
    { key: "rejected" as const, label: "Declined", count: rejectedCount, icon: XCircle },
  ];

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Applications
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Secured Payments
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
            {role === "brand" ? "Creator Applications" : "My Applications"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            {role === "brand"
              ? "Review pitches from creators and accept them into funded collaborations."
              : "Track your pitches, responses from brands, and accepted brand deals."}
          </p>
        </div>
      </div>

      {/* Redesigned Status Tabs Dock */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F4F4F8] rounded-2xl border border-black/8 overflow-x-auto no-scrollbar shadow-xs">
        {tabs.map((tab) => {
          const isActive = filter === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2",
                isActive
                  ? "bg-white text-[#0A0A0E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/8"
                  : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-[#8A7000]" : "text-[#7A7A8A]")} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold",
                  isActive
                    ? "bg-[#0A0A0E] text-white"
                    : "bg-black/5 text-[#5A5A68]"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
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
              className="p-5 sm:p-6 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[#0A0A0E]"
            >
              <div className="space-y-2.5 flex-1">
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
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#0A0A0E] truncate font-display">{app.campaignTitle}</h3>
                    <p className="text-xs text-[#6A6A78] font-sans truncate">
                      {app.brandName} • <span className="font-mono text-[11px]">{app.createdAt}</span>
                    </p>
                  </div>
                  <span className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-wider shrink-0 ${
                    app.status === "accepted" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-black/5 text-[#5A5A68]"
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs text-[#4A4A58] leading-relaxed">
                  <strong className="text-[#0A0A0E] block mb-0.5 text-xs font-bold">Pitch Statement:</strong>
                  <p className="line-clamp-2">{app.pitch}</p>
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-black/6">
                <div>
                  <span className="text-[10px] text-[#7A7A8A] font-bold uppercase block">Proposed Fee</span>
                  <span className="text-base font-black text-[#0A0A0E] font-mono numeric-tabular">
                    {formatCurrency(app.proposedFee, app.currency || "USD")}
                    {(app.currency || "USD").toUpperCase() !== displayCurrency.toUpperCase() && (
                      <span className="text-[11px] font-semibold text-[#7A7A8A] font-mono block">
                        {convertAndFormat(app.proposedFee, app.currency || "USD")}
                      </span>
                    )}
                  </span>
                </div>

                {role === "brand" && app.status === "pending" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(app.id, "rejected")}
                      className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/10"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app.id, "accepted")}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold transition-all shadow-xs border border-black/10"
                    >
                      Accept Proposal
                    </button>
                  </div>
                )}

                {app.status === "accepted" && (
                  <Link href="/app/collaborations">
                    <button className="px-4 py-2 rounded-full bg-black/5 hover:bg-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all flex items-center gap-1.5 border border-black/10">
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
