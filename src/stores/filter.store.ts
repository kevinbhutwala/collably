import { create } from "zustand";
import { CreatorCategory, PlatformType } from "../core/types";

interface FilterState {
  creatorCategory: CreatorCategory | 'all';
  creatorPlatform: PlatformType | 'all';
  creatorMinFollowers: number;
  creatorMinEngagement: number;
  creatorSearchQuery: string;
  creatorVerifiedOnly: boolean;

  campaignCategory: CreatorCategory | 'all';
  campaignPlatform: PlatformType | 'all';
  campaignMinBudget: number;
  campaignSearchQuery: string;

  setCreatorCategory: (cat: CreatorCategory | 'all') => void;
  setCreatorPlatform: (plat: PlatformType | 'all') => void;
  setCreatorMinFollowers: (min: number) => void;
  setCreatorMinEngagement: (min: number) => void;
  setCreatorSearchQuery: (query: string) => void;
  setCreatorVerifiedOnly: (verified: boolean) => void;
  resetCreatorFilters: () => void;

  setCampaignCategory: (cat: CreatorCategory | 'all') => void;
  setCampaignPlatform: (plat: PlatformType | 'all') => void;
  setCampaignMinBudget: (min: number) => void;
  setCampaignSearchQuery: (query: string) => void;
  resetCampaignFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  creatorCategory: 'all',
  creatorPlatform: 'all',
  creatorMinFollowers: 0,
  creatorMinEngagement: 0,
  creatorSearchQuery: '',
  creatorVerifiedOnly: false,

  campaignCategory: 'all',
  campaignPlatform: 'all',
  campaignMinBudget: 0,
  campaignSearchQuery: '',

  setCreatorCategory: (creatorCategory) => set({ creatorCategory }),
  setCreatorPlatform: (creatorPlatform) => set({ creatorPlatform }),
  setCreatorMinFollowers: (creatorMinFollowers) => set({ creatorMinFollowers }),
  setCreatorMinEngagement: (creatorMinEngagement) => set({ creatorMinEngagement }),
  setCreatorSearchQuery: (creatorSearchQuery) => set({ creatorSearchQuery }),
  setCreatorVerifiedOnly: (creatorVerifiedOnly) => set({ creatorVerifiedOnly }),
  resetCreatorFilters: () =>
    set({
      creatorCategory: 'all',
      creatorPlatform: 'all',
      creatorMinFollowers: 0,
      creatorMinEngagement: 0,
      creatorSearchQuery: '',
      creatorVerifiedOnly: false,
    }),

  setCampaignCategory: (campaignCategory) => set({ campaignCategory }),
  setCampaignPlatform: (campaignPlatform) => set({ campaignPlatform }),
  setCampaignMinBudget: (campaignMinBudget) => set({ campaignMinBudget }),
  setCampaignSearchQuery: (campaignSearchQuery) => set({ campaignSearchQuery }),
  resetCampaignFilters: () =>
    set({
      campaignCategory: 'all',
      campaignPlatform: 'all',
      campaignMinBudget: 0,
      campaignSearchQuery: '',
    }),
}));
