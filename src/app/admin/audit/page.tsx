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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Security Log
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          System Security &amp; Operational Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Immutable event ledger tracking contract creations, deliverable submissions, escrow payouts, and administrative overrides.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <h3 className="text-base font-bold text-[#0A0A0E] flex items-center gap-2 font-display">
            <Database className="w-4 h-4 text-[#0A0A0E]" />
            <span>Audit Trail ({events.length} Events)</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#0A0A0E] font-mono text-[10px] font-bold">
            Immutable Ledger
          </span>
        </div>

        <div className="divide-y divide-black/5 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
                    {ev.entityType}
                  </span>
                  <strong className="text-sm font-bold text-[#0A0A0E]">{ev.action}</strong>
                </div>
                <p className="text-xs text-[#5A5A68] font-sans">
                  Target: <strong className="text-[#0A0A0E]">{ev.entityName}</strong>
                </p>
                <p className="text-[11px] text-[#7A7A8A] font-mono">
                  Actor: {ev.actorName} ({ev.actorRole}) • IP: {ev.ipAddress || "127.0.0.1"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[#0A0A0E] font-bold block">{ev.createdAt}</span>
                <span className="text-[10px] text-[#7A7A8A]">ID: {ev.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
