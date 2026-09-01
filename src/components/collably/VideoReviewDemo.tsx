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
} from "lucide-react";
import confetti from "canvas-confetti";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/core/utils/currency";

export function VideoReviewDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(14);
  const [duration, setDuration] = useState(60);
  const [approved, setApproved] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);

  const comments = [
    {
      id: "c-1",
      author: "Priya Sharma (Brand Lead)",
      timecode: "00:14",
      timeSec: 14,
      text: "Move the product brand logo slightly higher in the intro frame.",
      status: "Verified",
    },
    {
      id: "c-2",
      author: "Marcus Chen (Director)",
      timecode: "00:42",
      timeSec: 42,
      text: "Color grading on the 4K outdoor sequence looks pristine.",
      status: "Verified",
    },
    {
      id: "c-3",
      author: "Priya Sharma (Brand Lead)",
      timecode: "00:55",
      timeSec: 55,
      text: "Call-to-action link overlay timing is approved for launch.",
      status: "Approved",
    },
  ];

  const videoSrc =
    "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-a-video-41484-large.mp4";
  const posterImg =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80";

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

  const handleOpenApproveModal = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setConfirmModalOpen(true);
  };

  const handleConfirmApprove = () => {
    setConfirmModalOpen(false);
    setApproved(true);
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#087F5B", "#075E45", "#4EC296", "#EAF8F2", "#101310"],
      });
    } catch {}
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frame-Accurate Video Review</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            Collaborative 4K review.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
            Drop timecoded feedback pins directly onto video drafts. 1-click approve to trigger milestone payouts.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] p-4 sm:p-6 space-y-5 shadow-fintech">
          {/* Top HUD */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E6E1] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087F5B] animate-pulse" />
              <span className="text-[#101310] font-bold font-sans">Elena Rostova • AI Smartwatch Reel</span>
              <span className="text-[#8A908B] hidden sm:inline">•</span>
              <span className="text-[#626862] hidden sm:inline">Cut v2 (4K 60FPS)</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-[#087F5B] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>₹24,500 PROTECTED</span>
            </span>
          </div>

          {/* Video Viewport */}
          <div className="relative aspect-video rounded-xl bg-black border border-[#E2E6E1] overflow-hidden group shadow-inner">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterImg}
              playsInline
              muted={isMuted}
              loop
              onTimeUpdate={handleTimeUpdate}
              onClick={handleTogglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Play/Pause Button */}
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
                  className="bg-[#087F5B] h-full"
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
                <span className="text-[#8DD9BA] font-bold">Cut v2 Ready</span>
              </div>
            </div>
          </div>

          {/* Timecoded Review Comments (Section 16) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comments.map((c, i) => {
              const isActive = activeCommentIndex === i;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSeek(c.timeSec, i)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-[#EAF8F2] border-[#087F5B] shadow-xs scale-[1.01]"
                      : "bg-[#FCFCFA] border-[#E2E6E1] hover:border-[#8DD9BA] text-[#626862]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                    <span className="font-bold text-[#101310] truncate">{c.author}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#F1F2EE] text-[#087F5B] font-bold">@{c.timecode}</span>
                  </div>
                  <p className="text-xs text-[#626862] font-sans line-clamp-1">&ldquo;{c.text}&rdquo;</p>
                </button>
              );
            })}
          </div>

          {/* Bottom Approval Bar (Connecting Creative QA to Payment Settlement) */}
          <div className="pt-2">
            {approved ? (
              <div className="p-4 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] text-[#075E45] text-xs font-mono flex items-center justify-between">
                <span className="font-bold flex items-center gap-2 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[#087F5B]" /> ✓ Deliverable approved • Milestone ready for payment (₹22,050 Creator Net Disbursed)
                </span>
                <span className="font-extrabold text-[10px] text-[#087F5B]">READY</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenApproveModal}
                className="w-full py-3.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all font-sans cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Deliverable</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Approval Confirmation Dialog */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Approve Deliverable Sign-Off"
        description="Authorize milestone payment release to creator account."
        maxWidth="md"
      >
        <div className="space-y-4 pt-1 text-xs font-sans">
          <div className="p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-[#626862]">Campaign Milestone:</span>
              <span className="text-[#101310] font-bold">₹24,500</span>
            </div>
            <div className="flex justify-between text-[#087F5B]">
              <span>Creator Payout (90%):</span>
              <span className="font-bold">₹22,050</span>
            </div>
            <div className="flex justify-between text-[#626862] text-[11px]">
              <span>Platform Fee (10%):</span>
              <span>₹2,450</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E6E1]">
            <button
              type="button"
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 text-[#626862] hover:text-[#101310]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmApprove}
              className="px-5 py-2.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all"
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
