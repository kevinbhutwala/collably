import { db } from "../db/database";
import { AuditEvent } from "@/core/types";

export class AuditRepository {
  findAll(): AuditEvent[] {
    return [...(db.getState().auditLogs || [])];
  }

  getAuditLogs(): AuditEvent[] {
    return this.findAll();
  }

  createAuditLog(event: Omit<AuditEvent, "id" | "createdAt">): AuditEvent {
    return this.logEvent(event);
  }

  logEvent(event: Omit<AuditEvent, "id" | "createdAt">): AuditEvent {
    const newEvent: AuditEvent = {
      ...event,
      id: `aud-${Date.now()}`,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    };

    db.updateState((state) => {
      state.auditLogs = state.auditLogs || [];
      state.auditLogs.unshift(newEvent);
    });

    return newEvent;
  }
}

export const auditRepo = new AuditRepository();
