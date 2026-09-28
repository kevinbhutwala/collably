"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Info,
} from "lucide-react";
import { VerificationCheck, EligibilityAuditReport } from "@/server/services/eligibility.service";

interface PreflightEligibilityAuditProps {
  report: EligibilityAuditReport | null;
  isLoading?: boolean;
  onRefresh?: () => void;
  onProceed?: () => void;
  onClose?: () => void;
  actionLabel?: string;
}

export function PreflightEligibilityAudit({
  report,
  isLoading = false,
  onRefresh,
  onProceed,
  onClose,
  actionLabel = "Proceed to Submit Proposal",
}: PreflightEligibilityAuditProps) {
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-8 text-center space-y-4 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-sm font-sans select-none">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
          <ShieldCheck className="w-6 h-6 animate-spin" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
            Running Pre-Flight Compatibility Audit...
          </h3>
          <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4]">
            Auditing profile completeness, channel consistency, and campaign requirements...
          </p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const toggleExpand = (id: string) => {
    setExpandedCheckId((prev) => (prev === id ? null : id));
  };

  const statusColors = {
    ready: {
      badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
      accentBar: "bg-emerald-500",
      iconColor: "text-emerald-500",
    },
    needs_attention: {
      badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400",
      accentBar: "bg-amber-500",
      iconColor: "text-amber-500",
    },
    blocked: {
      badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-400",
      accentBar: "bg-rose-500",
      iconColor: "text-rose-500",
    },
  }[report.overallStatus];

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden shadow-2xl font-sans select-none text-[#0A0A0E] dark:text-[#F4F4F8]">
      {/* Top Status Accent Bar */}
      <div className={`h-1.5 w-full ${statusColors.accentBar}`} />

      <div className="p-5 sm:p-7 space-y-6">
        {/* Header & Score Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8 dark:border-white/10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 ${statusColors.badgeBg}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {report.overallStatus === "ready"
                  ? "Fully Verified & Qualified"
                  : report.overallStatus === "needs_attention"
                  ? "Eligible with Advisories"
                  : "Critical Requirements Missing"}
              </span>

              {onRefresh && (
                <button
                  type="button"
                  onClick={onRefresh}
                  title="Re-run verification audit"
                  className="p-1 rounded-lg text-[#7A7A8A] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] dark:text-white font-display tracking-tight">
              {report.headline}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] max-w-xl leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Compatibility Gauge */}
          <div className="flex items-center sm:flex-col items-start sm:items-end justify-between shrink-0 p-3.5 sm:p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/6 dark:border-white/8 min-w-[130px]">
            <span className="text-[10px] font-mono uppercase text-[#7A7A8A] dark:text-[#8E8EA4] font-semibold">
              Fit Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#0A0A0E] dark:text-white">
                {report.score}
              </span>
              <span className="text-xs font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">/100</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] mt-0.5">
              <span>{report.passedCount} passed</span>
              {report.criticalIssuesCount > 0 && (
                <span className="text-rose-500 font-bold">· {report.criticalIssuesCount} blocked</span>
              )}
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7A7A8A] dark:text-[#8E8EA4] uppercase tracking-wider px-1">
            <span>Automated Pre-Flight Checklist</span>
            <span>{report.checks.length} Verification Checks</span>
          </div>

          <div className="space-y-2">
            {report.checks.map((check) => {
              const isExpanded = expandedCheckId === check.id;

              const statusIcon =
                check.status === "passed" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : check.status === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                );

              const cardBorder =
                check.status === "failed"
                  ? "border-rose-500/30 bg-rose-500/[0.03]"
                  : check.status === "warning"
                  ? "border-amber-500/25 bg-amber-500/[0.02]"
                  : "border-black/6 dark:border-white/8 bg-black/[0.01] dark:bg-white/[0.02]";

              return (
                <div
                  key={check.id}
                  className={`rounded-2xl border transition-all ${cardBorder}`}
                >
                  <div
                    onClick={() => toggleExpand(check.id)}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {statusIcon}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white truncate">
                            {check.title}
                          </h4>
                          {check.critical && check.status === "failed" && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                              BLOCKING
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] truncate">
                          {check.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {check.fixAction && check.status === "failed" && (
                        <Link
                          href={check.fixAction.url}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center gap-1"
                        >
                          <span>{check.fixAction.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                      <button
                        type="button"
                        aria-label="Toggle check details"
                        className="p-1 text-[#7A7A8A] hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Drawer */}
                  {isExpanded && check.details && (
                    <div className="px-4 pb-3.5 pt-1 text-xs border-t border-black/5 dark:border-white/5 space-y-2 text-[#4A4A58] dark:text-[#A0A0B0] font-sans">
                      <div className="flex items-start gap-2 bg-black/[0.02] dark:bg-white/[0.03] p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                        <Info className="w-3.5 h-3.5 text-[#7A7A8A] mt-0.5 shrink-0" />
                        <div className="space-y-1">
                          <p>{check.details}</p>
                          {check.fixAction && (
                            <Link
                              href={check.fixAction.url}
                              className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-[#FFD21F] hover:underline pt-0.5"
                            >
                              <span>{check.fixAction.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Resolution State */}
        <div className="pt-4 border-t border-black/8 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-sans flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {report.eligible
                ? "All requirements verified. Safe milestone escrow will protect this deal."
                : "Resolve critical checklist blockers in your profile to enable application."}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            )}

            {report.eligible ? (
              onProceed && (
                <button
                  type="button"
                  onClick={onProceed}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_2px_14px_rgba(255,210,31,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )
            ) : (
              <Link href="/app/profile" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Fix Profile Blockers</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
