import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "SEO Governance Platform");
});

test("GET /api/pages returns an array", async () => {
  const response = await request(app).get("/api/pages");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/validate/page returns score and status", async () => {
  const response = await request(app).post("/api/validate/page").send({
    url: "https://example.com/platform/seo-governance",
    title: "Enterprise SEO Governance Platform for Scalable Content Operations",
    metaDescription:
      "Centralized SEO QA workflows for metadata, schema, redirects, and publishing governance.",
    canonicalUrl: "https://example.com/platform/seo-governance",
    robots: "index,follow",
    headings: [
      "Enterprise SEO Governance",
      "Why Governance Matters",
      "Validation Workflow",
    ],
    imageAltCoverage: 0.92,
    schemaType: "SoftwareApplication",
    wordCount: 860,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("POST /api/validate/schema validates allowed and invalid schema input", async () => {
  const validResponse = await request(app).post("/api/validate/schema").send({
    schemaType: "SoftwareApplication",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SEO Governance Platform",
    },
  });

  const invalidResponse = await request(app).post("/api/validate/schema").send({
    schemaType: "MusicAlbum",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
    },
  });

  assert.equal(validResponse.status, 200);
  assert.equal(validResponse.body.status, "valid");
  assert.equal(invalidResponse.status, 200);
  assert.equal(invalidResponse.body.status, "invalid");
});

test("POST /api/validate/redirect catches an invalid redirect scenario", async () => {
  const response = await request(app).post("/api/validate/redirect").send({
    sourceUrl: "https://www.example.com/page-a",
    targetUrl: "https://www.example.com/page-a",
    statusCode: 301,
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "invalid");
  assert.ok(response.body.issues.length >= 1);
});
