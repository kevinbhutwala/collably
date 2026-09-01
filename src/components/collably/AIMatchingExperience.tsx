"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Users,
  ShieldCheck,
  Check,
} from "lucide-react";
import { CENTRAL_CREATORS, CentralCreator } from "@/data/creators";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/core/utils/currency";

export function AIMatchingExperience() {
  const [searchQuery, setSearchQuery] = useState(
    "Find Indian fitness creators under ₹15K with 5%+ engagement"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<CentralCreator | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  const matchedCreators = CENTRAL_CREATORS.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalyzingStep("Audience fit & demographics");

    setTimeout(() => setAnalyzingStep("Engagement rate verification"), 350);
    setTimeout(() => setAnalyzingStep("Budget & rate card matching"), 700);
    setTimeout(() => setAnalyzingStep("Category relevance scoring"), 1050);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzingStep("");
    }, 1400);
  };

  const handleSendInvite = () => {
    setInviteSent(true);
    setTimeout(() => {
      setSelectedCreator(null);
      setInviteSent(false);
    }, 1200);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Discovery Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            Precision creator matching.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
            Search in plain language. Match with vetted creators by verified engagement, rates, and audience location.
          </p>
        </div>

        {/* Clean Editorial Search Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto relative p-2 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="flex items-center gap-3 px-3 flex-1 w-full">
            <Search className="w-4 h-4 text-[#8A908B] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your target creators, budget, or vertical..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#101310] placeholder-[#8A908B] focus:outline-hidden font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-5 py-2.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all font-sans shrink-0 disabled:opacity-70"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? "Analyzing..." : "Find Matches"}</span>
          </button>
        </form>

        {/* Analyzing Progress State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-md mx-auto text-center space-y-2 font-mono text-xs text-[#087F5B]"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-ping" />
                <span className="font-semibold uppercase tracking-wider">ANALYZING CRITERIA:</span>
                <span className="text-[#101310]">{analyzingStep}</span>
              </div>
              <div className="w-full bg-[#E2E6E1] h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "10%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                  className="bg-[#087F5B] h-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3 Matched Editorial Creator Cards (Section 12) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {matchedCreators.map((creator) => (
            <div
              key={creator.handle}
              className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] hover:border-[#087F5B] overflow-hidden shadow-fintech flex flex-col justify-between p-5 space-y-5 transition-all"
            >
              {/* Creator Header with Large Photo */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E2E6E1]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#101310] font-sans flex items-center gap-1">
                        {creator.fullName}
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                      </h4>
                      <p className="text-xs text-[#626862] font-mono">@{creator.handle}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-[#EAF8F2] text-[#087F5B] text-xs font-mono font-bold border border-[#C3EBDA]">
                    {creator.matchScore || 98}% Match
                  </span>
                </div>

                {/* Metrics Rail */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] text-center font-mono">
                  <div>
                    <span className="text-[10px] text-[#626862] block">REACH</span>
                    <span className="text-xs font-bold text-[#101310]">{creator.totalFollowers > 999 ? `${(creator.totalFollowers / 1000).toFixed(0)}K` : creator.totalFollowers}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#626862] block">ENGAGEMENT</span>
                    <span className="text-xs font-bold text-[#087F5B]">{creator.avgEngagementRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#626862] block">RATE</span>
                    <span className="text-xs font-bold text-[#101310]">{formatCurrency(creator.startingPrice || 18500)}</span>
                  </div>
                </div>

                {/* Subscores & Location */}
                <div className="space-y-1.5 text-xs text-[#626862] font-sans">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Audience Match:</span>
                    <span className="font-semibold text-[#101310]">{creator.subscores?.audienceAlignment || 96}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Location:</span>
                    <span className="font-semibold text-[#101310]">{creator.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E2E6E1] flex items-center gap-2">
                <Link
                  href={`/creators/${creator.id}`}
                  className="flex-1 py-2 rounded-[9px] bg-[#FCFCFA] hover:bg-[#F6F7F3] border border-[#E2E6E1] text-[#101310] text-xs font-semibold text-center transition-colors font-sans"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedCreator(creator)}
                  className="flex-1 py-2 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white text-xs font-semibold text-center transition-colors font-sans shadow-xs"
                >
                  Invite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Invite Modal */}
      {selectedCreator && (
        <Modal
          isOpen={Boolean(selectedCreator)}
          onClose={() => setSelectedCreator(null)}
          title={`Invite ${selectedCreator.fullName}`}
          description={`Propose a milestone-protected collaboration brief for ${selectedCreator.primaryCategory}.`}
          maxWidth="md"
        >
          <div className="space-y-4 pt-1 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-[#626862]">Target Deliverable:</span>
                <span className="text-[#101310] font-bold">1x 4K Dedicated Video Review</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#626862]">Starting Rate:</span>
                <span className="text-[#087F5B] font-bold">₹18,500</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E6E1]">
              <button
                type="button"
                onClick={() => setSelectedCreator(null)}
                className="px-4 py-2 text-[#626862] hover:text-[#101310]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendInvite}
                disabled={inviteSent}
                className="px-5 py-2.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all"
              >
                {inviteSent ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Invitation Sent</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
