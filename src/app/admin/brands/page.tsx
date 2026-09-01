"use client";

import React, { useState } from "react";
import { MOCK_BRANDS } from "@/mock/brands.mock";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2 } from "lucide-react";

export default function AdminBrandsPage() {
  const { addToast } = useUIStore();
  const [brands, setBrands] = useState(MOCK_BRANDS);

  const toggleVerify = (id: string) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, verified: !b.verified } : b))
    );
    addToast({
      type: "success",
      title: "Brand Verification Updated",
      message: "Brand verified partner status updated.",
    });
  };

  return (
    <div className="space-y-8 text-white select-none">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Enterprise Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Brand Accounts &amp; Risk Compliance
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Manage enterprise brand partnerships, escrow pre-authorizations, and credit terms.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="divide-y divide-white/10">
          {brands.map((b) => (
            <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <SafeImage
                    src={b.logoUrl}
                    alt={b.companyName}
                    fallbackType="brand"
                    fallbackName={b.companyName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-display">
                    {b.companyName}
                    {b.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-white/50 font-mono">
                    {b.industry} • {b.location} • {b.companySize} Employees
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">Total Escrow</span>
                  <span className="text-white font-extrabold">{formatCurrency(b.totalSpent)}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Active Briefs</span>
                  <span className="text-white font-bold">{b.activeCampaignsCount}</span>
                </div>
                <button
                  onClick={() => toggleVerify(b.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all ${
                    b.verified
                      ? "bg-white/10 text-white/60 hover:text-white"
                      : "bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] text-white shadow-md"
                  }`}
                >
                  {b.verified ? "Verified ✓" : "Verify Brand"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
