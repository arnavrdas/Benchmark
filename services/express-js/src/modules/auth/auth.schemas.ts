import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string(),
    email:    z.string().email("Invalid email"),
    password: z.string(),
    role:     z.enum(["user", "admin"]).optional().default("user"),
  })
})
export type registerSchemaInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  body: z.object({
    email:    z.string().email("Invalid email"),
    password: z.string()
  })
})
export type loginSchemaInput = z.infer<typeof loginSchema>;