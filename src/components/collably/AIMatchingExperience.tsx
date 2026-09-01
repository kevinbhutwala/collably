"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  UserPlus,
  Check,
  CheckCircle2,
  Info,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";
import { CENTRAL_CREATORS, EnrichedCreator } from "@/data/creators";
import { formatCurrency } from "@/core/utils/currency";
import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/stores/ui.store";

export function AIMatchingExperience() {
  const { addToast } = useUIStore();
  const presets = [
    "Tech & AI storytellers for SaaS launch with high US/UK audience",
    "20 Indian fitness creators under ₹15K per Reel with >5% engagement",
    "Clean beauty & botanical skincare creators with 80%+ female audience",
  ];

  const [query, setQuery] = useState(presets[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [selectedCreatorForInvite, setSelectedCreatorForInvite] = useState<EnrichedCreator | null>(null);
  const [invitedCreators, setInvitedCreators] = useState<Record<string, boolean>>({});

  const processStages = [
    "PARSING NATURAL LANGUAGE INTENT...",
    "SEARCHING VERIFIED CREATOR DIRECTORY...",
    "EVALUATING AUDIENCE DEMOGRAPHICS & GEOGRAPHY...",
    "CALCULATING BUDGET & ENGAGEMENT SCORES...",
  ];

  // Match creators dynamically based on query keywords
  const getMatchedCreators = (): EnrichedCreator[] => {
    const q = query.toLowerCase();
    if (q.includes("fitness") || q.includes("indian")) {
      return [CENTRAL_CREATORS[2], CENTRAL_CREATORS[5], CENTRAL_CREATORS[0]];
    }
    if (q.includes("beauty") || q.includes("skincare")) {
      return [CENTRAL_CREATORS[4], CENTRAL_CREATORS[7], CENTRAL_CREATORS[1]];
    }
    // Default Tech / AI
    return [CENTRAL_CREATORS[0], CENTRAL_CREATORS[3], CENTRAL_CREATORS[1]];
  };

  const results = getMatchedCreators();

  const handleRunQuery = () => {
    setIsProcessing(true);
    setProcessStage(0);

    const intv = setInterval(() => {
      setProcessStage((p) => {
        if (p >= 3) {
          clearInterval(intv);
          setIsProcessing(false);
          return 3;
        }
        return p + 1;
      });
    }, 450);
  };

  const handleConfirmInvite = (creator: EnrichedCreator) => {
    setInvitedCreators((prev) => ({ ...prev, [creator.id]: true }));
    setSelectedCreatorForInvite(null);
    addToast({
      type: "success",
      title: "Campaign Pitch Dispatched",
      message: `Formal invitation and brief sent to ${creator.fullName} (@${creator.handle}).`,
    });
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] h-[350px] sm:h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/15 via-[hsl(300,100%,42%)]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>AI Discovery Engine</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["precision", "ai", "creator", "discovery"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            AI creator matching by brief.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["natural", "language", "demographics", "verified", "rates"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Describe your campaign requirements in natural language. Match verified creators by audience geography, engagement quality, and transparent rate cards.
          </ScrollRevealText>
        </div>

        {/* Interactive Query Terminal */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-[#120c16] border border-white/10 text-white shadow-2xl space-y-4">
            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find creators for your next campaign..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder:text-slate-500 font-sans text-xs sm:text-sm focus:outline-none focus:border-[hsl(327,100%,50%)]/50 transition-colors"
                />
              </div>

              <button
                onClick={handleRunQuery}
                disabled={isProcessing}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 font-display"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Run AI Match</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-mono text-[11px] mr-1">Sample Queries:</span>
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(p);
                    handleRunQuery();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-sans border border-white/10 transition-colors truncate max-w-[280px] text-left"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Processing Telemetry */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-xs font-mono text-[hsl(327,100%,55%)] flex items-center justify-between"
              >
                <span>&gt; {processStages[processStage]}</span>
                <span className="text-slate-400">{processStage + 1} / 4</span>
              </motion.div>
            )}
          </div>

          {/* Results Grid with "Why This Creator?" Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-5 group hover:-translate-y-1 text-white"
              >
                <div className="space-y-4">
                  {/* Creator Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatarUrl}
                        alt={c.fullName}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white font-display">{c.fullName}</h4>
                        <span className="text-xs text-slate-400 font-mono block">@{c.handle}</span>
                        <span className="text-[10px] text-[hsl(327,100%,55%)] font-medium font-sans">{c.primaryCategory}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-black text-xs">
                        {c.qualityScore}%
                      </span>
                    </div>
                  </div>

                  {/* Numerical Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-white/[0.03] rounded-2xl border border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] block">REACH</span>
                      <span className="font-bold text-white">{c.totalFollowers.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">ENGAGEMENT</span>
                      <span className="font-bold text-emerald-400">{c.avgEngagementRate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">STARTING</span>
                      <span className="font-bold text-white">{formatCurrency(c.startingPrice)}</span>
                    </div>
                  </div>

                  {/* Subscore Alignment */}
                  <div className="space-y-1.5 text-[10px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Audience Alignment:</span>
                      <span className="font-bold text-emerald-400">{c.subscores?.audienceAlignment || 96}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${c.subscores?.audienceAlignment || 96}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Engagement Quality:</span>
                      <span className="font-bold text-sky-400">{c.subscores?.engagementQuality || 95}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full" style={{ width: `${c.subscores?.engagementQuality || 95}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Budget Match:</span>
                      <span className="font-bold text-pink-400">{c.subscores?.budgetMatch || 94}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${c.subscores?.budgetMatch || 94}%` }} />
                    </div>
                  </div>

                  {/* "Why This Creator?" Bullet Points */}
                  {c.matchReasons && c.matchReasons.length > 0 && (
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5 text-[11px] font-sans text-slate-300">
                      <span className="font-mono text-[10px] font-bold uppercase text-[hsl(327,100%,55%)] block flex items-center gap-1">
                        <Info className="w-3 h-3 text-[hsl(327,100%,55%)]" /> Why this creator?
                      </span>
                      <ul className="space-y-1">
                        {c.matchReasons.slice(0, 2).map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5 leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Invite CTA Button */}
                <button
                  onClick={() => {
                    if (!invitedCreators[c.id]) {
                      setSelectedCreatorForInvite(c);
                    }
                  }}
                  className={`w-full py-3 rounded-full text-xs font-bold font-display transition-all flex items-center justify-center gap-2 ${
                    invitedCreators[c.id]
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 shadow-xs"
                  }`}
                >
                  {invitedCreators[c.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pitch Dispatched</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 text-pink-400" />
                      <span>Invite to Campaign +</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {selectedCreatorForInvite && (
        <Modal
          isOpen={Boolean(selectedCreatorForInvite)}
          onClose={() => setSelectedCreatorForInvite(null)}
          title={`Invite ${selectedCreatorForInvite.fullName}`}
          description={`Dispatch a formal brief proposal and lock in rate cards with ${selectedCreatorForInvite.fullName} (@${selectedCreatorForInvite.handle}).`}
          maxWidth="md"
        >
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
              <img
                src={selectedCreatorForInvite.avatarUrl}
                alt={selectedCreatorForInvite.fullName}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="font-mono text-xs">
                <h4 className="font-bold text-white font-display text-sm">{selectedCreatorForInvite.fullName}</h4>
                <p className="text-slate-400">Starting Rate: {formatCurrency(selectedCreatorForInvite.startingPrice)}</p>
                <p className="text-emerald-400 font-bold">{selectedCreatorForInvite.avgEngagementRate}% Verified Engagement</p>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-200">Select Target Campaign Brief</label>
              <select className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500/50">
                <option value="c1" className="bg-[#120c16] text-white">Q3 AI Developer SDK Video Campaign ($3,500 budget)</option>
                <option value="c2" className="bg-[#120c16] text-white">4K Technical Architecture Series ($4,200 budget)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedCreatorForInvite(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmInvite(selectedCreatorForInvite)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs font-display shadow-md shadow-pink-500/25"
              >
                Confirm &amp; Send Invite
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
