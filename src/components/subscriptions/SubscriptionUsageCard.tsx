"use client";

import React from "react";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useAuthStore } from "@/stores/auth.store";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { Sparkles, Calendar, Zap, Check, ArrowUpRight, ShieldCheck, AlertCircle } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export function SubscriptionUsageCard() {
  const { subscription, currentPlan, openUpgradeModal, getQuota } = useSubscriptionStore();
  const { role } = useAuthStore();

  const isBrand = role === "brand" || role === "brand_owner" || role === "brand_manager";
  const quota = isBrand ? getQuota("activeCampaigns") : getQuota("campaignApplications");

  const quotaLabel = isBrand ? "Active Campaign Briefs" : "Monthly Campaign Pitches";
  const quotaUnit = isBrand ? "briefs" : "pitches";

  const periodEndFormatted = subscription?.currentPeriodEnd
    ? format(new Date(subscription.currentPeriodEnd), "MMM dd, yyyy")
    : "Next month";

  return (
    <div className="rounded-3xl bg-white border border-black/8 p-5 sm:p-7 shadow-xs space-y-5 text-[#0A0A0E] select-none relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/6">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold font-display text-[#0A0A0E]">
              Plan &amp; Quota
            </h3>
            <SubscriptionBadge
              planId={subscription?.planId}
              role={role}
              size="sm"
            />
          </div>
          <p className="text-xs text-[#6A6A78]">
            {currentPlan?.description || "Usage quota and active features."}
          </p>
        </div>

        <button
          onClick={() => openUpgradeModal()}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Sparkles className="w-3 h-3 text-[#0A0A0E]" />
          <span>Manage Plan</span>
        </button>
      </div>

      {/* Quota Progress Meter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#0A0A0E] flex items-center gap-1.5 text-xs">
            <Zap className="w-3.5 h-3.5 text-[#FFD21F]" />
            <span>{quotaLabel}</span>
          </span>
          <span className="text-[#5A5A68] text-xs">
            {quota.limit === -1 ? (
              <span className="font-bold text-emerald-600">UNLIMITED</span>
            ) : (
              <span>
                <strong className="text-[#0A0A0E]">{quota.current}</strong> / {quota.limit} {quotaUnit} ({quota.percent}%)
              </span>
            )}
          </span>
        </div>

        {quota.limit !== -1 && (
          <div className="w-full h-2 rounded-full bg-[#F0F0F4] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                quota.percent >= 90
                  ? "bg-rose-500"
                  : quota.percent >= 70
                  ? "bg-amber-500"
                  : "bg-gradient-to-r from-[#FFD21F] to-[#FFAE00]"
              }`}
              style={{ width: `${Math.min(100, quota.percent)}%` }}
            />
          </div>
        )}

        {quota.limit !== -1 && quota.percent >= 80 && (
          <div className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 rounded-xl px-3 py-1 border border-amber-200/60 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>
              Approaching {quotaLabel.toLowerCase()} limit.
            </span>
          </div>
        )}
      </div>

      {/* Subscription Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-0.5">
          <span className="text-[10px] font-mono text-[#7A7A8A] uppercase font-bold block">
            Billing
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
            <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" />
            <span className="capitalize">{subscription?.interval || "Monthly"}</span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="font-normal text-[#5A5A68]">Renews {periodEndFormatted}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-0.5">
          <span className="text-[10px] font-mono text-[#7A7A8A] uppercase font-bold block">
            Status
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase font-mono text-[11px] text-emerald-600">
              {subscription?.status || "Active"}
            </span>
            {subscription?.cancelAtPeriodEnd && (
              <span className="text-[10px] font-mono text-amber-600 font-normal">
                (Cancelling soon)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
