"use client";

import React, { useState } from "react";
import { TimecodedComment } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import {
  Play,
  Pause,
  MessageSquare,
  CheckCircle2,
  Send,
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
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 text-[#111111]">
      {/* Left Player Area */}
      <div className="lg:col-span-7 bg-[#FAFAF8] p-6 flex flex-col justify-between text-[#111111] relative border-b lg:border-b-0 lg:border-r border-[#E7E7E4]">
        <div className="flex items-center justify-between pb-4">
          <div className="space-y-0.5">
            <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
              4K Raw Deliverable v2
            </span>
            <h4 className="text-sm font-bold text-[#111111] font-display">{videoTitle}</h4>
          </div>
          <span className="text-xs font-mono text-[#6B6B6B]">Duration: 01:00</span>
        </div>

        {/* Video Canvas Mock */}
        <div className="relative aspect-video rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center overflow-hidden my-4 shadow-xs">
          <div className="text-center space-y-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-[#111111] text-[#FAFAF8] flex items-center justify-center mx-auto shadow-xs hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <p className="text-xs text-[#6B6B6B] font-mono">
              Scrub or click timeline to drop timestamped feedback pin
            </p>
          </div>

          {/* Timestamp Indicator */}
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#111111] text-xs font-mono font-bold text-[#FAFAF8]">
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
            className="w-full h-1.5 bg-[#E7E7E4] rounded-lg appearance-none cursor-pointer accent-[#111111]"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#6B6B6B]">
            <span>00:00</span>
            <span>00:30</span>
            <span>01:00</span>
          </div>
        </div>
      </div>

      {/* Right Comments & Approval Rail */}
      <div className="lg:col-span-5 p-6 flex flex-col justify-between h-full bg-[#FFFFFF] space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E7E4] pb-3">
            <h4 className="text-sm font-bold text-[#111111] flex items-center gap-1.5 font-display">
              <MessageSquare className="w-4 h-4 text-[#111111]" />
              <span>Timecoded Feedback ({comments.length})</span>
            </h4>
            <span className="text-[11px] font-mono text-[#6B6B6B]">Precision Video Notes</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {comments.map((c) => (
              <div
                key={c.id}
                className={`p-3.5 rounded-xl border transition-all text-xs ${
                  c.resolved
                    ? "bg-[#FAFAF8] border-[#E7E7E4] text-[#6B6B6B] opacity-75"
                    : "bg-[#FAFAF8] border-[#E7E7E4] text-[#111111] shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#E7E7E4] text-[10px] font-bold text-[#111111]">
                      {c.timestampLabel}
                    </span>
                    <strong className="text-[#111111] font-sans">{c.authorName}</strong>
                  </div>
                  <button
                    onClick={() => toggleResolve(c.id)}
                    className={`text-[10px] font-sans font-bold flex items-center gap-1 ${
                      c.resolved ? "text-[#111111]" : "text-[#6B6B6B] hover:text-[#111111]"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {c.resolved ? "Resolved" : "Mark Resolved"}
                  </button>
                </div>
                <p className="leading-relaxed font-sans text-[#111111]">{c.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="space-y-3 pt-2 border-t border-[#E7E7E4]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[#FAFAF8] border border-[#E7E7E4] font-mono text-xs text-[#111111] font-bold shrink-0">
              Pin at {formatSeconds(currentTime)}
            </span>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave note at current timestamp..."
              className="flex-1 bg-[#FAFAF8] border border-[#E7E7E4] rounded-lg px-3.5 py-1.5 text-xs text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#111111] shadow-xs"
            />
            <Button variant="primary" size="sm" type="submit" className="rounded-[9px]">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Action Approval Controls */}
          {role === "brand" && (
            <div className="flex gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 rounded-[9px]"
                onClick={() => onRequestRevision && onRequestRevision("Please address timecoded comments.")}
              >
                Request Revisions
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 rounded-[9px]"
                onClick={() => onApprove && onApprove()}
              >
                Approve &amp; Release Tranche
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
