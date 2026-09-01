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
    <aside className="hidden lg:flex flex-col w-64 border-r border-[#FFD21F]/15 bg-gradient-to-b from-[#0C0C14] via-[#08080C] to-[#050508] p-4 shrink-0 min-h-[calc(100vh-4rem)] text-white shadow-2xl">
      {/* Brand logo & workspace badge */}
      <div className="px-3 py-2 mb-4 flex items-center justify-between">
        <Link href="/app/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-white/40 flex items-center justify-center text-[#0A0A0E] group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,210,31,0.45)]">
            <Sparkles className="w-4 h-4 fill-[#0A0A0E] text-[#0A0A0E]" />
          </div>
          <span className="font-display font-extrabold text-base tracking-tight text-white">
            Collably
          </span>
        </Link>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] uppercase font-extrabold">
          {role === "agency_admin" ? "Admin" : role}
        </span>
      </div>

      {/* Nav List */}
      <nav className="space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all select-none",
                isActive
                  ? "bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] font-extrabold shadow-[0_0_20px_rgba(255,210,31,0.45)] border border-white/50"
                  : item.highlight
                  ? "bg-white/[0.08] text-white hover:bg-white/[0.12] border border-[#FFD21F]/20 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-[#0A0A0E]"
                      : item.highlight
                      ? "text-[#FFD21F]"
                      : "text-white/50 group-hover:text-white"
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                    isActive
                      ? "bg-[#0A0A0E] text-[#FFD21F]"
                      : "bg-[#FFD21F]/15 text-[#FFD21F] border border-[#FFD21F]/30"
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
