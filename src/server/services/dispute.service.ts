import { disputeRepo } from "../repositories/dispute.repo";
import { DisputeRecord, DisputeReason, UserRole } from "@/core/types";

export class DisputeService {
  async getDisputes(): Promise<DisputeRecord[]> {
    return disputeRepo.findAll();
  }

  async getDisputeById(id: string): Promise<DisputeRecord | null> {
    return disputeRepo.findById(id);
  }

  async fileDispute(params: {
    collaborationId: string;
    campaignTitle: string;
    brandName: string;
    creatorName: string;
    reason: DisputeReason;
    description: string;
    amountInDispute: number;
    filedBy: UserRole;
    evidenceLinks?: string[];
  }): Promise<DisputeRecord> {
    return disputeRepo.createDispute({
      ...params,
      evidenceLinks: params.evidenceLinks || [],
    });
  }

  async arbitrate(disputeId: string, status: DisputeRecord["status"], notes: string): Promise<DisputeRecord | null> {
    return disputeRepo.updateStatus(disputeId, status, notes);
  }
}

export const disputeService = new DisputeService();
