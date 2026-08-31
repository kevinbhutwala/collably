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
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Area: Platform Breadcrumb & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-extrabold text-white text-xs shadow-xs">
            CB
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
            className="w-full text-left bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-500 hover:border-slate-300 hover:bg-white transition-all shadow-xs flex items-center justify-between"
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

      {/* Right Area: Actions, Notifications & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Action Button for Brand */}
        {role === "brand" && (
          <Link href="/app/brand/campaigns/create">
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Brief</span>
            </button>
          </Link>
        )}

        {/* Quick Action Button for Creator */}
        {role === "creator" && (
          <Link href="/campaigns">
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Briefs</span>
            </button>
          </Link>
        )}

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "py-2.5 px-2 rounded-xl text-xs transition-colors flex items-start gap-3",
                        notif.read ? "opacity-60" : "bg-slate-50 font-medium"
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                      <div className="flex-1 space-y-0.5">
                        <p className="text-slate-900 font-bold">{notif.title}</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
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
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Avatar
              src={user?.avatarUrl}
              name={user?.name || "User"}
              size="sm"
              className="border border-slate-200"
            />
            <div className="hidden md:block text-left text-xs pr-1">
              <span className="font-bold text-slate-900 block leading-tight">{user?.name}</span>
              <span className="text-[10px] text-slate-400 capitalize">{role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <Badge variant="outline" className="mt-1.5 text-[9px] uppercase tracking-wider">
                  {role}
                </Badge>
              </div>

              <div className="space-y-0.5 text-xs font-medium text-slate-700">
                <Link
                  href={role === "creator" ? "/app/profile" : "/app/settings"}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile & Media Kit</span>
                </Link>

                <Link
                  href="/app/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Security & Account</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public Landing Page</span>
                </Link>
              </div>

              <div className="pt-1 mt-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
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
  );
}
