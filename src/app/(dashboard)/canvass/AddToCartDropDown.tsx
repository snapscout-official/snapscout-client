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
export default function AddToCardDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="py-6 px-8 bg-secondary hover:bg-primary text-primary-foreground"
          size="icon"
        >
          <Image src={Add} alt="add-icon" width={100} height={100} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] bg-white rounded-[.3rem]">
        <DropdownMenuLabel>My Carts</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-[1px] border-lightText" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Image
              src={User}
              alt="user-icon"
              width={25}
              height={25}
              className="mr-2"
            />
            Main Cart
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Image
              src={User}
              alt="user-icon"
              width={25}
              height={25}
              className="mr-2"
            />
            Main Cart
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
