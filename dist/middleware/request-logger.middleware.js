import { logger } from "../lib/logger.js";
export const requestLoggerMiddleware = async (c, next) => {
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
