import { Router } from "express";

// Middleware
import { validate } from "../../shared/middlewares/validation.middleware.js";

// Schemas
import { registerSchema } from "./auth.schemas.js";

// Controllers
import { ctlRegister } from "./auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  ctlRegister
);

export default authRouter;