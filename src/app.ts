import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import healthRouter from "./routes/health.js";
import sitesRouter from "./routes/sites.js";
import pagesRouter from "./routes/pages.js";
import auditsRouter from "./routes/audits.js";
import redirectsRouter from "./routes/redirects.js";
import policiesRouter from "./routes/policies.js";
import validationRouter from "./routes/validation.js";
import dashboardRouter from "./routes/dashboard.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const docsPath = path.join(process.cwd(), "docs", "openapi.yaml");
const openApiDocument = yaml.load(
  fs.readFileSync(docsPath, "utf8"),
) as Parameters<typeof swaggerUi.setup>[0];

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/health", healthRouter);
app.use("/api/sites", sitesRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/audits", auditsRouter);
app.use("/api/redirects", redirectsRouter);
app.use("/api/policies", policiesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", validationRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
