"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const categoriesLinks = [
    { name: "Camisetas", slug: "camisetas" },
    { name: "Bermudas & Shorts", slug: "bermudas" },
    { name: "Calças", slug: "calas" },
    { name: "Jaquetas & Moletons", slug: "jaquetas" },
    { name: "Tênis", slug: "tnis" },
    { name: "Acessórios", slug: "acessrios" },
  ] as const;
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/Logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start hover:cursor-pointer"
                >
                  <Link href="/">
                    <HomeIcon className="mr-2 h-4 w-4" /> Início
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start hover:cursor-pointer"
                >
                  <Link href="/my-orders">
                    <PackageIcon className="mr-2 h-4 w-4" /> Meus Pedidos
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start hover:cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    window.dispatchEvent(new Event("cart:open"));
                  }}
                >
                  <ShoppingBasketIcon className="mr-2 h-4 w-4" /> Carrinho
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col gap-3">
                {categoriesLinks.map((link) => (
                  <Button
                    key={link.slug}
                    asChild
                    variant="ghost"
                    className="justify-start hover:cursor-pointer"
                  >
                    <Link href={`/category/${link.slug}`}>{link.name}</Link>
                  </Button>
                ))}
              </div>

              {session?.user && (
                <div className="mt-6">
                  <Separator className="my-4" />
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2 hover:cursor-pointer"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sair da conta
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
