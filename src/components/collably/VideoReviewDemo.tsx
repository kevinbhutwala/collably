"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Video,
  Clock,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Layers,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function VideoReviewDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimeSec, setCurrentTimeSec] = useState(14);
  const [duration, setDuration] = useState(60);
  const [approved, setApproved] = useState(false);
  const [activeCommentIndex, setActiveCommentIndex] = useState(1);

  // High-definition creator review clip
  const videoSrc =
    "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-a-video-41484-large.mp4";
  const posterImg =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80";

  const comments = [
    {
      timeSec: 14,
      timecode: "00:14",
      author: "Sarah Jenkins (Head of Growth)",
      role: "Sponsor QA",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
      tag: "Hook & Pacing",
      text: "Hook pacing is punchy! Crisp transition into product interface demo at 00:14.",
      box: { top: "25%", left: "30%", width: "40%", height: "45%" },
    },
    {
      timeSec: 42,
      timecode: "00:42",
      author: "Marcus Vance (Creative Director)",
      role: "Brand Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
      tag: "Lower-Third CTA",
      text: "Updated lower-third CTA coupon code graphic. Contrast and brand font look perfect.",
      box: { top: "65%", left: "20%", width: "60%", height: "25%" },
    },
    {
      timeSec: 55,
      timecode: "00:55",
      author: "Elena Rostova (Lead Creator)",
      role: "Verified Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      tag: "FTC Disclosure",
      text: "Verified FTC audio tag & visual '#ad' watermark added. Ready for final commercial sign-off.",
      box: { top: "15%", left: "15%", width: "70%", height: "60%" },
    },
  ];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (timeSec: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeSec;
      setCurrentTimeSec(timeSec);
    }
    setActiveCommentIndex(index);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTimeSec(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleApprove = () => {
    setApproved(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF5E3A", "#F43F5E", "#10B981", "#FBBF24", "#6366F1"],
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <section className="py-24 sm:py-32 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      {/* Ambient Radial Mesh Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[900px] h-[350px] sm:h-[550px] bg-gradient-radial from-orange-200/35 via-rose-100/20 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
              <Video className="w-3.5 h-3.5" />
              <span>Interactive 4K Video Review Studio</span>
            </div>

            <ScrollRevealText
              as="h2"
              gradientWords={["frame-accurate", "video", "reviews"]}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display leading-tight"
            >
              Frame-accurate deliverable reviews.
            </ScrollRevealText>

            <ScrollRevealText
              as="p"
              gradientWords={["timecoded", "version", "one-click", "payout"]}
              className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed"
            >
              Review 4K video drafts with timecoded notes, instant frame inspection, and one-click milestone payout approval.
            </ScrollRevealText>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setApproved(false);
                handleSeek(42, 1);
              }}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Review Demo</span>
            </button>
          </div>
        </div>

        {/* Video Player Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive 4K Video Review Studio Frame */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 space-y-5 shadow-elevated relative overflow-hidden">
            {/* Player Studio Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-900 font-bold font-display">Elena Rostova • AI Smartwatch Review</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-500 hidden sm:inline">Cut v2 (4K ProRes)</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-brand-accent font-bold text-[10px]">
                3840×2160 • 60 FPS
              </span>
            </div>

            {/* Video Stage with Real HTML5 Video */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden group shadow-inner">
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

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Active Timestamp Annotation Frame Overlay */}
              {comments[activeCommentIndex] && (
                <div
                  className="absolute border-2 border-brand-accent bg-brand-accent/15 rounded-xl transition-all duration-300 pointer-events-none flex items-start justify-end p-2"
                  style={comments[activeCommentIndex].box}
                >
                  <span className="px-2 py-0.5 rounded-md bg-brand-accent text-white font-mono text-[9px] font-bold shadow-md">
                    @{comments[activeCommentIndex].timecode} {comments[activeCommentIndex].tag}
                  </span>
                </div>
              )}

              {/* Top HUD Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-[11px]">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/15 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  <span>TIMECODE: {formatTime(currentTimeSec)}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>$3,200 ESCROW LOCKED</span>
                </span>
              </div>

              {/* Center Big Play/Pause Toggle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={handleTogglePlay}
                  className={`w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all pointer-events-auto hover:scale-105 shadow-2xl ${
                    isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                  }`}
                  aria-label="Play or Pause Video"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1 text-white fill-white" />
                  )}
                </button>
              </div>

              {/* Bottom Scrubber & HUD Controls */}
              <div className="absolute bottom-3 left-4 right-4 z-10 space-y-2">
                {/* Visual Scrubber Track */}
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
                    className="bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 h-full transition-all"
                    style={{
                      width: `${((currentTimeSec / (duration || 60)) * 100).toFixed(1)}%`,
                    }}
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
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cut v2 Ready for Commercial Sign-Off</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Approve Escrow Payout Button */}
            <div className="pt-2">
              {approved ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center justify-between shadow-xs">
                  <span className="font-bold flex items-center gap-2 font-display">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Milestone Approved! $2,880 Disbursed to Elena Rostova.
                  </span>
                  <span className="text-emerald-800 font-extrabold font-mono">STATUS: DISBURSED</span>
                </div>
              ) : (
                <button
                  onClick={handleApprove}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-brand-accent/25 flex items-center justify-center gap-2 transition-all font-display tracking-tight"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1-Click Approve Deliverable &amp; Release Escrow Payout ($3,200)</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Timecoded Review Comments Stream (Interactive Jump Links) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
              <span className="text-slate-900 font-bold uppercase font-display">
                Timecoded Review Annotations
              </span>
              <span className="text-brand-accent font-bold">Click Note to Seek &rarr;</span>
            </div>

            <div className="space-y-3">
              {comments.map((c, i) => {
                const isActive = activeCommentIndex === i;
                return (
                  <div
                    key={c.timecode}
                    onClick={() => handleSeek(c.timeSec, i)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-white border-brand-accent shadow-md shadow-brand-accent/15 scale-102"
                        : "bg-white border-slate-200/90 hover:border-slate-300 shadow-xs hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 font-display">{c.author}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block">{c.role}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                        isActive
                          ? "bg-orange-50 text-brand-accent border-orange-200"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}>
                        @{c.timecode}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-sans leading-relaxed pl-10">
                      &ldquo;{c.text}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
