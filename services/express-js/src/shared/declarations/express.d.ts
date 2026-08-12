import type { JwtPayload } from "jsonwebtoken";

declare global {                        // Modifies TypeScript's global type definitions
    namespace Express {                 // Extending Express's existing namespace
        interface Request {             // Extending Express's Request type
            user?: string | JwtPayload;
        }
    }
}

export {}; // Because this file is a module, but not a script.