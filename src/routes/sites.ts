import { Router } from "express";
import { sites } from "../data.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(sites);
});

export default router;
