import { Router } from "express";
import { redirectRules } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(redirectRules);
});

export default router;
