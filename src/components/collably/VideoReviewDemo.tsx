"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Send,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";
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

  // Dynamic comments list allowing user to post new timecoded notes
  const [comments, setComments] = useState<ReviewAnnotation[]>(INITIAL_VIDEO_COMMENTS);
  const [newCommentText, setNewCommentText] = useState("");

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const timeLabel = formatTime(currentTimeSec);
    const newNote: ReviewAnnotation = {
      id: `rev-${Date.now()}`,
      timeSec: Math.round(currentTimeSec),
      timecode: timeLabel,
      author: "Brand QA Reviewer",
      role: "Reviewer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      tag: "Feedback",
      text: newCommentText.trim(),
      resolved: false,
    };

    setComments((prev) => [...prev, newNote]);
    setActiveCommentIndex(comments.length);
    setNewCommentText("");
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
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[950px] h-[350px] sm:h-[600px] bg-gradient-radial from-[hsl(327,100%,50%)]/15 via-[hsl(300,100%,42%)]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Frame-Accurate Video Review Studio</span>
            </div>
            <ScrollRevealText
              as="h2"
              gradientWords={["timecoded", "feedback", "directly", "4k", "footage"]}
              className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
            >
              Timecoded feedback directly on 4K footage.
            </ScrollRevealText>
            <ScrollRevealText
              as="p"
              gradientWords={["click", "seek", "timestamp", "instant", "approval"]}
              className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed"
            >
              Click any note to seek directly to the exact frame. Add timestamped feedback notes or 1-click approve to disburse protected milestone payments.
            </ScrollRevealText>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setApproved(false);
                setComments(INITIAL_VIDEO_COMMENTS);
                handleSeek(14, 0);
              }}
              className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all shadow-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Review Demo</span>
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Video Review Player */}
          <div className="lg:col-span-7 rounded-3xl bg-[#120c16] border border-white/10 p-5 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold font-display">Elena Rostova • AI Smartwatch Review</span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-slate-400 hidden sm:inline">Cut v2 (4K ProRes)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] font-bold text-[10px]">
                3840×2160 • 60 FPS
              </span>
            </div>

            {/* Video Canvas */}
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

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Active Timestamp Overlay Box */}
              {comments[activeCommentIndex] && comments[activeCommentIndex].box && (
                <div
                  className="absolute border-2 border-[hsl(327,100%,50%)] bg-pink-500/20 rounded-xl transition-all duration-300 pointer-events-none flex items-start justify-end p-2"
                  style={comments[activeCommentIndex].box}
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-mono text-[9px] font-bold shadow-md shadow-pink-500/30">
                    @{comments[activeCommentIndex].timecode} {comments[activeCommentIndex].tag}
                  </span>
                </div>
              )}

              {/* Top HUD Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-[11px]">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[hsl(327,100%,55%)]" />
                  <span>TIMECODE: {formatTime(currentTimeSec)}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>$3,200 MILESTONE PROTECTED</span>
                </span>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={handleTogglePlay}
                  className={`w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all pointer-events-auto hover:scale-105 shadow-2xl ${
                    isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                  aria-label="Play or Pause Video"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
                </button>
              </div>

              {/* Bottom Scrubber Track */}
              <div className="absolute bottom-3 left-4 right-4 z-10 space-y-2">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    if (videoRef.current) {
                      videoRef.current.currentTime = pos * (duration || 60);
                    }
                  }}
                  className="w-full bg-white/25 hover:bg-white/35 h-2 rounded-full overflow-hidden relative cursor-pointer transition-colors"
                >
                  <div
                    className="bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)] h-full transition-all"
                    style={{ width: `${((currentTimeSec / (duration || 60)) * 100).toFixed(1)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <div className="flex items-center gap-3">
                    <span>
                      {formatTime(currentTimeSec)} / {formatTime(duration || 60)}
                    </span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cut v2 Ready for Sign-Off</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Approve Button */}
            <div className="pt-1">
              {approved ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
                  <span className="font-bold flex items-center gap-2 font-display">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Milestone Approved! $2,880 Disbursed via Stripe Connect.
                  </span>
                  <span className="text-emerald-300 font-extrabold font-mono text-[10px]">STATUS: PAID</span>
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

          {/* Right: Comments Stream & Add Comment Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
              <span className="text-white font-bold uppercase font-display">Timecoded Annotations ({comments.length})</span>
              <span className="text-[hsl(327,100%,55%)] font-bold">Click to Seek &rarr;</span>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {comments.map((c, i) => {
                const isActive = activeCommentIndex === i;
                return (
                  <div
                    key={c.id || i}
                    onClick={() => handleSeek(c.timeSec, i)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-[#160f1c] border-[hsl(327,100%,50%)] shadow-md shadow-pink-500/20 scale-[1.01]"
                        : "bg-[#120c16] border-white/10 hover:border-pink-500/30 shadow-xs hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={c.avatar} alt={c.author} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                        <div>
                          <h4 className="text-xs font-bold text-white font-display">{c.author}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block">{c.role}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                        isActive ? "bg-pink-500/20 text-[hsl(327,100%,55%)] border-pink-500/40" : "bg-white/[0.04] text-slate-300 border-white/10"
                      }`}>
                        @{c.timecode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed pl-9">
                      &ldquo;{c.text}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Add timestamped note at:</span>
                <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">@{formatTime(currentTimeSec)}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Drop a note on this frame..."
                  className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500/50"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="p-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white hover:brightness-110 disabled:opacity-50 transition-all"
                  aria-label="Post comment"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Approval Confirmation Dialog */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Approve Deliverable Sign-Off"
        description="Confirm deliverable acceptance and authorize milestone disbursement."
        maxWidth="md"
      >
        <div className="space-y-4 pt-1 font-sans text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Campaign:</span>
              <span className="text-white font-bold">AI Smartwatch Launch</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Creator:</span>
              <span className="text-white font-bold">Elena Rostova (@elenatech)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className="text-slate-400">Gross Milestone Budget:</span>
              <span className="text-white font-bold">{formatCurrency(3200)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Creator Net Disbursement (90%):</span>
              <span className="font-bold">{formatCurrency(2880)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            <strong className="text-white">Commercial Rights Notice:</strong> By clicking confirm, full digital commercial usage rights transfer to the brand and payout is queued for automated release via Stripe Connect.
          </p>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmApprove}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs font-display shadow-md shadow-pink-500/25 flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm &amp; Disburse Payout</span>
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
