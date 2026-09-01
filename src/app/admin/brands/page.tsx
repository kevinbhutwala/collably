"use client";

import React, { useState } from "react";
import { MOCK_BRANDS } from "@/mock/brands.mock";
import { Button } from "@/components/ui/Button";
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
    <div className="space-y-8 text-[#111111]">
      <div className="pb-6 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            Enterprise Directory
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Brand Accounts &amp; Risk Compliance
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
          Manage enterprise brand partnerships, escrow pre-authorizations, and credit terms.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="divide-y divide-[#E7E7E4]">
          {brands.map((b) => (
            <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E7E7E4] shrink-0">
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
                  <h3 className="font-bold text-sm text-[#111111] flex items-center gap-1.5 font-display">
                    {b.companyName}
                    {b.verified && <CheckCircle2 className="w-4 h-4 text-[#111111]" />}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-mono">
                    {b.industry} • {b.location} • {b.companySize} Employees
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Total Escrow</span>
                  <span className="text-[#111111] font-extrabold">{formatCurrency(b.totalSpent)}</span>
                </div>
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Active Briefs</span>
                  <span className="text-[#111111] font-bold">{b.activeCampaignsCount}</span>
                </div>
                <Button
                  variant={b.verified ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => toggleVerify(b.id)}
                  className="rounded-[9px]"
                >
                  {b.verified ? "Verified" : "Verify Brand"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
