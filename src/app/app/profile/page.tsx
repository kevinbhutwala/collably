"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { ExternalLink, Save } from "lucide-react";

export default function CreatorProfileEditPage() {
  const { currentCreator } = useAuthStore();
  const { addToast } = useUIStore();
  const [headline, setHeadline] = useState(currentCreator?.headline || "");
  const [bio, setBio] = useState(currentCreator?.bio || "");
  const [startingPrice, setStartingPrice] = useState(currentCreator?.startingPrice || 2200);

  const handleSave = () => {
    addToast({
      type: "success",
      title: "Media Kit Updated",
      message: "Your creator media kit and rate cards have been saved.",
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Media Kit Editor
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Public Link Enabled</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Media Kit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Customize your bio, headline, deliverable pricing tiers, and previous brand case studies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentCreator && (
            <Link href={`/creators/${currentCreator.id}`} target="_blank">
              <Button variant="secondary" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
                Preview Public Kit
              </Button>
            </Link>
          )}
          <Button variant="accent" size="md" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Edit */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
            <h3 className="text-base font-bold text-slate-900">Headline & Positioning</h3>
            <Input
              label="Creator Tagline / Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. AI Engineer & Hardware Reviewer"
            />
            <Textarea
              label="Bio & Media Kit Narrative"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
            <Input
              label="Minimum Starting Fee ($ USD)"
              type="number"
              value={startingPrice}
              onChange={(e) => setStartingPrice(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <h3 className="text-base font-bold text-slate-900">Configured Rate Cards</h3>
            <div className="space-y-4">
              {currentCreator?.rateCards.map((rc) => (
                <div key={rc.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-brand-accent uppercase font-bold">{rc.deliverableType}</span>
                    <h4 className="text-sm font-bold text-slate-900">{rc.title}</h4>
                    <p className="text-slate-500 mt-0.5">{rc.turnaroundDays} Days Turnaround</p>
                  </div>
                  <span className="font-mono text-emerald-600 font-extrabold text-base">
                    {formatCurrency(rc.basePrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Card Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 font-mono">Live Card Snapshot</h4>
            {currentCreator && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={currentCreator.avatarUrl} alt={currentCreator.fullName} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{currentCreator.fullName}</h4>
                    <p className="text-xs text-slate-500">@{currentCreator.handle}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-700 font-medium">{headline || currentCreator.headline}</p>
                <div className="p-3 rounded-xl bg-slate-50 font-mono text-xs text-center border border-slate-200 flex justify-around">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Followers</span>
                    <span className="text-slate-900 font-bold">{formatNumber(currentCreator.totalFollowers)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Engagement</span>
                    <span className="text-emerald-600 font-bold">{currentCreator.avgEngagementRate}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
