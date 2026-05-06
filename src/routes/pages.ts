import { Router } from "express";
import { pages } from "../data.js";
import { HttpError } from "../middleware/errorHandler.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(pages);
});

router.get("/:id", (request, response, next) => {
  const page = pages.find((entry) => entry.id === request.params.id);

  if (!page) {
    next(new HttpError(404, `Page not found: ${request.params.id}`));
    return;
  }

  response.json(page);
});

export default router;
