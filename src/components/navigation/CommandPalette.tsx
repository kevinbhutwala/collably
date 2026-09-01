"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import {
  Search,
  Layers,
  Plus,
  ArrowRight,
  X,
  HelpCircle,
} from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { role, setRole } = useAuthStore();
  const { addToast } = useUIStore();

  // Keyboard shortcut listener: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  const filteredCreators = MOCK_CREATORS.filter(
    (c) =>
      c.fullName.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.brand.companyName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0a070a]/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#120c16] border border-white/10 shadow-2xl overflow-hidden text-white">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-[hsl(327,100%,55%)] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search creators, campaigns, brands (⌘K)..."
            className="flex-1 text-sm bg-transparent border-none text-white placeholder:text-slate-500 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs font-mono">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-300 font-sans">
              Quick Actions
            </div>
            <div className="space-y-1 font-sans">
              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/brand/campaigns/create"))
                }
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-white/[0.06] text-slate-200 hover:text-pink-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Create New Campaign Brief (Wizard)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Action</span>
              </button>

              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/brand/shortlists"))
                }
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-white/[0.06] text-slate-200 hover:text-pink-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Open Creator Shortlists &amp; Side-by-Side Comparison</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Tool</span>
              </button>

              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/support"))
                }
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-white/[0.06] text-slate-200 hover:text-pink-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Open Support Center &amp; Dispute Manager</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Help</span>
              </button>
            </div>
          </div>

          {/* Switch Persona Role */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-300 font-sans">
              Switch Workspace Persona
            </div>
            <div className="grid grid-cols-3 gap-2 font-sans pt-1">
              <button
                onClick={() => {
                  setRole("creator");
                  addToast({ type: "info", title: "Role Changed", message: "Switched to Creator Workspace" });
                  setIsOpen(false);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  role === "creator"
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold border-transparent shadow-md shadow-pink-500/25"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10"
                }`}
              >
                Creator Role
              </button>
              <button
                onClick={() => {
                  setRole("brand");
                  addToast({ type: "info", title: "Role Changed", message: "Switched to Brand Workspace" });
                  setIsOpen(false);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  role === "brand"
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold border-transparent shadow-md shadow-pink-500/25"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10"
                }`}
              >
                Brand Role
              </button>
              <button
                onClick={() => {
                  setRole("agency_admin");
                  addToast({ type: "info", title: "Role Changed", message: "Switched to Agency Admin OS" });
                  setIsOpen(false);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  role === "agency_admin"
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold border-transparent shadow-md shadow-pink-500/25"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10"
                }`}
              >
                Agency Admin
              </button>
            </div>
          </div>

          {/* Creators Matches */}
          {filteredCreators.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-300 font-sans">
                Creators
              </div>
              <div className="space-y-1 font-sans">
                {filteredCreators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(() => router.push(`/creators/${c.id}`))}
                    className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-white/[0.06] text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white text-[10px]">
                        {c.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{c.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">@{c.handle} • {c.primaryCategory}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campaigns Matches */}
          {filteredCampaigns.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-pink-300 font-sans">
                Live Campaign Briefs
              </div>
              <div className="space-y-1 font-sans">
                {filteredCampaigns.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => handleSelect(() => router.push(`/campaigns/${camp.id}`))}
                    className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-white/[0.06] text-slate-200 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{camp.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{camp.brand.companyName} • {camp.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Collably Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">⌘K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
