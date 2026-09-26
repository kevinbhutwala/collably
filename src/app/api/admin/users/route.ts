import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { SecurityService } from "@/server/services/security.service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get("role") || "all";
    const categoryFilter = searchParams.get("category") || "all";
    const statusFilter = searchParams.get("status") || "all";
    const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();
    const sortBy = searchParams.get("sort") || "newest";

    const allUsers = userRepo.getAll();
    const allCreators = creatorRepo.getAll();
    const allBrands = brandRepo.getAll();

    // Map creators by userId or email
    const creatorByUserId = new Map<string, typeof allCreators[0]>();
    const creatorByEmail = new Map<string, typeof allCreators[0]>();
    allCreators.forEach((c) => {
      if (c.userId) creatorByUserId.set(c.userId, c);
      if (c.id) creatorByUserId.set(c.id, c);
      const email = (c as any).email;
      if (email) creatorByEmail.set(email.toLowerCase(), c);
    });

    // Map brands by userId or email
    const brandByUserId = new Map<string, typeof allBrands[0]>();
    allBrands.forEach((b) => {
      if (b.userId) brandByUserId.set(b.userId, b);
      if (b.id) brandByUserId.set(b.id, b);
    });

    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

    // Touch current admin user's activity
    if (session.userId) {
      userRepo.updateUser(session.userId, {
        lastActiveAt: new Date(now).toISOString(),
      });
    }

    // Enrich users with linked profile data and live activity state
    let enrichedUsers = allUsers.map((u) => {
      const creator = creatorByUserId.get(u.id) || creatorByEmail.get(u.email.toLowerCase());
      const brand = brandByUserId.get(u.id);

      const userJoinedTime = u.createdAt ? new Date(u.createdAt).getTime() : now;
      const isNew = userJoinedTime >= fourteenDaysAgo;
      const isNewThisWeek = userJoinedTime >= sevenDaysAgo;

      const isCurrentSessionUser =
        u.id === session.userId ||
        u.email.toLowerCase() === session.email.toLowerCase();

      const lastActiveTime = isCurrentSessionUser
        ? now
        : u.lastActiveAt
        ? new Date(u.lastActiveAt).getTime()
        : 0;

      // Online if currently querying or active within last 15 minutes
      const isOnline = isCurrentSessionUser || (now - lastActiveTime) < 15 * 60 * 1000;
      const isLoggedIn = Boolean(u.lastLoginAt || isOnline);

      let category = "General";
      let handle: string | undefined = undefined;
      let companyName: string | undefined = undefined;
      let followers: number | undefined = undefined;
      let tier: string | undefined = undefined;
      let profileId: string | undefined = undefined;
      let campaignsCount: number | undefined = undefined;
      let websiteUrl: string | undefined = undefined;
      let bio: string | undefined = undefined;

      if (u.role === "creator" || creator) {
        category = creator?.primaryCategory || "Content Creation";
        handle = creator?.handle || u.email.split("@")[0];
        followers = creator?.totalFollowers || 0;
        tier = creator?.tier || "Rising";
        profileId = creator?.id;
        campaignsCount = creator?.completedCampaignsCount || 0;
        bio = creator?.bio || creator?.headline || "";
      } else if (u.role === "brand" || brand) {
        category = brand?.industry || "E-Commerce & Brands";
        companyName = brand?.companyName || u.name;
        profileId = brand?.id;
        campaignsCount = brand?.activeCampaignsCount || 0;
        websiteUrl = brand?.websiteUrl || "";
        bio = brand?.description || brand?.headline || "";
      } else if (u.role.includes("admin") || u.role.includes("owner")) {
        category = "Platform Operations";
        bio = "System Administrator / Operations Team";
      }

      // If profile is verified in creator/brand repo, sync to user
      const isVerified = Boolean(u.verified || creator?.verified || brand?.verified);

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`,
        verified: isVerified,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        lastLoginAt: u.lastLoginAt,
        lastActiveAt: isCurrentSessionUser ? new Date(now).toISOString() : u.lastActiveAt,
        isOnline,
        isLoggedIn,
        country: u.country,
        isNew,
        isNewThisWeek,
        category,
        handle,
        companyName,
        followers,
        tier,
        profileId,
        campaignsCount,
        websiteUrl,
        bio,
      };
    });

    // Also include any standalone creators or brands in the directory that might not have a direct user entity yet
    allCreators.forEach((c) => {
      const alreadyIncluded = enrichedUsers.some(
        (u) => u.id === c.userId || u.profileId === c.id || (c.handle && u.handle?.toLowerCase() === c.handle.toLowerCase())
      );
      if (!alreadyIncluded) {
        enrichedUsers.push({
          id: c.userId || `creator-${c.id}`,
          name: c.fullName,
          email: `${c.handle.toLowerCase()}@creators.abeycollab.com`,
          role: "creator",
          avatarUrl: c.avatarUrl,
          verified: Boolean(c.verified),
          createdAt: c.createdAt || c.joinedDate || new Date().toISOString(),
          updatedAt: c.updatedAt || new Date().toISOString(),
          lastLoginAt: undefined,
          lastActiveAt: undefined,
          isOnline: false,
          isLoggedIn: false,
          country: c.region || "Global",
          isNew: false,
          isNewThisWeek: false,
          category: c.primaryCategory || "Content Creation",
          handle: c.handle,
          companyName: undefined,
          followers: c.totalFollowers,
          tier: c.tier,
          profileId: c.id,
          campaignsCount: c.completedCampaignsCount || 0,
          websiteUrl: undefined,
          bio: c.bio || c.headline,
        });
      }
    });

    allBrands.forEach((b) => {
      const alreadyIncluded = enrichedUsers.some(
        (u) => u.id === b.userId || u.profileId === b.id || (b.companyName && u.companyName?.toLowerCase() === b.companyName.toLowerCase())
      );
      if (!alreadyIncluded) {
        enrichedUsers.push({
          id: b.userId || `brand-${b.id}`,
          name: b.companyName,
          email: `contact@${b.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
          role: "brand",
          avatarUrl: b.logoUrl,
          verified: Boolean(b.verified),
          createdAt: b.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: undefined,
          lastActiveAt: undefined,
          isOnline: false,
          isLoggedIn: false,
          country: b.location || "Global",
          isNew: false,
          isNewThisWeek: false,
          category: b.industry || "Brands & Agencies",
          handle: undefined,
          companyName: b.companyName,
          followers: undefined,
          tier: undefined,
          profileId: b.id,
          campaignsCount: b.activeCampaignsCount || 0,
          websiteUrl: b.websiteUrl,
          bio: b.description || b.headline,
        });
      }
    });

    // Compute stats across full population
    const totalUsers = enrichedUsers.length;
    const onlineNowCount = enrichedUsers.filter((u) => u.isOnline).length;
    const creatorsCount = enrichedUsers.filter((u) => u.role === "creator").length;
    const brandsCount = enrichedUsers.filter((u) => u.role === "brand" || u.role.includes("brand")).length;
    const adminsCount = enrichedUsers.filter((u) => u.role.includes("admin") || u.role.includes("owner")).length;
    const newThisWeekCount = enrichedUsers.filter((u) => u.isNewThisWeek).length;
    const verifiedCount = enrichedUsers.filter((u) => u.verified).length;
    const unverifiedCount = totalUsers - verifiedCount;

    // Collect distinct categories with counts
    const categoryMap = new Map<string, number>();
    enrichedUsers.forEach((u) => {
      if (u.category) {
        categoryMap.set(u.category, (categoryMap.get(u.category) || 0) + 1);
      }
    });
    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Apply Filters
    let filtered = enrichedUsers;

    if (roleFilter !== "all") {
      if (roleFilter === "active" || roleFilter === "online") {
        filtered = filtered.filter((u) => u.isOnline);
      } else if (roleFilter === "new") {
        filtered = filtered.filter((u) => u.isNew || u.isNewThisWeek);
      } else if (roleFilter === "creator") {
        filtered = filtered.filter((u) => u.role === "creator");
      } else if (roleFilter === "brand") {
        filtered = filtered.filter((u) => u.role === "brand" || u.role.includes("brand"));
      } else if (roleFilter === "admin") {
        filtered = filtered.filter((u) => u.role.includes("admin") || u.role.includes("owner"));
      }
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (u) => u.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (statusFilter !== "all") {
      if (statusFilter === "verified") {
        filtered = filtered.filter((u) => u.verified);
      } else if (statusFilter === "unverified") {
        filtered = filtered.filter((u) => !u.verified);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery) ||
          u.email.toLowerCase().includes(searchQuery) ||
          (u.handle && u.handle.toLowerCase().includes(searchQuery)) ||
          (u.companyName && u.companyName.toLowerCase().includes(searchQuery)) ||
          u.category.toLowerCase().includes(searchQuery) ||
          (u.country && u.country.toLowerCase().includes(searchQuery))
      );
    }

    // Apply Sorting
    filtered.sort((a, b) => {
      if (sortBy === "active") {
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
        return timeB - timeA;
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
      // default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({
      users: filtered,
      stats: {
        total: totalUsers,
        onlineNow: onlineNowCount,
        creators: creatorsCount,
        brands: brandsCount,
        admins: adminsCount,
        newThisWeek: newThisWeekCount,
        verified: verifiedCount,
        unverified: unverifiedCount,
        categories,
      },
    });
  } catch (err: any) {
    console.error("Admin users API error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch users" }, { status: 500 });
  }
}
