"use client";

import { Button } from "@/components/ui/button";

export const OpenCartButton = () => {
  const handleOpenCart = () => {
    window.dispatchEvent(new CustomEvent("cart:open"));
  };

  return (
    <Button
      onClick={handleOpenCart}
      variant="outline"
      className="w-full sm:w-auto"
    >
      Ver carrinho
    </Button>
  );
};
