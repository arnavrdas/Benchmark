import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

// Utils
import { BadRequestError } from "../errors/errors.js";

export const validate = (schema: AnyZodObject) => {
  
  return (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse({
      body:   req.body,
      params: req.params,
      query:  req.query,
    });

    if (!result.success) {
      throw new BadRequestError(
        "Validation failed",
        result.error.issues.map(issue => ({
          field:   issue.path.join("."),
          message: issue.message,
        }))
      )
    }

    Object.assign(req, result.data);

    next();
  };
};