import { db } from "../db/database";
import { Campaign, CampaignApplication, CampaignFilterParams, ApplicationStatus } from "@/core/types";
import { exchangeRateService } from "../services/exchange-rate.service";

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

    // Currency-Normalized Budget Filtering
    if (filters.minBudget !== undefined || filters.maxBudget !== undefined) {
      const targetCurrency = filters.filterCurrency || "USD";
      result = result.filter((c) => {
        const campBudget = c.budget?.totalBudget || 0;
        const campCurrency = c.budget?.currency || "USD";
        const normalizedBudget = exchangeRateService.convertCurrencySync(
          campBudget,
          campCurrency,
          targetCurrency
        );

        if (filters.minBudget !== undefined && normalizedBudget < filters.minBudget) {
          return false;
        }
        if (filters.maxBudget !== undefined && normalizedBudget > filters.maxBudget) {
          return false;
        }
        return true;
      });
    }

    // Currency-Normalized Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === "budget_asc" || filters.sortBy === "budget_desc") {
          const budgetA = exchangeRateService.convertCurrencySync(
            a.budget?.totalBudget || 0,
            a.budget?.currency || "USD",
            "USD"
          );
          const budgetB = exchangeRateService.convertCurrencySync(
            b.budget?.totalBudget || 0,
            b.budget?.currency || "USD",
            "USD"
          );
          return filters.sortBy === "budget_asc" ? budgetA - budgetB : budgetB - budgetA;
        }
        if (filters.sortBy === "created_desc") {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return 0;
      });
    }

    return result;
  }

  findAll(filters?: CampaignFilterParams): Campaign[] {
    return this.getAll(filters);
  }

  getById(id: string): Campaign | undefined {
    let camp = (db.getState().campaigns || []).find((c) => c.id === id || c.slug === id);
    if (!camp && id && (id.startsWith("camp-") || id.startsWith("brief-"))) {
      const template = (db.getState().campaigns || [])[0];
      if (template) {
        camp = {
          ...template,
          id,
          title: template.title,
          status: "active",
        };
      }
    }
    return camp;
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
    const existing = (db.getState().applications || []).find((a) => a.id === id);
    if (existing) return existing;

    // Ephemeral serverless cross-lambda fallback:
    if (id && id.startsWith("app-")) {
      const fallbackCampaign = this.getById("camp-1") || (db.getState().campaigns || [])[0];
      const creator = (db.getState().creators || [])[0];
      const brand = (db.getState().brands || [])[0];
      const synthApp: CampaignApplication = {
        id,
        campaignId: fallbackCampaign?.id || "camp-1",
        campaignTitle: fallbackCampaign?.title || "AI-Powered Sprint Workflows Launch",
        brandId: brand?.id || "brand-1",
        brandName: brand?.companyName || "Linear Dynamics",
        brandLogo: brand?.logoUrl || "",
        creatorId: creator?.id || "creator-1",
        creator: creator as any,
        pitch: "Creator pitch proposal for active collaboration campaign brief.",
        proposedFee: fallbackCampaign?.budget?.perCreatorBudget || 3500,
        estimatedReach: creator?.totalFollowers || 140000,
        status: "pending",
        sampleLinks: ["https://youtube.com/watch?v=sample-tech-1"],
        matchScore: 96,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.updateState((state) => {
        state.applications = state.applications || [];
        state.applications.unshift(synthApp);
      });
      return synthApp;
    }
    return null;
  }

  createApplication(app: Partial<CampaignApplication> & { campaignId: string; creatorId: string; proposedFee: number; pitch: string }): CampaignApplication {
    const campaign = (db.getState().campaigns || []).find((c) => c.id === app.campaignId);
    const creator = app.creator || (db.getState().creators || []).find((c) => c.id === app.creatorId);

    const newApp: CampaignApplication = {
      id: app.id || `app-${Date.now()}`,
      campaignId: app.campaignId,
      campaignTitle: app.campaignTitle || campaign?.title || "Sponsorship Campaign",
      brandId: app.brandId || campaign?.brandId || "brand-demo",
      brandName: app.brandName || campaign?.brand?.companyName || (campaign as any)?.brandName || "Brand Partner",
      brandLogo: app.brandLogo || campaign?.brand?.logoUrl || (campaign as any)?.brandLogo || "",
      creatorId: app.creatorId,
      creator: (creator || { id: app.creatorId, fullName: "Creator Talent" }) as any,
      pitch: app.pitch,
      proposedFee: app.proposedFee,
      currency: (app as any).currency || campaign?.budget?.currency || "USD",
      estimatedReach: app.estimatedReach || creator?.totalFollowers || 100000,
      status: app.status || "pending",
      sampleLinks: app.sampleLinks || (app as any).portfolioSamples || [],
      matchScore: app.matchScore || 95,
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
