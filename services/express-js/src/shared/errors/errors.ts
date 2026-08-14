import type { InvalidRequestInterface } from "../types/error.type.js";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errors: InvalidRequestInterface[] | null = null,
  ) {
    super(message);
    this.name = this.constructor.name; // Changes the name of this error from "Error" to the name of the custom error class. Useful for degging and logging.
    Error.captureStackTrace(this, this.constructor); // For detailed stack tree
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string  = "Client error",
    errors: InvalidRequestInterface[],
  ) {
    super(400, message, errors);
  }
}

export class BadRequestError extends AppError {
  constructor(
    message: string  = "Client error",
  ) {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string  = "Authentication required",
  ) {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message: string  = "Not permitted",
  ) {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string  = "Resource not found",
  ) {
    super(404, message);
  }
}