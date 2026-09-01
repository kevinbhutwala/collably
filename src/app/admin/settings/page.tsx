"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
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
    <div className="space-y-8 max-w-4xl text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Agency Global Platform Configuration
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Set global take-rate percentages, escrow thresholds, and AI model endpoints.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4 text-[#B7FF3C]" />} className="rounded-[9px]">
          Save Configuration
        </Button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-[#111111] font-bold text-sm font-display">
          <Sliders className="w-4 h-4" />
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
