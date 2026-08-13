import jwt from "jsonwebtoken";

// Config
import env from "../../config/env.config.js";

// Utils
import { failure } from "../../shared/utils/httpResponse.util.js";

// Types
import type { NextFunction, Request, Response } from "express";
import type { AuthUser } from "./auth.type.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  
  
  // Check if Authorization Header exists
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return failure(res, 401, "Missing token");
  }

  // Separate JWT token from "Bearer "
  const token = authHeader.split(" ")[1];

  // Check if Authorization Header exists
  if(!token) {
    return failure(res, 401, "Invalid token format");
  }

  try {

    // Check if JWT token is valid
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    
    // Add JWT payload to req as 'user' object
    req.user = decoded; // TypeScript doesn't show error here because "user" is added as an optional property to Express's Request type in ./src/shared/declartions/express.d.ts

    next();
  }
  catch(err) {
    return failure(res, 401, "Invalid token")
  }
}