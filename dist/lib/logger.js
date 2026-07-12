import pino from "pino";
import { env } from "../config/env.js";
export const logger = pino({
    level: env.LOG_LEVEL,
    redact: {
        paths: [
            "password",
            "passwordHash",
            "token",
            "accessToken",
            "refreshToken",
            "authorization",
            "secret",
            "*.password",
            "*.passwordHash",
            "*.token",
            "*.accessToken",
            "*.refreshToken",
            "*.authorization",
            "*.secret",
        ],
        censor: "[REDACTED]",
    },
});
