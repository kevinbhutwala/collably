import { z } from "zod";

export const CreatorCategoryEnum = z.enum([
  'Technology & AI',
  'Fashion & Style',
  'Fitness & Wellness',
  'Gaming & Esports',
  'Travel & Hospitality',
  'Beauty & Skincare',
  'Food & Culinary',
  'Finance & Business',
  'Design & Creative',
  'Lifestyle & Culture',
]);

export const PlatformTypeEnum = z.enum([
  'instagram',
  'youtube',
  'tiktok',
  'x',
  'linkedin',
  'podcast',
]);

export const DeliverableTypeEnum = z.enum([
  'Instagram Reel',
  'Instagram Story Set (3x)',
  'Instagram Dedicated Post',
  'Carousel Post',
  'YouTube Dedicated Video',
  'YouTube 60s Integration',
  'YouTube Short',
  'TikTok Video',
  'UGC Video Ad',
  'X (Twitter) Thread',
  'Keynote / Event Appearance',
]);

// Auth Schemas
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, "Please enter your email address or creator handle"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export const CreatorRegisterSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  handle: z.string().trim().min(2, "Handle must be at least 2 characters").max(60),
  primaryCategory: CreatorCategoryEnum,
  location: z.string().trim().min(2, "Location is required"),
  instagramHandle: z.string().optional(),
  instagramFollowers: z.number().nonnegative().optional(),
  youtubeHandle: z.string().optional(),
  youtubeSubscribers: z.number().nonnegative().optional(),
  tiktokHandle: z.string().optional(),
  tiktokFollowers: z.number().nonnegative().optional(),
  xHandle: z.string().optional(),
  xFollowers: z.number().nonnegative().optional(),
  linkedinHandle: z.string().optional(),
  linkedinFollowers: z.number().nonnegative().optional(),
  startingPrice: z.number().min(1, "Starting price must be greater than 0"),
  currency: z.string().optional(),
  bio: z.string().max(2000).optional().or(z.literal("")),
});

export const BrandRegisterSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required").max(120),
  contactName: z.string().trim().min(2, "Contact person name is required").max(120),
  email: z.string().trim().email("Please enter a valid work email address").max(254),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  websiteUrl: z
    .string()
    .trim()
    .url("Please enter a valid website URL (e.g. https://brand.com)")
    .optional()
    .or(z.literal("")),
  industry: z.string().trim().min(2, "Industry is required"),
  companySize: z.string().optional().or(z.literal("")),
  monthlyBudget: z.string().optional().or(z.literal("")),
});

// Campaign Creation Schema (7-Step Wizard)
export const CampaignCreationSchema = z.object({
  // Step 1: Basics
  title: z.string().min(5, 'Campaign title must be at least 5 characters'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  description: z.string().min(30, 'Detailed campaign brief must be at least 30 characters'),
  category: CreatorCategoryEnum,
  coverImage: z.string().url('Please provide a valid image URL'),

  // Step 2: Target Audience
  targetLocations: z.array(z.string()).min(1, 'Select at least one target location'),
  targetAgeRanges: z.array(z.string()).min(1, 'Select at least one target age range'),
  targetGender: z.enum(['All', 'Female', 'Male', 'Mixed']),
  targetInterests: z.array(z.string()).min(1, 'Add at least one interest tag'),

  // Step 3: Creator Requirements
  minFollowers: z.number().min(1000, 'Minimum followers must be at least 1,000'),
  minEngagementRate: z.number().min(0.5, 'Minimum engagement rate must be at least 0.5%'),
  requiredPlatforms: z.array(PlatformTypeEnum).min(1, 'Select at least one platform'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  preferredTiers: z.array(z.enum(['Nano', 'Micro', 'Mid-Tier', 'Macro', 'Elite'])).min(1),

  // Step 4: Deliverables
  deliverables: z.array(
    z.object({
      type: DeliverableTypeEnum,
      count: z.number().min(1),
      guidelines: z.string().min(10, 'Guidelines must be specified'),
      specifications: z.array(z.string()),
      maxRevisions: z.number().min(1).max(5),
    })
  ).min(1, 'Add at least one deliverable requirement'),

  // Step 5: Budget & Escrow
  totalBudget: z.number().min(1, 'Total budget must be at least 1'),
  perCreatorBudget: z.number().min(1, 'Per-creator budget must be at least 1'),
  paymentTerms: z.enum(['50_50_escrow', '100_escrow_on_approval', 'milestone']),
  performanceBonus: z.string().optional(),

  // Step 6: Timeline
  applicationDeadline: z.string().min(1, 'Application deadline is required'),
  startDate: z.string().min(1, 'Campaign start date is required'),
  contentSubmissionDeadline: z.string().min(1, 'Content submission deadline is required'),
  campaignEndDate: z.string().min(1, 'Campaign end date is required'),

  // Capacity
  maxCreators: z.number().min(1).max(50),
});

export const ApplicationSubmissionSchema = z.object({
  campaignId: z.string().uuid().or(z.string().min(1)),
  pitch: z.string().min(30, 'Pitch must be at least 30 characters detailing your creative angle'),
  proposedFee: z.number().min(1, 'Fee proposal must be greater than 0'),
  estimatedReach: z.number().min(100),
  sampleLinks: z.array(z.string().url('Must be valid URL')).min(1, 'Provide at least 1 previous work link'),
});

export const DeliverableExternalSubmissionSchema = z.object({
  assetUrl: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => url.startsWith("https://"), {
      message: "Asset link must start with https://",
    }),
  notes: z.string().optional(),
});

export const ContentSubmissionSchema = z.object({
  deliverableId: z.string().min(1),
  assetUrl: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => url.startsWith("https://"), {
      message: "Asset link must start with https://",
    }),
  notes: z.string().optional(),
  mediaUrls: z.array(z.string().url()).optional(),
  captionText: z.string().optional(),
  trackingLink: z.string().url().optional().or(z.literal('')),
  creatorNotes: z.string().optional(),
});

export const RevisionRequestSchema = z.object({
  feedback: z.string().min(15, 'Please provide clear feedback explaining what edits are requested'),
  timeExtensionDays: z.number().min(0).max(14).default(3),
});
