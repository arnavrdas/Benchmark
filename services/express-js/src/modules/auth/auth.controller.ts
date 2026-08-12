import { type Request, type Response } from "express";

// Services
import {
  svcRegister,
  svcLogin
} from "./auth.service.js";

export async function ctlRegister(req: Request, res: Response) {
  const response = await svcRegister(req);
  return res.json({ response })
};

export async function ctlLogin(req: Request, res: Response) {
  const response = await svcLogin(req);
  return res.json({ response })
};

export function authMiddlewareTest(req: Request, res: Response) {
  res.status(200).json("works")
}