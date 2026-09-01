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
      <nav className="max-w-md mx-auto rounded-full bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#E7E7E4] p-1.5 shadow-editorial flex items-center justify-around pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-mono transition-all duration-150 select-none",
                isActive
                  ? "text-[#FAFAF8] font-bold bg-[#111111] shadow-xs"
                  : "text-[#6B6B6B] hover:text-[#111111]"
              )}
            >
              <Icon className={cn("w-4 h-4 mb-0.5", isActive ? "text-[#B7FF3C]" : "text-[#6B6B6B]")} />
              <span className="truncate max-w-[54px] font-sans">{tab.label}</span>
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#B7FF3C] animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
