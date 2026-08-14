import { v4 as uuid } from "uuid";

// Constants
import { users } from "../../shared/constants/user.constant.js";

// Utils
import { utilFindUser, utilCheckPassword, utilGenerateToken } from "./auth.util.js";

// Types
import type { registerRequest, loginRequest } from "./auth.schemas.js";
import type { userInterface } from "../../shared/types/user.type.js";

// Errors
import { BadRequestError } from "../../shared/errors/errors.js";

/**************************************************
* Services
**************************************************/

export async function svcRegister(req: registerRequest) {

  // Check if email is already registered
  const checkUser = await utilFindUser(req);
  if (checkUser.exists) {
    throw new BadRequestError("Email is already registered")
  }

  // Register user
  const registerUser: userInterface = {
    id: uuid(),
    email: req.body.email,
    password: req.body.password,
  }
  users.push(registerUser)

  // Generate Access Token
  return await utilGenerateToken(registerUser);
}

export async function svcLogin(req: loginRequest) {

  // Check if email is registered
  const user = await utilFindUser(req);
  if (!user.exists) {
    throw new BadRequestError("Email or Password incorrect");
  }

  else if (user.data) {

    // Check if password is correct
    const validCredentials = await utilCheckPassword(req.body.password, user.data)
    if (!validCredentials) {
      throw new BadRequestError("Email or Password incorrect");
    }

    // Generate Access Token
    return await utilGenerateToken(user.data);
    
  }
}