import { db } from "../db/database";
import { Collaboration, CollaborationDeliverableItem, DeliverableSubmission, DeliverableStatus, CollaborationStatus } from "@/core/types";

export class CollaborationRepository {
  getAll(role?: string, entityId?: string): Collaboration[] {
    const list = [...(db.getState().collaborations || [])];
    if (!entityId) return list;
    if (role === "creator") {
      return list.filter((c) => c.creatorId === entityId || c.creator?.userId === entityId);
    }
    if (role === "brand") {
      return list.filter((c) => c.brandId === entityId || c.brand?.userId === entityId);
    }
    return list;
  }

  findAll(filters: { brandId?: string; creatorId?: string; status?: CollaborationStatus } = {}): Collaboration[] {
    let list = [...(db.getState().collaborations || [])];
    if (filters.brandId) list = list.filter((c) => c.brandId === filters.brandId);
    if (filters.creatorId) list = list.filter((c) => c.creatorId === filters.creatorId);
    if (filters.status) list = list.filter((c) => c.status === filters.status);
    return list;
  }

  getById(id: string): Collaboration | undefined {
    return (db.getState().collaborations || []).find((c) => c.id === id);
  }

  findById(id: string): Collaboration | null {
    return this.getById(id) || null;
  }

  createCollaboration(data: Omit<Collaboration, "id" | "createdAt" | "updatedAt">): Collaboration {
    const id = `collab-${Date.now()}`;
    const now = new Date().toISOString();
    const collab: Collaboration = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      state.collaborations.unshift(collab);
    });
    return collab;
  }

  addDeliverableSubmission(
    collaborationId: string,
    deliverableId: string,
    submission: DeliverableSubmission
  ): Collaboration | null {
    let updatedCollab: Collaboration | null = null;
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const collab = state.collaborations.find((c) => c.id === collaborationId);
      if (!collab) return;

      const del = collab.deliverables.find((d) => d.id === deliverableId);
      if (!del) return;

      del.submissions = del.submissions || [];
      del.submissions.push(submission);
      del.status = submission.status;
      collab.updatedAt = new Date().toISOString();
      updatedCollab = collab;
    });
    return updatedCollab;
  }

  updateDeliverableStatus(
    collaborationId: string,
    deliverableId: string,
    status: DeliverableStatus
  ): Collaboration | null {
    let updatedCollab: Collaboration | null = null;
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const collab = state.collaborations.find((c) => c.id === collaborationId);
      if (!collab) return;

      const del = collab.deliverables.find((d) => d.id === deliverableId);
      if (!del) return;

      del.status = status;
      collab.updatedAt = new Date().toISOString();
      updatedCollab = collab;
    });
    return updatedCollab;
  }

  updateStatus(collaborationId: string, status: CollaborationStatus): Collaboration | null {
    let updatedCollab: Collaboration | null = null;
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const collab = state.collaborations.find((c) => c.id === collaborationId);
      if (!collab) return;
      collab.status = status;
      collab.updatedAt = new Date().toISOString();
      updatedCollab = collab;
    });
    return updatedCollab;
  }

  submitDeliverableDraft(
    collaborationId: string,
    deliverableId: string,
    data: {
      mediaUrls: string[];
      captionText: string;
      creatorNotes?: string;
    }
  ): CollaborationDeliverableItem | null {
    let updatedItem: CollaborationDeliverableItem | null = null;

    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const collab = state.collaborations.find((c) => c.id === collaborationId);
      if (!collab) return;

      const del = collab.deliverables.find((d) => d.id === deliverableId);
      if (!del) return;

      const newSubmission: DeliverableSubmission = {
        id: `sub-${Date.now()}`,
        deliverableId,
        version: (del.submissions?.length || 0) + 1,
        submittedAt: new Date().toISOString(),
        mediaUrls: data.mediaUrls,
        captionText: data.captionText,
        creatorNotes: data.creatorNotes,
        status: "submitted",
      };

      del.submissions = del.submissions || [];
      del.submissions.push(newSubmission);
      del.status = "submitted";
      updatedItem = del;
    });

    return updatedItem;
  }

  approveDeliverable(collaborationId: string, deliverableId: string): boolean {
    let success = false;
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const collab = state.collaborations.find((c) => c.id === collaborationId);
      if (!collab) return;

      const del = collab.deliverables.find((d) => d.id === deliverableId);
      if (!del) return;

      del.status = "approved";
      success = true;
    });
    return success;
  }

  findDeliverableById(deliverableId: string): {
    collaboration: Collaboration;
    deliverable: CollaborationDeliverableItem;
  } | null {
    const list = db.getState().collaborations || [];
    for (const collab of list) {
      const del = (collab.deliverables || []).find((d) => d.id === deliverableId);
      if (del) {
        return { collaboration: collab, deliverable: del };
      }
    }
    return null;
  }
}

export const collaborationRepo = new CollaborationRepository();
