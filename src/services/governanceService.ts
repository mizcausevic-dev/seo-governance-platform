import {
  allowedSchemaTypes,
  governancePolicies,
  pages,
  redirectRules,
} from "../data.js";
import type {
  GovernanceStatus,
  PageValidationInput,
  PageValidationResult,
  PublishingCheckInput,
  PublishingCheckResult,
  RedirectValidationInput,
  RedirectValidationResult,
  SchemaValidationInput,
  SchemaValidationResult,
} from "../types.js";

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

function statusFromScore(score: number, hasCriticalIssue: boolean): GovernanceStatus {
  if (hasCriticalIssue || score < 60) {
    return "blocked";
  }

  if (score < 90) {
    return "needs-review";
  }

  return "publish-ready";
}

export function validatePage(input: PageValidationInput): PageValidationResult {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 100;

  const duplicateTitle = pages.find(
    (page) =>
      page.title.toLowerCase() === input.title.toLowerCase() &&
      normalizeUrl(page.url) !== normalizeUrl(input.url),
  );

  if (input.title.length < 45 || input.title.length > 65) {
    issues.push("Title length falls outside the enterprise governance range of 45 to 65 characters.");
    score -= 12;
  } else {
    passedChecks.push("Title length aligns with enterprise metadata policy.");
  }

  if (duplicateTitle) {
    issues.push("Title is not unique across the page set, increasing duplicate-targeting risk.");
    score -= 14;
  } else {
    passedChecks.push("Title is unique across the modeled page inventory.");
  }

  if (input.metaDescription.length < 120 || input.metaDescription.length > 160) {
    issues.push("Meta description falls outside the recommended 120 to 160 character range.");
    score -= 8;
  } else {
    passedChecks.push("Meta description fits governance policy.");
  }

  if (!input.canonicalUrl) {
    issues.push("Canonical URL is missing.");
    score -= 20;
  } else if (normalizeUrl(input.canonicalUrl) !== normalizeUrl(input.url)) {
    issues.push("Canonical URL is present but not self-referential for the reviewed page.");
    score -= 18;
  } else {
    passedChecks.push("Canonical URL is present and self-referential.");
  }

  if (!/^(index|noindex),(follow|nofollow)$/i.test(input.robots)) {
    issues.push("Robots directive does not match an approved pattern.");
    score -= 10;
  } else {
    passedChecks.push("Robots directive is valid.");
  }

  if (input.noindex && normalizeUrl(input.canonicalUrl) === normalizeUrl(input.url)) {
    issues.push("Noindex combined with a self-referential canonical creates a governance conflict.");
    score -= 18;
  }

  if (input.headings.length < 3) {
    issues.push("Heading structure is too shallow for an enterprise landing page.");
    score -= 10;
  } else {
    passedChecks.push("Heading structure has enough depth for structured content scanning.");
  }

  if (input.imageAltCoverage < 0.85) {
    issues.push("Image alt-text coverage is below the 85% accessibility threshold.");
    score -= 10;
  } else {
    passedChecks.push("Image alt-text coverage clears the accessibility target.");
  }

  if (!allowedSchemaTypes.includes(input.schemaType)) {
    issues.push("Structured data type is not on the governance allow-list.");
    score -= 15;
  } else {
    passedChecks.push("Structured data type is allowed by governance policy.");
  }

  if (input.wordCount < 700) {
    issues.push("Content depth appears thin for a competitive enterprise page.");
    score -= 12;
  } else {
    passedChecks.push("Content depth clears the minimum editorial threshold.");
  }

  const finalScore = Math.max(0, score);
  const status = statusFromScore(
    finalScore,
    issues.some((issue) =>
      issue.includes("Canonical") || issue.includes("governance conflict"),
    ),
  );

  const recommendedNextAction =
    status === "publish-ready"
      ? "Approve for publishing and monitor in the next scheduled audit cycle."
      : status === "needs-review"
        ? "Route to content strategy or web QA review before publishing."
        : "Block release until metadata, canonical, or content governance issues are resolved.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function validateSchema(input: SchemaValidationInput): SchemaValidationResult {
  const issues: string[] = [];
  const passedChecks: string[] = [];

  if (!allowedSchemaTypes.includes(input.schemaType)) {
    issues.push("Schema type is not on the approved enterprise allow-list.");
  } else {
    passedChecks.push("Schema type is on the approved allow-list.");
  }

  if (input.jsonLd["@context"] !== "https://schema.org") {
    issues.push("JSON-LD must declare the schema.org context.");
  } else {
    passedChecks.push("JSON-LD context is valid.");
  }

  if (input.jsonLd["@type"] !== input.schemaType) {
    issues.push("JSON-LD @type must match the declared schemaType field.");
  } else {
    passedChecks.push("JSON-LD @type matches the requested schema type.");
  }

  if (!("name" in input.jsonLd)) {
    issues.push("JSON-LD is missing a required name field.");
  } else {
    passedChecks.push("Required name field is present.");
  }

  const status =
    issues.length === 0
      ? "valid"
      : issues.some((issue) => issue.includes("allow-list") || issue.includes("@type"))
        ? "invalid"
        : "needs-review";

  return {
    status,
    allowed: status !== "invalid",
    issues,
    passedChecks,
  };
}

