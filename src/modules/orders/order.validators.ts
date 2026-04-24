import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    productIds: z.array(z.number().int().positive()),
  }),
});

export const orderIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/),
  }),
});