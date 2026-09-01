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
    <div className="space-y-10 max-w-4xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Account &amp; Security Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Manage your payout methods, authentication, and mobile app sync.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />} className="rounded-full font-display font-bold">
          Save Preferences
        </Button>
      </div>

      <div className="space-y-8">
        {/* Payout & Escrow Settings */}
        <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-display">
            <Wallet className="w-4 h-4 text-emerald-400" />
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
        <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-[hsl(327,100%,55%)] font-bold text-sm font-display">
            <Smartphone className="w-4 h-4" />
            <span>Cross-Platform API &amp; React Native Mobile Sync</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Your credentials and active campaigns are synced across the Collably Web Workspace.
          </p>
          <Badge variant="glow" size="sm">Core API: Connected &amp; Ready</Badge>
        </div>
      </div>
    </div>
  );
}
