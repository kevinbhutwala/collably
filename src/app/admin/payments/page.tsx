"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/stores/ui.store";

export default function AdminPaymentsVaultPage() {
  const { addToast } = useUIStore();
  const [escrowVaults, setEscrowVaults] = useState([
    { id: "vault-1", brand: "Linear Dynamics", campaign: "AI-Powered Sprint Workflows", amount: 45000, locked: 41500, released: 3500 },
    { id: "vault-2", brand: "Aethel Watches", campaign: "The Architecture of Time", amount: 32000, locked: 29200, released: 2800 },
    { id: "vault-3", brand: "Kuro Recovery Lab", campaign: "Thermal Contrast Protocol", amount: 60000, locked: 60000, released: 0 },
  ]);

  const handleReleaseTranche = (vaultId: string) => {
    addToast({
      type: "success",
      title: "Escrow Milestone Released",
      message: "Direct deposit triggered to creator Stripe account.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Escrow & Payout Vault Control
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Audited solvency, platform commission take-rate, and manual payout override controls.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="divide-y divide-slate-100 font-mono text-xs">
          {escrowVaults.map((v) => (
            <div key={v.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 font-sans">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{v.campaign}</h4>
                  <Badge variant="glow" size="sm">{v.brand}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono">Vault ID: {v.id}</p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Escrow</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(v.amount)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Locked</span>
                  <span className="text-amber-600 font-bold">{formatCurrency(v.locked)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Released</span>
                  <span className="text-emerald-600 font-bold">{formatCurrency(v.released)}</span>
                </div>
                <Button variant="accent" size="sm" onClick={() => handleReleaseTranche(v.id)}>
                  Release Tranche
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
