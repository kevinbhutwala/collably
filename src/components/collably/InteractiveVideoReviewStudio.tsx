"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  CheckCircle2,
  Volume2,
  VolumeX,
  ShieldCheck,
  Check,
  Sparkles,
  MessageSquare,
  Lock,
  ArrowRight,
  RotateCcw,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";

interface ReviewComment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timecode: string;
  timeSec: number;
  text: string;
  status: "Revision Required" | "Approved" | "In Review";
}

const REVIEW_COMMENTS: ReviewComment[] = [
  {
    id: "c-1",
    author: "Sarah Jenkins",
    role: "Head of Marketing, Linear",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    timecode: "00:14",
    timeSec: 14,
    text: "Elevate product UI mockup 20px higher in frame so the CTA button stays above TikTok interface chrome.",
    status: "Revision Required",
  },
  {
    id: "c-2",
    author: "Marcus Chen",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    timecode: "00:42",
    timeSec: 42,
    text: "Color grade on the 4K uncompressed ProRes b-roll is gorgeous. Lighting matches brand guidelines perfectly.",
    status: "Approved",
  },
  {
    id: "c-3",
    author: "Sarah Jenkins",
    role: "Head of Marketing, Linear",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    timecode: "00:55",
    timeSec: 55,
    text: "Trackable signup discount link callout verified. Final outro cut is approved for commercial release.",
    status: "Approved",
  },
];

