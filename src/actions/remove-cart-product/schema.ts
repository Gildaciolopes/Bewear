import { z } from "zod";

export const removeProductFromCartSchema = z.object({
  cartItemId: z.uuid(),
});
