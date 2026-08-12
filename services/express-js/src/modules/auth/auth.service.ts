import { v4 as uuid } from "uuid";

// Utils
import { generateToken } from "../../shared/utils/jwt.util.js";

// Types
import type { 
  registerSchemaInput,
  loginSchemaInput,
} from "./auth.schemas.js";

export async function svcRegister(req: registerSchemaInput) {

  const alreadyRegistered = users.find(u => u.email === req.body.email);

  if(alreadyRegistered) {
    return "Email is already registered";
  }
  else {
    const id = uuid();
    const email = req.body.email;

    users.push({
      id:       id,
      email:    email,
      password: req.body.password,
    })

    return generateToken({
      id:    id,
      email: email,
    });
  }
}

export async function svcLogin(req: loginSchemaInput) {

  // Check if email is registered
  const user = users.find(u => u.email === req.body.email);
  if(!user) {
    return "Email is not registered";
  }

  // Check if password is correct
  if(req.body.password !== user.password) {
    return "Incorrect password"
  }

  // Generate JWT token
  return generateToken({
    id:    user.id,
    email: user.email
  })
}

// Temp
interface usersInterface {
  id: string;
  email: string;
  password: string;
}

const users: usersInterface[] = []