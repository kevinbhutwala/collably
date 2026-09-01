"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar } from "@/components/ui/Avatar";
import {
  Bell,
  Search,
  Plus,
  ChevronDown,
  Sparkles,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Compass,
  Briefcase,
  FileCheck2,
  MessageSquare,
  BarChart3,
  Wallet,
  Settings,
  HelpCircle,
  FolderGit2,
  Layers,
  Scale,
  BadgeDollarSign,
  FileText,
  Database,
  ShieldAlert,
} from "lucide-react";
import { NotificationItem } from "@/core/types";
import { notificationService } from "@/services/notification.service";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AppNavbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuthStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (user?.id) {
      notificationService.getNotifications(user.id).then((data) => {
        setNotifications(data || []);
      });
    }
  }, [user?.id]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    if (user?.id) {
      notificationService.markAllAsRead(user.id);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const creatorNavItems = [
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

  const brandNavItems = [
    { href: "/app/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/app/brand/campaigns/create", label: "Create Campaign", icon: Plus, highlight: true },
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

  const adminNavItems = [
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

  const navItems = role === "creator" ? creatorNavItems : role === "brand" ? brandNavItems : adminNavItems;

  return (
    <>
      <header className="sticky top-0 z-30 w-full h-16 border-b border-white/10 bg-[#07070B]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4 text-white">
        {/* Left Area: Mobile Drawer Trigger & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Mobile Sidebar Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] transition-colors"
            aria-label="Open Workspace Menu"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>

          <Link href="/app/dashboard" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(42,92,255,0.4)]">
              <Sparkles className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
            </div>
            <span className="font-bold text-white text-sm font-display hidden xs:inline">Collably</span>
          </Link>

          <div className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <button
              type="button"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="w-full text-left bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-12 py-2 text-xs text-white/50 hover:border-white/20 hover:bg-white/[0.07] transition-all flex items-center justify-between"
            >
              <span className="truncate">Search campaigns, creators, analytics...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-white/60">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right Area: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Action Button for Brand */}
          {role === "brand" && (
            <Link href="/app/brand/campaigns/create">
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs shadow-[0_0_15px_rgba(42,92,255,0.4)] transition-all font-sans">
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Create Brief</span>
              </button>
            </Link>
          )}

          {/* Quick Action Button for Creator */}
          {role === "creator" && (
            <Link href="/campaigns">
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs shadow-[0_0_15px_rgba(42,92,255,0.4)] transition-all font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Explore Briefs</span>
              </button>
            </Link>
          )}

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2A5CFF] shadow-[0_0_6px_#2A5CFF]" />
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0E0C15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#2A5CFF] text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-bold text-white/60 hover:text-white"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-white/10 max-h-80 overflow-y-auto mt-2">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-white/40">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "py-2.5 px-2 rounded-xl text-xs transition-colors flex items-start gap-3",
                          notif.read ? "opacity-60" : "bg-white/[0.04] font-medium"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#2A5CFF] shrink-0 mt-1.5" />
                        <div className="flex-1 space-y-0.5">
                          <p className="text-white font-bold">{notif.title}</p>
                          <p className="text-white/60 text-[11px] leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors"
            >
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || "User"}
                size="sm"
                className="border border-white/20"
              />
              <div className="hidden md:block text-left text-xs pr-1">
                <span className="font-bold text-white block leading-tight">{user?.name}</span>
                <span className="text-[10px] text-white/50 capitalize">{role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/50 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0E0C15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-white/50 truncate">{user?.email}</p>
                  <Badge variant="outline" className="mt-1.5 text-[9px] uppercase tracking-wider bg-white/5 text-white/80 border-white/10">
                    {role}
                  </Badge>
                </div>

                <div className="space-y-0.5 text-xs font-medium text-white/70">
                  <Link
                    href={role === "creator" ? "/app/profile" : "/app/settings"}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Profile &amp; Media Kit</span>
                  </Link>

                  <Link
                    href="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-white/50" />
                    <span>Security &amp; Account</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.08] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    <span>Public Website</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/15 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sliding Sidebar Drawer */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0E0C15] border-r border-white/15 shadow-2xl p-5 flex flex-col justify-between lg:hidden text-white overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(42,92,255,0.4)]">
                      <Sparkles className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                    </div>
                    <span className="font-bold text-white text-sm font-display">Collably</span>
                  </div>
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-1.5 rounded-xl bg-white/[0.05] text-white/60 hover:text-white border border-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setShowMobileSidebar(false)}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all select-none",
                          isActive
                            ? "bg-[#2A5CFF] text-white font-bold shadow-[0_0_15px_rgba(42,92,255,0.4)]"
                            : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-white/50")} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                            isActive ? "bg-white text-[#07070B]" : "bg-white/10 text-white/70 border border-white/10"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowMobileSidebar(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/15 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
