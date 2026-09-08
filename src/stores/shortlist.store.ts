import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreatorProfile, CreatorShortlist } from "@/core/types";

interface ShortlistState {
  savedCreatorIds: string[];
  shortlists: CreatorShortlist[];
  activeShortlistId: string | null;
  isLoading: boolean;

  // Query helpers
  isSaved: (creatorId: string) => boolean;

  // Actions
  toggleSaveCreator: (creator: CreatorProfile, brandId?: string) => Promise<boolean>;
  fetchShortlists: (brandId?: string) => Promise<CreatorShortlist[]>;
  createShortlist: (name: string, description: string, brandId?: string) => Promise<CreatorShortlist | null>;
  removeCreatorFromShortlist: (shortlistId: string, creatorId: string) => Promise<boolean>;
  setActiveShortlistId: (id: string) => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      savedCreatorIds: [],
      shortlists: [],
      activeShortlistId: null,
      isLoading: false,

      isSaved: (creatorId: string) => {
        return get().savedCreatorIds.includes(creatorId);
      },

      toggleSaveCreator: async (creator: CreatorProfile, brandId?: string) => {
        const currentSaved = get().savedCreatorIds;
        const exists = currentSaved.includes(creator.id);
        const nextSaved = exists
          ? currentSaved.filter((id) => id !== creator.id)
          : [...currentSaved, creator.id];

        // Optimistically update local state immediately
        set({ savedCreatorIds: nextSaved });

        try {
          const res = await fetch("/api/crm/shortlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "toggleSave",
              creator,
              creatorId: creator.id,
              shortlistId: get().activeShortlistId || undefined,
              brandId: brandId || undefined,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.shortlist) {
              set((state) => {
                const existingIdx = state.shortlists.findIndex((s) => s.id === data.shortlist.id);
                const updatedList = [...state.shortlists];
                if (existingIdx !== -1) {
                  updatedList[existingIdx] = data.shortlist;
                } else {
                  updatedList.unshift(data.shortlist);
                }
                return {
                  shortlists: updatedList,
                  activeShortlistId: state.activeShortlistId || data.shortlist.id,
                };
              });
            }
            return !exists;
          }
        } catch (err) {
          console.error("Failed to sync shortlist with server:", err);
        }

        return !exists;
      },

      fetchShortlists: async (brandId?: string) => {
        set({ isLoading: true });
        try {
          const query = brandId ? `?brandId=${encodeURIComponent(brandId)}` : "";
          const res = await fetch(`/api/crm/shortlists${query}`, { cache: "no-store" });
          if (res.ok) {
            const data: CreatorShortlist[] = await res.json();
            
            // Extract all saved creator IDs across all brand shortlists
            const serverIds = new Set<string>();
            data.forEach((sl) => {
              (sl.creatorIds || []).forEach((id) => serverIds.add(id));
              (sl.creators || []).forEach((c) => serverIds.add(c.id));
            });

            set({
              shortlists: data || [],
              savedCreatorIds: Array.from(serverIds),
              activeShortlistId: get().activeShortlistId || (data[0]?.id ?? null),
              isLoading: false,
            });
            return data;
          }
        } catch (err) {
          console.error("Failed to fetch shortlists:", err);
        }
        set({ isLoading: false });
        return get().shortlists;
      },

      createShortlist: async (name: string, description: string, brandId?: string) => {
        try {
          const res = await fetch("/api/crm/shortlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, brandId }),
          });
          if (res.ok) {
            const newSl: CreatorShortlist = await res.json();
            set((state) => ({
              shortlists: [newSl, ...state.shortlists],
              activeShortlistId: newSl.id,
            }));
            return newSl;
          }
        } catch (err) {
          console.error("Failed to create shortlist:", err);
        }
        return null;
      },

      removeCreatorFromShortlist: async (shortlistId: string, creatorId: string) => {
        // Optimistic update
        set((state) => ({
          savedCreatorIds: state.savedCreatorIds.filter((id) => id !== creatorId),
          shortlists: state.shortlists.map((sl) => {
            if (sl.id === shortlistId) {
              return {
                ...sl,
                creatorIds: sl.creatorIds.filter((id) => id !== creatorId),
                creators: sl.creators.filter((c) => c.id !== creatorId),
              };
            }
            return sl;
          }),
        }));

        try {
          const res = await fetch("/api/crm/shortlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "removeCreator",
              shortlistId,
              creatorId,
            }),
          });
          return res.ok;
        } catch (err) {
          console.error("Failed to remove creator from shortlist:", err);
          return false;
        }
      },

      setActiveShortlistId: (id: string) => {
        set({ activeShortlistId: id });
      },
    }),
    {
      name: "abeycollab_shortlist_storage",
      partialize: (state) => ({
        savedCreatorIds: state.savedCreatorIds,
        activeShortlistId: state.activeShortlistId,
      }),
    }
  )
);
