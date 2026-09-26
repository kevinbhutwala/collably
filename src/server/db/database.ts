import fs from "fs";
import path from "path";
import { DatabaseState } from "./schema";
import { getInitialSeedDatabase } from "./seed";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";
import bundledDbJson from "../../../data/valence_db.json";

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
          rawState = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
          this.lastLoadedMtime = fs.statSync(DB_FILE).mtimeMs;
        } catch {
          rawState = null;
        }
      } else if (fs.existsSync(BUNDLED_DB_FILE)) {
        try {
          rawState = JSON.parse(fs.readFileSync(BUNDLED_DB_FILE, "utf-8"));
        } catch {
          rawState = null;
        }
      }

      if (!rawState) {
        rawState = JSON.parse(JSON.stringify(bundledDbJson)) as DatabaseState;
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
          if (!u.preferredCurrency && !u.preferred_currency) {
            const isIndia = u.country === "IN" || (u.email && u.email.endsWith(".in"));
            const defCurrency = isIndia ? "INR" : "USD";
            u.preferredCurrency = defCurrency;
            u.preferred_currency = defCurrency;
          } else {
            if (!u.preferredCurrency) u.preferredCurrency = u.preferred_currency;
            if (!u.preferred_currency) u.preferred_currency = u.preferredCurrency;
          }
        }

        for (const c of this.state!.campaigns || []) {
          if (c.budget && !c.budget.currency) {
            c.budget.currency = "USD";
          }
        }

        for (const col of this.state!.collaborations || []) {
          if (!col.currency) {
            col.currency = "USD";
          }
          for (const del of col.deliverables || []) {
            if (!del.currency) {
              del.currency = col.currency;
            }
          }
        }

        for (const p of this.state!.payouts || []) {
          if (!p.currency) {
            p.currency = "USD";
          }
        }

        for (const cr of this.state!.creators || []) {
          if (!cr.currency) {
            const isIndia = cr.location && cr.location.toLowerCase().includes("india");
            cr.currency = isIndia ? "INR" : "USD";
          }
          for (const rc of cr.rateCards || []) {
            if (!rc.currency) {
              rc.currency = cr.currency;
            }
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
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state), "utf-8");
      this.lastLoadedMtime = Date.now();
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
      if (now - this.lastStatCheckTime > 250) {
        this.lastStatCheckTime = now;
        if (fs.existsSync(DB_FILE)) {
          try {
            const stats = fs.statSync(DB_FILE);
            if (stats.mtimeMs > this.lastLoadedMtime) {
              const raw = fs.readFileSync(DB_FILE, "utf-8");
              const parsed = JSON.parse(raw);
              if (parsed && typeof parsed === "object") {
                this.state = parsed;
                this.lastLoadedMtime = stats.mtimeMs;
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
