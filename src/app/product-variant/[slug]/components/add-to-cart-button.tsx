"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado à sacola.");
    },
  });
  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => {
        if (!session?.user) {
          toast.info("Você precisa estar logado para realizar a compra.");
          return;
        }
        mutate();
      }}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
