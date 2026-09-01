"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/stores/ui.store";
import { Save, Sliders } from "lucide-react";

export default function AdminSettingsPage() {
  const { addToast } = useUIStore();
  const [platformFee, setPlatformFee] = useState(10);
  const [minEscrow, setMinEscrow] = useState(500);

  const handleSave = () => {
    addToast({
      type: "success",
      title: "Agency Platform Config Saved",
      message: "Take-rate and escrow threshold parameters updated.",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Agency Global Platform Configuration
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Set global take-rate percentages, escrow thresholds, and AI model endpoints.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4 text-[#0A0A0E]" />
          <span>Save Configuration</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
          <Sliders className="w-4 h-4 text-[#FFD21F]" />
          <span>Financial Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <Input
            label="Default Platform Take-Rate (%)"
            type="number"
            value={platformFee}
            onChange={(e) => setPlatformFee(parseInt(e.target.value) || 0)}
          />
          <Input
            label="Minimum Campaign Escrow Requirement ($ USD)"
            type="number"
            value={minEscrow}
            onChange={(e) => setMinEscrow(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
}
