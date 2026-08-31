"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { UserRole } from "@/core/types";
import { Sparkles, Building2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui.store";

export function RoleSwitcher({ className }: { className?: string }) {
  const { role, setRole } = useAuthStore();
  const { addToast } = useUIStore();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    const roleLabels: Record<string, string> = {
      creator: "Creator Persona (Elena Rostova)",
      brand: "Brand Marketer (Linear Dynamics)",
      brand_owner: "Brand Owner",
      brand_manager: "Brand Manager",
      brand_member: "Brand Member",
      agency_admin: "Agency Operations Admin",
      agency_owner: "Agency Owner",
      super_admin: "Super Admin",
    };
    addToast({
      type: "info",
      title: "Active Role Switched",
      message: `You are now interacting as: ${roleLabels[newRole] || newRole}`,
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-inner",
        className
      )}
    >
      <button
        onClick={() => handleRoleChange("creator")}
        className={cn(
          "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none",
          role === "creator"
            ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Creator</span>
      </button>

      <button
        onClick={() => handleRoleChange("brand")}
        className={cn(
          "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none",
          role === "brand"
            ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        <Building2 className="w-3.5 h-3.5 text-sky-600" />
        <span>Brand</span>
      </button>

      <button
        onClick={() => handleRoleChange("agency_admin")}
        className={cn(
          "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 select-none",
          role === "agency_admin"
            ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        <ShieldAlert className="w-3.5 h-3.5 text-brand-accent" />
        <span>Agency</span>
      </button>
    </div>
  );
}
