import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { OpenCartButton } from "./components/open-cart-button";
import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return (
      <>
        <Header />
        <div className="px-5 py-8">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Acesse sua conta para ver seus pedidos
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Faça login ou crie uma conta para acompanhar todos os seus
                pedidos e fazer novas compras
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/authentication">Fazer login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/authentication">Criar conta</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="px-5 py-8">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Você ainda não tem pedidos
              </CardTitle>
              <CardDescription className="mt-2 text-gray-600">
                Que tal começar suas compras? Adicione produtos ao carrinho e
                finalize seu primeiro pedido!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/">Ver produtos</Link>
              </Button>
              <OpenCartButton />
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="px-5">
        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              productName: item.productVariant.product.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </>
  );
};

export default MyOrdersPage;
