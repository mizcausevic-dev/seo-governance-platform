# SEO Governance Platform Architecture

## Service Overview

SEO Governance Platform models an internal validation service used by enterprise marketing, content, SEO, and engineering teams before pages or redirect changes move into production.

It centralizes:

- metadata policy checks
- canonical and robots validation
- image accessibility coverage checks
- JSON-LD allow-list enforcement
- redirect chain and loop detection
- publishing-readiness scoring

## Request Flow

1. A page, schema payload, or redirect proposal is submitted to a validation endpoint.
2. The request body is validated with Zod.
3. The governance service compares the payload against policy thresholds and sample site inventory.
4. The service calculates issues, passed checks, and a governance status.
5. Publishing workflows consume the result through `/api/publishing-check` or dashboard endpoints.

## Endpoint Map

- `GET /health`
- `GET /api/sites`
- `GET /api/pages`
- `GET /api/pages/:id`
- `GET /api/audits`
- `GET /api/redirects`
- `GET /api/policies`
- `GET /api/dashboard/summary`
- `POST /api/validate/page`
- `POST /api/validate/schema`
- `POST /api/validate/redirect`
- `POST /api/publishing-check`

## Governance Model

### Page Validation

The page validation workflow scores:

- title length and uniqueness
- meta description length
- canonical presence and self-reference
- robots format
- heading depth
- image alt-text coverage
- allowed structured data type
- content depth / thin-content risk

### Schema Validation

Schema validation checks:

- approved schema type
- valid `@context`
- `@type` alignment
- required `name` field presence

### Redirect Validation

Redirect validation checks:

- source and target are distinct
- no redirect chain introduction
- no loop behavior
- supported status code

## Security Notes

- Requests are validated before service logic runs.
- Configuration remains environment-driven.
- Error responses are centralized and consistent.
- CI, Dependabot, and CodeQL support ongoing hygiene.

## Future Production Upgrades

- persist audits, pages, and redirect rules in PostgreSQL
- connect publishing workflows to CMS webhooks
- add scheduled crawl ingestion for sitewide QA
- integrate Search Console and log-file signals
- add user roles and policy override approvals
