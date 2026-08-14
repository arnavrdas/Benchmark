import { type Request, type Response } from "express";

// Services
import {
  svcFindUser,
  svcRegister,
  svcCheckPassword,
  svcGenerateToken
} from "./auth.service.js";

// Utils
import { success, failure } from "../../shared/utils/httpResponse.util.js";


export async function ctlRegister(req: Request, res: Response) {

  // Check if email is already registered
  const user = await svcFindUser(req);
  if (user.exists) {
    // return failure(res, 400, "Email is already registered");
  }

  // Register user
  const registerUser = await svcRegister(req);
  if(!registerUser) {
    // return failure(res, 500, "Registration failed");
  }

  // Generate Access Token
  else {
    return success(res, 201, "Registered successfully", await svcGenerateToken(registerUser));
  }
};


export async function ctlLogin(req: Request, res: Response) {

  // Check if email is registered
  const user = await svcFindUser(req);
  if (!user.exists) {
    // return failure(res, 400, "Incorrect email or password")
  }

  else if (user.data) {

    // Check if password if correct
    const validCredentials = await svcCheckPassword(req.body.password, user.data);
    if(!validCredentials) {
      // return failure(res, 400, "Incorrect email or password")
    }

    // Generate Access Token
    return success(res, 200, "Logged in successfully", await svcGenerateToken(user.data));
  }
};

export function authMiddlewareTest(req: Request, res: Response) {
  return success(res, 200, "Authenticated successfully");
}