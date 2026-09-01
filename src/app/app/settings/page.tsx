"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
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
    <div className="space-y-8 max-w-4xl text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Account &amp; Security Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Manage your payout methods, authentication, and mobile app sync.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4 text-[#B7FF3C]" />} className="rounded-[9px]">
          Save Preferences
        </Button>
      </div>

      <div className="space-y-6">
        {/* Payout & Escrow Settings */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#111111] font-bold text-sm font-display">
            <Wallet className="w-4 h-4 text-[#111111]" />
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
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#111111] font-bold text-sm font-display">
            <Smartphone className="w-4 h-4" />
            <span>Cross-Platform API &amp; React Native Mobile Sync</span>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
            Your credentials and active campaigns are synced across the Collably Web Workspace.
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
            Core API: Connected &amp; Ready
          </span>
        </div>
      </div>
    </div>
  );
}
