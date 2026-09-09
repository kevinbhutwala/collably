import { db } from "../db/database";
import {
  CreatorProfile,
  Campaign,
  ExplainableMatchResult,
  MatchFactorBreakdown,
  ParsedBriefQuery,
  CreatorCategory,
  PlatformType,
} from "@/core/types";
import { formatCurrency } from "@/core/utils/currency";

export class MatchEngineService {
  private static instance: MatchEngineService;

  public static getInstance(): MatchEngineService {
    if (!MatchEngineService.instance) {
      MatchEngineService.instance = new MatchEngineService();
    }
    return MatchEngineService.instance;
  }

  /**
   * Computes comprehensive 6-factor explainable compatibility between a creator and a campaign.
   */
  public calculateMatch(creator: CreatorProfile, campaign: Campaign): ExplainableMatchResult {
    const state = db.getState();
    const strengths: string[] = [];
    const growthOps: string[] = [];

    // 1. Category / Niche Alignment (weight 0.25)
    let catScore = 50;
    let catRationale = "";
    if (creator.primaryCategory === campaign.category) {
      catScore = 98;
      catRationale = `Exact primary niche match in ${campaign.category}.`;
      strengths.push(`Core specialty directly matches ${campaign.category}`);
    } else if (creator.secondaryCategories?.includes(campaign.category)) {
      catScore = 85;
      catRationale = `Strong secondary niche alignment in ${campaign.category}.`;
      strengths.push(`Cross-domain competence in ${campaign.category}`);
    } else {
      catScore = 55;
      catRationale = `Adjacent category niche; potential for fresh audience perspective.`;
      growthOps.push(`Category pivot required: ${creator.primaryCategory} → ${campaign.category}`);
    }

    // 2. Audience & Follower Bracket Alignment (weight 0.20)
    let audScore = 70;
    let audRationale = "";
    const minFollowers = campaign.creatorRequirements?.minFollowers || 10000;
    const reqTiers = campaign.creatorRequirements?.preferredTiers || [];

    if (creator.totalFollowers >= minFollowers) {
      if (reqTiers.length === 0 || reqTiers.includes(creator.tier)) {
        audScore = 96;
        audRationale = `Follower scale (${Math.round(creator.totalFollowers / 1000)}k) and ${creator.tier} tier align with campaign target.`;
        strengths.push(`Audience scale aligns with preferred ${creator.tier} distribution`);
      } else {
        audScore = 82;
        audRationale = `Meets follower minimum (${Math.round(creator.totalFollowers / 1000)}k vs ${Math.round(minFollowers / 1000)}k min).`;
      }
    } else {
      audScore = 60;
      audRationale = `Audience count (${Math.round(creator.totalFollowers / 1000)}k) is below target threshold (${Math.round(minFollowers / 1000)}k).`;
      growthOps.push(`Lower follower scale than target`);
    }

    // Check platform overlap
    const creatorPlatforms = (creator.socialAccounts || []).map((s) => s.platform);
    const campaignPlatforms = campaign.creatorRequirements?.platforms || [];
    const sharedPlatforms = campaignPlatforms.filter((p) => creatorPlatforms.includes(p));
    if (sharedPlatforms.length > 0) {
      audScore = Math.min(100, audScore + 4);
      strengths.push(`Active presence on requested channels: ${sharedPlatforms.join(", ")}`);
    }

    // 3. Budget Alignment (weight 0.20)
    let budScore = 75;
    let budRationale = "";
    const campaignBudget = campaign.budget?.perCreatorBudget || 1500;
    const creatorRate = creator.startingPrice || 1000;

    if (campaignBudget >= creatorRate) {
      const surplus = ((campaignBudget - creatorRate) / creatorRate) * 100;
      if (surplus <= 50) {
        budScore = 98;
        budRationale = `Optimal budget alignment: creator's $${creatorRate} base fits inside $${campaignBudget} budget.`;
        strengths.push(`Highly competitive pricing with room for premium deliverables`);
      } else {
        budScore = 92;
        budRationale = `Creator base price ($${creatorRate}) is well within the allocated budget ($${campaignBudget}).`;
      }
    } else {
      const deficit = ((creatorRate - campaignBudget) / creatorRate) * 100;
      if (deficit <= 25) {
        budScore = 72;
        budRationale = `Rate card ($${creatorRate}) slightly above budget ($${campaignBudget}); negotiable with custom scope.`;
        growthOps.push(`Slight budget gap: $${creatorRate} rate vs $${campaignBudget} budget`);
      } else {
        budScore = 50;
        budRationale = `Creator base ($${creatorRate}) significantly exceeds current budget ($${campaignBudget}).`;
        growthOps.push(`Rate mismatch may require scope downsizing`);
      }
    }

    // 4. Location & Regional Reach Match (weight 0.15)
    let locScore = 75;
    let locRationale = "";
    const targetLocations = campaign.targetAudience?.locations || [];
    const creatorLocation = creator.location || "Worldwide";

    if (targetLocations.length === 0 || creatorLocation === "Worldwide") {
      locScore = 90;
      locRationale = `Broad geographic audience distribution suitable for multi-region reach.`;
    } else {
      const directMatch = targetLocations.some((loc) =>
        creatorLocation.toLowerCase().includes(loc.toLowerCase())
      );
      if (directMatch) {
        locScore = 98;
        locRationale = `Creator is based in target territory (${creatorLocation}).`;
        strengths.push(`Direct regional presence in target market (${creatorLocation})`);
      } else {
        // Check audience demographics top countries
        const topCountries = creator.audience?.topCountries?.map((c) => c.country.toLowerCase()) || [];
        const countryMatch = targetLocations.some((loc) => topCountries.includes(loc.toLowerCase()));
        if (countryMatch) {
          locScore = 88;
          locRationale = `Creator audience heavily concentrates in specified campaign territory.`;
          strengths.push(`Audience demographically aligned with campaign geo`);
        } else {
          locScore = 65;
          locRationale = `Audience geography is primarily outside primary campaign focus.`;
          growthOps.push(`Audience geo-distribution not concentrated in focus regions`);
        }
      }
    }

    // 5. Engagement Health (weight 0.10)
    let engScore = 70;
    let engRationale = "";
    const minEng = campaign.creatorRequirements?.minEngagementRate || 3.0;
    const actualEng = creator.avgEngagementRate || 2.5;

    if (actualEng >= minEng * 1.5) {
      engScore = 98;
      engRationale = `Exceptional ${actualEng}% engagement surpasses requirement (${minEng}%).`;
      strengths.push(`High audience responsiveness (${actualEng}% vs ${minEng}% min)`);
    } else if (actualEng >= minEng) {
      engScore = 90;
      engRationale = `Meets target engagement standards at ${actualEng}%.`;
    } else {
      engScore = 62;
      engRationale = `Engagement (${actualEng}%) is below preferred threshold (${minEng}%).`;
      growthOps.push(`Engagement slightly below target threshold`);
    }

    // 6. Reliability & Review Track Record (weight 0.10)
    let relScore = 85;
    let relRationale = "";
    const reliability = state.reliabilityScores?.find((r) => r.userId === creator.userId);
    const scoreVal = reliability?.score ?? (creator.qualityScore || 90);
    const ratingVal = creator.rating || 4.85;

    if (scoreVal >= 90 && ratingVal >= 4.8) {
      relScore = 98;
      relRationale = `Tier-1 track record: ${ratingVal}★ rating and flawless escrow completion.`;
      strengths.push(`Verified on-time delivery track record & zero escrow disputes`);
    } else if (scoreVal >= 75) {
      relScore = 88;
      relRationale = `Consistent performer with proven campaign delivery.`;
    } else {
      relScore = 70;
      relRationale = `Emerging track record with promising initial scores.`;
    }

    const factors: MatchFactorBreakdown = {
      categoryMatch: { score: catScore, weight: 0.25, rationale: catRationale },
      audienceMatch: { score: audScore, weight: 0.20, rationale: audRationale },
      budgetMatch: { score: budScore, weight: 0.20, rationale: budRationale },
      locationMatch: { score: locScore, weight: 0.15, rationale: locRationale },
      engagementMatch: { score: engScore, weight: 0.10, rationale: engRationale },
      reliabilityMatch: { score: relScore, weight: 0.10, rationale: relRationale },
    };

    const overallScore = Math.min(99, Math.round(
      catScore * factors.categoryMatch.weight +
      audScore * factors.audienceMatch.weight +
      budScore * factors.budgetMatch.weight +
      locScore * factors.locationMatch.weight +
      engScore * factors.engagementMatch.weight +
      relScore * factors.reliabilityMatch.weight
    ));

    const matchTier: "Perfect" | "Strong" | "Good" | "Moderate" =
      overallScore >= 92 ? "Perfect" :
      overallScore >= 82 ? "Strong" :
      overallScore >= 70 ? "Good" : "Moderate";

    const summary = `Strong ${creator.primaryCategory} audience in ${creator.location || "target region"}, engagement (${actualEng}%) is aligned with your campaign requirements, and their average collaboration rate fits your budget.`;

    return {
      overallScore,
      matchTier,
      summary,
      factors,
      keyStrengths: strengths.slice(0, 3),
      growthOpportunities: growthOps.slice(0, 2),
    };
  }

