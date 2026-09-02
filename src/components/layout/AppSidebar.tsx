"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { SubscriptionBadge } from "@/components/subscriptions/SubscriptionBadge";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import {
  LayoutDashboard,
  Users,
  Compass,
  Briefcase,
  FileCheck2,
  MessageSquare,
  BarChart3,
  Wallet,
  Settings,
  PlusCircle,
  ShieldAlert,
  FolderGit2,
  BadgeDollarSign,
  FileText,
  Sparkles,
  Layers,
  HelpCircle,
  Database,
  Scale,
  Lock,
  LucideIcon,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  highlight?: boolean;
  featureGate?: "crmPipeline" | "advancedAnalytics";
}

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuthStore();
  const { subscription, hasFeature, openUpgradeModal } = useSubscriptionStore();

  const isProCreator = hasFeature("advancedAnalytics");
  const isGrowthBrand = hasFeature("crmPipeline");

  const creatorNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/app/campaigns", label: "Discover Campaigns", icon: Compass, badge: "8 live" },
    { href: "/app/applications", label: "My Applications", icon: Briefcase },
    { href: "/app/collaborations", label: "Collaborations", icon: FileCheck2, badge: "3 active" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare, badge: "1" },
    { href: "/app/earnings", label: "Earnings & Payouts", icon: Wallet },
    {
      href: "/app/analytics",
      label: "Audience Analytics",
      icon: BarChart3,
      badge: isProCreator ? undefined : "PRO",
      featureGate: "advancedAnalytics",
    },
    { href: "/app/profile", label: "Creator Media Kit", icon: Sparkles },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle },
    { href: "/app/settings", label: "Plan & Settings", icon: Settings },
  ];

  const brandNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/app/brand/campaigns/create", label: "Create Campaign", icon: PlusCircle, highlight: true },
    { href: "/app/brand/campaigns", label: "Active Campaigns", icon: Briefcase, badge: "3" },
    { href: "/app/brand/creators", label: "Discover Creators", icon: Users },
    {
      href: "/app/brand/crm",
      label: "Creator CRM",
      icon: FolderGit2,
      badge: isGrowthBrand ? undefined : "GROWTH",
      featureGate: "crmPipeline",
    },
    { href: "/app/brand/shortlists", label: "Shortlists", icon: Layers },
    { href: "/app/collaborations", label: "Active Deals & Escrow", icon: FileCheck2, badge: "3" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare },
    { href: "/app/brand/analytics", label: "ROI Telemetry", icon: BarChart3 },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle },
    { href: "/app/settings", label: "Plan & Settings", icon: Settings },
  ];

  const adminNavItems: NavItem[] = [
    { href: "/admin", label: "Operations Overview", icon: LayoutDashboard },
    { href: "/admin/creators", label: "Creator Verification", icon: Users, badge: "Pending" },
    { href: "/admin/brands", label: "Brand Accounts", icon: Briefcase },
    { href: "/admin/campaigns", label: "Campaign Approvals", icon: Compass },
    { href: "/admin/collaborations", label: "Active Escrows", icon: FileCheck2 },
    { href: "/admin/disputes", label: "Dispute Arbitration", icon: Scale, badge: "Review" },
    { href: "/admin/payments", label: "Escrow Vault Control", icon: BadgeDollarSign },
    { href: "/admin/reports", label: "Financial Reports", icon: FileText },
    { href: "/admin/audit", label: "System Audit Logs", icon: Database },
    { href: "/admin/settings", label: "Platform Configuration", icon: ShieldAlert },
  ];

  const navItems =
    role === "creator" ? creatorNavItems : role === "brand" ? brandNavItems : adminNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-black/8 bg-white shrink-0 h-[calc(100vh-4rem)] sticky top-16 text-[#0A0A0E] shadow-2xs select-none">
      {/* Workspace badge header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-black/8 shrink-0">
        <CollablyLogo href="/app/dashboard" size="sm" />
        <SubscriptionBadge planId={subscription?.planId} role={role} size="sm" />
      </div>

      {/* Scrollable Nav List */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isGated = item.featureGate && !hasFeature(item.featureGate) && role !== "agency_admin" && role !== "super_admin";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all select-none",
                isActive
                  ? "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-[0_2px_10px_rgba(255,210,31,0.35)] border border-black/10"
                  : item.highlight
                  ? "bg-[#FFD21F]/15 text-[#0A0A0E] hover:bg-[#FFD21F]/25 border border-[#FFD21F]/30 font-bold"
                  : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-[#F4F4F8]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-[#0A0A0E]"
                      : item.highlight
                      ? "text-[#8A7000]"
                      : "text-[#7A7A8A]"
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1",
                    isGated
                      ? "bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40"
                      : isActive
                      ? "bg-[#0A0A0E] text-white"
                      : "bg-black/5 text-[#5A5A68] border border-black/8"
                  )}
                >
                  {isGated && <Lock className="w-2.5 h-2.5" />}
                  <span>{item.badge}</span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Upgrade CTA — pinned permanently at bottom ── */}
      {role !== "agency_admin" && role !== "super_admin" && (
        <div className="shrink-0 p-3 border-t border-black/8">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFFDF5] via-[#FFF9E6] to-[#FFF3D0] border border-[#FFD21F]/40 space-y-2 shadow-xs text-[#0A0A0E]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E]">
                <Zap className="w-3.5 h-3.5 text-[#0A0A0E] fill-[#FFD21F]" />
                <span>{role === "creator" ? "Creator Pro" : "Brand Growth"}</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold border border-black/10">
                UPGRADE
              </span>
            </div>
            <p className="text-[11px] text-[#6A6A78] leading-tight font-sans">
              {role === "creator"
                ? "Get instant payouts & deep audience retention intel."
                : "Unlock active briefs, Creator CRM & AI scoring."}
            </p>
            <button
              onClick={() => openUpgradeModal()}
              className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
