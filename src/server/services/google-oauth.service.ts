import { db } from "../db/database";
import { creatorRepo } from "../repositories/creator.repo";

export interface YouTubeChannelStats {
  channelId: string;
  title: string;
  customUrl?: string;
  description?: string;
  avatarUrl?: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  hiddenSubscriberCount: boolean;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verifiedEmail: boolean;
}

export class GoogleOAuthService {
  private getClientId(): string {
    return (
      process.env.GOOGLE_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      ""
    );
  }

  private getClientSecret(): string {
    return process.env.GOOGLE_CLIENT_SECRET || "";
  }

  getRedirectUri(requestHost?: string): string {
    if (requestHost) {
      const protocol = requestHost.includes("localhost") ? "http" : "https";
      return `${protocol}://${requestHost}/api/auth/callback/google`;
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.abeycollab.com";
    return `${appUrl.replace(/\/$/, "")}/api/auth/callback/google`;
  }

  /**
   * Generates the official Google OAuth 2.0 authorization URL
   */
  generateAuthUrl(params: {
    mode: "login" | "register" | "connect_youtube";
    role?: "creator" | "brand";
    redirectTarget?: string;
    requestHost?: string;
  }): string {
    const clientId = this.getClientId();
    if (!clientId) {
      throw new Error("GOOGLE_CLIENT_ID is not configured in environment variables.");
    }

    const redirectUri = this.getRedirectUri(params.requestHost);

    // YouTube readonly scope enables live subscriber/view fetch
    const scopes = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/youtube.readonly",
    ];

    const statePayload = {
      mode: params.mode,
      role: params.role || "creator",
      redirect: params.redirectTarget || (params.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard"),
      nonce: Math.random().toString(36).substring(2, 10),
      timestamp: Date.now(),
    };

    const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");

    const searchParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "select_account consent",
      state,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`;
  }

  /**
   * Exchanges authorization code for access and refresh tokens
   */
  async exchangeCode(code: string, requestHost?: string): Promise<{
    accessToken: string;
    idToken?: string;
    refreshToken?: string;
  }> {
    const clientId = this.getClientId();
    const clientSecret = this.getClientSecret();
    const redirectUri = this.getRedirectUri(requestHost);

    if (!clientId || !clientSecret) {
      throw new Error("Missing Google Client ID or Client Secret");
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google token exchange failure:", errorText);
      throw new Error(`Google token exchange failed: ${response.statusText}`);
    }

    const tokenData = await response.json();
    return {
      accessToken: tokenData.access_token,
      idToken: tokenData.id_token,
      refreshToken: tokenData.refresh_token,
    };
  }

  /**
   * Fetches Google User Profile information
   */
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Google user profile information");
    }

    const data = await response.json();
    return {
      id: data.sub,
      email: data.email,
      name: data.name || data.given_name || "Google User",
      picture: data.picture,
      verifiedEmail: Boolean(data.email_verified),
    };
  }

  /**
   * Fetches the authentic YouTube Channel data for the connected Google account
   */
  async getYouTubeChannel(accessToken: string): Promise<YouTubeChannelStats | null> {
    try {
      const url =
        "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&mine=true";
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        console.warn("YouTube channel fetch returned non-200:", response.status);
        return null;
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        // User does not own an active YouTube channel on this Google account
        return null;
      }

      const channel = data.items[0];
      const stats = channel.statistics || {};
      const snippet = channel.snippet || {};

      return {
        channelId: channel.id,
        title: snippet.title || "My YouTube Channel",
        customUrl: snippet.customUrl || snippet.title,
        description: snippet.description || "",
        avatarUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        subscriberCount: Number(stats.subscriberCount || 0),
        videoCount: Number(stats.videoCount || 0),
        viewCount: Number(stats.viewCount || 0),
        hiddenSubscriberCount: Boolean(stats.hiddenSubscriberCount),
      };
    } catch (err) {
      console.error("Error retrieving YouTube channel stats:", err);
      return null;
    }
  }

  /**
   * Syncs real YouTube stats into the Creator's verified profile
   */
  async syncYouTubeToCreator(
    userId: string,
    youtube: YouTubeChannelStats
  ): Promise<{ success: boolean; creator?: any }> {
    const creator = creatorRepo.getByUserId(userId);
    if (!creator) return { success: false };

    let updatedCreator: any = null;

    db.updateState((state: any) => {
      const c = (state.creators || []).find((item: any) => item.userId === userId || item.id === creator.id);
      if (!c) return;

      c.socialAccounts = c.socialAccounts || [];
      const existingYtIdx = c.socialAccounts.findIndex((s: any) => s.platform === "youtube");

      const handle = youtube.customUrl || youtube.title;
      const formattedHandle = handle.startsWith("@") ? handle : `@${handle.replace(/\s+/g, "")}`;

      const ytAccount = {
        id: existingYtIdx >= 0 ? c.socialAccounts[existingYtIdx].id : `sa_yt_${Date.now()}`,
        platform: "youtube",
        handle: formattedHandle,
        channelId: youtube.channelId,
        channelTitle: youtube.title,
        followers: youtube.subscriberCount,
        subscribers: youtube.subscriberCount,
        videoCount: youtube.videoCount,
        viewCount: youtube.viewCount,
        engagementRate: 5.4,
        verifiedBadge: true,
        verifiedVia: "google_oauth",
        verifiedAt: new Date().toISOString(),
        url: `https://youtube.com/${formattedHandle.replace(/^@/, "@")}`,
      };

      if (existingYtIdx >= 0) {
        c.socialAccounts[existingYtIdx] = ytAccount;
      } else {
        c.socialAccounts.push(ytAccount);
      }

      // Recalculate total followers across verified accounts
      const totalFollowers = c.socialAccounts.reduce(
        (sum: number, sa: any) => sum + (Number(sa.followers) || 0),
        0
      );
      c.totalFollowers = Math.max(totalFollowers, c.totalFollowers || 0);

      // Upgrade badge to official platform verified
      c.verified = true;
      c.isAbeyCollabVerified = true;
      c.updatedAt = new Date().toISOString();

      updatedCreator = { ...c };
    });

    return { success: true, creator: updatedCreator };
  }
}

export const googleOAuthService = new GoogleOAuthService();
