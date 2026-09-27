"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { useUIStore } from "@/stores/ui.store";
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Building2,
  ShieldAlert,
  Calendar,
  Filter,
  ArrowUpDown,
  X,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { formatNumber } from "@/core/utils/formatters";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  verified: boolean;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
  lastActiveAt?: string;
  isOnline?: boolean;
  isLoggedIn?: boolean;
  country?: string;
  isNew: boolean;
  isNewThisWeek: boolean;
  category: string;
  handle?: string;
  companyName?: string;
  followers?: number;
  tier?: string;
  profileId?: string;
  campaignsCount?: number;
  websiteUrl?: string;
  bio?: string;
  gender?: string;
}

interface StatsData {
  total: number;
  onlineNow: number;
  loggedIn?: number;
  creators: number;
  brands: number;
  admins: number;
  newThisWeek: number;
  verified: number;
  unverified: number;
  categories: { name: string; count: number }[];
}

function formatRelativeTime(isoString?: string): string {
  if (!isoString) return "Never";
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(diffSec)) return "Recently";
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function AdminUsersPanel() {
  const { addToast } = useUIStore();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filters
  const [activeTab, setActiveTab] = useState<"all" | "loggedin" | "active" | "new" | "creator" | "brand" | "admin">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "unverified">("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "active" | "oldest" | "name" | "role">("newest");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setStats(data.stats || null);
      } else {
        throw new Error("Failed to load users");
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Load Error",
        message: err.message || "Failed to load user directory",
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle Verification Handler
  const handleToggleVerify = async (userId: string, currentStatus: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUpdatingId(userId);
    const nextStatus = !currentStatus;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: nextStatus }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, verified: nextStatus } : u))
      );

      if (selectedUser?.id === userId) {
        setSelectedUser((prev) => (prev ? { ...prev, verified: nextStatus } : null));
      }

      addToast({
        type: "success",
        title: "Status Updated",
        message: `User is now marked as ${nextStatus ? "Verified" : "Unverified"}.`,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Action Failed",
        message: err.message || "Failed to toggle verification",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Copy Email Helper
  const copyToClipboard = (text: string, label = "Email", e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    addToast({
      type: "info",
      title: "Copied to Clipboard",
      message: `${label} copied: ${text}`,
    });
  };

  // Export CSV
  const exportUsersCSV = () => {
    if (users.length === 0) return;
    const headers = [
      "User ID",
      "Name",
      "Email",
      "Role",
      "Category",
      "Status",
      "Followers / Spend",
      "Joined Date",
      "Country",
    ];
    const rows = filteredUsers.map((u) => [
      `"${u.id}"`,
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.category.replace(/"/g, '""')}"`,
      `"${u.verified ? "Verified" : "Pending"}"`,
      `"${u.followers ? u.followers : u.companyName ? u.companyName : ""}"`,
      `"${new Date(u.createdAt).toLocaleDateString()}"`,
      `"${u.country || "Global"}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `abeycollab_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: "success",
      title: "CSV Export Complete",
      message: `Exported ${filteredUsers.length} users to file.`,
    });
  };

  // Filtered & Sorted Users
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Tab Filter
    if (activeTab === "loggedin") {
      result = result.filter((u) => u.isOnline || u.isLoggedIn || Boolean(u.lastLoginAt) || Boolean(u.lastActiveAt));
    } else if (activeTab === "active") {
      result = result.filter((u) => u.isOnline);
    } else if (activeTab === "new") {
      result = result.filter((u) => u.isNew || u.isNewThisWeek);
    } else if (activeTab === "creator") {
      result = result.filter((u) => u.role === "creator");
    } else if (activeTab === "brand") {
      result = result.filter((u) => u.role === "brand" || u.role.includes("brand"));
    } else if (activeTab === "admin") {
      result = result.filter((u) => u.role.includes("admin") || u.role.includes("owner"));
    }

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (u) => (u.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Status Filter
    if (statusFilter === "verified") {
      result = result.filter((u) => Boolean(u.verified));
    } else if (statusFilter === "unverified") {
      result = result.filter((u) => !u.verified);
    }

    // Gender Filter
    if (genderFilter !== "all") {
      result = result.filter(
        (u) => (u.gender || "").toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (u) =>
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.handle && u.handle.toLowerCase().includes(q)) ||
          (u.companyName && u.companyName.toLowerCase().includes(q)) ||
          (u.category && u.category.toLowerCase().includes(q)) ||
          (u.country && u.country.toLowerCase().includes(q)) ||
          (u.role && u.role.toLowerCase().includes(q)) ||
          (u.id && u.id.toLowerCase().includes(q)) ||
          (u.gender && u.gender.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "active" || activeTab === "loggedin" || activeTab === "active") {
        const timeA = Math.max(
          a.isOnline ? Number.MAX_SAFE_INTEGER : 0,
          a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0,
          a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0
        );
        const timeB = Math.max(
          b.isOnline ? Number.MAX_SAFE_INTEGER : 0,
          b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0,
          b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0
        );
        if (timeA !== timeB) return timeB - timeA;
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [users, activeTab, selectedCategory, statusFilter, genderFilter, searchQuery, sortBy]);

  // Compute available categories for pill selector based on active tab
  const visibleCategories = useMemo(() => {
    const counts = new Map<string, number>();
    let pool = users;
    if (activeTab === "creator") pool = pool.filter((u) => u.role === "creator");
    else if (activeTab === "brand") pool = pool.filter((u) => u.role === "brand" || u.role.includes("brand"));
    else if (activeTab === "new") pool = pool.filter((u) => u.isNew || u.isNewThisWeek);
    else if (activeTab === "loggedin") pool = pool.filter((u) => u.isOnline || u.isLoggedIn || Boolean(u.lastLoginAt) || Boolean(u.lastActiveAt));
    else if (activeTab === "active") pool = pool.filter((u) => u.isOnline);
    else if (activeTab === "admin") pool = pool.filter((u) => u.role.includes("admin") || u.role.includes("owner"));

    pool.forEach((u) => {
      if (u.category) {
        counts.set(u.category, (counts.get(u.category) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [users, activeTab]);

  // Safely reset category filter if category no longer exists in current cohort
  useEffect(() => {
    if (selectedCategory !== "all" && visibleCategories.length > 0) {
      const exists = visibleCategories.some(
        (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
      );
      if (!exists) {
        setSelectedCategory("all");
      }
    }
  }, [visibleCategories, selectedCategory]);

  const hasActiveFilters =
    activeTab !== "all" ||
    selectedCategory !== "all" ||
    statusFilter !== "all" ||
    genderFilter !== "all" ||
    Boolean(searchQuery.trim()) ||
    sortBy !== "newest";

  const resetAllFilters = () => {
    setActiveTab("all");
    setSelectedCategory("all");
    setStatusFilter("all");
    setGenderFilter("all");
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <div className="space-y-7 pb-16">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/8 dark:border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>Master User Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            User Directory & Cohorts
          </h1>
          <p className="text-sm text-[#5A5A68] dark:text-[#8E8EA4] font-sans font-medium mt-1">
            Real-time categorized registry for new signups, creators, brand partners, and administrative permissions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A] text-xs font-semibold text-[#0A0A0E] dark:text-white hover:bg-[#F4F4F8] dark:hover:bg-[#1C1C28] transition-all shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#FFD21F]" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={exportUsersCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all border border-black/10"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-[#5A5A68] dark:text-[#8E8EA4] mb-1">
            <span>Total Accounts</span>
            <Users className="w-4 h-4 text-[#5A5A68] dark:text-[#8E8EA4]" />
          </div>
          <div className="text-2xl font-black text-[#0A0A0E] dark:text-white font-display">
            {stats ? stats.total : users.length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            Registered directory
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-emerald-500/40 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Logged In Users</span>
            </span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">
            {stats?.loggedIn ?? users.filter((u) => u.isOnline || u.isLoggedIn || u.lastLoginAt).length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            Active session records
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-emerald-500/30 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Now</span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">
            {stats ? stats.onlineNow : users.filter((u) => u.isOnline).length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            Live online right now
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-amber-600 dark:text-[#FFD21F] mb-1">
            <span>Creators</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[#0A0A0E] dark:text-white font-display">
            {stats ? stats.creators : users.filter((u) => u.role === "creator").length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            Active talent media kits
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
            <span>Brand Accounts</span>
            <Building2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-[#0A0A0E] dark:text-white font-display">
            {stats ? stats.brands : users.filter((u) => u.role === "brand" || u.role.includes("brand")).length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            D2C & Corporate Brands
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs font-mono text-purple-600 dark:text-purple-400 mb-1">
            <span>Verified Status</span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-[#0A0A0E] dark:text-white font-display">
            {stats ? stats.verified : users.filter((u) => u.verified).length}
          </div>
          <div className="text-[11px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1">
            {stats ? stats.unverified : users.filter((u) => !u.verified).length} pending audit
          </div>
        </div>
      </div>

      {/* Main Filter & Navigation Section */}
      <div className="space-y-4">
        {/* Role / Cohort Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/8 dark:border-white/10 pb-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#0A0A0E] dark:bg-white text-white dark:text-[#0A0A0E] shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            All Users ({users.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("loggedin");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === "loggedin"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Logged In Users ({stats?.loggedIn ?? users.filter((u) => u.isOnline || u.isLoggedIn || u.lastLoginAt).length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("active");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === "active"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Now ({stats?.onlineNow ?? users.filter((u) => u.isOnline).length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("new");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 ${
              activeTab === "new"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>New Signups</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono">
              {users.filter((u) => u.isNew || u.isNewThisWeek).length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("creator");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "creator"
                ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            Creators ({users.filter((u) => u.role === "creator").length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("brand");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "brand"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            Brands ({users.filter((u) => u.role === "brand" || u.role.includes("brand")).length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("admin");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "admin"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white dark:bg-[#12121A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
            }`}
          >
            Staff & Admins ({users.filter((u) => u.role.includes("admin") || u.role.includes("owner")).length})
          </button>
        </div>

        {/* Dynamic Category Pill Bar */}
        {visibleCategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono font-bold text-[#5A5A68] dark:text-[#8E8EA4] shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Category:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                selectedCategory === "all"
                  ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-2xs"
                  : "bg-white dark:bg-[#14141E] text-[#5A5A68] dark:text-[#8E8EA4] border border-black/8 dark:border-white/10 hover:border-black/20"
              }`}
            >
              All Categories
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-[#FFD21F] text-[#0A0A0E] font-bold shadow-2xs"
                    : "bg-white dark:bg-[#14141E] text-[#5A5A68] dark:text-[#8E8EA4] border border-black/8 dark:border-white/10 hover:border-black/20"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        )}

        {/* Search, Status & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 shadow-2xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8E8EA4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, @handle, company, category, country..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8F8FB] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-xs text-[#0A0A0E] dark:text-white placeholder-[#8E8EA4] focus:outline-hidden focus:border-[#FFD21F]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F8F8FB] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-xs font-medium text-[#0A0A0E] dark:text-white focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Pending / Unverified</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e: any) => setGenderFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F8F8FB] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-xs font-medium text-[#0A0A0E] dark:text-white focus:outline-hidden"
            >
              <option value="all">All Genders</option>
              <option value="male">Male (♂)</option>
              <option value="female">Female (♀)</option>
            </select>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F8F8FB] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-xs font-medium text-[#0A0A0E] dark:text-white focus:outline-hidden"
            >
              <option value="newest">Newest First</option>
              <option value="active">Recently Active</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="role">Role</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-3 py-2 rounded-xl bg-amber-500/15 text-amber-700 dark:text-[#FFD21F] border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-colors shrink-0 flex items-center gap-1"
                title="Reset all filters"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Sessions Telemetry Banner (when Logged In tab is selected) */}
      {activeTab === "loggedin" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white flex items-center gap-2">
                <span>Active Authenticated Sessions</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {filteredUsers.length} Users Listed
                </span>
              </h4>
              <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] font-mono mt-0.5">
                Displaying all users with active or recent authenticated sessions. Ranked by most recent activity.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#12121A] border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold">{stats?.onlineNow ?? users.filter((u) => u.isOnline).length} Online Now</span>
            </div>
          </div>
        </div>
      )}

      {/* Users Table / Grid */}
      <div className="bg-white dark:bg-[#111118] border border-black/8 dark:border-white/10 rounded-2xl shadow-2xs overflow-hidden">
        {/* Table Title Bar */}
        <div className="px-6 py-4 border-b border-black/8 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#5A5A68] dark:text-[#8E8EA4] bg-white dark:bg-[#111118]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0A0A0E] dark:text-white text-sm">
              {activeTab === "loggedin" ? "Logged In & Active Users" : "User Directory"}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[11px] font-bold text-[#0A0A0E] dark:text-white">
              {filteredUsers.length}
            </span>
          </div>
          <span className="hidden sm:inline text-[11px]">Click any row to inspect complete audit profile</span>
        </div>

        {/* Desktop Aligned Column Headers */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-[#F6F6F9] dark:bg-[#14141E] border-b border-black/8 dark:border-white/10 text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5A68] dark:text-[#8E8EA4]">
          <div className="col-span-4">User & Identity</div>
          <div className="col-span-2">Role & Cohort</div>
          <div className="col-span-1 text-center">Gender</div>
          <div className="col-span-2 text-center">Session Status</div>
          <div className="col-span-1 text-right">Reach / Deals</div>
          <div className="col-span-2 text-right">Verification & Audit</div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FFD21F] mx-auto mb-3" />
            <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] font-mono">
              Loading user directory and categorized cohorts...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="w-10 h-10 text-[#8E8EA4] mx-auto mb-3 opacity-40" />
            <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white font-display">
              No Users Found
            </h3>
            <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] font-mono max-w-sm mx-auto mt-1">
              No registered user records match your selected role, category, or search criteria.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#FFD21F] text-[#0A0A0E] hover:bg-[#FFE052] transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filteredUsers.map((user) => {
              const isCreator = user.role === "creator";
              const isBrand = user.role === "brand" || user.role.includes("brand");
              const isNew = user.isNew || user.isNewThisWeek;

              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="px-5 py-4 sm:px-6 hover:bg-[#F8F8FC] dark:hover:bg-[#151522] transition-colors cursor-pointer group"
                >
                  {/* Desktop Aligned Grid (lg and up) */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    {/* Col 1-4: User Identity */}
                    <div className="col-span-4 flex items-center gap-3.5 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5">
                          <SafeImage
                            src={user.avatarUrl || ""}
                            alt={user.name}
                            fallbackType={user.role === "brand" ? "brand" : "creator"}
                            fallbackName={user.name}
                            fill
                            className={user.role === "brand" ? "object-contain p-1" : "object-cover"}
                          />
                        </div>
                        {user.isOnline ? (
                          <span
                            className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111118] absolute -top-0.5 -right-0.5 animate-pulse"
                            title="Online Now"
                          />
                        ) : user.lastLoginAt ? (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border-2 border-white dark:border-[#111118] absolute -top-0.5 -right-0.5"
                            title="Active Session"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white group-hover:text-[#D97706] dark:group-hover:text-[#FFD21F] transition-colors truncate">
                            {user.name}
                          </h3>
                          {user.verified && (
                            <span title="Verified Account" className="inline-flex">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            </span>
                          )}
                          {isNew && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#5A5A68] dark:text-[#8E8EA4] font-mono mt-0.5">
                          {user.handle ? (
                            <span className="text-[#0A0A0E] dark:text-white font-semibold shrink-0">
                              @{user.handle}
                            </span>
                          ) : user.companyName ? (
                            <span className="text-[#0A0A0E] dark:text-white font-semibold truncate max-w-[120px]">
                              {user.companyName}
                            </span>
                          ) : null}
                          <span className="truncate">{user.email}</span>
                          <button
                            type="button"
                            onClick={(e) => copyToClipboard(user.email, "Email", e)}
                            className="hover:text-[#0A0A0E] dark:hover:text-white shrink-0 p-0.5"
                            title="Copy Email"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Col 5-6: Role & Cohort */}
                    <div className="col-span-2 flex flex-col items-start gap-1 min-w-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isCreator
                            ? "bg-amber-500/15 text-amber-700 dark:text-[#FFD21F] border border-amber-500/30"
                            : isBrand
                            ? "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30"
                            : "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F0F0F5] dark:bg-[#1A1A26] text-[#475569] dark:text-[#A0A0B8] border border-black/5 dark:border-white/5 truncate max-w-[150px]">
                        {user.category}
                      </span>
                    </div>

                    {/* Col 7: Gender */}
                    <div className="col-span-1 flex items-center justify-center">
                      {user.gender ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold capitalize border ${
                            user.gender.toLowerCase() === "male"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                              : "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20"
                          }`}
                        >
                          {user.gender}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-[#8E8EA4] dark:text-[#5A5A68]">—</span>
                      )}
                    </div>

                    {/* Col 8-9: Session Status */}
                    <div className="col-span-2 flex flex-col items-center justify-center text-center">
                      {user.isOnline ? (
                        <>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>ONLINE NOW</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                            Active just now
                          </span>
                        </>
                      ) : user.isLoggedIn || user.lastLoginAt ? (
                        <>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>LOGGED IN</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#5A5A68] dark:text-[#8E8EA4] mt-1" title={user.lastLoginAt}>
                            Active {formatRelativeTime(user.lastActiveAt || user.lastLoginAt)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-black/5 dark:bg-white/5 text-[#8E8EA4] dark:text-[#6A6A7E] border border-black/5 dark:border-white/5">
                            OFFLINE
                          </span>
                          <span className="text-[10px] font-mono text-[#8E8EA4] dark:text-[#5A5A68] mt-1" title={user.createdAt}>
                            Joined {formatRelativeTime(user.createdAt)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Col 10: Reach / Metric */}
                    <div className="col-span-1 text-right">
                      <div className="text-xs font-bold text-[#0A0A0E] dark:text-white font-mono">
                        {user.followers !== undefined
                          ? formatNumber(user.followers)
                          : user.campaignsCount !== undefined
                          ? `${user.campaignsCount}`
                          : user.country || "Global"}
                      </div>
                      <div className="text-[10px] font-mono text-[#5A5A68] dark:text-[#8E8EA4]">
                        {user.followers !== undefined
                          ? "Followers"
                          : user.campaignsCount !== undefined
                          ? "Campaigns"
                          : "Region"}
                      </div>
                    </div>

                    {/* Col 11-12: Verification & Action */}
                    <div className="col-span-2 flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        disabled={updatingId === user.id}
                        onClick={(e) => handleToggleVerify(user.id, user.verified, e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-1.5 shrink-0 ${
                          user.verified
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25"
                            : "bg-[#F4F4F8] dark:bg-[#1E1E2C] text-[#5A5A68] dark:text-[#A0A0B8] border-black/8 dark:border-white/10 hover:border-[#FFD21F] hover:text-[#0A0A0E] dark:hover:text-white"
                        }`}
                        title={user.verified ? "Click to revoke verification" : "Click to approve and verify"}
                      >
                        {updatingId === user.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : user.verified ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>Verify</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="p-1.5 rounded-lg text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        title="Inspect Profile"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile / Tablet Responsive Layout (< lg) */}
                  <div className="lg:hidden flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5">
                            <SafeImage
                              src={user.avatarUrl || ""}
                              alt={user.name}
                              fallbackType={user.role === "brand" ? "brand" : "creator"}
                              fallbackName={user.name}
                              fill
                              className={user.role === "brand" ? "object-contain p-1" : "object-cover"}
                            />
                          </div>
                          {user.isOnline ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#111118] absolute -top-0.5 -right-0.5 animate-pulse" />
                          ) : user.lastLoginAt ? (
                            <span className="w-2 rounded-full bg-emerald-500/80 border-2 border-white dark:border-[#111118] absolute -top-0.5 -right-0.5" />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white truncate">
                              {user.name}
                            </h3>
                            {user.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                            {isNew && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] font-mono truncate">
                            {user.handle ? `@${user.handle} • ` : ""}{user.email}
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#8E8EA4] shrink-0" />
                    </div>

                    {/* Badges & Session Row for Mobile */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isCreator
                              ? "bg-amber-500/15 text-amber-700 dark:text-[#FFD21F] border border-amber-500/30"
                              : isBrand
                              ? "bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30"
                              : "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30"
                          }`}
                        >
                          {user.role}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F0F0F5] dark:bg-[#1A1A26] text-[#475569] dark:text-[#A0A0B8]">
                          {user.category}
                        </span>
                        {user.gender && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono capitalize bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                            {user.gender}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {user.isOnline ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>ONLINE</span>
                          </span>
                        ) : user.lastLoginAt ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            <span>LOGGED IN</span>
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium bg-black/5 dark:bg-white/5 text-[#8E8EA4]">
                            OFFLINE
                          </span>
                        )}

                        <button
                          type="button"
                          disabled={updatingId === user.id}
                          onClick={(e) => handleToggleVerify(user.id, user.verified, e)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                            user.verified
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                              : "bg-[#F4F4F8] dark:bg-[#1E1E2C] text-[#5A5A68] dark:text-[#A0A0B8] border-black/8 dark:border-white/10"
                          }`}
                        >
                          {user.verified ? "Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-Over Drawer for Selected User Inspection */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md h-full bg-white dark:bg-[#0E0E14] border-l border-black/10 dark:border-white/10 shadow-2xl p-6 overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-black/8 dark:border-white/10 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5A68] dark:text-[#8E8EA4]">
                User Profile Audit
              </span>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg bg-[#F4F4F8] dark:bg-[#1E1E2A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Avatar & Primary Info */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-3xl mx-auto overflow-hidden border-2 border-[#FFD21F] relative shadow-md">
                <SafeImage
                  src={selectedUser.avatarUrl || ""}
                  alt={selectedUser.name}
                  fallbackType={selectedUser.role === "brand" ? "brand" : "creator"}
                  fallbackName={selectedUser.name}
                  fill
                  className={selectedUser.role === "brand" ? "object-contain p-2" : "object-cover"}
                />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#0A0A0E] dark:text-white font-display">
                  {selectedUser.name}
                </h2>
                {selectedUser.handle && (
                  <p className="text-xs font-mono text-[#D97706] dark:text-[#FFD21F] font-semibold">
                    @{selectedUser.handle}
                  </p>
                )}
                {selectedUser.companyName && (
                  <p className="text-xs font-semibold text-[#0A0A0E] dark:text-white">
                    {selectedUser.companyName}
                  </p>
                )}
              </div>

              {/* Status and Role badges */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/15 text-amber-700 dark:text-[#FFD21F] border border-amber-500/30">
                  {selectedUser.role}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0F0F5] dark:bg-[#1E1E2C] text-[#475569] dark:text-[#A0A0B8]">
                  {selectedUser.category}
                </span>
                {selectedUser.verified ? (
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20">
                    Unverified
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleToggleVerify(selectedUser.id, selectedUser.verified)}
                disabled={updatingId === selectedUser.id}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border inline-flex items-center justify-center gap-2 ${
                  selectedUser.verified
                    ? "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20"
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                }`}
              >
                {selectedUser.verified ? (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> Revoke Verification
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Verify
                  </>
                )}
              </button>

              <a
                href={`mailto:${selectedUser.email}`}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#F4F4F8] dark:bg-[#1E1E2A] text-[#0A0A0E] dark:text-white border border-black/8 dark:border-white/10 hover:bg-[#EAEAEF] inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Send Email
              </a>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#14141E] border border-black/5 dark:border-white/5 text-xs font-mono">
              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Live Session Status:</span>
                {selectedUser.isOnline ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online Now</span>
                  </span>
                ) : selectedUser.lastLoginAt ? (
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4] font-medium">Logged In Previously</span>
                ) : (
                  <span className="text-[#8E8EA4]">Offline</span>
                )}
              </div>

              {selectedUser.lastActiveAt && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Last Active:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">
                    {new Date(selectedUser.lastActiveAt).toLocaleString()}
                  </span>
                </div>
              )}

              {selectedUser.lastLoginAt && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Last Logged In:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">
                    {new Date(selectedUser.lastLoginAt).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#5A5A68] dark:text-[#8E8EA4]">User ID:</span>
                <span className="text-[#0A0A0E] dark:text-white font-bold select-all truncate max-w-[200px]">
                  {selectedUser.id}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Email:</span>
                <span className="text-[#0A0A0E] dark:text-white font-bold select-all truncate max-w-[200px]">
                  {selectedUser.email}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Registered On:</span>
                <span className="text-[#0A0A0E] dark:text-white font-bold">
                  {new Date(selectedUser.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Location / Region:</span>
                <span className="text-[#0A0A0E] dark:text-white font-bold">
                  {selectedUser.country || "Global"}
                </span>
              </div>

              {selectedUser.gender && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Gender:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold capitalize">
                    {selectedUser.gender}
                  </span>
                </div>
              )}

              {selectedUser.followers !== undefined && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Followers:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">
                    {formatNumber(selectedUser.followers)}
                  </span>
                </div>
              )}

              {selectedUser.tier && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Creator Tier:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">
                    {selectedUser.tier}
                  </span>
                </div>
              )}

              {selectedUser.campaignsCount !== undefined && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4]">Campaigns Count:</span>
                  <span className="text-[#0A0A0E] dark:text-white font-bold">
                    {selectedUser.campaignsCount}
                  </span>
                </div>
              )}
            </div>

            {/* Bio / Description */}
            {selectedUser.bio && (
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#5A5A68] dark:text-[#8E8EA4]">
                  Bio / Statement:
                </label>
                <p className="text-xs text-[#0A0A0E] dark:text-[#E2E2E8] leading-relaxed p-3 rounded-xl bg-[#F8F8FC] dark:bg-[#14141E] border border-black/5 dark:border-white/5">
                  {selectedUser.bio}
                </p>
              </div>
            )}

            {/* Public Links */}
            <div className="space-y-2">
              {selectedUser.profileId && selectedUser.role === "creator" && (
                <Link
                  href={`/creators/${selectedUser.profileId}`}
                  target="_blank"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] border border-[#FFD21F]/30 hover:bg-[#FFD21F]/25 inline-flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Public Media Kit
                </Link>
              )}

              {selectedUser.websiteUrl && (
                <a
                  href={selectedUser.websiteUrl.startsWith("http") ? selectedUser.websiteUrl : `https://${selectedUser.websiteUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#F4F4F8] dark:bg-[#1E1E2A] text-[#0A0A0E] dark:text-white border border-black/8 dark:border-white/10 hover:bg-[#EAEAEF] inline-flex items-center justify-center gap-2 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" /> Visit Brand Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
