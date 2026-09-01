"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import {
  LayoutDashboard,
  Compass,
  FileCheck2,
  MessageSquare,
  Users,
  Briefcase,
  Scale,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomDock() {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const creatorTabs = [
    { href: "/app/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/app/campaigns", label: "Briefs", icon: Compass },
    { href: "/app/collaborations", label: "Deals", icon: FileCheck2 },
    { href: "/app/messages", label: "Chat", icon: MessageSquare },
    { href: "/app/profile", label: "Media Kit", icon: Sparkles },
  ];

  const brandTabs = [
    { href: "/app/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/app/brand/campaigns", label: "Campaigns", icon: Briefcase },
    { href: "/app/brand/creators", label: "Creators", icon: Users },
    { href: "/app/collaborations", label: "Deals", icon: FileCheck2 },
    { href: "/app/messages", label: "Chat", icon: MessageSquare },
  ];

  const adminTabs = [
    { href: "/admin", label: "Home", icon: LayoutDashboard },
    { href: "/admin/creators", label: "Creators", icon: Users },
    { href: "/admin/campaigns", label: "Briefs", icon: Compass },
    { href: "/admin/disputes", label: "Disputes", icon: Scale },
    { href: "/admin/collaborations", label: "Escrow", icon: FileCheck2 },
  ];

  const tabs = role === "creator" ? creatorTabs : role === "brand" ? brandTabs : adminTabs;

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-40 px-4 pointer-events-none">
      <nav className="max-w-md mx-auto rounded-full bg-[#120c16]/95 backdrop-blur-2xl border border-white/15 p-1.5 shadow-2xl flex items-center justify-around pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-mono transition-all duration-200 select-none",
                isActive
                  ? "text-white font-bold bg-gradient-to-r from-[hsl(327,100%,50%)]/30 to-[hsl(300,100%,42%)]/30 border border-[hsl(327,100%,50%)]/50 shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <Icon className={cn("w-4 h-4 mb-0.5", isActive ? "text-[hsl(327,100%,55%)]" : "text-slate-400")} />
              <span className="truncate max-w-[54px]">{tab.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[hsl(327,100%,50%)] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
