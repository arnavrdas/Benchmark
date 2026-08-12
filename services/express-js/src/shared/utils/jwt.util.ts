import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../../config/env.config.js";

export function generateToken(payload: object) {
  return jwt.sign(
    payload,
    env.JWT_SECRET,
    options
  )
}

const options: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN
}