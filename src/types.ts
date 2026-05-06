export type GovernanceStatus = "publish-ready" | "needs-review" | "blocked";
export type SchemaValidationStatus = "valid" | "needs-review" | "invalid";
export type RedirectValidationStatus = "valid" | "warning" | "invalid";

export interface Site {
  id: string;
  name: string;
  domain: string;
  ownerTeam: string;
  platform: string;
  regions: string[];
  pageCount: number;
}

export interface Page {
  id: string;
  siteId: string;
  url: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  headings: string[];
  imageAltCoverage: number;
  schemaType: string;
  wordCount: number;
  status: "published" | "draft" | "review";
  contentHealth: "strong" | "thin" | "duplicate-risk";
}

export interface SeoAudit {
  id: string;
  pageId: string;
  auditedAt: string;
  score: number;
  status: GovernanceStatus;
  issues: string[];
}

export interface RedirectRule {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  statusCode: 301 | 302;
  notes: string;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  category: string;
  severity: "medium" | "high" | "critical";
  rule: string;
}

export interface PageValidationInput {
  url: string;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  headings: string[];
  imageAltCoverage: number;
  schemaType: string;
  wordCount: number;
  noindex?: boolean;
}

export interface PageValidationResult {
  status: GovernanceStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface SchemaValidationInput {
  schemaType: string;
  jsonLd: Record<string, unknown>;
}

export interface SchemaValidationResult {
  status: SchemaValidationStatus;
  allowed: boolean;
  issues: string[];
  passedChecks: string[];
}

export interface RedirectValidationInput {
  sourceUrl: string;
  targetUrl: string;
  statusCode: 301 | 302;
}

export interface RedirectValidationResult {
  status: RedirectValidationStatus;
  issues: string[];
  passedChecks: string[];
}

export interface PublishingCheckInput extends PageValidationInput {
  schemaJsonLd: Record<string, unknown>;
}

export interface PublishingCheckResult {
  status: GovernanceStatus;
  readinessScore: number;
  blockers: string[];
  warnings: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}
