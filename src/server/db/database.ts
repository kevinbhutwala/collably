import fs from "fs";
import path from "path";
import { DatabaseState } from "./schema";
import { getInitialSeedDatabase } from "./seed";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";

const isServerless = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const DATA_DIR = isServerless ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "valence_db.json");
const BUNDLED_DB_FILE = path.join(process.cwd(), "data", "valence_db.json");

class DatabaseClient {
  private state: DatabaseState | null = null;
  private lastLoadedMtime = 0;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        try {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        } catch {
          // Ignore directory creation failure in read-only runtimes
        }
      }

      let rawState: DatabaseState | null = null;
      if (fs.existsSync(DB_FILE)) {
        try {
          const content = fs.readFileSync(DB_FILE, "utf-8");
          if (content && content.trim().startsWith("{")) {
            rawState = JSON.parse(content);
            this.lastLoadedMtime = fs.statSync(DB_FILE).mtimeMs;
          }
        } catch {
          rawState = null;
        }
      } else if (fs.existsSync(BUNDLED_DB_FILE)) {
        try {
          const content = fs.readFileSync(BUNDLED_DB_FILE, "utf-8");
          if (content && content.trim().startsWith("{")) {
            rawState = JSON.parse(content);
          }
        } catch {
          rawState = null;
        }
      }

      this.state = rawState || getInitialSeedDatabase();

      const seed = getInitialSeedDatabase();

        // Ensure all required collections exist (in case of schema additions)
        if (!this.state!.subscriptions) this.state!.subscriptions = [];
        if (!this.state!.creators) this.state!.creators = [];
        if (!this.state!.brands) this.state!.brands = [];
        if (!this.state!.campaigns) this.state!.campaigns = [];
        if (!this.state!.applications) this.state!.applications = [];
        if (!this.state!.collaborations) this.state!.collaborations = [];
        if (!this.state!.payouts) this.state!.payouts = [];
        if (!this.state!.crmContacts) this.state!.crmContacts = [];
        if (!this.state!.shortlists) this.state!.shortlists = [];
        if (!this.state!.disputes) this.state!.disputes = [];
        if (!this.state!.tickets) this.state!.tickets = [];
        if (!this.state!.conversations) this.state!.conversations = [];
        if (!this.state!.messages) this.state!.messages = [];
        if (!this.state!.notifications) this.state!.notifications = [];
        if (!this.state!.auditLogs) this.state!.auditLogs = [];
        if (!this.state!.aiUsage) this.state!.aiUsage = [];
        if (!this.state!.ledgerEntries) this.state!.ledgerEntries = [];
        if (!this.state!.reliabilityScores) this.state!.reliabilityScores = [];
        if (!this.state!.platformMetrics) this.state!.platformMetrics = [...(seed.platformMetrics || [])];
        if (!this.state!.algorithmConfig) this.state!.algorithmConfig = seed.algorithmConfig;
        if (!this.state!.userBadges) this.state!.userBadges = [];
        if (!this.state!.suspiciousActivities) this.state!.suspiciousActivities = [];
        if (!this.state!.passwordResetTokens) this.state!.passwordResetTokens = [];


        // Merge seed users and synchronize passwordHash for deterministic access
        for (const seedUser of seed.users) {
          const existing = this.state!.users.find(
            (u) => u.id === seedUser.id || u.email.toLowerCase() === seedUser.email.toLowerCase()
          );
          if (!existing) {
            this.state!.users.push(seedUser);
          } else {
            existing.passwordHash = seedUser.passwordHash;
            existing.email = seedUser.email;
          }
        }

        // Synchronize creators as real users in db.users
        const defaultPasswordHash = seed.users[0]?.passwordHash || "";
        for (const creator of this.state!.creators) {
          const targetUserId = creator.userId || `user-c-${creator.id}`;
          if (!creator.userId) creator.userId = targetUserId;
          const cleanHandle = (creator.handle || creator.id).replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
          const targetEmail = (creator as any).email || `${cleanHandle}@abeycollab.io`;

          const existingUser = this.state!.users.find(
            (u) => u.id === targetUserId || u.email.toLowerCase() === targetEmail.toLowerCase()
          );

          if (!existingUser) {
            this.state!.users.push({
              id: targetUserId,
              name: creator.fullName,
              email: targetEmail,
              passwordHash: defaultPasswordHash,
              role: "creator",
              avatarUrl: creator.avatarUrl,
              verified: Boolean(creator.verified),
              country: creator.region || (creator.location?.includes("India") ? "IN" : "US"),
              createdAt: (creator as any).createdAt || new Date().toISOString(),
              updatedAt: (creator as any).updatedAt || new Date().toISOString(),
            });
          } else {
            if (!existingUser.avatarUrl && creator.avatarUrl) existingUser.avatarUrl = creator.avatarUrl;
            if (creator.verified && !existingUser.verified) existingUser.verified = true;
          }
        }

        // Synchronize brands as real users in db.users
        for (const brand of this.state!.brands) {
          const targetUserId = brand.userId || `user-b-${brand.id}`;
          if (!brand.userId) brand.userId = targetUserId;
          const cleanName = (brand.companyName || brand.id).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          const targetEmail = (brand as any).email || `contact@${cleanName}.com`;

          const existingUser = this.state!.users.find(
            (u) => u.id === targetUserId || u.email.toLowerCase() === targetEmail.toLowerCase()
          );

          if (!existingUser) {
            this.state!.users.push({
              id: targetUserId,
              name: brand.companyName,
              email: targetEmail,
              passwordHash: defaultPasswordHash,
              role: "brand",
              avatarUrl: brand.logoUrl,
              verified: Boolean(brand.verified),
              country: brand.location?.includes("India") ? "IN" : "US",
              createdAt: (brand as any).createdAt || new Date().toISOString(),
              updatedAt: (brand as any).updatedAt || new Date().toISOString(),
            });
          }
        }

        // Merge only the 3 seed subscriptions
        for (const seedSub of seed.subscriptions) {
          if (!this.state!.subscriptions.some((s) => s.userId === seedSub.userId)) {
            this.state!.subscriptions.push(seedSub);
          }
        }

        // Backfill functional demo profiles for databases created before the
        // demo profile seed existed. Never overwrite user-created profiles.
        for (const seedCreator of seed.creators) {
          if (!this.state!.creators.some((creator) => creator.userId === seedCreator.userId)) {
            this.state!.creators.push(seedCreator);
          }
        }
        for (const seedBrand of seed.brands) {
          if (!this.state!.brands.some((brand) => brand.userId === seedBrand.userId)) {
            this.state!.brands.push(seedBrand);
          }
        }
        if (!this.state!.campaigns || this.state!.campaigns.length === 0) {
          this.state!.campaigns = [...seed.campaigns];
        }
        if (!this.state!.conversations || this.state!.conversations.length === 0) {
          this.state!.conversations = [...seed.conversations];
        }
        if (!this.state!.messages || this.state!.messages.length <= 1) {
          this.state!.messages = [...seed.messages];
        }
        if (!this.state!.collaborations || this.state!.collaborations.length === 0) {
          this.state!.collaborations = [...MOCK_COLLABORATIONS];
        }

        // Idempotent multi-currency migration backfill
        for (const u of this.state!.users) {
          u.preferredCurrency = "INR";
          u.preferred_currency = "INR";
        }

        for (const c of this.state!.campaigns || []) {
          if (c.budget) {
            c.budget.currency = "INR";
          }
        }

        for (const col of this.state!.collaborations || []) {
          col.currency = "INR";
          for (const del of col.deliverables || []) {
            del.currency = "INR";
          }
        }

        for (const p of this.state!.payouts || []) {
          p.currency = "INR";
        }

        for (const cr of this.state!.creators || []) {
          cr.currency = "INR";
          for (const rc of cr.rateCards || []) {
            rc.currency = "INR";
          }
        }

        this.persist();
    } catch (err) {
      console.error("Failed to initialize database, falling back to in-memory seeds:", err);
      this.state = getInitialSeedDatabase();
      this.persist();
    }
  }

  private lastStatCheckTime = 0;

  private persist(): void {
    if (!this.state) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        try {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        } catch {
          // Ignore
        }
      }
      const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.state), "utf-8");
      fs.renameSync(tmpFile, DB_FILE);
      try {
        this.lastLoadedMtime = fs.statSync(DB_FILE).mtimeMs;
      } catch {
        this.lastLoadedMtime = Date.now();
      }
    } catch (err) {
      // In serverless environments where local filesystem might be read-only or ephemeral,
      // fail gracefully and keep in-memory state active.
      console.warn("Notice: Database disk persistence not available in current environment; using in-memory state.");
    }
  }

  public getState(): DatabaseState {
    if (!this.state) {
      this.ensureInitialized();
    } else {
      const now = Date.now();
      if (now - this.lastStatCheckTime > 500) {
        this.lastStatCheckTime = now;
        if (fs.existsSync(DB_FILE)) {
          try {
            const stats = fs.statSync(DB_FILE);
            if (stats.mtimeMs > this.lastLoadedMtime) {
              const raw = fs.readFileSync(DB_FILE, "utf-8");
              if (raw && raw.trim().startsWith("{")) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === "object" && Array.isArray(parsed.users)) {
                  this.state = parsed;
                  this.lastLoadedMtime = stats.mtimeMs;
                }
              }
            }
          } catch {
            // Keep in-memory
          }
        }
      }
    }
    return this.state!;
  }

  public updateState(updater: (state: DatabaseState) => void): DatabaseState {
    const current = this.getState();
    updater(current);
    this.persist();
    return current;
  }
}

// Global singleton instance across module reloads and serverless lambdas
const globalForDb = globalThis as unknown as { __valence_db_instance?: DatabaseClient };
export const db = globalForDb.__valence_db_instance ?? new DatabaseClient();
globalForDb.__valence_db_instance = db;
