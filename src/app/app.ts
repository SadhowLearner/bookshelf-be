import { Hono } from "hono";
import { requestId } from "hono/request-id";

import { errorHandler } from "../middleware/error-handler.middleware.js";
import { requestLoggerMiddleware } from "../middleware/request-logger.middleware.js";
import { healthRoutes } from "../modules/health/health.routes.js";
import { NotFoundError } from "../shared/errors/app-error.js";
import { errorResponse, successResponse } from "../shared/http/api-response.js";
import type { AppEnv } from "./app.types.js";

export const createApp = () => {
  const app = new Hono<AppEnv>();

  app.use("*", requestId());
  app.use("*", requestLoggerMiddleware);

  app.route("/health", healthRoutes);

  app.get("/", (c) =>
    successResponse(c, "Bookshelf API is running", {
      service: "bookshelf-api",
      healthCheck: "/health",
    }),
  );

  app.notFound((c) => {
    const error = new NotFoundError(`Route ${c.req.method} ${c.req.path} not found`);

    return errorResponse(c, error.message, error.statusCode, error.errors);
  });

  app.onError(errorHandler);

  return app;
};
