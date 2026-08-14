import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

// Config
import env from "../../config/env.config.js";

// Constants
import { users } from "../../shared/constants/user.constant.js";

// Types
import type { registerRequest, loginRequest } from "./auth.schemas.js";
import type { userInterface } from "../../shared/types/user.type.js";
import type { SignOptions } from "jsonwebtoken";

export async function svcFindUser(req: registerRequest | loginRequest) {

  const user = users.find(u => u.email === req.body.email)

  if (user) {
    const data: userInterface = user
    return {
      exists: true,
      data
    }
  }

  else {
    return {
      exists: false
    }
  }
}

export async function svcRegister(req: registerRequest) {

  const user: userInterface = {
    id: uuid(),
    email: req.body.email,
    password: req.body.password,
  }

  users.push(user)

  return user
}

export async function svcCheckPassword(givenPassword: string, user: userInterface) {
  if(givenPassword === user.password) {
    return true
  }
  else return false
}

export async function svcGenerateToken(user: userInterface) {

  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN
  }

  return {
    AccessToken: jwt.sign(
      {
        id:    user.id,
        email: user.email
      },
      env.JWT_SECRET,
      options
    )
  }
}