export function validateRedirect(
  input: RedirectValidationInput,
): RedirectValidationResult {
  const issues: string[] = [];
  const passedChecks: string[] = [];

  const normalizedSource = normalizeUrl(input.sourceUrl);
  const normalizedTarget = normalizeUrl(input.targetUrl);

  if (normalizedSource === normalizedTarget) {
    issues.push("Redirect source and target cannot be identical.");
  } else {
    passedChecks.push("Source and target are distinct URLs.");
  }

  const chainedRule = redirectRules.find(
    (rule) => normalizeUrl(rule.sourceUrl) === normalizedTarget,
  );

  if (chainedRule) {
    issues.push("Redirect target already acts as another redirect source, creating a chain risk.");
  } else {
    passedChecks.push("Redirect target does not introduce an existing chain.");
  }

  const loopRule = redirectRules.find(
    (rule) =>
      normalizeUrl(rule.sourceUrl) === normalizedTarget &&
      normalizeUrl(rule.targetUrl) === normalizedSource,
  );

  if (loopRule) {
    issues.push("Redirect loop detected between source and target.");
  }

  if (input.statusCode !== 301 && input.statusCode !== 302) {
    issues.push("Status code must be 301 or 302.");
  } else {
    passedChecks.push("Redirect status code is supported.");
  }

  const status =
    issues.length === 0
      ? "valid"
      : issues.some((issue) => issue.includes("loop") || issue.includes("identical"))
        ? "invalid"
        : "warning";

  return {
    status,
    issues,
    passedChecks,
  };
}

export function runPublishingCheck(
  input: PublishingCheckInput,
): PublishingCheckResult {
  const pageReview = validatePage(input);
  const schemaReview = validateSchema({
    schemaType: input.schemaType,
    jsonLd: input.schemaJsonLd,
  });

  const blockers = [
    ...pageReview.issues.filter((issue) =>
      issue.includes("Canonical") || issue.includes("conflict"),
    ),
    ...schemaReview.issues.filter((issue) =>
      issue.includes("allow-list") || issue.includes("@type"),
    ),
  ];

  const warnings = [
    ...pageReview.issues.filter((issue) => !blockers.includes(issue)),
    ...schemaReview.issues.filter((issue) => !blockers.includes(issue)),
  ];

  const readinessScore = Math.max(
    0,
    Math.round(pageReview.score - warnings.length * 2 - blockers.length * 6),
  );

  const status = blockers.length
    ? "blocked"
    : readinessScore >= 90
      ? "publish-ready"
      : "needs-review";

  const recommendedNextAction =
    status === "publish-ready"
      ? "Approve page publishing and include it in the next scheduled governance crawl."
      : status === "needs-review"
        ? "Route to content strategy review before publishing."
        : "Hold publishing until canonical, schema, or structural blockers are cleared.";

  return {
    status,
    readinessScore,
    blockers,
    warnings,
    passedChecks: [...pageReview.passedChecks, ...schemaReview.passedChecks],
    recommendedNextAction,
  };
}

export function getDashboardSummary() {
  const blockedAudits = pages.filter((page) => page.contentHealth === "thin").length;
  const duplicateRiskPages = pages.filter(
    (page) => page.contentHealth === "duplicate-risk",
  ).length;

  return {
    siteCount: 3,
    pageCount: pages.length,
    policyCount: governancePolicies.length,
    blockedAuditCount: blockedAudits,
    duplicateRiskPages,
    recentAuditStatuses: {
      publishReady: 0,
      needsReview: 2,
      blocked: 1,
    },
    highestRiskAreas: [
      "Canonical integrity on launch pages",
      "Thin product content on security platform URLs",
      "Redirect-chain risk during legacy URL migrations",
    ],
  };
}
