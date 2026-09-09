import { FeatureFlagConfig } from "../core/types";

class FeatureFlagService {
  private flags: FeatureFlagConfig = {
    ai_matching: true,
    ai_assistant: false, // Disabled for Phase 1, reserved for Phase 2
    payments_escrow: true,
    creator_verification: true,
    timecoded_video_review: true,
    dispute_management: true,
    advanced_analytics: true,
  };

  async getFlags(): Promise<FeatureFlagConfig> {
    return { ...this.flags };
  }

  async toggleFlag(key: keyof FeatureFlagConfig): Promise<FeatureFlagConfig> {
    this.flags[key] = !this.flags[key];
    return { ...this.flags };
  }
}

export const featureFlagService = new FeatureFlagService();
