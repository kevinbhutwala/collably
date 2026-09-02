"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Video, Building2, ArrowRight } from "lucide-react";

interface SocialRoleModalProps {
  isOpen: boolean;
  onSelectRole: (role: "creator" | "brand") => void;
  onClose: () => void;
  userName?: string;
}

export function SocialRoleModal({
  isOpen,
  onSelectRole,
  onClose,
  userName = "Creator",
}: SocialRoleModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Your Setup"
      description={`Welcome ${userName}! Select your role on Collably to personalize your workspace.`}
      maxWidth="md"
    >
      <div className="space-y-3 pt-2 text-[#0A0A0E] select-none">
        {/* Creator Option */}
        <button
          type="button"
          onClick={() => onSelectRole("creator")}
          className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-[#FFFDF5] to-white border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display">I am a Creator</h4>
              <p className="text-xs text-[#6A6A78] font-sans">
                Pitch brand campaigns, share media kit &amp; get paid
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Brand Option */}
        <button
          type="button"
          onClick={() => onSelectRole("brand")}
          className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] border border-black/10 hover:border-black/20 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#0A0A0E] text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display">I am a Brand / Business</h4>
              <p className="text-xs text-[#6A6A78] font-sans">
                Post briefs, hire creators &amp; run escrow campaigns
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Modal>
  );
}