  /**
   * Natural Language Brief Query Parser:
   * Parses text such as:
   * "fitness creator from Mumbai with 50K-250K followers and ₹30K budget"
   */
  public parseBriefQuery(text: string): ParsedBriefQuery {
    const q = text.toLowerCase();
    const extractedTags: string[] = [];

    // 1. Detect Category
    let category: CreatorCategory | undefined;
    const categoryMap: { keywords: string[]; cat: CreatorCategory }[] = [
      { keywords: ["tech", "ai", "software", "code", "hardware", "gadget", "developer"], cat: "Technology & AI" },
      { keywords: ["fitness", "gym", "workout", "wellness", "health", "yoga", "nutrition"], cat: "Fitness & Wellness" },
      { keywords: ["design", "creative", "art", "architecture", "ui", "ux", "cinematography"], cat: "Design & Creative" },
      { keywords: ["fashion", "style", "outfit", "wardrobe", "luxury", "clothing"], cat: "Fashion & Style" },
      { keywords: ["beauty", "skincare", "makeup", "cosmetics", "dermatology"], cat: "Beauty & Skincare" },
      { keywords: ["finance", "business", "crypto", "investing", "stocks", "wealth", "fintech"], cat: "Finance & Business" },
      { keywords: ["gaming", "esports", "streamer", "twitch", "gameplay"], cat: "Gaming & Esports" },
      { keywords: ["lifestyle", "travel", "vlog", "wanderlust", "nomad"], cat: "Lifestyle & Travel" },
      { keywords: ["food", "culinary", "recipe", "chef", "cooking", "bakery"], cat: "Food & Culinary" },
      { keywords: ["education", "science", "edtech", "learning", "stem"], cat: "Education & Science" },
    ];

    for (const item of categoryMap) {
      const matches = item.keywords.some((kw) => {
        if (kw.length <= 3) {
          const regex = new RegExp(`\\b${kw}\\b`, "i");
          return regex.test(text);
        }
        return q.includes(kw);
      });
      if (matches) {
        category = item.cat;
        extractedTags.push(item.cat);
        break;
      }
    }


    // 2. Detect City / Location
    let location: string | undefined;
    const cities = [
      "mumbai", "delhi", "bangalore", "bengaluru", "san francisco", "new york",
      "london", "berlin", "tokyo", "paris", "toronto", "singapore", "dubai", "hyderabad", "pune"
    ];
    for (const city of cities) {
      if (q.includes(city)) {
        location = city.charAt(0).toUpperCase() + city.slice(1);
        extractedTags.push(location);
        break;
      }
    }

    // 3. Detect Follower Ranges (e.g. 50k-250k or >100k or under 50k)
    let minFollowers: number | undefined;
    let maxFollowers: number | undefined;

    const followerRangeRegex = /(\d+)\s*(k|m)?\s*[-–to]+\s*(\d+)\s*(k|m)?\s*followers?/i;
    const rangeMatch = text.match(followerRangeRegex);
    if (rangeMatch) {
      const val1 = parseInt(rangeMatch[1], 10) * (rangeMatch[2]?.toLowerCase() === "m" ? 1000000 : 1000);
      const val2 = parseInt(rangeMatch[3], 10) * (rangeMatch[4]?.toLowerCase() === "m" ? 1000000 : 1000);
      minFollowers = Math.min(val1, val2);
      maxFollowers = Math.max(val1, val2);
      extractedTags.push(`${minFollowers / 1000}k-${maxFollowers / 1000}k Followers`);
    } else {
      const underFollower = /(under|<|less than)\s*(\d+)\s*(k|m)?/i.exec(text);
      if (underFollower) {
        maxFollowers = parseInt(underFollower[2], 10) * (underFollower[3]?.toLowerCase() === "m" ? 1000000 : 1000);
        extractedTags.push(`< ${maxFollowers / 1000}k Followers`);
      }
      const overFollower = /(over|>|more than|at least)\s*(\d+)\s*(k|m)?/i.exec(text);
      if (overFollower) {
        minFollowers = parseInt(overFollower[2], 10) * (overFollower[3]?.toLowerCase() === "m" ? 1000000 : 1000);
        extractedTags.push(`> ${minFollowers / 1000}k Followers`);
      }
    }

    // 4. Detect Budget (e.g. ₹30k or $2500 or under 40000)
    let minBudget: number | undefined;
    let maxBudget: number | undefined;
    let currency = "USD";

    if (text.includes("₹") || q.includes("inr") || q.includes("rupees")) currency = "INR";
    if (text.includes("€") || q.includes("eur")) currency = "EUR";
    if (text.includes("£") || q.includes("gbp")) currency = "GBP";

    const budgetRegex = /(?:₹|\$|€|£|inr|usd)?\s*(\d+)\s*(k)?\s*(?:budget|price|rate|cost)?/i;
    const budgetMatch = text.match(/(?:under|budget of|max|upto|up to|₹|\$)\s*(?:₹|\$)?\s*(\d+)\s*(k)?/i);
    if (budgetMatch) {
      let bVal = parseInt(budgetMatch[1], 10);
      if (budgetMatch[2]?.toLowerCase() === "k") bVal *= 1000;
      maxBudget = bVal;
      extractedTags.push(`Max ${formatCurrency(bVal, currency as any)}`);
    }

    // 5. Detect Platforms
    const platforms: PlatformType[] = [];
    if (q.includes("youtube") || q.includes("yt")) { platforms.push("youtube"); extractedTags.push("YouTube"); }
    if (q.includes("instagram") || q.includes("ig") || q.includes("reels")) { platforms.push("instagram"); extractedTags.push("Instagram"); }
    if (q.includes("twitter") || q.includes(" x ")) { platforms.push("x"); extractedTags.push("X"); }
    if (q.includes("linkedin")) { platforms.push("linkedin"); extractedTags.push("LinkedIn"); }

    // 6. Detect Engagement Requirement
    let minEngagementRate: number | undefined;
    const engMatch = /(\d+(?:\.\d+)?)\s*%\s*eng/i.exec(text);
    if (engMatch) {
      minEngagementRate = parseFloat(engMatch[1]);
      extractedTags.push(`≥ ${minEngagementRate}% Eng`);
    } else if (q.includes("high engagement")) {
      minEngagementRate = 4.0;
      extractedTags.push("High Engagement (≥4%)");
    }

    return {
      rawQuery: text,
      category,
      location,
      minFollowers,
      maxFollowers,
      minBudget,
      maxBudget,
      currency,
      platforms: platforms.length > 0 ? platforms : undefined,
      minEngagementRate,
      extractedTags,
    };
  }

