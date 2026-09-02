"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useUIStore } from "@/stores/ui.store";
import { Input } from "@/components/ui/Input";
import { SubscriptionBadge } from "@/components/subscriptions/SubscriptionBadge";
import { CREATOR_PLANS, BRAND_PLANS, ALL_PLANS } from "@/core/constants";
import { SubscriptionPlan, SubscriptionPlanId, SubscriptionInterval } from "@/core/types";
import {
  Wallet,
  Save,
  Smartphone,
  CreditCard,
  Sparkles,
  Check,
  Zap,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Loader2,
  ShieldCheck,
  Building2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

export default function SettingsPage() {
  const { user, role } = useAuthStore();
  const {
    subscription,
    currentPlan,
    upgradePlan,
    cancelPlan,
    resumePlan,
    isLoading,
    getQuota,
  } = useSubscriptionStore();
  const { addToast } = useUIStore();

  const [activeTab, setActiveTab] = useState<"billing" | "payout" | "security">("billing");
  const [isAnnual, setIsAnnual] = useState(subscription?.interval === "annual");
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [stripeAccount, setStripeAccount] = useState("acct_1NZxxxxxxxxx (Verified)");

  const isBrand = role === "brand" || role === "brand_owner" || role === "brand_manager";
  const plans = isBrand ? Object.values(BRAND_PLANS) : Object.values(CREATOR_PLANS);

  const quota = isBrand ? getQuota("activeCampaigns") : getQuota("campaignApplications");
  const quotaLabel = isBrand ? "Active Campaign Briefs" : "Monthly Campaign Pitches";

  const handleSavePreferences = () => {
    addToast({
      type: "success",
      title: "Settings Saved",
      message: "Account and payout preferences updated successfully.",
    });
  };

  const handlePlanChange = async (targetPlan: SubscriptionPlan) => {
    if (subscription?.planId === targetPlan.id) return;

    setProcessingPlanId(targetPlan.id);
    try {
      await upgradePlan(targetPlan.id as SubscriptionPlanId, isAnnual ? "annual" : "monthly");
      addToast({
        type: "success",
        title: "Plan Updated",
        message: `Your workspace has been successfully updated to ${targetPlan.name}.`,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Plan Update Failed",
        message: err.message || "Failed to switch plans. Please try again.",
      });
    } finally {
      setProcessingPlanId(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your plan? You will retain access until the end of the current billing cycle.")) {
      return;
    }

    setIsCancelling(true);
    try {
      await cancelPlan(false);
      addToast({
        type: "info",
        title: "Subscription Cancelled",
        message: "Your subscription will not renew after the current billing cycle.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Cancellation Failed",
        message: err.message || "Failed to cancel subscription.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleResumeSubscription = async () => {
    try {
      await resumePlan();
      addToast({
        type: "success",
        title: "Subscription Resumed",
        message: "Your subscription renewal has been reactivated successfully.",
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Resume Failed",
        message: err.message || "Failed to resume subscription.",
      });
    }
  };

  const periodEndFormatted = subscription?.currentPeriodEnd
    ? format(new Date(subscription.currentPeriodEnd), "MMMM dd, yyyy")
    : "Next month";

  return (
    <div className="space-y-8 max-w-5xl text-[#0A0A0E] select-none font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              Workspace Controls
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <SubscriptionBadge planId={subscription?.planId} role={role} size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Plan, Billing &amp; Workspace Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Manage your subscription tier, quota limits, payout destination, and security credentials.
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 self-start sm:self-center"
        >
          <Save className="w-4 h-4 text-[#0A0A0E]" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-black/8 pb-px">
        <button
          onClick={() => setActiveTab("billing")}
          className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 border-b-2 ${
            activeTab === "billing"
              ? "border-[#0A0A0E] text-[#0A0A0E] bg-white"
              : "border-transparent text-[#6A6A78] hover:text-[#0A0A0E]"
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#FFD21F]" />
          <span>Plan &amp; Billing</span>
        </button>

        <button
          onClick={() => setActiveTab("payout")}
          className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 border-b-2 ${
            activeTab === "payout"
              ? "border-[#0A0A0E] text-[#0A0A0E] bg-white"
              : "border-transparent text-[#6A6A78] hover:text-[#0A0A0E]"
          }`}
        >
          <Wallet className="w-4 h-4 text-[#FFD21F]" />
          <span>Payout &amp; Banking</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs transition-all flex items-center gap-2 border-b-2 ${
            activeTab === "security"
              ? "border-[#0A0A0E] text-[#0A0A0E] bg-white"
              : "border-transparent text-[#6A6A78] hover:text-[#0A0A0E]"
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#FFD21F]" />
          <span>API &amp; Security</span>
        </button>
      </div>

      {/* ── TAB 1: PLAN & BILLING ── */}
      {activeTab === "billing" && (
        <div className="space-y-8">
          {/* Active Plan Hero Card */}
          <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#6A6A78]">
                    Active Workspace Tier
                  </span>
                  <SubscriptionBadge planId={subscription?.planId} role={role} size="md" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#0A0A0E]">
                  {currentPlan?.name || "Active Subscription"}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5A68]">
                  {currentPlan?.description}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <div className="text-2xl sm:text-3xl font-black font-display text-[#0A0A0E]">
                  ${subscription?.price !== undefined ? subscription.price : currentPlan?.monthlyPrice}
                  <span className="text-xs text-[#6A6A78] font-normal font-sans ml-1">
                    {subscription?.interval === "annual" ? "/year" : "/month"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#5A5A68]">
                  <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" />
                  <span>
                    {subscription?.cancelAtPeriodEnd
                      ? `Access ends on ${periodEndFormatted}`
                      : `Renews automatically on ${periodEndFormatted}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Quota Progress Meter */}
            <div className="space-y-2 pt-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#0A0A0E] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FFD21F]" />
                  <span>{quotaLabel} Quota</span>
                </span>
                <span className="text-[#5A5A68]">
                  {quota.limit === -1 ? (
                    <span className="font-bold text-emerald-600">UNLIMITED</span>
                  ) : (
                    <span>
                      <strong className="text-[#0A0A0E]">{quota.current}</strong> / {quota.limit} used ({quota.percent}%)
                    </span>
                  )}
                </span>
              </div>

              {quota.limit !== -1 && (
                <div className="w-full h-3 rounded-full bg-[#F0F0F4] overflow-hidden">
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
            </div>

            {/* Subscription State Actions */}
            {role !== "agency_admin" && role !== "super_admin" && (
              <div className="pt-4 border-t border-black/6 flex flex-wrap items-center justify-between gap-4 text-xs">
                {subscription?.cancelAtPeriodEnd ? (
                  <div className="flex items-center gap-3">
                    <span className="text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                      Subscription scheduled for cancellation at period end.
                    </span>
                    <button
                      onClick={handleResumeSubscription}
                      className="px-4 py-1.5 rounded-full bg-[#0A0A0E] hover:bg-[#20202B] text-white font-bold transition-all"
                    >
                      Resume Subscription
                    </button>
                  </div>
                ) : subscription?.price && subscription.price > 0 ? (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={isCancelling}
                    className="text-[#8A8A9A] hover:text-red-600 font-medium transition-colors underline underline-offset-4"
                  >
                    {isCancelling ? "Processing cancellation..." : "Cancel subscription at period end"}
                  </button>
                ) : (
                  <span className="text-[#8A8A9A]">
                    Free Starter tier has no recurring charges or billing commitments.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Change / Upgrade Plan Selection Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#0A0A0E] font-display">
                  Available {isBrand ? "Brand" : "Creator"} Plans
                </h3>
                <p className="text-xs text-[#5A5A68]">
                  Switch between plans instantly with real-time benefit updates.
                </p>
              </div>

              {/* Annual / Monthly Toggle */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#F4F4F8] border border-black/8 text-xs self-start sm:self-center">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-3.5 py-1.5 rounded-full transition-all font-bold ${
                    !isAnnual ? "bg-[#0A0A0E] text-white shadow-xs" : "text-[#6A6A78] hover:text-[#0A0A0E]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-3.5 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                    isAnnual ? "bg-[#0A0A0E] text-white shadow-xs" : "text-[#6A6A78] hover:text-[#0A0A0E]"
                  }`}
                >
                  <span>Annual</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((p) => {
                const isCurrent = subscription?.planId === p.id;
                const price = isAnnual ? p.annualPrice : p.monthlyPrice;
                const isProcessing = processingPlanId === p.id;

                return (
                  <div
                    key={p.id}
                    className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative border ${
                      p.highlight
                        ? "bg-gradient-to-b from-[#FFFDF5] to-white border-2 border-[#FFD21F] shadow-[0_8px_30px_rgba(255,210,31,0.2)]"
                        : isCurrent
                        ? "bg-white border-2 border-black/20 shadow-xs"
                        : "bg-white border-black/10 hover:border-black/20 shadow-xs"
                    }`}
                  >
                    {p.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs flex items-center gap-1 z-20">
                        <Sparkles className="w-3 h-3" />
                        <span>RECOMMENDED</span>
                      </div>
                    )}

                    {isCurrent && !p.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/10 border border-black/20 text-[#0A0A0E] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs z-20">
                        ACTIVE PLAN
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold font-display text-[#0A0A0E]">{p.name}</h4>
                        <p className="text-xs text-[#6A6A78] mt-1 font-sans leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1 font-mono pt-2">
                        <span className="text-3xl font-black text-[#0A0A0E] font-display">
                          ${price}
                        </span>
                        <span className="text-xs text-[#6A6A78] font-sans">
                          {price === 0 ? "forever" : isAnnual ? "/mo (billed annually)" : "/month"}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-black/6 space-y-2.5">
                        {p.featureBullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#3A3A48]">
                            <div className="w-4 h-4 rounded-full bg-[#FFD21F]/25 text-[#0A0A0E] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-[#0A0A0E]" />
                            </div>
                            <span className="leading-tight">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handlePlanChange(p)}
                        disabled={isCurrent || (isLoading && isProcessing)}
                        className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 ${
                          isCurrent
                            ? "bg-black/5 text-[#8A8A9A] cursor-not-allowed border border-black/10"
                            : p.highlight
                            ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_16px_rgba(255,210,31,0.4)] font-extrabold"
                            : "bg-[#0A0A0E] hover:bg-[#1A1A24] text-white"
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-current" />
                            <span>Updating Plan...</span>
                          </>
                        ) : isCurrent ? (
                          <span>Current Active Plan</span>
                        ) : (
                          <>
                            <span>Select {p.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: PAYOUT & BANKING ── */}
      {activeTab === "payout" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
              <Wallet className="w-4 h-4 text-[#FFD21F]" />
              <span>Escrow &amp; Payout Rails</span>
            </div>
            <p className="text-xs text-[#5A5A68] leading-relaxed">
              {role === "creator"
                ? "Manage your connected Stripe Connect Express bank accounts for milestone disbursements."
                : "Manage funding accounts and corporate payment cards for 100% pre-funded campaign escrow deposits."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Connected Stripe / Bank Account"
                value={stripeAccount}
                onChange={(e) => setStripeAccount(e.target.value)}
              />
              <Input
                label="Tax ID / W-9 / GST Compliance"
                value="Verified • Ending in 9921"
                disabled
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: API & SECURITY ── */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
              <Smartphone className="w-4 h-4 text-[#FFD21F]" />
              <span>Cross-Platform API &amp; React Native Mobile Sync</span>
            </div>
            <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
              Your credentials, active subscriptions, and campaigns are synchronized in realtime across the Collably Web &amp; Mobile Workspace.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[#0A0A0E] font-mono text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
              Core API &amp; Webhook Rails: Connected &amp; Ready
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
