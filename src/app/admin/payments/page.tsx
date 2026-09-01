"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";

export default function AdminPaymentsVaultPage() {
  const { addToast } = useUIStore();
  const [escrowVaults] = useState([
    { id: "vault-1", brand: "Linear Dynamics", campaign: "AI-Powered Sprint Workflows", amount: 45000, locked: 41500, released: 3500 },
    { id: "vault-2", brand: "Aethel Watches", campaign: "The Architecture of Time", amount: 32000, locked: 29200, released: 2800 },
    { id: "vault-3", brand: "Kuro Recovery Lab", campaign: "Thermal Contrast Protocol", amount: 60000, locked: 60000, released: 0 },
  ]);

  const handleReleaseTranche = (vaultId: string) => {
    addToast({
      type: "success",
      title: "Escrow Milestone Released",
      message: `Direct deposit triggered for ${vaultId} to creator Stripe account.`,
    });
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Settlement
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Escrow &amp; Payout Vault Control
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Audited solvency, platform commission take-rate, and manual payout override controls.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 font-mono text-xs">
          {escrowVaults.map((v) => (
            <div key={v.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 font-sans">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{v.campaign}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                    {v.brand}
                  </span>
                </div>
                <p className="text-xs text-[#7A7A8A] font-mono">Vault ID: {v.id}</p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Total Escrow</span>
                  <span className="text-[#0A0A0E] font-extrabold">{formatCurrency(v.amount)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Locked</span>
                  <span className="text-[#0A0A0E] font-bold">{formatCurrency(v.locked)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Released</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {formatCurrency(v.released)}
                  </span>
                </div>
                <button
                  onClick={() => handleReleaseTranche(v.id)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 transition-all"
                >
                  Release Tranche
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
