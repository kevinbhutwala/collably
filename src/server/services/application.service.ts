import { campaignRepo } from "../repositories/campaign.repo";
import { collaborationRepo } from "../repositories/collaboration.repo";
import { creatorRepo } from "../repositories/creator.repo";
import { notificationRepo } from "../repositories/notification.repo";
import { auditRepo } from "../repositories/audit.repo";
import {
  CampaignApplication,
  Collaboration,
  CollaborationDeliverableItem,
  UserRole,
} from "@/core/types";

export class ApplicationService {
  async applyToCampaign(data: {
    campaignId: string;
    creatorId: string;
    pitch: string;
    proposedFee: number;
    estimatedReach: number;
    sampleLinks?: string[];
  }): Promise<CampaignApplication> {
    const campaign = await campaignRepo.findById(data.campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const creator = await creatorRepo.findById(data.creatorId);
    if (!creator) {
      throw new Error("Creator profile not found");
    }

    const existingApplications = await campaignRepo.findApplicationsByCampaign(data.campaignId);
    if (existingApplications.some((a) => a.creatorId === data.creatorId)) {
      throw new Error("You have already submitted an application for this campaign");
    }

    const application = await campaignRepo.createApplication({
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brandId: campaign.brandId,
      brandName: campaign.brand.companyName,
      brandLogo: campaign.brand.logoUrl,
      creatorId: creator.id,
      creator,
      pitch: data.pitch,
      proposedFee: data.proposedFee,
      estimatedReach: data.estimatedReach,
      status: "pending",
      sampleLinks: data.sampleLinks || [],
      matchScore: 90,
    });

    // Notify brand
    await notificationRepo.createNotification({
      userId: campaign.brand.userId,
      title: "New Creator Application",
      message: `${creator.fullName} applied to "${campaign.title}"`,
      type: "application",
      entityType: "Application",
      entityId: application.id,
      linkUrl: `/app/brand/campaigns/${campaign.id}`,
    });

    return application;
  }

  async acceptApplication(applicationId: string, actorId: string, actorRole: UserRole): Promise<{ application: CampaignApplication; collaboration: Collaboration }> {
    const app = await campaignRepo.findApplicationById(applicationId);
    if (!app) {
      throw new Error("Application not found");
    }

    if (app.status === "accepted") {
      throw new Error("Application has already been accepted");
    }

    const campaign = await campaignRepo.findById(app.campaignId);
    if (!campaign) {
      throw new Error("Associated campaign not found");
    }

    if (campaign.acceptedCount >= campaign.maxCreators) {
      throw new Error("This campaign has already reached its maximum accepted creators limit");
    }

    // 1. Update Application status
    const updatedApp = await campaignRepo.updateApplicationStatus(applicationId, "accepted");

    // 2. Build Collaboration deliverables from campaign deliverable requirements
    const deliverables: CollaborationDeliverableItem[] = campaign.deliverables.map((d, index) => ({
      id: `deliv-${Date.now()}-${index}`,
      type: d.type,
      title: `${d.count}x ${d.type}`,
      status: "assigned",
      dueDate: campaign.timeline.contentSubmissionDeadline,
      payoutAmount: app.proposedFee / (campaign.deliverables.length || 1),
      revisionCount: 0,
      maxRevisions: d.maxRevisions || 2,
      submissions: [],
    }));

    // 3. Create Collaboration
    const collaboration = await collaborationRepo.createCollaboration({
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brandId: campaign.brandId,
      brand: campaign.brand,
      creatorId: app.creatorId,
      creator: app.creator,
      totalAgreedBudget: app.proposedFee,
      isFunded: false,
      paymentStatus: "payment_pending",
      escrowStatus: "pending_deposit",
      status: "payment_pending",
      startDate: new Date().toISOString(),
      finalDeadline: campaign.timeline.campaignEndDate,
      deliverables,
    });

    // 4. Update Campaign accepted count
    await campaignRepo.updateCampaign(campaign.id, {
      acceptedCount: (campaign.acceptedCount || 0) + 1,
    });

    // 5. Notify Creator
    await notificationRepo.createNotification({
      userId: app.creator.userId,
      title: "Application Accepted!",
      message: `Congratulations! ${campaign.brand.companyName} accepted your application for "${campaign.title}".`,
      type: "application",
      entityType: "Collaboration",
      entityId: collaboration.id,
      linkUrl: `/app/creator/collaborations/${collaboration.id}`,
    });

    // 6. Record Audit Log
    await auditRepo.createAuditLog({
      actorId,
      actorName: campaign.brand.companyName,
      actorRole,
      action: "APPLICATION_ACCEPTED",
      entityType: "Collaboration",
      entityId: collaboration.id,
      entityName: campaign.title,
      metadata: { applicationId, agreedBudget: app.proposedFee },
    });

    return { application: updatedApp!, collaboration };
  }
}

export const applicationService = new ApplicationService();
