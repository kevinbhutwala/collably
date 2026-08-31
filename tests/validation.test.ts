import { z } from "zod";

export function runValidationTests(): { total: number; passed: number; failed: number } {
  console.log("\n📐 --- TEST SUITE: Schema Validation & MIME Security ---");
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

  // 1. Campaign schema validation
  const campaignSchema = z.object({
    title: z.string().min(3),
    budget: z.number().positive(),
  });

  const validCamp = campaignSchema.safeParse({ title: "Summer Campaign", budget: 5000 });
  const invalidCamp = campaignSchema.safeParse({ title: "No", budget: -100 });

  assert("1. Valid campaign schema parses successfully", validCamp.success);
  assert("2. Reject invalid negative budget campaign", !invalidCamp.success);

  // 2. MIME type whitelist check
  const ALLOWED_MIME_TYPES = [
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  function isAllowedMime(mime: string) {
    return ALLOWED_MIME_TYPES.includes(mime);
  }

  assert("3. Allow MP4 video upload", isAllowedMime("video/mp4"));
  assert("4. Allow PNG image upload", isAllowedMime("image/png"));
  assert("5. REJECT executable script upload (application/x-sh)", !isAllowedMime("application/x-sh"));
  assert("6. REJECT dangerous HTML upload (text/html)", !isAllowedMime("text/html"));

  return { total, passed, failed: total - passed };
}
