import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

import type { AppEnv } from "../app/app.types.js";
import { logger } from "../lib/logger.js";
import {
  AppError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../shared/errors/app-error.js";
import { errorResponse } from "../shared/http/api-response.js";

const httpExceptionToAppError = (error: HTTPException): AppError => {
  switch (error.status) {
    case 400:
      return new ValidationError(error.message);
    case 401:
      return new UnauthorizedError(error.message);
    case 403:
      return new ForbiddenError(error.message);
    case 404:
      return new NotFoundError(error.message);
    case 409:
      return new ConflictError(error.message);
    default:
      return new InternalServerError(error.message);
  }
};

const normalizeError = (error: Error): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ValidationError("Validation failed", {
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (error instanceof HTTPException) {
    return httpExceptionToAppError(error);
  }

  return new InternalServerError();
};

export const errorHandler: ErrorHandler<AppEnv> = (error, c) => {
  const normalizedError = normalizeError(error);

  if (normalizedError.statusCode >= 500) {
    logger.error({
      requestId: c.get("requestId"),
      method: c.req.method,
      path: c.req.path,
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
  }

  return errorResponse(
    c,
    normalizedError.message,
    normalizedError.statusCode,
    normalizedError.errors,
  );
};
