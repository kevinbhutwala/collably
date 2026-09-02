import { db } from "../db/database";
import { Campaign, CampaignApplication, CampaignFilterParams, ApplicationStatus } from "@/core/types";

export class CampaignRepository {
  getAll(filters?: CampaignFilterParams): Campaign[] {
    let result = [...(db.getState().campaigns || [])];

    if (!filters) return result;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.brand.companyName.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter((c) => c.category === filters.category);
    }

    if (filters.status && filters.status !== "all") {
      result = result.filter((c) => c.status === filters.status);
    }

    return result;
  }

  findAll(filters?: CampaignFilterParams): Campaign[] {
    return this.getAll(filters);
  }

  getById(id: string): Campaign | undefined {
    return (db.getState().campaigns || []).find((c) => c.id === id || c.slug === id);
  }

  findById(id: string): Campaign | null {
    return this.getById(id) || null;
  }

  getByBrandId(brandId: string): Campaign[] {
    return (db.getState().campaigns || []).filter((c) => c.brandId === brandId);
  }


  createCampaign(data: any): Campaign {
    const brand = (db.getState().brands || []).find((b) => b.id === data.brandId) || (db.getState().brands || [])[0];

    const campaign: Campaign = {
      id: data.id || `camp-${Date.now()}`,
      brandId: data.brandId || brand?.id || "brand-1",
      brand: data.brand || brand,
      title: data.title || "New Campaign Brief",
      slug: data.slug || (data.title || "campaign").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline: data.tagline || "High-impact creator partnership campaign.",
      description: data.description || "Campaign briefing and requirements.",
      category: data.category || "Technology & AI",
      targetAudience: data.targetAudience || {
        locations: data.targetCountries || ["United States"],
        ageRanges: data.targetAgeRanges || ["25-34"],
        gender: "All",
        interests: ["Technology", "Creative"],
      },
      creatorRequirements: data.creatorRequirements || {
        minFollowers: data.minFollowers || 10000,
        minEngagementRate: data.minEngagementRate || 3.0,
        platforms: ["youtube", "x"],
        languages: ["English"],
        preferredTiers: ["Micro", "Mid-Tier", "Macro"],
      },
      deliverables: data.deliverables || [
        {
          id: `del-req-${Date.now()}`,
          type: "YouTube 60s Integration",
          count: 1,
          guidelines: "Detailed product review with screen capture and trackable link.",
          specifications: ["1080p 60fps minimum"],
          maxRevisions: 2,
        },
      ],
      budget: data.budget || {
        totalBudget: data.totalBudget || 15000,
        perCreatorBudget: data.perCreatorBudget || 2500,
        currency: "USD",
        paymentTerms: "50_50_escrow",
      },
      timeline: data.timeline || {
        applicationDeadline: "2026-09-30",
        startDate: "2026-10-01",
        contentSubmissionDeadline: "2026-10-20",
        campaignEndDate: "2026-11-15",
      },
      status: data.status || "active",
      featured: data.featured ?? true,
      applicantsCount: data.applicantsCount || 0,
      acceptedCount: data.acceptedCount || 0,
      maxCreators: data.maxCreators || 5,
      coverImage: data.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    };

    db.updateState((state) => {
      state.campaigns = state.campaigns || [];
      state.campaigns.unshift(campaign);
    });
    return campaign;
  }

  updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
    let updated: Campaign | null = null;
    db.updateState((state) => {
      state.campaigns = state.campaigns || [];
      const idx = state.campaigns.findIndex((c) => c.id === id);
      if (idx !== -1) {
        state.campaigns[idx] = {
          ...state.campaigns[idx],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updated = state.campaigns[idx];
      }
    });
    return updated;
  }

  getApplications(campaignId?: string, creatorId?: string): CampaignApplication[] {
    let result = [...(db.getState().applications || [])];
    if (campaignId) result = result.filter((a) => a.campaignId === campaignId);
    if (creatorId) result = result.filter((a) => a.creatorId === creatorId);
    return result;
  }

  findApplicationsByCampaign(campaignId: string): CampaignApplication[] {
    return this.getApplications(campaignId);
  }

  findApplicationById(id: string): CampaignApplication | null {
    return (db.getState().applications || []).find((a) => a.id === id) || null;
  }

  createApplication(app: Omit<CampaignApplication, "id" | "createdAt" | "updatedAt"> & { id?: string }): CampaignApplication {
    const newApp: CampaignApplication = {
      ...app,
      id: app.id || `app-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.updateState((state) => {
      state.applications = state.applications || [];
      state.applications.unshift(newApp);

      // Increment campaign applicantsCount
      const camp = state.campaigns.find((c) => c.id === newApp.campaignId);
      if (camp) {
        camp.applicantsCount = (camp.applicantsCount || 0) + 1;
      }
    });
    return newApp;
  }

  updateApplicationStatus(id: string, status: ApplicationStatus): CampaignApplication | null {
    let updated: CampaignApplication | null = null;
    db.updateState((state) => {
      state.applications = state.applications || [];
      const idx = state.applications.findIndex((a) => a.id === id);
      if (idx !== -1) {
        state.applications[idx].status = status;
        state.applications[idx].updatedAt = new Date().toISOString();
        updated = state.applications[idx];
      }
    });
    return updated;
  }
}

export const campaignRepo = new CampaignRepository();
