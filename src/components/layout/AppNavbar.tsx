"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SubscriptionBadge } from "@/components/subscriptions/SubscriptionBadge";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { AbeyCollabLogo } from "@/components/ui/AbeyCollabLogo";

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

  const getScreenTitle = (path: string): string => {
    if (path === "/app/dashboard") return "Dashboard";
    if (path === "/app/campaigns") return "Discover Campaigns";
    if (path === "/app/applications") return "My Applications";
    if (path === "/app/collaborations") return "Active Collaborations";
    if (path === "/app/messages") return "Messages";
    if (path === "/app/earnings") return "Earnings & Payouts";
    if (path === "/app/analytics") return "Audience Analytics";
    if (path === "/app/profile") return "Creator Media Kit";
    if (path === "/app/support") return "Support & Disputes";
    if (path === "/app/settings") return "Plan & Settings";
    if (path === "/app/brand/campaigns/create") return "Create Campaign";
    if (path === "/app/brand/campaigns") return "Active Campaigns";
    if (path === "/app/brand/creators") return "Discover Creators";
    if (path === "/app/brand/crm") return "Creator CRM";
    if (path === "/app/brand/shortlists") return "Shortlists";
    if (path === "/app/brand/analytics") return "ROI Telemetry";
    if (path === "/admin") return "Operations Overview";
    if (path === "/admin/creators") return "Creator Verification";
    if (path === "/admin/brands") return "Brand Accounts";
    if (path === "/admin/campaigns") return "Campaign Approvals";
    if (path === "/admin/collaborations") return "Active Escrows";
    if (path === "/admin/disputes") return "Dispute Arbitration";
    if (path === "/admin/payments") return "Escrow Vault Control";
    if (path === "/admin/reports") return "Financial Reports";
    if (path === "/admin/audit") return "System Audit Logs";
    if (path === "/admin/settings") return "Platform Configuration";
    if (path.startsWith("/campaigns/")) return "Campaign Brief";
    if (path.startsWith("/creators/")) return "Creator Profile";
    if (path.startsWith("/app/brand/")) return "Brand Workspace";
    if (path.startsWith("/app/")) return "Workspace";
    if (path.startsWith("/admin/")) return "Admin Portal";
    return "AbeyCollab";
  };

  const currentTitle = getScreenTitle(pathname);

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
      <header className="sticky top-0 z-30 w-full h-16 border-b border-black/8 dark:border-white/10 bg-white/90 dark:bg-[#0A0A0F]/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 text-[#0A0A0E] dark:text-[#F4F4F8]">
        {/* Left Area: Mobile Drawer Trigger + Mobile Screen Title vs Desktop Search */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 max-w-md">
          {/* Mobile Sidebar Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="lg:hidden p-2 rounded-xl bg-[#F4F4F8] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white hover:bg-[#EAEAEF] dark:hover:bg-[#222232] transition-colors shrink-0"
            aria-label="Open Workspace Menu"
          >
            <Menu className="w-4 h-4 text-current" />
          </button>

          {/* Mobile Header Dynamic Screen Title */}
          <div className="flex lg:hidden items-center gap-2 min-w-0 flex-1">
            <h1 className="text-sm sm:text-base font-black text-[#0A0A0E] dark:text-white tracking-tight font-display truncate">
              {currentTitle}
            </h1>
          </div>

          {/* Desktop Brand Logo & Screen Title */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <AbeyCollabLogo href="/app/dashboard" size="sm" />
            <span className="text-[#888898] text-sm">/</span>
            <h1 className="text-sm font-bold text-[#0A0A0E] dark:text-white tracking-tight font-display">
              {currentTitle}
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
            <button
              type="button"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="w-full text-left bg-[#F4F4F8] dark:bg-[#14141E] border border-black/8 dark:border-white/10 rounded-full pl-9 pr-12 py-2 text-xs text-[#5A5A68] dark:text-[#8E8EA4] hover:border-[#FFD21F] dark:hover:border-[#FFD21F] hover:bg-[#EAEAEF] dark:hover:bg-[#1C1C28] transition-all flex items-center justify-between"
            >
              <span className="truncate">Search campaigns, creators, analytics...</span>
              <kbd className="px-1.5 py-0.5 rounded-full bg-white dark:bg-[#1C1C28] border border-black/10 dark:border-white/10 text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right Area: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Action Button for Brand */}
          {role === "brand" && (
            <Link href="/app/brand/campaigns/create">
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs shadow-[0_2px_10px_rgba(255,210,31,0.3)] transition-all font-sans border border-black/10">
                <Plus className="w-3.5 h-3.5 text-[#0A0A0E]" />
                <span>Create Brief</span>
              </button>
            </Link>
          )}

          {/* Quick Action Button for Creator */}
          {role === "creator" && (
            <Link href="/campaigns">
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs shadow-[0_2px_10px_rgba(255,210,31,0.3)] transition-all font-sans border border-black/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0E]" />
                <span>Explore Briefs</span>
              </button>
            </Link>
          )}

          {/* Theme Mode Switcher */}
          <ThemeToggle />

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFD21F] shadow-[0_0_6px_#FFD21F]" />
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-2xl bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100 text-[#0A0A0E] dark:text-[#F4F4F8]">
                <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#0A0A0E] dark:text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#FFD21F] text-[#0A0A0E]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-bold text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-black/5 dark:divide-white/5 max-h-80 overflow-y-auto mt-2">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#7A7A8A] dark:text-[#8E8EA4]">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "py-2.5 px-2 rounded-xl text-xs transition-colors flex items-start gap-3",
                          notif.read ? "opacity-60" : "bg-[#F8F8FC] dark:bg-[#181826] font-medium"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#FFD21F] shrink-0 mt-1.5" />
                        <div className="flex-1 space-y-0.5">
                          <p className="text-[#0A0A0E] dark:text-white font-bold">{notif.title}</p>
                          <p className="text-[#5A5A68] dark:text-[#8E8EA4] text-[11px] leading-relaxed">
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
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-black/5 dark:hover:border-white/10 transition-colors text-[#0A0A0E] dark:text-[#F4F4F8]"
            >
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || "User"}
                size="sm"
                className="border border-black/10 dark:border-white/10"
              />
              <div className="hidden md:block text-left text-xs pr-1">
                <span className="font-bold text-[#0A0A0E] dark:text-white block leading-tight">{user?.name}</span>
                <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] capitalize font-medium">{role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A7A8A] dark:text-[#8E8EA4] hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#12121A] border border-black/10 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-[#0A0A0E] dark:text-[#F4F4F8]">
                <div className="px-3 py-2 border-b border-black/8 dark:border-white/10 mb-1">
                  <p className="text-xs font-bold text-[#0A0A0E] dark:text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] truncate">{user?.email}</p>
                  <div className="mt-2 flex items-center justify-between gap-1">
                    <SubscriptionBadge planId={useSubscriptionStore.getState().subscription?.planId} role={role} size="sm" />
                  </div>
                </div>

                <div className="space-y-0.5 text-xs font-medium text-[#5A5A68] dark:text-[#B8B8CC]">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      useSubscriptionStore.getState().openUpgradeModal();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#FFD21F]/20 hover:bg-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] font-bold transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
                      <span>Upgrade Plan</span>
                    </div>
                    <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E]">
                      PRO
                    </span>
                  </button>

                  <Link
                    href={role === "creator" ? "/app/profile" : "/app/settings"}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />
                    <span>Profile &amp; Media Kit</span>
                  </Link>

                  <Link
                    href="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#7A7A8A] dark:text-[#8E8EA4]" />
                    <span>Plan &amp; Account Settings</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 hover:text-[#0A0A0E] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#7A7A8A]" />
                    <span>Public Website</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-black/8">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
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
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0E0E16] border-r border-black/10 dark:border-white/10 shadow-2xl p-5 flex flex-col justify-between lg:hidden text-[#0A0A0E] dark:text-[#F4F4F8] overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/8 dark:border-white/10">
                  <AbeyCollabLogo href="/app/dashboard" size="sm" />
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-1.5 rounded-xl bg-[#F4F4F8] dark:bg-[#181824] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
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
                            ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-xs border border-black/10"
                            : "text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-[#F4F4F8] dark:hover:bg-white/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("w-4 h-4", isActive ? "text-[#0A0A0E]" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold",
                            isActive ? "bg-[#0A0A0E] text-white" : "bg-black/5 dark:bg-white/10 text-[#5A5A68] dark:text-[#8E8EA4] border border-black/8 dark:border-white/10"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-black/8 dark:border-white/10">
                <button
                  onClick={() => {
                    setShowMobileSidebar(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
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
