"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { collaborationService } from "@/services/collaboration.service";
import { Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { DeliverablesPipeline } from "@/components/collaborations/DeliverablesPipeline";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { formatCurrency } from "@/core/utils/formatters";
import {
  ArrowLeft,
  FolderGit2,
  ShieldCheck,
  Clock,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  Building2,
  Users,
  ExternalLink,
} from "lucide-react";

export default function SingleCollaborationWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { role, user } = useAuthStore();
  const id = params?.id as string;

  const [collab, setCollab] = useState<Collaboration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchSingle = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/collaborations/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            setCollab(data);
            return;
          }
        }

        // Fallback search in all collaborations
        const all = await collaborationService.getCollaborations();
        const found = all.find((c) => c.id === id);
        if (found) {
          setCollab(found);
        } else {
          setError("Collaboration not found or you do not have permission to view it.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load collaboration workspace.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingle();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center min-h-[60vh] space-y-4 font-sans">
        <CreativeLoader size="lg" label="Loading collaboration workspace..." />
      </div>
    );
  }

  if (error || !collab) {
    return (
      <div className="py-16 max-w-2xl mx-auto text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0A0A0E] dark:text-white font-display">
            Collaboration Not Found
          </h2>
          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6]">
            {error || "The requested collaboration could not be retrieved."}
          </p>
        </div>
        <Link
          href="/app/collaborations"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Collaborations
        </Link>
      </div>
    );
  }

  const isFunded = Boolean(collab.isFunded && collab.paymentStatus !== "payment_pending");
  const partnerName = role === "creator" ? collab.brand?.companyName || "Brand Partner" : collab.creator?.fullName || "Creator Partner";
  const partnerRole = role === "creator" ? "Sponsor Brand" : "Creator";

  return (
    <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* ── Breadcrumbs & Quick Navigation ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/app/collaborations"
            className="inline-flex items-center gap-1.5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Collaborations
          </Link>
          <span className="text-[#8A8A9A]">/</span>
          <span className="font-semibold text-[#0A0A0E] dark:text-white truncate max-w-[200px] sm:max-w-md">
            {collab.campaignTitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/messages"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-xs font-semibold text-[#0A0A0E] dark:text-white transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#FFD21F]" />
            Direct Messages
          </Link>
          <Link
            href={`/campaigns/${collab.campaignId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-black/20 text-xs font-semibold text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Brief
          </Link>
        </div>
      </div>

      {/* ── Project Header Card ── */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[11px] font-mono font-bold text-[#0A0A0E] dark:text-[#F4F4F8]">
              {collab.id}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                isFunded
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/50"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/50"
              }`}
            >
              {isFunded ? "PAYMENT PROTECTED" : "DEPOSIT PENDING"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50 text-[11px] font-mono font-bold">
              {(collab.paymentStatus || collab.status).replace(/_/g, " ").toUpperCase()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white font-display tracking-tight">
            {collab.campaignTitle}
          </h1>

          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6] flex items-center gap-2">
            <span>{partnerRole}:</span>
            <strong className="text-[#0A0A0E] dark:text-white">{partnerName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#FAFAFC] dark:bg-[#181824] border border-black/5 dark:border-white/5">
          <div>
            <span className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider block">
              Agreed Budget
            </span>
            <span className="text-2xl font-extrabold font-mono text-[#0A0A0E] dark:text-white">
              {formatCurrency(collab.totalAgreedBudget, collab.currency)}
            </span>
          </div>
          <div className="w-[1px] h-10 bg-black/10 dark:bg-white/10" />
          <div>
            <span className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider block">
              Deliverables
            </span>
            <span className="text-2xl font-extrabold font-mono text-[#0A0A0E] dark:text-white">
              {collab.deliverables?.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* ── Complete Deliverables & Escrow Pipeline ── */}
      <DeliverablesPipeline collaboration={collab} />
    </div>
  );
}
