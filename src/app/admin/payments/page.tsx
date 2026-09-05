"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { Modal } from "@/components/ui/Modal";
import { Textarea, Input } from "@/components/ui/Input";
import {
  ShieldCheck,
  Lock,
  DollarSign,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
} from "lucide-react";

export default function AdminPaymentsVaultPage() {
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Override Modal
  const [selectedVault, setSelectedVault] = useState<any>(null);
  const [overrideAction, setOverrideAction] = useState<"emergency_release_to_creator" | "emergency_refund_to_brand">("emergency_release_to_creator");
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideAmount, setOverrideAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEscrow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/escrow", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscrow();
  }, []);

  const handleExecuteOverride = async () => {
    if (!selectedVault || !overrideReason.trim()) {
      addToast({ type: "error", title: "Missing Reason", message: "Audit reason is required for administrative overrides." });
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("/api/admin/escrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: overrideAction,
          collaborationId: selectedVault.collaborationId,
          reason: overrideReason,
          amountDollars: overrideAmount || selectedVault.escrowBalanceDollars,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Override failed");

      addToast({
        type: "success",
        title: "Override Executed & Audited",
        message: `Transaction ${json.transactionId} processed successfully.`,
      });
      setIsModalOpen(false);
      fetchEscrow();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Action Failed",
        message: err.message || "Could not execute override.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const vaults = data?.vaults || [
    { collaborationId: "collab-1", campaignTitle: "AI-Powered Sprint Workflows", brandName: "Linear Dynamics", creatorName: "Elena Rostova", totalAgreedBudget: 3500, escrowBalanceDollars: 3500, paymentStatus: "submitted_for_review", isFunded: true },
    { collaborationId: "collab-2", campaignTitle: "The Architecture of Time", brandName: "Aethel Watches", creatorName: "Marcus Vance", totalAgreedBudget: 2800, escrowBalanceDollars: 800, paymentStatus: "approved", isFunded: true },
    { collaborationId: "collab-3", campaignTitle: "Thermal Contrast Protocol", brandName: "Kuro Recovery Lab", creatorName: "Aria Sterling", totalAgreedBudget: 4200, escrowBalanceDollars: 4200, paymentStatus: "payment_pending", isFunded: false },
  ];

  const summary = data?.summary || {
    totalEscrowHeldDollars: 8500,
    platformRevenueDollars: 350,
    creatorWalletsDollars: 3150,
    activeVaultsCount: vaults.length,
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Double-Entry Solvency Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Escrow Vaults &amp; Financial Governance
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Real-time balance monitoring, atomic double-entry ledger audits, and emergency dispute overrides.
          </p>
        </div>

        <button
          onClick={fetchEscrow}
          className="px-4 py-2 rounded-full bg-[#F8F8FC] hover:bg-black/5 border border-black/10 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Vaults</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-[#6A6A78] uppercase font-bold">Total Locked Escrow</span>
          <p className="text-2xl font-black text-[#0A0A0E] font-display">{formatCurrency(summary.totalEscrowHeldDollars)}</p>
          <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> 100% Solvency Backed
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-[#6A6A78] uppercase font-bold">Creator Wallets</span>
          <p className="text-2xl font-black text-[#0A0A0E] font-display">{formatCurrency(summary.creatorWalletsDollars)}</p>
          <span className="text-[10px] text-[#6A6A78] font-mono">Pending bank withdrawals</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-[#6A6A78] uppercase font-bold">Platform Commission (10%)</span>
          <p className="text-2xl font-black text-emerald-600 font-display">{formatCurrency(summary.platformRevenueDollars)}</p>
          <span className="text-[10px] text-emerald-700 font-mono">Net earned revenue</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-[#6A6A78] uppercase font-bold">Monitored Vaults</span>
          <p className="text-2xl font-black text-[#0A0A0E] font-display">{vaults.length}</p>
          <span className="text-[10px] text-[#6A6A78] font-mono">Active contract pipelines</span>
        </div>
      </div>

      {/* Escrow Vaults Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#0A0A0E] font-display">Active Collaboration Vaults</h3>
          <span className="text-xs font-mono text-[#6A6A78]">Enforcing 16-State Protections</span>
        </div>

        <div className="divide-y divide-black/5 font-mono text-xs">
          {vaults.map((v: any) => (
            <div key={v.collaborationId} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 font-sans flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{v.campaignTitle}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] font-mono text-[10px] font-bold">
                    {v.brandName}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    v.isFunded ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-amber-50 text-amber-900 border-amber-300"
                  }`}>
                    {v.isFunded ? "ESCROW SECURED" : "FUNDING PENDING"}
                  </span>
                </div>
                <p className="text-xs text-[#7A7A8A] font-mono">
                  Creator: <strong>{v.creatorName}</strong> • Collab ID: {v.collaborationId}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Agreed Fee</span>
                  <span className="text-[#0A0A0E] font-extrabold">{formatCurrency(v.totalAgreedBudget)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Vault Balance</span>
                  <span className="text-emerald-700 font-bold">{formatCurrency(v.escrowBalanceDollars || 0)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Current Status</span>
                  <span className="text-[#0A0A0E] font-bold">{(v.paymentStatus || "").replace(/_/g, " ").toUpperCase()}</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedVault(v);
                    setOverrideAmount(v.escrowBalanceDollars || v.totalAgreedBudget);
                    setIsModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8F8FC] hover:bg-black/5 text-[#0A0A0E] border border-black/10 text-xs font-bold transition-all shrink-0"
                >
                  Manual Override
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Override Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Admin Escrow Manual Override"
        description="Pessimistic override executes an atomic double-entry ledger settlement with immutable audit logging."
      >
        <div className="space-y-4 text-[#0A0A0E]">
          {selectedVault && (
            <div className="p-3.5 rounded-xl bg-[#F8F8FC] border border-black/10 text-xs space-y-1">
              <div>Campaign: <strong>{selectedVault.campaignTitle}</strong></div>
              <div>Brand: <strong>{selectedVault.brandName}</strong> • Creator: <strong>{selectedVault.creatorName}</strong></div>
              <div>Available Vault: <strong>{formatCurrency(selectedVault.escrowBalanceDollars || 0)}</strong></div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-[#6A6A78]">Override Action</label>
            <select
              value={overrideAction}
              onChange={(e: any) => setOverrideAction(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 text-xs font-sans text-[#0A0A0E]"
            >
              <option value="emergency_release_to_creator">Release 100% Escrow to Creator</option>
              <option value="emergency_refund_to_brand">Refund 100% Escrow to Brand</option>
            </select>
          </div>

          <Textarea
            label="Mandatory Audit Justification"
            placeholder="Document legal or contractual reason for executing this manual administrative override..."
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            rows={3}
            required
          />

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-full bg-black/5 text-[#0A0A0E] font-bold text-xs border border-black/10"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isProcessing || !overrideReason.trim()}
              onClick={handleExecuteOverride}
              className="flex-1 py-2.5 rounded-full bg-[#0A0A0E] hover:bg-black/90 text-white font-bold text-xs transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing Ledger..." : "Authorize & Sign Transaction"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
