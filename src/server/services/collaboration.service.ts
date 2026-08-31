import { collaborationRepo } from "../repositories/collaboration.repo";
import { notificationRepo } from "../repositories/notification.repo";
import { paymentRepo } from "../repositories/payment.repo";
import { auditRepo } from "../repositories/audit.repo";
import {
  Collaboration,
  DeliverableSubmission,
  TimecodedComment,
  CollaborationStatus,
  UserRole,
} from "@/core/types";

export class CollaborationService {
  async getCollaborations(filters: { brandId?: string; creatorId?: string; status?: CollaborationStatus }): Promise<Collaboration[]> {
    return collaborationRepo.findAll(filters);
  }

  async getCollaborationById(id: string): Promise<Collaboration | null> {
    return collaborationRepo.findById(id);
  }

  async submitDeliverable(params: {
    collaborationId: string;
    deliverableId: string;
    mediaUrls: string[];
    captionText?: string;
    creatorNotes?: string;
  }): Promise<Collaboration> {
    const collab = await collaborationRepo.findById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    const deliverable = collab.deliverables.find((d) => d.id === params.deliverableId);
    if (!deliverable) throw new Error("Deliverable not found");

    const version = (deliverable.submissions?.length || 0) + 1;
    const submission: DeliverableSubmission = {
      id: `sub-${Date.now()}`,
      deliverableId: params.deliverableId,
      version,
      mediaUrls: params.mediaUrls,
      captionText: params.captionText || "",
      creatorNotes: params.creatorNotes,
      status: "under_review",
      submittedAt: new Date().toISOString(),
      timecodedComments: [],
    };

    const updatedCollab = await collaborationRepo.addDeliverableSubmission(
      params.collaborationId,
      params.deliverableId,
      submission
    );

    if (!updatedCollab) throw new Error("Failed to update submission");

    // Notify brand
    await notificationRepo.createNotification({
      userId: collab.brand.userId,
      title: "Content Submitted for Review",
      message: `${collab.creator.fullName} submitted v${version} for "${deliverable.title}"`,
      type: "deliverable",
      entityType: "Collaboration",
      entityId: collab.id,
      linkUrl: `/app/brand/collaborations/${collab.id}`,
    });

    return updatedCollab;
  }

  async requestRevision(params: {
    collaborationId: string;
    deliverableId: string;
    submissionId: string;
    feedback: string;
    timecodedComments?: TimecodedComment[];
  }): Promise<Collaboration> {
    const collab = await collaborationRepo.findById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    const deliverable = collab.deliverables.find((d) => d.id === params.deliverableId);
    if (!deliverable) throw new Error("Deliverable not found");

    if (deliverable.revisionCount >= deliverable.maxRevisions) {
      throw new Error(`Maximum allowed revisions (${deliverable.maxRevisions}) reached for this deliverable`);
    }

    const updated = await collaborationRepo.updateDeliverableStatus(
      params.collaborationId,
      params.deliverableId,
      "revision_requested"
    );

    if (!updated) throw new Error("Failed to request revision");

    // Notify creator
    await notificationRepo.createNotification({
      userId: collab.creator.userId,
      title: "Revision Requested",
      message: `${collab.brand.companyName} requested revisions on "${deliverable.title}"`,
      type: "deliverable",
      entityType: "Collaboration",
      entityId: collab.id,
      linkUrl: `/app/creator/collaborations/${collab.id}`,
    });

    return updated;
  }

  async approveDeliverable(params: {
    collaborationId: string;
    deliverableId: string;
    actorId: string;
    actorRole: UserRole;
  }): Promise<Collaboration> {
    const collab = await collaborationRepo.findById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    const deliverable = collab.deliverables.find((d) => d.id === params.deliverableId);
    if (!deliverable) throw new Error("Deliverable not found");

    const updatedCollab = await collaborationRepo.updateDeliverableStatus(
      params.collaborationId,
      params.deliverableId,
      "approved"
    );

    if (!updatedCollab) throw new Error("Failed to approve deliverable");

    // Create / release Payout record for the creator
    const grossAmount = deliverable.payoutAmount;
    const agencyFee = Math.round(grossAmount * 0.1); // 10% standard agency fee
    const netAmount = grossAmount - agencyFee;

    await paymentRepo.createPayout({
      creatorId: collab.creatorId,
      campaignId: collab.campaignId,
      collaborationId: collab.id,
      campaignTitle: collab.campaignTitle,
      brandName: collab.brand.companyName,
      creatorName: collab.creator.fullName,
      deliverableTitle: deliverable.title,
      grossAmount,
      agencyFee,
      netAmount,
      status: "paid",
      paymentMethod: "Direct Bank Deposit",
      releasedAt: new Date().toISOString(),
    });

    // Notify creator of approval and payout
    await notificationRepo.createNotification({
      userId: collab.creator.userId,
      title: "Deliverable Approved & Payout Released!",
      message: `Your deliverable "${deliverable.title}" was approved by ${collab.brand.companyName}. Payout of $${netAmount} released.`,
      type: "payment",
      entityType: "Collaboration",
      entityId: collab.id,
      linkUrl: `/app/creator/collaborations/${collab.id}`,
    });

    // Check if all deliverables in collaboration are approved -> mark collaboration completed
    const allApproved = updatedCollab.deliverables.every((d) => d.status === "approved" || d.status === "completed");
    if (allApproved) {
      await collaborationRepo.updateStatus(collab.id, "completed");
    }

    // Log audit
    await auditRepo.createAuditLog({
      actorId: params.actorId,
      actorName: collab.brand.companyName,
      actorRole: params.actorRole,
      action: "DELIVERABLE_APPROVED",
      entityType: "Deliverable",
      entityId: deliverable.id,
      entityName: deliverable.title,
      metadata: { grossAmount, netAmount, agencyFee },
    });

    return updatedCollab;
  }
}

export const collaborationService = new CollaborationService();
