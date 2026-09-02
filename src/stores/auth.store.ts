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
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setAuthData: (user: User, creator?: CreatorProfile | null, brand?: BrandProfile | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: "creator",
  currentCreator: null,
  currentBrand: null,
  isAuthenticated: false,
  isLoading: true,

  checkSession: async () => {
    try {
      const data = await authService.getSession();
      if (data.authenticated && data.user) {
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
          useSubscriptionStore.getState().fetchSubscription();
        }
        return true;
      }
    } catch {
      // Unauthenticated
    }
    set({
      user: null,
      currentCreator: null,
      currentBrand: null,
      isAuthenticated: false,
      isLoading: false,
    });
    useSubscriptionStore.getState().setSubscription(null);
    return false;
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
        await useSubscriptionStore.getState().fetchSubscription();
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

  logout: async () => {
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
