import { v4 as uuid } from "uuid";

// Utils
import { generateToken } from "../../shared/utils/jwt.util.js";

// Types
import type { 
  registerSchemaInput,
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

// Temp
interface usersInterface {
  id: string;
  email: string;
  password: string;
}

const users: usersInterface[] = []