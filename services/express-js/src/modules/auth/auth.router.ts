import { Router } from "express";

// Middleware
import { validate } from "../../shared/middlewares/validation.middleware.js";

// Schemas
import { loginSchema, registerSchema } from "./auth.schemas.js";

// Controllers
import { ctlLogin, ctlRegister } from "./auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  ctlRegister
);

authRouter.post(
  "/login",
  validate(loginSchema),
  ctlLogin
);

export default authRouter;