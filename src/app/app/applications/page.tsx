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
import { ArrowUpRight } from "lucide-react";

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
    <div className="space-y-10 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {role === "brand" ? "Campaign Applications & Proposals" : "My Pitched Proposals"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            {role === "brand"
              ? "Review creator proposals, evaluate AI match scores, and accept deals into escrow."
              : "Track your active campaign applications and accepted deliverables."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-full border border-white/10 text-xs font-medium">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full capitalize transition-all ${
                filter === tab
                  ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold shadow-md shadow-pink-500/25"
                  : "text-slate-400 hover:text-white"
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
            className="p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 shrink-0 shadow-sm">
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
                  <p className="text-xs text-slate-400 font-mono">
                    Brand: {app.brandName} • Applied on {app.createdAt}
                  </p>
                </div>
                <Badge
                  variant={
                    app.status === "accepted"
                      ? "success"
                      : app.status === "rejected"
                      ? "warning"
                      : "default"
                  }
                  size="sm"
                >
                  {app.status.toUpperCase()}
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white block mb-1 font-display">Proposal Pitch:</strong>
                {app.pitch}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 font-mono text-xs shrink-0">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Proposed Fee</span>
                <span className="text-lg font-bold text-emerald-400">
                  {formatCurrency(app.proposedFee)}
                </span>
              </div>

              {role === "brand" && app.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "rejected")}
                    className="rounded-full font-display"
                  >
                    Decline
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "accepted")}
                    className="rounded-full font-display font-bold"
                  >
                    Accept &amp; Lock Escrow
                  </Button>
                </div>
              )}

              {app.status === "accepted" && (
                <Link href="/app/collaborations">
                  <Button variant="secondary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />} className="rounded-full font-display">
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
