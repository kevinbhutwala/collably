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
      setEvents(data || []);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      <div className="pb-6 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#F4F4F8] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Security Log
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
          System Security &amp; Operational Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#9A9AA6] mt-0.5 font-sans">
          Immutable event ledger tracking contract creations, deliverable submissions, escrow payouts, and administrative overrides.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
          <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white flex items-center gap-2 font-display">
            <Database className="w-4 h-4 text-[#0A0A0E] dark:text-white" />
            <span>Audit Trail ({events.length} Events)</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#0A0A0E] dark:text-[#F4F4F8] font-mono text-[10px] font-bold">
            Immutable Ledger
          </span>
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold uppercase">
                    {ev.entityType}
                  </span>
                  <strong className="text-sm font-bold text-[#0A0A0E] dark:text-[#F4F4F8]">{ev.action}</strong>
                </div>
                <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6] font-sans">
                  Target: <strong className="text-[#0A0A0E] dark:text-white">{ev.entityName}</strong>
                </p>
                <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8E9F] font-mono">
                  Actor: {ev.actorName} ({ev.actorRole}) • IP: {ev.ipAddress || "127.0.0.1"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[#0A0A0E] dark:text-white font-bold block">{ev.createdAt}</span>
                <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8E9F]">ID: {ev.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
