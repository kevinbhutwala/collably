"use client";

import React, { useState, useEffect } from "react";
import { auditService } from "@/services/audit.service";
import { AuditEvent } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Clock, FileText, Database } from "lucide-react";

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
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Security & Operational Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Immutable event ledger tracking contract creations, deliverable submissions, escrow payouts, and administrative overrides.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-accent" />
            <span>Audit Trail ({events.length} Events)</span>
          </h3>
          <Badge variant="glow" size="sm">Immutable Ledger</Badge>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {events.map((ev) => (
            <div key={ev.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-sans">
                  <Badge variant="glow" size="sm">
                    {ev.entityType}
                  </Badge>
                  <strong className="text-sm font-bold text-slate-900">{ev.action}</strong>
                </div>
                <p className="text-xs text-slate-600 font-sans">
                  Target: <strong>{ev.entityName}</strong>
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Actor: {ev.actorName} ({ev.actorRole}) • IP: {ev.ipAddress || "127.0.0.1"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-slate-500 block">{ev.createdAt}</span>
                <span className="text-[10px] text-slate-400">ID: {ev.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
