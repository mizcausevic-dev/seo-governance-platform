import { Router } from "express";
import { governancePolicies } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(governancePolicies);
});

export default router;
