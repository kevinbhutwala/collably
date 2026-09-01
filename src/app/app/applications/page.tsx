"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { CampaignApplication } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { ArrowRight } from "lucide-react";

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
    <div className="space-y-8 text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            {role === "brand" ? "Campaign Applications & Proposals" : "My Pitched Proposals"}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            {role === "brand"
              ? "Review creator proposals, evaluate AI match scores, and accept deals into escrow."
              : "Track your active campaign applications and accepted deliverables."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FFFFFF] rounded-xl border border-[#E7E7E4] text-xs font-semibold shadow-xs">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === tab
                  ? "bg-[#111111] text-[#FAFAF8] shadow-xs font-bold"
                  : "text-[#6B6B6B] hover:text-[#111111]"
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
            className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-[#111111]"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E7E7E4] shrink-0 shadow-xs">
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
                  <h3 className="font-bold text-base text-[#111111] font-display">{app.campaignTitle}</h3>
                  <p className="text-xs text-[#6B6B6B] font-mono">
                    Brand: {app.brandName} • Applied on {app.createdAt}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  app.status === "accepted" ? "bg-[#B7FF3C] text-[#111111]" : "bg-[#FAFAF8] text-[#6B6B6B] border border-[#E7E7E4]"
                }`}>
                  {app.status.toUpperCase()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-xs text-[#6B6B6B] leading-relaxed font-sans">
                <strong className="text-[#111111] block mb-1 font-display">Proposal Pitch:</strong>
                {app.pitch}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 font-mono text-xs shrink-0">
              <div>
                <span className="text-[10px] text-[#6B6B6B] uppercase block">Proposed Fee</span>
                <span className="text-lg font-extrabold text-[#111111]">
                  {formatCurrency(app.proposedFee)}
                </span>
              </div>

              {role === "brand" && app.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "rejected")}
                    className="rounded-[9px]"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "accepted")}
                    className="rounded-[9px]"
                  >
                    Accept &amp; Lock Escrow
                  </Button>
                </div>
              )}

              {app.status === "accepted" && (
                <Link href="/app/collaborations">
                  <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} className="rounded-[9px]">
                    Open Deliverable Workspace
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
