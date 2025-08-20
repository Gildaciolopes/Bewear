"use client";

import { LogInIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: session } = authClient.useSession();
  const { data: cart } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("cart:open", handleOpen as EventListener);
    return () => {
      window.removeEventListener("cart:open", handleOpen as EventListener);
    };
  }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        {session?.user ? (
          <div className="flex h-full flex-col px-5 pb-5">
            {cart?.items && cart.items.length > 0 ? (
              <>
                <div className="flex h-full max-h-full flex-col overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="flex h-full flex-col gap-8">
                      {cart.items.map((item) => (
                        <CartItem
                          key={item.id}
                          id={item.id}
                          productVariantId={item.productVariant.id}
                          productName={item.productVariant.product.name}
                          productVariantName={item.productVariant.name}
                          productVariantImageUrl={item.productVariant.imageUrl}
                          productVariantPriceInCents={
                            item.productVariant.priceInCents
                          }
                          quantity={item.quantity}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex flex-col gap-4">
                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Subtotal</p>
                    <p>{formatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Entrega</p>
                    <p>GRÁTIS</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Total</p>
                    <p>{formatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Button className="mt-5 rounded-full" asChild>
                    <Link href="/cart/identification">Finalizar compra</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <h2 className="text-muted-foreground text-center text-lg font-semibold">
                  Adicione produtos ao seu carrinho
                </h2>
              </div>
            )}
          </div>
        ) : (
          <div className="px-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Olá. Faça seu login!</h2>
              <Button size="icon" asChild variant="outline">
                <Link href="/authentication">
                  <LogInIcon />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
