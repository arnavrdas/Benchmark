import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  
  return (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse({
      body:   req.body,
      params: req.params,
      query:  req.query,
    });

    if (!result.success) {
      // console.dir(result, { depth: null });
      // console.log(result.error.issues);

      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.format(),
      });
    }

    Object.assign(req, result.data);

    next();
  };
};