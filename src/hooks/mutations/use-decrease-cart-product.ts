import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
