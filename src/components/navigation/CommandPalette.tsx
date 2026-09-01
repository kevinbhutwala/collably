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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-2xl overflow-hidden text-[#111111]">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E7E7E4]">
          <Search className="w-5 h-5 text-[#111111] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search creators, campaigns, brands (⌘K)..."
            className="flex-1 text-sm bg-transparent border-none text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#111111] hover:bg-[#FAFAF8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs font-mono">
          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] font-sans">
              Quick Actions
            </div>
            <div className="space-y-1 font-sans">
              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/brand/campaigns/create"))
                }
                className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-[#FAFAF8] text-[#111111] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center">
                    <Plus className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="font-bold">Create New Campaign Brief (Wizard)</span>
                </div>
                <span className="text-[10px] text-[#6B6B6B] font-mono">Action</span>
              </button>

              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/brand/shortlists"))
                }
                className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-[#FAFAF8] text-[#111111] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="font-bold">Open Creator Shortlists &amp; Side-by-Side Comparison</span>
                </div>
                <span className="text-[10px] text-[#6B6B6B] font-mono">Tool</span>
              </button>

              <button
                onClick={() =>
                  handleSelect(() => router.push("/app/support"))
                }
                className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-[#FAFAF8] text-[#111111] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-[#111111]" />
                  </div>
                  <span className="font-bold">Open Support Center &amp; Dispute Manager</span>
                </div>
                <span className="text-[10px] text-[#6B6B6B] font-mono">Help</span>
              </button>
            </div>
          </div>

          {/* Switch Persona Role */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] font-sans">
              Switch Workspace Persona
            </div>
            <div className="grid grid-cols-3 gap-2 font-sans pt-1">
              <button
                onClick={() => {
                  setRole("creator");
                  addToast({ type: "info", title: "Role Changed", message: "Switched to Creator Workspace" });
                  setIsOpen(false);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  role === "creator"
                    ? "bg-[#111111] text-[#FAFAF8] font-bold border-[#111111] shadow-xs"
                    : "bg-[#FAFAF8] hover:bg-[#FFFFFF] text-[#6B6B6B] border-[#E7E7E4]"
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
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  role === "brand"
                    ? "bg-[#111111] text-[#FAFAF8] font-bold border-[#111111] shadow-xs"
                    : "bg-[#FAFAF8] hover:bg-[#FFFFFF] text-[#6B6B6B] border-[#E7E7E4]"
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
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  role === "agency_admin"
                    ? "bg-[#111111] text-[#FAFAF8] font-bold border-[#111111] shadow-xs"
                    : "bg-[#FAFAF8] hover:bg-[#FFFFFF] text-[#6B6B6B] border-[#E7E7E4]"
                }`}
              >
                Agency Admin
              </button>
            </div>
          </div>

          {/* Creators Matches */}
          {filteredCreators.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] font-sans">
                Creators
              </div>
              <div className="space-y-1 font-sans">
                {filteredCreators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(() => router.push(`/creators/${c.id}`))}
                    className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-[#FAFAF8] text-[#111111] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center font-bold text-[#111111] text-[10px]">
                        {c.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#111111] text-xs">{c.fullName}</div>
                        <div className="text-[10px] text-[#6B6B6B] font-mono">@{c.handle} • {c.primaryCategory}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B6B6B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campaigns Matches */}
          {filteredCampaigns.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] font-sans">
                Live Campaign Briefs
              </div>
              <div className="space-y-1 font-sans">
                {filteredCampaigns.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => handleSelect(() => router.push(`/campaigns/${camp.id}`))}
                    className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-[#FAFAF8] text-[#111111] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#111111] text-xs">{camp.title}</div>
                      <div className="text-[10px] text-[#6B6B6B] font-mono">{camp.brand.companyName} • {camp.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B6B6B]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FAFAF8] border-t border-[#E7E7E4] flex items-center justify-between text-[11px] text-[#6B6B6B] font-mono">
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Collably Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-[10px]">⌘K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
