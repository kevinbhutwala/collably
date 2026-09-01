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
import { CollablyLogo } from "@/components/ui/CollablyLogo";
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
      <header className="sticky top-0 z-30 w-full h-16 border-b border-[#E2E6E1] bg-[#FCFCFA]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 text-[#101310]">
        {/* Left Area: Mobile Drawer Trigger & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Mobile Sidebar Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="lg:hidden p-2 rounded-lg bg-[#F1F2EE] border border-[#E2E6E1] text-[#101310] hover:bg-[#E2E6E1] transition-colors"
            aria-label="Open Workspace Menu"
          >
            <Menu className="w-4 h-4 text-[#087F5B]" />
          </button>

          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#087F5B] flex items-center justify-center font-bold text-white text-xs shadow-xs">
              CB
            </div>
            <span className="font-bold text-[#101310] text-sm font-display hidden xs:inline">Collably</span>
          </Link>

          <div className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A908B]" />
            <button
              type="button"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="w-full text-left bg-[#FFFFFF] border border-[#E2E6E1] rounded-lg pl-9 pr-12 py-2 text-xs text-[#626862] hover:border-[#087F5B] hover:bg-[#FCFCFA] transition-all shadow-xs flex items-center justify-between"
            >
              <span className="truncate">Search campaigns, creators, analytics...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#F1F2EE] border border-[#E2E6E1] text-[10px] font-mono text-[#626862]">
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
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold text-xs shadow-xs transition-all font-sans">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Brief</span>
              </button>
            </Link>
          )}

          {/* Quick Action Button for Creator */}
          {role === "creator" && (
            <Link href="/campaigns">
              <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold text-xs shadow-xs transition-all font-sans">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Briefs</span>
              </button>
            </Link>
          )}

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg text-[#626862] hover:text-[#101310] hover:bg-[#F1F2EE] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#087F5B]" />
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E6E1]">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#101310]">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#EAF8F2] text-[#087F5B] border border-[#C3EBDA]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-bold text-[#626862] hover:text-[#087F5B]"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-[#E2E6E1] max-h-80 overflow-y-auto mt-2">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#8A908B]">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "py-2.5 px-2 rounded-lg text-xs transition-colors flex items-start gap-3",
                          notif.read ? "opacity-60" : "bg-[#F6F7F3] font-medium"
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#087F5B] shrink-0 mt-1.5" />
                        <div className="flex-1 space-y-0.5">
                          <p className="text-[#101310] font-bold">{notif.title}</p>
                          <p className="text-[#626862] text-[11px] leading-relaxed">
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
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F1F2EE] transition-colors"
            >
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || "User"}
                size="sm"
                className="border border-[#E2E6E1]"
              />
              <div className="hidden md:block text-left text-xs pr-1">
                <span className="font-bold text-[#101310] block leading-tight">{user?.name}</span>
                <span className="text-[10px] text-[#626862] capitalize">{role}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A908B] hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-[#E2E6E1] mb-1">
                  <p className="text-xs font-bold text-[#101310] truncate">{user?.name}</p>
                  <p className="text-[11px] text-[#626862] truncate">{user?.email}</p>
                  <Badge variant="outline" className="mt-1.5 text-[9px] uppercase tracking-wider border-[#C3EBDA] text-[#087F5B] bg-[#EAF8F2]">
                    {role}
                  </Badge>
                </div>

                <div className="space-y-0.5 text-xs font-medium text-[#626862]">
                  <Link
                    href={role === "creator" ? "/app/profile" : "/app/settings"}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F1F2EE] hover:text-[#101310] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#087F5B]" />
                    <span>Profile &amp; Media Kit</span>
                  </Link>

                  <Link
                    href="/app/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F1F2EE] hover:text-[#101310] transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#626862]" />
                    <span>Security &amp; Account</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F1F2EE] hover:text-[#101310] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#626862]" />
                    <span>Public Website</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-[#E2E6E1]">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-[#C53030] hover:bg-[#FDF2F2] transition-colors text-left"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed inset-0 z-50 bg-[#101310]/40 backdrop-blur-sm lg:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[#FCFCFA] border-r border-[#E2E6E1] shadow-2xl p-5 flex flex-col justify-between lg:hidden text-[#101310] overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E6E1]">
                  <CollablyLogo href="/app/dashboard" size="sm" subtext={`${role.toUpperCase()} Workspace`} />
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-1.5 rounded-lg bg-[#F1F2EE] text-[#626862] hover:text-[#101310]"
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
                            ? "bg-[#EAF8F2] text-[#087F5B] font-bold border border-[#C3EBDA]"
                            : "text-[#626862] hover:text-[#101310] hover:bg-[#F1F2EE]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("w-4 h-4", isActive ? "text-[#087F5B]" : "text-[#8A908B]")} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#EAF8F2] text-[#087F5B]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#E2E6E1]">
                <button
                  onClick={() => {
                    setShowMobileSidebar(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#C53030] hover:bg-[#FDF2F2] transition-colors"
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
