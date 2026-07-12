export class AppError extends Error {
    statusCode;
    errors;
    isOperational = true;
    constructor(message, statusCode, errors) {
        super(message);
        this.name = new.target.name;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export class ValidationError extends AppError {
    constructor(message = "Validation failed", errors) {
        super(message, 400, errors);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", errors) {
        super(message, 401, errors);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden", errors) {
        super(message, 403, errors);
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Resource not found", errors) {
        super(message, 404, errors);
    }
}
export class ConflictError extends AppError {
    constructor(message = "Resource conflict", errors) {
        super(message, 409, errors);
    }
}
export class InternalServerError extends AppError {
    constructor(message = "Internal server error", errors) {
        super(message, 500, errors);
    }
}
