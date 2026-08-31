"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Layers,
} from "lucide-react";
import { NotificationItem } from "@/core/types";
import { notificationService } from "@/services/notification.service";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function AppNavbar() {
  const { user, role, logout } = useAuthStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200 bg-white/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Area: Platform Breadcrumb & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-accent to-orange-400 flex items-center justify-center font-extrabold text-white text-xs shadow-sm">
            NX
          </div>
        </Link>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <button
            type="button"
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
              window.dispatchEvent(event);
            }}
            className="w-full text-left bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-500 hover:border-slate-300 hover:bg-white transition-all shadow-sm flex items-center justify-between"
          >
            <span className="truncate">
              {role === "creator"
                ? "Search campaigns, briefs, brands..."
                : role === "brand"
                ? "Search creators, niches, analytics..."
                : "Search creators, campaigns, payouts..."}
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Center/Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Action Button based on Role */}
        {role === "brand" && (
          <Link
            href="/app/brand/campaigns/create"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-accent text-white px-3.5 py-2 rounded-xl hover:opacity-95 shadow-md shadow-brand-accent/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </Link>
        )}

        {role === "creator" && (
          <Link
            href="/app/campaigns"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Explore Gigs</span>
          </Link>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <Badge variant="glow" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-slate-500 hover:text-slate-800 transition-colors font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "py-3 px-2 rounded-xl transition-colors",
                        !n.read ? "bg-slate-50" : "hover:bg-slate-50/60"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-900">{n.title}</h5>
                        <span className="text-[10px] text-slate-400 font-mono">Recent</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                      {n.linkUrl && (
                        <Link
                          href={n.linkUrl}
                          onClick={() => setShowNotifs(false)}
                          className="inline-flex items-center gap-1 text-[11px] text-brand-accent hover:underline mt-2 font-medium"
                        >
                          View Details <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Avatar
              name={user?.name || "User"}
              src={user?.avatarUrl}
              size="sm"
              verified={user?.verified}
            />
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                {user?.name || "My Account"}
              </p>
              <p className="text-[10px] text-slate-500 capitalize">
                {role === "agency_admin" ? "Admin" : role}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>

              <div className="py-1 space-y-0.5">
                <Link
                  href="/app/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-medium"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>View Public Profile</span>
                </Link>

                <Link
                  href="/app/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-medium"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Account & Payout Settings</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
