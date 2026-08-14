import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors.js";
import { failure } from "../utils/httpResponse.util.js";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  if (err instanceof AppError) {
    return failure(res, err.statusCode, err.message, err.errors);
  }
  
  if (err instanceof SyntaxError) {
    return failure(res, 400, "Syntax Error in Request", null);
  }
  
  console.error(err);
  
  return failure(res, 500, "Internal server error")
}