"use client";

import React, { useState, useEffect } from "react";
import { auditService } from "@/services/audit.service";
import { AuditEvent } from "@/core/types";
import { Database } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await auditService.getAuditLogs();
      setEvents(data);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 text-white select-none">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Security Log
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          System Security &amp; Operational Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Immutable event ledger tracking contract creations, deliverable submissions, escrow payouts, and administrative overrides.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
            <Database className="w-4 h-4 text-[#FFD21F]" />
            <span>Audit Trail ({events.length} Events)</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[10px] font-bold">
            Immutable Ledger
          </span>
        </div>

        <div className="divide-y divide-white/10 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] text-[10px] font-mono font-bold uppercase">
                    {ev.entityType}
                  </span>
                  <strong className="text-sm font-bold text-white">{ev.action}</strong>
                </div>
                <p className="text-xs text-white/70 font-sans">
                  Target: <strong className="text-white">{ev.entityName}</strong>
                </p>
                <p className="text-[11px] text-white/40 font-mono">
                  Actor: {ev.actorName} ({ev.actorRole}) • IP: {ev.ipAddress || "127.0.0.1"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-white font-bold block">{ev.createdAt}</span>
                <span className="text-[10px] text-white/40">ID: {ev.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
