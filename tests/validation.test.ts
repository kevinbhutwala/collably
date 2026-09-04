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

  // 3. Deliverable External Link Validation (Google Drive, Dropbox, Frame.io)
  const deliverableSubmissionSchema = z.object({
    assetUrl: z
      .string({ required_error: "assetUrl is required" })
      .url("Invalid URL format")
      .refine((url) => url.startsWith("https://"), {
        message: "assetUrl must start with https://",
      }),
    notes: z.string().optional(),
  });

  const validDriveSubmission = deliverableSubmissionSchema.safeParse({
    assetUrl: "https://drive.google.com/file/d/123456789/view?usp=sharing",
    notes: "Audio mastered at -14 LUFS, color graded.",
  });
  const validFrameIoSubmission = deliverableSubmissionSchema.safeParse({
    assetUrl: "https://app.frame.io/reviews/aethel-v1",
  });
  const invalidHttpSubmission = deliverableSubmissionSchema.safeParse({
    assetUrl: "http://insecure-storage.com/video.mp4",
  });
  const invalidNonUrlSubmission = deliverableSubmissionSchema.safeParse({
    assetUrl: "not-a-valid-url",
  });
  const missingAssetUrlSubmission = deliverableSubmissionSchema.safeParse({
    notes: "Only notes without link",
  });

  assert("7. Allow valid HTTPS Google Drive deliverable link", validDriveSubmission.success);
  assert("8. Allow valid HTTPS Frame.io deliverable link without notes", validFrameIoSubmission.success);
  assert("9. REJECT insecure non-HTTPS (http://) deliverable link", !invalidHttpSubmission.success);
  assert("10. REJECT malformed non-URL string", !invalidNonUrlSubmission.success);
  assert("11. REJECT submission missing required assetUrl", !missingAssetUrlSubmission.success);

  return { total, passed, failed: total - passed };
}
