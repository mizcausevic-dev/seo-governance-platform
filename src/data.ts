import type {
  GovernancePolicy,
  Page,
  RedirectRule,
  SeoAudit,
  Site,
} from "./types.js";

export const allowedSchemaTypes = [
  "Article",
  "SoftwareApplication",
  "FAQPage",
  "BreadcrumbList",
  "HowTo",
  "Product",
];

export const sites: Site[] = [
  {
    id: "site_01",
    name: "Northstar Cloud",
    domain: "www.northstarcloud.com",
    ownerTeam: "Web Platform",
    platform: "Next.js + headless CMS",
    regions: ["US", "EMEA"],
    pageCount: 1840,
  },
  {
    id: "site_02",
    name: "SignalForge Security",
    domain: "www.signalforge.io",
    ownerTeam: "Growth Engineering",
    platform: "Drupal enterprise stack",
    regions: ["Global"],
    pageCount: 920,
  },
  {
    id: "site_03",
    name: "Atlas Analytics",
    domain: "www.atlasanalytics.ai",
    ownerTeam: "Digital Experience",
    platform: "WordPress multisite",
    regions: ["US", "LATAM"],
    pageCount: 610,
  },
];

export const pages: Page[] = [
  {
    id: "page_01",
    siteId: "site_01",
    url: "https://www.northstarcloud.com/platform/seo-governance",
    title: "Enterprise SEO Governance Platform for Scalable Content Operations",
    metaDescription:
      "Centralized SEO QA workflows for metadata, schema, redirects, and publishing governance across enterprise web programs.",
    canonicalUrl: "https://www.northstarcloud.com/platform/seo-governance",
    robots: "index,follow",
    headings: [
      "Enterprise SEO Governance",
      "Why Governance Matters",
      "Validation Workflow",
    ],
    imageAltCoverage: 0.92,
    schemaType: "SoftwareApplication",
    wordCount: 860,
    status: "published",
    contentHealth: "strong",
  },
  {
    id: "page_02",
    siteId: "site_01",
    url: "https://www.northstarcloud.com/resources/technical-seo-checklist",
    title: "Technical SEO Checklist for Enterprise Teams",
    metaDescription:
      "A practical enterprise checklist for metadata, canonicals, redirects, crawl directives, and schema coverage.",
    canonicalUrl:
      "https://www.northstarcloud.com/resources/technical-seo-checklist",
    robots: "index,follow",
    headings: [
      "Technical SEO Checklist",
      "Metadata QA",
      "Redirect Governance",
    ],
    imageAltCoverage: 0.88,
    schemaType: "Article",
    wordCount: 1220,
    status: "published",
    contentHealth: "strong",
  },
  {
    id: "page_03",
    siteId: "site_02",
    url: "https://www.signalforge.io/platform/managed-detection",
    title: "Managed Detection",
    metaDescription: "Security product page for managed detection workflows.",
    canonicalUrl: "https://www.signalforge.io/platform/managed-detection",
    robots: "index,follow",
    headings: ["Managed Detection", "Threat Coverage"],
    imageAltCoverage: 0.71,
    schemaType: "Product",
    wordCount: 410,
    status: "review",
    contentHealth: "thin",
  },
  {
    id: "page_04",
    siteId: "site_03",
    url: "https://www.atlasanalytics.ai/blog/enterprise-dashboard-template",
    title: "Enterprise Dashboard Template for RevOps Leaders",
    metaDescription:
      "Template guidance for analytics, funnel reporting, and GTM performance reviews.",
    canonicalUrl:
      "https://www.atlasanalytics.ai/blog/enterprise-dashboard-template",
    robots: "index,follow",
    headings: [
      "Enterprise Dashboard Template",
      "Metrics Coverage",
      "Operational Rollout",
    ],
    imageAltCoverage: 0.95,
    schemaType: "Article",
    wordCount: 980,
    status: "published",
    contentHealth: "duplicate-risk",
  },
];

export const audits: SeoAudit[] = [
  {
    id: "audit_01",
    pageId: "page_01",
    auditedAt: "2026-05-05T14:10:00.000Z",
    score: 88,
    status: "needs-review",
    issues: [
      "Content depth is slightly below enterprise editorial target for a competitive non-brand topic.",
    ],
  },
  {
    id: "audit_02",
    pageId: "page_03",
    auditedAt: "2026-05-04T11:40:00.000Z",
    score: 54,
    status: "blocked",
    issues: [
      "Title is too short for target topic breadth.",
      "Image alt-text coverage is below policy threshold.",
      "Heading structure is incomplete for a primary product page.",
    ],
  },
  {
    id: "audit_03",
    pageId: "page_04",
    auditedAt: "2026-05-03T09:15:00.000Z",
    score: 79,
    status: "needs-review",
    issues: ["Duplicate-content risk detected against a neighboring campaign page."],
  },
];

export const redirectRules: RedirectRule[] = [
  {
    id: "redirect_01",
    sourceUrl: "https://www.northstarcloud.com/seo-governance",
    targetUrl: "https://www.northstarcloud.com/platform/seo-governance",
    statusCode: 301,
    notes: "legacy campaign slug cleanup",
  },
  {
    id: "redirect_02",
    sourceUrl: "https://www.signalforge.io/detection",
    targetUrl: "https://www.signalforge.io/platform/managed-detection",
    statusCode: 301,
    notes: "navigation consolidation",
  },
  {
    id: "redirect_03",
    sourceUrl: "https://www.atlasanalytics.ai/old-dashboard-template",
    targetUrl: "https://www.atlasanalytics.ai/blog/dashboard-template",
    statusCode: 302,
    notes: "short-term campaign redirect",
  },
];

export const governancePolicies: GovernancePolicy[] = [
  {
    id: "policy_01",
    name: "Canonical integrity",
    category: "metadata",
    severity: "critical",
    rule: "Canonical URL must be present and self-referential for canonical pages.",
  },
  {
    id: "policy_02",
    name: "Title quality",
    category: "metadata",
    severity: "high",
    rule: "Primary page titles should land between 45 and 65 characters and remain unique across the site.",
  },
  {
    id: "policy_03",
    name: "Meta description range",
    category: "metadata",
    severity: "medium",
    rule: "Descriptions should typically land between 120 and 160 characters.",
  },
  {
    id: "policy_04",
    name: "Image accessibility threshold",
    category: "content-quality",
    severity: "high",
    rule: "Image alt-text coverage should remain at or above 85%.",
  },
  {
    id: "policy_05",
    name: "Schema allow-list",
    category: "structured-data",
    severity: "high",
    rule: "JSON-LD types must map to an approved governance allow-list.",
  },
  {
    id: "policy_06",
    name: "Redirect hygiene",
    category: "redirects",
    severity: "critical",
    rule: "Redirects must not create loops or multi-hop chains for canonical URLs.",
  },
];
