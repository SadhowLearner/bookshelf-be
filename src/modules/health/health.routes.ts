import { Hono } from "hono";

import type { AppEnv } from "../../app/app.types.js";
import { successResponse } from "../../shared/http/api-response.js";

export const healthRoutes = new Hono<AppEnv>();

healthRoutes.get("/", (c) =>
  successResponse(c, "Bookshelf API is healthy", {
    status: "ok",
    uptime: process.uptime(),
  }),
);
