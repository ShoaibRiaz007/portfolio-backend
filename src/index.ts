import { type ApiReferenceConfiguration, Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { projectsRoute } from "./routes/projects";
import { testimonialsRoute } from "./routes/testimonials";
import { logger as pinoLogger } from "./utils/logger";
import { openApiDocument } from "./utils/openapi";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// Register all routes
app.route("/api/projects", projectsRoute);
app.route("/api/testimonials", testimonialsRoute);

// Scalar Docs
app.get(
  "/docs",
  Scalar({
    spec: {
      url: "/openapi.json",
    },
  } as unknown as ApiReferenceConfiguration),
);

// OpenAPI Spec.
app.get("/openapi.json", (c) => {
  return c.json(openApiDocument);
});

Bun.serve({
  fetch: app.fetch,
  port: process.env["PORT"] || 8080,
});

pinoLogger.info(`Server Running on Port: ${process.env["PORT"] || 8080}.`);
