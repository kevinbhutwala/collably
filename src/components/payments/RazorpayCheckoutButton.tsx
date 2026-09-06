"use client";

import React, { useState } from "react";
import { useUIStore } from "@/stores/ui.store";
import { Loader2, ShieldCheck } from "lucide-react";

export interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface RazorpaySuccessPayload {
  orderId: string;
  paymentId: string;
  signature: string;
  verified: boolean;
}

export interface RazorpayCheckoutButtonProps {
  amount: number; // In Rupees or base currency units (e.g. 1500 for ₹1,500)
  currency?: string; // Default: 'INR'
  name?: string; // Business name, e.g. 'AbeyCollab Escrow'
  description?: string; // e.g. 'Milestone Deposit'
  prefill?: RazorpayPrefill;
  notes?: Record<string, string>;
  onSuccess?: (payload: RazorpaySuccessPayload) => void;
  onError?: (error: Error) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Dynamically loads the official Razorpay checkout.js script if not already loaded
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK script");
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function RazorpayCheckoutButton({
  amount,
  currency = "INR",
  name = "AbeyCollab Escrow Custody",
  description = "Milestone Payment Protection",
  prefill = {},
  notes = {},
  onSuccess,
  onError,
  className = "",
  children,
  disabled = false,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useUIStore();

  const handleCheckout = async () => {
    if (loading || disabled) return;
    setLoading(true);

    try {
      // 1. Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to load Razorpay checkout gateway. Please check your internet connection.");
      }

      // Convert amount to paise (min 100 paise)
      const amountInPaise = Math.max(Math.round(amount * 100), 100);

      // 2. Call backend order creation endpoint
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: currency.toUpperCase(),
          receipt: `rcpt_${Date.now()}`,
          notes,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to initialize payment order.");
      }

      const keyId =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "rzp_test_TYeenqq8U62r7u";

      // 3. Configure Razorpay Standard Checkout options
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: name,
        description: description,
        image: "/favicon.svg",
        order_id: orderData.order_id,
        prefill: {
          name: prefill.name || "AbeyCollab Client",
          email: prefill.email || "brand@abeycollab.io",
          contact: prefill.contact || "9999999999",
        },
        notes: notes,
        theme: {
          color: "#FFD21F", // Solar Yellow branding
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            addToast({
              type: "info",
              title: "Payment Cancelled",
              message: "You closed the Razorpay checkout window without completing payment.",
            });
          },
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 4. Verify signature on backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment signature verification failed.");
            }

            addToast({
              type: "success",
              title: "Payment Successful",
              message: `Payment ${response.razorpay_payment_id} verified & secured in platform custody.`,
            });

            onSuccess?.({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              verified: true,
            });
          } catch (verifyErr: any) {
            console.error("Signature verification error:", verifyErr);
            addToast({
              type: "error",
              title: "Verification Failed",
              message: verifyErr.message || "Failed to cryptographically verify payment signature.",
            });
            onError?.(verifyErr);
          } finally {
            setLoading(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);

      // Handle payment failures
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Razorpay payment failed:", response.error);
        setLoading(false);
        const errMsg = response.error?.description || "Payment attempt failed.";
        addToast({
          type: "error",
          title: "Payment Failed",
          message: errMsg,
        });
        onError?.(new Error(errMsg));
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Razorpay checkout error:", err);
      setLoading(false);
      addToast({
        type: "error",
        title: "Checkout Error",
        message: err.message || "An error occurred while launching Razorpay checkout.",
      });
      onError?.(err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={
        className ||
        "px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs shadow-xs border border-black/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
      }
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
          <span>Opening Gateway...</span>
        </>
      ) : children ? (
        children
      ) : (
        <>
          <ShieldCheck className="w-4 h-4 text-[#0A0A0E]" />
          <span>Pay with Razorpay (₹{amount.toLocaleString()})</span>
        </>
      )}
    </button>
  );
}
