import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Config
import env from "../../config/env.config.js";

// Types
import type { AuthUser } from "../types/jwt.type.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  
  const authHeader = req.headers.authorization;

  // Check if Authorization Header exists
  if(!authHeader) {
    return res.status(401).json({ response: "Missing Token" });
  }

  // Separate JWT token from "Bearer "
  const token = authHeader.split(" ")[1];

  // Check if Authorization Header exists
  if(!token) {
    return res.status(401).json({ response:"Invalid token format" });
  }

  try {

    // Check if JWT token is valid
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    
    // Add JWT payload to req as 'user' object
    req.user = decoded; // TypeScript doesn't show error here because "user" is added as an optional property to Express's Request type in ./src/shared/declartions/express.d.ts

    next();
  }
  catch(err) {
    return res.status(401).json({ response: "Invalid Token" });
  }
}