"use client";

import React, { useState, useEffect } from "react";
import { collaborationService } from "@/services/collaboration.service";
import { Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { DeliverablesPipeline } from "@/components/collaborations/DeliverablesPipeline";
import { Badge } from "@/components/ui/Badge";
import { FileCheck2 } from "lucide-react";

export default function CollaborationsWorkspacePage() {
  const { role, currentCreator, currentBrand } = useAuthStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await collaborationService.getCollaborations(
        role === "creator" ? "creator" : "brand",
        role === "creator" ? currentCreator?.id : currentBrand?.id
      );
      setCollaborations(data);
      setLoading(false);
    };
    fetch();
  }, [role, currentCreator?.id, currentBrand?.id]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Workspace Portal
            </span>
            <span className="text-zinc-600">•</span>
            <Badge variant="glow" size="sm">Milestone Escrow</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Active Collaborations & Content Submissions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Submit video drafts, review feedback with revision timestamps, and approve milestone payouts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
        </div>
      ) : collaborations.length === 0 ? (
        <div className="py-24 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 space-y-3">
          <FileCheck2 className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-zinc-300">No active collaborations</h3>
          <p className="text-xs text-zinc-500">Apply to live campaigns or accept applicant proposals to start.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {collaborations.map((c) => (
            <DeliverablesPipeline key={c.id} collaboration={c} />
          ))}
        </div>
      )}
    </div>
  );
}
