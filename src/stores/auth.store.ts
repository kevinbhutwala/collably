import { create } from "zustand";
import { User, UserRole, CreatorProfile, BrandProfile } from "../core/types";
import { authService, RegisterParams, SocialAuthClientParams, AuthResponse } from "@/services/auth.service";
import { useSubscriptionStore } from "./subscription.store";

interface AuthState {
  user: User | null;
  role: UserRole;
  currentCreator: CreatorProfile | null;
  currentBrand: BrandProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkSession: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  socialLogin: (params: SocialAuthClientParams) => Promise<AuthResponse>;
  updateCreatorProfile: (updates: Partial<CreatorProfile>) => Promise<CreatorProfile | null>;
  updateBrandProfile: (updates: Partial<BrandProfile>) => Promise<BrandProfile | null>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setAuthData: (user: User, creator?: CreatorProfile | null, brand?: BrandProfile | null) => void;
}

let activeSessionCheck: Promise<boolean> | null = null;
let lastSessionCheckSuccess = 0;
const SESSION_CACHE_TTL_MS = 20000; // 20s cache for verified active sessions

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: "creator",
  currentCreator: null,
  currentBrand: null,
  isAuthenticated: false,
  isLoading: true,

  checkSession: async () => {
    const state = get();
    // Fast path: If already authenticated and checked recently, skip duplicate network call
    if (
      state.isAuthenticated &&
      state.user &&
      Date.now() - lastSessionCheckSuccess < SESSION_CACHE_TTL_MS
    ) {
      return true;
    }

    // In-flight deduplication: return existing active promise
    if (activeSessionCheck) {
      return activeSessionCheck;
    }

    activeSessionCheck = (async () => {
      try {
        const data = await authService.getSession();
        if (data.authenticated && data.user) {
          lastSessionCheckSuccess = Date.now();
          set({
            user: data.user,
            role: data.user.role,
            currentCreator: data.creatorProfile || null,
            currentBrand: data.brandProfile || null,
            isAuthenticated: true,
            isLoading: false,
          });
          if (data.subscription) {
            useSubscriptionStore.getState().setSubscription(data.subscription);
          } else {
            useSubscriptionStore.getState().fetchSubscription().catch(() => {});
          }
          return true;
        }
      } catch {
        // Unauthenticated
      } finally {
        activeSessionCheck = null;
      }
      lastSessionCheckSuccess = 0;
      set({
        user: null,
        currentCreator: null,
        currentBrand: null,
        isAuthenticated: false,
        isLoading: false,
      });
      useSubscriptionStore.getState().setSubscription(null);
      return false;
    })();

    return activeSessionCheck;
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(email, password);
      if (data.user) {
        set({
          user: data.user,
          role: data.user.role,
          currentCreator: data.creatorProfile || null,
          currentBrand: data.brandProfile || null,
          isAuthenticated: true,
          isLoading: false,
        });
        useSubscriptionStore.getState().fetchSubscription().catch(() => {});
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },


  register: async (params: RegisterParams) => {
    set({ isLoading: true });
    try {
      const data = await authService.register(params);
      if (data.user) {
        set({
          user: data.user,
          role: data.user.role,
          currentCreator: data.creatorProfile || null,
          currentBrand: data.brandProfile || null,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  socialLogin: async (params: SocialAuthClientParams): Promise<AuthResponse> => {
    set({ isLoading: true });
    try {
      const data = await authService.socialAuth(params);
      if (data.user) {
        set({
          user: data.user,
          role: data.user.role,
          currentCreator: data.creatorProfile || null,
          currentBrand: data.brandProfile || null,
          isAuthenticated: true,
          isLoading: false,
        });
      }
      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateCreatorProfile: async (updates: Partial<CreatorProfile>) => {
    const { currentCreator } = get();
    if (!currentCreator) return null;

    try {
      const res = await fetch(`/api/creators/${currentCreator.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update creator profile");
      const updated = await res.json();
      set({ currentCreator: updated });
      return updated;
    } catch (err) {
      console.error("updateCreatorProfile error:", err);
      // Optimistic fallback
      const updated = { ...currentCreator, ...updates };
      set({ currentCreator: updated });
      return updated;
    }
  },

  updateBrandProfile: async (updates: Partial<BrandProfile>) => {
    const { currentBrand } = get();
    if (!currentBrand) return null;

    try {
      const res = await fetch(`/api/brands/${currentBrand.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update brand profile");
      const updated = await res.json();
      set({ currentBrand: updated });
      return updated;
    } catch (err) {
      console.error("updateBrandProfile error:", err);
      const updated = { ...currentBrand, ...updates };
      set({ currentBrand: updated });
      return updated;
    }
  },

  logout: async () => {
    lastSessionCheckSuccess = 0;
    activeSessionCheck = null;
    try {
      await authService.logout();
    } catch {
      // Ignore network errors
    }
    set({
      user: null,
      role: "creator",
      currentCreator: null,
      currentBrand: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setUser: (user: User | null) => {
    set({
      user,
      role: user?.role || "creator",
      isAuthenticated: !!user,
    });
  },

  setRole: (role: UserRole) => {
    // If user is authenticated, their role is immutable and locked to their authenticated account
    const currentUser = get().user;
    if (currentUser) {
      set({ role: currentUser.role });
      return;
    }
    // For unauthenticated flows (e.g. registration choice), strictly forbid selecting admin roles
    const adminRoles: UserRole[] = ["super_admin", "agency_admin", "agency_owner"];
    if (adminRoles.includes(role)) {
      console.warn("Security policy: Cannot switch to an administrative role directly.");
      return;
    }
    set({ role });
  },

  setAuthData: (user: User, creator?: CreatorProfile | null, brand?: BrandProfile | null) => {
    set({
      user,
      role: user.role,
      isAuthenticated: true,
      currentCreator: creator || null,
      currentBrand: brand || null,
    });
  },
}));
