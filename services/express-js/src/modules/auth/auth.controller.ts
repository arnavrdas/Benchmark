import { type Request, type Response } from "express";

// Services
import {
  svcRegister,
  svcLogin,
} from "./auth.service.js";

// Utils
import { success, failure } from "../../shared/utils/httpResponse.util.js";

/**************************************************
* Controllers
**************************************************/

export async function ctlRegister(req: Request, res: Response) {
  return success(res, 201, "Registered successfully", await svcRegister(req));
};

export async function ctlLogin(req: Request, res: Response) {
  return success(res, 200, "Logged in successfully", await svcLogin(req));
};

export function authMiddlewareTest(req: Request, res: Response) {
  return success(res, 200, "Authenticated successfully");
}