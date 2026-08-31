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
import { NexusLogo } from "@/components/ui/NexusLogo";
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
    { href: "/app/brand/shortlists", label: "Shortlists & Compare", icon: Layers },
    { href: "/app/brand/crm", label: "Creator CRM & Notes", icon: Users },
    { href: "/app/applications", label: "Applications", icon: FolderGit2, badge: "4" },
    { href: "/app/collaborations", label: "Deliverables Review", icon: FileCheck2, badge: "2 pending" },
    { href: "/app/messages", label: "Creator Chat", icon: MessageSquare },
    { href: "/app/brand/analytics", label: "Campaign ROI", icon: BarChart3 },
    { href: "/app/earnings", label: "Escrow & Invoices", icon: Wallet },
    { href: "/app/support", label: "Support & Mediation", icon: HelpCircle },
    { href: "/app/settings", label: "Brand Settings", icon: Settings },
  ];

  const adminNavItems: NavItem[] = [
    { href: "/admin", label: "Agency Dashboard", icon: LayoutDashboard },
    { href: "/admin/creators", label: "Creator Roster", icon: Users },
    { href: "/admin/brands", label: "Brand Clients", icon: Briefcase },
    { href: "/admin/campaigns", label: "Campaign Approval Queue", icon: FolderGit2, badge: "2" },
    { href: "/admin/collaborations", label: "Milestone Timelines", icon: FileCheck2 },
    { href: "/admin/disputes", label: "Dispute Arbitration", icon: Scale, badge: "1" },
    { href: "/admin/payments", label: "Escrow Vault Control", icon: BadgeDollarSign },
    { href: "/admin/reports", label: "Financial Reports", icon: FileText },
    { href: "/admin/audit", label: "System Audit Logs", icon: Database },
    { href: "/admin/settings", label: "Platform Configuration", icon: ShieldAlert },
  ];

  const navItems =
    role === "creator" ? creatorNavItems : role === "brand" ? brandNavItems : adminNavItems;

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-slate-50/50 backdrop-blur-xl p-4 shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Brand logo & workspace badge */}
      <div className="px-3 py-2 mb-6">
        <NexusLogo
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
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group select-none",
                isActive
                  ? "bg-white text-slate-900 font-bold shadow-sm border border-slate-200"
                  : item.highlight
                  ? "bg-orange-50 text-brand-accent border border-orange-200 hover:bg-orange-100/70 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-brand-accent"
                      : item.highlight
                      ? "text-brand-accent"
                      : "text-slate-400 group-hover:text-slate-700"
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                    isActive
                      ? "bg-brand-accent/10 text-brand-accent border border-brand-accent/20"
                      : "bg-slate-200/80 text-slate-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Cross-Platform Info Card */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm mt-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-800">Clean Core API Ready</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Decoupled service layer ready to bind with React Native mobile apps.
        </p>
      </div>
    </aside>
  );
}
