import { CampaignApplication, ApplicationStatus } from "../core/types";
import { MOCK_APPLICATIONS } from "../mock/applications.mock";
import { MOCK_CREATORS } from "../mock/creators.mock";
import { MOCK_CAMPAIGNS } from "../mock/campaigns.mock";

class ApplicationService {
  private applications: CampaignApplication[] = [...MOCK_APPLICATIONS];

  async getApplications(role?: 'creator' | 'brand', entityId?: string): Promise<CampaignApplication[]> {
    let result = [...this.applications];
    if (role === 'creator' && entityId) {
      result = result.filter((a) => a.creatorId === entityId);
    } else if (role === 'brand' && entityId) {
      result = result.filter((a) => a.brandId === entityId);
    }
    return result;
  }

  async submitApplication(data: {
    campaignId: string;
    campaignTitle: string;
    brandId: string;
    brandName: string;
    brandLogo: string;
    creatorId: string;
    pitch: string;
    proposedFee: number;
    estimatedReach: number;
    sampleLinks: string[];
  }): Promise<CampaignApplication> {
    const creator = MOCK_CREATORS.find((c) => c.id === data.creatorId) || MOCK_CREATORS[0];
    const newApp: CampaignApplication = {
      id: `app-${Date.now()}`,
      campaignId: data.campaignId,
      campaignTitle: data.campaignTitle,
      brandId: data.brandId,
      brandName: data.brandName,
      brandLogo: data.brandLogo,
      creatorId: data.creatorId,
      creator,
      pitch: data.pitch,
      proposedFee: data.proposedFee,
      estimatedReach: data.estimatedReach,
      status: "pending",
      sampleLinks: data.sampleLinks,
      matchScore: 92,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.applications.unshift(newApp);
    return newApp;
  }

  async applyToCampaign(data: {
    campaignId: string;
    creatorId: string;
    proposedFee: number;
    pitch: string;
    portfolioSamples?: string[];
  }): Promise<CampaignApplication> {
    const campaign = MOCK_CAMPAIGNS.find((c) => c.id === data.campaignId);
    const creator = MOCK_CREATORS.find((c) => c.id === data.creatorId) || MOCK_CREATORS[0];

    return this.submitApplication({
      campaignId: data.campaignId,
      campaignTitle: campaign?.title || "Campaign Collaboration",
      brandId: campaign?.brandId || "brand-1",
      brandName: campaign?.brand?.companyName || "Brand Partner",
      brandLogo: campaign?.brand?.logoUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      creatorId: data.creatorId,
      pitch: data.pitch,
      proposedFee: data.proposedFee,
      estimatedReach: creator.totalFollowers,
      sampleLinks: data.portfolioSamples || [],
    });
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<CampaignApplication> {
    const index = this.applications.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Application not found");
    this.applications[index] = { ...this.applications[index], status, updatedAt: new Date().toISOString() };
    return this.applications[index];
  }
}

export const applicationService = new ApplicationService();
