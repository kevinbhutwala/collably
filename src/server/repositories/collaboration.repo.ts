import { db } from "../db/database";
import { Collaboration, CollaborationDeliverableItem, DeliverableSubmission, DeliverableStatus, CollaborationStatus, CollaborationPaymentStatus } from "@/core/types";

export class CollaborationRepository {
  getAll(role?: string, entityId?: string): Collaboration[] {
    const state = db.getState();
    const rawList = [...(state.collaborations || [])];
    const creators = state.creators || [];
    const brands = state.brands || [];

    const enrichedList: Collaboration[] = rawList.map((raw) => {
      const c = raw as any;
      const creator = c.creator || creators.find((cr) => cr.id === c.creatorId || cr.userId === c.creatorId);
      const brand = c.brand || brands.find((b) => b.id === c.brandId || b.userId === c.brandId);

      return {
        ...c,
        campaignTitle: c.campaignTitle || c.title || "Brand Partnership Brief",
        totalAgreedBudget: Number(c.totalAgreedBudget || c.price || 35000),
        currency: c.currency || "INR",
        isFunded: c.isFunded !== undefined ? Boolean(c.isFunded) : true,
        paymentStatus: (c.paymentStatus === "released" || c.status === "completed" ? "paid" : c.paymentStatus || "payment_secured") as CollaborationPaymentStatus,
        creator: creator
          ? {
              ...creator,
              id: creator.id,
              userId: creator.userId || c.creatorId,
              fullName: creator.fullName || c.creatorName || "Creator",
              handle: creator.handle || c.creatorHandle || "creator",
              avatarUrl: creator.avatarUrl || "/creators/prarthana.jpg",
              primaryCategory: creator.primaryCategory || "Content Creation",
            } as any
          : c.creator,
        brand: brand
          ? {
              ...brand,
              id: brand.id,
              userId: brand.userId || c.brandId,
              companyName: brand.companyName || c.brandName || "Brand Partner",
              logoUrl: brand.logoUrl || (brand.companyName?.toLowerCase().includes("snitch") ? "/brands/snitch.png" : "/brands/the-whole-truth.png"),
              industry: brand.industry || "E-Commerce",
            } as any
          : c.brand,
      } as Collaboration;
    });

    if (!entityId) return enrichedList;
    if (role === "creator") {
      return enrichedList.filter(
        (c) =>
          c.creatorId === entityId ||
          c.creator?.id === entityId ||
          c.creator?.userId === entityId
      );
    }
    if (role === "brand") {
      return enrichedList.filter(
        (c) =>
          c.brandId === entityId ||
          c.brand?.id === entityId ||
          c.brand?.userId === entityId
      );
    }
    return enrichedList;
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
      assetUrl?: string;
      notes?: string;
      mediaUrls?: string[];
      captionText?: string;
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

      const resolvedAssetUrl = data.assetUrl || (data.mediaUrls && data.mediaUrls[0]) || "";
      const resolvedNotes = data.notes !== undefined ? data.notes : (data.creatorNotes || "");
      const submittedAt = new Date().toISOString();
      const slaDeadline = new Date(Date.now() + 120 * 60 * 60 * 1000).toISOString();

      const newSubmission: DeliverableSubmission = {
        id: `sub-${Date.now()}`,
        deliverableId,
        version: (del.submissions?.length || 0) + 1,
        assetUrl: resolvedAssetUrl,
        notes: resolvedNotes,
        submittedAt,
        slaDeadline,
        mediaUrls: data.mediaUrls || (resolvedAssetUrl ? [resolvedAssetUrl] : []),
        captionText: data.captionText || "",
        creatorNotes: resolvedNotes,
        status: "submitted",
      };

      del.submissions = del.submissions || [];
      del.submissions.push(newSubmission);
      del.status = "submitted";
      del.assetUrl = resolvedAssetUrl;
      del.notes = resolvedNotes;
      del.submittedAt = submittedAt;
      del.slaDeadline = slaDeadline;
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
