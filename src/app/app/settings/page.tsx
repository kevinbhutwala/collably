"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Input } from "@/components/ui/Input";
import { Wallet, Save, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const { user, role } = useAuthStore();
  const { addToast } = useUIStore();
  const [stripeAccount, setStripeAccount] = useState("acct_1NZxxxxxxxxx (Verified)");

  const handleSave = () => {
    addToast({
      type: "success",
      title: "Settings Saved",
      message: "Account and payment settings updated successfully.",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Account &amp; Security Settings
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Manage your payout methods, authentication, and mobile app sync.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4 text-[#0A0A0E]" />
          <span>Save Preferences</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Payout & Escrow Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
            <Wallet className="w-4 h-4 text-[#FFD21F]" />
            <span>Escrow &amp; Payout Destination</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Input
              label="Connected Stripe / Bank Account"
              value={stripeAccount}
              onChange={(e) => setStripeAccount(e.target.value)}
            />
            <Input
              label="Tax ID / W-9 / GST"
              value="Verified • Ending in 9921"
              disabled
            />
          </div>
        </div>

        {/* Cross-Platform App Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
            <Smartphone className="w-4 h-4 text-[#FFD21F]" />
            <span>Cross-Platform API &amp; React Native Mobile Sync</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed font-sans">
            Your credentials and active campaigns are synced across the Collably Web Workspace.
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
            Core API: Connected &amp; Ready
          </span>
        </div>
      </div>
    </div>
  );
}
