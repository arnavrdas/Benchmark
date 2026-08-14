import { Router } from "express";

// Middleware
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { authenticate } from "./auth.middleware.js";

// Schemas
import { loginSchema, registerSchema } from "./auth.schemas.js";

// Controllers
import { ctlLogin, ctlRegister, authMiddlewareTest } from "./auth.controller.js";

const authRouter = Router();

/**************************************************
* Routers
**************************************************/

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

authRouter.get(
  "/test",
  authenticate,
  authMiddlewareTest
)

export default authRouter;