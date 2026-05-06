import { Router } from "express";

const router = Router();
const startedAt = Date.now();

router.get("/", (_request, response) => {
  response.json({
    status: "ok",
    service: process.env.SERVICE_NAME || "SEO Governance Platform",
    uptimeSeconds: Number(((Date.now() - startedAt) / 1000).toFixed(3)),
    timestamp: new Date().toISOString(),
  });
});

export default router;
