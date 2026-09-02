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
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-[#F8F8FB] to-transparent pointer-events-none" />

      <nav
        className={cn(
          "relative flex items-stretch justify-around",
          "bg-white/95 backdrop-blur-2xl",
          "border-t border-black/8",
          "shadow-[0_-4px_25px_rgba(0,0,0,0.06)]",
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
              className="relative flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-2xl transition-colors"
              aria-label={item.label}
            >
              {/* Active indicator pill */}
              {isActive && (
                <motion.div
                  layoutId="mobile-dock-active"
                  className="absolute inset-0 rounded-2xl bg-[#FFD21F]/20 border border-[#FFD21F]/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon container */}
              <div className="relative flex items-center justify-center w-6 h-6">
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors duration-200",
                      isActive ? "text-[#0A0A0E]" : "text-[#7A7A8A]"
                    )}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </motion.div>

                {/* Gold indicator dot under active icon */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFD21F] shadow-[0_0_6px_1px_rgba(255,210,31,0.8)]" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-bold leading-none tracking-tight font-sans transition-colors duration-200",
                  isActive ? "text-[#0A0A0E]" : "text-[#7A7A8A]"
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
