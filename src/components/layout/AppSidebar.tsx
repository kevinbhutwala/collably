"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
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
  LucideIcon,
} from "lucide-react";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  highlight?: boolean;
}

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const creatorNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/app/campaigns", label: "Discover Campaigns", icon: Compass, badge: "8 live" },
    { href: "/app/applications", label: "My Applications", icon: Briefcase },
    { href: "/app/collaborations", label: "Collaborations", icon: FileCheck2, badge: "3 active" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare, badge: "1" },
    { href: "/app/earnings", label: "Earnings & Payouts", icon: Wallet },
    { href: "/app/analytics", label: "Audience Analytics", icon: BarChart3 },
    { href: "/app/profile", label: "Creator Media Kit", icon: Sparkles },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle },
    { href: "/app/settings", label: "Settings", icon: Settings },
  ];

  const brandNavItems: NavItem[] = [
    { href: "/app/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/app/brand/campaigns/create", label: "Create Campaign", icon: PlusCircle, highlight: true },
    { href: "/app/brand/campaigns", label: "Active Campaigns", icon: Briefcase, badge: "3" },
    { href: "/app/brand/creators", label: "Discover Creators", icon: Users },
    { href: "/app/brand/crm", label: "Creator CRM", icon: FolderGit2 },
    { href: "/app/brand/shortlists", label: "Shortlists", icon: Layers },
    { href: "/app/collaborations", label: "Active Deals & Escrow", icon: FileCheck2, badge: "3" },
    { href: "/app/messages", label: "Messages", icon: MessageSquare },
    { href: "/app/brand/analytics", label: "ROI Telemetry", icon: BarChart3 },
    { href: "/app/support", label: "Support & Disputes", icon: HelpCircle },
    { href: "/app/settings", label: "Settings", icon: Settings },
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
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-[#0d090e]/95 backdrop-blur-2xl p-4 shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Brand logo & workspace badge */}
      <div className="px-3 py-2 mb-6">
        <CollablyLogo
          href="/app/dashboard"
          size="sm"
          subtext={role === "agency_admin" ? "Agency Operations" : `${role.toUpperCase()} Workspace`}
        />
      </div>

      {/* Nav List */}
      <nav className="space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group select-none",
                isActive
                  ? "bg-gradient-to-r from-[hsl(327,100%,50%)]/20 to-[hsl(300,100%,42%)]/20 text-white font-bold border border-[hsl(327,100%,50%)]/40 shadow-sm"
                  : item.highlight
                  ? "bg-[hsl(327,100%,50%)]/15 text-pink-300 border border-[hsl(327,100%,50%)]/30 hover:bg-[hsl(327,100%,50%)]/25 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-[hsl(327,100%,55%)]"
                      : item.highlight
                      ? "text-pink-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                    isActive
                      ? "bg-[hsl(327,100%,50%)]/25 text-pink-200 border border-[hsl(327,100%,50%)]/40"
                      : "bg-white/10 text-slate-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
