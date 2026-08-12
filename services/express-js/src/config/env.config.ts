import { configDotenv } from 'dotenv';

configDotenv();

const env = {
  PORT: checkIfExists("PORT"),
}

// Utils
function checkIfExists(key: string): string {
    const value = process.env[key];
    if(!value) {
      throw new Error(`${key} is missing`);
    }
    return value;
}

export default env;