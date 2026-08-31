import { SecurityService } from "../src/server/services/security.service";

export function runSecurityRBACTests(): { total: number; passed: number; failed: number } {
  console.log("\n🛡️ --- TEST SUITE: Role-Based Access Control & Rate Limiting ---");
  let passed = 0;
  let total = 0;

  function assert(name: string, condition: boolean, details?: string) {
    total++;
    if (condition) {
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${details ? `(${details})` : ""}`);
    }
  }

  // 1. Creator permission checks
  assert("1. Creator can submit deliverables", SecurityService.hasPermission("creator", "deliverable.submit"));
  assert("2. Creator CANNOT approve deliverables", !SecurityService.hasPermission("creator", "deliverable.approve"));
  assert("3. Creator CANNOT create brand campaigns", !SecurityService.hasPermission("creator", "campaign.create"));

  // 2. Brand permission checks
  assert("4. Brand can create campaigns", SecurityService.hasPermission("brand", "campaign.create"));
  assert("5. Brand can approve deliverables", SecurityService.hasPermission("brand", "deliverable.approve"));
  assert("6. Brand CANNOT submit deliverable drafts", !SecurityService.hasPermission("brand", "deliverable.submit"));

  // 3. Admin elevated permissions
  assert("7. Admin has universal access", SecurityService.hasPermission("super_admin", "admin.override"));

  // 4. In-memory Rate Limiting functionality
  const key = `test_ip_${Date.now()}`;
  const r1 = SecurityService.checkRateLimit(key, 3, 60);
  const r2 = SecurityService.checkRateLimit(key, 3, 60);
  const r3 = SecurityService.checkRateLimit(key, 3, 60);
  const r4 = SecurityService.checkRateLimit(key, 3, 60); // Exceeds limit

  assert("8. Rate limit permits initial requests", r1.allowed && r2.allowed && r3.allowed);
  assert("9. Rate limit blocks request when threshold exceeded", !r4.allowed && r4.remaining === 0);

  return { total, passed, failed: total - passed };
}
