import { z } from "zod";

export const decreaseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartProductQuantitySchema = z.infer<
  typeof decreaseCartProductQuantitySchema
>;
