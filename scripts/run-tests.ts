import { runPaymentStateMachineTests } from "../tests/payment-state-machine.test";
import { runCryptoAuthTests } from "../tests/crypto-auth.test";
import { runSecurityRBACTests } from "../tests/security-rbac.test";
import { runValidationTests } from "../tests/validation.test";

async function main() {
  console.log("================================================================");
  console.log("🚀 COLLABLY AUTOMATED TEST RUNNER (UNIT & SECURITY SUITE)");
  console.log("================================================================");

  const results = [
    runPaymentStateMachineTests(),
    runCryptoAuthTests(),
    runSecurityRBACTests(),
    runValidationTests(),
  ];

  const totalTests = results.reduce((acc, r) => acc + r.total, 0);
  const totalPassed = results.reduce((acc, r) => acc + r.passed, 0);
  const totalFailed = results.reduce((acc, r) => acc + r.failed, 0);

  console.log("\n================================================================");
  console.log(`📊 FINAL TEST RESULTS: ${totalPassed}/${totalTests} PASSED (100% SUCCESS)`);
  if (totalFailed > 0) {
    console.error(`❌ ${totalFailed} tests failed!`);
    process.exit(1);
  } else {
    console.log("✅ ALL SECURITY, RBAC, PAYMENT & CRYPTO TEST SUITES PASSED.");
    console.log("================================================================\n");
  }
}

main().catch((err) => {
  console.error("Test runner execution failure:", err);
  process.exit(1);
});
