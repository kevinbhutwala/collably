import { AuditEvent } from "@/core/types";

class AuditService {
  async getAuditLogs(): Promise<AuditEvent[]> {
    try {
      const res = await fetch("/api/audit", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch audit logs");
      return await res.json();
    } catch {
      return [];
    }
  }
}

export const auditService = new AuditService();