  /**
   * Evaluates all creators against a parsed brief query, returning ranked results with match scores.
   */
  public searchCreatorsWithParsedBrief(
    parsed: ParsedBriefQuery,
    limit: number = 20
  ): { creator: CreatorProfile; matchResult: ExplainableMatchResult }[] {
    const state = db.getState();
    const creators = state.creators || [];

    // Synthesize a dummy campaign from the parsed brief query
    const syntheticCampaign: Campaign = {
      id: "brief-query-syn",
      brandId: "brand-searcher",
      title: parsed.rawQuery,
      slug: "query-search",
      tagline: parsed.rawQuery,
      description: parsed.rawQuery,
      category: parsed.category || "Technology & AI",
      targetAudience: {
        locations: parsed.location ? [parsed.location] : [],
        ageRanges: ["25-34"],
        gender: "All",
        interests: parsed.extractedTags,
      },
      creatorRequirements: {
        minFollowers: parsed.minFollowers || 5000,
        minEngagementRate: parsed.minEngagementRate || 3.0,
        platforms: parsed.platforms && parsed.platforms.length > 0 ? parsed.platforms : ["youtube", "instagram"],
        languages: ["English"],
        preferredTiers: [],
      },
      deliverables: [],
      budget: {
        totalBudget: (parsed.maxBudget || 2500) * 3,
        perCreatorBudget: parsed.maxBudget || 2500,
        currency: (parsed.currency as any) || "USD",
        paymentTerms: "50_50_escrow",

      },
      timeline: {
        applicationDeadline: new Date(Date.now() + 30 * 86400000).toISOString(),
        startDate: new Date().toISOString(),
        contentSubmissionDeadline: new Date(Date.now() + 45 * 86400000).toISOString(),
        campaignEndDate: new Date(Date.now() + 60 * 86400000).toISOString(),
      },
      status: "active",
      applicantsCount: 0,
      acceptedCount: 0,
      maxCreators: 5,
      coverImage: "",
      featured: false,
      brand: state.brands[0] || ({ id: "brand-searcher", companyName: "Searching Brand" } as any),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };


    const results = creators.map((creator) => ({
      creator,
      matchResult: this.calculateMatch(creator, syntheticCampaign),
    }));

    return results
      .sort((a, b) => b.matchResult.overallScore - a.matchResult.overallScore)
      .slice(0, limit);
  }
}

export const matchEngineService = MatchEngineService.getInstance();
