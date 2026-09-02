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
  section?: string; // for grouping
}

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuthStore();
  const { subscription, hasFeature, openUpgradeModal } = useSubscriptionStore();

  const isProCreator = hasFeature("advancedAnalytics");
  const isGrowthBrand = hasFeature("crmPipeline");

  const creatorNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Overview" },
    { href: "/app/campaigns", label: "Discover Campaigns", icon: Compass, badge: "8 live", section: "Work" },
    { href: "/app/applications", label: "My Applications", icon: Briefcase, section: "Work" },
    { href: "/app/collaborations", label: "Collaborations", icon: FileCheck2, badge: "3", section: "Work" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare, badge: "1", section: "Work" },
    { href: "/app/earnings", label: "Earnings & Payouts", icon: Wallet, section: "Finance" },
    {
      href: "/app/analytics",
      label: "Audience Analytics",
      icon: BarChart3,
      badge: isProCreator ? undefined : "PRO",
      featureGate: "advancedAnalytics",
      section: "Finance",
    },
    { href: "/app/profile", label: "Creator Media Kit", icon: Sparkles, section: "Account" },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle, section: "Account" },
    { href: "/app/settings", label: "Plan & Settings", icon: Settings, section: "Account" },
  ];

  const brandNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Overview" },
    { href: "/app/brand/campaigns/create", label: "Create Campaign", icon: PlusCircle, highlight: true, section: "Campaigns" },
    { href: "/app/brand/campaigns", label: "Active Campaigns", icon: Briefcase, badge: "3", section: "Campaigns" },
    { href: "/app/brand/creators", label: "Discover Creators", icon: Users, section: "Creators" },
    {
      href: "/app/brand/crm",
      label: "Creator CRM",
      icon: FolderGit2,
      badge: isGrowthBrand ? undefined : "GROWTH",
      featureGate: "crmPipeline",
      section: "Creators",
    },
    { href: "/app/brand/shortlists", label: "Shortlists", icon: Layers, section: "Creators" },
    { href: "/app/collaborations", label: "Active Deals & Escrow", icon: FileCheck2, badge: "3", section: "Finance" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare, section: "Finance" },
    { href: "/app/brand/analytics", label: "ROI Analytics", icon: BarChart3, section: "Finance" },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle, section: "Account" },
    { href: "/app/settings", label: "Plan & Settings", icon: Settings, section: "Account" },
  ];

  const adminNavItems: NavItem[] = [
    { href: "/admin", label: "Operations Overview", icon: LayoutDashboard, section: "Admin" },
    { href: "/admin/creators", label: "Creator Verification", icon: Users, badge: "Pending", section: "Admin" },
    { href: "/admin/brands", label: "Brand Accounts", icon: Briefcase, section: "Admin" },
    { href: "/admin/campaigns", label: "Campaign Approvals", icon: Compass, section: "Admin" },
    { href: "/admin/collaborations", label: "Active Escrows", icon: FileCheck2, section: "Finance" },
    { href: "/admin/disputes", label: "Dispute Arbitration", icon: Scale, badge: "Review", section: "Finance" },
    { href: "/admin/payments", label: "Escrow Vault Control", icon: BadgeDollarSign, section: "Finance" },
    { href: "/admin/reports", label: "Financial Reports", icon: FileText, section: "Finance" },
    { href: "/admin/audit", label: "System Audit Logs", icon: Database, section: "System" },
    { href: "/admin/settings", label: "Platform Config", icon: ShieldAlert, section: "System" },
  ];

  const navItems =
    role === "creator" ? creatorNavItems : role === "brand" ? brandNavItems : adminNavItems;

  // Group nav items by section
  const sections = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const key = item.section || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    const isGated =
      item.featureGate &&
      !hasFeature(item.featureGate) &&
      role !== "agency_admin" &&
      role !== "super_admin";

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all select-none",
          isActive
            ? "bg-[#0A0A0E] text-white font-bold"
            : item.highlight
            ? "bg-[#FFD21F]/15 text-[#0A0A0E] hover:bg-[#FFD21F]/30 border border-[#FFD21F]/40 font-semibold"
            : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-[#F4F4F8]"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={cn(
              "w-[15px] h-[15px] shrink-0 transition-colors",
              isActive
                ? "text-white"
                : item.highlight
                ? "text-[#8A7000]"
                : "text-[#7A7A8A] group-hover:text-[#0A0A0E]"
            )}
          />
          <span className="truncate leading-none">{item.label}</span>
        </div>

        {item.badge && (
          <span
            className={cn(
              "shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ml-1",
              isGated
                ? "bg-amber-100 text-amber-800 border border-amber-200"
                : isActive
                ? "bg-white/20 text-white"
                : "bg-[#F0F0F5] text-[#5A5A68]"
            )}
          >
            {isGated && <Lock className="w-2 h-2" />}
            <span>{item.badge}</span>
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-black/8 bg-[#FAFAFC] shrink-0 min-h-[calc(100vh-4rem)] text-[#0A0A0E] select-none">
      {/* ── Logo & Plan Badge Header ── */}
      <div className="px-4 py-4 border-b border-black/8 flex items-center justify-between gap-2 bg-white">
        <CollablyLogo href="/app/dashboard" size="sm" subtext="" />
        <SubscriptionBadge planId={subscription?.planId} role={role} size="sm" />
      </div>

      {/* ── Scrollable Navigation Body ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 space-y-4">
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName}>
            {/* Section Label */}
            <p className="px-3 mb-1 text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#ABABBA]">
              {sectionName}
            </p>
            {/* Section Items */}
            <div className="space-y-0.5">
              {items.map(renderNavItem)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Sidebar Bottom Upgrade CTA Card ── */}
      {role !== "agency_admin" && role !== "super_admin" && (
        <div className="px-3 pb-4 pt-2">
          <div className="p-3.5 rounded-2xl bg-white border border-[#FFD21F]/40 shadow-[0_2px_12px_rgba(255,210,31,0.1)] space-y-2.5 text-[#0A0A0E]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E]">
                <div className="w-5 h-5 rounded-lg bg-[#FFD21F]/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-[#0A0A0E] fill-[#FFD21F]" />
                </div>
                <span>{role === "creator" ? "Creator Pro" : "Brand Growth"}</span>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] border border-black/10">
                NEW
              </span>
            </div>
            <p className="text-[11px] text-[#6A6A78] leading-relaxed font-sans">
              {role === "creator"
                ? "Instant payouts & deep audience retention intel."
                : "Unlock briefs, Creator CRM & AI scoring."}
            </p>
            <button
              onClick={() => openUpgradeModal()}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:brightness-105 text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3 h-3 fill-[#0A0A0E]" />
              Upgrade Plan
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
