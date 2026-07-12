import { serve } from "@hono/node-server";
import { createApp } from "./app/app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
const app = createApp();
serve({
    fetch: app.fetch,
    port: env.PORT,
}, (info) => {
    logger.info({
        host: info.address,
        port: info.port,
        family: info.family,
        message: `Listening at http://localhost:${info.port}`,
    });
});
