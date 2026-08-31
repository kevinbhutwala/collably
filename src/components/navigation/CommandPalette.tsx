"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { MOCK_BRANDS } from "@/mock/brands.mock";
import {
  Search,
  Sparkles,
  Layers,
  Users,
  Building2,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  Plus,
  ArrowRight,
  Command,
  X,
  FileText,
  HelpCircle,
  Clock,
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
      c.handle.toLowerCase().includes(query.toLowerCase()) ||
      c.primaryCategory.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.brand.companyName.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-elevated overflow-hidden divide-y divide-slate-100 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Header */}
        <div className="p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search creators, campaigns, brands (⌘K)..."
            className="flex-1 text-sm bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs font-mono">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
              Quick Actions
            </div>
            <div className="space-y-1 font-sans">
              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/brand/campaigns/create"))
                }
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-50 text-slate-800 hover:text-brand-accent transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-orange-50 text-brand-accent flex items-center justify-center">
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
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-50 text-slate-800 hover:text-brand-accent transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Open Creator Shortlists & Side-by-Side Comparison</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Tool</span>
              </button>

              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/support"))
                }
                className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-50 text-slate-800 hover:text-brand-accent transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Open Support Center & Dispute Manager</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Help</span>
              </button>
            </div>
          </div>

          {/* Switch Persona Role */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
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
                    ? "bg-slate-900 text-white font-bold border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200"
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
                    ? "bg-slate-900 text-white font-bold border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200"
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
                    ? "bg-slate-900 text-white font-bold border-slate-900 shadow-sm"
                    : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200"
                }`}
              >
                Agency Admin
              </button>
            </div>
          </div>

          {/* Creators Matches */}
          {filteredCreators.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                Creators
              </div>
              <div className="space-y-1 font-sans">
                {filteredCreators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(() => router.push(`/creators/${c.id}`))}
                    className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-[10px]">
                        {c.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{c.fullName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">@{c.handle} • {c.primaryCategory}</div>
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
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                Live Campaign Briefs
              </div>
              <div className="space-y-1 font-sans">
                {filteredCampaigns.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => handleSelect(() => router.push(`/campaigns/${camp.id}`))}
                    className="w-full p-2.5 rounded-2xl flex items-center justify-between text-left hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{camp.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{camp.brand.companyName} • {camp.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-sm text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Collably Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 shadow-sm text-[10px]">⌘K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
