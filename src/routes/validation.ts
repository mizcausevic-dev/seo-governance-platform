import { Router } from "express";
import { z } from "zod";
import {
  runPublishingCheck,
  validatePage,
  validateRedirect,
  validateSchema,
} from "../services/governanceService.js";

const router = Router();

const pageValidationSchema = z.object({
  url: z.string().url(),
  title: z.string().min(5),
  metaDescription: z.string().min(10),
  canonicalUrl: z.string().url(),
  robots: z.string().min(5),
  headings: z.array(z.string().min(1)).min(1),
  imageAltCoverage: z.number().min(0).max(1),
  schemaType: z.string().min(2),
  wordCount: z.number().int().nonnegative(),
  noindex: z.boolean().optional(),
});

const schemaValidationSchema = z.object({
  schemaType: z.string().min(2),
  jsonLd: z.record(z.unknown()),
});

const redirectValidationSchema = z.object({
  sourceUrl: z.string().url(),
  targetUrl: z.string().url(),
  statusCode: z.union([z.literal(301), z.literal(302)]),
});

const publishingCheckSchema = pageValidationSchema.extend({
  schemaJsonLd: z.record(z.unknown()),
});

router.post("/validate/page", (request, response) => {
  const input = pageValidationSchema.parse(request.body);
  response.json(validatePage(input));
});

router.post("/validate/schema", (request, response) => {
  const input = schemaValidationSchema.parse(request.body);
  response.json(validateSchema(input));
});

router.post("/validate/redirect", (request, response) => {
  const input = redirectValidationSchema.parse(request.body);
  response.json(validateRedirect(input));
});

router.post("/publishing-check", (request, response) => {
  const input = publishingCheckSchema.parse(request.body);
  response.json(runPublishingCheck(input));
});

export default router;
