import { z } from "zod";

export const updateMeSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Invalid user id"),
  }),
});