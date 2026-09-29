"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Compass,
  MessageSquare,
  Wallet,
  Sparkles,
  Users,
  Briefcase,
  BarChart3,
  PlusCircle,
  ShieldAlert,
} from "lucide-react";

export function MobileBottomDock() {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const creatorItems = [
    { href: "/app/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/app/campaigns", label: "Discover", icon: Compass },
    { href: "/app/messages", label: "Messages", icon: MessageSquare },
    { href: "/app/earnings", label: "Earnings", icon: Wallet },
    { href: "/app/profile", label: "Media Kit", icon: Sparkles },
  ];

  const brandItems = [
    { href: "/app/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/app/brand/campaigns/create", label: "Create", icon: PlusCircle },
    { href: "/app/messages", label: "Messages", icon: MessageSquare },
    { href: "/app/brand/creators", label: "Creators", icon: Users },
    { href: "/app/brand/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const adminItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/creators", label: "Creators", icon: Users },
    { href: "/admin/campaigns", label: "Campaigns", icon: Briefcase },
    { href: "/admin/disputes", label: "Disputes", icon: ShieldAlert },
    { href: "/admin/payments", label: "Payments", icon: Wallet },
  ];

  const items =
    role === "creator"
      ? creatorItems
      : role === "brand"
      ? brandItems
      : adminItems;

  return (
    /* Only visible below lg breakpoint */
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 pb-safe">
      {/* Fade-up ambient gradient above the dock */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-[#F8F8FB] dark:from-[#07070B] to-transparent pointer-events-none" />

      <nav
        className={cn(
          "relative flex items-stretch justify-around",
          "bg-white/95 dark:bg-[#0E0E14]/95 backdrop-blur-2xl",
          "border-t border-black/8 dark:border-white/10",
          "shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.5)]",
          "px-1 pt-2 pb-2"
        )}
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/app/dashboard" || item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-2xl transition-colors active:scale-95 touch-manipulation select-none"
              aria-label={item.label}
            >
              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="mobile-dock-active"
                  className="absolute inset-0 rounded-2xl bg-primary/20 border border-primary/40 shadow-xs"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}

              {/* Icon container */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors duration-200",
                      isActive ? "text-[#0B0A14] dark:text-accent" : "text-[#7A7A8A] dark:text-[#8E8EA4]"
                    )}
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />
                </motion.div>

                {/* Gold indicator dot under active icon */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_1px_rgba(var(--theme-primary-rgb),0.9)]" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-bold leading-none tracking-tight font-sans transition-colors duration-200",
                  isActive ? "text-[#0B0A14] dark:text-accent" : "text-[#7A7A8A] dark:text-[#8E8EA4]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
