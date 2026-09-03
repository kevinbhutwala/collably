"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { CREATOR_PLANS, BRAND_PLANS } from "@/core/constants";
import { SubscriptionPlan, SubscriptionPlanId } from "@/core/types";
import { Check, Sparkles, Zap, ShieldCheck, Crown, Loader2, ArrowRight } from "lucide-react";

export function PlanUpgradeModal() {
  const {
    isUpgradeModalOpen,
    closeUpgradeModal,
    subscription,
    currentPlan,
    upgradePlan,
    isLoading,
  } = useSubscriptionStore();
  const { role } = useAuthStore();
  const { addToast } = useUIStore();

  const [isAnnual, setIsAnnual] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const isBrand = role === "brand" || role === "brand_owner" || role === "brand_manager";
  const plans = isBrand ? Object.values(BRAND_PLANS) : Object.values(CREATOR_PLANS);

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (subscription?.planId === plan.id) {
      addToast({
        type: "info",
        title: "Current Active Plan",
        message: `You are already subscribed to ${plan.name}.`,
      });
      return;
    }

    setProcessingPlanId(plan.id);
    try {
      await upgradePlan(plan.id as SubscriptionPlanId, isAnnual ? "annual" : "monthly");
      addToast({
        type: "success",
        title: "Subscription Updated!",
        message: `Successfully updated your workspace plan to ${plan.name}. All features and limits are now active!`,
      });
      closeUpgradeModal();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Upgrade Failed",
        message: err.message || "Failed to upgrade subscription. Please try again.",
      });
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <Modal
      isOpen={isUpgradeModalOpen}
      onClose={closeUpgradeModal}
      title="Upgrade Your Workspace Plan"
      maxWidth="3xl"
    >

      <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none p-1">
        {/* Header & Annual Toggle */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] font-sans">
            Choose the tier that matches your collaboration volume. Upgrade or change anytime.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-[#F4F4F8] dark:bg-[#14141E] border border-black/8 dark:border-white/10 text-xs font-sans">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold ${
                  !isAnnual
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] shadow-xs"
                    : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] shadow-xs"
                    : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#FFD21F] dark:bg-[#0A0A0E] text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => {
            const isCurrent = subscription?.planId === p.id;
            const price = isAnnual ? p.annualPrice : p.monthlyPrice;
            const isProcessing = processingPlanId === p.id;

            return (
              <div
                key={p.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative border ${
                  p.highlight
                    ? "bg-gradient-to-b from-[#FFFDF5] to-white dark:from-[#1A1A28] dark:to-[#12121C] border-2 border-[#FFD21F] shadow-[0_8px_30px_rgba(255,210,31,0.2)]"
                    : isCurrent
                    ? "bg-white dark:bg-[#181824] border-2 border-black/20 dark:border-[#FFD21F]/50 shadow-xs"
                    : "bg-white dark:bg-[#14141E] border-black/10 dark:border-white/10 hover:border-black/20 shadow-xs"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs flex items-center gap-1 z-20">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                {isCurrent && !p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/10 dark:bg-[#FFD21F]/20 border border-black/20 dark:border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs z-20">
                    CURRENT PLAN
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold font-display text-[#0A0A0E] dark:text-white">{p.name}</h3>
                    </div>
                    <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8] mt-1 font-sans">{p.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 font-mono pt-2">
                    <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
                      ${price}
                    </span>
                    <span className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
                      {price === 0 ? "forever" : isAnnual ? "/mo (billed annually)" : "/month"}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-black/6 dark:border-white/10 space-y-2">
                    {p.featureBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#3A3A48] dark:text-[#C8C8DC]">
                        <div className="w-4 h-4 rounded-full bg-[#FFD21F]/25 dark:bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#0A0A0E] dark:text-[#FFD21F]" />
                        </div>
                        <span className="leading-tight">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleSelectPlan(p)}
                    disabled={isCurrent || (isLoading && isProcessing)}
                    className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 ${
                      isCurrent
                        ? "bg-black/5 dark:bg-white/10 text-[#8A8A9A] dark:text-[#8E8EA4] cursor-not-allowed border border-black/10 dark:border-white/10"
                        : p.highlight
                        ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_16px_rgba(255,210,31,0.4)] font-extrabold"
                        : "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] hover:bg-[#1A1A24] dark:hover:bg-[#FFE052] font-bold shadow-xs"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-current" />
                        <span>Updating...</span>
                      </>
                    ) : isCurrent ? (
                      <span>Active Plan</span>
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
    </Modal>
  );
}
