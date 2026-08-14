import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors.js";
import { failure } from "../utils/httpResponse.util.js";

export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof AppError) {
    return failure(res, err.statusCode, err.message, err.error);
  }

  return failure(res, 500, "Internal server error")
}