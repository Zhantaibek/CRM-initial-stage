import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    price: z.number().positive(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    price: z.number().positive().optional(),
  }),
});