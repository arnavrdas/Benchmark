import { type Request, type Response } from "express";

// Services
import {
  svcRegister,
} from "./auth.service.js";

export async function ctlRegister(req: Request, res: Response) {
  const response = await svcRegister(req);
  return res.json({ response })
};