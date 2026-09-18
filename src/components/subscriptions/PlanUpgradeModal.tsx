"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { CREATOR_PLANS, BRAND_PLANS } from "@/core/constants";
import { SubscriptionPlan, SubscriptionPlanId } from "@/core/types";
import { Check, Sparkles, Zap, ShieldCheck, Crown, Loader2, ArrowRight, CreditCard, Lock, RefreshCw } from "lucide-react";
import { useGlobalCurrency } from "@/context/CurrencyContext";
import { getExchangeRateToUSD } from "@/core/utils/currency";

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
  const { rates, rateTimestamp } = useGlobalCurrency();
  const [isRefreshingRates, setIsRefreshingRates] = useState(false);

  const [isAnnual, setIsAnnual] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const inrRate = getExchangeRateToUSD("INR");

  const handleRefreshRates = async () => {
    setIsRefreshingRates(true);
    try {
      await useUIStore.getState().fetchLiveRates(true);
      addToast({
        type: "success",
        title: "Exchange Rates Updated",
        message: `Live exchange rates refreshed (1 USD = ₹${getExchangeRateToUSD("INR").toFixed(2)} INR).`,
      });
    } catch {
      addToast({
        type: "info",
        title: "Rates Current",
        message: "Using verified fallback and cached exchange rate data.",
      });
    } finally {
      setIsRefreshingRates(false);
    }
  };

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

    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

    // If free plan, upgrade directly
    if (price === 0) {
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
      return;
    }

    // Paid Plan: Launch Razorpay Standard Checkout
    setProcessingPlanId(plan.id);
    try {
      const { loadRazorpayScript } = await import("@/components/payments/RazorpayCheckoutButton");
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to connect to Razorpay payment gateway.");
      }

      // Convert USD pricing to INR paise (min 100 paise) using live or cached exchange rate
      const annualTotalUSD = plan.annualPrice * 12;
      const billingTotalUSD = isAnnual ? annualTotalUSD : plan.monthlyPrice;
      const currentRate = inrRate || 83.5;
      const amountInINR = Math.round(billingTotalUSD * currentRate);
      const amountInPaise = Math.max(amountInINR * 100, 100);

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `sub_${plan.id}_${Date.now()}`,
          notes: {
            planId: plan.id,
            interval: isAnnual ? "annual" : "monthly",
            exchangeRate: currentRate,
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to initialize subscription checkout order.");
      }

      const keyId =
        orderData.key_id ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "rzp_test_TYfXLPQ4zSkONc";

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AbeyCollab Subscriptions",
        description: `${plan.name} (${isAnnual ? "Annual Billing" : "Monthly Billing"})`,
        image: "/favicon.svg",
        order_id: orderData.isTest ? undefined : orderData.order_id,
        prefill: {
          name: "AbeyCollab Workspace",
          email: "billing@abeycollab.io",
          contact: "9999999999",
        },
        theme: {
          color: "#FFD21F",
        },
        modal: {
          ondismiss: function () {
            setProcessingPlanId(null);
            addToast({
              type: "info",
              title: "Upgrade Cancelled",
              message: "Checkout window was closed without completing payment.",
            });
          },
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Verify signature on backend with exact matching amounts
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: amountInINR,
                currency: "INR",
                usdAmount: billingTotalUSD,
                exchangeRate: currentRate,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            // Complete subscription state update with verified payment ID
            await upgradePlan(
              plan.id as SubscriptionPlanId,
              isAnnual ? "annual" : "monthly",
              response.razorpay_payment_id
            );
            addToast({
              type: "success",
              title: "Payment Verified & Plan Activated!",
              message: `Payment ${response.razorpay_payment_id} confirmed. You are now on ${plan.name}!`,
            });
            closeUpgradeModal();
          } catch (verifyErr: any) {
            console.error("Signature verification error:", verifyErr);
            addToast({
              type: "error",
              title: "Verification Failed",
              message: verifyErr.message || "Failed to verify payment signature.",
            });
          } finally {
            setProcessingPlanId(null);
          }
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.open();
    } catch (err: any) {
      setProcessingPlanId(null);
      addToast({
        type: "error",
        title: "Checkout Error",
        message: err.message || "Could not launch Razorpay checkout.",
      });
    }
  };

  return (
    <Modal
      isOpen={isUpgradeModalOpen}
      onClose={closeUpgradeModal}
      title="Choose Your Workspace Plan"
      maxWidth="5xl"
    >
      <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none p-1">
        {/* Header & Annual Toggle */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] font-sans">
            Choose the tier that matches your collaboration volume. Upgrade, downgrade, or change anytime.
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-[#F4F4F8] dark:bg-[#14141E] border border-black/8 dark:border-white/10 text-xs font-sans">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold ${
                  !isAnnual
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                    : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                    : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#0A0A0E] text-white text-[10px] font-mono font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>

            <button
              onClick={handleRefreshRates}
              disabled={isRefreshingRates}
              title="Refresh live exchange rate from financial feeds"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold bg-[#F4F4F8] dark:bg-[#14141E] border border-black/8 dark:border-white/10 text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white transition-all shadow-xs"
            >
              <RefreshCw className={`w-3 h-3 text-[#FFD21F] ${isRefreshingRates ? "animate-spin" : ""}`} />
              <span>$1 = ₹{inrRate.toFixed(2)}</span>
            </button>
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
                  isCurrent
                    ? "bg-white dark:bg-[#151522] border-2 border-emerald-500/60 dark:border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20"
                    : p.highlight
                    ? "bg-gradient-to-b from-[#FFFDF5] to-white dark:from-[#1A1A28] dark:to-[#12121C] border-2 border-[#FFD21F] shadow-[0_8px_30px_rgba(255,210,31,0.22)]"
                    : "bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Status & Badge Pill Area (Cleanly integrated INSIDE the card) */}
                  <div className="flex items-center justify-between gap-2 min-h-[26px]">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[10px] tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current Plan
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#8A8A9A] uppercase tracking-wider font-semibold">
                        {p.badge || "TIER"}
                      </span>
                    )}

                    {p.highlight && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#0A0A0E]" />
                        Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-[#0A0A0E] dark:text-white">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#6A6A78] dark:text-[#9A9AA8] mt-1 font-sans leading-relaxed min-h-[36px]">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-1 font-mono">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
                        ${price}
                      </span>
                      <span className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans">
                        {price === 0 ? "forever" : isAnnual ? "/mo (annual)" : "/month"}
                      </span>
                    </div>
                    {price > 0 && (
                      <p className="text-[11px] text-[#6A6A78] dark:text-[#A0A0B4] font-mono mt-1 font-semibold">
                        ≈ ₹{Math.round((isAnnual ? price * 12 : price) * inrRate).toLocaleString("en-IN")} INR ($1 = ₹{inrRate.toFixed(2)})
                      </p>
                    )}
                    {isAnnual && price > 0 && (
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans mt-0.5 font-bold">
                        Billed annually (${price * 12}/yr)
                      </p>
                    )}
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
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 cursor-default flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Current Active Plan</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelectPlan(p)}
                      disabled={isLoading && isProcessing}
                      className={`w-full py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-98 ${
                        p.highlight
                          ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_16px_rgba(255,210,31,0.4)] font-extrabold"
                          : "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] hover:bg-[#1A1A24] dark:hover:bg-[#FFE052] font-bold shadow-md"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-current" />
                          <span>Connecting to Gateway...</span>
                        </>
                      ) : price > 0 ? (
                        <>
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay ${isAnnual ? price * 12 : price} (₹{Math.round((isAnnual ? price * 12 : price) * 83.5).toLocaleString("en-IN")}) &amp; Activate</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Switch to Free Starter</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                  {price > 0 && !isCurrent && (
                    <div className="flex items-center justify-center gap-1 text-[10px] text-[#6A6A78] dark:text-[#8E8EA4] mt-2">
                      <Lock className="w-2.5 h-2.5 text-emerald-500" />
                      <span>Secured with Razorpay 256-bit encryption</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
