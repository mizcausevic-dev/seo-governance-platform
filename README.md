# SEO Governance Platform

> **TypeScript technical SEO governance portfolio project** demonstrating metadata QA, canonical enforcement, structured data validation, redirect governance, and publishing-readiness workflows for enterprise websites.

**Recruiter takeaway:** *"This person understands technical SEO as a platform governance problem, not just a content checklist."*

---

## Project Overview

| Attribute | Detail |
|---|---|
| **Runtime** | Node.js + TypeScript |
| **Framework** | Express 5 |
| **Domain** | Enterprise SEO governance and publishing QA |
| **Validation Areas** | Metadata · Canonicals · Robots · Schema · Redirects · Content readiness |
| **Operational Outputs** | Audit records · Policy checks · Publishing-readiness scoring |
| **Docs** | Swagger UI at `/docs` |

---

## Executive Summary

SEO Governance Platform models the kind of internal service enterprise web teams use to keep large sites compliant before new content, product pages, migrations, or redirects go live. Instead of treating SEO as a lightweight checklist, the project frames it as an operational control layer between marketing, content, web engineering, and platform governance.

The API validates metadata quality, canonical integrity, robots directives, structured data, redirect safety, and content depth, then translates those checks into a publishing-readiness score and clear operator actions. That makes the repo feel like a realistic internal platform capability rather than a toy SEO audit script.

---

## Architecture

```text
Content or URL change request
    |
    v
POST /api/validate/*
    |
    +--> Request validation
    +--> Governance rule checks
    +--> Metadata and content scoring
    +--> Schema or redirect safety review
    |
    v
Publishing readiness decision
    |
    +--> publish-ready
    +--> needs-review
    +--> blocked
```

### Governance Workflow

1. Teams submit a page payload, schema payload, or redirect proposal.
2. The service validates request shape with Zod.
3. Governance logic checks metadata, canonicals, robots directives, heading depth, alt-text coverage, schema type allow-lists, and redirect safety.
4. The service returns a score, issues, passed checks, and recommended next action.
5. Operators use `/api/dashboard/summary`, `/api/audits`, `/api/policies`, and `/api/redirects` for visibility into governance posture.

---

## Validation Model

### Page Validation

Page scoring covers:

- title length and uniqueness
- meta description range
- canonical presence and self-reference
- robots directive validity
- heading depth
- image alt-text coverage
- allowed schema type
- thin-content and duplicate-risk indicators

### Redirect Validation

Redirect review catches:

- source/target equality
- chain introduction
- loop behavior
- unsupported status code usage

### Publishing Readiness

The publishing-check endpoint combines page and schema review into a single operational decision:

- `publish-ready`
- `needs-review`
- `blocked`

---

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Service status and uptime |
| `GET` | `/api/sites` | List governed sites |
| `GET` | `/api/pages` | List governed pages |
| `GET` | `/api/pages/:id` | Fetch one page record |
| `GET` | `/api/audits` | List audit history |
| `GET` | `/api/redirects` | List redirect rules |
| `GET` | `/api/policies` | List governance policies |
| `GET` | `/api/dashboard/summary` | Governance summary view |
| `POST` | `/api/validate/page` | Validate page metadata and content readiness |
| `POST` | `/api/validate/schema` | Validate structured data |
| `POST` | `/api/validate/redirect` | Validate redirect safety |
| `POST` | `/api/publishing-check` | Run combined publishing-readiness workflow |

---

## Sample Validation Request

```json
{
  "url": "https://example.com/platform/seo-governance",
  "title": "Enterprise SEO Governance Platform for Scalable Content Operations",
  "metaDescription": "Centralized SEO QA workflows for metadata, schema, redirects, and publishing governance.",
  "canonicalUrl": "https://example.com/platform/seo-governance",
  "robots": "index,follow",
  "headings": [
    "Enterprise SEO Governance",
    "Why Governance Matters",
    "Validation Workflow"
  ],
  "imageAltCoverage": 0.92,
  "schemaType": "SoftwareApplication",
  "wordCount": 860
}
```

## Sample Validation Response

```json
{
  "status": "needs-review",
  "score": 66,
  "issues": [
    "Title length falls outside the enterprise governance range of 45 to 65 characters.",
    "Title is not unique across the page set, increasing duplicate-targeting risk.",
    "Meta description falls outside the recommended 120 to 160 character range."
  ],
  "passedChecks": [
    "Canonical URL is present and self-referential.",
    "Robots directive is valid.",
    "Structured data type is allowed by governance policy."
  ],
  "recommendedNextAction": "Route to content strategy or web QA review before publishing."
}
```

---

## Screenshots

### Hero Capture

![Swagger UI](https://raw.githubusercontent.com/mizcausevic-dev/seo-governance-platform/project/seo-governance-platform/screenshots/01-hero.png)

### Governance Validation Workflow

![Validation workflow](https://raw.githubusercontent.com/mizcausevic-dev/seo-governance-platform/project/seo-governance-platform/screenshots/02-feature.png)

### Publishing Readiness Proof

![Publishing proof](https://raw.githubusercontent.com/mizcausevic-dev/seo-governance-platform/project/seo-governance-platform/screenshots/03-proof.png)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/mizcausevic-dev/seo-governance-platform.git
cd seo-governance-platform
npm install
cp .env.example .env
npm run dev
```

Visit:

- `http://localhost:3000/docs`
- `http://localhost:3000/api/pages`
- `http://localhost:3000/api/dashboard/summary`

### Run Tests

```bash
npm test
```

---

## What This Demonstrates

- technical SEO translated into enforceable backend rules
- metadata and canonical governance thinking
- redirect migration risk reduction
- collaboration-aware platform design for content, marketing, and engineering teams
- production-minded TypeScript API structure with docs, tests, and policy visibility

---

## Future Enhancements

- persist governance records in PostgreSQL
- connect CMS publish workflows through webhooks
- add crawl ingestion for large-site QA snapshots
- integrate Search Console and log-file inputs
- support policy overrides with approval workflows

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Zod
- Swagger / OpenAPI
- Helmet
- CORS
- Morgan
- Node test runner + Supertest

### Portfolio Links

- [LinkedIn](https://www.linkedin.com/in/mirzacausevic)
- [Skills Page](https://mizcausevic.com/skills/)
- [Medium](https://medium.com/@mizcausevic)
- [GitHub](https://github.com/mizcausevic-dev)

---

*Part of [mizcausevic-dev's GitHub portfolio](https://github.com/mizcausevic-dev) — demonstrating enterprise SEO governance, web platform operations, and technical content quality systems.*
