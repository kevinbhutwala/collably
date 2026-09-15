"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { Collaboration } from "@/core/types";
import { ShieldCheck, ShieldAlert, Clock, AlertTriangle, ExternalLink } from "lucide-react";

export default function AdminCollaborationsPage() {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const res = await fetch("/api/collaborations", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCollaborations(data);
            return;
          }
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCollabs();
  }, []);

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      <div className="pb-6 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#F4F4F8] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Platform Observability
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Collaboration Pipelines &amp; Protection Watchdog
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA6] mt-0.5 font-sans">
          Real-time oversight of escrow-funded vs. unfunded campaigns, overdue deadlines, and review SLA timers.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
          {collaborations.length === 0 ? (
            <div className="py-8 text-center text-[#8A8A9A] dark:text-[#7A7A8A]">
              <p>No collaborations loaded.</p>
            </div>
          ) : (
            collaborations.map((c) => {
              const isFunded = c.isFunded && c.paymentStatus !== "payment_pending";
              const isOverdue = c.isOverdue || c.paymentStatus === "overdue";

              return (
                <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 font-sans">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0A0A0E] dark:text-white font-display">{c.campaignTitle}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-[#F4F4F8] font-mono text-[10px] font-bold">
                        {c.brand?.companyName || "Brand Partner"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        isFunded
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/50"
                          : "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/50"
                      }`}>
                        {isFunded ? "ESCROW SECURED" : "UNFUNDED"}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700/50 text-[10px] font-mono font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> OVERDUE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6]">
                      Creator: <strong className="text-[#0A0A0E] dark:text-[#F4F4F8]">{c.creator?.fullName}</strong> • Collab ID: <span className="font-mono">{c.id}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 font-mono">
                    <div>
                      <span className="text-[#7A7A8A] dark:text-[#8E8E9F] block text-[10px]">Agreed Budget</span>
                      <span className="text-[#0A0A0E] dark:text-white font-extrabold">{formatCurrency(c.totalAgreedBudget)}</span>
                    </div>
                    <div>
                      <span className="text-[#7A7A8A] dark:text-[#8E8E9F] block text-[10px]">Lifecycle Stage</span>
                      <span className="text-[#0A0A0E] dark:text-[#F4F4F8] font-bold">{(c.paymentStatus || c.status).replace(/_/g, " ").toUpperCase()}</span>
                    </div>
                    <a
                      href={`/app/collaborations/${c.id}`}
                      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#6A6A78] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white transition-all"
                      title="Open Collaboration Workspace"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
