import crypto from "crypto";
import fs from "fs";
import path from "path";

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) return false;
  const parts = storedHash.split(":");
  const salt = parts[0];
  const originalHash = parts[1];
  const iterations = parts.length > 2 ? parseInt(parts[2], 10) : 1000;

  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");

  try {
    const hashBuf = Buffer.from(hash, "hex");
    const origBuf = Buffer.from(originalHash, "hex");
    if (hashBuf.length !== origBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, origBuf);
  } catch {
    return false;
  }
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 210000, 64, "sha512").toString("hex");
  return `${salt}:${hash}:210000`;
}

const dbPath = path.join(process.cwd(), "data", "valence_db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

console.log(`Loaded database from ${dbPath}. Total users: ${db.users.length}`);

const requiredAccounts = [
  { email: "kevinbhutwala417@gmail.com", password: "admin123", expectedRole: "agency_admin" },
  { email: "creator@abeycollab.io", password: "password123", expectedRole: "creator" },
  { email: "brand@abeycollab.io", password: "password123", expectedRole: "brand" },
  { email: "creator@collably.io", password: "password123", expectedRole: "creator" },
  { email: "brand@collably.io", password: "password123", expectedRole: "brand" },
];

let modified = false;

for (const req of requiredAccounts) {
  let user = db.users.find((u) => u.email.toLowerCase() === req.email.toLowerCase());
  if (!user) {
    console.log(`[SEED] Adding missing user: ${req.email} (${req.expectedRole})`);
    const now = new Date().toISOString();
    user = {
      id: req.expectedRole === "agency_admin" ? "user-owner" : `user-${req.expectedRole}-${Date.now()}`,
      name: req.expectedRole === "agency_admin" ? "Kevin Bhutwala" : `Demo ${req.expectedRole.charAt(0).toUpperCase() + req.expectedRole.slice(1)}`,
      email: req.email,
      passwordHash: hashPassword(req.password),
      role: req.expectedRole,
      avatarUrl: "",
      verified: true,
      createdAt: now,
      updatedAt: now,
    };
    db.users.push(user);
    modified = true;
  }

  const isValid = verifyPassword(req.password, user.passwordHash);
  if (!isValid) {
    console.log(`[FIX] Updating password hash for: ${req.email}`);
    user.passwordHash = hashPassword(req.password);
    modified = true;
  }

  const check = verifyPassword(req.password, user.passwordHash);
  if (!check) {
    console.error(`❌ Verification failed for ${req.email}`);
    process.exit(1);
  } else {
    console.log(`✅ Verified Account: ${req.email} | Role: ${user.role} | Password Check: PASS`);
  }
}

if (modified) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  console.log("Updated and saved data/valence_db.json with synchronized hashes.");
}
