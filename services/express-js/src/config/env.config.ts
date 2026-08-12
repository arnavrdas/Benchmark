import { configDotenv } from 'dotenv';

configDotenv();

const env = {
  PORT:           checkIfExists("PORT"),
  JWT_SECRET:     checkIfExists("JWT_SECRET"),
  JWT_EXPIRES_IN: checkIfExists("JWT_EXPIRES_IN") as JwtExpiresInType ,
}

// Utils
function checkIfExists(key: string): string {
    const value = process.env[key];
    if(!value) {
      throw new Error(`${key} is missing`);
    }
    return value;
}

// Types
type JwtExpiresInType = `${number}s` | `${number}m` | `${number}h` | `${number}d`;

export default env;