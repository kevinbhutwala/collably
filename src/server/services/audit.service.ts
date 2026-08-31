import { auditRepo } from "../repositories/audit.repo";
import { AuditEvent } from "@/core/types";

export class AuditService {
  async getAuditLogs(): Promise<AuditEvent[]> {
    return auditRepo.findAll();
  }

  async log(event: Omit<AuditEvent, "id" | "createdAt">): Promise<AuditEvent> {
    return auditRepo.createAuditLog(event);
  }
}

export const auditService = new AuditService();
