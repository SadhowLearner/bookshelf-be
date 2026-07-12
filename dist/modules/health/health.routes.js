import { Hono } from "hono";
import { successResponse } from "../../shared/http/api-response.js";
export const healthRoutes = new Hono();
healthRoutes.get("/", (c) => successResponse(c, "Bookshelf API is healthy", {
    status: "ok",
    uptime: process.uptime(),
}));
