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
import { CheckCircle2, Clock, XCircle, ArrowUpRight, MessageSquare } from "lucide-react";

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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {role === "brand" ? "Campaign Applications & Proposals" : "My Pitched Proposals"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {role === "brand"
              ? "Review creator proposals, evaluate AI match scores, and accept deals into escrow."
              : "Track your active campaign applications and accepted deliverables."}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200 text-xs font-medium">
          {(["all", "pending", "accepted", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === tab
                  ? "bg-white text-slate-900 font-bold shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
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
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
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
                  <h3 className="font-bold text-base text-slate-900">{app.campaignTitle}</h3>
                  <p className="text-xs text-slate-500 font-mono">
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

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-sans">
                <strong className="text-slate-900 block mb-1">Proposal Pitch:</strong>
                {app.pitch}
              </div>
            </div>

            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 font-mono text-xs shrink-0">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Proposed Fee</span>
                <span className="text-lg font-bold text-emerald-600">
                  {formatCurrency(app.proposedFee)}
                </span>
              </div>

              {role === "brand" && app.status === "pending" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "rejected")}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleStatusUpdate(app.id, "accepted")}
                  >
                    Accept & Lock Escrow
                  </Button>
                </div>
              )}

              {app.status === "accepted" && (
                <Link href="/app/collaborations">
                  <Button variant="secondary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
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
