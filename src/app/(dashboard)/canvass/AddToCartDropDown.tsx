"use client";
import User from "@/public-assets/user.svg";
import Add from "@/public-assets/plus.svg";
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
import { cookies } from "next/headers";
export default function AddToCardDropDown({
  product,
}: {
  product: ProductType;
}) {
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
          <CartMenuItem product={product} cartName="Main Cart" quantity={11}>
            <Image
              src={User}
              alt="user-icon"
              width={25}
              height={25}
              className="mr-2"
            />
            Main Cart
          </CartMenuItem>
          <CartMenuItem
            product={product}
            cartName="Miscellaneous"
            quantity={11}
          >
            <Image
              src={User}
              alt="user-icon"
              width={25}
              height={25}
              className="mr-2"
            />
            Main Cart
          </CartMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
