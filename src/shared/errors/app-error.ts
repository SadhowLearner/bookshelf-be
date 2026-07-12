import type { ContentfulStatusCode } from "hono/utils/http-status";

export type ErrorDetails = Record<string, unknown> | Array<Record<string, unknown>>;

export abstract class AppError extends Error {
  public readonly statusCode: ContentfulStatusCode;
  public readonly errors?: ErrorDetails;
  public readonly isOperational = true;

  protected constructor(
    message: string,
    statusCode: ContentfulStatusCode,
    errors?: ErrorDetails,
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class ValidationError extends AppError {
  public constructor(message = "Validation failed", errors?: ErrorDetails) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends AppError {
  public constructor(message = "Unauthorized", errors?: ErrorDetails) {
    super(message, 401, errors);
  }
}

export class ForbiddenError extends AppError {
  public constructor(message = "Forbidden", errors?: ErrorDetails) {
    super(message, 403, errors);
  }
}

export class NotFoundError extends AppError {
  public constructor(message = "Resource not found", errors?: ErrorDetails) {
    super(message, 404, errors);
  }
}

export class ConflictError extends AppError {
  public constructor(message = "Resource conflict", errors?: ErrorDetails) {
    super(message, 409, errors);
  }
}

export class InternalServerError extends AppError {
  public constructor(message = "Internal server error", errors?: ErrorDetails) {
    super(message, 500, errors);
  }
}
