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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Platform Observability
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Collaboration Pipelines &amp; Protection Watchdog
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Real-time oversight of escrow-funded vs. unfunded campaigns, overdue deadlines, and review SLA timers.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 font-mono text-xs">
          {collaborations.length === 0 ? (
            <div className="py-8 text-center text-[#8A8A9A]">
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
                      <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{c.campaignTitle}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                        {c.brand?.companyName || "Brand Partner"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        isFunded
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}>
                        {isFunded ? "ESCROW SECURED" : "UNFUNDED"}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-300 text-[10px] font-mono font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> OVERDUE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5A5A68]">
                      Creator: <strong className="text-[#0A0A0E]">{c.creator?.fullName}</strong> • Collab ID: <span className="font-mono">{c.id}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-6 font-mono">
                    <div>
                      <span className="text-[#7A7A8A] block text-[10px]">Agreed Budget</span>
                      <span className="text-[#0A0A0E] font-extrabold">{formatCurrency(c.totalAgreedBudget)}</span>
                    </div>
                    <div>
                      <span className="text-[#7A7A8A] block text-[10px]">Lifecycle Stage</span>
                      <span className="text-[#0A0A0E] font-bold">{(c.paymentStatus || c.status).replace(/_/g, " ").toUpperCase()}</span>
                    </div>
                    <a
                      href={`/app/collaborations/${c.id}`}
                      className="p-2 rounded-full hover:bg-black/5 text-[#6A6A78] hover:text-[#0A0A0E] transition-all"
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
