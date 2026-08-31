"use client";

import React, { useState } from "react";
import { TimecodedComment, UserRole } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  Play,
  Pause,
  Clock,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(18); // default to 00:18
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<TimecodedComment[]>(
    initialComments.length > 0
      ? initialComments
      : [
          {
            id: "tc-1",
            timestampSeconds: 14,
            timestampLabel: "00:14",
            authorName: "Linear Marketing",
            authorRole: "brand",
            authorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
            comment: "Great hook! Could we brighten the screen recording by 10% here?",
            resolved: true,
            createdAt: "2026-08-28 14:40",
          },
          {
            id: "tc-2",
            timestampSeconds: 45,
            timestampLabel: "00:45",
            authorName: "Linear Marketing",
            authorRole: "brand",
            authorAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
            comment: "Please make sure the discount code 'COLLABLY20' text stays on screen for at least 4 seconds.",
            resolved: false,
            createdAt: "2026-08-28 14:45",
          },
        ]
  );

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const item: TimecodedComment = {
      id: `tc-${Date.now()}`,
      timestampSeconds: currentTime,
      timestampLabel: formatSeconds(currentTime),
      authorName: user?.name || "Reviewer",
      authorRole: role,
      authorAvatar: user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      comment: newComment,
      resolved: false,
      createdAt: "Just now",
    };

    setComments((prev) => [...prev, item]);
    setNewComment("");
    addToast({
      type: "success",
      title: "Feedback Added",
      message: `Annotated at ${formatSeconds(currentTime)}`,
    });
  };

  const toggleResolve = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c))
    );
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Left Player Area */}
      <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col justify-between text-white relative">
        <div className="flex items-center justify-between pb-4">
          <div className="space-y-0.5">
            <Badge variant="glow" size="sm">4K Raw Deliverable v2</Badge>
            <h4 className="text-sm font-bold text-slate-100">{videoTitle}</h4>
          </div>
          <span className="text-xs font-mono text-slate-400">Duration: 01:00</span>
        </div>

        {/* Video Canvas Mock */}
        <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden my-4">
          <div className="text-center space-y-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-brand-accent text-white flex items-center justify-center mx-auto shadow-xl hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <p className="text-xs text-slate-400 font-mono">
              Scrub or click timeline to drop timestamped feedback pin
            </p>
          </div>

          {/* Timestamp Indicator */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/10">
            {formatSeconds(currentTime)} / 01:00
          </div>
        </div>

        {/* Interactive Scrub Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="60"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-accent"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>00:00</span>
            <span>00:30</span>
            <span>01:00</span>
          </div>
        </div>
      </div>

      {/* Right Comments & Approval Rail */}
      <div className="lg:col-span-5 p-6 flex flex-col justify-between h-full bg-white space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-brand-accent" />
              <span>Timecoded Feedback ({comments.length})</span>
            </h4>
            <span className="text-[11px] font-mono text-slate-500">Figma-Style Video Notes</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {comments.map((c) => (
              <div
                key={c.id}
                className={`p-3.5 rounded-2xl border transition-all text-xs ${
                  c.resolved
                    ? "bg-slate-50 border-slate-200 text-slate-500 opacity-80"
                    : "bg-orange-50/40 border-orange-200/80 text-slate-900 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-brand-accent">
                      {c.timestampLabel}
                    </span>
                    <strong className="text-slate-800 font-sans">{c.authorName}</strong>
                  </div>
                  <button
                    onClick={() => toggleResolve(c.id)}
                    className={`text-[10px] font-sans font-bold flex items-center gap-1 ${
                      c.resolved ? "text-emerald-600" : "text-slate-400 hover:text-emerald-600"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {c.resolved ? "Resolved" : "Mark Resolved"}
                  </button>
                </div>
                <p className="leading-relaxed">{c.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700 font-bold shrink-0">
              Pin at {formatSeconds(currentTime)}
            </span>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave note at current timestamp..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 shadow-sm"
            />
            <Button variant="accent" size="sm" type="submit">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Action Approval Controls */}
          {role === "brand" && (
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onRequestRevision && onRequestRevision("Please address timecoded comments.")}
              >
                Request Revisions
              </Button>
              <Button
                variant="accent"
                size="sm"
                className="flex-1 shadow-md shadow-brand-accent/20"
                onClick={() => onApprove && onApprove()}
              >
                Approve & Release Tranche
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
