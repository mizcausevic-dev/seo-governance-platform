import { Router } from "express";
import { audits } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(audits);
});

export default router;
