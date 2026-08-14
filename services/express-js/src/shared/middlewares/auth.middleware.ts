import jwt from "jsonwebtoken";

// Config
import env from "../../config/env.config.js";

// Types
import type { NextFunction, Request, Response } from "express";
import type { AuthUserInterface } from "../types/auth.type.js";

// Errors
import { UnauthorizedError } from "../errors/errors.js";

/**************************************************
* Middlewares
**************************************************/

export function authenticate(req: Request, res: Response, next: NextFunction) {
  
  // Check if Authorization Header exists
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    throw new UnauthorizedError("Authorization token required");
  }

  // Separate JWT token from "Bearer "
  const token = authHeader.split(" ")[1];

  // Check if Authorization Header exists
  if(!token) {
    throw new UnauthorizedError("Authorization token required")
  }

  try {

    // Check if JWT token is valid
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserInterface;
    
    // Add JWT payload to req as 'user' object
    req.user = decoded; // TypeScript doesn't show error here because "user" is added as an optional property to Express's Request type in ./src/shared/declartions/express.d.ts

    next();
  }
  catch(err) {
    throw new UnauthorizedError("Invalid token")
  }
}