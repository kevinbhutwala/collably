"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { aiService } from "@/services/ai.service";
import { useUIStore } from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { Sparkles, Wand2 } from "lucide-react";

export function AICreatorPitchModal({
  isOpen,
  onClose,
  campaignTitle,
  brandName,
  onApplyPitch,
}: {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  brandName: string;
  onApplyPitch: (pitchText: string) => void;
}) {
  const { currentCreator } = useAuthStore();
  const { addToast } = useUIStore();
  const [angle, setAngle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const creator = currentCreator || MOCK_CREATORS[0];
      const campaign = MOCK_CAMPAIGNS[0];
      const pitchObj = await aiService.generateCreatorPitch(creator, campaign);
      const customizedPitch = angle
        ? `${pitchObj.fullPitch}\n\nCustom Concept & Hook Idea:\n${angle}`
        : pitchObj.fullPitch;

      setGeneratedPitch(customizedPitch);
      addToast({
        type: "success",
        title: "AI Pitch Crafted",
        message: "Your proposal pitch has been tailored to the brand's brief.",
      });
    } catch {
      addToast({
        type: "error",
        title: "Generation failed",
        message: "Could not generate pitch proposal.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUsePitch = () => {
    onApplyPitch(generatedPitch);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Creator Proposal Pitch Assistant"
      description={`Craft a high-converting creative proposal for ${brandName}`}
      maxWidth="xl"
    >
      <div className="space-y-6 text-white">
        <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/25 space-y-2">
          <div className="flex items-center gap-2 text-[hsl(327,100%,55%)] font-bold text-xs font-mono">
            <Wand2 className="w-4 h-4" />
            <span>Target Brief: {campaignTitle}</span>
          </div>
          <p className="text-xs text-slate-300 font-sans">
            Tell the AI your unique angle or leave blank for a structured performance proposal.
          </p>
        </div>

        <Textarea
          label="Your Creative Angle or Hook (Optional)"
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          placeholder="e.g. I want to film a 4K split-screen speed test showing how your tool saves 2 hours per day..."
          rows={3}
        />

        <Button
          variant="primary"
          size="md"
          onClick={handleGenerate}
          isLoading={isGenerating}
          className="w-full rounded-full font-display font-bold"
          leftIcon={<Sparkles className="w-4 h-4" />}
        >
          Generate Pitch Proposal
        </Button>

        {generatedPitch && (
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-200">Generated Proposal Draft</label>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
              {generatedPitch}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedPitch)} className="rounded-full">
                Copy Text
              </Button>
              <Button variant="primary" size="sm" onClick={handleUsePitch} className="flex-1 rounded-full font-display font-bold">
                Insert into Application Form
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
