"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Wallet, Save, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const { user, role } = useAuthStore();
  const { addToast } = useUIStore();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [stripeAccount, setStripeAccount] = useState("acct_1NZxxxxxxxxx (Verified)");

  const handleSave = () => {
    addToast({
      type: "success",
      title: "Settings Saved",
      message: "Account and payment settings updated successfully.",
    });
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account & Security Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your payout methods, authentication, and mobile app sync.
          </p>
        </div>

        <Button variant="accent" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
          Save Preferences
        </Button>
      </div>

      <div className="space-y-8">
        {/* Payout & Escrow Settings */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Escrow & Payout Destination</span>
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
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-brand-accent font-bold text-sm">
            <Smartphone className="w-4 h-4" />
            <span>Cross-Platform API & React Native Mobile Sync</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your credentials and active campaigns are synced across the Collably Web Workspace.
          </p>
          <Badge variant="glow" size="sm">Core API: Connected & Ready</Badge>
        </div>
      </div>
    </div>
  );
}
