import { db } from "../db/database";
import { DisputeRecord, SupportTicket, DisputeStatus } from "@/core/types";

export class DisputeRepository {
  getDisputes(): DisputeRecord[] {
    return [...(db.getState().disputes || [])];
  }

  findAll(): DisputeRecord[] {
    return this.getDisputes();
  }

  findById(id: string): DisputeRecord | null {
    return (db.getState().disputes || []).find((d) => d.id === id) || null;
  }

  createDispute(data: Omit<DisputeRecord, "id" | "status" | "createdAt">): DisputeRecord {
    return this.fileDispute(data);
  }

  fileDispute(data: Omit<DisputeRecord, "id" | "status" | "createdAt">): DisputeRecord {
    const newDispute: DisputeRecord = {
      ...data,
      id: `disp-${Date.now()}`,
      status: "Open",
      stage: "Open",
      evidenceLinks: data.evidenceLinks || [],
      evidenceAttachments: data.evidenceAttachments || [],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString(),
    };

    db.updateState((state) => {
      state.disputes = state.disputes || [];
      state.disputes.unshift(newDispute);
    });

    return newDispute;
  }

  updateStage(
    id: string,
    stage: "Open" | "Under_Review" | "Evidence_Requested" | "Decision" | "Resolved",
    adminNotes?: string
  ): DisputeRecord | null {
    let updated: DisputeRecord | null = null;
    db.updateState((state) => {
      state.disputes = state.disputes || [];
      const d = state.disputes.find((item) => item.id === id);
      if (d) {
        d.stage = stage;
        d.status = stage === "Resolved" ? "Resolved" : (stage as any);
        if (adminNotes) d.adminArbitrationNotes = adminNotes;
        if (stage === "Resolved") {
          d.resolvedAt = new Date().toISOString().split("T")[0];
        }
        d.updatedAt = new Date().toISOString();
        updated = { ...d };
      }
    });
    return updated;
  }

  addEvidenceAttachment(
    id: string,
    attachment: {
      id: string;
      url: string;
      title: string;
      submittedBy: string;
      submittedAt: string;
      role?: any;
      notes?: string;
    }
  ): DisputeRecord | null {
    let updated: DisputeRecord | null = null;
    db.updateState((state) => {
      state.disputes = state.disputes || [];
      const d = state.disputes.find((item) => item.id === id);
      if (d) {
        d.evidenceAttachments = d.evidenceAttachments || [];
        d.evidenceAttachments.push(attachment);
        d.updatedAt = new Date().toISOString();
        updated = { ...d };
      }
    });
    return updated;
  }

  updateStatus(id: string, status: DisputeStatus, adminNotes?: string): DisputeRecord | null {
    let updated: DisputeRecord | null = null;
    db.updateState((state) => {
      state.disputes = state.disputes || [];
      const d = state.disputes.find((item) => item.id === id);
      if (d) {
        d.status = status;
        if (status === "Resolved" || status === "Closed") {
          d.stage = "Resolved";
          d.resolvedAt = new Date().toISOString().split("T")[0];
        } else if (status === "Under_Investigation" || status === "Under_Review") {
          d.stage = "Under_Review";
        } else if (status === "Evidence_Submitted" || status === "Evidence_Requested") {
          d.stage = "Evidence_Requested";
        }
        if (adminNotes) d.adminArbitrationNotes = adminNotes;
        d.updatedAt = new Date().toISOString();
        updated = { ...d };
      }
    });
    return updated;
  }

  resolveDispute(id: string, adminNotes: string): boolean {
    const updated = this.updateStatus(id, "Resolved", adminNotes);
    return Boolean(updated);
  }

  getTickets(userId?: string): SupportTicket[] {
    const list = [...(db.getState().tickets || [])];
    if (!userId) return list;
    return list.filter((t) => t.userId === userId);
  }

  createTicket(data: Omit<SupportTicket, "id" | "messages" | "status" | "createdAt" | "updatedAt"> & { initialMessage: string }): SupportTicket {
    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      userId: data.userId,
      userName: data.userName,
      userRole: data.userRole,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: "Open",
      messages: [
        {
          id: `m-${Date.now()}`,
          senderName: data.userName,
          senderRole: data.userRole,
          content: data.initialMessage,
          createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
        },
      ],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    db.updateState((state) => {
      state.tickets = state.tickets || [];
      state.tickets.unshift(newTicket);
    });

    return newTicket;
  }
}

export const disputeRepo = new DisputeRepository();
