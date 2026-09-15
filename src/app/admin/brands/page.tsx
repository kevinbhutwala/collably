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
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      <div className="pb-6 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Enterprise Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
          Brand Accounts &amp; Risk Compliance
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-0.5 font-sans">
          Manage enterprise brand partnerships, escrow pre-authorizations, and credit terms.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {brands.map((b) => (
            <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#F5F5F9] dark:bg-[#181824] border border-black/8 dark:border-white/10 shrink-0">
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
                  <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white flex items-center gap-1.5 font-display">
                    {b.companyName}
                    {b.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                    {b.industry} • {b.location} • {b.companySize} Employees
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#7A7A8A] dark:text-[#8E8EA4] block text-[10px]">Total Escrow</span>
                  <span className="text-[#0A0A0E] dark:text-white font-extrabold">{formatCurrency(b.totalSpent)}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] dark:text-[#8E8EA4] block text-[10px]">Active Briefs</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">{b.activeCampaignsCount}</span>
                </div>
                <button
                  onClick={() => toggleVerify(b.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
                    b.verified
                      ? "bg-black/5 dark:bg-white/10 text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white border-black/10 dark:border-white/10"
                      : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-xs border-black/10"
                  }`}
                >
                  {b.verified ? "Revoke Verification" : "Approve Brand"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
