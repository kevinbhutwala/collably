import { create } from "zustand";
import { CreatorCategory, PlatformType } from "../core/types";

interface FilterState {
  creatorCategory: CreatorCategory | 'all';
  creatorPlatform: PlatformType | 'all';
  creatorMinFollowers: number;
  creatorMinEngagement: number;
  creatorSearchQuery: string;
  creatorVerifiedOnly: boolean;
  creatorLocation: string;
  creatorMaxBudget: number;
  creatorTrendingOnly: boolean;
  creatorRisingOnly: boolean;
  creatorMinRating: number;
  creatorMinCollabs: number;
  creatorSortBy: 'best_match' | 'trending' | 'rising' | 'top_rated' | 'most_successful' | 'newest';

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
  setCreatorLocation: (loc: string) => void;
  setCreatorMaxBudget: (budget: number) => void;
  setCreatorTrendingOnly: (trending: boolean) => void;
  setCreatorRisingOnly: (rising: boolean) => void;
  setCreatorMinRating: (rating: number) => void;
  setCreatorMinCollabs: (collabs: number) => void;
  setCreatorSortBy: (sort: 'best_match' | 'trending' | 'rising' | 'top_rated' | 'most_successful' | 'newest') => void;
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
  creatorLocation: 'all',
  creatorMaxBudget: 0,
  creatorTrendingOnly: false,
  creatorRisingOnly: false,
  creatorMinRating: 0,
  creatorMinCollabs: 0,
  creatorSortBy: 'best_match',

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
  setCreatorLocation: (creatorLocation) => set({ creatorLocation }),
  setCreatorMaxBudget: (creatorMaxBudget) => set({ creatorMaxBudget }),
  setCreatorTrendingOnly: (creatorTrendingOnly) => set({ creatorTrendingOnly }),
  setCreatorRisingOnly: (creatorRisingOnly) => set({ creatorRisingOnly }),
  setCreatorMinRating: (creatorMinRating) => set({ creatorMinRating }),
  setCreatorMinCollabs: (creatorMinCollabs) => set({ creatorMinCollabs }),
  setCreatorSortBy: (creatorSortBy) => set({ creatorSortBy }),
  resetCreatorFilters: () =>
    set({
      creatorCategory: 'all',
      creatorPlatform: 'all',
      creatorMinFollowers: 0,
      creatorMinEngagement: 0,
      creatorSearchQuery: '',
      creatorVerifiedOnly: false,
      creatorLocation: 'all',
      creatorMaxBudget: 0,
      creatorTrendingOnly: false,
      creatorRisingOnly: false,
      creatorMinRating: 0,
      creatorMinCollabs: 0,
      creatorSortBy: 'best_match',
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