export function InteractiveVideoReviewStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(14);
  const [activeCommentIdx, setActiveCommentIdx] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const totalDurationSec = 60;

  const handleSeek = (timeSec: number, commentIdx: number) => {
    setCurrentTimeSec(timeSec);
    setActiveCommentIdx(commentIdx);
  };

  const handleConfirmApproval = () => {
    setIsApproved(true);
    setApproveModalOpen(false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD21F", "#FFE052", "#0A0A0E", "#087F5B"],
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const activeComment = REVIEW_COMMENTS[activeCommentIdx];

  return (
    <section className="py-20 sm:py-28 bg-white text-[#0A0A0E] select-none border-t border-black/8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
            <span>FRAME-ACCURATE 4K QA STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] tracking-tight font-display">
            Precision Video Feedback. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F]">
              Zero Revision Chaos.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#5A5A68] leading-relaxed">
            Eliminate messy email threads and time-wasting miscommunications. Leave timecoded annotations on 4K cuts, request frame-specific tweaks, and disburse escrow funds with 1 click.
          </p>
        </div>

        {/* Interactive Studio Player Window */}
        <div className="rounded-3xl bg-[#0A0A0E] border-2 border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.18)] overflow-hidden text-white">
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-[#14141C] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-white/70 font-semibold truncate hidden sm:inline">
                Linear_B2B_Launch_v3_4K_ProRes.mov
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white text-[11px] font-bold">
                RED 8K • 60 FPS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[11px] font-extrabold">
                {isApproved ? "APPROVED & DISBURSED" : "QA IN PROGRESS"}
              </span>
            </div>
          </div>

          {/* Main Player & Annotation Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: 4K Video Canvas with Overlays */}
            <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between space-y-4 border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Video Frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=85"
                  alt="4K Video Stage"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover filter contrast-105"
                />

                {/* Ambient Play Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Floating Active Timecode Box */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 font-mono text-[10px] sm:text-xs font-bold text-white flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>{formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}</span>
                </div>

                {/* Interactive Timecode Annotation Pin inside Frame */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_20px_rgba(255,210,31,0.8)] border border-black/20 flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-extrabold max-w-[90%] truncate"
                >
                  <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current shrink-0" />
                  <span className="truncate">Annotation @ {activeComment.timecode}</span>
                </motion.div>


                {/* Center Play/Pause Overlay Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center m-auto w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white transition-all group-hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-white ml-1" />}
                </button>
              </div>

              {/* Scrubber Timeline with Interactive Markers */}
              <div className="space-y-2 pt-2">
                <div className="relative w-full h-3 rounded-full bg-white/15 cursor-pointer overflow-visible">
                  {/* Progress Fill */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFAE00] relative"
                    style={{ width: `${(currentTimeSec / totalDurationSec) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-[#0A0A0E]" />
                  </div>

                  {/* Marker Pins on Scrubber */}
                  {REVIEW_COMMENTS.map((comm, idx) => {
                    const percent = (comm.timeSec / totalDurationSec) * 100;
                    const isActive = activeCommentIdx === idx;
                    return (
                      <button
                        key={comm.id}
                        onClick={() => handleSeek(comm.timeSec, idx)}
                        style={{ left: `${percent}%` }}
                        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-transform hover:scale-125 z-10 flex items-center justify-center ${
                          isActive
                            ? "bg-[#FFD21F] border-white scale-125 shadow-[0_0_10px_#FFD21F]"
                            : "bg-white/80 border-black/40"
                        }`}
                        title={`Comment at ${comm.timecode}`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pt-1">
                  <span>00:00 (Intro Hook)</span>
                  <span className="text-[#FFD21F] font-bold">Jump to timestamp markers above</span>
                  <span>01:00 (CTA Outro)</span>
                </div>
              </div>
            </div>

            {/* Right: Timestamped Feedback Stream & Release Escrow CTA */}
            <div className="lg:col-span-4 p-5 sm:p-6 bg-[#0E0E14] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#FFD21F]" />
                    <span>Timecoded Feedback ({REVIEW_COMMENTS.length})</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">100% On-Time SLA</span>
                </div>

                {/* Comment Cards List */}
                <div className="space-y-3">
                  {REVIEW_COMMENTS.map((comm, idx) => {
                    const isActive = activeCommentIdx === idx;
                    return (
                      <div
                        key={comm.id}
                        onClick={() => handleSeek(comm.timeSec, idx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                          isActive
                            ? "bg-white/10 border-[#FFD21F] shadow-[0_0_15px_rgba(255,210,31,0.15)] ring-1 ring-[#FFD21F]/40"
                            : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <SafeImage
                              src={comm.avatar}
                              alt={comm.author}
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full object-cover border border-white/20"
                            />
                            <div>
                              <span className="text-xs font-bold text-white block leading-none">
                                {comm.author}
                              </span>
                              <span className="text-[10px] text-white/50 font-mono">{comm.role}</span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                              isActive ? "bg-[#FFD21F] text-[#0A0A0E]" : "bg-white/10 text-white/80"
                            }`}
                          >
                            {comm.timecode}
                          </span>
                        </div>

                        <p className="text-xs text-white/90 font-sans leading-relaxed">
                          {comm.text}
                        </p>

                        <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                          <span className="text-white/40">Frame #{(comm.timeSec * 60).toLocaleString()}</span>
                          <span
                            className={
                              comm.status === "Approved"
                                ? "text-emerald-400 font-bold"
                                : "text-amber-400 font-bold"
                            }
                          >
                            {comm.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Escrow Sign-off Box */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60">Locked Escrow Vault</span>
                  <span className="text-sm font-black text-white">$3,500.00</span>
                </div>

                {isApproved ? (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                    <span className="text-xs font-bold text-emerald-300 font-mono flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Funds Disbursed ($3,150 Net)
                    </span>
                    <p className="text-[10px] text-emerald-200/80">Commercial license transferred to Linear.</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setApproveModalOpen(true)}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold shadow-[0_4px_20px_rgba(255,210,31,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98 border border-black/10 hover-lift"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#0A0A0E]" />
                    <span>Approve &amp; Disburse Escrow</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Milestone Modal */}
      <Modal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Approve 4K Video Deliverable"
        description="Verify milestone QA sign-off and trigger automatic escrow payout to the creator."
        maxWidth="md"
      >
        <div className="space-y-4 pt-2 text-[#0A0A0E] font-sans select-none">
          <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/40 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-[#5A5A68]">
              <span>Milestone Release:</span>
              <strong className="text-[#0A0A0E]">$3,500.00 Gross</strong>
            </div>
            <div className="flex justify-between text-[#5A5A68]">
              <span>Creator Payout (90%):</span>
              <strong className="text-emerald-600">$3,150.00 Net</strong>
            </div>
            <div className="flex justify-between text-[#5A5A68]">
              <span>Platform QA Fee (10%):</span>
              <strong className="text-[#0A0A0E]">$350.00</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#5A5A68]">
            <Check className="w-4 h-4 text-[#087F5B] shrink-0" />
            <span>Perpetual commercial IP rights &amp; master 4K ProRes files downloaded.</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setApproveModalOpen(false)}
              className="w-1/2 py-3 rounded-full bg-[#F4F4F8] hover:bg-[#EAEAEF] text-xs font-bold text-[#0A0A0E]"
            >
              Back to Review
            </button>
            <button
              onClick={handleConfirmApproval}
              className="w-1/2 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFAE00] text-[#0A0A0E] text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Confirm &amp; Disburse</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
