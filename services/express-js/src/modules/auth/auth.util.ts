import jwt from "jsonwebtoken";

// Config
import env from "../../config/env.config.js";

// Constants
import { users } from "../../shared/constants/user.constant.js";

// Types
import type { registerRequest, loginRequest } from "./auth.schemas.js";
import type { userInterface } from "../../shared/types/user.type.js";
import type { SignOptions } from "jsonwebtoken";

/**************************************************
* Utils
**************************************************/

export async function utilFindUser(req: registerRequest | loginRequest) {

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

export async function utilCheckPassword(givenPassword: string, user: userInterface) {
  if(givenPassword === user.password) {
    return true
  }
  else return false
}

export async function utilGenerateToken(user: userInterface) {

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