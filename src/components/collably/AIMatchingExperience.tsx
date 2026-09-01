"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  UserPlus,
  Check,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { CENTRAL_CREATORS, EnrichedCreator } from "@/data/creators";
import { formatCurrency } from "@/core/utils/currency";
import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/stores/ui.store";

export function AIMatchingExperience() {
  const { addToast } = useUIStore();
  const presets = [
    "Tech & AI creators for developer SDK launch with US audience",
    "Fitness & wellness creators for biometric recovery showcase",
    "Clean beauty creators for clinical skincare routine",
  ];

  const [query, setQuery] = useState(presets[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCreatorForInvite, setSelectedCreatorForInvite] = useState<EnrichedCreator | null>(null);
  const [invitedCreators, setInvitedCreators] = useState<Record<string, boolean>>({});

  const getMatchedCreators = (): EnrichedCreator[] => {
    const q = query.toLowerCase();
    if (q.includes("fitness") || q.includes("wellness")) {
      return [CENTRAL_CREATORS[2], CENTRAL_CREATORS[5], CENTRAL_CREATORS[0]];
    }
    if (q.includes("beauty") || q.includes("skincare")) {
      return [CENTRAL_CREATORS[4], CENTRAL_CREATORS[7], CENTRAL_CREATORS[1]];
    }
    return [CENTRAL_CREATORS[0], CENTRAL_CREATORS[3], CENTRAL_CREATORS[1]];
  };

  const results = getMatchedCreators();

  const handleRunQuery = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handleConfirmInvite = (creator: EnrichedCreator) => {
    setInvitedCreators((prev) => ({ ...prev, [creator.id]: true }));
    setSelectedCreatorForInvite(null);
    addToast({
      type: "success",
      title: "Campaign Pitch Dispatched",
      message: `Proposal dispatched to ${creator.fullName}.`,
    });
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] h-[350px] sm:h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/10 to-transparent blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>AI Discovery Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Instant AI creator matching.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Describe your campaign requirements in natural language. Match verified talent in seconds.
          </p>
        </div>

        {/* Visual Search Bar */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="p-2 rounded-full bg-[#120c16] border border-white/10 shadow-2xl flex items-center gap-2">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find creators for your next campaign..."
              className="flex-1 bg-transparent py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none font-sans"
            />
            <button
              onClick={handleRunQuery}
              disabled={isProcessing}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0 font-display"
            >
              {isProcessing ? (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Match Talent</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Preset Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(p);
                  handleRunQuery();
                }}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-sans border border-white/10 transition-colors truncate max-w-[260px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* 3 High-Impact Visual Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/50 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 text-white"
            >
              <div className="space-y-4">
                {/* Header with Avatar & Match Gauge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatarUrl}
                      alt={c.fullName}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white font-display">{c.fullName}</h4>
                      <span className="text-xs text-slate-400 font-mono">@{c.handle}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-black text-xs">
                    {c.qualityScore || 98}% MATCH
                  </span>
                </div>

                {/* Visual Metric Bar */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-white/[0.03] rounded-2xl border border-white/10 text-center font-mono text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">REACH</span>
                    <span className="font-bold text-white">{c.totalFollowers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">ENGAGE</span>
                    <span className="font-bold text-emerald-400">{c.avgEngagementRate}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">RATE</span>
                    <span className="font-bold text-white">{formatCurrency(c.startingPrice)}</span>
                  </div>
                </div>

                {/* 1-Line Match Reason */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-sans flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-[hsl(327,100%,55%)] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {c.matchReasons?.[0] || `${c.avgEngagementRate}% engagement with ${c.location} verified audience.`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (!invitedCreators[c.id]) {
                    setSelectedCreatorForInvite(c);
                  }
                }}
                className={`w-full py-3 rounded-full text-xs font-bold font-display transition-all flex items-center justify-center gap-2 ${
                  invitedCreators[c.id]
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                    : "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/20 hover:brightness-110"
                }`}
              >
                {invitedCreators[c.id] ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Invite Sent</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Invite to Campaign</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {selectedCreatorForInvite && (
        <Modal
          isOpen={Boolean(selectedCreatorForInvite)}
          onClose={() => setSelectedCreatorForInvite(null)}
          title={`Invite ${selectedCreatorForInvite.fullName}`}
          description="Send campaign brief and lock in rates."
          maxWidth="md"
        >
          <div className="space-y-4 pt-1 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <img
                src={selectedCreatorForInvite.avatarUrl}
                alt={selectedCreatorForInvite.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="font-mono">
                <h4 className="font-bold text-white font-display text-sm">{selectedCreatorForInvite.fullName}</h4>
                <p className="text-slate-400">Rate: {formatCurrency(selectedCreatorForInvite.startingPrice)}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setSelectedCreatorForInvite(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmInvite(selectedCreatorForInvite)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs font-display shadow-md shadow-pink-500/25"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
