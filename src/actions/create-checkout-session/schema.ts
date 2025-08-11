import { z } from "zod";

export const createCheckoutSessionSchema = z.object({
  orderId: z.uuid(),
});

export type CreateCheckoutSessionSchema = z.infer<
  typeof createCheckoutSessionSchema
>;
