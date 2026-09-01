"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Volume2,
  VolumeX,
  ShieldCheck,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Modal } from "@/components/ui/Modal";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";

export function EditorialProductStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(14);
  const [duration, setDuration] = useState(60);
  const [approved, setApproved] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);

  const creator = EDITORIAL_PORTRAITS.heroFemaleMain;

  const comments = [
    {
      id: "c-1",
      author: "Priya Sharma (Brand Lead)",
      timecode: "00:14",
      timeSec: 14,
      text: "Move the product brand logo slightly higher in the intro frame.",
    },
    {
      id: "c-2",
      author: "Marcus Chen (Creative Director)",
      timecode: "00:42",
      timeSec: 42,
      text: "Color grading on the 4K outdoor sequence looks pristine.",
    },
    {
      id: "c-3",
      author: "Priya Sharma (Brand Lead)",
      timecode: "00:55",
      timeSec: 55,
      text: "Call-to-action link overlay timing is approved for launch.",
    },
  ];

  const videoSrc =
    "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-a-video-41484-large.mp4";

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTimeSec(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 60);
    }
  };

  const handleSeek = (timeSec: number, commentIndex: number) => {
    setActiveCommentIndex(commentIndex);
    if (videoRef.current) {
      videoRef.current.currentTime = timeSec;
      setCurrentTimeSec(timeSec);
    }
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleConfirmApprove = () => {
    setConfirmModalOpen(false);
    setApproved(true);
    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#3047FF", "#1726C7", "#FF3B30", "#EEF0FF", "#08090C"],
      });
    } catch {}
  };

  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] border-b border-[#E6E6E8] relative overflow-hidden select-none text-[#08090C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 / FRAME-ACCURATE REVIEW</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#08090C] tracking-tight font-display">
            Video QA meets instant settlement.
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-sans">
            Drop timecoded feedback pins directly onto 4K video drafts. 1-click approve to disburse milestone payouts.
          </p>
        </div>

        {/* ── BLENDED PRODUCT UI + EDITORIAL COMPOSITION (Section 19) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* LEFT: EDITORIAL CREATOR PORTRAIT ANCHOR */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#08090C] shadow-editorial group">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={creator.imageUrl}
                  alt={creator.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlapping 98% Match Card */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#C8CEFF] shadow-editorial font-mono text-xs">
                  <span className="text-[10px] text-[#6B7280] block font-bold">MATCH ENGINE</span>
                  <span className="text-sm font-extrabold text-[#3047FF]">98% COMPATIBILITY</span>
                </div>

                {/* Overlapping Approval Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E6E6E8] shadow-editorial font-mono text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">CREATOR RATE</span>
                    <span className="font-extrabold text-sm text-[#08090C]">{creator.verifiedRate}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FFF0EE] text-[#FF3B30] font-bold text-[10px]">
                    ✓ READY FOR SIGN-OFF
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 4K VIDEO PLAYER STUDIO */}
          <div className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-[#FAFAFA] border border-[#E6E6E8] shadow-editorial space-y-5">
            {/* Top HUD */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E6E8] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3047FF] animate-pulse" />
                <span className="text-[#08090C] font-bold font-sans">Elena Rostova • AI Smartwatch Reel</span>
                <span className="text-[#6B7280] hidden sm:inline">• Cut v2 (4K 60FPS)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-[#3047FF] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>₹32,500 ESCROW</span>
              </span>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video rounded-xl bg-black border border-[#E6E6E8] overflow-hidden group shadow-inner">
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                muted={isMuted}
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={handleTogglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Play / Pause Toggle Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className={`w-14 h-14 rounded-full bg-white/30 hover:bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center text-white transition-all pointer-events-auto hover:scale-105 shadow-xl ${
                    isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                  aria-label="Play or Pause"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
                </button>
              </div>

              {/* Scrubber Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-10 space-y-2">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    if (videoRef.current) {
                      videoRef.current.currentTime = pos * (duration || 60);
                    }
                  }}
                  className="w-full bg-white/30 hover:bg-white/40 h-2 rounded-full overflow-hidden relative cursor-pointer"
                >
                  <div
                    className="bg-[#3047FF] h-full"
                    style={{ width: `${((currentTimeSec / (duration || 60)) * 100).toFixed(1)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white">
                  <div className="flex items-center gap-3">
                    <span>{formatTime(currentTimeSec)} / {formatTime(duration || 60)}</span>
                    <button type="button" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[#C8CEFF] font-bold">Cut v2 Verified</span>
                </div>
              </div>
            </div>

            {/* Timecoded Review Comments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {comments.map((c, i) => {
                const isActive = activeCommentIndex === i;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSeek(c.timeSec, i)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? "bg-[#EEF0FF] border-[#3047FF] shadow-xs text-[#3047FF]"
                        : "bg-[#FFFFFF] border-[#E6E6E8] text-[#6B7280] hover:bg-[#F6F7F9]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                      <span className="font-bold text-[#08090C] truncate">{c.author}</span>
                      <span className="px-1 py-0.5 rounded bg-[#FAFAFA] text-[#3047FF] font-bold">@{c.timecode}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] font-sans line-clamp-1">&ldquo;{c.text}&rdquo;</p>
                  </button>
                );
              })}
            </div>

            {/* Bottom Approval & Disburse Bar */}
            <div className="pt-2">
              {approved ? (
                <div className="p-4 rounded-xl bg-[#EEF0FF] border border-[#C8CEFF] text-[#1726C7] text-xs font-mono flex items-center justify-between">
                  <span className="font-bold flex items-center gap-2 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#3047FF]" /> ✓ Deliverable approved • ₹29,250 Creator Net Disbursed via Stripe Connect
                  </span>
                  <span className="font-extrabold text-[10px] text-[#3047FF]">DISBURSED</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmModalOpen(true)}
                  className="w-full py-3.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] active:bg-[#0E1A9E] text-white font-semibold text-sm shadow-ultramarine-glow flex items-center justify-center gap-2 transition-all font-sans cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Deliverable &amp; Disburse Milestone</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Authorize Deliverable Sign-Off"
        description="Release pre-funded campaign funds directly to the creator account."
        maxWidth="md"
      >
        <div className="space-y-4 pt-1 text-xs font-sans">
          <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E6E6E8] space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Milestone Escrow:</span>
              <span className="text-[#08090C] font-bold">₹32,500</span>
            </div>
            <div className="flex justify-between text-[#3047FF]">
              <span>Creator Payout (90%):</span>
              <span className="font-bold">₹29,250</span>
            </div>
            <div className="flex justify-between text-[#6B7280] text-[11px]">
              <span>Platform Fee (10%):</span>
              <span>₹3,250</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E6E8]">
            <button
              type="button"
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 text-[#6B7280] hover:text-[#08090C]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmApprove}
              className="px-5 py-2.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm &amp; Disburse</span>
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
