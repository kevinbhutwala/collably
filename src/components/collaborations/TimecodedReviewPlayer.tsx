"use client";

import React, { useState, useRef } from "react";
import { TimecodedComment } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import confetti from "canvas-confetti";
import {
  Play,
  Pause,
  MessageSquare,
  CheckCircle2,
  Send,
  Download,
  FileVideo,
  Layers,
  FileText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Sliders,
  Volume2,
  VolumeX,
  Clock,
  ArrowRightLeft,
  Check,
  Eye,
  FileSpreadsheet,
} from "lucide-react";

export function TimecodedReviewPlayer({
  videoTitle,
  initialComments = [],
  onApprove,
  onRequestRevision,
}: {
  videoTitle: string;
  initialComments?: TimecodedComment[];
  onApprove?: () => void;
  onRequestRevision?: (feedback: string) => void;
}) {
  const { user, role } = useAuthStore();
  const { addToast } = useUIStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeVersion, setActiveVersion] = useState<"v1" | "v2">("v2");
  const [activeTab, setActiveTab] = useState<"review" | "assets" | "license">("review");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(14);
  const [duration, setDuration] = useState(60);
  const [selectedCategory, setSelectedCategory] = useState<
    "visual" | "audio" | "pacing" | "overlay" | "copy"
  >("visual");
  const [newComment, setNewComment] = useState("");
  const [downloadingBundle, setDownloadingBundle] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unresolved">("all");

  const [comments, setComments] = useState<TimecodedComment[]>(initialComments);

  const videoSources = {
    v1: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-a-video-41484-large.mp4",
    v2: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-41487-large.mp4",
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.floor(videoRef.current.currentTime));
      setDuration(Math.floor(videoRef.current.duration || 60));
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSeek = (sec: number) => {
    setCurrentTime(sec);
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    const item: TimecodedComment = {
      id: `tc-${Date.now()}`,
      timestampSeconds: currentTime,
      timestampLabel: formatSeconds(currentTime),
      authorName: user?.name || (role === "brand" ? "Brand Lead" : "Verified Creator"),
      authorRole: role,
      authorAvatar:
        user?.avatarUrl ||
        (role === "brand"
          ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
          : "/creators/sara-dietschy.jpg"),
      category: selectedCategory,
      comment: newComment,
      resolved: false,
      createdAt: "Just now",
    };

    setComments((prev) => [...prev, item]);
    setNewComment("");
    addToast({
      type: "success",
      title: "Pin Dropped",
      message: `Annotated [${selectedCategory.toUpperCase()}] at ${formatSeconds(currentTime)}`,
    });
  };

  const toggleResolve = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c))
    );
  };

  const handleDownloadBundle = () => {
    setDownloadingBundle(true);
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingBundle(false);
          addToast({
            type: "success",
            title: "Production Bundle Ready",
            message: "4K Master, Raw B-Roll, Subtitles and PSD package downloaded.",
          });
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const exportNLEMarkers = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Timecode,Category,Author,Comment,Status"]
        .concat(
          comments.map(
            (c) =>
              `"${c.timestampLabel}","${c.category || "general"}","${c.authorName}","${c.comment.replace(/"/g, '""')}","${c.resolved ? "Resolved" : "Pending"}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${videoTitle.toLowerCase().replace(/\s+/g, "_")}_markers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: "success",
      title: "NLE Markers Exported",
      message: "Import directly into DaVinci Resolve or Adobe Premiere Pro.",
    });
  };

  const filteredComments =
    activeFilter === "unresolved" ? comments.filter((c) => !c.resolved) : comments;

  const categoryColor = (cat?: string) => {
    switch (cat) {
      case "visual":
        return "bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30";
      case "audio":
        return "bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30";
      case "pacing":
        return "bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/30";
      case "overlay":
        return "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30";
      case "copy":
        return "bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/30";
      default:
        return "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-white/10";
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 shadow-sm overflow-hidden text-[#111111] dark:text-[#F4F4F8]">
      {/* Top Header & Tool Tabs */}
      <div className="px-6 py-4 bg-[#FAFAF8] dark:bg-[#0E0E16] border-b border-[#E7E7E4] dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold text-sm shadow-xs">
            <FileVideo className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#111111] dark:text-white font-display">{videoTitle}</h3>
              <Badge variant="outline" className="text-[10px] font-mono font-semibold dark:border-white/10 dark:text-[#9A9AA6]">
                SLA: 5-Day Delivery Guarantee
              </Badge>
            </div>
            <p className="text-xs text-[#6B6B6B] dark:text-[#8E8EA4]">
              Frame-accurate review, automated raw asset downloads &amp; perpetual commercial rights.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#181824] border border-[#E7E7E4] dark:border-white/10 shadow-xs">
          <button
            onClick={() => setActiveTab("review")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "review"
                ? "bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                : "text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Review &amp; Annotate</span>
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "assets"
                ? "bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                : "text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Raw Asset Vault</span>
          </button>
          <button
            onClick={() => setLicenseModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>License Certificate</span>
          </button>
        </div>
      </div>

      {activeTab === "review" && (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Player Area */}
          <div className="lg:col-span-7 bg-[#FAFAF8] dark:bg-[#0E0E16] p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-[#E7E7E4] dark:border-white/10">
            {/* Version Comparison Bar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E7E7E4]/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">Version:</span>
                <div className="flex rounded-lg border border-[#E7E7E4] dark:border-white/10 p-0.5 bg-white dark:bg-[#181824]">
                  <button
                    onClick={() => {
                      setActiveVersion("v1");
                      handleSeek(10);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                      activeVersion === "v1"
                        ? "bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E]"
                        : "text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    v1 Rough Cut
                  </button>
                  <button
                    onClick={() => {
                      setActiveVersion("v2");
                      handleSeek(14);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all flex items-center gap-1 ${
                      activeVersion === "v2"
                        ? "bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E]"
                        : "text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    <span>v2 Master (Final)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg border border-[#E7E7E4] dark:border-white/10 bg-white dark:bg-[#181824] text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <span className="text-xs font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </span>
              </div>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video rounded-xl bg-black border border-[#E7E7E4] dark:border-white/10 overflow-hidden shadow-sm flex items-center justify-center group">
              <video
                ref={videoRef}
                src={videoSources[activeVersion]}
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                playsInline
                loop
                className="w-full h-full object-cover"
              />

              {/* Play / Pause Big Center Trigger */}
              <button
                onClick={handleTogglePlay}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              {/* Version Pill Overlay */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{activeVersion.toUpperCase()} PRORES MASTER (4K UHD)</span>
              </div>

              {/* Current Timecode Floating Display */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-white text-xs font-mono font-bold border border-white/10">
                {formatSeconds(currentTime)}
              </div>
            </div>

            {/* Interactive Timeline Scrub Bar with Pin Drop Markers */}
            <div className="space-y-2 mt-4">
              <div className="relative w-full py-2">
                {/* Pin markers positioned on timeline */}
                <div className="absolute inset-x-0 top-1.5 h-2 pointer-events-none">
                  {comments.map((c) => {
                    const leftPct = Math.min(100, Math.max(0, (c.timestampSeconds / duration) * 100));
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(c.timestampSeconds);
                        }}
                        style={{ left: `${leftPct}%` }}
                        className={`pointer-events-auto absolute -top-1 -ml-1.5 w-3 h-3 rounded-full border-2 border-white shadow-xs transition-transform hover:scale-125 ${
                          c.resolved ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        title={`${c.timestampLabel} - ${c.comment}`}
                      />
                    );
                  })}
                </div>

                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#E7E7E4] dark:bg-[#202030] rounded-lg appearance-none cursor-pointer accent-[#111111] dark:accent-[#FFD21F]"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>00:00 (Intro Hook)</span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Pending Revision</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Resolved</span>
                  </span>
                </span>
                <span>{formatSeconds(duration)} (End Card)</span>
              </div>
            </div>
          </div>

          {/* Right Annotations & Action Panel */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between h-full bg-white dark:bg-[#12121A] space-y-4">
            <div className="space-y-3">
              {/* Header with Filters & NLE Export */}
              <div className="flex items-center justify-between border-b border-[#E7E7E4] dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#111111] dark:text-white font-display">Feedback Notes</h4>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FAFAF8] dark:bg-[#181824] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">
                    {comments.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setActiveFilter(activeFilter === "all" ? "unresolved" : "all")
                    }
                    className="text-[11px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white px-2 py-0.5 rounded border border-[#E7E7E4] dark:border-white/10"
                  >
                    {activeFilter === "all" ? "Filter: All" : "Filter: Open"}
                  </button>
                  <button
                    onClick={exportNLEMarkers}
                    className="p-1 rounded text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white border border-[#E7E7E4] dark:border-white/10 hover:bg-[#FAFAF8] dark:hover:bg-[#181824]"
                    title="Export DaVinci Resolve / Premiere Markers (.csv)"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Comments Scrollable Stream */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {filteredComments.length === 0 ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824]">
                    <p className="text-xs text-[#6B6B6B] dark:text-[#8E8EA4] font-sans">
                      No timecoded review notes yet on this cut. Scrub the player timeline and leave feedback.
                    </p>
                  </div>
                ) : (
                  filteredComments.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSeek(c.timestampSeconds)}
                    className={`p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                      c.resolved
                        ? "bg-[#FAFAF8] dark:bg-[#161622] border-[#E7E7E4] dark:border-white/5 text-[#6B6B6B] dark:text-[#8E8EA4] opacity-75"
                        : "bg-white dark:bg-[#181824] border-[#E7E7E4] dark:border-white/10 text-[#111111] dark:text-white shadow-xs hover:border-[#111111] dark:hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#FAFAF8] dark:bg-[#202030] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-white">
                          {c.timestampLabel}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold uppercase ${categoryColor(
                            c.category
                          )}`}
                        >
                          {c.category || "note"}
                        </span>
                        <strong className="text-[#111111] dark:text-white font-sans text-xs">
                          {c.authorName}
                        </strong>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleResolve(c.id);
                        }}
                        className={`text-[10px] font-bold flex items-center gap-1 ${
                          c.resolved
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-[#6B6B6B] dark:text-[#8E8EA4] hover:text-[#111111] dark:hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{c.resolved ? "Resolved" : "Resolve"}</span>
                      </button>
                    </div>
                    <p className="leading-relaxed font-sans text-[#222222] dark:text-[#D4D4DF] pl-0.5">{c.comment}</p>
                  </div>
                ))
                )}
              </div>
            </div>

            {/* Comment Drop Form with Category Pills */}
            <form
              onSubmit={handleAddComment}
              className="space-y-3 pt-3 border-t border-[#E7E7E4] dark:border-white/10"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">
                    CATEGORY TAG:
                  </span>
                  <span className="text-[10px] font-mono text-[#111111] dark:text-white font-bold">
                    Drop Pin @ {formatSeconds(currentTime)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["visual", "audio", "pacing", "overlay", "copy"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all ${
                        selectedCategory === cat
                          ? "bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E]"
                          : "bg-[#FAFAF8] dark:bg-[#181824] text-[#6B6B6B] dark:text-[#8E8EA4] border border-[#E7E7E4] dark:border-white/10 hover:text-[#111111] dark:hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Add ${selectedCategory} note at ${formatSeconds(currentTime)}...`}
                  className="flex-1 bg-[#FAFAF8] dark:bg-[#181824] border border-[#E7E7E4] dark:border-white/10 rounded-lg px-3.5 py-2 text-xs text-[#111111] dark:text-white placeholder:text-[#6B6B6B] dark:placeholder:text-[#8E8EA4] focus:outline-none focus:border-[#111111] dark:focus:border-[#FFD21F] shadow-xs"
                />
                <Button variant="primary" size="sm" type="submit" className="rounded-lg">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Review Decision Buttons for Brand */}
              <div className="flex gap-2 pt-2 border-t border-[#E7E7E4]/80 dark:border-white/10">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 rounded-lg text-xs"
                  onClick={() =>
                    onRequestRevision &&
                    onRequestRevision("Please address the timecoded notes marked on the timeline.")
                  }
                >
                  Request v3 Revisions
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 rounded-lg text-xs bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  onClick={() => {
                    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                    if (onApprove) onApprove();
                  }}
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Approve Deliverables
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Raw Asset Vault Sub-view */}
      {activeTab === "assets" && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E7E4] dark:border-white/10">
            <div>
              <h4 className="text-base font-bold text-[#111111] dark:text-white font-display">
                Automated Raw Asset &amp; Production Deliverables Vault
              </h4>
              <p className="text-xs text-[#6B6B6B] dark:text-[#8E8EA4]">
                High-bitrate camera masters, clean B-roll footage, subtitles, and layered thumbnail files.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              disabled={downloadingBundle}
              onClick={handleDownloadBundle}
              className="rounded-xl flex items-center gap-2 bg-[#111111] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E]"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadingBundle
                  ? `Packaging (${downloadProgress}%)...`
                  : "Download Complete Bundle (.zip - 2.4 GB)"}
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 4K ProRes Master */}
            <div className="p-4 rounded-xl border border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824] space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold">
                  <FileVideo className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-[#F4F4F8]">
                  1.42 GB
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111111] dark:text-white">4K ProRes 422 HQ Master</h5>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4]">
                  3840x2160 • 60fps • 10-bit Rec.709 • 120Mbps
                </p>
              </div>
              <div className="pt-2 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>SHA: 8f4b...c912</span>
                <a
                  href={videoSources.v2}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#111111] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
                >
                  Download <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 9:16 Vertical Reel Cut */}
            <div className="p-4 rounded-xl border border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824] space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-[#F4F4F8]">
                  185 MB
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111111] dark:text-white">Vertical Short / Reel Cut (9:16)</h5>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4]">
                  1080x1920 • 60fps • Master audio mix
                </p>
              </div>
              <div className="pt-2 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>SHA: 2e7a...01bf</span>
                <a
                  href={videoSources.v1}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#111111] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
                >
                  Download <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Clean B-Roll Pack */}
            <div className="p-4 rounded-xl border border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824] space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold">
                  <FileVideo className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-[#F4F4F8]">
                  840 MB
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111111] dark:text-white">Clean B-Roll Package (.zip)</h5>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4]">
                  Uncompressed footage without graphics or voiceover for ad remixing.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>12 Individual Clips</span>
                <button
                  onClick={handleDownloadBundle}
                  className="font-bold text-[#111111] dark:text-[#FFD21F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Download <Download className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Layered Thumbnail PSD */}
            <div className="p-4 rounded-xl border border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824] space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-[#F4F4F8]">
                  48 MB
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111111] dark:text-white">Layered Thumbnail Package (.psd + .png)</h5>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4]">
                  High-res cutouts, color-graded background &amp; font styles.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>3840x2160 PSD</span>
                <button
                  onClick={handleDownloadBundle}
                  className="font-bold text-[#111111] dark:text-[#FFD21F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Download <Download className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Subtitle Sync */}
            <div className="p-4 rounded-xl border border-[#E7E7E4] dark:border-white/10 bg-[#FAFAF8] dark:bg-[#181824] space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-[#111111] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#12121A] border border-[#E7E7E4] dark:border-white/10 text-[10px] font-mono font-bold text-[#111111] dark:text-[#F4F4F8]">
                  6 KB
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111111] dark:text-white">Timed Subtitles (.srt + .vtt)</h5>
                <p className="text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4]">
                  Frame-accurate caption timestamps in English.
                </p>
              </div>
              <div className="pt-2 border-t border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B6B] dark:text-[#8E8EA4]">
                <span>Auto-caption verified</span>
                <button
                  onClick={handleDownloadBundle}
                  className="font-bold text-[#111111] dark:text-[#FFD21F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Download <Download className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Commercial Rights Certificate Card */}
            <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                  Verified Legal
                </span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                  Commercial Rights Certificate
                </h5>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                  Worldwide, perpetual digital distribution rights backed by escrow contract.
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between text-[10px] font-mono text-emerald-800 dark:text-emerald-300">
                <span>Cert #ABEY-CR-8921</span>
                <button
                  onClick={() => setLicenseModalOpen(true)}
                  className="font-bold text-emerald-900 dark:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Inspect Certificate <Eye className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commercial License Modal */}
      <Modal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        title="Commercial Digital Rights Certificate"
        maxWidth="2xl"
      >
        <div className="space-y-6 text-[#111111] dark:text-[#F4F4F8]">
          <div className="p-6 rounded-2xl bg-[#FAFAF8] dark:bg-[#161622] border border-[#E7E7E4] dark:border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#E7E7E4] dark:border-white/10 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">CERTIFICATE ID:</span>
                <p className="font-bold text-[#111111] dark:text-white">ABEY-RIGHTS-2026-0828-9842</p>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[10px] font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">ISSUANCE DATE:</span>
                <p className="font-bold text-[#111111] dark:text-white">August 28, 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">LICENSOR (CREATOR):</span>
                <p className="font-bold text-[#111111] dark:text-white font-sans text-sm">Sara Dietschy (@saradietschy)</p>
                <p className="text-[10px] text-[#6B6B6B] dark:text-[#8E8EA4]">New York, NY • Verified Technology Creator</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6B6B6B] dark:text-[#8E8EA4]">LICENSEE (BRAND):</span>
                <p className="font-bold text-[#111111] dark:text-white font-sans text-sm">Linear Dynamics Inc.</p>
                <p className="text-[10px] text-[#6B6B6B] dark:text-[#8E8EA4]">San Francisco, CA • Verified Corporate Entity</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1A28] border border-[#E7E7E4] dark:border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                <Check className="w-4 h-4" />
                <span>Worldwide Perpetual Digital Distribution Rights Granted</span>
              </div>
              <p className="font-sans text-[11px] text-[#444444] dark:text-[#D4D4DF] leading-relaxed">
                Licensor grants Licensee exclusive rights to publish, syndicate, excerpt, and run paid performance advertising across all digital platforms (YouTube, Instagram, TikTok, X, LinkedIn, Web) in perpetuity without secondary residuals.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] dark:text-[#8E8EA4] pt-2 border-t border-[#E7E7E4] dark:border-white/10">
              <span>Escrow Ledger Transaction: tx_8849204_settled</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Double-Entry Verified</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setLicenseModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                addToast({
                  type: "success",
                  title: "Certificate Downloaded",
                  message: "PDF copy saved with tamper-evident digital seal.",
                });
                setLicenseModalOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed PDF</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
