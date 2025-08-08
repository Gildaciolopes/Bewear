import { z } from "zod";

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.uuid(),
});

export type UpdateCartShippingAddressSchema = z.infer<
  typeof updateCartShippingAddressSchema
>;
