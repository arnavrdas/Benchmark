export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    err: unknown
  ) {
    super(message);
    this.error = err;
    this.name = this.constructor.name; // Changes the name of this error from "Error" to the name of the custom error class. Useful for degging and logging.
    Error.captureStackTrace(this, this.constructor); // For detailed stack tree
  }

  error: unknown;
}

export class BadRequestError extends AppError {
  constructor(
    message: string  = "Bad request",
    err:     unknown = null
  ) {
    super(400, message, err);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string  = "Unauthorized",
    err:     unknown = null
  ) {
    super(401, message, err);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string  = "Resource not found",
    err:     unknown = null
  ) {
    super(404, message, err);
  }
}