"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, ExternalLink, HelpCircle } from "lucide-react";

interface SocialFallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: "google" | "apple" | "github";
  role: "creator" | "brand";
  mode: "login" | "register";
  redirectUrl?: string;
}

export function SocialFallbackModal({
  isOpen,
  onClose,
  provider,
  role,
  mode,
  redirectUrl,
}: SocialFallbackModalProps) {
  const router = useRouter();
  const { socialLogin } = useAuthStore();
  const { addToast } = useUIStore();

  const providerName = provider === "google" ? "Google" : provider === "apple" ? "Apple" : "GitHub";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await socialLogin({
        provider,
        email: email.trim().toLowerCase(),
        name: name.trim() || email.split("@")[0],
        avatarUrl:
          provider === "google"
            ? `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`
            : `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80`,
        role,
      });

      addToast({
        type: "success",
        title: `${providerName} Authentication Verified`,
        message: `Signed in as ${res.user?.email || email}!`,
      });

      onClose();
      const dest =
        redirectUrl ||
        (res.user?.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard");
      router.push(dest);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Authentication Failed",
        message: err.message || "Failed to complete authentication.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAccount = (quickEmail: string, quickName: string) => {
    setEmail(quickEmail);
    setName(quickName);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Continue with ${providerName}`}
      description={`Authenticate your ${providerName} account to access your AbeyCollab workspace.`}
      maxWidth="md"
    >
      <div className="space-y-4 pt-1 text-[#0A0A0E] select-none font-sans">
        {/* Quick select verified account pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#6A6A78] uppercase font-mono tracking-wider">
            Quick Select Account
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                handleQuickAccount(
                  role === "brand" ? "alex.brand@gmail.com" : "elena.creator@gmail.com",
                  role === "brand" ? "Alex Rivera" : "Elena Rostova"
                )
              }
              className="p-2.5 rounded-2xl bg-[#F8F8FC] hover:bg-[#FFFDF5] border border-black/8 hover:border-[#FFD21F] text-left transition-all flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-[#0A0A0E]">
                  {role === "brand" ? "Alex Rivera" : "Elena Rostova"}
                </p>
                <p className="text-[11px] text-[#7A7A8A]">
                  {role === "brand" ? "alex.brand@gmail.com" : "elena.creator@gmail.com"}
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E]">
                {role.toUpperCase()}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAccount(
                  `user.${Date.now().toString().slice(-4)}@${provider === "google" ? "gmail.com" : "icloud.com"}`,
                  "New Partner"
                )
              }
              className="p-2.5 rounded-2xl bg-[#F8F8FC] hover:bg-[#FFFDF5] border border-black/8 hover:border-[#FFD21F] text-left transition-all flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-[#0A0A0E]">Generate Fresh Account</p>
                <p className="text-[11px] text-[#7A7A8A]">New {providerName} user</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                NEW
              </span>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-black/8" />
          <span className="flex-shrink mx-3 text-[10px] font-mono text-[#8A8A98] uppercase">
            or enter your {providerName} email
          </span>
          <div className="flex-grow border-t border-black/8" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label={`${providerName} Email Address`}
            type="email"
            required
            placeholder={provider === "google" ? "your.name@gmail.com" : "your.name@icloud.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Display Name"
            placeholder="Elena Rostova"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0E]" />
                <span>Verifying {providerName} Session...</span>
              </>
            ) : (
              <>
                <span>Authorize with {providerName}</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
              </>
            )}
          </button>
        </form>

        {/* Supabase OAuth Configuration Helper */}
        <div className="pt-2 border-t border-black/8">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="text-[11px] text-[#7A7A8A] hover:text-[#0A0A0E] flex items-center gap-1.5 transition-colors font-mono"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to enable live native {providerName} OAuth popup in Supabase?</span>
          </button>

          {showHelp && (
            <div className="mt-2.5 p-3 rounded-2xl bg-[#F8F8FC] border border-black/8 text-[11px] text-[#5A5A68] space-y-1.5 font-sans leading-relaxed">
              <p className="font-bold text-[#0A0A0E]">To enable native Google/Apple Cloud OAuth:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>
                  Open your{" "}
                  <a
                    href="https://supabase.com/dashboard/project/ldahukqddddeyaavhvss/auth/providers"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0A0A0E] underline font-bold inline-flex items-center gap-0.5"
                  >
                    Supabase Auth Providers Dashboard <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
                <li>Click <strong>{providerName}</strong> and toggle <strong>Enable {providerName} provider</strong>.</li>
                <li>Paste your Google/Apple OAuth Client ID &amp; Client Secret.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
