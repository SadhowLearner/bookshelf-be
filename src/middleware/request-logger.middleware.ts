import type { MiddlewareHandler } from "hono";

import type { AppEnv } from "../app/app.types.js";
import { logger } from "../lib/logger.js";

export const requestLoggerMiddleware: MiddlewareHandler<AppEnv> = async (
  c,
  next,
) => {
  const startTime = performance.now();

  await next();

  const responseTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

  logger.info({
    requestId: c.get("requestId"),
    method: c.req.method,
    path: c.req.path,
    statusCode: c.res.status,
    responseTimeMs,
  });
};
