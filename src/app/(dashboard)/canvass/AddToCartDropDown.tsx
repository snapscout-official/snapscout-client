"use client";
import User from "@/public-assets/user.svg";
import Add from "@/public-assets/plus.svg";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CartMenuItem from "@/componentUtils/CartMenuItem";
import { ProductType } from "./ProductCardSheet";
import { Cart, addToCart, getCookieValue } from "@/app/actions/products";
import { useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
export default function AddToCartDropDown({
  product,
}: {
  product: ProductType;
}) {
  const { toast } = useToast();
  const [cookies, setCookies] = useState<Cart[] | undefined>();
  useEffect(() => {
    async function getCookie() {
      const cartCookie = await getCookieValue("carts");
      if (cartCookie) {
        setCookies(cartCookie);
      }
    }
    getCookie();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" py-2 px-2 bg-secondary  hover:bg-primary md:py-6 md:px-8">
          <Image src={Add} alt="add-icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] bg-white rounded-[.3rem]">
        <DropdownMenuLabel>My Carts</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[1px] border-lightText" />
        <DropdownMenuGroup>
          {cookies ? (
            cookies.map((cookie: Cart, idx: number) => (
              <CartMenuItem
                key={idx}
                clickHandler={async () => {
                  await addToCart(cookie.cartName, 12, product);
                  toast({
                    title: `Product Added to Cart ${cookie.cartName}`,
                    description: `Product ${product.product_name} has been added to cart ${cookie.cartName}`,
                    action: <ToastAction altText="done">Done</ToastAction>,
                  });
                }}
              >
                <Image
                  src={User}
                  alt="user-icon"
                  width={25}
                  height={25}
                  className="mr-2"
                />
                {cookie.cartName}
              </CartMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No Cart Currently</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
