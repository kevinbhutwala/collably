"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { INITIAL_VIDEO_COMMENTS, ReviewAnnotation } from "@/data/reviews";
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

  const comments = INITIAL_VIDEO_COMMENTS;

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

  const handleConfirmApprove = () => {
    setConfirmModalOpen(false);
    setApproved(true);
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff007f", "#b300b3", "#d4af37", "#10b981", "#ffffff"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[950px] h-[350px] sm:h-[600px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Frame-Accurate Video QA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Collaborative 4K review.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Drop timecoded feedback pins directly onto video drafts. 1-click approve to disburse milestone payouts.
          </p>
        </div>

        {/* Large Cinematic Video Player Canvas */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#120c16] border border-white/10 p-4 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Top Video HUD */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold font-display">Elena Rostova • AI Smartwatch Reel</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">Cut v2 (4K 60FPS)</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>$3,200 PROTECTED</span>
            </span>
          </div>

          {/* Video Viewport */}
          <div className="relative aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden group shadow-inner">
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Active Annotation Box */}
            {comments[activeCommentIndex] && comments[activeCommentIndex].box && (
              <div
                className="absolute border-2 border-[hsl(327,100%,50%)] bg-pink-500/20 rounded-xl transition-all duration-300 pointer-events-none flex items-start justify-end p-2"
                style={comments[activeCommentIndex].box}
              >
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-mono text-[9px] font-bold shadow-lg">
                  @{comments[activeCommentIndex].timecode} {comments[activeCommentIndex].tag}
                </span>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handleTogglePlay}
                className={`w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all pointer-events-auto hover:scale-105 shadow-2xl ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
                aria-label="Play or Pause"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
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
                className="w-full bg-white/25 hover:bg-white/35 h-2 rounded-full overflow-hidden relative cursor-pointer"
              >
                <div
                  className="bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] h-full"
                  style={{ width: `${((currentTimeSec / (duration || 60)) * 100).toFixed(1)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-3">
                  <span>{formatTime(currentTimeSec)} / {formatTime(duration || 60)}</span>
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-emerald-400 font-bold">Cut v2 Ready</span>
              </div>
            </div>
          </div>

          {/* Timecoded Annotation Pills Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comments.map((c, i) => {
              const isActive = activeCommentIndex === i;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSeek(c.timeSec, i)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-[#180f1d] border-[hsl(327,100%,50%)] shadow-md shadow-pink-500/20 scale-[1.02]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                    <span className="font-bold text-white truncate">{c.author}</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-pink-300 font-bold">@{c.timecode}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans line-clamp-1">&ldquo;{c.text}&rdquo;</p>
                </button>
              );
            })}
          </div>

          {/* Bottom Approval Bar */}
          <div className="pt-2">
            {approved ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
                <span className="font-bold flex items-center gap-2 font-display">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Milestone Approved! $2,880 Disbursed via Stripe Connect.
                </span>
                <span className="font-extrabold text-[10px]">PAID</span>
              </div>
            ) : (
              <button
                onClick={() => setConfirmModalOpen(true)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 transition-all font-display"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Deliverable &amp; Release Milestone ({formatCurrency(3200)})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Approve Deliverable Sign-Off"
        description="Authorize milestone disbursement via Stripe Connect."
        maxWidth="md"
      >
        <div className="space-y-4 pt-1 text-xs">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Milestone Budget:</span>
              <span className="text-white font-bold">{formatCurrency(3200)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Creator Payout (90%):</span>
              <span className="font-bold">{formatCurrency(2880)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmApprove}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold font-display shadow-md shadow-pink-500/25 flex items-center gap-1.5"
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
